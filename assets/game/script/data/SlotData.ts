
import { BaseSymbolData2 } from '@game/components/slotMachine2/base/slotMachine2/BaseSymbolData2';
import { SlotParser } from '@game/components/slotMachine2/SlotParser';
import { GameConst } from '@game/script/data/GameConst';

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
    /**金框資料 */
    public stripBadgeDataList: number[][] = [];
    private payloadKeyList: string[] = ['', '', 'H1', 'H2', 'H3', 'H4', 'L1', 'L2', 'L3', 'L4'];
    /**BS初始金框盤面 */
    // public bsInitGoldenPattern: number[] = [
    //     0, 0, 0, 0, 0,
    //     0, 0, 0, 0, 0,
    //     0, 0, 0, 0, 0
    // ];

    // /**FS初始金框盤面 */
    // public fsInitGoldenPattern: number[] = [
    //     0, 0, 0, 0, 0,
    //     0, 0, 0, 0, 0,
    //     0, 0, 0, 0, 0
    // ];

    /**BS最後盤面 */
    public bsLastMap: BaseSymbolData2[][] = [];
    /**此轉是否有skip(決定自動轉延遲時間) */
    public hasSkip: boolean = false;

    /**
     * 判斷scatter數量是否需要瞇
     * @param count 
     * @returns 
     */
    public needMi(count: number): boolean {
        return count === GameConst.BONUS_WIN_COUNT - 1;
    }

    private payloadTemplate = {
        symbolPoints: {
            H1: [
                { count: 6, point: 2.5 },
                { count: 5, point: 1.5 },
                { count: 4, point: 1 },
                { count: 3, point: 0.5 }
            ],
            H2: [
                { count: 6, point: 1.5 },
                { count: 5, point: 1 },
                { count: 4, point: 0.75 },
                { count: 3, point: 0.4 }
            ],
            H3: [
                { count: 6, point: 1 },
                { count: 5, point: 0.75 },
                { count: 4, point: 0.5 },
                { count: 3, point: 0.25 }
            ],
            H4: [
                { count: 6, point: 1 },
                { count: 5, point: 0.75 },
                { count: 4, point: 0.5 },
                { count: 3, point: 0.25 }
            ],
            L1: [
                { count: 6, point: 0.5 },
                { count: 5, point: 0.3 },
                { count: 4, point: 0.2 },
                { count: 3, point: 0.1 }
            ],
            L2: [
                { count: 6, point: 0.5 },
                { count: 5, point: 0.3 },
                { count: 4, point: 0.2 },
                { count: 3, point: 0.1 }
            ],
            L3: [
                { count: 6, point: 0.25 },
                { count: 5, point: 0.15 },
                { count: 4, point: 0.1 },
                { count: 3, point: 0.05 }
            ],
            L4: [
                { count: 6, point: 0.25 },
                { count: 5, point: 0.15 },
                { count: 4, point: 0.1 },
                { count: 3, point: 0.05 }
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
                result.push({ count: data.count, cent: Utils.numberFormat(data.point * DataManager.getInstance().getBetTotal()) });
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