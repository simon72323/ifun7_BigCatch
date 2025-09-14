import { IReceiveMessage } from '@base/script/socket/SocketManager';
import { PromoManager } from '@base/script/utils/PromoManager';

/**
 * 通知目前活動的相關資訊
 */
export class CampaignInfoNotify implements IReceiveMessage {
    msgid: s5g.game.proto.EMSGID = s5g.game.proto.EMSGID.eCampaignInfoNotify;

    public decode(uint8: Uint8Array): void {
        const message = s5g.game.proto.CampaignInfoNotify.decode(uint8);
        console.log('SR活動資訊: ' + JSON.stringify(message));

        PromoManager.getInstance().campaign_list = message.campaign_list;
        PromoManager.getInstance().notifiable_campaign_list = [];
        //目前只使用第一個提示
        if (message.notifiable_campaign_list.length > 0) {
            let first = message.notifiable_campaign_list[0];
            PromoManager.getInstance().notifiable_campaign_list.push({ campaign_id: first.campaign_id, event_type: -1, redirect_game_id: first.redirect_game_id });
        }


        PromoManager.getInstance().checkRedirect();
    }
}