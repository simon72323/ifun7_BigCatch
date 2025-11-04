import { _decorator } from 'cc';

/**
 * 圖示狀態
 */
// export enum SymbolState {
//     Normal = 0,
//     Blur,
//     Ani
// }

/**
 * 中獎魚資料
 */
export interface IWinFishData {
    allWildPos: number[];
    allFishPos: number[];
    fishSymbolIDs: number[];
    totalWildCount: number;
}

/**
 * 中獎線資料
 */
export interface IWinLineData {
    payLineID: number;
    winPos: number[];
    winSymbolIDs: number[];
    payCredit: number;
}