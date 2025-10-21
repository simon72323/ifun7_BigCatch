import { _decorator, Label, sp, Sprite, SpriteFrame, Node, UIOpacity } from 'cc';

import { SymbolID } from '@game/script/data/GameConst';

import { BaseSymbol } from '@common/components/slotMachine/BaseSymbol';
import { SlotReelMachine } from '@common/components/slotMachine/SlotReelMachine';

import { DataManager } from '@common/script/data/DataManager';
import { Utils } from '@common/script/utils/Utils';

const symbolImageMap = new Map<number, number>([
    [SymbolID.Wild, 0],     // Wild -> 0
    [SymbolID.H1, 1],       // H1 -> 1
    [SymbolID.H2, 2],       // H2 -> 2
    [SymbolID.H3, 3],       // H3 -> 3
    [SymbolID.H4, 4],       // H4 -> 4
    [SymbolID.F1, 5],       // F1 -> 5
    [SymbolID.F2, 6],       // F2 -> 6
    [SymbolID.F3, 7],       // F3 -> 7
    [SymbolID.F4, 8],       // F4 -> 8
    [SymbolID.F5, 9],       // F5 -> 9
    [SymbolID.F6, 10],      // F6 -> 10
    [SymbolID.LA, 11],      // LA -> 11
    [SymbolID.LK, 12],      // LK -> 12
    [SymbolID.LQ, 13],      // LQ -> 13
    [SymbolID.LJ, 14],      // LJ -> 14
    [SymbolID.LT, 15],      // LT -> 15
    [SymbolID.Scatter, 16]  // Scatter -> 16
]);

const symbolAniNameMap = new Map<number, string>([
    [SymbolID.Wild, 'animation'],
    [SymbolID.H1, 'H1'],
    [SymbolID.H2, 'H2'],
    [SymbolID.H3, 'H3'],
    [SymbolID.H4, 'H4'],
    [SymbolID.F1, 'F1'],
    [SymbolID.F2, 'F2'],
    [SymbolID.F3, 'F3'],
    [SymbolID.F4, 'F4'],
    [SymbolID.F5, 'F5'],
    [SymbolID.F6, 'F6'],
    [SymbolID.LA, 'LA'],
    [SymbolID.LK, 'LK'],
    [SymbolID.LQ, 'LQ'],
    [SymbolID.LJ, 'LJ'],
    [SymbolID.LT, 'LT'],
    [SymbolID.Scatter, 'animation']
]);

/**魚倍率 */
const fishOddsMap = new Map<number, number>([
    [SymbolID.F1, 2],
    [SymbolID.F2, 5],
    [SymbolID.F3, 10],
    [SymbolID.F4, 15],
    [SymbolID.F5, 20],
    [SymbolID.F6, 25]
]);

const { ccclass, property } = _decorator;

@ccclass('Symbol')
export class Symbol extends BaseSymbol {
    /**圖示(一般狀態) */
    @property({ type: SpriteFrame })
    private normalImageList: SpriteFrame[] = [];

    /**圖示(模糊狀態) */
    @property({ type: SpriteFrame })
    private blurImageList: SpriteFrame[] = [];

    /**圖示Spine動畫 */
    @property({ type: sp.SkeletonData })
    private spineDataList: sp.SkeletonData[] = [];

    /**symbolID標籤 */
    private symIDLabel: Label;
    /**posID標籤 */
    private posIDLabel: Label;

    /**模糊圖 */
    private blur: Sprite;
    /**清晰圖 */
    private normal: Sprite;
    /**Wild動畫 */
    private wild: sp.Skeleton;
    /**動畫 */
    private spine: sp.Skeleton;

    /**分數*/
    private score: Node;
    /**wild特效動畫 */
    private ani_multiply: sp.Skeleton;
    /**倍數 */
    private multiply: Node;
    /**移動倍數 */
    private moveMultiply: Node;

    /**一般圖示 */
    private normalSymbolID: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 16, 17, 18, 19];
    /**特殊圖示 */
    private specialSymbolID: number[] = [0, 16];
    /**特殊圖示機率 */
    private specialRate: number = 0.1;

    /**瞇牌狀態要把scatter放到更高層級 */
    // private isMi: boolean = false;

    /**
     * 初始化
     */
    onLoad() {
        this.blur = this.node.getChildByName('Blur').getComponent(Sprite);
        this.normal = this.node.getChildByName('Normal').getComponent(Sprite);
        this.symIDLabel = this.node.getChildByName('symIDLabel').getComponent(Label);
        this.posIDLabel = this.node.getChildByName('posIDLabel').getComponent(Label);
        this.spine = this.node.getChildByName('Spine').getComponent(sp.Skeleton);
        this.wild = this.node.getChildByName('Wild').getComponent(sp.Skeleton);

        this.score = this.node.getChildByName('Score');
        this.ani_multiply = this.node.getChildByName('ani_multiply').getComponent(sp.Skeleton);
        this.multiply = this.node.getChildByName('Multiply');
        this.moveMultiply = this.node.getChildByName('MoveMultiply');

        // this.parentNode = this.node.parent;

        SlotReelMachine.startMi.on((column) => {
            if (this.isScatter() && this.isStop) {
                this.node.parent = this.scatterLayer.children[this.posID];
                this.spine.setAnimation(0, symbolAniNameMap.get(this.symbolID), true);
            }
        }, this);

        SlotReelMachine.stopMi.on(() => {
            if (this.isScatter()) {
                this.reset();
            }
        }, this);
        this.reset();
    }

    /**
     * 開始spin時空的圖示要隨機給symbolID
     */
    public setRandomSymbolID(): void {
        const random = Math.random();
        if (random < this.specialRate) {
            this.symbolID = this.specialSymbolID[Math.floor(Math.random() * this.specialSymbolID.length)];
        }
        else {
            this.symbolID = this.normalSymbolID[Math.floor(Math.random() * this.normalSymbolID.length)];
        }
        this.setSymbolID(this.symbolID);
    }

    /**
     * 設定圖示ID
     * @param newSymbolID 
     */
    public setSymbolID(newSymbolID: number): void {
        // this.symIDLabel.string = `${newSymbolID}`;
        // this.posIDLabel.string = `${this.posID}`;
        this.symbolID = newSymbolID;

        // if (newSymbolID != -1) {
        const imageID = symbolImageMap.get(newSymbolID);
        this.spine.skeletonData = this.spineDataList[imageID];
        this.normal.spriteFrame = this.normalImageList[imageID];
        this.blur.spriteFrame = this.blurImageList[imageID];

        if (this.isScatter() && this.isStop) {
            this.node.parent = this.scatterLayer.children[this.posID];
        }
        else {
            this.node.parent = this.parentNode;
        }
        this.setFishState();//設置魚的金額與狀態
    }

    /**
     * 開始轉動
     */
    public onSpin(): void {
        this.isStop = false;
        this.reset();
    }

    /**
     * symbol停下時
     */
    public onStop(): void {
        this.isStop = true;
    }

    /**
     * 模糊貼圖顯示
     */
    public blurShow(): void {
        Utils.fadeIn(this.blur.node, 0.2);
        this.blur.node.active = true;
        // Utils.fadeOut(this.normal.node, 0.05);
    }

    /**
     * 模糊貼圖隱藏
     */
    public blurHide(): void {
        // Utils.fadeIn(this.normal.node, 0.05);
        Utils.fadeOut(this.blur.node, 0.2, () => {
            this.blur.node.active = false;
        });
    }

    /**
     * 中獎演示
     */
    public symbolWin(): void {
        this.spine.node.active = true;
        this.normal.node.active = false;
        this.node.parent = this.winLayer;//移動到勝利層
        const animName = symbolAniNameMap.get(this.symbolID);
        this.spine.setAnimation(0, animName, true);
    }

    /**
     * 未中演示
     */
    public symbolLose(): void {
        this.reset();
    }

    /**
     * 回歸原始狀態
     */
    private reset(): void {
        this.node.parent = this.parentNode;//回歸原始父節點
        this.normal.node.active = true;
        this.spine.node.active = false;
        this.wild.node.active = false;
        this.blur.node.active = false;
        this.setFishState();//設置魚的金額與狀態
    }

    /**
     * 開始瞇牌
     */
    public setIsMi(isMi: boolean): void {
        // this.isMi = isMi;
    }

    /**
     * 是否為scatter
     * @returns 
     */
    private isScatter(): boolean {
        return this.symbolID === SymbolID.Scatter;
    }

    /**
     * 是否為wild
     * @returns 
     */
    private isWild(): boolean {
        return this.symbolID === SymbolID.Wild;
    }


    /**
     * 設定魚的狀態
     */
    private setFishState() {
        if (this.symbolID >= SymbolID.F1 && this.symbolID <= SymbolID.F6) {
            this.score.active = true;
            const isBS = DataManager.getInstance().isBS();
            this.score.getComponent(UIOpacity).opacity = isBS ? 80 : 255;
            const betCredit = DataManager.getInstance().bet.getBetTotal();
            const fishScore = fishOddsMap.get(this.symbolID) * betCredit;
            this.score.getChildByName('Label').getComponent(Label).string = Utils.numberFormat(fishScore);
        }
        else {
            this.score.active = false;
        }
    }
}