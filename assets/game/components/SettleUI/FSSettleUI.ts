import { _decorator, Button, Component, KeyCode, Label, Node, sp, Sprite, SpriteFrame, tween, Tween } from 'cc';

import { AudioKey } from '@base/script/audio/AudioKey';
import { AudioManager } from '@common/script/manager/AudioManager';
import { BaseConst } from '@common/script/data/BaseConst';
import { DataManager } from '@common/script/data/DataManager';;
import { BaseEvent } from '@common/script/event/BaseEvent';
import { BundleLoader } from '@base/script/main/BundleLoader';
import { XEvent, XEvent3 } from '@common/script/event/XEvent';
import { XUtils } from '@base/script/utils/XUtils';

import { GameAudioKey, LangBundleDir } from '@game/script/constant/GameConst';

enum TotalWinAnimation {
    ttw_loop = 'ttw_loop',
    ttw_loop_none = 'ttw_loop_none',
    ttw_start = 'ttw_start',
    ttw_start_none = 'ttw_start_none',
}

const { ccclass } = _decorator;

/**
 * FS結算UI
 */
@ccclass('FSSettleUI')
export class FSSettleUI extends Component {

    /**顯示 */
    public static show: XEvent3<number, () => void, () => void> = new XEvent3();
    /**隱藏 */
    public static hide: XEvent = new XEvent();

    private num_totalwin: Label;

    private totalwin_ani: sp.Skeleton;

    private sens: Node;

    /**總贏獎標題 */
    private title_totalwin: SpriteFrame;
    /**免費遊戲結束標題 */
    private title_fgend: SpriteFrame;

    private settleObj = {
        currentValue: 0,
        finalValue: 0
    };

    private cbCover: () => void;
    private cbComplete: () => void;

    onLoad() {
        this.totalwin_ani = this.node.getChildByPath('totalwin_ani').getComponent(sp.Skeleton);
        this.num_totalwin = this.node.getChildByPath('totalwin_ani/num_totalwin').getComponent(Label);
        this.sens = this.node.getChildByPath('Sens');


        //結算演示
        FSSettleUI.show.on((value, onCover, onComplete) => {
            this.sens.active = true;
            this.sens.once(Button.EventType.CLICK, this.onTweenComplete, this);
            BaseEvent.keyDown.once((code: KeyCode) => {
                if (code === KeyCode.SPACE) {
                    this.onTweenComplete();
                }
            }, this);

            this.cbCover = onCover;
            this.cbComplete = onComplete;
            this.node.active = true;
            this.num_totalwin.string = '';
            this.num_totalwin.node.active = value > 0;

            this.node.getChildByPath('totalwin_ani/title_totalwin').getComponent(Sprite).spriteFrame = value > 0 ? this.title_totalwin : this.title_fgend;

            XUtils.ClearSpine(this.totalwin_ani);
            let start = value > 0 ? TotalWinAnimation.ttw_start : TotalWinAnimation.ttw_start_none;
            let loop = value > 0 ? TotalWinAnimation.ttw_loop : TotalWinAnimation.ttw_loop_none;
            this.totalwin_ani.addAnimation(0, start, false);
            this.totalwin_ani.addAnimation(0, loop, true);

            this.settleObj.finalValue = value;
            this.settleObj.currentValue = 0;

            //轉場全遮蔽
            this.scheduleOnce(this.onFadeInComplete, 1);

            AudioManager.getInstance().play(GameAudioKey.TW);


            AudioManager.getInstance().play(AudioKey.WinRolling);

            tween(this.settleObj)
                .to(2, { currentValue: value }, {
                    onUpdate: (_target) => {
                        this.num_totalwin.getComponent(Label).string = XUtils.NumberToCentString(this.settleObj.currentValue);
                    },
                    easing: BaseConst.noisyEasing
                })
                .call(() => {
                    this.onTweenComplete();
                })
                .start();
        }, this);

        //關閉結算
        FSSettleUI.hide.on(() => {

        }, this);

        let lang: string = DataManager.getInstance().urlParam.lang;
        BundleLoader.onLoaded(BaseConst.BUNDLE_LANGUAGE, `${lang}/${LangBundleDir.board}`, (langRes: any) => {
            this.title_totalwin = langRes['title_totalwin'];
            this.title_fgend = langRes['title_fgend'];
        });

        this.node.active = false;
    }

    private onFadeInComplete(): void {
        if (this.cbCover) {
            let fn = this.cbCover;
            fn();
            this.cbCover = null;
        }
        this.unschedule(this.onFadeInComplete);
    }

    private onTweenComplete(): void {

        this.sens.off(Button.EventType.CLICK, this.onTweenComplete, this);
        BaseEvent.keyDown.off(this);

        this.sens.active = false;
        Tween.stopAllByTarget(this.settleObj);
        this.num_totalwin.getComponent(Label).string = XUtils.NumberToCentString(this.settleObj.finalValue);

        this.onFadeInComplete();

        tween(this.node)
            .delay(1)
            .call(() => {
                AudioManager.getInstance().stop(AudioKey.WinRolling);
                this.node.active = false;
                let fn = this.cbComplete;
                fn();
                this.cbComplete = null;
            })
            .start();
    }

    update(_deltaTime: number) {

    }
}