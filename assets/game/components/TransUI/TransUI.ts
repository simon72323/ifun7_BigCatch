import { _decorator, Button, Component, KeyCode, Label, Node, sp, Sprite, UIOpacity } from 'cc';
import { AudioManager } from '@/base/script/audio/AudioManager';
import { BaseConst } from '@/base/script/constant/BaseConst';
import { BaseDataManager } from '@/base/script/main/BaseDataManager';
import { BaseEvent } from '@/base/script/main/BaseEvent';
import { BundleLoader } from '@/base/script/main/BundleLoader';
import { BaseAnimationName } from '@/base/script/types/BaseType';
import { XEvent, XEvent1, XEvent3 } from '@/base/script/utils/XEvent';
import { XUtils } from '@/base/script/utils/XUtils';
import { GameAudioKey, LangBundleDir } from '../../script/constant/GameConst';
const { ccclass, property } = _decorator;

/**
 * 轉場UI
 */
@ccclass('TransUI')
export class TransUI extends Component {

    /**轉場淡入(times:次數) */
    public static fadeIn: XEvent3<number, () => void, () => void> = new XEvent3();

    /**轉場淡出 */
    public static fadeOut: XEvent1<() => void> = new XEvent1();

    /**點擊轉場按鈕 */
    public static click: XEvent = new XEvent();

    /**門框動畫 */
    private freegame_box_ani: sp.Skeleton;

    /**開頭動畫 */
    private trans_ani: sp.Skeleton;

    /**次數 */
    private num_freespinwin: Label;

    /**次數 */
    private start_btn: Button;

    private black: Node;

    /**skip感應區 */
    private sens: Node;
    private cbFadeInComplete: () => void;
    /**
     * 
     */
    onLoad() {

        this.trans_ani = this.node.getChildByPath("trans_ani").getComponent(sp.Skeleton);
        this.freegame_box_ani = this.node.getChildByPath("freegame_box_ani").getComponent(sp.Skeleton);
        this.num_freespinwin = this.node.getChildByPath("freegame_box_ani/num_freespinwin").getComponent(Label);
        this.start_btn = this.node.getChildByPath("freegame_box_ani/start_btn").getComponent(Button);
        this.sens = this.node.getChildByPath("Sens");
        this.black = this.node.getChildByPath("SpriteSplash");
        this.sens.active = false;

        let lang: string = BaseDataManager.getInstance().urlParam.lang;
        BundleLoader.onLoaded(BaseConst.BUNDLE_LANGUAGE, `${lang}/${LangBundleDir.board}`, (langRes: any) => {
            this.node.getChildByPath("freegame_box_ani/title_congrats").getComponent(Sprite).spriteFrame = langRes["title_congrats"];
            this.node.getChildByPath("freegame_box_ani/title_freesin").getComponent(Sprite).spriteFrame = langRes["title_freesin"];
            this.node.getChildByPath("freegame_box_ani/title_youwon").getComponent(Sprite).spriteFrame = langRes["title_youwon"];
        });
        BundleLoader.onLoaded(BaseConst.BUNDLE_LANGUAGE, `${lang}/${BaseConst.DIR_LOADING}`, (langRes: any) => {
            XUtils.setButtonSprite(this.start_btn, langRes["start_btn_N"], langRes["start_btn_H"]);
        });


        //轉場淡入
        TransUI.fadeIn.on((times, onCover, onComplete) => {

            AudioManager.getInstance().play(GameAudioKey.FgTran);

            this.cbFadeInComplete = onComplete;

            this.node.getComponent(UIOpacity).opacity = 255;


            this.node.active = true;
            this.freegame_box_ani.node.active = false;
            this.trans_ani.node.active = true;
            this.black.active = false;

            XUtils.ClearSpine(this.freegame_box_ani);
            this.freegame_box_ani.setAnimation(0, BkgAnimation.loop, true);
            this.num_freespinwin.string = times.toString();

            //過場
            XUtils.ClearSpine(this.trans_ani);
            //播放完成開始計時10秒
            this.trans_ani.setCompleteListener(() => {
                this.onFadeInComplete();
            });
            this.trans_ani.setAnimation(0, "animation", false);

            //全遮蔽時顯示轉場次數面板
            this.scheduleOnce(() => {
                this.freegame_box_ani.node.active = true;
                this.black.active = true;

                //Skip
                this.sens.active = true;
                this.sens.once(Button.EventType.CLICK, this.onSkip, this);
                BaseEvent.keyDown.once((code: KeyCode) => {
                    if (code == KeyCode.SPACE) {
                        this.onSkip();
                    }
                }, this);

                onCover?.();
            }, 1);

            // AudioManager.getInstance().play(GameAudioKey.trans_begin);
        }, this);

        //轉場淡出
        TransUI.fadeOut.on((onComplete) => {

            BaseEvent.keyDown.off(this);
            this.start_btn.node.off(Button.EventType.CLICK, this.clickTrans, this);

            XUtils.playAnimation(this.node, BaseAnimationName.fadeOutOpacity, 0.3);
            // AudioManager.getInstance().play(GameAudioKey.trans_end);

            this.freegame_box_ani.setAnimation(0, BkgAnimation.end, false);
            this.scheduleOnce(() => {
                this.node.active = false;
                AudioManager.getInstance().stop(GameAudioKey.FgTran);

                onComplete?.();
            }, 1);
        }, this);

        this.node.active = false;
    }

    private clickTrans(): void {
        TransUI.click.emit();

    }

    private onSkip(): void {
        this.sens.off(Button.EventType.CLICK, this.onSkip, this);
        BaseEvent.keyDown.off(this);
        AudioManager.getInstance().stop(GameAudioKey.FgTran, 1);
        AudioManager.getInstance().play(GameAudioKey.confrats);
        this.onFadeInComplete();
    }

    private onFadeInComplete(): void {
        this.trans_ani.setCompleteListener(null);
        this.trans_ani.node.active = false;
        this.sens.active = false;
        this.cbFadeInComplete?.();

        //onCover後才會監聽
        BaseEvent.keyDown.off(this);
        BaseEvent.keyDown.once((code: KeyCode) => {
            if (code == KeyCode.SPACE) {
                this.clickTrans();
            }
        }, this);
        this.start_btn.node.once(Button.EventType.CLICK, () => {
            this.clickTrans();
        }, this);

    }
}

enum BkgAnimation {
    loop = "loop",
    end = "end"
}