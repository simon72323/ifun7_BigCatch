import { XEvent, XEvent1 } from "../utils/XEvent";

export class SocketEvent {
    public static open: XEvent = new XEvent();
    public static close: XEvent = new XEvent();
    public static message: XEvent1<ArrayBuffer> = new XEvent1<ArrayBuffer>();
}