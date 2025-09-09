import { _decorator, Component } from 'cc';

import { CCInteger, Node, Prefab, RealCurve, tween, Tween } from 'cc';
import { BaseDataManager } from '@/base/script/main/BaseDataManager';
import { XEvent1, XEvent2, XEvent3, XEvent4 } from '@/base/script/utils/XEvent';
import { XUtils } from '@/base/script/utils/XUtils';
import { BaseSlotParser2 } from './BaseSlotData2';
import { BaseSymbolData2 } from './BaseSymbolData2';
import { SlotReel2 } from './SlotReel2';
import { SlotReelConfig2, SpeedConfig2 } from './SlotType2';

const { ccclass, property } = _decorator;

/**
 * 老虎機
 */
@ccclass('SlotMachine2')
export class SlotMachine2 extends Component {

    @property({ type: CCInteger, tooltip: "老虎機ID" })
    private id: number = 0;

    @property({ type: CCInteger, tooltip: "最大列數" })
    private maxRow: number = 5;

    /**資料軸清單(順序) */
    @property({ type: SlotReel2, tooltip: "資料軸清單(順序)" })
    public dataList: SlotReel2[] = [];

    /**轉動軸清單(順序) */
    @property({ type: SlotReel2, tooltip: "轉動軸清單(順序)" })
    public spinList: SlotReel2[] = [];

    /**掉落軸清單(順序) */
    @property({ type: SlotReel2, tooltip: "掉落軸清單(順序)" })
    public dropList: SlotReel2[] = [];

    /**新圖示掉落軸清單(順序) */
    @property({ type: SlotReel2, tooltip: "新圖示掉落軸清單(順序)" })
    public fillList: SlotReel2[] = [];

    /**層級 */
    @property({ type: Node })
    private layerList: Node[] = [];

    /**層級 */
    @property({ type: Node })
    private reelLayerList: Node[] = [];

    /**圖示prefab */
    @property({ type: Prefab })
    private symbolPrefab: Prefab = null;

    @property({
        type: RealCurve, tooltip:
            "運動曲線\n" +
            "[啟動] 時間:(0.00 ~ 0.50), 值:(-0.5 ~ 0)"
    })
    private beginCurve = (() => {
        const curve = new RealCurve();
        curve.assignSorted([
            [0, { value: 0 }],
            [1, { value: 1 }],
        ]);
        return curve;
    })();
    @property({
        type: RealCurve, tooltip:
            "運動曲線\n" +
            "[結束] 時間:(0.50 ~ 1.00), 值:(0 ~ 1)\n"
    })
    private endCurve = (() => {
        const curve = new RealCurve();
        curve.assignSorted([
            [0, { value: 0 }],
            [1, { value: 1 }],
        ]);
        return curve;
    })();

    @property({
        type: RealCurve, tooltip:
            "戲謔曲線\n" +
            "[結束] 時間:(0.50 ~ 1.00), 值:(0 ~ 1)\n"
    })
    private nudgeCurve = (() => {
        const curve = new RealCurve();
        curve.assignSorted([
            [0, { value: 0 }],
            [1, { value: 1 }],
        ]);
        return curve;
    })();

    @property({
        type: RealCurve, tooltip:
            "戲謔曲線2\n" +
            "[結束] 時間:(0.50 ~ 1.00), 值:(0 ~ 1)\n"
    })
    private nudgeCurve2 = (() => {
        const curve = new RealCurve();
        curve.assignSorted([
            [0, { value: 0 }],
            [1, { value: 1 }],
        ]);
        return curve;
    })();

    // @property({ type: CCInteger, tooltip: "方向(1:向下,-1:向上" })//暫時沒用
    private direction: number = 1;

    @property({ type: SpeedConfig2, tooltip: "一般參數", group: "一般" })
    private normal: SpeedConfig2 = new SpeedConfig2();

    @property({ type: SpeedConfig2, tooltip: "閃電參數", group: "閃電" })
    private fast: SpeedConfig2 = new SpeedConfig2();

    @property({ type: SpeedConfig2, tooltip: "Turbo參數", group: "Turbo" })
    private turbo: SpeedConfig2 = new SpeedConfig2();

    /**初始化老虎機(id, parser) */
    public static setup: XEvent2<number, BaseSlotParser2> = new XEvent2();
    public static changeStrip: XEvent2<number, BaseSlotParser2> = new XEvent2();
    /**老虎機開始轉動 */
    public static spin: XEvent1<number> = new XEvent1();
    public static spinComplete: XEvent1<number> = new XEvent1();

    /**SR指定盤面(map)必須在stop前呼叫 */
    public static setForceResult: XEvent2<number, number[][]> = new XEvent2();


    /**老虎機停止(rngList) */
    public static stop: XEvent3<number, number[], () => void> = new XEvent3();

    /**急停(id) */
    public static skip: XEvent1<number> = new XEvent1();
    private isSkip: boolean = false;

    public static stopOnReel: XEvent2<number, number> = new XEvent2();
    public static stopComplete: XEvent1<number> = new XEvent1();

    /**掉落到定位通知(只有有空缺圖示的軸才會提示) */
    public static fillOnReel: XEvent2<number, number> = new XEvent2();


    /**當前盤面向下補空 */
    public static drop: XEvent2<number, () => void> = new XEvent2();

    /**新盤面落下(fromMap, toMap, 沒給表示用輪帶資料) */
    public static fill: XEvent4<number, BaseSymbolData2[][], BaseSymbolData2[][], () => void> = new XEvent4();

    /**消去(winPos) */
    public static explode: XEvent2<number, number[]> = new XEvent2();

    /**中獎(winPos) */
    public static showWin: XEvent2<number, number[]> = new XEvent2();
    /**關閉中獎(winPos) */
    public static hideWin: XEvent1<number> = new XEvent1();

    /**變盤(toMap) */
    public static change: XEvent2<number, BaseSymbolData2[][]> = new XEvent2();

    /**開始瞇牌 */
    public static startMi: XEvent2<number, number> = new XEvent2();
    public static stopMi: XEvent1<number> = new XEvent1();

    /**設定軸可見(id, reelIdx, visible) */
    public static setReelVisible: XEvent3<number, number, boolean> = new XEvent3();

    /**是否已要求停止 */
    private requestStop: boolean = false;

    /**停輪callback */
    private stopCallback: () => void = null;

    /**輪帶索引清單 */
    private finalRngList: number[];

    /**老虎機狀態 */
    private state: SlotMachineState2 = SlotMachineState2.IDLE;

    /**參數 */
    private parser: BaseSlotParser2;

    /**老虎機參數 */
    private config: SlotReelConfig2;

    /**
     * 建立物件
     */
    onLoad() {
        let config = new SlotReelConfig2();
        config.symbolPrefab = this.symbolPrefab;
        config.beginCurve = this.beginCurve;
        config.endCurve = this.endCurve;
        config.nudgeCurveList = [this.nudgeCurve, this.nudgeCurve2];
        config.speedConfigList = [this.normal, this.fast, this.turbo];
        config.direction = this.direction;
        config.layerList = this.layerList;
        config.reelLayerList = this.reelLayerList;
        config.maxRow = this.maxRow;
        this.config = config;

        //軸初始化
        this.dataList.forEach((reel, idx) => {
            reel.init(idx, config);
        }, this);

        SlotMachine2.setup.on(this.setupStripTableAndRng, this);
        SlotMachine2.changeStrip.on(this.changeStripTable, this);
        SlotMachine2.spin.on(this.onSpin, this);
        SlotMachine2.setForceResult.on(this.onForceResult, this);
        SlotMachine2.stop.on(this.onStop, this);
        SlotMachine2.skip.on(this.onSkip, this);

        //舊盤面落下
        SlotMachine2.drop.on(this.onDrop, this);

        //新盤面補入
        SlotMachine2.fill.on(this.onFill, this);
        SlotMachine2.explode.on(this.onExplode, this);
        SlotMachine2.showWin.on(this.onShowWin, this);
        SlotMachine2.hideWin.on(this.onHideWin, this);
        SlotMachine2.change.on(this.onChange, this);

        SlotMachine2.setReelVisible.on(this.onSetReelVisible, this);
    }

    /**
     * 初始化
     * @param stripTable 
     * @param rngList 
     */
    private setupStripTableAndRng(id: number, parser: BaseSlotParser2): void {
        if (id !== this.id) {
            return;
        }

        this.parser = parser;
        for (let i = 0; i < this.dataList.length; i++) {
            this.dataList[i].setupStripAndRng(parser.stripTable[i], parser.rngList[i]);
        }
    }

    private changeStripTable(id: number, parser: BaseSlotParser2): void {
        if (id !== this.id) {
            return;
        }
        this.parser = parser;
        for (let i = 0; i < this.dataList.length; i++) {
            this.dataList[i].setStrip(parser.stripTable[i]);
        }
    }


    /**
     * 開始轉動
     */
    private onSpin(id: number): void {
        if (id !== this.id) {
            return;
        }

        this.state = SlotMachineState2.BEGIN;
        this.isSkip = false;

        //後轉會是stop觸發, 所以要補通知到外部做spin的事情
        SlotMachine2.spinComplete.emit(this.id);

        Tween.stopAllByTarget(this.node);
        let script = tween(this.node);

        let count: number = this.spinList.length;
        for (let i = 0; i < this.spinList.length; i++) {
            this.spinList[i].node.once(SlotReel2.BEGIN_COMPLETE, (idx: number) => {
                this.spinList[i].node.off(SlotReel2.BEGIN_COMPLETE);
                count -= 1;
                if (count <= 0) {
                    this.state = SlotMachineState2.LOOP;
                    //所有軸啟動完成確認是否已要求停止
                    if (this.requestStop) {
                        this.realStop(this.finalRngList);
                    }
                }
            }, this);

            let speedConfig = this.config.speedConfigList[BaseDataManager.getInstance().getTurboMode()];

            //依序啟動
            script.call(() => {
                this.spinList[i].spin();
            })
            script.delay(speedConfig.spinInterval);
        }

        //腳本排完一次執行
        script.start();
    }

    private onForceResult(id: number, forceResult: number[][]) {
        if (id !== this.id) {
            return;
        }
        this.parser.forceResult = forceResult;
        this.dataList.forEach((reel, index) => reel.setForceResult(forceResult[index]));
    }
    /**
     * 要求停輪
     * @param rngList 
     */
    private onStop(id: number, rngList: number[], onComplete?: () => void): void {
        if (id !== this.id) {
            return;
        }

        this.requestStop = true;
        this.finalRngList = rngList;
        this.stopCallback = onComplete;

        //後轉型, 要補開始轉動做
        if (this.state === SlotMachineState2.IDLE) {
            this.onSpin(this.id);
        }
        //啟動中, 等待啟動完成通知才能停
        else if (this.state === SlotMachineState2.BEGIN) {
            //
        }
        //已經在循環, 可以停
        else if (this.state === SlotMachineState2.LOOP) {
            this.realStop(this.finalRngList);
        }
    }

    private onSkip(id: number): void {
        if (id !== this.id) {
            return;
        }

        //尚未收到停輪資料
        if (this.requestStop === false) {
            return;
        }

        //已經點過
        if (this.isSkip) {
            return;
        }
        this.isSkip = true;

        //瞇牌不能skip
        if (this.parser.canSkip() === false) {
            return;
        }

        // //有任意一軸已停止, 就不能skip
        // if (this.spinList.some((reel) => reel.isEnd()) === true) {
        //     return;
        // }

        if (this.isSkip) {
            //停止所有進行中的tween
            Tween.stopAllByTarget(this.node);

            //要監聽停止(非STOPPED)
            let numSkipReel = this.spinList.filter((reel) => reel.isStopped() !== true).length;
            //要處理SKIP(非STOPPED、非END)
            this.realStop(this.finalRngList, numSkipReel);
            this.spinList.forEach((reel) => {
                let dataIdx = this.dataList.indexOf(reel);
                if (reel.isEnding() !== true) {
                    reel.stop(this.finalRngList[dataIdx]);
                    reel.skip();
                }
            }, this);

            let miList = this.parser.getMiList();
            if (miList.some((isMi) => isMi === true)) {
                this.stopMiAll();
            }
        }

    }

    /**
     * 停止
     */
    public realStop(rngList: number[], skipNumReel: number = -1): void {
        let speedConfig = this.config.speedConfigList[BaseDataManager.getInstance().getTurboMode()];
        this.parser.rngList = rngList.concat();
        let numReel: number = skipNumReel > 0 ? skipNumReel : this.spinList.length;
        let isMi: boolean = false;
        //第N軸要瞇牌
        let miList = this.parser.getMiList();
        let nudgeTypeList = this.parser.getNudgeTypeList();
        nudgeTypeList?.map((nudgeType, index) => {
            this.dataList[index].setNudgeType(nudgeType);
        });

        Tween.stopAllByTarget(this.node);
        let script = tween(this.node);

        for (let col = 0; col < this.spinList.length; col++) {

            let nextReel = this.spinList[col + 1];
            //軸完全停止
            this.spinList[col].node.off(SlotReel2.STOP_COMPLETE);
            this.spinList[col].node.once(SlotReel2.STOP_COMPLETE, (stopReelIndex: number) => {
                this.spinList[col].node.off(SlotReel2.STOP_COMPLETE);
                //瞇牌
                if (nextReel && miList[nextReel.reelIndex] === true) {
                    //通知所有軸開始瞇牌
                    isMi = true;
                    this.startMiAllAt(nextReel.reelIndex);
                }
                //斷瞇
                else if (miList[stopReelIndex] === true && nextReel && miList[nextReel.reelIndex] === false) {
                    //通知所有軸停止瞇牌
                    if (isMi) {
                        this.stopMiAll();
                    }
                }

                //單軸停止
                SlotMachine2.stopOnReel.emit(this.id, stopReelIndex);

                numReel -= 1;
                //全部軸停止
                if (numReel <= 0) {
                    if (isMi) {
                        this.stopMiAll();
                    }

                    this.spinList.map((reel) => { reel.onStop() });

                    this.state = SlotMachineState2.IDLE;
                    this.requestStop = false;
                    SlotMachine2.stopComplete.emit(this.id);

                    this.stopCallback?.();
                }
            }, this);

            //依序停止
            script.call(() => {
                let dataIdx = this.dataList.indexOf(this.spinList[col]);
                this.spinList[col].stop(rngList[dataIdx]);
            })
            //加入軸間隔時間
            let stopDelay = miList[col + 1] ? speedConfig.slowMotionTime : speedConfig.stopInterval;
            script.delay(stopDelay);
        }

        //腳本排完一次執行
        script.start();
    }

    /**
     * 向下掉落補空位置
     * @param allToReel N軸symbol
     */
    private onDrop(id: number, onComplete?: () => void): void {
        if (id !== this.id) {
            return;
        }

        if (this.dropList.length <= 0) {
            throw new Error("未設置dropList!");
        }
        let speedConfig = this.config.speedConfigList[BaseDataManager.getInstance().getTurboMode()];

        Tween.stopAllByTarget(this.node);
        let script = tween(this.node);

        //過濾需要落下的軸(沒有空格的也會傳DROP_COMPLETE)
        let count: number = this.dropList.length;
        this.dropList.forEach((reel, order) => {
            reel.node.once(SlotReel2.DROP_COMPLETE, (idx: number) => {
                console.log("dropComplete ", idx);
                count -= 1;
                if (count <= 0) {
                    onComplete?.();
                }
            }, this);

            //依序掉落
            script.call(() => {
                reel.drop();
            })
            script.delay(speedConfig.dropInterval);
        }, this);

        //腳本排完一次執行
        script.start();
    }


    /**
     * 補新盤面
     * @param toMap N軸symbol
     */
    private onFill(id: number, fromMap: BaseSymbolData2[][], toMap: BaseSymbolData2[][], onComplete?: () => void): void {
        if (id !== this.id) {
            return;
        }

        if (this.fillList.length <= 0) {
            throw new Error("未設置fillList!");
        }

        let speedConfig = this.config.speedConfigList[BaseDataManager.getInstance().getTurboMode()];
        let miList = this.parser.getMiList2(fromMap);
        let realMiList = this.fillList.map((reel) => { return miList[reel.reelIndex] && reel.getNumEmpty() > 0 });

        Tween.stopAllByTarget(this.node);
        let script = tween(this.node);
        let isMi: boolean = false;
        //過濾需要落下的軸
        let numFillReel = this.fillList.length;
        let numEmptyList: number[] = [];
        this.fillList.forEach((reel, order, list) => {

            numEmptyList[reel.reelIndex] = reel.getNumEmpty();

            //掉落完成(沒有空格的也會傳FILL_COMPLETE)
            reel.node.once(SlotReel2.FILL_COMPLETE, (stopReelIndex: number) => {
                numFillReel -= 1;

                //真的有補圖示的軸才發通知
                if (numEmptyList[stopReelIndex] > 0) {
                    SlotMachine2.fillOnReel.emit(this.id, stopReelIndex);
                }

                if (numFillReel <= 0) {
                    if (isMi) {
                        this.stopMiAll();
                    }
                    onComplete?.();
                }
            }, this);


            //軸等待啟動時間
            let miDelay = realMiList[order] ? 1 : 0;
            script.call(() => {
                if (realMiList[order] === true) {
                    isMi = true;
                    //通知所有軸開始瞇牌
                    this.startMiAllAt(reel.reelIndex);
                }
            })
            script.delay(miDelay);

            //依序開始填充缺空圖示
            script.call(() => {
                let dataIdx = this.dataList.indexOf(this.fillList[order]);
                reel.fill(toMap?.[dataIdx], 0);
            })

            let fillDelay = realMiList[order] ? speedConfig.dropInterval + 0.2 : speedConfig.dropInterval;
            script.delay(fillDelay);

        }, this);

        //腳本排完一次執行
        script.start();
    }

    /**
     * 消去
     * @param winPos 
     */
    private onExplode(id: number, winPos: number[]): void {
        if (id !== this.id) {
            return;
        }
        for (let i = 0; i < this.dataList.length; i++) {
            let reelErase: number[] = [];
            winPos.forEach((p, idx) => {
                let grid = XUtils.posToGrid(p);
                if (grid.col == i) {
                    reelErase.push(p);
                }
            })
            this.dataList[i].explode(reelErase);
        }
    }

    /**
     * 變盤
     * @param winPos 
     */
    private onChange(id: number, changeMap: BaseSymbolData2[][]): void {
        if (id !== this.id) {
            return;
        }
        for (let i = 0; i < this.dataList.length; i++) {
            this.dataList[i].change(changeMap[i]);
        }
    }

    private onShowWin(id: number, winPos: number[]): void {
        if (id !== this.id) {
            return;
        }
        for (let i = 0; i < this.dataList.length; i++) {
            let reelWin: number[] = [];
            winPos.forEach((p, idx) => {
                let grid = XUtils.posToGrid(p);
                if (grid.col == i) {
                    reelWin.push(p);
                }
            })
            this.dataList[i].showWin(reelWin);
        }
    }

    /**
     * 關閉中獎效果
     * @param winPos 
     */
    private onHideWin(id: number): void {
        if (id !== this.id) {
            return;
        }
        for (let i = 0; i < this.dataList.length; i++) {
            this.dataList[i].hideWin();
        }
    }

    /**
     * 關閉中獎效果
     * @param winPos 
     */
    private onSetReelVisible(id: number, reelIdx: number, visible: boolean): void {
        if (id !== this.id) {
            return;
        }

        let reel = this.dataList[reelIdx];
        reel.setVisible(visible);
    }

    /**
     * 開始瞇牌
     * @param reelIndex 
     */
    private startMiAllAt(reelIndex: number): void {
        if (this.config.speedConfigList[BaseDataManager.getInstance().getTurboMode()].miAllReel) {
            this.dataList.map((reel, index) => { reel.setIsMi(true) });
        }
        else {
            this.dataList.map((reel, index) => { reel.setIsMi(index === reelIndex) });
        }
        SlotMachine2.startMi.emit(this.id, reelIndex);
    }

    /**
     * 停止瞇牌
     */
    private stopMiAll(): void {
        this.dataList.map((reel) => { reel.setIsMi(false) });
        SlotMachine2.stopMi.emit(this.id);
    }
}

enum SlotMachineState2 {
    /**待機 */
    IDLE = 0,
    /**啟動 */
    BEGIN,
    /**循環 */
    LOOP,
    /**停止中 */
    STOP,
    /**結尾 */
    END
}