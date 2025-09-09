import { logger } from "../utils/XUtils";
import { ISocket } from "./ISocket";
import { SocketEvent } from "./SocketEvent";

/**
 * 連線管理
 */
export class SocketManager {

    private static instance: SocketManager;
    public static getInstance(): SocketManager {
        if (!SocketManager.instance) {
            SocketManager.instance = new SocketManager();
        }
        return SocketManager.instance;
    }


    /**websocket實體 */
    private socket: WebSocket;

    /**單機假server */
    public fakeSocket: ISocket;

    /**封包清單 */
    private sendMessageList: ISendMessage[] = [];
    private receiveMessageList: IReceiveMessage[] = [];

    constructor() {
    }
    /**
     * 連線
     * @param url 
     */
    public connect(url: string) {

        SocketEvent.message.on(this.onMessage, this);

        if (this.fakeSocket) {
            this.fakeSocket.connect(url);
            return;
        }

        this.socket = new WebSocket(url);
        this.socket.binaryType = "arraybuffer";

        this.socket.onopen = () => {
            logger("[SocketManager] Socket連線成功!");
            SocketEvent.open.emit();
        }
        this.socket.onclose = () => {
            logger("[SocketManager] Socket連線關閉!");
            SocketEvent.close.emit();
        }
        this.socket.onmessage = (event: MessageEvent) => {
            SocketEvent.message.emit(event.data);
        }
    }

    /**
     * 發送封包
     * @param buffer 
     * @returns 
     */
    private send(buffer: Uint8Array): void {
        if (this.fakeSocket) {
            this.fakeSocket.send(buffer);
            return;
        }

        if (this.socket.readyState == WebSocket.OPEN) {
            this.socket.send(buffer);
        }
        else {
            logger("[SocketManager] 尚未建立Socket連線!");

        }
    }

    public isFake(): boolean {
        return !!this.fakeSocket;
    }


    public registerSendMessage(msg: ISendMessage): void {
        this.sendMessageList.push(msg);
    }
    /**
     * 註冊接收封包
     * @param msg 
     */
    public registerReceiveMessage(msg: IReceiveMessage): void {
        this.receiveMessageList.push(msg);
    }

    /**
     * 發送封包
     * @param msgid 
     */
    public sendMessage(msgid: s5g.game.proto.EMSGID, data: any = null): void {
        let target: ISendMessage;
        this.sendMessageList.forEach(sender => {
            if (sender.msgid == msgid) {
                target = sender;
            }
        })
        if (!target) {
            console.error(`發送封包 找不到封包ID:${msgid}`);
        }
        else {
            //把proto給遊戲, 讓遊戲自行決定要用什麼方法組包
            let buffer = target.encode(data);
            this.send(buffer);
        }
    }
    /**
     * 接收封包
     */
    private onMessage(buffer: ArrayBuffer): void {
        let uint8 = new Uint8Array(buffer);
        const header = s5g.game.proto.Header.decode(uint8);
        let target: IReceiveMessage;
        this.receiveMessageList.forEach(receiver => {
            if (receiver.msgid == header.msgid) {
                target = receiver;
            }
        })

        if (!target) {
            console.error(`接收封包 找不到封包ID:${header.msgid}`);
        }
        else {
            //把proto給遊戲, 讓遊戲自行決定要用什麼方法解包
            target.decode(uint8);
        }
    }

    public disconnect(): void {
        this.socket.close();
    }
}

export interface ISendMessage {
    /**封包ID */
    msgid: number;

    /**組包 */
    encode(data: any): Uint8Array;
}


export interface IReceiveMessage {
    /**封包ID */
    msgid: number;

    /**解包 */
    decode(uint8: Uint8Array): void;
}