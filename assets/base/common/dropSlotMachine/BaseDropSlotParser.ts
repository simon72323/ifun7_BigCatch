import { _decorator } from 'cc';
import { Grid } from '../../script/types/BaseType';
import { BaseDropSymbolData } from './BaseDropSymbolData';
const { ccclass, property } = _decorator;

/**
 * 盤面分析器, 由各遊戲實作, 依照盤面資料客製化瞇牌邏輯等等
 */
@ccclass('BaseDropSlotParser')
export abstract class BaseDropSlotParser {

    /**欄數 */
    public numColumn: number = 5;

    /**列數 */
    public numRow: number = 5;

    /**盤面資料 */
    protected map: BaseDropSymbolData[] = [];

    /**取得瞇牌位置 */
    abstract getStartMiGrid(): Grid;

    /**重置資料 */
    abstract reset(): void;

    /**設定盤面資料 */
    public setSymbolMapData(map: BaseDropSymbolData[]): void {
        this.map = map;
    }

    public getSymbolData(col: number, row: number): BaseDropSymbolData {
        let mapIdx = this.numColumn * row + col;
        return this.map[mapIdx];
    }
}

