import { BaseDataManager } from "../main/BaseDataManager";
import { ISendMessage } from "../socket/SocketManager";

/**
 * 要求配置資料
 */
export class ConfigCall implements ISendMessage {
    msgid: s5g.game.proto.EMSGID = s5g.game.proto.EMSGID.eConfigCall;

    public encode(): Uint8Array {
        let msg: s5g.game.proto.ConfigCall = new s5g.game.proto.ConfigCall();
        msg.msgid = this.msgid;
        msg.token = BaseDataManager.getInstance().urlParam.accessToken;
        msg.gameid = BaseDataManager.getInstance().gameID;
        msg.clear_power_cycle = false;
        msg.version = 1;
        msg.subgame_id = BaseDataManager.getInstance().urlParam.subID;
        return s5g.game.proto.ConfigCall.encode(msg).finish();
    }
}