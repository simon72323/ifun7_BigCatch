import { _decorator, Label, sp, Sprite, SpriteFrame, Button, randomRangeInt, UITransform } from 'cc';

import { PayTableUI } from '@game/components/PayTableUI/PayTableUI';
import { SymbolData } from '@game/components/slotMachine/SymbolData';
import { GameConst, SymbolID } from '@game/script/data/GameConst';


import { BaseSymbol } from '@common/components/slotMachine/BaseSymbol';
import { SlotMachine } from '@common/components/slotMachine/SlotMachine';
import { SymbolState } from '@common/components/slotMachine/SlotType';


import { DataManager } from '@common/script/data/DataManager';
import { Utils } from '@common/script/utils/Utils';

enum SymbolLayer {
    Reel = 0,
    Scatter,
    Win
}

enum ScatterAni {
    got = 'got',
    loop = 'loop',
    start = 'start',
    mipie = 'mipie',
}
enum SymbolAni {
    drop = 'drop',
    explo = 'explo',
    win = 'win',
    /**open WILD才有 */
    open = 'open',
    /**badge 一般圖示才有 */
    explo_badge = 'explo_badge',
    win_badge = 'win_badge',
    drop_badge = 'drop_badge',
}

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
    private idLabel: Label;
    /**位置標籤 */
    private posLabel: Label;

    /**模糊圖 */
    private blur: Sprite;
    /**清晰圖 */
    private normal: Sprite;
    /**動畫 */
    private spine: sp.Skeleton;
    /**Wild動畫 */
    private wild: sp.Skeleton;

    /**瞇牌狀態要把scatter放到更高層級 */
    private isMi: boolean = false;
    /**狀態 */
    private state: SymbolState = SymbolState.Normal;

    /**權重 */
    public weight: number = 0;

    /**
     * 初始化
     */
    onLoad() {
        this.blur = this.node.getChildByName('Blur').getComponent(Sprite);
        this.normal = this.node.getChildByName('Normal').getComponent(Sprite);
        this.idLabel = this.node.getChildByName('idLabel').getComponent(Label);
        this.posLabel = this.node.getChildByName('posLabel').getComponent(Label);

        this.spine = this.node.getChildByName('Spine').getComponent(sp.Skeleton);
        this.wild = this.node.getChildByName('Wild').getComponent(sp.Skeleton);
        // this.spine.node.active = false;

        this.node.getChildByName('Sens').on(Button.EventType.CLICK, () => {
            if (DataManager.getInstance().isIdle() === false || DataManager.getInstance().isMenuOn == true || DataManager.getInstance().isAutoMode) {
                return;
            }

            if (this.isInView === false) {
                return;
            }

            // let worldPos = this.node.parent.getComponent(UITransform).convertToWorldSpaceAR(this.node.getPosition());
            // let payData = DataManager.getInstance().slotData.getPayBySymbolID(this.symbolID);
            // PayTableUI.show.emit(this.grid, this.symbolID, this.normal.spriteFrame, worldPos, payData);
        }, this);


        SlotMachine.startMi.on((column) => {
            //是咪當前軸
            if (this.grid.col === column) {
                this.isMi = true;
                //為了讓scatter能完整演示hit動畫,否則瞇牌時會改用normal圖片,就看不到hit動畫
                if (this.isScatter() === false) {
                    this.setState(this.state);
                }
            }
            else {
                this.isMi = false;
                if (this.isScatter() && this.isInView) {
                    this.spine.setAnimation(0, ScatterAni.mipie, true);
                }
            }
        }, this);

        SlotMachine.stopMi.on(() => {
            this.isMi = false;
            if (this.isScatter() === true) {
                this.setState(this.state);
            }
        }, this);
    }

    /**
     * 開始spin時空的圖示要隨機給symbolID
     */
    public setRandomSymbol(): void {
        let randomID = Math.floor(Math.random() * GameConst.symbolCount);
        //11~16要加4才會是正確的symbolID
        this.symbolID = randomID > 10 ? randomID + 4 : randomID;
    }

    /**
     * 設定圖示ID
     * @param newSymbolID 
     */
    public setSymbolID(newSymbolID: number): void {
        console.log('setSymbolID', newSymbolID);
        this.idLabel.string = `${newSymbolID}`;
        this.posLabel.string = `${this.posIndex}`;

        //圖示沒變動不重覆設定
        this.symbolID = newSymbolID;
        this.weight = newSymbolID === SymbolID.Scatter ? 99 : 0;

        if (newSymbolID != -1) {
            //此盤面15~20圖示要減4,才會跟貼圖ID對應
            const imageID = newSymbolID > 10 ? newSymbolID - 4 : newSymbolID;
            this.spine.skeletonData = this.spineDataList[imageID];
            this.normal.spriteFrame = this.normalImageList[imageID];
            this.blur.spriteFrame = this.blurImageList[imageID];

            if (this.isScatter() === true && this.isInView) {
                this.addChildToLayer(SymbolLayer.Scatter);
            }
            else {
                this.addChildToLayer(SymbolLayer.Reel);
            }
            this.setState(this.state);
        }
        else {
            this.spine.node.active = false;
            this.normal.node.active = false;
            this.blur.node.active = false;
            this.wild.node.active = false;
        }
    }

    /**
     * 掉落補充
     * @param data 
     */
    // public setSymbolData(data: SymbolData): void {
    //     this.setSymbolID(data.symbolID, -1);
    // }

    /**
     * 變盤
     * @param data 
     */
    // public changeSymbolData(data: SymbolData): void {
    //     if (!data) {
    //         return;
    //     }

    //     //變盤
    //     if (data.isChange) {
    //         //只有WILD會進來
    //         if (data.symbolID === SymbolID.Wild) {
    //             this.wild.node.active = true;
    //             Utils.ClearSpine(this.wild);
    //             this.wild.setCompleteListener(() => {
    //                 this.setSymbolID(data.symbolID, -1);
    //             });
    //             this.wild.setAnimation(0, SymbolAni.open, false);
    //         }
    //     }
    //     //回復BS盤面
    //     else {
    //         this.setSymbolID(data.symbolID, -1);
    //     }
    // }

    /**
     * 開始轉動
     */
    public onSpin(): void {
        this.isInView = false;
        this.reset();
    }

    /**
     * 全部軸停下時
     */
    public onStop(): void {
        //要先設定完isMi狀態才能刷新layer
        this.isMi = false;
    }

    /**
     * 設定圖示狀態
     * @param state 
     */
    public setState(state: SymbolState): void {
        this.state = state;
        this.spine.node.active = false;
        this.wild.node.active = false;

        if (this.symbolID !== -1) {
            // if (this.isWild()) {
            //     this.normal.node.active = true;
            //     this.blur.node.active = false;
            // }
            // else {
            this.normal.node.active = (state == SymbolState.Normal || this.isMi);
            this.blur.node.active = (state == SymbolState.Blur && !this.isMi);
            // }
        }
        else {
            this.normal.node.active = false;
            this.blur.node.active = false;
        }
    }

    /**
     * 中獎演示
     */
    public showSymbolWin(): void {
        this.spine.node.active = true;
        this.normal.node.active = false;
        this.addChildToLayer(SymbolLayer.Win);
        const animName = this.isScatter() ? ScatterAni.loop : SymbolAni.win;
        this.spine.setAnimation(0, animName, true);
    }

    /**
     * 取消中獎效果
     */
    public hideSymbolWin(): void {
        this.reset();
    }

    /**
     * 回歸原始狀態
     */
    private reset(): void {
        this.normal.node.active = true;
        this.spine.node.active = false;
        Utils.ClearSpine(this.spine);
        this.wild.node.active = false;
        Utils.ClearSpine(this.wild);
        this.addChildToLayer(SymbolLayer.Reel);//移至轉動層
    }

    /**
     * 圖示落地
     * @returns 
     */
    public hit(isInView: boolean): void {
        if (isInView) {
            if (this.isScatter() === true) {
                // AudioManager.getInstance().playOneShot(GameAudioKey.scatter);

                //畫面內的scatter只播一次hit
                // if (this.isInView === false) {
                //     this.playSymbolAni(ScatterAni.got, false);
                // }
            }
            else {
                // this.playSymbolAni(SymbolAni.drop, false);
            }
        }
        this.isInView = isInView;
    }

    // /**
    //  * 播放圖示動畫, 完成後放回原層級
    //  * @param name 
    //  * @param onComplete 
    //  */
    // private playSymbolAni(name: string, loop: boolean, onComplete?: () => void): void {
    //     this.spine.node.active = true;
    //     this.normal.node.active = false;
    //     this.addChildToLayer(SymbolLayer.Win);
    //     Utils.ClearSpine(this.spine);

    //     //非loop動畫會監聽完成並回復normal
    //     if (!loop) {
    //         this.spine.setCompleteListener(() => {
    //             this.spine.setCompleteListener(null);
    //             this.spine.timeScale = 1;
    //             this.spine.node.active = false;
    //             this.addChildToLayer(SymbolLayer.Reel);

    //             //explode時symbolID為-1
    //             if (this.symbolID !== -1) {
    //                 this.normal.node.active = true;
    //             }
    //             onComplete?.();
    //         });
    //     }

    //     this.spine.setAnimation(0, name, loop);
    // }

    /**
     * 開始瞇牌
     */
    public setIsMi(isMi: boolean): void {
        // this.isMi = isMi;
    }

    private isScatter(): boolean {
        return this.symbolID === SymbolID.Scatter;
    }

    // private isWild(): boolean {
    //     return this.symbolID === SymbolID.Wild;
    // }

    /**
     * 調整圖示層級
     * @param layerIdx 
     */
    private addChildToLayer(layerIdx: SymbolLayer): void {
        let layer = this.layerList[layerIdx];
        layer.children[this.grid.col].addChild(this.node);
        let sortChildren = layer.children.concat();
        sortChildren.sort((a, b) => {
            if (a.position.y > b.position.y) {
                return -1; // y值大的排在前面
            }
            else if (a.position.y < b.position.y) {
                return 1;  // y值小的排在后面
            }
            return 0; // y值相等时保持原顺序
        });
        sortChildren.forEach((a, i) => a.setSiblingIndex(i));
    }
}