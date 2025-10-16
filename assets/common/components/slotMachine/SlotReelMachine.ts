import { _decorator, Component, CCInteger, Node, Prefab, tween, CCFloat, instantiate, UITransform, Vec3, Tween, Size } from 'cc';

import { BaseSymbol } from '@common/components/slotMachine/BaseSymbol';

import { BaseConst } from '@common/script/data/BaseConst';
import { DataManager } from '@common/script/data/DataManager';
import { XEvent, XEvent1, XEvent2 } from '@common/script/event/XEvent';
import { AudioManager } from '@common/script/manager/AudioManager';
import { TurboMode } from '@common/script/types/BaseType';
import { delay, Utils } from '@common/script/utils/Utils';


const { ccclass, property } = _decorator;
/**
 * 老虎機
 */
@ccclass('SlotReelMachine')
export class SlotReelMachine extends Component {
    /**初始化盤面結果 */
    public static initResultParser: XEvent1<number[][]> = new XEvent1();
    /**開始轉動slot */
    public static slotRun: XEvent2<number[][], boolean[]> = new XEvent2();
    /**停止轉動slot */
    public static slotStop: XEvent1<() => void> = new XEvent1();
    /**急停 */
    public static slotSkip: XEvent = new XEvent();
    /**開始瞇牌 */
    public static startMi: XEvent1<number> = new XEvent1();
    /**停止瞇牌 */
    public static stopMi: XEvent = new XEvent();

    @property({ type: CCInteger, tooltip: '橫軸列數' })
    public static reelCol: number = 5;

    @property({ type: CCInteger, tooltip: '縱軸列數' })
    public static reelRow: number = 3;

    @property({ type: Node, tooltip: '轉動軸(順序),注意子節點下層需要多長一個symbol節點' })
    public reelList: Node[] = [];

    @property({ type: Node, tooltip: 'scatter層' })
    public scatterLayer: Node = null!;

    @property({ type: Node, tooltip: '勝利層' })
    public winLayer: Node = null!;

    @property({ type: Node, tooltip: 'reel遮黑節點' })
    private reelBlack: Node = null!;

    @property({ type: Node, tooltip: '急停節點' })
    private skipNode: Node = null!;

    @property({ type: Prefab, tooltip: 'symbol' })
    private symbolPrefab: Prefab = null!;

    @property({ type: String, tooltip: '大機率出現的symbolID,用逗號分隔' })
    private randomSymbolID: string = '';

    @property({ type: CCFloat, tooltip: '大機率出現的symbolID機率' })
    private randomSymbolIDRate: number = 0.9;

    @property({ type: String, tooltip: '小機率出現的symbolID,用逗號分隔' })
    private randomSpecialSymbolID: string = '';

    @property({ type: Size, tooltip: 'symbol尺寸' })
    private symbolSize: Size = new Size(164, 258);

    private isRunMi = false;//是否執行瞇牌
    private resultPattern: number[][] = [];//結果符號
    private mipieList: boolean[] = [];//各軸瞇牌狀態
    private reelStopState: boolean[] = Array(this.reelList.length).fill(false);//各軸停止狀態

    /**
     * 建立物件
     */
    onLoad() {
        // this.poolManager = PoolManager.getInstance();//獲得pool實例
        this.initCreatReel();//生成節點
        SlotReelMachine.initResultParser.on(this.initResultParser, this);
        SlotReelMachine.slotRun.on(this.onSlotRun, this);
        SlotReelMachine.slotStop.on(this.onSlotStop, this);
        SlotReelMachine.slotSkip.on(this.onSlotSkip, this);

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
     * 初始化建立reelNode
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
     * @param initParset 初始化盤面符號
     */
    private initResultParser(initParser: number[][]) {
        for (let i = 0; i < this.reelList.length; i++) {
            const reelNode = this.reelList[i];
            reelNode.children.forEach((child, idx) => {
                const symbol = instantiate(this.symbolPrefab).getComponent(BaseSymbol);
                symbol.node.setParent(child);
                if (idx < SlotReelMachine.reelRow || idx >= SlotReelMachine.reelRow * 2) {
                    symbol.setSymbolID(this.getRandomSymbolID());
                } else {
                    symbol.setSymbolID(initParser[i][idx]);
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
        this.resultPattern = resultPattern;//設定盤面結果
        this.mipieList = mipieList;//設定各軸瞇牌狀態

        //至少轉動spinTime秒後才啟用急停節點監聽(一次性)
        const spinTime = BaseConst.SLOT_TIME[DataManager.getInstance().curTurboMode].spinTime;
        tween(this.skipNode).delay(spinTime).call(() => {
            this.skipNode.once(Node.EventType.TOUCH_END, this.onSlotSkip, this);
        }).start();
        for (let i = 0; i < this.reelList.length; i++) {
            this.startSlotRun(i);
            await delay(BaseConst.SLOT_TIME[DataManager.getInstance().curTurboMode].spinInterval);
        }
    }

    /**
     * 停止轉動slot
     */
    private async onSlotStop(callback: () => void) {
        for (let i = 0; i < this.reelList.length; i++) {
            const { runTime, backTime } = await this.handleMi(i);//判斷是否執行咪牌與回傳停止時間
            await this.stopSlotRun(i, runTime, backTime);
            if (i === this.reelList.length - 1) {
                //輪軸全部轉動結束
                this.stopMiAll();//停止咪牌
            }
        }
        callback();//執行callback
    }

    /**
     * 開始轉動slot
     * @param reelIndex 哪行slot
     */
    private startSlotRun(reelIndex: number) {
        const beginTime = BaseConst.SLOT_TIME[DataManager.getInstance().curTurboMode].beginTime;//啟動時間
        const reelNode = this.reelList[reelIndex];//該行slotRun
        const singleHeight = reelNode.getComponent(UITransform)!.contentSize.height / 3;//上中下單區塊高度
        this.blurShow(reelNode);//顯示模糊貼圖

        //循環轉動
        const LoopSlotRun = () => {
            //紀錄上層的symbolID
            let topSymbolIDs: number[] = [];
            for (let i = 0; i < SlotReelMachine.reelRow; i++) {
                const symbol = reelNode.children[i].getComponent(BaseSymbol);
                topSymbolIDs.push(symbol.symbolID);
            }

            //設置隨機symbolID
            for (let i = 0; i < reelNode.children.length; i++) {
                const symbol = reelNode.children[i].getComponent(BaseSymbol);
                if (i >= SlotReelMachine.reelRow * 2) {
                    //下層的symbolID = 上層的symbolID
                    symbol.setSymbolID(topSymbolIDs[i - SlotReelMachine.reelRow * 2]);
                } else {
                    symbol.setSymbolID(this.getRandomSymbolID());
                }
            }
            reelNode.position = new Vec3(reelNode.x, singleHeight, 0);//reelNode移到上面
            tween(reelNode)
                .to(beginTime, { position: new Vec3(reelNode.x, -singleHeight, 0) })
                .call(() => {
                    LoopSlotRun();//持續轉動
                }).start();
        };

        //起始轉動後持續循環轉動
        tween(reelNode).to(beginTime, { position: new Vec3(reelNode.x, -singleHeight, 0) }, { easing: 'sineIn' })
            .call(() => {
                LoopSlotRun();//執行循環轉動
            }).start();
    }

    /**
     * 處理咪牌
     * @param reelIndex 哪行reel
     * @returns 輪軸停止時間和回彈時間
     */
    private async handleMi(reelIndex: number): Promise<{ runTime: number, backTime: number }> {
        //判斷此軸是否咪牌
        if (this.mipieList[reelIndex]) {
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
            const mipieTime = BaseConst.SLOT_TIME[DataManager.getInstance().curTurboMode].mipiTime;
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
            this.resetReelToTop(reelNode);

            const mipieTime = BaseConst.SLOT_TIME[DataManager.getInstance().curTurboMode].mipiTime;
            this.blurHide(reelNode);//模糊貼圖隱藏
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
     * @param runTime 轉動時間
     */
    private async stopSlotRun(reelIndex: number, runTime: number, backTime: number): Promise<void> {
        return new Promise(async resolve => {
            this.reelStopState[reelIndex] = true;//設定該行已執行停止轉動
            const stopSymbolIDs = this.resultPattern[reelIndex];//該軸的結果符號
            const reelNode = this.reelList[reelIndex];//該行slotRun

            //重置reel到最上面，並回傳最下層symbol陣列
            const reelStopSymbols = this.resetReelToTop(reelNode, stopSymbolIDs);

            this.blurHide(reelNode);//模糊貼圖隱藏
            tween(reelNode)
                .to(runTime, { position: new Vec3(reelNode.x, -20, 0) }, { easing: 'sineIn' })
                .call(() => {
                    // AudioManager.getInstance().playOnceSound(G5251AudioName.ReelStop);//播放回彈音效
                })
                .to(backTime, { position: new Vec3(reelNode.x, 0, 0) })
                .call(async () => {
                    reelStopSymbols.forEach((symbol) => {
                        symbol.hit(true);//圖示落地
                    });
                    //計算scatter數量
                    // this.scatterCount += stopSymbolIDs.filter(id => id === SymbolID.Scatter).length;
                    resolve();//結束slot轉動
                }).start();
        });
    }

    /**
     * 計算，重置reel到最上面，並回傳最下層symbol陣列
     * @param reelNode 哪行reelNode
     * @param stopSymbolIDs 停止symbolID陣列(未帶值就隨機產生)
     * @returns 最下層symbol陣列
     */
    private resetReelToTop(reelNode: Node, stopSymbolIDs?: number[]): BaseSymbol[] {
        const singleHeight = reelNode.getComponent(UITransform)!.contentSize.height / 3;//上中下單區塊高度
        const row1x = SlotReelMachine.reelRow;//row1倍數量
        const row2x = SlotReelMachine.reelRow * 2;//row2倍數量
        Tween.stopAllByTarget(reelNode);//停止該行轉動
        //根據目前Y軸位置判斷是否需要重最上面掉落
        const curPosY = reelNode.position.y;//當前的位置
        const symbolHeight = this.symbolSize.height;
        const backNumber = Math.ceil((singleHeight - curPosY) / symbolHeight);//需要回推的symbol數量
        const offsetPosY = (curPosY % symbolHeight + symbolHeight) % symbolHeight;//偏移量

        //獲取停止前最下層的symbolID(+1代表要多獲取到下層最後一個symbol)
        let downSymbolIDs: number[] = [];
        for (let i = 0; i < row1x + 1; i++) {
            const idx = row2x - (backNumber - i);
            const symbol = reelNode.children[idx].getComponent(BaseSymbol);
            downSymbolIDs.push(symbol.symbolID);
        }
        reelNode.position = new Vec3(reelNode.x, singleHeight + offsetPosY, 0);//slot回歸到上面(加上偏移量)
        let reelStopSymbols: BaseSymbol[] = [];//該軸的停止symbol

        //設置symbol圖案(結果)(+1代表要多獲取到下層最後一個symbol)
        for (let i = 0; i < reelNode.children.length + 1; i++) {
            const symbol = reelNode.children[i].getComponent(BaseSymbol);
            if (i < row1x) {
                symbol.setSymbolID(this.getRandomSymbolID());//上層的symbolID
            } else if (i >= row2x) {
                symbol.setSymbolID(downSymbolIDs[i - row2x]);//下層的symbolID(多設置下層最後一個symbol)
            } else {
                symbol.setSymbolID(stopSymbolIDs?.[i - row1x] ?? this.getRandomSymbolID());//中層的symbolID(結果或隨機)
                reelStopSymbols.push(symbol);
            }
        }
        return reelStopSymbols;
    }

    /**
     * 立即停止
     */
    public onSlotSkip() {
        if (this.isRunMi) return;//瞇牌不能skip
        Tween.stopAllByTarget(this.skipNode);
        this.skipNode.off(Node.EventType.TOUCH_END, this.onSlotSkip, this);
        for (let i = 0; i < this.reelStopState.length; i++) {
            if (!this.reelStopState[i]) {
                this.reelStopState[i] = true;//設定該行已執行停止轉動
                Tween.stopAllByTarget(this.reelList[i]);//停止該行動畫
                const stopTime = BaseConst.SLOT_TIME[DataManager.getInstance().curTurboMode].stopTime;
                const runTime = stopTime * 0.8;
                const backTime = stopTime * 0.2;
                this.stopSlotRun(i, runTime, backTime);//執行停止slot轉動
            }
        }
        this.stopMiAll();
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
     * @param reelNode 哪行reelNode
     */
    private blurShow(reelNode: Node) {
        for (let i = 0; i < reelNode.children.length; i++) {
            const symbol = reelNode.children[i].getComponent(BaseSymbol);
            symbol.blurShow();
        }
    }

    /**
     * 模糊貼圖隱藏
     * @param reelNode 哪行reelNode
     */
    private blurHide(reelNode: Node) {
        for (let i = 0; i < reelNode.children.length; i++) {
            const symbol = reelNode.children[i].getComponent(BaseSymbol);
            symbol.blurHide();
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

    /**
     * 中獎
     * @param winPos 
     */
    // private onShowSymbolWin(winPos: number[]): void {
    //     for (let i = 0; i < this.reelList.length; i++) {
    //         let reelWin: number[] = [];
    //         winPos.forEach((p, idx) => {
    //             let grid = Utils.posToGrid(p);
    //             if (grid.col == i) {
    //                 reelWin.push(p);
    //             }
    //         });
    //         this.reelList[i].showSymbolWin(reelWin);
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


}