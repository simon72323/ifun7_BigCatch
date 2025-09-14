import { BaseDataManager } from '@base/script/main/BaseDataManager';
import { IReceiveMessage, SocketManager } from '@base/script/socket/SocketManager';
import { ErrorCode, ErrorManager } from '@base/script/utils/ErrorManager';
import { logger } from '@base/script/utils/XUtils';

export class LoginRecall implements IReceiveMessage {
    msgid: s5g.game.proto.EMSGID = s5g.game.proto.EMSGID.eLoginRecall;

    public decode(uint8: Uint8Array): void {
        const message = s5g.game.proto.LoginRecall.decode(uint8);
        logger('[@LoginRecall] status_code ' + message.status_code);
        if (message.status_code == s5g.game.proto.Status.Code.kSuccess) {
            BaseDataManager.getInstance().memberID = message.member_id;
            BaseDataManager.getInstance().operatorID = message.operator_id;
            BaseDataManager.getInstance().token = message.token;

            SocketManager.getInstance().sendMessage(s5g.game.proto.EMSGID.eConfigCall);
        }
        else {
            ErrorManager.getInstance().showError(ErrorCode.LoginError);
        }
    }
}