import { _decorator, CCInteger, Component, easing, instantiate, Node, tween, UIOpacity, UITransform, Vec3 } from 'cc';

import { BaseSymbol } from '@common/components/slotMachine/BaseSymbol';
import { BaseSymbolData } from '@common/components/slotMachine/BaseSymbolData';
import { ReelState, SlotReelConfig, SymbolState } from '@common/components/slotMachine/SlotType';
import { Utils } from '@common/script/utils/Utils';

const { ccclass, property } = _decorator;


/**
 * 老虎機軸元件
 */
@ccclass('SlotReel')
export class SlotReel extends Component {

    @property({ type: CCInteger, tooltip: '畫面列數' })
    public viewRow: number = 3;

    @property({ type: CCInteger, tooltip: '上下保留列數' })
    public keepRow: number = 2;

    /**啟動完成 */
    public static BEGIN_COMPLETE: string = 'BEGIN_COMPLETE';
    /**停止完成 */
    public static STOP_COMPLETE: string = 'STOP_COMPLETE';

    /**第一軸走的顆數,後面的軸要停輪時至少要走到相等顆數才能停, 否則有可能後面的軸先停 */
    public static firstReelCount: number = 0;

    /**節點位置 */
    private posList: Node[] = [];

    /**輪帶上圖示 */
    private symbolList: BaseSymbol[] = [];

    /**軸索引 */
    public reelIndex: number = -1;

    /**老虎機狀態 */
    private reelState: ReelState = ReelState.IDLE;

    /**是否已要求停止 */
    private requestStop: boolean = false;

    /**軸參數 */
    public config: SlotReelConfig;

    /**目前累計秒數 */
    private curveTime = 0;

    /**loop持續時間 */
    private curSpinTime = 0;
    private curSpinCount = 0;

    /**強制結果盤面 */
    private forceResult: number[] = [];

    /**圖示顯示時透明度 */
    // private static VISIBLE_OPACITY = 255;
    /**圖示隱藏時透明度 */
    // private static HIDE_OPACITY = 0;

    private isMi: boolean = false;

    // private randomSeed: number = 0;

    /**
     * 設置輪帶
     * @param strip 
     */
    // public setStrip(strip: number[]): void {
    //     this.strip = strip;
    // }

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
            // let worldPos = this.node.getComponent(UITransform).convertToWorldSpaceAR(posNode.getPosition());
            // const layerPos = config.layerList[0].getComponent(UITransform).convertToNodeSpaceAR(worldPos);
            // posNode.setPosition(layerPos);
            this.posList.push(posNode);
            let symbol = instantiate(config.symbolPrefab).getComponent(BaseSymbol);
            symbol.setLayerList(config.layerList);
            config.layerList[0].children[reelIndex].addChild(symbol.node);
            symbol.setPosIndex(idx);
            symbol.setGrid(reelIndex, idx);
            // symbol.setSymbolID(reelSymbolID[idx]);
            this.symbolList.push(symbol);
            symbol.node.setPosition(posNode.getPosition());
            idx++;
            posNode = this.node.getChildByName(`NodePos${idx}`);
        }
    }

    /**
     * 初始化盤面
     * @param symbolIDs 軸符號
     */
    public initSymbolIDs(symbolIDs: number[]): void {
        // console.log('setReelSymbolID', symbolIDs);
        const posLength = Math.floor(this.posList.length / 3);
        // this.currentRng = this.getRng(rng - 1);
        this.symbolList.forEach((symbol, idx) => {
            if (idx >= posLength && idx < posLength * 2) {
                symbol.setSymbolID(symbolIDs[idx - posLength]);
                // symbol.symbolID = symbolIDs[idx - posLength];
                symbol.isInView = true;
            } else {
                let randomID = Math.floor(Math.random() * 16);
                //11~16要加4才會是正確的symbolID
                const symbolID = randomID > 10 ? randomID + 4 : randomID;
                symbol.setSymbolID(symbolID);
                // symbol.setRandomSymbol();//上下隨機symbol圖
            }
            symbol.setState(SymbolState.Normal);
        });
    }

    /**
     * 此軸停止的symbolID
     * @param symbolIDs 此軸停止的symbolID
     */
    public setReelSymbolID(symbolIDs: number[]): void {
        console.log('此軸停止的symbolID', this.reelIndex, symbolIDs);
        this.forceResult = symbolIDs;
        // console.log('setReelSymbolID', symbolIDs);
        // const posLength = Math.floor(this.posList.length / 3);
        // // this.currentRng = this.getRng(rng - 1);
        // this.symbolList.forEach((symbol, idx) => {
        //     if (idx >= posLength && idx < posLength * 2) {
        //         symbol.setSymbolID(symbolIDs[idx - posLength]);
        //         symbol.isInView = true;
        //     } else {
        //         let randomID = Math.floor(Math.random() * 16);
        //         //11~16要加4才會是正確的symbolID
        //         const symbolID = randomID > 10 ? randomID + 4 : randomID;
        //         symbol.setSymbolID(symbolID);
        //     }
        //     symbol.setState(SymbolState.Normal);
        // });
    }

    /**
     * 取得位置索引
     * @param idx 
     * @returns 
     */
    private getPosIdx(idx: number): number {
        return (idx + this.posList.length) % this.posList.length;
    }

    /**
     * 開始轉動
     * @returns 
     */
    public spin(): void {
        if (this.reelState !== ReelState.IDLE) return;
        if (this.reelIndex === 0) {
            SlotReel.firstReelCount = 0;//第一軸走完時重置
        }

        // this.randomSeed = Math.random();
        this.requestStop = false;//要求停止
        this.reelState = ReelState.BEGIN;
        //隱藏軸最後一個symbol
        const hidePos: number = this.config.direction > 0 ? this.posList.length - 1 : 0;
        this.symbolList.forEach((symbol, idx) => {
            // this.debug(`${this.reelIndex}, symbol ${idx} posIndex ${symbol.symbolID}`);
            symbol.getComponent(UIOpacity).opacity = (symbol.getPosIndex() === hidePos) ? 0 : 255;
            if (symbol.symbolID == -1) {
                symbol.setRandomSymbol();//隨機給symbolID
            }
            symbol.onSpin();//會回到初始狀態且isInView=false
        });
        this.setSymbolState(SymbolState.Normal);
        this.reset();
    }

    /**
     * 重置reel資料
     */
    private reset(): void {
        this.curveTime = 0;
        this.curSpinTime = 0;
        this.curSpinCount = 0;
    }

    /**
     * 要求停止
     * @param rng 
     */
    public stop(): void {
        this.requestStop = true;
        // this.finalRng = this.getRng(rng - 1);
    }

    /**
     * 跳過
     */
    public skip(): void {
        this.reelState = ReelState.END;
        this.curveTime = 0;//this.config.getSpeedConfig().endCurveTime * .8;
        // 直接使用强制结果
        this.symbolList.forEach((symbol, idx) => {
            if (this.forceResult.length > 0) {
                let symbolID = this.forceResult[idx] || this.forceResult[0];
                symbol.setSymbolID(symbolID);
            } else {
                // 如果没有强制结果，使用随机符号
                symbol.setRandomSymbol();
            }
        });
    }

    /**
     * 是否已停止
     * @returns 
     */
    public isEnd(): boolean {
        return this.curSpinTime >= this.config.getSpeedConfig().spinTime;
    }

    /**
     * 更新reel轉動狀態
     * @param deltaTime 
     */
    public update(deltaTime: number): void {
        //累積時間
        this.curveTime += deltaTime;
        //閒置
        if (this.reelState === ReelState.IDLE) {
            return;
        }
        //啟動
        else if (this.reelState === ReelState.BEGIN) {
            // this.debug('BEGIN');
            this.updateBeginState();
        }
        //循環(線性)
        else if (this.reelState === ReelState.LOOP) {
            // this.debug('LOOP');
            //累積spin時間
            this.curSpinTime += deltaTime;
            this.updateLoopState();
        }
        //最後N顆(線性)
        else if (this.reelState === ReelState.STOPPING_1) {
            this.updateSymbols(1, 0);
            this.reelState = ReelState.STOPPING;
            this.updateStoppingState();

        }
        //最後N顆(線性)
        else if (this.reelState === ReelState.STOPPING) {
            // this.debug('STOPPING');'
            this.updateStoppingState();
        }
        //煞車
        else if (this.reelState === ReelState.END) {
            // this.debug('END');
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
        let curve: any;
        let curveTime: number;
        let curveValue: number;
        switch (this.reelState) {
            case ReelState.BEGIN:
                curve = this.config.beginCurve;
                curveTime = time / this.config.getSpeedConfig().beginCurveTime;
                break;
            case ReelState.LOOP:
            case ReelState.STOPPING_1:
            case ReelState.STOPPING:
                curve = null;
                curveTime = this.isMi ? time / this.config.getSpeedConfig().slowMotionLoopCurveTime : time / this.config.getSpeedConfig().loopCurveTime;
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
        //超過begin時間就切換到循環
        if (this.curveTime >= this.config.getSpeedConfig().beginCurveTime) {
            this.node.emit(SlotReel.BEGIN_COMPLETE, this.reelIndex);
            this.reelState = ReelState.LOOP;
            this.curveTime = this.curveTime % this.config.getSpeedConfig().beginCurveTime;
            this.updateSymbols(1, this.getCurveValue(this.curveTime));
            this.setSymbolState(SymbolState.Blur);
            // this.setCurrentRng(this.currentRng - this.config.direction);
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
                    SlotReel.firstReelCount = this.curSpinCount;
                }
                //要再刷新一次座標,否則會卡一幀
                this.updateSymbols(0, this.getCurveValue(this.curveTime));
                //開始替換最終輪帶
                this.reelState = ReelState.STOPPING_1;
                this.curveTime = this.curveTime % loopCurveTime;
            }
            //繼續loop
            else {
                this.curveTime = this.curveTime % loopCurveTime;
                this.updateSymbols(1, this.getCurveValue(this.curveTime));
                // this.setCurrentRng(this.currentRng - this.config.direction);
                this.curSpinCount++;
            }
        }
    }

    /**
     * 最後N顆
     */
    private updateStoppingState(): void {
        // let loopCurveTime = this.isMi ? this.config.getSpeedConfig().slowMotionLoopCurveTime : this.config.getSpeedConfig().loopCurveTime;
        this.reelState = ReelState.END;
        this.setSymbolState(SymbolState.Normal);

        //到達終點
        // if (this.currentRng === this.getRng(this.finalRng + this.config.direction)) {
        //     this.reelState =  ReelState.END;

        //     this.setSymbolState(SymbolState.Normal);
        // }
        // //繼續loop
        // else {
        //     if (this.curveTime >= loopCurveTime) {
        //         this.curveTime = this.curveTime % loopCurveTime;
        //         this.updateSymbols(1, this.getCurveValue(this.curveTime));
        //         this.setCurrentRng(this.currentRng - this.config.direction, true);
        //     }
        //     else {
        //         this.updateSymbols(0, this.getCurveValue(this.curveTime));
        //     }
        // }
    }

    /**
     * 剎車
     */
    private updateEndState(): void {

        let isCurveFinish = false;
        if (this.reelState === ReelState.END) {
            isCurveFinish = this.curveTime >= this.config.getSpeedConfig().endCurveTime;
        }
        if (isCurveFinish) {
            // this.currentRng = this.finalRng;
            this.reelState = ReelState.STOPPED;
            this.updateSymbols(1, 0);
            this.setSymbolState(SymbolState.Normal);
            this.symbolList.forEach((symbol, idx) => {
                //針對畫面內、外圖示演示到定位動畫
                let isInView = this.isInView(symbol.getPosIndex());
                symbol.hit(isInView);
            });
            //停輪時強制刷新盤面, 否則下次spin開始時, 畫面上的symbol會與輪帶資料不符
            // this.setCurrentRng(true);
            this.reset();
            this.node.emit(SlotReel.STOP_COMPLETE, this.reelIndex);

        }
        else {
            this.updateSymbols(0, this.getCurveValue(this.curveTime));
        }
    }

    /**
     * 設定目前輪帶索引位置
     * @param rng 
     */
    // private setCurrentRng(isFinal: boolean = false): void {
    //     let symbol = this.symbolList.find(symbol => symbol.getPosIndex() === 0);
    //     let symbolID: number;

    //     // 直接使用强制结果
    //     // if (this.forceResult.length > 0) {
    //     symbolID = this.forceResult.pop();
    //     symbol.setSymbolID(symbolID, isFinal);
    //     // } else {
    //     //     // 如果没有强制结果，使用随机符号
    //     //     symbolID = Math.floor(Math.random() * 20) + 1; // 假设符号ID范围1-20
    //     //     symbol.setSymbolID(symbolID, isFinal);
    //     // }
    // }

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
        });
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
    // private findSymbolByPosIndex(posIndex: number): BaseSymbol {
    //     return this.symbolList.find(symbol => symbol.getPosIndex() == posIndex);
    // }

    /**
     * 得分位置
     * @param pos 
     */
    public showSymbolWin(pos: number[]): void {

        let winRow = [];
        pos.forEach((v) => {
            let grid = Utils.posToGrid(v);
            winRow.push(grid.row + this.keepRow);
        });

        this.symbolList.forEach((symbol) => {
            let posIdx = symbol.getPosIndex();
            if (winRow.indexOf(posIdx) !== -1) {
                symbol.showSymbolWin();
            }
            else {
                symbol.hideSymbolWin();
            }
        }, this);
    }

    /**
     * 關閉中獎效果
     * @param pos 
     */
    public hideSymbolWin(): void {
        this.symbolList.forEach((symbol) => {
            symbol.hideSymbolWin();
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
        this.reelState = ReelState.IDLE;
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

    /**
     * 開始瞇牌
     */
    public setVisible(visible: boolean): void {
        this.symbolList.forEach((symbol) => {
            symbol.setVisible(visible);
        }, this);
    }

    public isEnding(): boolean {
        return this.reelState === ReelState.STOPPED || this.reelState === ReelState.END;
    }

    public isStopped(): boolean {
        return this.reelState === ReelState.STOPPED;
    }
}