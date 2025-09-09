import { _decorator, Component } from 'cc';

import { CCInteger, Prefab, RealCurve } from 'cc';
import { XEvent, XEvent1 } from '@/base/script/utils/XEvent';
import { AudioKey } from '../../script/audio/AudioKey';
import { AudioManager } from '../../script/audio/AudioManager';
import { BaseDataManager } from '../../script/main/BaseDataManager';
import { XUtils } from '../../script/utils/XUtils';
import { BaseSlotData } from './BaseSlotData';
import { SlotReel } from './SlotReel';
import { SlotReelConfig, SpeedConfig } from './SlotType';
const { ccclass, property } = _decorator;

/**
 * 老虎機
 */
@ccclass('SlotMachine')
export class SlotMachine extends Component {


    @property({ type: Prefab })
    public symbolPrefab: Prefab = null;

    @property({
        type: RealCurve, tooltip:
            "運動曲線\n" +
            "[啟動] 時間:(0.00 ~ 0.50), 值:(-0.5 ~ 0)"
    })
    beginCurve = (() => {
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
    endCurve = (() => {
        const curve = new RealCurve();
        curve.assignSorted([
            [0, { value: 0 }],
            [1, { value: 1 }],
        ]);
        return curve;
    })();

    @property({ type: CCInteger, tooltip: "畫面列數" })
    private viewRow: number = 3;
    @property({ type: CCInteger, tooltip: "上下保留列數" })
    private keepRow: number = 2;
    // @property({ type: CCInteger, tooltip: "方向(1:向下,-1:向上" })//暫時沒用
    private direction: number = 1;

    @property({ type: SpeedConfig, tooltip: "一般參數" })
    normal: SpeedConfig = new SpeedConfig();

    @property({ type: SpeedConfig, tooltip: "閃電參數" })
    fast: SpeedConfig = new SpeedConfig();

    @property({ type: SpeedConfig, tooltip: "Turbo參數" })
    turbo: SpeedConfig = new SpeedConfig();

    /**初始化老虎機(stripTable, rngList) */
    public static setup: XEvent1<BaseSlotData> = new XEvent1();
    /**老虎機開始轉動 */
    public static spin: XEvent = new XEvent();
    /**SR指定盤面(map)必須在stop前呼叫 */
    public static setForceResult: XEvent1<number[][]> = new XEvent1();
    /**老虎機停止(rngList) */
    public static stop: XEvent1<number[]> = new XEvent1();
    /**老虎機單軸停止 */
    public static stopOnReel: XEvent1<number> = new XEvent1();
    /**老虎機轉動完成 */
    public static stopComplete: XEvent = new XEvent();
    /**掉落盤面(allToReel) */
    public static drop: XEvent1<number[][]> = new XEvent1();
    /**老虎機掉落完成 */
    public static dropComplete: XEvent = new XEvent();
    /**消去(winPos) */
    public static explode: XEvent1<number[]> = new XEvent1();
    /**中獎(winPos) */
    public static showWin: XEvent1<number[]> = new XEvent1();

    /**開始瞇牌 */
    public static startMi: XEvent1<number> = new XEvent1();
    public static stopMi: XEvent1<number> = new XEvent1();

    /**軸清單 */
    private reelList: SlotReel[] = [];

    /**是否已要求停止 */
    private requestStop: boolean = false;

    /**輪帶索引清單 */
    private finalRngList: number[];

    /**老虎機狀態 */
    private state: SlotMachineState = SlotMachineState.IDLE;

    /**參數 */
    private data: BaseSlotData;

    /**老虎機參數 */
    private config: SlotReelConfig;
    /**
     * 建立物件
     */
    onLoad() {
        let config = new SlotReelConfig();
        config.symbolPrefab = this.symbolPrefab;
        config.beginCurve = this.beginCurve;
        config.endCurve = this.endCurve;
        config.speedConfigList = [this.normal, this.fast, this.turbo];
        config.viewRow = this.viewRow;
        config.keepRow = this.keepRow;
        config.direction = this.direction;
        this.config = config;

        //尋找符合命名的軸物件
        let idx: number = 0;
        let reelNode = this.node.getChildByName(`Reel${idx}`);
        while (reelNode != null) {
            let reel = reelNode.getComponent(SlotReel);
            reel.init(idx, config);
            this.reelList.push(reel);
            idx++;
            reelNode = this.node.getChildByPath(`Reel${idx}`);
        }

        SlotMachine.setup.on(this.setupStripTableAndRng, this);
        SlotMachine.spin.on(this.onSpin, this);
        SlotMachine.setForceResult.on(this.onForceResult, this);
        SlotMachine.stop.on(this.onStop, this);
        SlotMachine.drop.on(this.onDrop, this);
        SlotMachine.explode.on(this.onExplode, this);
        SlotMachine.showWin.on(this.onShowWin, this);
    }

    /**
     * 初始化
     * @param stripTable 
     * @param rngList 
     */
    private setupStripTableAndRng(data: BaseSlotData): void {
        this.data = data;
        for (let i = 0; i < this.reelList.length; i++) {
            this.reelList[i].setupStripAndRng(data.stripTable[i], data.rngList[i]);
        }
    }


    /**
     * 開始轉動
     */
    private onSpin(): void {
        this.state = SlotMachineState.BEGIN;

        let count: number = this.reelList.length;
        for (let i = 0; i < this.reelList.length; i++) {
            this.reelList[i].node.once(SlotReel.BEGIN_COMPLETE, (idx: number) => {
                count -= 1;
                if (count <= 0) {
                    this.state = SlotMachineState.LOOP;
                    //所有軸啟動完成確認是否已要求停止
                    if (this.requestStop) {
                        this.realStop(this.finalRngList);
                    }
                }
            }, this);

            let speedConfig = this.config.speedConfigList[BaseDataManager.getInstance().getTurboMode()];
            //依序啟動
            setTimeout(() => {
                this.reelList[i].spin();
            }, speedConfig.reelInterval * 1000 * i);
        }
    }

    public test(evt, data): void {
        console.log(evt, data);
        this.onStop([parseInt(data)])
    }

    private onForceResult(forceResult: number[][]) {
        this.data.forceResult = forceResult;
        this.reelList.forEach((reel, index) => reel.setForceResult(forceResult[index]));
    }
    /**
     * 要求停輪
     * @param rngList 
     */
    private onStop(rngList: number[]): void {
        console.log("要求停輪", rngList);
        this.requestStop = true;
        this.finalRngList = rngList;

        //後轉型, 要補開始轉動做
        if (this.state === SlotMachineState.IDLE) {
            this.onSpin();
        }
        //啟動中, 等待啟動完成通知才能停
        else if (this.state === SlotMachineState.BEGIN) {
            //
        }
        //已經在循環, 可以停
        else if (this.state === SlotMachineState.LOOP) {
            this.realStop(this.finalRngList);
        }
    }

    /**
     * 停止
     */
    public realStop(rngList: number[]): void {
        this.data.rngList = rngList.concat();
        let numReel: number = this.reelList.length;
        let stopDelay: number = 0;
        //第N軸要瞇牌
        let miList = this.data.getMiList();
        let hitList = this.data.getHitList();
        for (let col = 0; col < this.reelList.length; col++) {

            this.reelList[col].node.once(SlotReel.STOP_COMPLETE, (stopReelIndex: number) => {

                if (hitList[stopReelIndex] === true) {
                    AudioManager.getInstance().play(AudioKey.ScStop);
                }
                if (miList[stopReelIndex + 1] === true) {
                    BaseDataManager.getInstance().isTurboOn() ? AudioManager.getInstance().play(AudioKey.SlowMotion2) : AudioManager.getInstance().play(AudioKey.SlowMotion);
                    //通知所有軸開始瞇牌
                    this.reelList.forEach((reel) => { reel.setIsMi(true) });
                    SlotMachine.startMi.emit(stopReelIndex + 1);
                }
                else if (miList[stopReelIndex] === true && miList[stopReelIndex + 1] === false) {
                    //通知所有軸停止瞇牌
                    this.reelList.forEach((reel) => { reel.setIsMi(false) });
                }

                //單軸停止
                SlotMachine.stopOnReel.emit(stopReelIndex);
                AudioManager.getInstance().play(AudioKey.ReelStop + stopReelIndex);

                numReel -= 1;
                //全部軸停止
                if (numReel <= 0) {
                    AudioManager.getInstance().stop(AudioKey.SlowMotion2);
                    AudioManager.getInstance().stop(AudioKey.SlowMotion);

                    this.reelList.map((reel) => { reel.onStop() });

                    this.state = SlotMachineState.IDLE;
                    this.requestStop = false;
                    SlotMachine.stopComplete.emit();
                }
            }, this);

            //依序停止
            setTimeout(() => {
                this.reelList[col].stop(rngList[col]);
            }, stopDelay);

            //加入軸間隔時間
            let speedConfig = this.config.speedConfigList[BaseDataManager.getInstance().getTurboMode()];
            stopDelay += speedConfig.reelInterval * 1000;

            if (miList[col + 1] === true) {
                stopDelay += speedConfig.slowMotionTime * 1000;
            }
        }
    }

    /**
     * 掉落後盤面
     * @param allToReel N軸symbol
     */
    private onDrop(allToReel: number[][]): void {
        let count: number = this.reelList.length;
        for (let i = 0; i < this.reelList.length; i++) {
            this.reelList[i].node.once(SlotReel.DROP_COMPLETE, (idx: number) => {
                count -= 1;
                if (count <= 0) {
                    SlotMachine.dropComplete.emit();
                }
            }, this);

            this.reelList[i].drop(allToReel[i]);
        }
    }

    /**
     * 消去
     * @param winPos 
     */
    private onExplode(winPos: number[]): void {
        for (let i = 0; i < this.reelList.length; i++) {
            let reelErase: number[] = [];
            winPos.forEach((p, idx) => {
                let grid = XUtils.posToGrid(p);
                if (grid.col == i) {
                    reelErase.push(p);
                }
            })
            this.reelList[i].explode(reelErase);
        }
    }

    private onShowWin(winPos: number[]): void {
        for (let i = 0; i < this.reelList.length; i++) {
            let reelWin: number[] = [];
            winPos.forEach((p, idx) => {
                let grid = XUtils.posToGrid(p);
                if (grid.col == i) {
                    reelWin.push(p);
                }
            })
            this.reelList[i].showWin(reelWin);
        }
    }
}

enum SlotMachineState {
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