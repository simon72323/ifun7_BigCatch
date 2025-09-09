export interface ISocket {
    /** 連線 */
    connect(url: string): void;

    /** 發送 */
    send(msg: Uint8Array): void;
}