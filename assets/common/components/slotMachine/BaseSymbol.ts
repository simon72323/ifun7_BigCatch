import { _decorator, Component, Node } from 'cc';

// import { Grid } from '@base/script/types/BaseType';

import { BaseSymbolData } from '@common/components/slotMachine/BaseSymbolData';
import { SymbolState } from '@common/components/slotMachine/SlotType';

import { Grid } from '@common/script/types/BaseType';

const { ccclass } = _decorator;

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

    /**是否為空圖示 */
    private empty: boolean = false;

    /**層級清單 */
    protected layerList: Node[] = [];

    /**是否在畫面中 */
    public isInView: boolean = true;

    /**
     * 設定圖示層級清單
     * @param list 
     */
    public setLayerList(list: Node[]): void {
        this.layerList = list;
    }

    /**
     * 設定圖示ID
     * @param newSymbolID 
     */
    public setSymbolID(_newSymbolID: number, _isFinal: boolean = false): void {
        //override
    }

    /**
     * 設定圖示ID
     * @param newSymbolID 
     */
    public setSymbolData(_data: BaseSymbolData): void {
        //override
    }

    /**
     * 設定圖示狀態
     * @param newSymbolID 
     */
    public setState(_state: SymbolState): void {
        //override
    }

    public setGrid(col: number, row: number): void {
        this.grid = { col, row };
        this.node.name = `symbol_${col}_${row}`;
    }

    public getGrid(): Grid {
        return this.grid;
    }

    public setPosIndex(index: number): void {
        this.posIndex = index;
    }

    public getPosIndex(): number {
        return this.posIndex;
    }

    public showSymbolWin(): void {
        //override
    }

    public hideSymbolWin(): void {
        //override
    }

    public setRandomSymbol(): void {
        //override
    }

    /**掉落到盤面時(轉動消去都會觸發, 只有畫面內的symbol會觸發) */
    public hit(isInView: boolean): void {
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
    public setIsMi(_isMi: boolean): void {
        //override
    }

    /**設定是否可見 */
    public setVisible(_visible: boolean): void {
        //override
    }
}


