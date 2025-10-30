
// import { SlotParser } from '@game/components/slotMachine/SlotParser';
import { SymbolID } from '@game/script/data/GameConst';

// import { BaseSymbolData } from '@common/components/slotMachine/BaseSymbolData';
import { DataManager } from '@common/script/data/DataManager';
import { Utils } from '@common/script/utils/Utils';


export class SlotData {
    /**剩餘次數紀錄(提早結束特殊處理) */
    // public fsRemainTimes: number = -1;
    /**FS內總贏分 */
    // public fsWin: number = 0;
    /**是否剛進入FS */
    // public fsInitialize: boolean = false;
    /**BS最後盤面 */
    // public bsLastMap: BaseSymbolData[][] = [];
    /**此轉是否有skip(決定自動轉延遲時間) */
    // public hasSkip: boolean = false;

    /**紀錄免費遊戲 wild倍率 */
    public fsWildMultiply: number = 0;

    /**賠率資料 */
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
            F7: [
                { count: 5, point: 20 },
                { count: 4, point: 5 },
                { count: 3, point: 1 }
            ],
            F8: [
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
        /**symbolID對應的賠率資料key */
        const symbolIDPayloadMap = new Map<number, string>([
            [SymbolID.H1, 'H1'],
            [SymbolID.H2, 'H2'],
            [SymbolID.H3, 'H3'],
            [SymbolID.H4, 'H4'],
            [SymbolID.F1, 'F1'],
            [SymbolID.F2, 'F2'],
            [SymbolID.F3, 'F3'],
            [SymbolID.F4, 'F4'],
            [SymbolID.F5, 'F5'],
            [SymbolID.F6, 'F6'],
            [SymbolID.F7, 'F7'],
            [SymbolID.F8, 'F8'],
            [SymbolID.LA, 'LA'],
            [SymbolID.LK, 'LK'],
            [SymbolID.LQ, 'LQ'],
            [SymbolID.LJ, 'LJ'],
            [SymbolID.LT, 'LT']
        ]);
        let result = [];
        const payData = this.payloadTemplate.symbolPoints[symbolIDPayloadMap.get(symbolID)];
        if (payData) {
            payData.forEach((data: { count: number, point: number }) => {
                result.push({ count: data.count, cent: Utils.numberFormat(data.point * DataManager.getInstance().bet.getBetTotal()) });
            }, this);
        }
        return result;
    }
}