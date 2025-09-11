import { _decorator, Label, sp, Sprite, SpriteFrame } from 'cc';

import { Button, randomRangeInt, UITransform } from 'cc';
import { AudioManager } from 'db://assets/base/script/audio/AudioManager';
import { BaseDataManager } from 'db://assets/base/script/main/BaseDataManager';
import { XUtils } from 'db://assets/base/script/utils/XUtils';
import { GameAudioKey, GameConst, SymbolID } from '../../script/constant/GameConst';
import { GameData } from '../../script/main/GameData';
import { PayTableUI } from '../PayTableUI/PayTableUI';
import { BaseSymbol2 } from './base/slotMachine2/BaseSymbol2';
import { SlotMachine2 } from './base/slotMachine2/SlotMachine2';
import { SymbolState2 } from './base/slotMachine2/SlotType2';
import { SymbolData2 } from './SymbolData2';
const { ccclass, property } = _decorator;

@ccclass('Symbol2')
export class Symbol2 extends BaseSymbol2 {

    /**圖示(一般狀態) */
    @property({ type: SpriteFrame })
    private normalImageList: SpriteFrame[] = [];

    /**徽章圖示(一般狀態) */
    @property({ type: SpriteFrame })
    private normalBadgeImageList: SpriteFrame[] = [];

    /**圖示(模糊狀態) */
    @property({ type: SpriteFrame })
    private blurImageList: SpriteFrame[] = [];
    /**徽章圖示(模糊狀態) */
    @property({ type: SpriteFrame })
    private blurBadgeImageList: SpriteFrame[] = [];



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
    private state: SymbolState2 = SymbolState2.Normal;

    /**權重 */
    public weight: number = 0;

    private isBadge: boolean = false;

    /**symbolID對應圖片陣列 */
    private symbolMap: Map<number, number> = new Map();

    /**
     * 初始化
     */
    onLoad() {

        this.symbolMap = new Map();
        this.symbolMap.set(SymbolID.Wild, 0);
        this.symbolMap.set(SymbolID.Scatter, 1);
        this.symbolMap.set(SymbolID.H1, 2);
        this.symbolMap.set(SymbolID.H2, 3);
        this.symbolMap.set(SymbolID.H3, 4);
        this.symbolMap.set(SymbolID.H4, 5);
        this.symbolMap.set(SymbolID.H5, 6);
        this.symbolMap.set(SymbolID.L1, 7);
        this.symbolMap.set(SymbolID.L2, 8);
        this.symbolMap.set(SymbolID.L3, 9);
        this.symbolMap.set(SymbolID.L4, 10);

        this.blur = this.node.getChildByName('Blur').getComponent(Sprite);
        this.normal = this.node.getChildByName('Normal').getComponent(Sprite);
        this.idLabel = this.node.getChildByName('idLabel').getComponent(Label);
        this.posLabel = this.node.getChildByName('posLabel').getComponent(Label);

        this.spine = this.node.getChildByName("Spine").getComponent(sp.Skeleton);
        this.wild = this.node.getChildByName("Wild").getComponent(sp.Skeleton);
        // this.spine.node.active = false;

        this.node.getChildByName("Sens").on(Button.EventType.CLICK, () => {
            if (BaseDataManager.getInstance().isIdle() === false || BaseDataManager.getInstance().isMenuOn == true || BaseDataManager.getInstance().auto.isAutoPlay() == true) {
                return;
            }

            if (this.isInView === false) {
                return;
            }

            let worldPos = this.node.parent.getComponent(UITransform).convertToWorldSpaceAR(this.node.getPosition());
            let payData = BaseDataManager.getInstance().getData<GameData>().getPayBySymbolID(this.symbolID);
            PayTableUI.show.emit(this.grid, this.symbolID, this.normal.spriteFrame, worldPos, payData);
        }, this);


        SlotMachine2.startMi.on((id, column) => {
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
                if (this.isScatter() === true && this.isInView) {
                    this.playSymbolAni(ScatterAni.mipie, true);
                }
            }
        }, this);

        SlotMachine2.stopMi.on((id) => {
            this.isMi = false;
            if (this.isScatter() === true) {
                this.setState(this.state);
            }
        }, this);
    }

    /**
     * 開始spin時空的圖示要隨機給symbolID
     */
    public randomSymbol(): void {
        this.symbolID = randomRangeInt(0, GameConst.symbolWeight.length);
    }

    /**
     * 設定圖示ID
     * @param newSymbolID 
     * @param stripIdx 
     * @returns 
     */
    public setSymbolID(newSymbolID: number, stripIdx: number): void {
        this.idLabel.string = `${stripIdx}`;

        //圖示沒變動不重覆設定
        this.symbolID = newSymbolID;
        this.weight = GameConst.symbolWeight[newSymbolID];

        //消去掉落不會再給新的badge資料, 所以不能清除
        // this.isBadge = false;

        if (newSymbolID != -1) {
            //scatter和wild強制設false,防呆
            if (this.isScatter() === true || this.isWild() === true) {
                this.isBadge = false;
            }

            //查輪帶資料表
            if (stripIdx !== -1) {
                this.isBadge = !!BaseDataManager.getInstance().getData<GameData>().stripBadgeDataList[this.grid.col][stripIdx];
            }

            let picID: number = this.symbolMap.get(newSymbolID);
            this.spine.skeletonData = this.spineDataList[picID];
            this.normal.spriteFrame = this.isBadge ? this.normalBadgeImageList[picID] : this.normalImageList[picID];
            this.blur.spriteFrame = this.isBadge ? this.blurBadgeImageList[picID] : this.blurImageList[picID];

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
    public setSymbolData(data: SymbolData2): void {
        this.isBadge = data.isBadge;
        this.setSymbolID(data.symbolID, -1);
    }

    /**
     * 變盤
     * @param data 
     */
    public changeSymbolData(data: SymbolData2): void {
        if (!data) {
            return;
        }

        this.isBadge = data.isBadge;

        //變盤
        if (data.isChange) {
            //只有WILD會進來
            if (data.symbolID === SymbolID.Wild) {
                this.wild.node.active = true;
                XUtils.ClearSpine(this.wild);
                this.wild.setCompleteListener(() => {
                    this.setSymbolID(data.symbolID, -1);
                })
                this.wild.setAnimation(0, SymbolAni.open, false);
            }
        }
        //回復BS盤面
        else {
            this.setSymbolID(data.symbolID, -1);
        }
    }

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
    public setState(state: SymbolState2): void {
        //TODO:先不處理其他狀態
        this.normal.node.active = true;
        this.spine.node.active = false;
        this.wild.node.active = false;
        this.blur.node.active = false;
        return;

        this.state = state;

        if (this.symbolID !== -1) {
            //scatter沒有模糊圖
            if (this.isWild() === true) {
                this.normal.node.active = true;
                this.blur.node.active = false;
            }
            else {
                this.normal.node.active = (state == SymbolState2.Normal || this.isMi);
                this.blur.node.active = (state == SymbolState2.Blur && !this.isMi);
            }
        }
        else {
            this.normal.node.active = false;
            this.blur.node.active = false;
        }
    }

    /**
     * 中獎演示
     */
    public showWin(): void {
        if (this.isScatter() === true) {
            this.playSymbolAni(ScatterAni.start, false, () => {
                this.playSymbolAni(ScatterAni.loop, true);
            });
        }
        else {
            this.playSymbolAni(SymbolAni.win, false);
        }
    }

    /**
     * 取消中獎效果
     */
    public hideWin(): void {
        this.reset();
    }

    private reset(): void {
        this.spine.node.active = false;
        this.normal.node.active = true;

        XUtils.ClearSpine(this.spine);
        this.spine.setCompleteListener(null);
        this.wild.node.active = false;
        XUtils.ClearSpine(this.wild);
        this.wild.setCompleteListener(null);
        this.addChildToLayer(SymbolLayer.Reel);
    }

    /**
     * 爆炸演示
     */
    public explode() {
        this.spine.timeScale = BaseDataManager.getInstance().getData<GameData>().getTurboSetting().explodeTimeScale;
        this.playSymbolAni(SymbolAni.explo, false);
        this.symbolID = -1;

    }

    /**
     * 圖示落地
     * @returns 
     */
    public hit(isInView: boolean): void {
        if (isInView) {
            if (this.isScatter() === true) {
                AudioManager.getInstance().playOneShot(GameAudioKey.scatter);

                //畫面內的scatter只播一次hit
                if (this.isInView === false) {
                    this.playSymbolAni(ScatterAni.got, false);
                }
            }
            else {
                this.playSymbolAni(SymbolAni.drop, false);
            }
        }
        this.isInView = isInView;
    }

    /**
     * 播放圖示動畫, 完成後放回原層級
     * @param name 
     * @param onComplete 
     */
    private playSymbolAni(name: string, loop: boolean, onComplete?: () => void): void {
        this.spine.node.active = true;
        this.normal.node.active = false;
        this.addChildToLayer(SymbolLayer.Win);
        this.spine.setCompleteListener(null);

        XUtils.ClearSpine(this.spine);

        //非loop動畫會監聽完成並回復normal
        if (!loop) {
            this.spine.setCompleteListener(() => {
                this.spine.setCompleteListener(null);
                this.spine.timeScale = 1;
                this.spine.node.active = false;
                this.addChildToLayer(SymbolLayer.Reel);

                //explode時symbolID為-1
                if (this.symbolID !== -1) {
                    this.normal.node.active = true;
                }
                onComplete?.();
            });
        }

        this.spine.setAnimation(0, this.isBadge ? name + "_badge" : name, loop);
    }

    /**
     * 開始瞇牌
     */
    public setIsMi(isMi: boolean): void {
        // this.isMi = isMi;
    }

    private isScatter(): boolean {
        return this.symbolID === SymbolID.Scatter;
    }
    private isWild(): boolean {
        return this.symbolID === SymbolID.Wild;
    }

    /**
     * 調整圖示層級
     * @param layerIdx 
     */
    private addChildToLayer(layerIdx: SymbolLayer): void {
        let layer = this.layerList[layerIdx];
        layer.addChild(this.node);
        let sortChildren = layer.children.concat();
        sortChildren.sort((a, b) => {
            if (a.getComponent(Symbol2).weight > b.getComponent(Symbol2).weight) {
                return 1;
            }
            else if (a.getComponent(Symbol2).weight < b.getComponent(Symbol2).weight) {
                return -1;
            }
            else {
                return a.getComponent(Symbol2).posIndex - b.getComponent(Symbol2).posIndex;
            }
        });
        sortChildren.forEach((a, i) => a.setSiblingIndex(i));
    }
}

enum SymbolLayer {
    Reel = 0,
    Scatter,
    Win
}

enum ScatterAni {
    got = "got",
    loop = "loop",
    start = "start",
    mipie = "mipie",
}
enum SymbolAni {
    drop = "drop",
    explo = "explo",
    win = "win",
    /**open WILD才有 */
    open = "open",
    /**badge 一般圖示才有 */
    explo_badge = "explo_badge",
    win_badge = "win_badge",
    drop_badge = "drop_badge",
}