import { _decorator, Button, Component, KeyCode, Label, Node, sp, tween, Tween } from 'cc';

import { AudioKey } from '@game/script/data/AudioKey';

import { BaseEvent } from '@common/script/event/BaseEvent';
import { XEvent4 } from '@common/script/event/XEvent';
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
    public static show: XEvent4<number, number, () => void, () => void> = new XEvent4();
    /**隱藏 */
    // public static hide: XEvent = new XEvent();

    private totalwin_ani: sp.Skeleton;
    private num_totalwin: Label;
    private totalTimesLabel: Label;
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
        this.totalTimesLabel = this.node.getChildByPath('totalwin_ani/Content/totalTimes/Label').getComponent(Label);
        this.showTime = this.node.getChildByPath('totalwin_ani/Content/Layout/ShowTime').getComponent(Label);
        this.sens = this.node.getChildByName('Sens');

        TotalWinUI.show.on(this.show, this);//結算演示
        // TotalWinUI.hide.on(() => { }, this);//關閉結算
        this.node.active = false;
    }

    /**
     * 顯示結算
     * @param value 結算金額
     * @param count 總免費遊戲次數
     * @param onCover 覆蓋事件
     * @param onComplete 完成事件
     */
    private async show(value: number, count: number, onCover: () => void, onComplete: () => void): Promise<void> {
        this.node.active = true;
        Utils.fadeIn(this.node, 0.3, 0, 255);
        this.totalTimesLabel.string = count.toString();

        // this.cbCover = onCover;
        this.cbComplete = onComplete;
        this.num_totalwin.string = '';

        // Utils.ClearSpine(this.totalwin_ani);
        this.totalwin_ani.setAnimation(0, TotalWinAnimation.totalWin_in, false);
        this.totalwin_ani.addAnimation(0, TotalWinAnimation.totalWin_loop, true);

        //跑分動畫
        this.runNum.curValue = 0;//初始化跑分數據
        this.runNum.finalValue = value;
        AudioManager.getInstance().playSound(AudioKey.totalWin);
        //跑分時間1.5秒(根據音效長度決定)
        Utils.runNumber(1.5, this.num_totalwin, this.runNum);

        this.runCountdown();//倒數計時器

        await Utils.delay(1);
        onCover?.();//轉場全遮蔽
        // console.log('監聽sens click');
        this.sens.once(Button.EventType.CLICK, this.onComplete, this);
        BaseEvent.keyDown.once((code: KeyCode) => {
            if (code === KeyCode.SPACE) {
                this.onComplete();
            }
        }, this);
    }

    /**
     * 倒數計時器
     */
    private runCountdown(): void {
        this.showTime.string = this.countdown.finalTime.toString();
        this.countdown.curTime = this.countdown.finalTime;//重置倒數計時器
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
        // console.log('取消監聽sens click');
        this.sens.off(Button.EventType.CLICK, this.onComplete, this);
        BaseEvent.keyDown.off(this);

        Tween.stopAllByTarget(this.runNum);
        Tween.stopAllByTarget(this.countdown);
        this.num_totalwin.getComponent(Label).string = Utils.numberFormat(this.runNum.finalValue);

        await Utils.delay(1);
        Utils.fadeOut(this.node, 0.3, 255, 0, () => {
            this.node.active = false;
            this.cbComplete?.();
        });
    }
}