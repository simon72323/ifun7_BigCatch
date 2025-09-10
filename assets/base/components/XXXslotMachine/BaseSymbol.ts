import { _decorator, Component, Node } from 'cc';
import { Grid } from '../../script/types/BaseType';
import { SymbolState } from './SlotType';

const { ccclass, property } = _decorator;

/**
 * Symbol介面
 */
@ccclass('BaseSymbol')
export class BaseSymbol extends Component {

    /**圖示編號 */
    public symbolID = -1;

    /**對應pos節點索引 */
    protected posIndex: number = -1;

    /**盤面欄列位置 */
    protected grid: Grid = { col: 0, row: 0 };

    public drop: boolean = false;

    /**
     * 設定圖示ID
     * @param newSymbolID 
     */
    public setSymbolID(newSymbolID: number, stripIdx?: number): void {
        //override
    }

    /**
     * 設定圖示狀態
     * @param newSymbolID 
     */
    public setState(state: SymbolState): void {
        //override
    }

    public setGrid(grid: Grid): void {
        this.grid = grid;
        this.node.name = `symbol_${grid.col}_${grid.row}`;
    }

    public getGrid(): Grid {
        return this.grid;
    }

    public setPosIndex(index: number): void {
        this.posIndex = index;
    }

    public copyPositionAndScaleFrom(node: Node): void {
        this.node.setPosition(node.getPosition());
        this.node.setScale(node.getScale());
    }

    public getPosIndex(): number {
        return this.posIndex;
    }

    public showWin(): void {
        //override
    }
    public explode(): void {
        //override
    }

    public randomSymbol(): void {
        //override
    }

    /**掉落到盤面時(轉動消去都會觸發, 只有畫面內的symbol會觸發) */
    public hit(): void {
        //override
    }
    public hitOutside(): void {
        //override
    }

    /**Spin時(所有symbol) */
    public onSpin(): void {
        //override  
    }

    /**停輪時(所有symbol) */
    public onStop(): void {
        //override  
    }

    /**開始瞇牌 */
    public setIsMi(isMi: boolean): void {
        //override
    }
}


