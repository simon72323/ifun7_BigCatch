import { _decorator, Component, CCInteger, Node, Prefab, tween, instantiate, UITransform, Vec3, Tween, Size, easing, Button } from 'cc';

import { BaseSymbol } from '@common/components/slotMachine/BaseSymbol';

import { BaseConst } from '@common/script/data/BaseConst';
import { DataManager } from '@common/script/data/DataManager';
import { XEvent, XEvent1, XEvent2 } from '@common/script/event/XEvent';
import { AudioManager } from '@common/script/manager/AudioManager';
import { TurboMode } from '@common/script/types/BaseType';
import { Utils } from '@common/script/utils/Utils';

const { ccclass, property } = _decorator;
/**
 * 老虎機
 */
@ccclass('SlotReelMachine')
export class SlotReelMachine extends Component {
    //======================================= XEvent ========================================
    /**初始化盤面結果 */
    public static initResultParser: XEvent1<number[][]> = new XEvent1();
    /**開始轉動slot */
    public static slotRun: XEvent2<number[][], boolean[]> = new XEvent2();
    /**停止轉動slot */
    public static slotStop: XEvent = new XEvent();
    /**急停 */
    public static slotSkip: XEvent = new XEvent();
    /**轉動結束 */
    public static slotRunFinish: XEvent = new XEvent();
    /**開始瞇牌 */
    public static startMi: XEvent1<number> = new XEvent1();
    /**停止瞇牌 */
    public static stopMi: XEvent = new XEvent();
    /**中獎(winPos) */
    public static showSymbolWin: XEvent1<number[]> = new XEvent1();
    /**顯示壓黑 */
    public static showBlack: XEvent = new XEvent();
    //======================================= XEvent ========================================

    // @property({ type: CCInteger, tooltip: '橫軸列數' })
    private reelCol: number = 5;//橫軸列數

    // @property({ type: CCInteger, tooltip: '縱軸列數' })
    private reelRow: number[] = [];//縱軸列數

    @property({ type: Node, tooltip: '轉動軸(順序),注意子節點下層需要多長一個symbol節點' })
    public reelList: Node[] = [];

    @property({ type: Node, tooltip: 'scatter層' })
    public scatterLayer: Node = null!;

    @property({ type: Node, tooltip: '勝利層' })
    public winLayer: Node = null!;

    @property({ type: Node, tooltip: '急停節點' })
    private skipUI: Node = null!;

    @property({ type: Prefab, tooltip: 'symbol' })
    private symbolPrefab: Prefab = null!;

    // @property({ type: Size, tooltip: 'symbol尺寸' })
    // private symbolSize: Size = new Size(164, 158);

    private symbolHeight: number = 158;

    private reelMainSymbol: BaseSymbol[][] = [];//各軸主層symbol節點(順序)
    private reelTopSymbol: BaseSymbol[][] = [];//各軸上層symbol節點(順序)
    private reelBottomSymbol: BaseSymbol[][] = [];//各軸下層symbol節點(順序)
    private reelSymbols: BaseSymbol[][] = [];//各軸symbol節點
    private allReelMainSymbols: BaseSymbol[] = [];//所有軸主層symbol節點

    private isRunMi = false;//是否執行瞇牌
    private resultPattern: number[][] = [];//結果符號
    private mipieList: boolean[] = [];//各軸瞇牌狀態
    private reelStopState: boolean[] = [];//各軸停止狀態

    /**
     * 建立物件
     */
    onLoad() {
        this.reelMainSymbol = Array.from({ length: this.reelList.length }, () => []);
        this.reelTopSymbol = Array.from({ length: this.reelList.length }, () => []);
        this.reelBottomSymbol = Array.from({ length: this.reelList.length }, () => []);
        this.reelSymbols = Array.from({ length: this.reelList.length }, () => []);
        this.reelStopState = Array(this.reelList.length).fill(false);
        this.reelCol = this.reelList.length;
        this.reelRow = this.reelList.map((reel) => reel.children.length / 3);
        this.symbolHeight = this.reelList[0].children[0].getComponent(UITransform)!.contentSize.height;


        // this.poolManager = PoolManager.getInstance();//獲得pool實例
        this.initCreatReel();//生成節點
        SlotReelMachine.initResultParser.on(this.initResultParser, this);
        SlotReelMachine.slotRun.on(this.onSlotRun, this);
        SlotReelMachine.slotStop.on(this.onSlotStop, this);
        SlotReelMachine.slotSkip.on(this.onSlotSkip, this);

        SlotReelMachine.showSymbolWin.on(this.onShowSymbolWin, this);
    }

    /**
     * 初始化建立reelNode
     */
    private initCreatReel() {
        //建立reelNode
        for (let i = 0; i < this.reelList.length; i++) {
            let reelNode = this.reelList[i];
            reelNode.children.forEach((child, index) => {
                if (index >= this.reelRow[i] && index < this.reelRow[i] * 2) {
                    const pos = new Vec3(reelNode.position.x, child.position.y, 0);
                    //設置scatter層位置
                    const scatterPosNode = instantiate(child);
                    scatterPosNode.name = `PosNode_${i}_${index}`;
                    scatterPosNode.setParent(this.scatterLayer);
                    scatterPosNode.setPosition(pos);
                    //設置勝利層位置
                    const winPosNode = instantiate(child);
                    winPosNode.name = `PosNode_${i}_${index}`;
                    winPosNode.setParent(this.winLayer);
                    winPosNode.setPosition(pos);
                }
            });
        }
    }

    /**
     * 初始畫盤面符號
     * @param initParset 初始化盤面符號
     */
    private initResultParser(initParser: number[][]) {
        for (let i = 0; i < this.reelList.length; i++) {
            const reelNode = this.reelList[i];
            const row1x = this.reelRow[i];//row1倍數量
            const row2x = this.reelRow[i] * 2;//row2倍數量
            reelNode.children.forEach((child, idx) => {
                const symbol = instantiate(this.symbolPrefab).getComponent(BaseSymbol);
                symbol.scatterLayer = this.scatterLayer;
                symbol.winLayer = this.winLayer;
                symbol.parentNode = child;
                symbol.node.setParent(child);
                if (idx < row1x) {
                    //設置上層symbol
                    this.reelTopSymbol[i].push(symbol);
                    this.reelSymbols[i].push(symbol);
                    symbol.setRandomSymbolID();
                } else if (idx < row2x) {
                    //設置主層symbol
                    this.reelMainSymbol[i].push(symbol);
                    this.reelSymbols[i].push(symbol);
                    symbol.posID = i * row1x + idx - row1x;
                    symbol.grid = { col: i, row: idx };
                    symbol.setSymbolID(initParser[i][idx - row1x]);
                    this.allReelMainSymbols.push(symbol);
                }
                else {
                    //設置下層symbol
                    this.reelBottomSymbol[i].push(symbol);
                    this.reelSymbols[i].push(symbol);
                    symbol.setRandomSymbolID();
                }
            });
        }
    }

    //====================================== slot轉動流程 ======================================
    /**
     * 開始轉動slot
     * @param resultPattern 盤面結果
     * @param mipieList 各軸瞇牌狀態
     */
    private async onSlotRun(resultPattern: number[][], mipieList: boolean[]) {
        this.reelStopState = Array(this.reelList.length).fill(false);//重置各軸停止狀態
        this.resultPattern = resultPattern;//設定盤面結果
        this.mipieList = mipieList;//設定各軸瞇牌狀態

        //至少轉動spinTime秒後才發送轉動結束事件
        const spinTime = BaseConst.SLOT_TIME[DataManager.getInstance().curTurboMode].spinTime;
        tween(this.node).delay(spinTime).call(() => {
            this.onSlotStop();//開始停輪
        }).start();

        //所有symbol進入spin狀態
        this.reelSymbols.forEach((symbols) => {
            symbols.forEach((symbol) => {
                symbol.onSpin();
            });
        });

        //監聽急停
        // this.skipUI.active = true;
        this.skipUI.once(Button.EventType.CLICK, this.onSlotSkip, this);

        //循環轉動
        for (let i = 0; i < this.reelList.length; i++) {
            this.startSlotRun(i);
            const spinIntervalTime = BaseConst.SLOT_TIME[DataManager.getInstance().curTurboMode].spinIntervalTime;
            if (spinIntervalTime > 0) {
                await Utils.delay(spinIntervalTime);
            }
        }
    }

    /**
     * 停止轉動slot
     */
    private async onSlotStop() {
        for (let i = 0; i < this.reelList.length; i++) {
            const { runTime, backTime } = await this.handleMi(i);//判斷是否執行咪牌與回傳停止時間
            await this.stopSlotRun(i, runTime, backTime);
        }
    }

    /**
     * 開始轉動slot
     * @param reelIndex 哪行slot
     */
    private startSlotRun(reelIndex: number) {
        const beginTime = BaseConst.SLOT_TIME[DataManager.getInstance().curTurboMode].beginTime;//啟動時間
        const loopTime = BaseConst.SLOT_TIME[DataManager.getInstance().curTurboMode].loopTime;//循環時間
        const reelNode = this.reelList[reelIndex];//該行slotRun
        const singleHeight = this.symbolHeight * this.reelRow[reelIndex];//單區塊高度

        const bottomSymbols = this.reelBottomSymbol[reelIndex];
        const mainSymbols = this.reelMainSymbol[reelIndex];
        const topSymbols = this.reelTopSymbol[reelIndex];
        const topPosition = new Vec3(reelNode.x, singleHeight, 0);
        const bottomPosition = new Vec3(reelNode.x, -singleHeight, 0);

        this.blurShow(reelIndex);//顯示模糊貼圖
        //循環轉動
        const LoopSlotRun = () => {
            //先設置下層的symbolID = 上層的symbolID
            for (let i = 0; i < bottomSymbols.length; i++) {
                bottomSymbols[i].setSymbolID(topSymbols[i].symbolID);
            }
            //設置主層的symbolID = 隨機symbolID
            for (let i = 0; i < mainSymbols.length; i++) {
                mainSymbols[i].setRandomSymbolID();
            }

            //設置上層的symbolID = 隨機symbolID
            for (let i = 0; i < topSymbols.length; i++) {
                topSymbols[i].setRandomSymbolID();
            }
            reelNode.position = topPosition;//reelNode移到上面
            tween(reelNode)
                .to(loopTime, { position: bottomPosition })
                .call(LoopSlotRun)
                .start();
        };

        //起始轉動後持續循環轉動
        tween(reelNode)
            .to(beginTime, { position: bottomPosition }, { easing: easing.backIn })
            .call(() => {
                LoopSlotRun();
            })
            .start();
    }

    /**
     * 處理咪牌
     * @param reelIndex 哪行reel
     * @returns 輪軸停止時間和回彈時間
     */
    private async handleMi(reelIndex: number): Promise<{ runTime: number, backTime: number }> {
        //判斷此軸是否咪牌
        if (!this.mipieList[reelIndex]) {
            //回傳正常停止時間
            const stopTime = BaseConst.SLOT_TIME[DataManager.getInstance().curTurboMode].stopTime;
            return { runTime: stopTime * 0.8, backTime: stopTime * 0.2 };
        } else {
            this.isRunMi = true;//執行咪牌狀態
            SlotReelMachine.startMi.emit(reelIndex);//傳送該軸咪牌事件
            // AudioManager.getInstance().playSound(G5251AudioName.ReelReady);//播放聽牌音效
            //非閃電模式才執行聽牌loop
            if (DataManager.getInstance().curTurboMode !== TurboMode.Turbo) {
                await this.mipieLoopSlotRun(reelIndex);//執行減速聽牌(哪行slot)
            }
            //回傳咪牌停止時間
            const mipieTime = BaseConst.SLOT_TIME[DataManager.getInstance().curTurboMode].mipieTime;
            return { runTime: mipieTime * 0.9, backTime: mipieTime * 0.1 };
        }
    }

    /**
     * 執行聽牌loop依序減速並停止轉動
     * @param reelIndex 哪行reel
     */
    private async mipieLoopSlotRun(reelIndex: number): Promise<void> {
        return new Promise(async resolve => {
            const reelNode = this.reelList[reelIndex];//該行slotRun
            Tween.stopAllByTarget(reelNode);//停止該行loop轉動
            //上中下單區塊高度
            const singleHeight = reelNode.getComponent(UITransform)!.contentSize.height / 3;

            //重置reel到最上面(不取值)
            this.resetReelToTop(reelIndex);

            const mipieTime = BaseConst.SLOT_TIME[DataManager.getInstance().curTurboMode].mipieTime;
            this.blurHide(reelIndex);//模糊貼圖隱藏
            tween(reelNode)
                .to(mipieTime, { position: new Vec3(reelNode.x, -singleHeight, 0) })
                .call(() => {
                    resolve();//聽牌loop結束
                }).start();
        });
    }

    /**
     * 停止轉動
     * @param reelIndex 哪行reel
     * @param runTime 轉動時間e
     */
    private async stopSlotRun(reelIndex: number, runTime: number, backTime: number): Promise<void> {
        return new Promise(async resolve => {
            if (this.reelStopState[reelIndex]) return;
            let isResolve = false;
            this.reelStopState[reelIndex] = true;//設定該行已執行停止轉動
            const stopSymbolIDs = this.resultPattern[reelIndex];//該軸的結果符號
            const reelNode = this.reelList[reelIndex];//該行slotRun

            //重置reel到最上面，並回傳最下層symbol陣列
            const reelStopSymbols = this.resetReelToTop(reelIndex, stopSymbolIDs);

            this.blurHide(reelIndex);//模糊貼圖隱藏
            tween(reelNode)
                .to(runTime, { position: new Vec3(reelNode.x, -10, 0) }, { easing: easing.cubicOut })
                .call(() => {
                    // AudioManager.getInstance().playOnceSound(G5251AudioName.ReelStop);//播放回彈音效
                })
                .to(backTime, { position: new Vec3(reelNode.x, 0, 0) })
                .call(async () => {
                    reelStopSymbols.forEach((symbol) => {
                        symbol.onStop();
                    });
                    //是否是最後一軸停止
                    if (reelIndex === this.reelList.length - 1) {
                        this.stopMiAll();//停止咪牌
                        SlotReelMachine.slotRunFinish.emit();//發送轉動完成事件
                    }
                    if (!isResolve) resolve();
                }).start();

            //如果此軸不是咪牌且不是最後一軸，則等待stopIntervalTime後就結束
            if (!this.mipieList[reelIndex] && reelIndex !== this.reelList.length - 1) {
                const stopIntervalTime = BaseConst.SLOT_TIME[DataManager.getInstance().curTurboMode].stopIntervalTime;
                if (stopIntervalTime > 0) {
                    await Utils.delay(stopIntervalTime);
                }
                isResolve = true;
                resolve();
            }
        });
    }

    /**
     * 計算，重置reel到最上面，並回傳最下層symbol陣列
     * @param reelNode 哪行reelNode
     * @param stopSymbolIDs 停止symbolID陣列(未帶值就隨機產生)
     * @returns 最下層symbol陣列
     */
    private resetReelToTop(reelIndex: number, stopSymbolIDs?: number[]): BaseSymbol[] {
        const reelNode = this.reelList[reelIndex];
        const singleHeight = this.symbolHeight * this.reelRow[reelIndex];//單區塊高度
        const row1x = this.reelRow[reelIndex];//row1倍數量
        const row2x = this.reelRow[reelIndex] * 2;//row2倍數量
        Tween.stopAllByTarget(reelNode);//停止該行轉動
        //根據目前Y軸位置判斷是否需要重最上面掉落
        const curPosY = reelNode.position.y;//當前的位置
        // const symbolHeight = this.symbolSize.height;
        const backNumber = Math.ceil((singleHeight - curPosY) / this.symbolHeight);//需要回推的symbol數量

        // const offsetPosY = symbolHeight - Math.abs(curPosY % symbolHeight);//偏移量

        reelNode.position = new Vec3(reelNode.x, singleHeight, 0);//slot回歸到上面(加上偏移量)
        // reelNode.position = new Vec3(reelNode.x, singleHeight + offsetPosY, 0);//slot回歸到上面(加上偏移量)
        let reelStopSymbols: BaseSymbol[] = [];//該軸的停止symbol

        // console.log('curPosY', curPosY);
        // console.log('subPosY', offsetPosY);
        // console.log('offsetPosY', offsetPosY);
        // console.log('singleHeight + subPosY', singleHeight + offsetPosY);
        //獲取停止前最下層的symbolID(+1代表要多獲取到下層最後一個symbol)
        let bottomSymbolIDs: number[] = [];
        for (let i = 0; i < row1x; i++) {
            const idx = row2x - (backNumber - i);
            // console.log('idx', idx);
            // console.log('reelNode.children[idx]', reelNode.children[idx]);
            const symbolID = this.reelSymbols[reelIndex][idx].symbolID;
            // const symbol = reelNode.children[idx].getComponent(BaseSymbol);
            // console.log('symbol.symbolID', symbol.symbolID);
            bottomSymbolIDs.push(symbolID);
        }

        //設置上層的symbolID
        for (let i = 0; i < this.reelTopSymbol[reelIndex].length; i++) {
            this.reelTopSymbol[reelIndex][i].setRandomSymbolID();//上層的symbolID
        }

        //設置主層的symbolID
        for (let i = 0; i < this.reelMainSymbol[reelIndex].length; i++) {
            if (stopSymbolIDs) {
                this.reelMainSymbol[reelIndex][i].setSymbolID(stopSymbolIDs[i]);
                reelStopSymbols.push(this.reelMainSymbol[reelIndex][i]);
            } else {
                this.reelMainSymbol[reelIndex][i].setRandomSymbolID();//主層的symbolID
            }
        }

        //設置下層的symbolID
        for (let i = 0; i < this.reelBottomSymbol[reelIndex].length; i++) {
            this.reelBottomSymbol[reelIndex][i].setSymbolID(bottomSymbolIDs[i]);//下層的symbolID
        }

        //設置symbol圖案(結果)(+1代表要多獲取到下層最後一個symbol)
        // for (let i = 0; i < reelNode.children.length + 1; i++) {
        //     const symbol = reelNode.children[i].getComponent(BaseSymbol);
        //     if (i < row1x) {
        //         symbol.setSymbolID(this.getRandomSymbolID());//上層的symbolID
        //     } else if (i >= row2x) {
        //         symbol.setSymbolID(bottomSymbolIDs[i - row2x]);//下層的symbolID(多設置下層最後一個symbol)
        //     } else {
        //         symbol.setSymbolID(stopSymbolIDs?.[i - row1x] ?? this.getRandomSymbolID());//中層的symbolID(結果或隨機)
        //         reelStopSymbols.push(symbol);
        //     }
        // }
        return reelStopSymbols;
    }

    /**
     * 立即停止
     */
    public onSlotSkip() {
        console.log('onSlotSkip');
        if (this.isRunMi) return;//瞇牌不能skip
        Tween.stopAllByTarget(this.node);
        this.skipUI.off(Node.EventType.TOUCH_END, this.onSlotSkip, this);

        for (let i = 0; i < this.reelStopState.length; i++) {
            if (!this.reelStopState[i]) {
                Tween.stopAllByTarget(this.reelList[i]);//停止該行動畫
                const stopTime = BaseConst.SLOT_TIME[DataManager.getInstance().curTurboMode].stopTime;
                const runTime = stopTime * 0.8;
                const backTime = stopTime * 0.2;
                this.stopSlotRun(i, runTime, backTime);//執行停止slot轉動
                this.reelStopState[i] = true;//設定該行已執行停止轉動
            }
        }
    }
    //====================================== slot轉動流程 ======================================

    /**
     * 停止咪牌
     */
    private stopMiAll() {
        if (this.isRunMi) {
            SlotReelMachine.stopMi.emit();
            this.isRunMi = false;//停止咪牌狀態
        }
    }

    /**
     * 模糊貼圖顯示
     * @param reelIndex 哪行reel
     */
    private blurShow(reelIndex: number) {
        this.reelSymbols[reelIndex].forEach((symbol) => {
            symbol.blurShow();
        });
    }

    /**
     * 模糊貼圖隱藏
     * @param reelIndex 哪行reel
     */
    private blurHide(reelIndex: number) {
        this.reelSymbols[reelIndex].forEach((symbol) => {
            symbol.blurHide();
        });
    }

    /**
     * 取得隨機symbol圖案編號
     * @returns 隨機symbol圖案編號
     */
    // public getRandomSymbolID() {
    //     let randomID = 0;//隨機編號
    //     const random = Math.random();//隨機數
    //     if (random < this.randomSymbolIDRate) {
    //         const length = this.randomSymbolID.split(',').length;
    //         randomID = this.randomSymbolID.split(',').map(Number)[Math.floor(Math.random() * length)];
    //     } else {
    //         const length = this.randomSpecialSymbolID.split(',').length;
    //         randomID = this.randomSpecialSymbolID.split(',').map(Number)[Math.floor(Math.random() * length)];
    //     }
    //     return randomID;
    // }

    //====================================== 中獎流程 ======================================

    /**
     * 中獎
     * @param winPos 
     */
    private onShowSymbolWin(winPos: number[]): void {
        // const winPos = Utils.uniq(winLineData.flatMap((data) => data.winPos)); //全部中獎位置(不重複)
        const losePos = Array.from({ length: this.allReelMainSymbols.length }, (_, i) => i)
            .filter(pos => !winPos.includes(pos));

        console.log('this.reelMainSymbol.length', this.allReelMainSymbols.length);
        console.log('losePos', losePos);

        for (let i = 0; i < winPos.length; i++) {
            const winSymbol = this.allReelMainSymbols[winPos[i]];
            winSymbol.symbolWin();
        }
        // for (let i = 0; i < losePos.length; i++) {
        //     const loseSymbol = this.allReelMainSymbols[losePos[i]];
        //     loseSymbol.symbolLose();
        // }
    }

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

    //====================================== 中獎流程 ======================================


}