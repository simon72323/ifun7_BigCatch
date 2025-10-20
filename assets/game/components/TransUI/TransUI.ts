import { _decorator, Button, Component, KeyCode, Label, Node, sp, Tween, tween } from 'cc';

import { GameAudioKey } from '@game/script/data/GameConst';

import { BaseEvent } from '@common/script/event/BaseEvent';
import { XEvent3 } from '@common/script/event/XEvent';
import { AudioManager } from '@common/script/manager/AudioManager';
import { Utils } from '@common/script/utils/Utils';

enum CutsceneAni {
    fg_loop = 'fg_loop',
    fg_in = 'fg_in'
}

const { ccclass, property } = _decorator;

/**
 * 轉場UI
 */
@ccclass('TransUI')
export class TransUI extends Component {
    /**轉場淡入(times:次數) */
    public static show: XEvent3<number, () => void, () => void> = new XEvent3();

    /**面板動畫 */
    private cutscene_ani: sp.Skeleton;

    /**次數 */
    private num_freeSpin: Label;

    /**顯示時間 */
    private showTime: Label;

    /**畫面自動關閉計時器 */
    private countdown = {
        curTime: 0,
        finalTime: 10
    };

    /**skip感應區 */
    private sens: Node;
    private cbComplete: () => void;

    onLoad() {
        this.cutscene_ani = this.node.getChildByName('cutscene_ani').getComponent(sp.Skeleton);
        this.num_freeSpin = this.node.getChildByPath('cutscene_ani/Content/num_freeSpin').getComponent(Label);
        this.showTime = this.node.getChildByPath('totalwin_ani/Content/Layout/ShowTime').getComponent(Label);
        this.sens = this.node.getChildByName('Sens');
        TransUI.show.on(this.show, this);//轉場淡入
        this.node.active = false;
    }

    /**
     * 顯示轉場
     * @param times 次數
     * @param onCover 覆蓋事件
     * @param onComplete 完成事件
     */
    private async show(times: number, onCover: () => void, onComplete: () => void): Promise<void> {
        this.node.active = true;
        AudioManager.getInstance().playSound(GameAudioKey.FgTran);
        this.cbComplete = onComplete;

        Utils.fadeIn(this.node, 0.3);

        this.cutscene_ani.setAnimation(0, CutsceneAni.fg_in, false);
        this.cutscene_ani.addAnimation(0, CutsceneAni.fg_loop, true);
        this.num_freeSpin.string = times.toString();

        this.runCountdown();//倒數計時器

        //1秒後才可以跳過
        await Utils.delay(1);
        this.sens.once(Button.EventType.CLICK, this.onComplete, this);
        BaseEvent.keyDown.once((code: KeyCode) => {
            if (code == KeyCode.SPACE) {
                this.onComplete();
            }
        }, this);
    }

    /**
     * 倒數計時器
     */
    private runCountdown(): void {
        this.showTime.string = this.countdown.finalTime.toString();
        tween(this.countdown)
            .to(this.countdown.finalTime, { curTime: 0 }, {
                onUpdate: () => {
                    this.showTime.string = Math.ceil(this.countdown.curTime).toString();
                },
                onComplete: () => {
                    this.onComplete();
                }
            })
            .start();
    }

    /**
     * 完成
     */
    private async onComplete(): Promise<void> {
        this.sens.off(Button.EventType.CLICK, this.onComplete, this);
        BaseEvent.keyDown.off(this);

        // AudioManager.getInstance().stopSound(GameAudioKey.FgTran);
        // AudioManager.getInstance().playSound(GameAudioKey.confrats);
        Tween.stopAllByTarget(this.countdown);
        this.showTime.string = '0';

        await Utils.delay(1);
        Utils.fadeOut(this.node, 0.3, () => {
            this.node.active = false;
            this.cbComplete?.();
        });
    }
}