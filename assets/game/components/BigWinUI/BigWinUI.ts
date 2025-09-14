import { _decorator, Button, Color, Component, KeyCode, Label, Node, sp, Sprite, tween, Tween } from 'cc';

import { AudioKey } from '@base/script/audio/AudioKey';
import { AudioManager } from '@base/script/audio/AudioManager';
import { BaseConst } from '@base/script/constant/BaseConst';
import { BaseDataManager } from '@base/script/main/BaseDataManager';
import { BaseEvent } from '@base/script/main/BaseEvent';
import { BundleLoader } from '@base/script/main/BundleLoader';
import { BaseAnimationName, BigWinType } from '@base/script/types/BaseType';
import { XEvent, XEvent1 } from '@base/script/utils/XEvent';
import { XUtils } from '@base/script/utils/XUtils';

import { LangBundleDir } from '@game/script/constant/GameConst';

type BigWinConfig = {
    /**音效 */
    sound: AudioKey,
    /**begin動畫 */
    begin: string,
    /**loop動畫 */
    loop: string,
    /**end動畫 */
    end: string,
    /**標題索引 */
    titleIdx: number,
    /**是否有副標題 */
    hasSlogan: boolean,
    /**標題skin(需要再依照語系替換#符號) */
    titleSkin: string,
    /**跑分時間 */
    duration: number
}

type ScrollingData = {
    currentRateValue: number,
    endRateValue: number,
    finalRateValue: number,
    currentType: BigWinType,
    finalType: BigWinType,
}

enum CoinAnimation {
    end = 'end',
    loop = 'loop',
    start = 'start',
}

enum WinAnimation {
    big_end = 'big_end',
    big_loop = 'big_loop',
    big_start = 'big_start',
    mega_end = 'mega_end',
    mega_loop = 'mega_loop',
    mega_start = 'mega_start',
    super_end = 'super_end',
    super_loop = 'super_loop',
    super_start = 'super_start',
    ultra_end = 'ultra_end',
    ultra_loop = 'ultra_loop',
    ultra_start = 'ultra_start',
    ultumate_end = 'ultumate_end',
    ultumate_loop = 'ultumate_loop',
    ultumate_start = 'ultumate_start',
}

const { ccclass } = _decorator;

/**
 * BigWin演示
 */
@ccclass('BigWinUI')
export class BigWinUI extends Component {

    /** 顯示大獎 (BigWin終值, 顯示時會被除100) */
    public static show: XEvent1<number> = new XEvent1();
    /**演示完畢通知 */
    public static complete: XEvent = new XEvent();

    /**是否正在滾動 */
    private isPlaying: boolean = false;

    /**數字label */
    private label: Label;

    private winSpine: sp.Skeleton;
    private announce_coin_ani: sp.Skeleton;

    private titleNodeList: Node[] = [];

    /**是否提早結束 */
    private isSkip: boolean = false;

    /**五階獎項參數 */
    private bigWinConfig: BigWinConfig[] = [
        {
            sound: AudioKey.BigWin,
            begin: WinAnimation.big_start,
            loop: WinAnimation.big_loop,
            end: WinAnimation.big_end,
            titleIdx: 0,
            hasSlogan: false,
            titleSkin: 'bigwin',
            duration: 4.517

        },
        {
            sound: AudioKey.MegaWin,
            begin: WinAnimation.mega_start,
            loop: WinAnimation.mega_loop,
            end: WinAnimation.mega_end,
            titleIdx: 1,
            hasSlogan: false,
            titleSkin: 'megawin',
            duration: 4.36
        }, {
            sound: AudioKey.SuperWin,
            begin: WinAnimation.super_start,
            loop: WinAnimation.super_loop,
            end: WinAnimation.super_end,
            titleIdx: 2,
            hasSlogan: false,
            titleSkin: 'superwin',
            duration: 4.37
        }, {
            sound: AudioKey.UltraWin,
            begin: WinAnimation.ultra_start,
            loop: WinAnimation.ultra_loop,
            end: WinAnimation.ultra_end,
            titleIdx: 3,
            hasSlogan: false,
            titleSkin: 'ultrawin',
            duration: 4.361
        }, {
            sound: AudioKey.UltimateWin,
            begin: WinAnimation.ultumate_start,
            loop: WinAnimation.ultumate_loop,
            end: WinAnimation.ultumate_end,
            titleIdx: 4,
            hasSlogan: false,
            titleSkin: 'ultimatewin',
            duration: 5.956
        }
    ];

    /**跑分資料 */
    private data: ScrollingData = {
        currentType: BigWinType.non,
        finalType: BigWinType.non,
        currentRateValue: 0,
        endRateValue: 0,
        finalRateValue: 0
    };

    /**
     * 
     */
    onLoad() {

        BigWinUI.show.on(this.onShow, this);
        // BigWin.hide.on(this.onHide, this);

        this.winSpine = this.node.getChildByName('announce_win_ani').getComponent(sp.Skeleton);
        this.announce_coin_ani = this.node.getChildByName('announce_coin_ani').getComponent(sp.Skeleton);

        this.label = this.node.getChildByPath('announce_win_ani/Slot/num_totalwin').getComponent(Label);

        let lang: string = BaseDataManager.getInstance().urlParam.lang;
        BundleLoader.onLoaded(BaseConst.BUNDLE_LANGUAGE, `${lang}/${LangBundleDir.bigwin}`, (langRes: any) => {
            this.titleNodeList[0].getComponent(Sprite).spriteFrame = langRes['title_bigwin'];
            this.titleNodeList[1].getComponent(Sprite).spriteFrame = langRes['title_megawin'];
            this.titleNodeList[2].getComponent(Sprite).spriteFrame = langRes['title_superwin'];
            this.titleNodeList[3].getComponent(Sprite).spriteFrame = langRes['title_ultrawin'];
            this.titleNodeList[4].getComponent(Sprite).spriteFrame = langRes['title_ultimatewin'];
        });

        for (let i: number = 0; i < 5; ++i) {
            this.titleNodeList.push(this.node.getChildByPath(`announce_win_ani/title_${i}`));
        }

        this.node.active = false;
    }


    /**
     * 大獎演示
     */
    private onShow(value: number): void {

        //skip
        this.node.getChildByPath('SkipSensor').once(Button.EventType.CLICK, this.onSkip, this);
        BaseEvent.keyDown.once((code: KeyCode) => {
            if (code === KeyCode.SPACE) {
                this.onSkip();
            }
        }, this);

        //設定終值
        this.data.currentRateValue = 0;
        this.data.endRateValue = 0;
        this.data.finalRateValue = value * BaseDataManager.getInstance().bet.getCurRate();
        this.data.currentType = BigWinType.big;
        this.data.finalType = BaseDataManager.getInstance().getBigWinTypeByValue(value);

        this.node.active = true;
        this.isPlaying = true;
        this.isSkip = false;

        this.label.string = '';
        this.label.color = Color.WHITE;

        XUtils.playAnimation(this.node, BaseAnimationName.fadeInOpacity, 0.3);

        XUtils.ClearSpine(this.announce_coin_ani);
        this.announce_coin_ani.addAnimation(0, CoinAnimation.start, false);
        this.announce_coin_ani.addAnimation(0, CoinAnimation.loop, true);

        AudioManager.getInstance().play(AudioKey.Win);
        AudioManager.getInstance().play(AudioKey.WinRolling);

        AudioManager.getInstance().edit(AudioKey.BsMusic, 0.3);
        AudioManager.getInstance().edit(AudioKey.FsMusic, 0.3);

        this.tweenAtLevel();
    }

    private tweenAtLevel() {

        let config = this.bigWinConfig[this.data.currentType];

        //設定bigWin等級樣式
        this.setTypeStyle(this.data.currentType);


        //設定終點
        let levelBeginValue = BaseDataManager.getInstance().getData().BIG_WIN_MULTIPLE[this.data.currentType] * BaseDataManager.getInstance().bet.getCurTotal();
        this.data.currentRateValue = this.data.currentType == BigWinType.big ? 0 : levelBeginValue;
        let endType = this.data.currentType + 1;
        let duration;
        let endDelay: number = 0;

        //超過極限
        if (endType > BaseDataManager.getInstance().getData().BIG_WIN_MULTIPLE.length - 1) {
            this.data.endRateValue = this.data.finalRateValue;
            duration = config.duration;
        }
        //最後等級,直接到終值,時間等比例換算
        else if (this.data.currentType == this.data.finalType) {
            this.data.endRateValue = this.data.finalRateValue;
            let levelEndValue = BaseDataManager.getInstance().getData().BIG_WIN_MULTIPLE[endType] * BaseDataManager.getInstance().bet.getCurTotal();
            duration = config.duration * (this.data.finalRateValue - this.data.currentRateValue) / (levelEndValue - this.data.currentRateValue);
            endDelay = config.duration - duration;
        }
        else {
            let levelEndValue = BaseDataManager.getInstance().getData().BIG_WIN_MULTIPLE[endType] * BaseDataManager.getInstance().bet.getCurTotal();
            this.data.endRateValue = levelEndValue;
            duration = config.duration;
        }

        tween(this.data)
            .to(duration, { currentRateValue: this.data.endRateValue }, {
                onUpdate: (obj: ScrollingData) => {
                    this.label.string = XUtils.NumberToCentString(obj.currentRateValue);
                }
            })
            .call(() => {
                if (this.data.endRateValue == this.data.finalRateValue) {
                    AudioManager.getInstance().stop(AudioKey.WinRolling);
                }
            })
            .delay(endDelay)
            .call(() => {
                //繼續下一等級
                if (this.data.currentType !== this.data.finalType) {
                    //停止播放前一等級音效
                    AudioManager.getInstance().stop(this.bigWinConfig[this.data.currentType].sound);

                    this.data.currentType++;
                    this.tweenAtLevel();
                }
                //BigWin結束
                else if (this.data.endRateValue == this.data.finalRateValue) {
                    this.onBigWinEnd();
                }
            })
            .start();
    }


    /**
     * 依照等級設定樣式
     * @param type 
     */
    private setTypeStyle(type: BigWinType) {

        let config = this.bigWinConfig[type];
        //audio
        AudioManager.getInstance().play(config.sound);

        //spine
        XUtils.ClearSpine(this.winSpine);
        this.winSpine.addAnimation(0, config.begin, false);
        this.winSpine.addAnimation(0, config.loop, true);

        //延遲一幀再顯示標題,否則會看到標題很大又開始縮小放大
        this.scheduleOnce(() => {
            this.titleNodeList.forEach((node: Node, idx: number) => {
                node.active = idx == type;
            }, this);
        }, 0);
    }


    /**
     * 跳過大獎演示
     * @returns 
     */
    private onSkip() {

        this.node.getChildByPath('SkipSensor').off(Button.EventType.CLICK, this.onSkip, this);
        BaseEvent.keyDown.off(this);

        //正在播放才能skip
        if (!this.isPlaying) {
            return;
        }

        if (this.data.currentType !== this.data.finalType) {
            //停止播放前一等級音效
            AudioManager.getInstance().stop(this.bigWinConfig[this.data.currentType].sound);
            //補最後一次等級設定
            this.data.currentType = this.data.finalType;
            this.setTypeStyle(this.data.currentType);
        }

        this.isSkip = true;

        this.onBigWinEnd();
    }

    /**
     * 到達終值
     */
    private onBigWinEnd(): void {

        let config = this.bigWinConfig[this.data.finalType];

        this.isPlaying = false;

        Tween.stopAllByTarget(this.data);

        this.label.string = XUtils.NumberToCentString(this.data.finalRateValue);

        AudioManager.getInstance().stop(AudioKey.WinRolling);
        AudioManager.getInstance().stop(AudioKey.Win);
        AudioManager.getInstance().stop(config.sound);

        //除了ultimate以外都要播放WinEnd
        if (this.isSkip || this.data.finalType !== BigWinType.ultimate) {
            AudioManager.getInstance().play(AudioKey.WinEnd);
        }

        //2秒後播放end
        this.scheduleOnce(() => {
            XUtils.ClearSpine(this.winSpine);
            this.winSpine.setAnimation(0, config.end, false);

            XUtils.ClearSpine(this.announce_coin_ani);
            this.announce_coin_ani.setAnimation(0, CoinAnimation.end, false);

            XUtils.playAnimation(this.node, BaseAnimationName.fadeOutOpacity, 1, () => {
                this.onBigWinComplete();
            });

        }, BaseConst.BIG_WIN_END_DELAY);
    }

    /**
     * 演示完畢
     */
    private onBigWinComplete() {

        AudioManager.getInstance().stop(AudioKey.WinEnd);

        let config = this.bigWinConfig[this.data.finalType];
        AudioManager.getInstance().stop(config.sound);


        AudioManager.getInstance().edit(AudioKey.BsMusic, 1);
        AudioManager.getInstance().edit(AudioKey.FsMusic, 1);

        this.node.active = false;

        BigWinUI.complete.emit();
    }
}

