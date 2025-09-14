import { BaseDataManager } from '@base/script/main/BaseDataManager';
import { ISendMessage } from '@base/script/socket/SocketManager';
import { logger } from '@base/script/utils/XUtils';

/**
 * 要求輪帶資料
 */
export class StateCall implements ISendMessage {
    msgid: s5g.game.proto.EMSGID = s5g.game.proto.EMSGID.eStateCall;

    public encode(): Uint8Array {
        let msg: s5g.game.proto.StateCall = new s5g.game.proto.StateCall();
        msg.msgid = this.msgid;
        msg.token = BaseDataManager.getInstance().urlParam.accessToken;
        msg.stateid = BaseDataManager.getInstance().curState;
        msg.reserved = [];
        logger('[@StateCall] stateid ' + msg.stateid);
        return s5g.game.proto.StateCall.encode(msg).finish();

    }
}