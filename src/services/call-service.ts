import { randomUUID } from "crypto";
import { printCustomRoutes } from "next/dist/build/utils";
import { WsService } from "./ws";

enum WebSocketEventTypeEnum {
    ping="ping",
    pong="pong",
    handshake="handshake",
    join="join",
    joined="joined",
    user="user",
    chathistory="chathistory",
    chat="chat",
    ice="ice",
    offer="offer",
    answer="answer",
    requestStream="requestStream",
    request="request"
}

interface WebSocketEventType {
    type: WebSocketEventTypeEnum
}

interface HandshakeEvent extends WebSocketEventType {
    version: string[],
    id?: string,
}

interface JoinEvent extends WebSocketEventType {
    kind: string,
    group: string,
    password: string,
    username: string
}

interface JoinedEvent extends WebSocketEventType {
    kind: string,
    username: string,
    permissions: string[],
    status: {
        name: string,
        clientCount: number
    },
    group: string,
    rtcConfiguration: {}
}

interface User {
    id: string,
    permissions: string[],
    username: string
}

interface UserInfoEvent extends WebSocketEventType, User {
    kind: string, 
}

interface Chat {    
    id: string,
    source: string,
    username: string, 
    value: string,
    time: Date
}

interface ChatHistoryEvent extends WebSocketEventType, Chat {
}

interface OfferEvent extends WebSocketEventType {
    source: string,
    username: string,
    kind: string,
    id: string,
    replace: string|null,
    label: "camera"|"screenshare",
    sdp: string
}


interface AnswerEvent extends WebSocketEventType {
    id: string,
    sdp: string, 
}

interface IceEvent extends WebSocketEventType {
    id: string, 
    candidate: RTCIceCandidate
}

interface RequestEvent extends WebSocketEventType {
    request: Record<string, ("audio"|"video"|"video-low")[]>
}

interface RequestStreamEvent extends WebSocketEventType, RequestEvent {
    id: string
}

type WebsocketEvent = RequestEvent | RequestStreamEvent | IceEvent | AnswerEvent | OfferEvent | UserInfoEvent | ChatHistoryEvent | JoinEvent | JoinedEvent | HandshakeEvent;


export class CallService {
    private clientId: string;
    private ws: WebSocket;
    private verified: boolean;
    private userList: User[];
    private chatList: Chat[];
    private peerConnections: Record<string, RTCPeerConnection>;
    private username: string;
    private password: string;
    private iceCandidateQueues: Record<string, RTCIceCandidate[]>;
    private groupName: string;
    private updateChatCallback: (newValue: Chat, list: Chat[]) => void;
    private changeCallTrackCallback: ((mediaStream: readonly MediaStream[]) => void);

    constructor({connectionUrl, groupName, username, password, updateChatCallback, changeCallTrackCallback} :{connectionUrl: string, groupName: string, username: string, password: string, updateChatCallback: (newValue: Chat, list: Chat[]) => void, changeCallTrackCallback: (mediaStream: readonly MediaStream[]) => void}) {
        this.changeCallTrackCallback = changeCallTrackCallback;
        this.ws = new WebSocket(connectionUrl);
        this.groupName = groupName;
        this.updateChatCallback = updateChatCallback;
        this.verified = false;
        this.peerConnections = {};
        this.iceCandidateQueues = {};
        this.userList = [];
        this.chatList = [];
        this.username = username;
        this.password = password;
        this.clientId = self.crypto.randomUUID();
        this.ws.addEventListener("open", (event) => {
            this.ws.send(JSON.stringify(this.sendHandshake()))
        })
        this.ws.onmessage = this.onMessage;
    }

    private sendHandshake(): HandshakeEvent {
        const handshake: HandshakeEvent= {
            type: WebSocketEventTypeEnum.handshake,
            version: ["2"],
            id: this.clientId
        }
        return handshake
    }

    private joinGroup() {
        const j: JoinEvent = {
            group: this.groupName,
            kind: "join",
            password: this.password,
            type: WebSocketEventTypeEnum.join,
            username: this.username
        }
        
        this.ws.send(JSON.stringify(j));
    }

    private sendDownTrackReq() {
        const r: RequestEvent = {
            type: WebSocketEventTypeEnum.request,
            request: {
                "": ["audio", "video"]
            }
        }
        this.ws.send(JSON.stringify(r));
    }
    
    
    private onMessage = (event: MessageEvent) => {
        const eventData = JSON.parse(event.data) as WebsocketEvent;
        console.log(eventData)
        switch(eventData.type) {
            case WebSocketEventTypeEnum.handshake: {
                this.verified = true;
                this.joinGroup()
                this.sendDownTrackReq();
                break;
            }
            case WebSocketEventTypeEnum.chat:
            case WebSocketEventTypeEnum.chathistory: {
                const { id, source, time, username, value } = eventData as ChatHistoryEvent;
                const chat = {
                    id,
                    source,
                    time: new Date(time), 
                    username,
                    value
                };
                this.chatList.push(chat);
                this.updateChatCallback(chat, this.chatList);
                break;
            }
            case WebSocketEventTypeEnum.user: {
                const {id, kind, permissions, type, username} = eventData as UserInfoEvent;
                const user = {
                    id,
                    permissions,
                    username
                }
                this.userList.push(user)
                console.log(this.userList)
                break;
            }
            case WebSocketEventTypeEnum.answer: {
                
                break;
            }
            case WebSocketEventTypeEnum.offer: {
                const {id, kind, label,replace, sdp, source, username} = eventData as OfferEvent;
                
                const pc = new RTCPeerConnection({iceServers: [], bundlePolicy: "balanced", rtcpMuxPolicy: "require", iceCandidatePoolSize: 0});
                this.peerConnections[id] = pc;
                this.iceCandidateQueues[id] = [];
                pc.ontrack = (event) => {
                    if(event.streams && event.streams[0]) {
                        this.changeCallTrackCallback(event.streams)
                    } 
                }
                pc.onicecandidate = (event) => {
                    console.log(event, "IS THE ICE CANDIDATE")
                    if(!event.candidate) return
                    this.ws.send(JSON.stringify({
                        type: WebSocketEventTypeEnum.ice,
                        id: id,
                        candidate: (event.candidate),
                    } as IceEvent))
                }
                
                pc.onconnectionstatechange = (event) => {
                    // console.log(event)
                }
                pc.onicecandidateerror = (event) => {
                    // console.log(event)
                }
                pc.oniceconnectionstatechange = (event) => {
                    // console.log(event)
                }
                pc.onconnectionstatechange = () => {
                    // console.log(`Connection state for ${id}:`, pc.connectionState);
                };
                pc.onsignalingstatechange = () => {
                    // console.log(`Signaling state for ${id}:`, pc.signalingState);
                };
                
                (async (pc, id) => {
                    console.log(pc.iceGatheringState, "Gathering state")
                    console.log("setting remote desc", sdp)
                    
                    await pc.setRemoteDescription(new RTCSessionDescription({sdp: sdp, type: "offer"}))
                    await new Promise((res, rej) => {
                        this.iceCandidateQueues[id].forEach(async (candidate, index) => {
                            console.log("Setting candidates,", candidate)
                            await pc.addIceCandidate(candidate)
                            if(index == this.iceCandidateQueues[id].length-1) res(2)
                        })
                    })
                    const answer = await pc.createAnswer();
                    await pc.setLocalDescription(answer)
                    this.ws.send(JSON.stringify({
                        type: WebSocketEventTypeEnum.answer,
                        id: id,
                        sdp: answer.sdp
                    } as AnswerEvent))
                })(pc, id)
                setTimeout(() => {
                    // pc.restartIce()
                }, 10000)
                break;
            }
            case WebSocketEventTypeEnum.ice: {
                const {candidate, id, type} = eventData as IceEvent;
                this.iceCandidateQueues[id].push(candidate);
                break;
            }
            case WebSocketEventTypeEnum.ping: {
                this.ws.send(JSON.stringify({
                    type: WebSocketEventTypeEnum.pong
                }))
                break;
            }
        }
    }
}