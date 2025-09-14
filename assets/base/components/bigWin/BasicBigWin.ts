import { _decorator, Animation, Button, Color, Component, Label, sp, Sprite, SpriteFrame, tween, Tween } from 'cc';

import { AudioKey } from '@base/script/audio/AudioKey';
import { AudioManager } from '@base/script/audio/AudioManager';
import { BaseConst, BaseFont } from '@base/script/constant/BaseConst';
import { BaseDataManager } from '@base/script/main/BaseDataManager';
import { BundleLoader } from '@base/script/main/BundleLoader';
import { BaseAnimationName, BaseLangBundleDir, BigWinType } from '@base/script/types/BaseType';
import { FontManager } from '@base/script/utils/FontManager';
import { XEvent, XEvent1 } from '@base/script/utils/XEvent';
import { XUtils } from '@base/script/utils/XUtils';

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
}

enum NullAnimation {
    begin = 'begin',
    loop = 'loop',
    result = 'result',
}

type ScrollingData = {
    currentRateValue: number,
    endRateValue: number,
    finalRateValue: number,
    currentType: BigWinType,
    finalType: BigWinType,
}

enum WinAnimation {
    bigwin_begin = 'bigwin_begin',
    bigwin_loop = 'bigwin_loop',

    megawin_begin = 'megawin_begin',
    megawin_loop = 'megawin_loop',

    superwin_begin = 'superwin_begin',
    superwin_loop = 'superwin_loop',

    end = 'end',
}

const { ccclass } = _decorator;

/**
 * 共用BigWin演示
 */
@ccclass('BasicBigWin')
export class BasicBigWin extends Component {

    /** 顯示大獎 (BigWin終值, 顯示時會被除100) */
    public static show: XEvent1<number> = new XEvent1();
    /**演示完畢通知 */
    public static complete: XEvent = new XEvent();

    /**是否正在滾動 */
    private isPlaying: boolean = false;

    /**數字label */
    private label: Label;

    /**底部動畫 */
    private winSpine: sp.Skeleton;

    /**數字容器動畫 */
    private nullSpine: sp.Skeleton;

    /**語系標題動畫(BigWin,MegaWin...) */
    private title: Sprite;
    /**語系副標題動畫(大富大貴...) */
    private slogan: Sprite;

    private titleList: SpriteFrame[] = [];
    private sloganList: SpriteFrame[] = [];

    /**五階獎項參數 */
    private bigWinConfig: BigWinConfig[] = [
        {
            sound: AudioKey.BigWin,
            begin: WinAnimation.bigwin_begin,
            loop: WinAnimation.bigwin_loop,
            end: WinAnimation.end,
            titleIdx: 0,
            hasSlogan: false,

            titleSkin: 'bigwin'
        },
        {
            sound: AudioKey.MegaWin,
            begin: WinAnimation.megawin_begin,
            loop: WinAnimation.megawin_loop,
            end: WinAnimation.end,
            titleIdx: 1,
            hasSlogan: true,
            titleSkin: 'megawin'
        }, {
            sound: AudioKey.SuperWin,
            begin: WinAnimation.superwin_begin,
            loop: WinAnimation.superwin_loop,
            end: WinAnimation.end,
            titleIdx: 2,
            hasSlogan: true,
            titleSkin: 'superwin'
        }, {
            sound: AudioKey.SuperWin,
            begin: '',
            loop: WinAnimation.superwin_loop,
            end: WinAnimation.end,
            titleIdx: 3,
            hasSlogan: true,
            titleSkin: 'ultrawin'
        }, {
            sound: AudioKey.SuperWin,
            begin: '',
            loop: WinAnimation.superwin_loop,
            end: WinAnimation.end,
            titleIdx: 4,
            hasSlogan: true,
            titleSkin: 'ultimatewin'
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

        BasicBigWin.show.on(this.onShow, this);
        // BigWin.hide.on(this.onHide, this);

        this.node.getChildByPath('SkipSensor').on(Button.EventType.CLICK, this.onSkip, this);

        this.winSpine = this.node.getChildByName('WinSpine').getComponent(sp.Skeleton);

        this.nullSpine = this.node.getChildByName('NullSpine').getComponent(sp.Skeleton);

        this.label = this.nullSpine.node.getChildByPath('ValueSlot/Label').getComponent(Label);

        this.slogan = this.node.getChildByPath('NullSpine/SloganSlot/Sprite').getComponent(Sprite);
        this.title = this.node.getChildByPath('NullSpine/TitleSlot/Sprite').getComponent(Sprite);

        let lang: string = BaseDataManager.getInstance().urlParam.lang;
        BundleLoader.onLoaded(BaseConst.BUNDLE_BASE_CURRENCY, `${lang}/${BaseLangBundleDir.bigWin}`, (langRes: any) => {

            let idx = 1;
            while (langRes[`winTitle${idx}`]) {
                this.titleList.push(langRes[`winTitle${idx}`]);
                idx++;
            }

            idx = 1;
            while (langRes[`winSlogan${idx}`]) {
                this.sloganList.push(langRes[`winSlogan${idx}`]);
                idx++;
            }
        });

        this.node.active = false;
    }


    /**
     * 大獎演示
     */
    private onShow(value: number): void {

        //設定終值
        this.data.currentRateValue = 0;
        this.data.endRateValue = 0;
        this.data.finalRateValue = value * BaseDataManager.getInstance().bet.getCurRate();
        this.data.currentType = BigWinType.big;
        this.data.finalType = BaseDataManager.getInstance().getBigWinTypeByValue(value);

        this.node.active = true;
        this.isPlaying = true;

        this.label.string = '';
        this.label.color = Color.WHITE;

        this.node.getComponent(Animation).play(BaseAnimationName.fadeInOpacity);
        this.node.getComponent(Animation).getState(BaseAnimationName.fadeInOpacity).speed = 3;

        AudioManager.getInstance().play(AudioKey.Win);

        AudioManager.getInstance().edit(AudioKey.BsMusic, 0.3);
        AudioManager.getInstance().edit(AudioKey.FsMusic, 0.3);

        this.tweenAtLevel();
    }

    private tweenAtLevel() {

        //設定bigWin等級樣式
        this.setTypeStyle(this.data.currentType);


        //設定終點
        let levelBeginValue = BaseDataManager.getInstance().getData().BIG_WIN_MULTIPLE[this.data.currentType] * BaseDataManager.getInstance().bet.getCurTotal();
        this.data.currentRateValue = this.data.currentType == BigWinType.big ? 0 : levelBeginValue;
        let endType = this.data.currentType + 1;
        let duration;

        //超過極限
        if (endType > BaseDataManager.getInstance().getData().BIG_WIN_MULTIPLE.length - 1) {
            this.data.endRateValue = this.data.finalRateValue;
            duration = BaseConst.BIG_WIN_LEVEL_TIME;
        }
        //最後等級,直接到終值,時間等比例換算
        else if (this.data.currentType == this.data.finalType) {
            this.data.endRateValue = this.data.finalRateValue;
            let levelEndValue = BaseDataManager.getInstance().getData().BIG_WIN_MULTIPLE[endType] * BaseDataManager.getInstance().bet.getCurTotal();
            duration = BaseConst.BIG_WIN_LEVEL_TIME * (this.data.finalRateValue - this.data.currentRateValue) / (levelEndValue - this.data.currentRateValue);
        }
        else {
            let levelEndValue = BaseDataManager.getInstance().getData().BIG_WIN_MULTIPLE[endType] * BaseDataManager.getInstance().bet.getCurTotal();
            this.data.endRateValue = levelEndValue;
            duration = BaseConst.BIG_WIN_LEVEL_TIME;
        }

        tween(this.data)
            .to(duration, { currentRateValue: this.data.endRateValue }, {
                onUpdate: (obj: ScrollingData) => {
                    this.label.string = FontManager.getInstance().convertToAsciiString(BaseFont.number, XUtils.NumberToCentString(obj.currentRateValue));
                }
            })
            .call(() => {
                //繼續下一等級
                if (this.data.currentType !== this.data.finalType) {
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

        this.nullSpine.clearTracks();
        this.nullSpine.setToSetupPose();

        //spine
        this.winSpine.clearTracks();
        this.winSpine.setToSetupPose();

        //title
        this.title.spriteFrame = this.titleList[config.titleIdx];

        //slogan
        this.slogan.spriteFrame = XUtils.getRandomFromList(this.sloganList);
        this.slogan.node.active = config.hasSlogan;

        //SUPER以下演示彈跳, ULTRA,ULTIMATE只換Skin
        if (type <= BigWinType.super) {
            this.nullSpine.addAnimation(0, NullAnimation.begin, false);
            this.nullSpine.addAnimation(1, NullAnimation.loop, false);

            this.winSpine.addAnimation(0, config.begin, false);
            this.winSpine.addAnimation(0, config.loop, true);

        }
        else {
            this.nullSpine.setAnimation(1, NullAnimation.loop, false);

            this.winSpine.setAnimation(0, config.loop, true);
        }
    }


    /**
     * 跳過大獎演示
     * @returns 
     */
    private onSkip() {

        //正在播放才能skip
        if (!this.isPlaying) {
            return;
        }

        if (this.data.currentType !== this.data.finalType) {
            //補最後一次等級設定
            this.data.currentType = this.data.finalType;
            this.setTypeStyle(this.data.currentType);
        }

        this.onBigWinEnd();
    }

    /**
     * 到達終值
     */
    private onBigWinEnd(): void {

        this.isPlaying = false;

        Tween.stopAllByTarget(this.data);

        //title
        this.nullSpine.clearTracks();
        this.nullSpine.setToSetupPose();
        this.nullSpine.addAnimation(1, NullAnimation.result, false);

        this.label.string = FontManager.getInstance().convertToAsciiString(BaseFont.number, XUtils.NumberToCentString(this.data.finalRateValue));

        AudioManager.getInstance().stop(AudioKey.Win);
        AudioManager.getInstance().play(AudioKey.WinEnd);

        //2秒後播放end
        this.scheduleOnce(() => {
            this.winSpine.addAnimation(1, WinAnimation.end, false);

            this.node.getComponent(Animation).play(BaseAnimationName.fadeOutOpacity);
            this.node.getComponent(Animation).getState(BaseAnimationName.fadeOutOpacity).speed = 3;

            this.scheduleOnce(() => {
                this.onBigWinComplete();

            }, BaseConst.BIG_WIN_FADE_OUT_DURATION);

        }, BaseConst.BIG_WIN_END_DELAY);
    }

    /**
     * 演示完畢
     */
    private onBigWinComplete() {

        AudioManager.getInstance().stop(AudioKey.WinEnd);

        AudioManager.getInstance().edit(AudioKey.BsMusic, 1);
        AudioManager.getInstance().edit(AudioKey.FsMusic, 1);

        this.winSpine.clearTracks();
        this.winSpine.setToSetupPose();

        this.node.active = false;

        BasicBigWin.complete.emit();
    }
}

