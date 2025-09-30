import { _decorator, Animation, Component, Label, Node, sp, Sprite, SpriteFrame, Tween, Vec3 } from 'cc';

import { AudioKey } from '@base/script/audio/AudioKey';
import { AudioManager } from '@common/script/manager/AudioManager';
import { BaseConst } from '@common/script/data/BaseConst';
import { DataManager } from '@common/script/data/DataManager';;
import { BaseEvent } from '@common/script/event/BaseEvent';
import { BundleLoader } from '@base/script/main/BundleLoader';
import { BaseLang, ModuleID } from '@base/script/types/BaseType';
import { XEvent, XEvent1, XEvent2 } from '@common/script/event/XEvent';
import { XUtils } from '@base/script/utils/XUtils';

import { BannerAD } from '@game/components/BannerUI/BannerAD';
import { GameAnimationName, GameAudioKey, LangBundleDir } from '@game/script/constant/GameConst';

enum TitleType {
    originWin = 0,
    win,
    totalWin
}

enum WinBarAnimation {
    multiply = 'multiply',
    multiply_loop = 'multiply_loop',
    nomal = 'nomal',
    none = 'none',
    none_total_win = 'none_total_win',
    total_win = 'total_win',
    total_win_loop = 'total_win_loop',
    win_end = 'win_end',
    win_loop = 'win_loop',
    win_start = 'win_start',
}

const { ccclass } = _decorator;

/**
 * 橫幅
 * 依據倍數設定skin(0倍:lv1, 5倍:lv2, 10倍:lv3)
 * 依據是否連續中獎設定loop動畫(首次中獎:loop1, 連續中獎:loop2)
 * 依據等級設定win動畫(0,1:win1, 2:win2)
 */
@ccclass('BannerUI')
export class BannerUI extends Component {

    /**無標題(金額) */
    public static showOriginWin: XEvent1<number> = new XEvent1();
    /**Win(金額, isMultiplier) */
    public static showWin: XEvent2<number, number> = new XEvent2();
    /**TotalWin(金額) */
    public static showTotalWin: XEvent2<number, number> = new XEvent2();
    public static totalWinComplete: XEvent = new XEvent();
    /**還原廣告狀態 */
    public static reset: XEvent = new XEvent();

    /**淡出 */
    public static fadeOutEvent: XEvent = new XEvent();

    public static retrigger: XEvent1<number> = new XEvent1();

    /**廣告輪播橫幅 */
    private bannerAD: BannerAD = null;
    /**輪播文字 */
    private BannerText: Sprite = null;

    /**中獎橫幅 */
    private BannerWin: Node = null;
    private winLabel: Label = null;

    /**額外場次 */
    private BannerRetrigger: Node = null;
    private retriggerLabel: Label = null;

    /**增加場次資源(您贏得了N場免費遊戲, 贏得最多免費遊戲) */
    private bannerReTextList: SpriteFrame[] = [];

    private originPos: Vec3;

    private bsPageFrame: SpriteFrame[] = [];
    private fsPageFrame: SpriteFrame[] = [];
    private targetPageFrame: SpriteFrame[] = [];

    private text_win: Node;
    private text_totalwin: Node;
    /**小獎(1:win_1), 10倍以上大獎(2:win_2) */
    private vfxLevel: number = 0;
    private totalWinData = {
        currentValue: 0
    };

    private retriggerPosMap: { [key: string]: number } = {
        [BaseLang.bd]: -139,
        [BaseLang.sch]: -84,
        [BaseLang.tai]: -91,
        [BaseLang.ind]: -80,
        [BaseLang.por]: -69,
        [BaseLang.vie]: -38,
        [BaseLang.in]: -204,
        [BaseLang.esp]: -98,
        [BaseLang.jp]: -55,
        [BaseLang.kor]: -50,
        [BaseLang.tur]: -81,
        [BaseLang.eng]: 12,
        [BaseLang.tch]: -84
    };

    private info_bar_ani: sp.Skeleton;
    private info_bar_ani_bg: sp.Skeleton;

    onLoad(): void {
        this.bannerAD = this.node.getChildByPath('BannerAD').getComponent(BannerAD);
        this.BannerText = this.node.getChildByPath('BannerAD/BannerTextMask/BannerText').getComponent(Sprite);
        this.originPos = this.BannerText.node.getPosition(this.originPos);

        this.BannerWin = this.node.getChildByPath('BannerWin');
        this.winLabel = this.node.getChildByPath('BannerWin/WinText').getComponent(Label);
        this.text_win = this.node.getChildByPath('BannerWin/text_win');
        this.text_totalwin = this.node.getChildByPath('BannerWin/text_totalwin');

        this.BannerRetrigger = this.node.getChildByPath('BannerRetrigger');
        this.retriggerLabel = this.node.getChildByPath('BannerRetrigger/WinText').getComponent(Label);
        this.info_bar_ani = this.node.getChildByPath('info_bar_ani').getComponent(sp.Skeleton);
        this.info_bar_ani_bg = this.node.getChildByPath('info_bar_ani_bg').getComponent(sp.Skeleton);

        BannerUI.showOriginWin.on(this.showOriginWin, this);
        BannerUI.showWin.on(this.showWin, this);
        BannerUI.showTotalWin.on(this.showTotalWin, this);
        BannerUI.reset.on(this.onReset, this);

        BannerUI.fadeOutEvent.on(this.fadeOut, this);

        let lang: string = DataManager.getInstance().urlParam.lang;

        BundleLoader.onLoaded(BaseConst.BUNDLE_LANGUAGE, `${lang}/${LangBundleDir.fs}`, (langRes: any) => {
            this.bannerReTextList.push(langRes['RetriggerInfo']);
            this.bannerReTextList.push(langRes['RetriggerMax']);

            this.node.getChildByPath('BannerWin/text_win').getComponent(Sprite).spriteFrame = langRes['text_win'];
            this.node.getChildByPath('BannerWin/text_totalwin').getComponent(Sprite).spriteFrame = langRes['text_totalwin'];
            this.node.getChildByPath('BannerRetrigger/text_retrigger').getComponent(Sprite).spriteFrame = langRes['text_retrigger'];
            this.retriggerLabel.node.setPosition(this.retriggerPosMap[lang], 0);
        });

        BundleLoader.onLoaded(BaseConst.BUNDLE_LANGUAGE, `${lang}/${LangBundleDir.banner}`, (langRes: any) => {

            this.bsPageFrame.push(langRes['banner01']);
            this.bsPageFrame.push(langRes['banner02']);
            this.bsPageFrame.push(langRes['banner03']);
            this.bsPageFrame.push(langRes['banner04']);

            this.fsPageFrame.push(langRes['banner02']);
            this.fsPageFrame.push(langRes['banner03']);
            this.fsPageFrame.push(langRes['banner04']);
            this.fsPageFrame.push(langRes['banner05']);

            this.onReset();
            this.targetPageFrame = this.bsPageFrame;
            this.bannerAD.setup(this.targetPageFrame);
            this.bannerAD.play();

        });

        BannerUI.retrigger.on(this.retrigger, this);

        BaseEvent.changeScene.on((moduleID: ModuleID) => {
            this.targetPageFrame = moduleID == ModuleID.BS ? this.bsPageFrame : this.fsPageFrame;
            this.bannerAD.stop();
            this.bannerAD.setup(this.targetPageFrame);
            this.bannerAD.play();
        }, this);
        this.BannerWin.active = false;
        this.BannerRetrigger.active = false;

        this.bannerAD.node.active = false;
        this.bannerAD.stop();
    }

    private fadeOut(): void {
    }

    /**
     * 贏得XXX
     * @param level 
     * @param value 
     */
    private showOriginWin(value: number): void {
        this.showWinByType(TitleType.originWin, value, 0);
    }

    /**
     * 贏得XXX
     * @param level 
     * @param value 
     */
    private showWin(value: number, multiple: number): void {
        this.showWinByType(TitleType.win, value, multiple);
    }

    /**
     * 共贏得XXX
     * @param level 
     * @param value 
     */
    private showTotalWin(value: number, multiple: number): void {
        this.showWinByType(TitleType.totalWin, value, multiple);
    }

    /**
     * 
     * @param type 
     * @param value 
     */
    private showWinByType(type: TitleType, value: number, multiple: number): void {
        this.bannerAD.node.active = false;

        this.BannerRetrigger.active = false;

        this.BannerWin.active = true;
        this.text_win.active = type === TitleType.win;
        this.text_totalwin.active = type === TitleType.totalWin;

        //共贏得
        Tween.stopAllByTarget(this.totalWinData);
        if (type == TitleType.totalWin) {
            this.totalWinData.currentValue = value;
            this.onTotalWinComplete();
            /*
            //5倍-15倍要跑分(5倍但還沒到BIGWIN等級)
            if (multiple >= 5 && multiple < 15) {
                this.totalWinData.currentValue = 0;
                tween(this.totalWinData)
                    .to(BaseConst.TOTAL_WIN_SCROLL_TIME, { currentValue: value }, {
                        onUpdate: () => {
                            this.winLabel.string = XUtils.NumberToCentString(this.totalWinData.currentValue);
                        }
                    })
                    .call(() => {
                        this.onTotalWinComplete();
                    })
                    .start();
            }
            else {
                this.totalWinData.currentValue = value;
                this.onTotalWinComplete();
            }
            */
        }
        //贏得
        else {

            //更新數值
            if (type == TitleType.win) {
                AudioManager.getInstance().play(GameAudioKey.win);
                this.BannerWin.getComponent(Animation).play(GameAnimationName.ScaleJumpWinTxt);
            }
            if (multiple > 1) {
                XUtils.ClearSpine(this.info_bar_ani);
                this.info_bar_ani.addAnimation(0, WinBarAnimation.multiply, false);
                this.info_bar_ani.addAnimation(0, WinBarAnimation.multiply_loop, true);

                XUtils.ClearSpine(this.info_bar_ani_bg);
                this.info_bar_ani_bg.addAnimation(0, WinBarAnimation.none_total_win, false);
                this.info_bar_ani_bg.addAnimation(0, WinBarAnimation.none, true);
            }
            else {
                XUtils.ClearSpine(this.info_bar_ani);
                this.info_bar_ani.addAnimation(0, WinBarAnimation.win_start, false);
                this.info_bar_ani.addAnimation(0, WinBarAnimation.win_loop, true);
            }

            this.winLabel.string = XUtils.NumberToCentString(value);
        }
    }

    private onTotalWinComplete(): void {

        AudioManager.getInstance().play(GameAudioKey.wt);

        this.winLabel.string = XUtils.NumberToCentString(this.totalWinData.currentValue);

        this.BannerWin.getComponent(Animation).play(GameAnimationName.ScaleJumpWinTxt);

        XUtils.ClearSpine(this.info_bar_ani);
        this.info_bar_ani.addAnimation(0, WinBarAnimation.total_win, false);
        this.info_bar_ani.addAnimation(0, WinBarAnimation.total_win_loop, true);

        XUtils.ClearSpine(this.info_bar_ani_bg);
        this.info_bar_ani_bg.addAnimation(0, WinBarAnimation.none_total_win, false);
        this.info_bar_ani_bg.addAnimation(0, WinBarAnimation.none, true);

        //WinBar音效都是用在'共贏得'
        AudioManager.getInstance().play(this.vfxLevel == 1 ? AudioKey.WinBar1 : AudioKey.WinBar2);

        BannerUI.totalWinComplete.emit();
    }

    /**
     * 顯示額外獲得次數
     * @param isMax 
     */
    private retrigger(times: number): void {
        this.bannerAD.node.active = false;

        this.BannerWin.active = false;
        this.BannerRetrigger.active = true;
        this.retriggerLabel.string = times.toString();
    }

    /**
     * 重置
     */
    private onReset() {
        if (this.bannerAD.node.active) {
            return;
        }
        this.BannerWin.active = false;
        this.BannerRetrigger.active = false;

        XUtils.ClearSpine(this.info_bar_ani);
        this.info_bar_ani.addAnimation(0, WinBarAnimation.nomal, true);

        this.bannerAD.node.active = true;
    }
}