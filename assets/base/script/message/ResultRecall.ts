//js
//ts
import { Notice } from "@/base/components/notice/Notice";
import { BaseConst } from "@/base/script/constant/BaseConst";
import { BaseDataManager } from "../main/BaseDataManager";
import { BaseEvent } from "../main/BaseEvent";
import { IReceiveMessage } from "../socket/SocketManager";
import { ModuleID } from "../types/BaseType";
import { APIManager } from "../utils/APIManager";
import { ErrorCode, ErrorManager } from "../utils/ErrorManager";
import { PromoManager } from "../utils/PromoManager";
import { TimeoutManager } from "../utils/TimeoutManager";
import { XUtils } from "../utils/XUtils";

/**
 * Spin結果回傳
 */
export class ResultRecall implements IReceiveMessage {
    msgid: s5g.game.proto.EMSGID = s5g.game.proto.EMSGID.eResultRecall;

    public decode(uint8: Uint8Array): void {

        let message = s5g.game.proto.ResultRecall.decode(uint8);

        //收到回應移除timeout
        TimeoutManager.getInstance().remove(BaseConst.TIMEOUT_RESULT_RECALL.key);
        //要求Spin結果失敗
        if (message.status_code !== s5g.game.proto.Status.Code.kSuccess) {
            if (message.status_code == s5g.game.proto.Status.Code.kNoEnoughCredit) {
                let cent = XUtils.convertToLong(message.player_cent);
                BaseDataManager.getInstance().playerCent = cent;
                BaseEvent.refreshCredit.emit(cent);
                BaseEvent.refreshWin.emit(0);
                BaseDataManager.getInstance().auto.stopAuto();

                //先滾的話餘額不足直接跳錯, 點擊按鈕後刷新網頁
                if (APIManager.getInstance().getSpinLate() == false) {
                    Notice.showNoBalance.emit(true);
                }
                else {
                    Notice.showNoBalance.emit(false);
                }
            }
            // 錯誤
            else {
                ErrorManager.getInstance().showError(ErrorCode.GetResultError);
            }

            BaseEvent.spinResult.emit(false);
            return;
        }

        //儲存資料
        BaseDataManager.getInstance().curModuleID = message.result.module_id as ModuleID;
        BaseDataManager.getInstance().nextModuleID = message.next_module as ModuleID;

        //是否通過溢位檢查(FS每一轉為0不能用)
        let cent = XUtils.convertToLong(message.player_cent);
        if (BaseDataManager.getInstance().TestOverFlow(cent) == true && BaseDataManager.getInstance().curModuleID === ModuleID.BS) {
            BaseDataManager.getInstance().playerCent = cent;
            BaseEvent.refreshCredit.emit(BaseDataManager.getInstance().playerCent);
        }

        if (message.campaign_data) {
            console.log("SR活動資訊: " + JSON.stringify(message.campaign_data));
            PromoManager.getInstance().updateResultCallCampaign(message.campaign_data);
        }

        //傳送SPIN結果
        BaseEvent.onResultRecall.emit(message);

        BaseEvent.spinResult.emit(true);
    }
}