import { IReceiveMessage } from "../socket/SocketManager";
import { PromoManager } from "../utils/PromoManager";

/**
 * 通知玩家觸發的活動內容
 */
export class CampaignEventRecall implements IReceiveMessage {
    msgid: s5g.game.proto.EMSGID = s5g.game.proto.EMSGID.eCampaignEventRecall;

    public decode(uint8: Uint8Array): void {
        const message = s5g.game.proto.CampaignEventRecall.decode(uint8);

        console.log("SR活動異動通知: " + JSON.stringify(message));

        PromoManager.getInstance().updateCampaignEvent(message.campaign_id, message.campaign_type, message.campaign_status, message.event_type);
    }
}