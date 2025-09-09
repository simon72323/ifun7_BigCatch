import { _decorator, CCInteger, Component, easing, instantiate, Node, tween, UIOpacity, UITransform, Vec3 } from 'cc';
import { XUtils } from '@/base/script/utils/XUtils';
import { BaseSymbol2 } from './BaseSymbol2';
import { BaseSymbolData2 } from './BaseSymbolData2';
import { ReelState2, SlotReelConfig2, SymbolState2 } from './SlotType2';

const { ccclass, property } = _decorator;


/**
 * 老虎機軸元件
 */
@ccclass('SlotReel2')
export class SlotReel2 extends Component {

    @property({ type: CCInteger, tooltip: "畫面列數" })
    public viewRow: number = 3;
    @property({ type: CCInteger, tooltip: "上下保留列數" })
    public keepRow: number = 2;

    /**啟動完成 */
    public static BEGIN_COMPLETE: string = "BEGIN_COMPLETE";
    /**停止完成 */
    public static STOP_COMPLETE: string = "STOP_COMPLETE";
    /**掉落完成 */
    public static DROP_COMPLETE: string = "DROP_COMPLETE";
    /**新盤面掉落完成 */
    public static FILL_COMPLETE: string = "FILL_COMPLETE";

    /**第一軸走的顆數,後面的軸要停輪時至少要走到相等顆數才能停, 否則有可能後面的軸先停 */
    public static firstReelCount: number = 0;

    /**節點位置 */
    private posList: Node[] = [];

    /**輪帶資料 */
    private strip: number[] = [];
    /**當期輪帶索引 */
    private currentRng: number = -1;
    /**最終輪帶索引 */
    private finalRng: number = -1;

    /**輪帶上圖示 */
    private symbolList: BaseSymbol2[] = [];

    /**軸索引 */
    public reelIndex: number = -1;

    /**老虎機狀態 */
    private reelState: ReelState2 = ReelState2.IDLE;

    /**是否已要求停止 */
    private requestStop: boolean = false;

    /**軸參數 */
    public config: SlotReelConfig2;

    /**目前累計秒數 */
    private curveTime = 0;

    /**loop持續時間 */
    private curSpinTime = 0;
    private curSpinCount = 0;

    /**強制結果盤面 */
    private forceResult: number[] = [];

    /**圖示顯示時透明度 */
    private static VISIBLE_OPACITY = 255;
    /**圖示隱藏時透明度 */
    private static HIDE_OPACITY = 0;

    private isMi: boolean = false;

    private randomSeed: number = 0;

    /**戲謔類型 */
    private nudgeType: number = -1;

    /**
     * 設置輪帶
     * @param strip 
     */
    public setStrip(strip: number[]): void {
        this.strip = strip;
    }

    /**
     * 初始化
     * @param reelIndex 
     * @param config 
     */
    public init(reelIndex: number, config: SlotReelConfig2): void {

        this.reelIndex = reelIndex;
        this.config = config;

        //先列出所有位置
        let idx: number = 0;
        let posNode = this.node.getChildByName(`NodePos${idx}`);
        while (posNode != null) {
            posNode.removeAllChildren();
            //轉換成ReelLayer坐標系
            let worldPos = this.node.getComponent(UITransform).convertToWorldSpaceAR(posNode.getPosition());
            //沒有設定layer就不調整層級
            let targetLayerList = config.layerList.length > 0 ? config.layerList : config.reelLayerList;
            if (config.layerList.length > 0) {
                let layerPos = config.layerList[0].getComponent(UITransform).convertToNodeSpaceAR(worldPos);
                posNode.setPosition(layerPos);
            }
            else if (config.reelLayerList.length > 0) {
                let layerPos = config.reelLayerList[reelIndex].getComponent(UITransform).convertToNodeSpaceAR(worldPos);
                posNode.setPosition(layerPos);
            }

            this.posList.push(posNode);
            let symbol = instantiate(config.symbolPrefab).getComponent(BaseSymbol2);
            symbol.setLayerList(targetLayerList);
            targetLayerList[0].addChild(symbol.node);
            symbol.setPosIndex(idx);
            symbol.setGrid({ col: reelIndex, row: idx });
            this.symbolList.push(symbol);
            symbol.node.setPosition(posNode.getPosition());
            symbol.node.setScale(posNode.getScale(symbol.node.scale));
            idx++;
            posNode = this.node.getChildByName(`NodePos${idx}`);
        }
    }

    /**
     * 初始化盤面
     * @param strip 輪帶資料
     * @param rng 輪帶索引
     */
    public setupStripAndRng(strip: number[], rng: number): void {

        this.setStrip(strip);

        this.currentRng = this.getRng(rng - 1);
        this.symbolList.forEach((symbol, idx) => {
            let stripIdx = this.getRng(this.currentRng - this.keepRow + symbol.getPosIndex());
            symbol.isInView = this.isInView(symbol.getPosIndex());
            symbol.setSymbolID(this.strip[stripIdx], stripIdx);
        })
        this.setSymbolState(SymbolState2.Normal);
    }


    private getPosIdx(idx: number): number {
        return (idx + this.posList.length) % this.posList.length;
    }

    /**
     * 開始轉動
     * @returns 
     */
    public spin(): void {
        if (this.reelState !== ReelState2.IDLE) {
            return;
        }
        if (this.reelIndex === 0) {
            SlotReel2.firstReelCount = 0;
        }

        this.randomSeed = Math.random();
        this.requestStop = false;
        this.reelState = ReelState2.BEGIN;
        this.symbolList.forEach((symbol, idx) => {
            this.debug(`${this.reelIndex}, symbol ${idx} posIndex ${symbol.symbolID}`);
            let hidePos: number = this.config.direction > 0 ? this.posList.length - 1 : 0;
            symbol.getComponent(UIOpacity).opacity = (symbol.getPosIndex() === hidePos) ? SlotReel2.HIDE_OPACITY : SlotReel2.VISIBLE_OPACITY;
            if (symbol.symbolID == -1) {
                symbol.randomSymbol();
            }
            symbol.onSpin();
            symbol.setIsEmpty(false);
        });
        this.setSymbolState(SymbolState2.Normal);
        this.reset();
    }

    private reset(): void {
        this.curveTime = 0;
        this.curSpinTime = 0;
        this.curSpinCount = 0;
        this.nudgeType = -1;
    }

    /**
     * 要求停止
     * @param rng 
     */
    public stop(rng: number): void {
        this.requestStop = true;
        this.finalRng = this.getRng(rng - 1);
    }

    public skip(): void {
        this.reelState = ReelState2.END;
        this.curveTime = 0;//this.config.getSpeedConfig().endCurveTime * .8;
        this.currentRng = this.finalRng;
        this.symbolList.forEach((symbol, idx) => {
            let stripIdx = this.getRng(this.currentRng - this.keepRow + symbol.getPosIndex() + this.config.direction);
            symbol.setSymbolID(this.strip[stripIdx], stripIdx);
        })
    }

    /**
     * 是否已停止
     * @returns 
     */
    public isEnd(): boolean {
        return this.curSpinTime >= this.config.getSpeedConfig().spinTime;
    }

    public update(deltaTime: number): void {
        //累積時間
        this.curveTime += deltaTime;
        //閒置
        if (this.reelState === ReelState2.IDLE) {
        }
        //啟動
        else if (this.reelState === ReelState2.BEGIN) {
            this.debug("BEGIN");
            this.updateBeginState();
        }
        //循環(線性)
        else if (this.reelState === ReelState2.LOOP) {
            this.debug("LOOP");
            //累積spin時間
            this.curSpinTime += deltaTime;
            this.updateLoopState();
        }
        //最後N顆(線性)
        else if (this.reelState === ReelState2.STOPPING_1) {
            this.updateSymbols(1, 0);
            let lastCount: number = this.config.maxRow + this.config.maxRow;//最後顆數以最列數最多的軸為準, 避免後面的軸顆數比較少的話會比前面的軸先停
            this.setCurrentRng(this.finalRng + lastCount);
            this.reelState = ReelState2.STOPPING;
            this.updateStoppingState();

        }
        //最後N顆(線性)
        else if (this.reelState === ReelState2.STOPPING) {
            this.debug("STOPPING");
            this.updateStoppingState();
        }
        //煞車
        else if (this.reelState === ReelState2.END) {
            this.debug("END");
            this.updateEndState();
        }
        //煞車
        else if (this.reelState === ReelState2.NUDGE) {
            this.debug("NUDGE");
            this.updateEndState();
        }

    }

    /**
     * 內插
     * @param a 
     * @param b 
     * @param ratio 
     * @returns 
     */
    private interpolate(a: Vec3, b: Vec3, ratio: number): Vec3 {
        let newX: number = (a.x + (b.x - a.x) * ratio);
        let newY: number = (a.y + (b.y - a.y) * ratio);
        let newZ: number = (a.z + (b.z - a.z) * ratio);
        return new Vec3(newX, newY, newZ);
    }

    /**
     * 取得曲線時間對應曲線值
     * @param time 
     * @returns 
     */
    private getCurveValue(time: number): number {
        let curve;
        let curveTime;
        let curveValue;
        switch (this.reelState) {
            case ReelState2.BEGIN:
                curve = this.config.beginCurve;
                curveTime = time / this.config.getSpeedConfig().beginCurveTime;
                break;
            case ReelState2.LOOP:
            case ReelState2.STOPPING_1:
            case ReelState2.STOPPING:
                curve = null;
                curveTime = this.isMi ? time / this.config.getSpeedConfig().slowMotionLoopCurveTime : time / this.config.getSpeedConfig().loopCurveTime;
                break;
            case ReelState2.END:
                curve = this.config.endCurve;
                curveTime = time / this.config.getSpeedConfig().endCurveTime;
                break;
            case ReelState2.NUDGE:
                curve = this.config.nudgeCurveList[this.nudgeType];
                curveTime = time / this.config.getSpeedConfig().nudgeCurveTime;
                break;
        }
        //曲線
        if (curve) {
            //cocos曲線沒辦法超過1,所以end曲線上限為0.5
            curveValue = curve.evaluate(curveTime) / 0.5;
        }
        //線性
        else {
            curveValue = curveTime;
        }

        return curveValue;
    }

    /**
     * 啟動
     */
    private updateBeginState(): void {
        //超過begin就切換到loop
        if (this.curveTime >= this.config.getSpeedConfig().beginCurveTime) {
            this.node.emit(SlotReel2.BEGIN_COMPLETE, this.reelIndex);
            this.reelState = ReelState2.LOOP;
            this.curveTime = this.curveTime % this.config.getSpeedConfig().beginCurveTime;
            this.updateSymbols(1, this.getCurveValue(this.curveTime));
            this.setSymbolState(SymbolState2.Blur);
            this.setCurrentRng(this.currentRng - this.config.direction);
        }
        else {
            let curveValue = this.getCurveValue(this.curveTime);
            this.updateSymbols(0, curveValue);

        }
    }

    /**
     * 循環
     */
    private updateLoopState(): void {
        //一顆進度內(ratio = 0 ~ 0.9)
        let loopCurveTime = this.isMi ? this.config.getSpeedConfig().slowMotionLoopCurveTime : this.config.getSpeedConfig().loopCurveTime;
        if (this.curveTime < loopCurveTime) {
            this.updateSymbols(0, this.getCurveValue(this.curveTime));
        }
        //走完一顆進度(ratio = 1)
        else {
            //第一軸達停軸基本秒數 or 後續軸達第一軸基本顆數
            let reelCanStop = this.curSpinTime >= this.config.getSpeedConfig().spinTime;
            //滿足停軸條件
            if (this.requestStop &&
                reelCanStop) {
                //第一軸停輪時紀錄顆數
                if (this.reelIndex === 0) {
                    SlotReel2.firstReelCount = this.curSpinCount;
                }
                //要再刷新一次座標,否則會卡一幀
                this.updateSymbols(0, this.getCurveValue(this.curveTime));
                //開始替換最終輪帶
                this.reelState = ReelState2.STOPPING_1;
                this.curveTime = this.curveTime % loopCurveTime;
            }
            //繼續loop
            else {
                this.curveTime = this.curveTime % loopCurveTime;
                this.updateSymbols(1, this.getCurveValue(this.curveTime));
                this.setCurrentRng(this.currentRng - this.config.direction);
                this.curSpinCount++;
            }
        }
    }

    /**
     * 最後N顆
     */
    private updateStoppingState(): void {

        let loopCurveTime = this.isMi ? this.config.getSpeedConfig().slowMotionLoopCurveTime : this.config.getSpeedConfig().loopCurveTime;
        //到達終點
        if (this.currentRng === this.getRng(this.finalRng + this.config.direction)) {
            this.reelState = this.nudgeType !== -1 ? ReelState2.NUDGE : ReelState2.END;

            this.setSymbolState(SymbolState2.Normal);
        }
        //繼續loop
        else {
            if (this.curveTime >= loopCurveTime) {
                this.curveTime = this.curveTime % loopCurveTime;
                this.updateSymbols(1, this.getCurveValue(this.curveTime));
                this.setCurrentRng(this.currentRng - this.config.direction, true);
            }
            else {
                this.updateSymbols(0, this.getCurveValue(this.curveTime));
            }
        }
    }

    /**
     * 剎車
     */
    private updateEndState(): void {

        let isCurveFinish = false;
        if (this.reelState === ReelState2.NUDGE) {
            isCurveFinish = this.curveTime >= this.config.getSpeedConfig().nudgeCurveTime;
        }
        else if (this.reelState === ReelState2.END) {
            isCurveFinish = this.curveTime >= this.config.getSpeedConfig().endCurveTime;
        }
        if (isCurveFinish) {
            this.currentRng = this.finalRng;
            this.reelState = ReelState2.STOPPED;
            this.updateSymbols(1, 0);
            this.setSymbolState(SymbolState2.Normal);
            this.symbolList.forEach((symbol, idx) => {
                //針對畫面內、外圖示演示到定位動畫
                let isInView = this.isInView(symbol.getPosIndex());
                symbol.hit(isInView);
            })
            //停輪時強制刷新盤面, 否則下次spin開始時, 畫面上的symbol會與輪帶資料不符
            this.setCurrentRng(this.finalRng, true);
            this.reset();
            this.node.emit(SlotReel2.STOP_COMPLETE, this.reelIndex);

        }
        else {
            this.updateSymbols(0, this.getCurveValue(this.curveTime));
        }
    }

    private getRng(value: number): number {
        return (value + this.strip.length) % this.strip.length
    }

    /**
     * 設定目前輪帶索引位置
     * @param rng 
     */
    private setCurrentRng(rng: number, isFinal: boolean = false): void {
        this.currentRng = this.getRng(rng);
        let symbol = this.symbolList.find(symbol => symbol.getPosIndex() === 0);
        let symbolID: number;
        //最後N顆強塞盤面
        if (this.reelState === ReelState2.STOPPING &&
            this.forceResult.length > 0 &&
            XUtils.circularDistance(this.getRng(rng), this.getRng(this.finalRng), this.strip.length) <= (this.keepRow * 2)) {
            symbolID = this.forceResult.pop();
            symbol.setSymbolID(symbolID, -1, isFinal);
        }
        else {
            let symbol0Rng = this.getRng(this.currentRng - (this.config.direction * this.keepRow));//轉換成拿來換圖的那一顆索引
            symbolID = this.strip[symbol0Rng];
            symbol.setSymbolID(symbolID, symbol0Rng, isFinal);
        }
    }

    /**
     * 更新位置資訊
     * @param step 要移動步數
     * @param ratio 目前Node進度
     */
    private updateSymbols(step: number, ratio: number): void {
        this.symbolList.forEach((symbol, idx) => {
            //這次update要走的步數刷新posIndex
            symbol.setPosIndex(this.getPosIdx(symbol.getPosIndex() + this.config.direction * step));
            // symbol.node.setSiblingIndex(symbol.getPosIndex());//由上至下,深度排序, 改由Symbol自定義
            symbol.getComponent(UIOpacity).opacity = (symbol.getPosIndex() === this.symbolList.length - 1) ? SlotReel2.HIDE_OPACITY : SlotReel2.VISIBLE_OPACITY;

            let curNode = this.posList[this.getPosIdx(symbol.getPosIndex())];
            let nextNode = this.posList[this.getPosIdx(symbol.getPosIndex() + this.config.direction)];

            //座標
            symbol.node.setPosition(this.interpolate(curNode.getPosition(), nextNode.getPosition(), ratio));

            //縮放
            symbol.node.setScale(this.interpolate(curNode.getScale(), nextNode.getScale(), ratio));
        });
    }

    /**
     * 設定symbol狀態
     * @param state 
     */
    private setSymbolState(state: SymbolState2): void {
        this.symbolList.forEach((symbol, idx) => {
            symbol.setState(state);
        })
    }

    private debug(data: any): void {
        // console.warn(data);
    }

    /**
     * 向下掉落補空
     * @param toMap 
     */
    public drop(): void {

        //該軸消去顆數
        let numDrop = this.getNumDrop();

        console.log("drop empty ", this.reelIndex, numDrop);
        //沒有空格
        if (numDrop <= 0) {
            console.log("reel drop none complete ", this.reelIndex);
            this.node.emit(SlotReel2.DROP_COMPLETE, this.reelIndex);
            return;
        }

        /**找到實心可掉落數量 */
        let numExpectDrop = 0;

        //由下往上, 檢查可見的5格(4~0)
        let len = this.symbolList.length;
        for (let i = len - 1; i > 0; i--) {

            let toPos = i;
            let solidPos: number;

            let emptySymbol: BaseSymbol2 = this.findSymbolByPosIndex(toPos);
            let solidSymbol: BaseSymbol2;

            //跳過實心圖示
            if (emptySymbol.getIsEmpty() === false) {
                continue;
            }

            //找到空心圖示
            this.debug(`位置 ${this.reelIndex},${toPos} 已空`)

            //從該位置向上找實心圖示
            solidPos = toPos - 1;

            while (true) {
                solidSymbol = this.findSymbolByPosIndex(solidPos);
                if (this.isInView(solidPos) === false) {
                    //畫面內已找不到需要掉落物件
                    solidSymbol = null;
                    break;
                }
                if (!solidSymbol) {
                    //空心以上已經沒有圖示物件
                    break;
                }
                //此位置已標記空, 繼續向上找
                else if (solidSymbol.getIsEmpty() == true) {
                    solidPos = solidPos - 1;
                }
                //找到可用實心圖示
                else {
                    numExpectDrop++;
                    break;
                }
            }

            if (!solidSymbol) {
                continue;
            }

            //把空的向上移動(交換位置)
            this.debug(`target 拿 ${solidSymbol.getPosIndex()} 來補`);
            emptySymbol.setPosIndex(solidSymbol.getPosIndex());
            emptySymbol.copyPositionAndScaleFrom(this.posList[emptySymbol.getPosIndex()]);

            //準備落下物件先標記空, 避免後續掉落取到相同目標
            solidSymbol.setIsEmpty(true);
            //先校正回掉落前的位置, 再開始掉落
            solidSymbol.setPosIndex(toPos);

            //實心物件向下掉落移動
            tween(solidSymbol.node)
                //掉落演示
                .to(this.config.getSpeedConfig().dropTime, {
                    position: this.posList[toPos].getPosition(),
                    scale: this.posList[toPos].getScale()
                }, {
                    easing: easing.backOut
                })
                //掉落到定位
                .call(() => {
                    solidSymbol.setIsEmpty(false);
                    let isInView = this.isInView(toPos);
                    solidSymbol.hit(isInView);

                    numExpectDrop--;
                    //該軸實心圖示掉落完成
                    if (numExpectDrop <= 0) {
                        console.log("reel drop complete ", this.reelIndex);

                        this.node.emit(SlotReel2.DROP_COMPLETE, this.reelIndex);
                    }

                })
                .start();
        }
    }

    public getNumEmpty(): number {
        return this.symbolList.filter(symbol => symbol.getIsEmpty() == true).length
    }

    public getNumDrop(): number {
        let count = 0;
        let len = this.symbolList.length;
        let findEmpty: boolean = false;
        for (let i = len - 1; i > -1; --i) {
            let symbol = this.findSymbolByPosIndex(i);
            //找到空的,開始向上計算實心物件個數
            if (findEmpty) {
                if (symbol.getIsEmpty() === false && this.isInView(symbol.getPosIndex())) {
                    count++;
                }
            }
            else if (symbol.getIsEmpty() === true) {
                findEmpty = true;
            }
        }
        return count;
    }
    /**
     * 
     * @param toMap 
     */
    public fill(toMap: BaseSymbolData2[], dropRowDelay: number): void {

        //該軸消去顆數
        let numEmpty = this.getNumEmpty();
        //沒有空格
        if (numEmpty <= 0) {
            console.log("reel fill none complete ", this.reelIndex);
            this.node.emit(SlotReel2.FILL_COMPLETE, this.reelIndex);
            return;
        }

        /**找到實心可掉落數量 */
        let numExpectDrop = 0;

        //由下往上, 檢查可見的5格(4~0)
        let len = this.symbolList.length;
        for (let i = len - 1; i > 0; i--) {

            let toPos = i;
            let solidPos: number;

            let emptySymbol: BaseSymbol2 = this.findSymbolByPosIndex(toPos);
            let solidSymbol: BaseSymbol2;

            //跳過實心圖示
            if (emptySymbol.getIsEmpty() === false) {
                continue;
            }

            //找到空心圖示
            this.debug(`位置 ${this.reelIndex},${toPos} 已空`)

            //從該位置向上找實心圖示
            solidPos = toPos - 1;

            while (true) {
                solidSymbol = this.findSymbolByPosIndex(solidPos);
                if (!solidSymbol) {
                    //空心以上已經沒有圖示物件
                    break;
                }
                //此位置已標記空, 繼續向上找
                else if (solidSymbol.getIsEmpty() == true) {
                    solidPos = solidPos - 1;
                }
                //找到可用實心圖示
                else {
                    numExpectDrop++;
                    break;
                }
            }

            if (!solidSymbol) {
                continue;
            }

            //把空的向上移動(交換位置)
            this.debug(`target 拿 ${solidSymbol.getPosIndex()} 來補`);
            emptySymbol.setPosIndex(solidSymbol.getPosIndex());
            emptySymbol.copyPositionAndScaleFrom(this.posList[emptySymbol.getPosIndex()]);

            //準備落下物件先標記空, 避免後續掉落取到相同目標
            solidSymbol.setIsEmpty(true);
            //先校正回掉落前的位置, 再開始掉落
            solidSymbol.setPosIndex(toPos);

            //有給最終盤面
            if (toMap) {
                if (this.isInView(toPos) === true) {
                    solidSymbol.setSymbolData(toMap[i - this.keepRow]);
                }
                //盤面外(上方4-0)
                else {
                    //預覽 = 最終位置(輪帶-消去數量) -1(往上一格) -(4~0)
                    let previewStripIdx = this.getRng(this.finalRng - numEmpty - (this.keepRow - i));
                    let symbolID = this.strip[previewStripIdx];
                    solidSymbol.setSymbolID(symbolID, previewStripIdx);
                }
            }
            //沒給最終盤面
            else {
                //預覽 = 最終位置(輪帶-消去數量) -1(往上一格) -(4~0)
                let previewStripIdx = this.getRng(this.finalRng - numEmpty - (this.keepRow - i));
                let symbolID = this.strip[previewStripIdx];
                solidSymbol.setSymbolID(symbolID, previewStripIdx);
            }


            //實心物件向下掉落移動
            tween(solidSymbol.node)
                .delay(dropRowDelay * (i - this.keepRow))
                //掉落演示
                .to(this.config.getSpeedConfig().dropTime, {
                    position: this.posList[toPos].getPosition(),
                    scale: this.posList[toPos].getScale()
                }, {
                    easing: easing.backOut
                })
                //掉落到定位
                .call(() => {
                    solidSymbol.setIsEmpty(false);
                    let isInView = this.isInView(toPos);
                    solidSymbol.hit(isInView);

                    numExpectDrop--;
                    //該軸實心圖示掉落完成
                    if (numExpectDrop <= 0) {
                        //更新rng
                        this.finalRng -= numEmpty;
                        this.symbolList.forEach((v) => {
                            v.setIsEmpty(false);
                        }, this);

                        console.log("reel fill complete ", this.reelIndex);

                        this.node.emit(SlotReel2.FILL_COMPLETE, this.reelIndex);
                    }


                })
                .start();
        }
    }

    /**是否在畫面內(目前因為是base無法與GameData共用判斷式, 後續再想解決辦法) */
    private isInView(posIndex: number): boolean {
        return posIndex >= this.keepRow && posIndex <= (this.keepRow + this.viewRow - 1);
    }

    /**
     * 取得位置圖示
     * @param posIndex 
     * @returns 
     */
    private findSymbolByPosIndex(posIndex: number): BaseSymbol2 {
        return this.symbolList.find(symbol => symbol.getPosIndex() == posIndex);
    }

    /**
     * 消去
     * @param pos 
     */
    public explode(pos: number[]): void {
        let explodeRow = [];
        pos.forEach((v) => {
            let grid = XUtils.posToGrid(v);
            explodeRow.push(grid.row + this.keepRow);
        });


        this.symbolList.forEach((symbol) => {
            let posIdx = symbol.getPosIndex();
            if (explodeRow.indexOf(posIdx) !== -1) {
                if (this.isInView(posIdx) === false) {
                    throw new Error("資料異常:消去畫面外圖示!!")
                }
                symbol.setIsEmpty(true);
                symbol.setSymbolID(-1, -1);
                symbol.explode();
            }
        }, this);
    }

    /**
     * 得分位置
     * @param pos 
     */
    public showWin(pos: number[]): void {

        let winRow = [];
        pos.forEach((v) => {
            let grid = XUtils.posToGrid(v);
            winRow.push(grid.row + this.keepRow);
        });

        this.symbolList.forEach((symbol) => {
            let posIdx = symbol.getPosIndex();
            if (winRow.indexOf(posIdx) !== -1) {
                symbol.showWin();
            }
            else {
                symbol.hideWin();
            }
        }, this);
    }

    /**
     * 關閉中獎效果
     * @param pos 
     */
    public hideWin(): void {
        this.symbolList.forEach((symbol) => {
            symbol.hideWin();
        }, this);
    }

    /**
     * 設定強制結果盤面
     * @param forceResult 
     */
    public setForceResult(forceResult: number[]) {
        this.forceResult = forceResult;
    }

    /**
     * 全部軸已停止
     */
    public onStop(): void {
        this.reelState = ReelState2.IDLE;
        this.symbolList.forEach((symbol) => {
            symbol.onStop();
        }, this);
    }

    /**
     * 開始瞇牌
     */
    public setIsMi(mi: boolean): void {
        this.isMi = mi;
        this.symbolList.forEach((symbol) => {
            symbol.setIsMi(mi);
        }, this);
    }
    public setNudgeType(type: number): void {
        this.nudgeType = type;
    }


    /**
     * 開始瞇牌
     */
    public setVisible(visible: boolean): void {
        this.symbolList.forEach((symbol) => {
            symbol.setVisible(visible);
        }, this);
    }

    /**
     * 直接變盤
     * @param toMap 
     */
    public change(toMap: BaseSymbolData2[]): void {
        if (!toMap) {
            return;
        }

        toMap.forEach((value, idx) => {
            let symbol = this.findSymbolByPosIndex(idx + this.keepRow);
            symbol.changeSymbolData(value);
            if (value) {
                symbol.setIsEmpty(false);
            }
        }, this);
    }

    public isEnding(): boolean {
        return this.reelState === ReelState2.STOPPED || this.reelState === ReelState2.END;
    }

    public isStopped(): boolean {
        return this.reelState === ReelState2.STOPPED;
    }
}