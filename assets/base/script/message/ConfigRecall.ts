import { BaseDataManager } from '@base/script/main/BaseDataManager';
import { BaseEvent } from '@base/script/main/BaseEvent';
import { IReceiveMessage, SocketManager } from '@base/script/socket/SocketManager';
import { ErrorCode, ErrorManager } from '@base/script/utils/ErrorManager';
import { logger, XUtils } from '@base/script/utils/XUtils';

export class ConfigRecall implements IReceiveMessage {
    msgid: s5g.game.proto.EMSGID = s5g.game.proto.EMSGID.eConfigRecall;

    /**
     * 
     * @param uint8 
     */
    public decode(uint8: Uint8Array): void {
        const message = s5g.game.proto.ConfigRecall.decode(uint8);
        logger('[@ConfigRecall] status_code ' + message.status_code);
        //Config失敗
        if (message.status_code !== s5g.game.proto.Status.Code.kSuccess) {
            if (message.status_code == s5g.game.proto.Status.Code.kHostError) {
                ErrorManager.getInstance().showError(ErrorCode.HostError);
            }
            else if (message.status_code == s5g.game.proto.Status.Code.kOutOfDate) {
                ErrorManager.getInstance().showError(ErrorCode.OutOfDate);

            }
            else {
                ErrorManager.getInstance().showError(ErrorCode.SetConfigError);
            }
            return;
        }

        //Config成功--------------------------------------------------------------

        BaseDataManager.getInstance().bet.setup(message.rate_arr, message.bet_5_arr, message.line_5_arr, message.rate_default_index);
        BaseDataManager.getInstance().playerCent = 0;
        BaseDataManager.getInstance().luckyStrikeBlockRate = message.lucky_strike_block_rate;
        BaseDataManager.getInstance().rng = message.last_rng;

        if (message.player_cent) {
            let cent = XUtils.convertToLong(message.player_cent);
            if (BaseDataManager.getInstance().TestOverFlow(cent) == true) {
                BaseDataManager.getInstance().playerCent = cent;
            }
        }

        BaseDataManager.getInstance().lawMinBet = message.law_min_bet;
        //幸運一擊購買金額清單(允許N個單注花費, 50:表示50元)
        if (message.common_datas && message.common_datas[0]) {
            BaseDataManager.getInstance().setFeatureBuyMultipleList(message.common_datas[0].data);
        }

        //玩家最後一次BS盤面
        if (message.last_bs_result) {
            if (message.last_bs_result.full_symbol_pattern) {
                BaseDataManager.getInstance().initFullSymbolPattern = message.last_bs_result.full_symbol_pattern;
            }
            if (message.last_bs_result.total_star_times.length > 0) {
                BaseDataManager.getInstance().initFullSymbolPattern = message.last_bs_result.total_star_times[(message.last_bs_result.total_star_times.length - 1)].times;
            }
        }

        //狀態回復(先儲存資料)
        if (message.recover_data) {
            BaseDataManager.getInstance().recoverData = message.recover_data;
        }

        //傳送SPIN結果
        BaseEvent.onConfigRecall.emit(message);

        SocketManager.getInstance().sendMessage(s5g.game.proto.EMSGID.eStripsCall);

    }
}