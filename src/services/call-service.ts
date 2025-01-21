import { randomUUID } from "crypto";

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
    requestStream="requestStream"
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
    request:("audio"|"video"|"video-low")[]
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
    private username: string;
    private password: string;
    private groupName: string;
    private updateChatCallback: (newValue: Chat, list: Chat[]) => void

    constructor({connectionUrl, groupName, username, password, updateChatCallback} :{connectionUrl: string, groupName: string, username: string, password: string, updateChatCallback: (newValue: Chat, list: Chat[]) => void}) {
        this.ws = new WebSocket(connectionUrl);
        this.groupName = groupName;
        this.updateChatCallback = updateChatCallback;
        this.verified = false;
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
    
    private onMessage = (event: MessageEvent) => {
        const eventData = JSON.parse(event.data) as WebsocketEvent;
        console.log(eventData)
        switch(eventData.type) {
            case WebSocketEventTypeEnum.handshake: {
                this.verified = true;
                this.joinGroup()
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
                break;
            }
            case WebSocketEventTypeEnum.answer: {

                break;
            }
            case WebSocketEventTypeEnum.offer: {

                break;
            }
            case WebSocketEventTypeEnum.ice: {

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