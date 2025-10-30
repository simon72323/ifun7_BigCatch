
// import { GameConst, SymbolID } from '@game/script/data/GameConst';

// import { BaseSlotParser } from '@common/components/slotMachine/BaseSlotData';
// // import { BaseSymbolData } from '@common/components/slotMachine/BaseSymbolData';


// /**
//  * BSX5軸 遊戲客製化分析盤面
//  */
// export class SlotParser extends BaseSlotParser {

//     public buyFS: boolean = false;

//     // public slotPattern: number[];
//     // /**
//     //  * 每一轉設定輪帶, 遇到scatter要隨機或依照最終盤面設定
//     //  * @param stripTable 輪帶表，二維陣列，每個子陣列代表一軸的符號ID列表
//     //  * @param symbolPattern 符號圖案，一維陣列，表示盤面上每個位置的符號ID
//     //  */
//     // public setSlotPattern(slotPattern: number[]): void {
//     //     this.slotPattern = slotPattern;

//     //     // let stripDataList = DataManager.getInstance().getData<GameData>().stripBadgeDataList;
//     //     // stripDataList.length = 0;

//     //     // let numRow = GameConst.REEL_ROW;
//     //     // let numCol: number = stripTable.length;
//     //     // for (let col: number = 0; col < numCol; ++col) {
//     //     //     let strip = stripTable[col];
//     //     //     let valueList = [];
//     //     //     let rng = this.rngList[col];
//     //     //     for (let row: number = 0; row < numRow; ++row) {
//     //     //         valueList[(rng - 1 + row + strip.length) % strip.length] = goldenPattern[row * numCol + col];
//     //     //     }
//     //     //     // stripDataList.push(valueList);
//     //     // }
//     // }

//     /**
//      * 轉動瞇牌
//      * @returns 
//      */
//     public getMiList(): boolean[] {
//         let miList: boolean[] = [];
//         let scatterCount: number = 0;
//         for (let col: number = 0; col < GameConst.REEL_COL; ++col) {
//             miList.push(scatterCount >= 2);
//             for (let row: number = 0; row < GameConst.REEL_ROW; ++row) {
//                 let symbolID = this.slotPattern[row][col];
//                 if (symbolID === SymbolID.Scatter) {
//                     scatterCount++;
//                 }
//             }
//         }
//         return miList;
//     }

//     public canSkip(): boolean {
//         if (this.buyFS) {
//             return true;
//         }
//         else {
//             return this.getMiList().every((mi) => mi === false);
//         }
//     }
// }