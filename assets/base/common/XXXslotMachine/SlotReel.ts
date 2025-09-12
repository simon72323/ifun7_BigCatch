import { _decorator, Component, instantiate, Node, tween, UIOpacity, Vec3 } from 'cc';
import { XUtils } from '../../script/utils/XUtils';
import { BaseSymbol } from './BaseSymbol';
import { SlotReelConfig, SymbolState } from './SlotType';
const { ccclass, property } = _decorator;


/**
 * 老虎機軸元件
 */
@ccclass('SlotReel')
export class SlotReel extends Component {

    /**啟動完成 */
    public static BEGIN_COMPLETE: string = "BEGIN_COMPLETE";
    /**停止完成 */
    public static STOP_COMPLETE: string = "STOP_COMPLETE";
    /**掉落完成 */
    public static DROP_COMPLETE: string = "DROP_COMPLETE";

    /**第一軸走的顆數,後面的軸要停輪時至少要走到相等顆數才能停, 否則有可能後面的軸先停 */
    public static firstReelCount: number = 20;

    /**節點位置 */
    private posList: Node[] = [];

    /**輪帶資料 */
    private strip: number[] = [];
    /**輪帶索引 */
    private currentRng: number = -1;
    private finalRng: number = -1;

    /**輪帶上圖示 */
    private symbolList: BaseSymbol[] = [];

    /**軸索引 */
    public reelIndex: number = -1;

    /**老虎機狀態 */
    private reelState: ReelState = ReelState.IDLE;

    /**是否已要求停止 */
    private requestStop: boolean = false;

    private config: SlotReelConfig;

    /**目前累計秒數 */
    private time = 0;

    /**loop持續時間 */
    private curSpinTime = 0;

    /**強制結果盤面 */
    private forceResult: number[] = [];
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
    public init(reelIndex: number, config: SlotReelConfig): void {

        this.reelIndex = reelIndex;
        this.config = config;

        //先列出所有位置
        let idx: number = 0;
        let posNode = this.node.getChildByName(`NodePos${idx}`);
        while (posNode != null) {
            posNode.removeAllChildren();
            this.posList.push(posNode);
            let symbol = instantiate(config.symbolPrefab).getComponent(BaseSymbol);
            this.node.addChild(symbol.node);
            symbol.setPosIndex(idx);
            symbol.setGrid({ col: reelIndex, row: idx });
            this.symbolList.push(symbol);
            symbol.node.setPosition(posNode.getPosition(symbol.node.position));
            symbol.node.setScale(posNode.getScale(symbol.node.scale));
            idx++;
            posNode = this.node.getChildByName(`NodePos${idx}`);
        }
    }

    /**
     * 
     * @param strip 
     * @param rng 
     */
    public setupStripAndRng(strip: number[], rng: number): void {

        this.setStrip(strip);

        this.currentRng = this.getRng(rng);
        this.symbolList.forEach((symbol, idx) => {
            let stripIdx = this.getRng(this.currentRng - this.config.keepRow + symbol.getPosIndex());
            symbol.setSymbolID(this.strip[stripIdx], stripIdx);
        })
    }


    private getPosIdx(idx: number): number {
        return (idx + this.posList.length) % this.posList.length;
    }

    /**
     * 開始轉動
     * @returns 
     */
    public spin(): void {
        if (this.reelState !== ReelState.IDLE) {
            return;
        }
        if (this.reelIndex === 0) {
            SlotReel.firstReelCount = 0;
        }

        this.requestStop = false;
        this.reelState = ReelState.BEGIN;
        this.symbolList.forEach((symbol, idx) => {
            this.debug(`${this.reelIndex}, symbol ${idx} posIndex ${symbol.symbolID}`);
            let hidePos: number = this.config.direction > 0 ? this.posList.length - 1 : 0;
            symbol.getComponent(UIOpacity).opacity = (symbol.getPosIndex() === hidePos) ? 0 : 255;
            if (symbol.symbolID == -1) {
                symbol.randomSymbol();
            }
            symbol.onSpin();
            symbol.drop = false;
        });
        this.time = 0;
        this.curSpinTime = 0;
    }

    /**
     * 要求停止
     * @param rng 
     */
    public stop(rng: number): void {
        this.requestStop = true;
        this.finalRng = this.getRng(rng - 1);
        if (this.reelIndex === 0) {
            SlotReel.firstReelCount = this.config.getSpeedConfig().spinTime;
        }
    }

    public update(deltaTime: number): void {
        //累積時間
        this.time += deltaTime;
        //閒置
        if (this.reelState === ReelState.IDLE) {
        }
        //啟動
        else if (this.reelState === ReelState.BEGIN) {
            this.debug("BEGIN");
            this.updateBeginState();
        }
        //循環(線性)
        else if (this.reelState === ReelState.LOOP) {
            this.debug("LOOP");
            //累積spin時間
            this.curSpinTime += deltaTime;
            this.updateLoopState();
        }
        //最後N顆(線性)
        else if (this.reelState === ReelState.STOPPING) {
            this.debug("STOPPING");
            this.updateStoppingState();
        }
        //煞車
        else if (this.reelState === ReelState.END) {
            this.debug("END");
            this.updateEndState();
        }

    }

    private interpolate(a: Vec3, b: Vec3, ratio: number): Vec3 {
        let newX: number = (a.x + (b.x - a.x) * ratio);
        let newY: number = (a.y + (b.y - a.y) * ratio);
        let newZ: number = (a.z + (b.z - a.z) * ratio);
        return new Vec3(newX, newY, newZ);
    }
    private getCurveValue(time: number): number {
        let curve;
        let curveTime;
        let curveValue;
        switch (this.reelState) {
            case ReelState.BEGIN:
                curve = this.config.beginCurve;
                curveTime = time / this.config.getSpeedConfig().beginCurveTime;
                break;
            case ReelState.LOOP:
            case ReelState.STOPPING:
                curve = null;
                curveTime = time / this.config.getSpeedConfig().loopCurveTime;
                break;
            case ReelState.END:
                curve = this.config.endCurve;
                curveTime = time / this.config.getSpeedConfig().endCurveTime;
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
        if (this.time >= this.config.getSpeedConfig().beginCurveTime) {
            this.node.emit(SlotReel.BEGIN_COMPLETE, this.reelIndex);
            this.reelState = ReelState.LOOP;
            this.time = this.time % this.config.getSpeedConfig().beginCurveTime;
            this.updateSymbols(1, this.getCurveValue(this.time));
            this.setSymbolState(SymbolState.Blur);
            this.setCurrentRng(this.currentRng - this.config.direction);
        }
        else {
            let curveValue = this.getCurveValue(this.time);
            this.updateSymbols(0, curveValue);

        }
    }

    /**
     * 循環
     */
    private updateLoopState(): void {

        //滿足停軸條件
        if (this.curSpinTime >= this.config.getSpeedConfig().spinTime && this.requestStop) {
            //開始替換最終輪帶
            let lastCount: number = this.config.keepRow + this.config.viewRow;
            this.setCurrentRng(this.finalRng + lastCount);
            this.reelState = ReelState.STOPPING;
        }
        //繼續loop
        else {
            if (this.time >= this.config.getSpeedConfig().loopCurveTime) {
                this.time = this.time % this.config.getSpeedConfig().loopCurveTime;
                this.updateSymbols(1, this.getCurveValue(this.time));
                this.setCurrentRng(this.currentRng - this.config.direction);
            }
            else {
                this.updateSymbols(0, this.getCurveValue(this.time));
            }
        }
    }

    /**
     * 最後N顆
     */
    private updateStoppingState(): void {

        //到達終點
        if (this.currentRng === this.getRng(this.finalRng + this.config.direction)) {
            this.reelState = ReelState.END;
        }
        //繼續loop
        else {
            if (this.time >= this.config.getSpeedConfig().loopCurveTime) {
                this.time = this.time % this.config.getSpeedConfig().loopCurveTime;
                this.updateSymbols(1, this.getCurveValue(this.time));
                this.setCurrentRng(this.currentRng - this.config.direction);
            }
            else {
                this.updateSymbols(0, this.getCurveValue(this.time));
            }
        }
    }

    /**
     * 剎車
     */
    private updateEndState(): void {

        if (this.time >= this.config.getSpeedConfig().endCurveTime) {
            this.currentRng = this.finalRng;
            this.reelState = ReelState.IDLE;
            this.updateSymbols(1, 0);
            this.setSymbolState(SymbolState.Normal);
            this.symbolList.forEach((symbol, idx) => {
                if (this.isInView(symbol.getPosIndex()) === true) {
                    symbol.hit();
                }
                else {
                    symbol.hitOutside();
                }
            })
            this.node.emit(SlotReel.STOP_COMPLETE, this.reelIndex);
        }
        else {
            this.updateSymbols(0, this.getCurveValue(this.time));
        }
    }

    private getRng(value: number): number {
        return (value + this.strip.length) % this.strip.length
    }

    /**
     * 設定目前輪帶索引位置
     * @param rng 
     */
    private setCurrentRng(rng: number): void {
        this.currentRng = this.getRng(rng);
        let symbol = this.symbolList.find(symbol => symbol.getPosIndex() === 0);
        let symbolID: number;
        //最後N顆強塞盤面
        if (this.reelState === ReelState.STOPPING &&
            this.forceResult.length > 0 &&
            XUtils.circularDistance(this.getRng(rng), this.getRng(this.finalRng), this.strip.length) <= (this.config.keepRow * 2)) {
            symbolID = this.forceResult.pop();
            symbol.setSymbolID(symbolID, -1);
        }
        else {
            let symbol0Rng = this.getRng(this.currentRng - (this.config.direction * this.config.keepRow));//轉換成拿來換圖的那一顆索引
            symbolID = this.strip[symbol0Rng];
            symbol.setSymbolID(symbolID, symbol0Rng);
        }
    }

    private updateSymbols(step: number, ratio: number): void {
        this.symbolList.forEach((symbol, idx) => {
            //這次update要走的步數刷新posIndex
            symbol.setPosIndex(this.getPosIdx(symbol.getPosIndex() + this.config.direction * step));
            symbol.node.setSiblingIndex(symbol.getPosIndex());//由上至下,深度排序
            symbol.getComponent(UIOpacity).opacity = (symbol.getPosIndex() === this.symbolList.length - 1) ? 0 : 255;

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
    private setSymbolState(state: SymbolState): void {
        this.symbolList.forEach((symbol, idx) => {
            symbol.setState(state);
        })
    }

    public toggleDir(): void {
        this.config.direction = this.config.direction == 1 ? -1 : 1;
    }

    private debug(data: any): void {
        // console.warn(data);
    }

    public drop(toMap: number[]): void {

        //該軸消去顆數
        let numExplode = this.symbolList.filter(symbol => symbol.drop == true).length;

        let dropCount: number = 0;
        //由下往上, 檢查可見的5格(4~0)
        let len = this.symbolList.length;
        for (let i = len - 1; i > 0; i--) {

            let toPos = i;
            let fromPos: number;

            let current: BaseSymbol = this.findSymbolByPosIndex(toPos);
            let from: BaseSymbol;
            //表示此格已空, 要從上方尋找掉落
            if (current.drop == true) {
                this.debug(`${this.reelIndex} 位置 ${toPos} 已空`)


                //從上方開始找可用的掉落物件(實心)
                fromPos = toPos - 1;
                let tmpPos = fromPos;
                while (true) {
                    from = this.findSymbolByPosIndex(tmpPos);
                    if (!from) {
                        //全部都空了
                        break;
                    }
                    //繼續找
                    else if (from.drop) {
                        tmpPos = tmpPos - 1;
                    }
                    //找到可用
                    else {
                        //計算要掉落個數
                        dropCount++;
                        break;
                    }
                }

                if (!from) {
                    continue;
                }

                //把空的向上移動
                current.setPosIndex(from.getPosIndex());
                this.debug(`target 拿 ${from.getPosIndex()} 來補`);
                current.copyPositionAndScaleFrom(this.posList[current.getPosIndex()]);

                //先校正回掉落前的位置, 再開始掉落
                from.drop = true;
                from.setPosIndex(toPos);
                // from.copyPositionAndScaleFrom(this.posList[fromPos]);
                //盤面內圖示(SR有給)
                if (this.isInView(toPos) === true) {
                    from.setSymbolID(toMap[i - this.config.keepRow]);
                }
                //盤面外(上方4-0)
                else {
                    //預覽 = 最終位置(輪帶-消去數量) -1(往上一格) -(4~0)
                    let previewStripIdx = this.getRng(this.finalRng - numExplode - (this.config.keepRow - i));
                    let symbolID = this.strip[previewStripIdx];
                    from.setSymbolID(symbolID);
                }

                tween(from.node)
                    .to(this.config.getSpeedConfig().dropTime, {
                        position: this.posList[toPos].getPosition(),
                        scale: this.posList[toPos].getScale()
                    })
                    .call(() => {
                        from.drop = false;
                        if (this.isInView(toPos) === true) {
                            from.hit();
                        }
                        dropCount--;
                        if (dropCount <= 0) {
                            //更新rng
                            this.finalRng -= numExplode;
                            this.symbolList.forEach((v) => {
                                v.drop = false;
                            }, this);
                            this.node.emit(SlotReel.DROP_COMPLETE, this.reelIndex);
                        }

                    })
                    .start();
            }
        }

        //沒有要掉落
        if (dropCount <= 0) {
            this.node.emit(SlotReel.DROP_COMPLETE, this.reelIndex);
        }
    }

    /**是否在畫面內(目前因為是base無法與GameData共用判斷式, 後續再想解決辦法) */
    private isInView(posIndex: number): boolean {
        return posIndex >= this.config.keepRow && posIndex <= (this.config.keepRow + this.config.viewRow - 1);
    }

    private findSymbolByPosIndex(posIndex: number): BaseSymbol {
        return this.symbolList.find(symbol => symbol.getPosIndex() == posIndex);
    }

    public explode(pos: number[]): void {
        let explodeRow = [];
        pos.forEach((v) => {
            let grid = XUtils.posToGrid(v);
            explodeRow.push(grid.row + this.config.keepRow);
        });

        this.symbolList.forEach((symbol) => {
            let posIdx = symbol.getPosIndex();
            if (explodeRow.indexOf(posIdx) !== -1) {
                symbol.drop = true;
                symbol.setSymbolID(-1);
                symbol.explode();
            }
        }, this);
    }

    public showWin(pos: number[]): void {

        let winRow = [];
        pos.forEach((v) => {
            let grid = XUtils.posToGrid(v);
            winRow.push(grid.row + this.config.keepRow);
        });

        this.symbolList.forEach((symbol) => {
            let posIdx = symbol.getPosIndex();
            if (winRow.indexOf(posIdx) !== -1) {
                symbol.showWin();
            }
        }, this);
    }

    /**
     * 設定強制結果盤面
     * @param forceResult 
     */
    public setForceResult(forceResult: number[]) {
        this.forceResult = forceResult;
    }

    public onStop(): void {
        this.symbolList.forEach((symbol) => {
            symbol.onStop();
        }, this);
    }

    /**
     * 開始瞇牌
     */
    public setIsMi(mi: boolean): void {
        this.symbolList.forEach((symbol) => {
            symbol.setIsMi(mi);
        }, this);
    }
}

/**
 * 軸狀態定義
 */
export enum ReelState {
    /**待機 */
    IDLE = 0,
    /**啟動 */
    BEGIN,
    /**循環 */
    LOOP,
    /**最後N顆 */
    STOPPING,
    /**結尾 */
    END
}
