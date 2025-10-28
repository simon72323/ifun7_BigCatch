
import { SlotParser } from '@game/components/slotMachine/SlotParser';
import { GameConst } from '@game/script/data/GameConst';

import { BaseSymbolData } from '@common/components/slotMachine/BaseSymbolData';
import { DataManager } from '@common/script/data/DataManager';
import { Utils } from '@common/script/utils/Utils';


export class SlotData {
    /**剩餘次數紀錄(提早結束特殊處理) */
    public fsRemainTimes: number = -1;
    /**FS內總贏分 */
    public fsWin: number = 0;
    /**是否剛進入FS */
    public fsInitialize: boolean = false;
    /**老虎機資料 */
    public slotParser: SlotParser = new SlotParser();
    /**紀錄免費遊戲 wild倍率 */
    public fsWildMultiply: number = 0;
    /**金框資料 */
    // public stripBadgeDataList: number[][] = [];
    private payloadKeyList: string[] = ['', 'H1', 'H2', 'H3', 'H4', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'L1', 'L2', 'L3', 'L4', 'L5', ''];

    /**BS最後盤面 */
    public bsLastMap: BaseSymbolData[][] = [];
    /**此轉是否有skip(決定自動轉延遲時間) */
    public hasSkip: boolean = false;

    /**
     * 判斷scatter數量是否需要瞇
     * @param count 
     * @returns 
     */
    public needMi(count: number): boolean {
        return count === GameConst.SCATTER_WIN_COUNT - 1;
    }

    /**
     * 取得免費遊戲 wild倍率
     * @returns 倍率
     */
    // public getWildMultiply(): number {
    //     if (this.fsWildMultiply > 4) {
    //         return 2;
    //     } else if (this.fsWildMultiply > 8) {
    //         return 4;
    //     } else {
    //         return 1;
    //     }
    // }

    private payloadTemplate = {
        symbolPoints: {
            H1: [
                { count: 5, point: 200 },
                { count: 4, point: 20 },
                { count: 3, point: 5 },
                { count: 2, point: 0.5 }
            ],
            H2: [
                { count: 5, point: 100 },
                { count: 4, point: 15 },
                { count: 3, point: 3 }
            ],
            H3: [
                { count: 5, point: 50 },
                { count: 4, point: 10 },
                { count: 3, point: 2 }
            ],
            H4: [
                { count: 5, point: 50 },
                { count: 4, point: 10 },
                { count: 3, point: 2 }
            ],
            F1: [
                { count: 5, point: 20 },
                { count: 4, point: 5 },
                { count: 3, point: 1 }
            ],
            F2: [
                { count: 5, point: 20 },
                { count: 4, point: 5 },
                { count: 3, point: 1 }
            ],
            F3: [
                { count: 5, point: 20 },
                { count: 4, point: 5 },
                { count: 3, point: 1 }
            ],
            F4: [
                { count: 5, point: 20 },
                { count: 4, point: 5 },
                { count: 3, point: 1 }
            ],
            F5: [
                { count: 5, point: 20 },
                { count: 4, point: 5 },
                { count: 3, point: 1 }
            ],
            F6: [
                { count: 5, point: 20 },
                { count: 4, point: 5 },
                { count: 3, point: 1 }
            ],
            L1: [
                { count: 5, point: 10 },
                { count: 4, point: 2.5 },
                { count: 3, point: 0.2 }
            ],
            L2: [
                { count: 5, point: 10 },
                { count: 4, point: 2.5 },
                { count: 3, point: 0.2 }
            ],
            L3: [
                { count: 5, point: 5 },
                { count: 4, point: 1 },
                { count: 3, point: 0.2 }
            ],
            L4: [
                { count: 5, point: 5 },
                { count: 4, point: 1 },
                { count: 3, point: 0.2 }
            ],
            L5: [
                { count: 5, point: 5 },
                { count: 4, point: 1 },
                { count: 3, point: 0.2 }
            ]
        },
        bet: {
            min: 1,
            max: 100,
            featureLimit: '100,000',
            featureMultipleClassic: 75
        }
    };

    /**
     * 取得符號ID對應的賠率資料
     * @param symbolID 符號ID
     * @returns 賠率資料
     */
    public getPayBySymbolID(symbolID: number): { count: number, cent: string }[] {
        let key = this.payloadKeyList[symbolID];
        let result = [];
        let payData = this.payloadTemplate.symbolPoints[key];
        if (payData) {
            payData.forEach((data: { count: number, point: number }) => {
                result.push({ count: data.count, cent: Utils.numberFormat(data.point * DataManager.getInstance().bet.getBetTotal()) });
            }, this);
        }
        return result;
    }

    /**
     * 重置累積資料
     */
    // public resetFS(): void {
    //     this.fsRemainTimes = -1;
    //     this.fsWin = 0;
    //     this.fsInitialize = false;
    // }

    // /**
    //  * 取得下一個倍數
    //  * @param multiplier 當前倍數
    //  * @returns 下一個倍數
    //  */
    // public getNextMultiplier(multiplier: number): number {
    //     let preIdx = GameConst.multiplierList.indexOf(multiplier);
    //     return GameConst.multiplierList[preIdx + 1];
    // }
}

/**
 * 不同速度參數設定
 */
// export class TimeSettings {

//     /**中獎演示時間 */
//     public showWinDuration: number = 0;
//     /**消去動畫縮放率 */
//     public explodeTimeScale: number = 0;
//     /**實際動畫爆炸時間 */
//     public explodeTime: number = 0;
//     /**自動轉延遲時間 */
//     public autoSpinRoundDelay: number = 0;
// }