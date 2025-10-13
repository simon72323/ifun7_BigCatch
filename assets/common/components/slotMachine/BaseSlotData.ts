import { BaseSymbolData } from '@common/components/slotMachine/BaseSymbolData';

/**
 * 老虎機資料&解析盤面
 */
export abstract class BaseSlotParser {
    /**輪帶表 */
    // public stripTable: number[][];
    /**輪帶索引 */
    // public rngList: number[];

    /**盤面結果符號ID */
    public slotPattern: number[][];

    /**強制結果 */
    public forceResult: number[][];
    /**子類別分析盤面,回傳瞇牌結果[true, false, ...] */
    abstract getMiList(): boolean[];
    // abstract getMiList2(fromMap: BaseSymbolData[][]): boolean[];

    /**軸圖示清單 */
    public symbols: number[][];

    abstract canSkip(): boolean;
}

