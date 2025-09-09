import { IReceiveMessage } from "../socket/SocketManager";
import { ErrorCode, ErrorManager } from "../utils/ErrorManager";
import { logger } from "../utils/XUtils";

export class StateRecall implements IReceiveMessage {
    msgid: s5g.game.proto.EMSGID = s5g.game.proto.EMSGID.eStateRecall;

    public decode(uint8: Uint8Array): void {
        const message = s5g.game.proto.StateRecall.decode(uint8);
        logger("[@StateRecall] status_code " + message.status_code);
        if (message.status_code != s5g.game.proto.Status.Code.kSuccess) {
            ErrorManager.getInstance().showError(ErrorCode.SetStateError);
        }
    }
}