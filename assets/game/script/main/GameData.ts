// // import { BaseData } from '@base/script/main/BaseData';

// import { XUtils } from '@base/script/utils/XUtils';

// import { DataManager } from '@common/script/data/DataManager';

// import { BaseSymbolData2 } from '@game/components/slotMachine2/base/slotMachine2/BaseSymbolData2';
// import { SlotParser } from '@game/components/slotMachine2/SlotParser';
// import { GameConst } from '@game/script/constant/GameConst';


// export class GameData {

//     /**剩餘次數紀錄(提早結束特殊處理) */
//     public fsRemainTimes: number = -1;
//     /**FS內總贏分 */
//     public fsWin: number = 0;

//     /**是否剛進入FS */
//     public fsInitialize: boolean = false;

//     /**老虎機資料 */
//     public slotParser: SlotParser = new SlotParser();

//     /**金框資料 */
//     public stripBadgeDataList: number[][] = [];

//     private payloadKeyList: string[] = ['', '', 'H1', 'H2', 'H3', 'H4', 'L1', 'L2', 'L3', 'L4'];

//     public bsInitGoldenPattern: number[] = [
//         0, 0, 0, 0, 0, 0,
//         0, 0, 0, 0, 0, 0,
//         0, 0, 0, 0, 0, 0,
//         0, 0, 0, 0, 0, 0,
//         0, 0, 0, 0, 0, 0,
//         0, 0, 0, 0, 0, 0
//     ];

//     public fsInitGoldenPattern: number[] = [
//         0, 0, 0, 0, 0, 0,
//         0, 0, 0, 0, 0, 0,
//         0, 0, 0, 0, 0, 0,
//         0, 0, 0, 0, 0, 0,
//         0, 0, 0, 0, 0, 0,
//         0, 0, 0, 0, 0, 0
//     ];

//     public bsInitRng: number[] = [89, 77, 44, 44, 56, 39];
//     public fsInitRng: number[] = [12, 3, 96, 44, 92, 74];

//     /**BS最後盤面 */
//     public bsLastMap: BaseSymbolData2[][] = [];

//     /**可能出現金框軸 */
//     private bsGoldRange: number[] = [2, 3];
//     private fsGoldRange: number[] = [1, 2, 3, 4];

//     /**此轉是否有skip(決定自動轉延遲時間) */
//     public hasSkip: boolean = false;

//     // constructor() {
//     //     super();
//     //     this.REEL_COL = 6;
//     //     this.REEL_ROW = 5;
//     //     this.BIG_WIN_MULTIPLE = [10, 20, 40, 80, 120];//自訂BigWin倍數
//     // }

//     /**
//      * 不同速度參數設定
//      */
//     private turboSettings: TurboSetting[] = [{
//         showWinDuration: 0.67,
//         explodeTimeScale: 1,
//         explodeTime: 0.2,
//         autoSpinRoundDelay: 0.3
//     }, {
//         showWinDuration: 0.67,
//         explodeTimeScale: 1,
//         explodeTime: 0.2,
//         autoSpinRoundDelay: 0
//     }, {
//         showWinDuration: 0.67,
//         explodeTimeScale: 1,
//         explodeTime: 0.2,
//         autoSpinRoundDelay: 0
//     }, {
//         showWinDuration: 0.67,
//         explodeTimeScale: 1,
//         explodeTime: 0.2,
//         autoSpinRoundDelay: 0
//     }, {
//         showWinDuration: 0.67,
//         explodeTimeScale: 1,
//         explodeTime: 0.2,
//         autoSpinRoundDelay: 0
//     }, {
//         showWinDuration: 0.67,
//         explodeTimeScale: 1,
//         explodeTime: 0.2,
//         autoSpinRoundDelay: 0
//     }, {
//         showWinDuration: 0.67,
//         explodeTimeScale: 1,
//         explodeTime: 0.2,
//         autoSpinRoundDelay: 0
//     }, {
//         showWinDuration: 0.67,
//         explodeTimeScale: 1,
//         explodeTime: 0.2,
//         autoSpinRoundDelay: 0
//     }, {
//         showWinDuration: 0.67,
//         explodeTimeScale: 1,
//         explodeTime: 0.2,
//         autoSpinRoundDelay: 0
//     }, {
//         showWinDuration: 0.67,
//         explodeTimeScale: 1,
//         explodeTime: 0.2,
//         autoSpinRoundDelay: 0
//     }, {
//         showWinDuration: 0.67,
//         explodeTimeScale: 1,
//         explodeTime: 0.2,
//         autoSpinRoundDelay: 0
//     }, {
//         showWinDuration: 0.67,
//         explodeTimeScale: 1,
//         explodeTime: 0.2,
//         autoSpinRoundDelay: 0
//     }, {
//         showWinDuration: 0.3,
//         explodeTimeScale: 1.2,
//         explodeTime: 0.1,
//         autoSpinRoundDelay: 0

//     }];

//     /**
//      * 取得速度對應參數
//      * @returns 
//      */
//     public getTurboSetting(): TurboSetting {
//         return this.turboSettings[DataManager.getInstance().getTurboMode()];
//     }

//     /**
//      * 判斷scatter數量是否需要瞇
//      * @param count 
//      * @returns 
//      */
//     public needMi(count: number): boolean {
//         return count === GameConst.BONUS_WIN_COUNT - 1;
//     }

//     private payloadTemplate = {
//         symbolPoints: {
//             H1: [
//                 { count: 6, point: 2.5 },
//                 { count: 5, point: 1.5 },
//                 { count: 4, point: 1 },
//                 { count: 3, point: 0.5 }
//             ],
//             H2: [
//                 { count: 6, point: 1.5 },
//                 { count: 5, point: 1 },
//                 { count: 4, point: 0.75 },
//                 { count: 3, point: 0.4 }
//             ],
//             H3: [
//                 { count: 6, point: 1 },
//                 { count: 5, point: 0.75 },
//                 { count: 4, point: 0.5 },
//                 { count: 3, point: 0.25 }
//             ],
//             H4: [
//                 { count: 6, point: 1 },
//                 { count: 5, point: 0.75 },
//                 { count: 4, point: 0.5 },
//                 { count: 3, point: 0.25 }
//             ],
//             L1: [
//                 { count: 6, point: 0.5 },
//                 { count: 5, point: 0.3 },
//                 { count: 4, point: 0.2 },
//                 { count: 3, point: 0.1 }
//             ],
//             L2: [
//                 { count: 6, point: 0.5 },
//                 { count: 5, point: 0.3 },
//                 { count: 4, point: 0.2 },
//                 { count: 3, point: 0.1 }
//             ],
//             L3: [
//                 { count: 6, point: 0.25 },
//                 { count: 5, point: 0.15 },
//                 { count: 4, point: 0.1 },
//                 { count: 3, point: 0.05 }
//             ],
//             L4: [
//                 { count: 6, point: 0.25 },
//                 { count: 5, point: 0.15 },
//                 { count: 4, point: 0.1 },
//                 { count: 3, point: 0.05 }
//             ]
//         },
//         bet: {
//             min: 1,
//             max: 100,
//             featureLimit: '100,000',
//             featureMultipleClassic: 75
//         }
//     };

//     public getGameHelpPayload(): any {
//         //重新clone一份新資料並覆寫
//         let responsePayload = JSON.parse(JSON.stringify(this.payloadTemplate));

//         for (let key of Object.keys(responsePayload.symbolPoints)) {
//             //牌型
//             let payDataList = responsePayload.symbolPoints[key];
//             payDataList.forEach((data) => {
//                 data.point = XUtils.NumberToCentString(data.point * DataManager.getInstance().bet.getCurTotal());
//             }, this);
//         }
//         responsePayload.bet.min = XUtils.NumberToCentString(DataManager.getInstance().bet.getTotalAt(0));
//         responsePayload.bet.max = XUtils.NumberToCentString(DataManager.getInstance().bet.getMaxTotal());
//         responsePayload.bet.featureLimit = DataManager.getInstance().getFeatureBuyMaxBet().toString();
//         responsePayload.bet.featureMultipleClassic = DataManager.getInstance().getFeatureBuyMultipleByType(0);

//         return responsePayload;
//     }

//     public getPayBySymbolID(symbolID: number): { count: number, cent: string }[] {
//         let key = this.payloadKeyList[symbolID];
//         let result = [];
//         let payData = this.payloadTemplate.symbolPoints[key];
//         if (payData) {
//             payData.forEach((data) => {
//                 result.push({ count: data.count, cent: XUtils.NumberToCentString(data.point * DataManager.getInstance().bet.getCurTotal()) });
//             }, this);
//         }
//         return result;
//     }


//     /**
//      * 重置累積資料
//      */
//     public resetFS(): void {
//         this.fsRemainTimes = -1;
//         this.fsWin = 0;
//         this.fsInitialize = false;
//     }

//     public getNextMultiplier(multiplier: number): number {
//         let preIdx = GameConst.multiplierList.indexOf(multiplier);
//         return GameConst.multiplierList[preIdx + 1];
//     }

//     public getInitMultiplierIdx(): number {
//         return DataManager.getInstance().isBS() ? 0 : GameConst.FS_INIT_MULTIPLIER_INDEX;
//     }

//     /**
//      * 取得可能出現金框軸索引清單
//      * @returns 
//      */
//     public getGoldenReelRange(): number[] {
//         return DataManager.getInstance().isBS() ? this.bsGoldRange : this.fsGoldRange;
//     }
// }

// /**
//  * 不同速度參數設定
//  */
// export class TurboSetting {
//     /**中獎演示時間 */
//     public showWinDuration: number = 0;
//     /**消去動畫縮放率 */
//     public explodeTimeScale: number = 0;
//     /**實際動畫爆炸時間 */
//     public explodeTime: number = 0;
//     /**自動轉延遲時間 */
//     public autoSpinRoundDelay: number = 0;
// }