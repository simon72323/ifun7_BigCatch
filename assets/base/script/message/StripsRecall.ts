import { SettingsPage1 } from '@base/components/settingsPage/SettingsPage1';
import { AudioManager } from '@base/script/audio/AudioManager';
import { BaseDataManager } from '@base/script/main/BaseDataManager';
import { BaseEvent } from '@base/script/main/BaseEvent';
import { IReceiveMessage } from '@base/script/socket/SocketManager';
import { ModuleID, StripTable } from '@base/script/types/BaseType';
import { ErrorCode, ErrorManager } from '@base/script/utils/ErrorManager';

/**
 * 輪帶封包
 */
export class StripsRecall implements IReceiveMessage {
    msgid: s5g.game.proto.EMSGID = s5g.game.proto.EMSGID.eStripsRecall;

    public decode(uint8: Uint8Array): void {
        const message = s5g.game.proto.StripsRecall.decode(uint8);

        //錯誤提示
        if (message.status_code != s5g.game.proto.Status.Code.kSuccess) {
            ErrorManager.getInstance().showError(ErrorCode.SetStripError);
            return;
        }

        //重置場景輪帶
        BaseDataManager.getInstance().stripTables = [];
        //全部場景輪帶資料
        let allStrips = message.allstrips;
        for (let i = 0; i < allStrips.length; i++) {
            //N條輪帶資料
            let strips: number[][] = [];
            //某場景輪帶資料(包含3種倍率輪帶)
            let moduleStripData = allStrips[i];
            //場景輪帶資料
            let stripTable = new StripTable(moduleStripData.module_id as ModuleID);

            //multi_strips(有依照不同倍率分輪帶)
            if (moduleStripData.multi_strips.length !== 0) {
                for (let j = 0; j < moduleStripData.multi_strips.length; j++) {
                    //其中一種倍率輪帶
                    let multiStrip = moduleStripData.multi_strips[j];
                    for (let k = 0; k < multiStrip.strips.length; k++) {
                        //單條輪帶資料
                        let temp_strip_arr: number[] = [];
                        //其中一軸輪帶
                        let reelStrip = multiStrip.strips[k];
                        for (let g = 0; g < reelStrip.strip_arr.length; g++) {
                            //某一格輪帶值
                            let stripValue = reelStrip.strip_arr[g];
                            temp_strip_arr.push(stripValue);
                        }
                        strips.push(temp_strip_arr);
                    }
                }
            }
            //strips(一般N軸輪帶資料)
            //TODO:與multi_strips結構不同, 後續要再想如何優化
            else {
                for (let j = 0; j < moduleStripData.strips.length; j++) {
                    //某軸輪帶
                    let strip = moduleStripData.strips[j];
                    let temp: number[] = [];
                    for (let k = 0; k < strip.strip_arr.length; k++) {
                        temp.push(strip.strip_arr[k]);
                    }
                    strips.push(temp);
                }
            }
            stripTable.setStrips(strips);
            BaseDataManager.getInstance().stripTables.push(stripTable);
        }

        //共用UI初始化 ----------------------------------------------
        SettingsPage1.lessEnabled.emit(BaseDataManager.getInstance().bet.getLessEnabled());
        SettingsPage1.setMute.emit(AudioManager.getInstance().getIsMute());

        BaseEvent.refreshCredit.emit(BaseDataManager.getInstance().playerCent);
        BaseEvent.refreshWin.emit(0);

        BaseEvent.buyFeatureVisible.emit(BaseDataManager.getInstance().isFeatureBuyEnabled());

        //通知初始化封包完成 ----------------------------------------------
        BaseEvent.initMessageComplete.emit();
        BaseEvent.hideLoading.emit();

    }
}