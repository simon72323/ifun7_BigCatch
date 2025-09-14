import { ISocket } from '@base/script/socket/ISocket';
import { SocketEvent } from '@base/script/socket/SocketEvent';
import { SocketManager } from '@base/script/socket/SocketManager';

/**
 * 假Server範本
 * 遊戲自行複製FakeSocketTemplate.ts到script目錄使用(不要複製.meta避免uuid衝突)
 * 然後在Game.ts內寫上 SocketManager.getInstance().fakeSocket = new FakeSocketTemplate(); 指定FakeSocket
 */
export class FakeSocketTemplate implements ISocket {

    /**
     * 實現connect接口
     * @param _url 
     */
    connect(_url: string): void {
        //一定要發open事件, 模擬連線完成
        SocketEvent.open.emit();
    }

    /**
     * 底層連線完成後, 會開始發LoginCall過來, 就可以自行模擬封包或發事件觸發演示流程
     * @param msg 
     */
    send(uint8: Uint8Array): void {
        const header = s5g.game.proto.Header.decode(uint8);

        //也可以用此方法取得receiveMessageList, 再找出對應的handler
        let receiveMessageList = SocketManager.getInstance()['receiveMessageList'];

        //方法一：模擬LoginRecall
        if (header.msgid == s5g.game.proto.EMSGID.eLoginCall) {
            let fakeLoginRecall: s5g.game.proto.ILoginRecall = new s5g.game.proto.LoginRecall();
            fakeLoginRecall.msgid = s5g.game.proto.EMSGID.eLoginRecall;
            fakeLoginRecall.token = 'XXXX';
            fakeLoginRecall.status_code = s5g.game.proto.Status.Code.kSuccess;
            let buffer = s5g.game.proto.LoginRecall.encode(fakeLoginRecall).finish();
            receiveMessageList[0].decode(buffer);
        }
        //方法二：發自定義事件
        else if (header.msgid == s5g.game.proto.EMSGID.eResultCall) {
            //XXXEvent.emit();
        }
        else if (header.msgid == s5g.game.proto.EMSGID.eStateCall) {
            //不做事
        }
    }
}