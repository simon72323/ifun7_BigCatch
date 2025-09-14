import { BaseDataManager } from '@base/script/main/BaseDataManager';
import { ISendMessage } from '@base/script/socket/SocketManager';

/**
 * 要求輪帶資料
 */
export class StripsCall implements ISendMessage {
    msgid: s5g.game.proto.EMSGID = s5g.game.proto.EMSGID.eStripsCall;

    /**
     * 
     * @returns 
     */
    public encode(): Uint8Array {
        let msg: s5g.game.proto.StripsCall = new s5g.game.proto.StripsCall();
        msg.msgid = this.msgid;
        msg.token = BaseDataManager.getInstance().urlParam.accessToken;
        return s5g.game.proto.StripsCall.encode(msg).finish();
    }
}