import { ISendMessage } from "../socket/SocketManager";

/**
 * 請求取得指定活動內容
 */
export class CampaignCall implements ISendMessage {
    msgid: s5g.game.proto.EMSGID = s5g.game.proto.EMSGID.eCampaignCall;

    public encode(campaign_id: string): Uint8Array {
        let msg: s5g.game.proto.CampaignCall = new s5g.game.proto.CampaignCall();
        msg.msgid = this.msgid;
        msg.campaign_id = campaign_id;
        return s5g.game.proto.CampaignCall.encode(msg).finish();
    }
}