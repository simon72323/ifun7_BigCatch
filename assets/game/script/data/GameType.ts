export interface IWinLineData {
    lineID: number;
    winPos: number[];
    symbolIDs: number[];
    payCredit: number;
}

export interface IWinScatterData {
    symbolID: number;
    winPos: number[];
    payCredit: number;
    amount: number;
    multiplier?: number;
}