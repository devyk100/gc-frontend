import { WsService } from "./ws";

export class RtcService {
    private wsService: WsService | undefined;
    private static instance: RtcService;
    private peerConnection!: RTCPeerConnection;
    private constructor(){
        
    }


    public static getInstance(): RtcService {
        if(!this.instance) {
            this.instance = new RtcService()
        }
        return this.instance;
    }
}
