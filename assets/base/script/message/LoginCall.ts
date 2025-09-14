import { BaseDataManager } from '@base/script/main/BaseDataManager';
import { ISendMessage } from '@base/script/socket/SocketManager';

/**
 * 登入
 */
export class LoginCall implements ISendMessage {
    msgid: s5g.game.proto.EMSGID = s5g.game.proto.EMSGID.eLoginCall;

    public encode(): Uint8Array {
        let msg: s5g.game.proto.ILoginCall = new s5g.game.proto.LoginCall();
        msg.msgid = this.msgid;
        msg.member_id = BaseDataManager.getInstance().account;
        msg.password = BaseDataManager.getInstance().password;
        msg.machine_id = 'LK00010';
        msg.token = BaseDataManager.getInstance().urlParam.accessToken;
        msg.game_id = BaseDataManager.getInstance().gameID;
        return s5g.game.proto.LoginCall.encode(msg).finish();
    }
}