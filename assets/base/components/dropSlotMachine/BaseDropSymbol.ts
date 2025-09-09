import { _decorator, Component, Node } from 'cc';
import { Grid } from '../../script/types/BaseType';
import { BaseDropSymbolData } from './BaseDropSymbolData';
const { ccclass, property } = _decorator;

@ccclass('BaseDropSymbol')
export class BaseDropSymbol extends Component {

    /**盤面欄列位置 */
    private grid: Grid = { col: 0, row: 0 };

    /**層級 */
    public layers: Node[] = [];

    /**圖示ID */
    protected symbolID: number;

    /**是否已標記空 */
    private empty: boolean = false;

    /**
     * 設定方位
     * @param col 
     * @param row 
     */
    public setGrid(col: number, row: number): void {
        this.grid.col = col;
        this.grid.row = row;
        this.node.name = col + "_" + row;
    }

    /**
     * 取得方位
     * @returns 
     */
    public getGrid(): Grid {
        return this.grid;
    }

    /**
     * 設定圖示
     * @param id
     */
    public setSymbolData(data: BaseDropSymbolData): void {
        //override
    }

    /**
     * 圖示演示動畫(type:演示類型由各遊戲自定義)
     * @param state 
     */
    public animate(type: number): void {
        //override
    }

    public setIsEmpty(isEmpty: boolean): void {
        this.empty = isEmpty;
    }
    /**
     * 是否為空圖示
     */
    public getIsEmpty(): boolean {
        return this.empty;
    }

    /**
     * 掉落到定位
     */
    public hit(): void {
        //override
    }
}

