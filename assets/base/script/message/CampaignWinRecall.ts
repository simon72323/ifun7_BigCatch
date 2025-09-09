import { IReceiveMessage } from "../socket/SocketManager";
import { PromoManager } from "../utils/PromoManager";

/**
 * 通知玩家獲得贏分
 */
export class CampaignWinRecall implements IReceiveMessage {
    msgid: s5g.game.proto.EMSGID = s5g.game.proto.EMSGID.eCampaignWinRecall;

    public decode(uint8: Uint8Array): void {
        const message = s5g.game.proto.CampaignWinRecall.decode(uint8);
        console.log("SR活動通知玩家獲得贏分: " + JSON.stringify(message));

        PromoManager.getInstance().notifyWin(message.campaign_id, message.campaign_type, message.total_win);
    }
}