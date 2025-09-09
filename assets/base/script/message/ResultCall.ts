import { BaseConst } from "@/base/script/constant/BaseConst";
import { ErrorCode, ErrorManager } from "@/base/script/utils/ErrorManager";
import { TimeoutManager } from "@/base/script/utils/TimeoutManager";
import { BaseDataManager } from "../main/BaseDataManager";
import { ISendMessage } from "../socket/SocketManager";
import { PromoManager } from "../utils/PromoManager";

/**
 * 要求Spin結果
 */
export class ResultCall implements ISendMessage {
    msgid: s5g.game.proto.EMSGID = s5g.game.proto.EMSGID.eResultCall;

    public encode(): Uint8Array {

        TimeoutManager.getInstance().register(BaseConst.TIMEOUT_RESULT_RECALL.key, BaseConst.TIMEOUT_RESULT_RECALL.seconds, () => {
            ErrorManager.getInstance().showError(ErrorCode.SpinningTImeOut);
        });

        let msg: s5g.game.proto.ResultCall = new s5g.game.proto.ResultCall();
        msg.msgid = this.msgid;
        msg.token = BaseDataManager.getInstance().urlParam.accessToken;
        msg.module_id = BaseDataManager.getInstance().curModuleID;
        msg.bet = BaseDataManager.getInstance().bet.getBetIdx();
        msg.line = BaseDataManager.getInstance().bet.getLineIdx();
        msg.rate = BaseDataManager.getInstance().bet.getRateIdx();
        msg.orientation = 1;
        msg.campaign_id = PromoManager.getInstance().curCampaignID;
        msg.module_command = [];
        if (BaseDataManager.getInstance().isBS() === true) {
            let betCmd: math.proto.SetMultiBetCommand = new math.proto.SetMultiBetCommand();
            betCmd.id = math.proto.ModuleCommandID.kSetMultiBet;
            betCmd.MultiBetList = [BaseDataManager.getInstance().getPlayerAction(), 60];
            let betCmdUint8 = math.proto.SetMultiBetCommand.encode(betCmd).finish();
            msg.module_command.push(betCmdUint8);
        }

        let spinCmd: math.proto.SpinIndexCommand = new math.proto.SpinIndexCommand();
        spinCmd.id = math.proto.ModuleCommandID.kSpinIndex;
        spinCmd.spin_idx = BaseDataManager.getInstance().buyFs ? BaseDataManager.getInstance().featureBuyType : 255;
        let spinCmdUint8 = math.proto.SpinIndexCommand.encode(spinCmd).finish();
        msg.module_command.push(spinCmdUint8);

        //密技(有設定CheatCodeData才會執行)
        if (BaseDataManager.getInstance().cheatCodeData && BaseDataManager.getInstance().cheatCodeData.rngList.length > 0) {
            let rngList = BaseDataManager.getInstance().cheatCodeData.rngList;
            let cheatCmd: math.proto.CheatCodeCommand = new math.proto.CheatCodeCommand();
            cheatCmd.id = math.proto.ModuleCommandID.kCheatCode;
            cheatCmd.rng = rngList.shift();
            let cheatCmdUin8 = math.proto.CheatCodeCommand.encode(cheatCmd).finish();
            msg.module_command.push(cheatCmdUin8);
            if (rngList.length === 0) {
                BaseDataManager.getInstance().cheatCodeData = null;
            }
        }

        return s5g.game.proto.ResultCall.encode(msg).finish();
    }
}