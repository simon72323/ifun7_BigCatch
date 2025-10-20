import { _decorator, Button, Component, KeyCode, Label, Node, sp, tween, Tween } from 'cc';

import { GameAudioKey } from '@game/script/data/GameConst';

import { BaseEvent } from '@common/script/event/BaseEvent';
import { XEvent3 } from '@common/script/event/XEvent';
import { AudioKey } from '@common/script/manager/AudioKey';
import { AudioManager } from '@common/script/manager/AudioManager';
import { RunNumber } from '@common/script/types/BaseType';
import { Utils } from '@common/script/utils/Utils';


enum TotalWinAnimation {
    totalWin_loop = 'totalWin_loop',
    totalWin_in = 'totalWin_in',
}

const { ccclass } = _decorator;

/**
 * FS結算UI
 */
@ccclass('TotalWinUI')
export class TotalWinUI extends Component {
    /**顯示 */
    public static show: XEvent3<number, () => void, () => void> = new XEvent3();
    /**隱藏 */
    // public static hide: XEvent = new XEvent();

    private totalwin_ani: sp.Skeleton;
    private num_totalwin: Label;
    private showTime: Label;
    private sens: Node;

    private runNum: RunNumber = {
        curValue: 0,
        finalValue: 0
    };

    /**畫面自動關閉計時器 */
    private countdown = {
        curTime: 0,
        finalTime: 10
    };

    // private cbCover: () => void;
    private cbComplete: () => void;

    onLoad() {
        this.totalwin_ani = this.node.getChildByName('totalwin_ani').getComponent(sp.Skeleton);
        this.num_totalwin = this.node.getChildByPath('totalwin_ani/Content/num_totalwin').getComponent(Label);
        this.showTime = this.node.getChildByPath('totalwin_ani/Content/Layout/ShowTime').getComponent(Label);
        this.sens = this.node.getChildByName('Sens');

        TotalWinUI.show.on(this.show, this);//結算演示
        // TotalWinUI.hide.on(() => { }, this);//關閉結算
        this.node.active = false;
    }

    /**
     * 顯示結算
     * @param value 結算金額
     * @param onCover 覆蓋事件
     * @param onComplete 完成事件
     */
    private show(value: number, onCover: () => void, onComplete: () => void): void {
        this.node.active = true;
        this.sens.once(Button.EventType.CLICK, this.onComplete, this);
        BaseEvent.keyDown.once((code: KeyCode) => {
            if (code === KeyCode.SPACE) {
                this.onComplete();
            }
        }, this);

        // this.cbCover = onCover;
        this.cbComplete = onComplete;
        this.num_totalwin.string = '';

        // Utils.ClearSpine(this.totalwin_ani);
        this.totalwin_ani.setAnimation(0, TotalWinAnimation.totalWin_in, false);
        this.totalwin_ani.addAnimation(0, TotalWinAnimation.totalWin_loop, true);

        this.runCountdown();//倒數計時器

        //轉場全遮蔽
        // tween(this.node)
        //     .delay(1)
        //     .call(() => {
        //         this.cbCover?.();
        //         this.cbCover = null;
        //     })
        //     .start();

        AudioManager.getInstance().playSound(GameAudioKey.TW);
        AudioManager.getInstance().playSound(AudioKey.WinRolling);

        //跑分動畫
        this.runNum.finalValue = value;
        Utils.runNumber(2, this.num_totalwin, this.runNum, () => {
            this.onComplete();
        });
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

        // this.sens.active = false;
        Tween.stopAllByTarget(this.runNum);
        Tween.stopAllByTarget(this.countdown);
        this.num_totalwin.getComponent(Label).string = Utils.numberFormat(this.runNum.finalValue);

        // this.cbCover?.();
        // this.cbCover = null;

        await Utils.delay(1);
        Utils.fadeOut(this.node, 0.3, () => {
            AudioManager.getInstance().stopSound(AudioKey.WinRolling);
            this.node.active = false;
            this.cbComplete?.();
        });
    }
}