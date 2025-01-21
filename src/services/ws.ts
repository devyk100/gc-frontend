export class WsService {
    private static instance: WsService;
    private ws: WebSocket;
    private constructor(){
        this.ws = new WebSocket("ws://localhost:8080/ws")
    }

    public setOnMessageCallback(callback: (message: MessageEvent<any>) => Promise<void>){
        this.ws.onmessage = callback;
    }

    public static getInstance(): WsService {
        if(this.instance == undefined){
            this.instance = new WsService();
        }
        return this.instance
    }
}