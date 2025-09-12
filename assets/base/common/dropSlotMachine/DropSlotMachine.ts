import { _decorator, Component, easing, instantiate, Node, Prefab, Tween, tween, Vec3 } from 'cc';
import { BaseDataManager } from '../../script/main/BaseDataManager';
import { TurboMode } from '../../script/types/BaseType';
import { XEvent, XEvent1, XEvent2 } from '../../script/utils/XEvent';
import { XUtils } from '../../script/utils/XUtils';
import { BaseDropSlotParser } from './BaseDropSlotParser';
import { BaseDropSymbol } from './BaseDropSymbol';
import { BaseDropSymbolData } from './BaseDropSymbolData';

const { ccclass, property } = _decorator;

@ccclass('DropSpeedConfig')
export class DropSpeedConfig {

    @property({ tooltip: "掉出時間", group: "掉出" })
    public outDuration: number = 0.18;

    @property({ tooltip: "掉出移動距離", group: "掉出" })
    public outDistance: number = 600;

    @property({ tooltip: "列間隔", group: "掉出" })
    public outRowDelay: number = 0;

    @property({ tooltip: "軸間隔", group: "掉出" })
    public outColumnDelay: number = 0;

    @property({ tooltip: "掉入時間", group: "掉入" })
    public inDuration: number = 0.18;

    @property({ tooltip: "掉入移動距離", group: "掉入" })
    public inDistance: number = 600;

    @property({ tooltip: "列間隔", group: "掉入" })
    public inRowDelay: number = 0.05;

    @property({ tooltip: "軸間隔", group: "掉入" })
    public inColumnDelay: number = 0.05;

    @property({ tooltip: "掉入時間", group: "掉入(子盤面)" })
    public subDuration: number = 0.18;

    @property({ tooltip: "掉入移動距離", group: "掉入(子盤面)" })
    public subDistance: number = 600;

    @property({ tooltip: "列間隔", group: "掉入(子盤面)" })
    public subRowDelay: number = 0.05;

    @property({ tooltip: "軸間隔", group: "掉入(子盤面)" })
    public subColumnDelay: number = 0.05;
}

/**
 * 掉落型老虎機
 */
@ccclass('DropSlotMachine')
export class DropSlotMachine extends Component {

    /**初始化盤面 */
    public static init: XEvent1<BaseDropSlotParser> = new XEvent1();
    /**初始化盤面 */
    public static setup: XEvent1<BaseDropSymbolData[]> = new XEvent1();
    /**開始瞇牌 */
    public static startMi: XEvent = new XEvent();
    public static setMiIndex: XEvent1<number> = new XEvent1();
    public static stopMi: XEvent = new XEvent();

    /**圖示演示(winPos, state) */
    public static animate: XEvent2<number[], number> = new XEvent2();

    /**首次掉落(callback) */
    public static mainDrop: XEvent2<BaseDropSymbolData[], () => void> = new XEvent2();
    /**子盤面掉落(callback) */
    public static subDrop: XEvent2<BaseDropSymbolData[], () => void> = new XEvent2();

    @property
    public numColumn: number = 0;

    @property
    public numRow: number = 0;

    @property({ type: Prefab })
    public symbolPrefab: Prefab;

    @property({ type: Node })
    public layers: Node[] = [];

    @property({ type: DropSpeedConfig, tooltip: "一般", group: "速度" })
    public normal: DropSpeedConfig = new DropSpeedConfig();

    @property({ type: DropSpeedConfig, tooltip: "閃電", group: "速度" })
    public speed: DropSpeedConfig = new DropSpeedConfig();

    @property({ type: DropSpeedConfig, tooltip: "Turbo", group: "速度" })
    public turbo: DropSpeedConfig = new DropSpeedConfig();

    private curSpeedConfig: DropSpeedConfig;

    /**圖示map */
    private symbolMap: BaseDropSymbol[][] = [];

    /**座標map */
    private coordinateMap: Vec3[][] = [];

    /**遊戲分析器(判斷是否要瞇牌等等) */
    private parser: BaseDropSlotParser;


    /**
     * 
     */
    onLoad() {

        for (let col: number = 0; col < this.numColumn; ++col) {
            this.symbolMap[col] = [];
            this.coordinateMap[col] = [];
            for (let row: number = 0; row < this.numRow; ++row) {
                let idx: number = col * this.numRow + row;
                let coordNode = this.node.getChildByPath(`Layout/Node_${idx}`);
                let symbol = instantiate(this.symbolPrefab).getComponent(BaseDropSymbol);
                symbol.layers = this.layers;
                this.symbolMap[col][row] = symbol;
                symbol.setGrid(col, row);
                symbol.layers[0].addChild(symbol.node);
                symbol.node.setPosition(coordNode.getPosition());
                this.coordinateMap[col][row] = coordNode.getPosition();
            }
        }
        this.node.getChildByPath(`Layout`).active = false;

        //初始化設定
        DropSlotMachine.init.on((parser) => {
            this.init(parser);
        }, this);

        //布置盤面
        DropSlotMachine.setup.on((map) => {
            this.parser.setSymbolMapData(map);

            for (let col: number = 0; col < this.numColumn; ++col) {
                for (let row: number = 0; row < this.numRow; ++row) {
                    this.symbolMap[col][row].setSymbolData(this.parser.getSymbolData(col, row));
                }
            }
        }, this);

        //第一盤掉落
        DropSlotMachine.mainDrop.on((map: BaseDropSymbolData[], complete) => {
            //重置資料
            this.parser.reset();
            let turboMode = BaseDataManager.getInstance().getTurboMode();
            this.curSpeedConfig = this.normal;
            if (turboMode === TurboMode.Speed) {
                this.curSpeedConfig = this.speed;
            }
            else if (turboMode === TurboMode.Turbo) {
                this.curSpeedConfig = this.turbo;
            }

            //舊盤面出場
            this.parser.setSymbolMapData(map);
            this.dropOut(() => {
                //新盤面進場
                this.dropIn(false, complete);
            });
        }, this);

        //子盤面掉落
        DropSlotMachine.subDrop.on((map: BaseDropSymbolData[], complete) => {
            this.parser.setSymbolMapData(map);
            let miPos = this.parser.getStartMiGrid();
            //要瞇牌(先落下, 再補新圖)
            if (miPos) {
                //舊圖示掉落
                this.dropDown(() => {
                    //新圖示進場
                    this.dropIn(true, complete);
                })
            }
            //不瞇牌(同時落下、補新圖)
            else {
                //舊圖示掉落
                this.dropDown();

                //新圖示進場
                this.dropIn(true, complete);
            }
        }, this);

        //圖示演示(位置清單, 狀態)
        DropSlotMachine.animate.on((winPos: number[], state: number) => {
            this.animate(winPos, state);
        }, this);

        this.curSpeedConfig = this.normal;
    }

    update(deltaTime: number) {

    }

    /**
     * 設定解析器
     * @param parser 
     */
    public init(parser: BaseDropSlotParser): void {
        this.parser = parser;
        this.parser.numColumn = this.numColumn;
        this.parser.numRow = this.numRow;
    }

    /**
     * 掉落出畫面(依序由左至右, 由下至上)
     */
    public dropOut(complete?: () => void): void {
        let count: number = this.numColumn * this.numRow;
        for (let col: number = 0; col < this.numColumn; ++col) {
            for (let row: number = this.numRow - 1; row > -1; --row) {
                let symbol = this.symbolMap[col][row];
                let coordinate = this.coordinateMap[col][row];
                Tween.stopAllByTarget(symbol.node);
                tween(symbol.node)
                    .delay(this.curSpeedConfig.outColumnDelay * col)
                    .delay(this.curSpeedConfig.outRowDelay * (this.numRow - row))
                    .to(this.curSpeedConfig.outDuration, { position: new Vec3(coordinate.x, coordinate.y - this.curSpeedConfig.outDistance, 0) })
                    .call(() => {
                        count--;
                        symbol.setIsEmpty(true);//移出時設為空
                        if (count <= 0) {
                            complete?.();
                        }
                    })
                    .start();
            }
        }
    }

    /**
    * 掉落進畫面(依序由左至右, 由下至上)
    */
    public dropIn(isSub: boolean, complete: () => void): void {

        //取得開始瞇牌位置
        let miPos = this.parser.getStartMiGrid();
        let miDelay: number = 0;
        let isMiPlaying: boolean = false;
        let temp: number = 0.5;
        let dropInDelay: number = 0;
        let currentMiIndex: number = -1;

        //掉落數量
        let dropCount: number = 0;

        for (let col: number = 0; col < this.numColumn; ++col) {
            for (let row: number = this.numRow - 1; row > -1; --row) {
                let symbol = this.symbolMap[col][row];

                //實心的不用處理
                if (symbol.getIsEmpty() === false) {
                    continue;
                }

                let coordinate = this.coordinateMap[col][row];
                let distance = isSub ? this.curSpeedConfig.subDistance : this.curSpeedConfig.inDistance;
                symbol.node.setPosition(new Vec3(coordinate.x, coordinate.y + distance, 0));
                symbol.setIsEmpty(false);

                let newData = this.parser.getSymbolData(col, row);
                symbol.setSymbolData(newData);

                console.log(`新圖示進場 ${col},${row} id=${newData.symbolID}`);

                dropCount++;

                //
                if (isMiPlaying) {
                    //第1顆瞇牌先亮光等1秒後再掉落, 其他顆間隔0.5秒掉落
                    if (miDelay == 0) {
                        miDelay = miDelay + 1;
                    }
                    else {
                        miDelay = miDelay + temp;
                        temp -= 0.1;
                        temp = Math.max(temp, 0.2);
                    }
                    dropInDelay = miDelay;
                }
                else {
                    let colDelay = isSub ? this.curSpeedConfig.subColumnDelay : this.curSpeedConfig.inColumnDelay;
                    let rowDelay = isSub ? this.curSpeedConfig.subRowDelay : this.curSpeedConfig.inRowDelay;
                    dropInDelay = colDelay * col + rowDelay * (this.numRow - row);
                }

                if (miPos && col == miPos.col && row <= miPos.row) {
                    isMiPlaying = true;
                }

                let inDuration = isSub ? this.curSpeedConfig.subDuration : this.curSpeedConfig.inDuration;

                Tween.stopAllByTarget(symbol.node);
                tween(symbol.node)
                    .delay(dropInDelay)
                    .to(inDuration, { position: coordinate }, { easing: easing.linear })
                    .call(() => {
                        dropCount--;
                        symbol.hit();

                        //到達瞇牌位置
                        if (isMiPlaying) {
                            if (currentMiIndex == -1) {
                                console.log(`開始瞇牌 ${JSON.stringify(miPos)}`);
                                currentMiIndex = col;
                                DropSlotMachine.startMi.emit();
                                DropSlotMachine.setMiIndex.emit(col);

                            }
                            else if (col > currentMiIndex) {
                                currentMiIndex = col;
                                console.log(`切換瞇牌軸 ${col}`);
                                DropSlotMachine.setMiIndex.emit(col);
                            }
                        }

                        //全部掉落完成
                        if (dropCount <= 0) {
                            //還原瞇牌
                            DropSlotMachine.setMiIndex.emit(-1);
                            DropSlotMachine.stopMi.emit();
                            complete?.();
                        }
                    })
                    .start();
            }
        }
    }

    /**
     * 盤面下降補空缺
     */
    public dropDown(complete?: () => void): void {
        let totalDropCount = 0;

        //依序處理掉落每一軸
        for (let col = 0; col < this.numColumn; ++col) {

            let numDrop = 0;
            for (let row = this.numRow - 1; row >= 0; --row) {
                let symbol = this.symbolMap[col][row];

                //實心不處理
                if (symbol.getIsEmpty() === false) {
                    continue;
                }

                // 往上找實心
                let solidSymbol: BaseDropSymbol = null;
                let solidRow = row - 1;
                let to: Vec3;

                for (; solidRow >= 0; --solidRow) {
                    let candidate = this.symbolMap[col][solidRow];
                    if (candidate.getIsEmpty() === false) {
                        solidSymbol = candidate;
                        numDrop += 1;
                        break;
                    }
                }

                //找到實心
                if (solidSymbol) {
                    // 更新資料與 map
                    solidSymbol.setGrid(col, row);
                    symbol.setGrid(col, solidRow);
                    this.symbolMap[col][row] = solidSymbol;
                    this.symbolMap[col][solidRow] = symbol;

                    to = this.coordinateMap[col][row];

                    console.log(`舊圖示掉落 ${col},${row}`);

                    let dropInDelay = this.curSpeedConfig.subColumnDelay * col + this.curSpeedConfig.subRowDelay * (this.numRow - row);

                    //位移
                    tween(solidSymbol.node)
                        //掉落
                        .delay(dropInDelay)
                        .to(this.curSpeedConfig.subDuration, { position: new Vec3(to.x, to.y, 0) })
                        .call(() => {
                            totalDropCount -= 1;
                            solidSymbol.hit();
                            if (totalDropCount === 0) {
                                complete?.();
                            }
                        })
                        .start();
                }
            }
            totalDropCount += numDrop;
        };

        // 處理沒有掉落的情況直接回調
        if (totalDropCount === 0 && complete) {
            complete();
        }
    }

    /**
     * 重置
     */
    public reset(): void {
        for (let col: number = 0; col < this.numColumn; ++col) {
            for (let row: number = this.numRow - 1; row > -1; --row) {
                let symbol = this.symbolMap[col][row];
                let coordinate = this.coordinateMap[col][row];
                Tween.stopAllByTarget(symbol.node);
                symbol.node.setPosition(coordinate);
            }
        }
    }

    /**
     * 圖示演示(位置:number[], 演示類型:number)
     */
    public animate(winPos: number[], state: number): void {
        winPos.forEach((pos) => {
            let grid = XUtils.posToGrid(pos);
            let symbol = this.symbolMap[grid.col][grid.row];
            symbol.animate(state);
        }, this);
    }
}

