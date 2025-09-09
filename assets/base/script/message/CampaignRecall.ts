import { IReceiveMessage } from "../socket/SocketManager";
import { PromoManager } from "../utils/PromoManager";

/**
 * 回應指定的活動內容
 */
export class CampaignRecall implements IReceiveMessage {
    msgid: s5g.game.proto.EMSGID = s5g.game.proto.EMSGID.eCampaignRecall;

    public decode(uint8: Uint8Array): void {
        const message = s5g.game.proto.CampaignRecall.decode(uint8);
        console.log("SR活動詢問結果: " + JSON.stringify(message));

        //詢問活動失敗
        if (message.status_code !== s5g.game.proto.Status.Code.kSuccess) {
            return;
        }

        PromoManager.getInstance().responseCampaign(message.campaign_id, message.campaign_type, message.campaign_status, message.remaining_count, message.bet_rate, message.bet_level);
    }
}