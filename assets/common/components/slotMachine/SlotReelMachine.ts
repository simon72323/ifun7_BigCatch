import { _decorator, Component, CCInteger, Node, Prefab, tween, CCFloat, instantiate, UITransform, Vec3, Tween } from 'cc';

import { BaseSymbol } from '@common/components/slotMachine/BaseSymbol';

import { DataManager } from '@common/script/data/DataManager';
import { XEvent, XEvent1, XEvent2, XEvent3, XEvent4 } from '@common/script/event/XEvent';
// import PoolManager from '@common/script/manager/PoolManager';
import { delay, Utils } from '@common/script/utils/Utils';

const { ccclass, property } = _decorator;

class ReelSpeedConfig {
    @property({ type: CCFloat, tooltip: '轉動/停止間隔秒數' })
    public spinInterval: number = 0.1;

    @property({ type: CCFloat, tooltip: '停止間隔秒數' })
    public stopInterval: number = 0.25;

    @property({ type: CCFloat, tooltip: '啟動秒數(loop是他的一半時間)' })
    public beginTime: number = 0.5;

    @property({ type: CCFloat, tooltip: '停止秒數' })
    public stopTime: number = 0.2;

    @property({ type: CCFloat, tooltip: '停止回彈秒數' })
    public stopBackTime: number = 0.1;


    @property({ type: CCFloat, tooltip: '至少滾動N秒' })
    public spinTime: number = 1;

    @property({ type: CCFloat, tooltip: '瞇牌秒數' })
    public mipiTime: number = 2;
}

/**
 * 老虎機
 */
@ccclass('SlotReelMachine')
export class SlotReelMachine extends Component {

    /**初始化軸符號 */
    public static initReelSymbolID: XEvent1<number[][]> = new XEvent1();
    /**開始轉動slot */
    public static slotRun: XEvent = new XEvent();
    /**停止轉動slot */
    public static slotStop: XEvent = new XEvent();

    @property({ type: CCInteger, tooltip: '橫軸列數' })
    public static reelCol: number = 5;

    @property({ type: CCInteger, tooltip: '縱軸列數' })
    public static reelRow: number = 3;

    @property({ type: Node, tooltip: '轉動軸(順序)' })
    public reelList: Node[] = [];

    @property({ type: Node, tooltip: 'scatter層' })
    public scatterLayer: Node = null!;

    @property({ type: Node, tooltip: '勝利層' })
    public winLayer: Node = null!;

    @property(Node)
    private reelBlack: Node = null!;//reel遮黑節點

    @property({ type: Prefab, tooltip: 'symbol' })
    private symbolPrefab: Prefab = null!;

    @property({ type: ReelSpeedConfig, tooltip: '一般參數', group: '一般' })
    private normal: ReelSpeedConfig = new ReelSpeedConfig();

    @property({ type: ReelSpeedConfig, tooltip: '閃電參數', group: '閃電' })
    private fast: ReelSpeedConfig = new ReelSpeedConfig();

    @property({ type: ReelSpeedConfig, tooltip: 'Turbo參數', group: 'Turbo' })
    private turbo: ReelSpeedConfig = new ReelSpeedConfig();

    private speedList: ReelSpeedConfig[] = [this.normal, this.fast, this.turbo];

    @property({ type: String, tooltip: '大機率出現的symbolID,用逗號分隔' })
    private randomSymbolID: string = '';

    @property({ type: CCFloat, tooltip: '大機率出現的symbolID機率' })
    private randomSymbolIDRate: number = 0.9;

    @property({ type: String, tooltip: '小機率出現的symbolID,用逗號分隔' })
    private randomSpecialSymbolID: string = '';


    private isMi = false;//是否瞇牌
    private resultSymbolID: number[][] = [];//結果符號
    // private poolManager: PoolManager = null!;//pool節點

    /**每軸的高度 */
    // private reelHeight: number[] = [];
    // private reelXPos: number[] = [];
    // private reelYPos:

    /**
     * 建立物件
     */
    onLoad() {
        // this.poolManager = PoolManager.getInstance();//獲得pool實例
        this.initCreatReel();//生成節點
        SlotReelMachine.initReelSymbolID.on(this.initReelSymbolID, this);
        SlotReelMachine.slotRun.on(this.slotRun, this);
        SlotReelMachine.slotStop.on(this.slotStop, this);
        // SlotMachine.setSlotParser.on(this.setSlotParser, this);
        // SlotMachine.spin.on(this.onSpin, this);
        // SlotMachine.setForceResult.on(this.onForceResult, this);
        // SlotMachine.stop.on(this.onStop, this);
        // SlotMachine.skip.on(this.onSkip, this);

        // //新盤面補入
        // SlotMachine.showSymbolWin.on(this.onShowSymbolWin, this);
        // SlotMachine.hideSymbolWin.on(this.onHideSymbolWin, this);

        // SlotMachine.setReelVisible.on(this.onSetReelVisible, this);
    }

    /**
     * 建立reelNode
     */
    private initCreatReel() {
        //建立reelNode
        for (let i = 0; i < this.reelList.length; i++) {
            let reelNode = this.reelList[i];
            let scatterReelNode = instantiate(reelNode);
            scatterReelNode.setParent(this.scatterLayer);
            scatterReelNode.setPosition(reelNode.position);
            scatterReelNode.children.forEach((child, index) => {
                if (index < SlotReelMachine.reelRow || index >= SlotReelMachine.reelRow * 2) {
                    child.destroy();//移除上下層
                }
            });

            let winReelNode = instantiate(reelNode);
            winReelNode.setParent(this.winLayer);
            winReelNode.setPosition(reelNode.position);
            winReelNode.children.forEach((child, index) => {
                if (index < SlotReelMachine.reelRow || index >= SlotReelMachine.reelRow * 2) {
                    child.destroy();//移除上下層
                }
            });
        }
    }

    /**
     * 初始畫盤面符號
     * @param initSymbolID 初始化符號
     */
    private initReelSymbolID(initSymbolID: number[][]) {
        for (let i = 0; i < this.reelList.length; i++) {
            const reelNode = this.reelList[i];
            reelNode.children.forEach((child, idx) => {
                const symbol = instantiate(this.symbolPrefab).getComponent(BaseSymbol);
                symbol.node.setParent(child);
                if (idx < SlotReelMachine.reelRow || idx >= SlotReelMachine.reelRow * 2) {
                    symbol.setSymbolID(this.getRandomSymbolID());
                } else {
                    symbol.setSymbolID(initSymbolID[i][idx]);
                }
            });
        }
    }


    /**
     * 開始轉動slot
     */
    private async slotRun() {
        for (let i = 0; i < this.reelList.length; i++) {
            this.startRun(i);
            await delay(this.speedList[DataManager.getInstance().curTurboMode].spinInterval);
        }
    }

    /**
     * 停止轉動slot
     */
    private async slotStop() {
        for (let i = 0; i < this.reelList.length; i++) {
            this.stopRun(i);
            await delay(this.speedList[DataManager.getInstance().curTurboMode].spinInterval);
        }
    }

    /**
     * 開始轉動slot
     * @param slotLine 哪行slot
     * @param runTime 轉動時間
     */
    private startRun(reelIndex: number) {
        const beginTime = this.speedList[DataManager.getInstance().curTurboMode].beginTime;//啟動時間
        const reelNode = this.reelList[reelIndex];//該行slotRun
        const xPos = reelNode.x;
        const height = reelNode.getComponent(UITransform)!.contentSize.height;//行高
        this.blurShow(reelNode);//顯示模糊貼圖

        //循環轉動
        const loopRun = () => {
            //紀錄上層的symbolID
            let topSymbolIDs: number[] = [];
            for (let i = 0; i < SlotReelMachine.reelRow; i++) {
                const symbol = reelNode.children[i].getComponent(BaseSymbol);
                topSymbolIDs.push(symbol.symbolID);
            }

            for (let i = 0; i < reelNode.children.length; i++) {
                const symbol = reelNode.children[i].getComponent(BaseSymbol);
                if (i >= SlotReelMachine.reelRow * 2) {
                    //下層的symbolID = 上層的symbolID
                    symbol.setSymbolID(topSymbolIDs[i - SlotReelMachine.reelRow * 2]);
                } else {
                    symbol.setSymbolID(this.getRandomSymbolID());
                }
            }
            reelNode.position = new Vec3(xPos, height, 0);//reelNode移到上面
            tween(reelNode)
                .to(beginTime, { position: new Vec3(xPos, -height, 0) })
                .call(() => {
                    loopRun();//持續轉動
                }).start();
        };

        //起始轉動後持續循環轉動
        tween(reelNode).to(beginTime, { position: new Vec3(xPos, -height, 0) }, { easing: 'sineIn' })
            .call(() => {
                loopRun();//執行循環轉動
            }).start();
    }

    /**
     * 停止轉動
     * @param slotLine 哪行slot
     * @param easing 緩動類型
     * @param useCurrentPos 使用當前位置停止
     */
    private async stopRun(reelIndex: number): Promise<void> {
        return new Promise(async resolve => {
            const runTime = this.speedList[DataManager.getInstance().curTurboMode].stopTime;
            const backTime = this.speedList[DataManager.getInstance().curTurboMode].stopBackTime;
            const stopSymbols = this.resultSymbolID[reelIndex];

            const reelNode = this.reelList[reelIndex];//該行slotRun
            const xPos = reelNode.x;
            const height = reelNode.getComponent(UITransform)!.contentSize.height;//行高

            Tween.stopAllByTarget(reelNode);//停止該行轉動

            //根據目前Y軸位置判斷是否需要重最上面掉落
            const curPosY = reelNode.position.y;//當前的位置
            //需要上移的symbol數量
            const subNumber = Math.ceil((height / 300) - curPosY / 100);
            const addPosY = Math.abs(curPosY % (height / SlotReelMachine.reelRow * 3));

            for (let i = 0; i < reelNode.children.length; i++) {

            }

            const downPosY = -20;//slot下移位置
            // let currentPosY = tempUseCurrentPos ? slotRunNode.position.y : downPosY - 1;//是否使用當前位置停止
            // if (currentPosY < downPosY) {
            reelNode.position = new Vec3(xPos, height + addPosY, 0);//slot回歸到上面
            // tempSymbols.position = new Vec3(0, -height, 0);//TempSymbols節點移到下面
            // }
            this.setSlotSymbol(mainSymbols, stopSymbols);//設置symbol圖案(結果)
            // const blurTime = (runTime > 0.3) ? 0.3 : runTime;
            this.blurSFHide(slotRunNode);//模糊貼圖隱藏
            tween(slotRunNode)
                .to(runTime, { position: new Vec3(xPos, downPosY, 0) }, { easing })
                .call(() => {
                    getAudioManager().playOnceSound(G5251AudioName.ReelStop);//播放回彈音效
                })
                .to(backTime, { position: new Vec3(xPos, 0, 0) })
                .call(() => {
                    this.slotEnd(slotLine, stopSymbols);//結束slot轉動時執行(哪行slot)
                    resolve();//結束slot轉動
                }).start();
        });
    }

    /**
     * 模糊貼圖顯示
     * @param reelNode 哪行reelNode
     */
    private blurShow(reelNode: Node) {
        for (let i = 0; i < reelNode.children.length; i++) {
            const symbol = reelNode.children[i].getComponent(BaseSymbol);
            symbol.blurShow();
        }
    }


    /**
     * 取得隨機symbol圖案編號
     * @returns 隨機symbol圖案編號
     */
    public getRandomSymbolID() {
        let randomID = 0;//隨機編號
        const random = Math.random();//隨機數
        if (random < this.randomSymbolIDRate) {
            const length = this.randomSymbolID.split(',').length;
            randomID = this.randomSymbolID.split(',').map(Number)[Math.floor(Math.random() * length)];
        } else {
            const length = this.randomSpecialSymbolID.split(',').length;
            randomID = this.randomSpecialSymbolID.split(',').map(Number)[Math.floor(Math.random() * length)];
        }
        return randomID;
    }


    // /**
    //  * 初始化盤面符號
    //  * @param reelSymbolID 盤面符號
    //  */
    // private initReelSymbolID(reelSymbolID: number[][]): void {
    //     for (let i = 0; i < this.spinList.length; i++) {
    //         this.spinList[i].initSymbolIDs(reelSymbolID[i]);
    //     }
    // }

    // /**
    //  * 設定盤面停止符號(二維陣列)
    //  * @param slotPattern 盤面停止符號(二維陣列)
    //  */
    // private setSlotParser(slotParser: BaseSlotParser): void {
    //     this.parser = slotParser;
    //     console.log('設定盤面停止符號', slotParser);
    //     for (let i = 0; i < this.spinList.length; i++) {
    //         this.spinList[i].setReelSymbolID(slotParser.slotPattern[i]);
    //     }
    // }

    // /**
    //  * 開始轉動
    //  */
    // private onSpin(): void {
    //     this.state = SlotMachineState.BEGIN;
    //     this.isSkip = false;

    //     //後轉會是stop觸發, 所以要補通知到外部做spin的事情
    //     SlotMachine.spinComplete.emit();

    //     Tween.stopAllByTarget(this.reelRunNode);
    //     let tweenAnim = tween(this.reelRunNode);

    //     let count: number = this.spinList.length;
    //     this.spinList.forEach((reel, index) => {
    //         reel.node.once(SlotReel.BEGIN_COMPLETE, (idx: number) => {
    //             count -= 1;
    //             if (count <= 0) {
    //                 this.state = SlotMachineState.LOOP;
    //                 //所有軸啟動完成確認是否已要求停止
    //                 if (this.requestStop) {
    //                     this.realStop();
    //                 }
    //             }
    //         }, this);

    //         let speedConfig = this.config.speedConfigList[DataManager.getInstance().curTurboMode];

    //         //依序啟動
    //         tweenAnim.call(() => {
    //             reel.spin();
    //         });
    //         tweenAnim.delay(speedConfig.spinInterval);
    //     });

    //     //腳本排完一次執行
    //     tweenAnim.start();
    // }

    // /**
    //  * 強制結果
    //  * @param forceResult 
    //  */
    // private onForceResult(forceResult: number[][]) {
    //     this.parser.forceResult = forceResult;
    //     this.spinList.forEach((reel, index) => reel.setForceResult(forceResult[index]));
    // }

    // /**
    //  * 要求停輪
    //  * @param onComplete 完成callback
    //  */
    // private onStop(onComplete?: () => void): void {
    //     this.requestStop = true;
    //     this.stopCallback = onComplete;

    //     //後轉型, 要補開始轉動做
    //     if (this.state === SlotMachineState.IDLE) {
    //         this.onSpin();
    //     }
    //     //啟動中, 等待啟動完成通知才能停
    //     else if (this.state === SlotMachineState.BEGIN) {
    //         //
    //     }
    //     //已經在循環, 可以停
    //     else if (this.state === SlotMachineState.LOOP) {
    //         this.realStop();
    //     }
    // }

    // /**
    //  * 急停
    //  */
    // private onSkip(): void {
    //     if (this.requestStop === false) return;//尚未收到停輪資料
    //     if (this.isSkip) return;//已經點過
    //     this.isSkip = true;

    //     if (this.parser.canSkip() === false) return;//瞇牌不能skip

    //     //停止此節點所有進行中的tween
    //     Tween.stopAllByTarget(this.reelRunNode);

    //     //要監聽停止(非STOPPED)
    //     let numSkipReel = this.spinList.filter((reel) => reel.isStopped() !== true).length;
    //     //要處理SKIP(非STOPPED、非END)
    //     this.realStop(numSkipReel);
    //     this.spinList.forEach((reel, idx) => {
    //         if (reel.isEnding() !== true) {
    //             reel.stop();
    //             reel.skip();
    //         }
    //     }, this);

    //     let miList = this.parser.getMiList();
    //     if (miList.some((isMi) => isMi === true)) {
    //         this.stopMiAll();
    //     }

    // }

    // /**
    //  * 停止
    //  * @param skipNumReel 
    //  */
    // public realStop(skipNumReel: number = -1): void {
    //     let speedConfig = this.config.speedConfigList[DataManager.getInstance().curTurboMode];
    //     let numReel: number = skipNumReel > 0 ? skipNumReel : this.spinList.length;
    //     let isMi: boolean = false;
    //     //判斷第N軸是否要瞇牌
    //     let miList = this.parser.getMiList();

    //     Tween.stopAllByTarget(this.reelRunNode);
    //     let tweenAnim = tween(this.reelRunNode);

    //     for (let col = 0; col < this.spinList.length; col++) {
    //         let nextReel = this.spinList[col + 1];
    //         //軸完全停止
    //         this.spinList[col].node.off(SlotReel.STOP_COMPLETE);
    //         this.spinList[col].node.once(SlotReel.STOP_COMPLETE, (stopReelIndex: number) => {
    //             //瞇牌
    //             if (nextReel && miList[nextReel.reelIndex] === true) {
    //                 //通知所有軸開始瞇牌
    //                 isMi = true;
    //                 this.startMiAllAt(nextReel.reelIndex);
    //             }
    //             //斷瞇
    //             else if (miList[stopReelIndex] === true && nextReel && miList[nextReel.reelIndex] === false) {
    //                 //通知所有軸停止瞇牌
    //                 if (isMi) this.stopMiAll();
    //             }

    //             //單軸停止
    //             // SlotMachine.stopOnReel.emit(stopReelIndex);

    //             numReel -= 1;
    //             //全部軸停止
    //             if (numReel <= 0) {
    //                 if (isMi) this.stopMiAll();

    //                 this.spinList.map(reel => reel.onStop());
    //                 this.state = SlotMachineState.IDLE;
    //                 this.requestStop = false;
    //                 SlotMachine.stopComplete.emit();
    //                 this.stopCallback?.();
    //             }
    //         }, this);

    //         //依序停止
    //         tweenAnim.call(() => {
    //             // let idx = this.spinList.indexOf(this.spinList[col]);
    //             this.spinList[col].stop();
    //         });
    //         //加入軸間隔時間
    //         let stopDelay = miList[col + 1] ? speedConfig.slowMotionTime : speedConfig.stopInterval;
    //         tweenAnim.delay(stopDelay);
    //     }
    //     tweenAnim.start();//腳本排完一次執行
    // }

    // /**
    //  * 中獎
    //  * @param winPos 
    //  */
    // private onShowSymbolWin(winPos: number[]): void {
    //     for (let i = 0; i < this.spinList.length; i++) {
    //         let reelWin: number[] = [];
    //         winPos.forEach((p, idx) => {
    //             let grid = Utils.posToGrid(p);
    //             if (grid.col == i) {
    //                 reelWin.push(p);
    //             }
    //         });
    //         this.spinList[i].showSymbolWin(reelWin);
    //     }
    // }

    // /**
    //  * 關閉中獎效果
    //  */
    // private onHideSymbolWin(): void {
    //     for (let i = 0; i < this.spinList.length; i++) {
    //         this.spinList[i].hideSymbolWin();
    //     }
    // }

    // /**
    //  * 關閉中獎效果
    //  * @param reelIdx 
    //  * @param visible 
    //  */
    // private onSetReelVisible(reelIdx: number, visible: boolean): void {
    //     let reel = this.spinList[reelIdx];
    //     reel.setVisible(visible);
    // }

    // /**
    //  * 開始瞇牌
    //  * @param reelIndex 
    //  */
    // private startMiAllAt(reelIndex: number): void {
    //     if (this.config.speedConfigList[DataManager.getInstance().curTurboMode].miAllReel) {
    //         this.spinList.map((reel, index) => { reel.setIsMi(true); });
    //     }
    //     else {
    //         this.spinList.map((reel, index) => { reel.setIsMi(index === reelIndex); });
    //     }
    //     SlotMachine.startMi.emit(reelIndex);
    // }

    // /**
    //  * 停止瞇牌
    //  */
    // private stopMiAll(): void {
    //     this.spinList.map((reel) => { reel.setIsMi(false); });
    //     SlotMachine.stopMi.emit();
    // }

}