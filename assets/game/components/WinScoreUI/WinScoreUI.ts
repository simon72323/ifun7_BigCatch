import { _decorator, Component, Label, Tween, tween, Vec3 } from 'cc';

import { XEvent, XEvent1 } from '@common/script/event/XEvent';
import { RunNumber } from '@common/script/types/BaseType';
import { Utils } from '@common/script/utils/Utils';

const { ccclass } = _decorator;
@ccclass('WinScoreUI')
export class WinScoreUI extends Component {
    public static showWin: XEvent1<number> = new XEvent1();
    public static hideWin: XEvent = new XEvent();
    private winLabel: Label = null;
    private runNum: RunNumber = {
        curValue: 0,
        finalValue: 0
    };

    onLoad(): void {
        this.winLabel = this.node.getChildByName('WinNum').getComponent(Label);
        WinScoreUI.showWin.on(this.showWin, this);
        WinScoreUI.hideWin.on(this.hideWin, this);
        this.node.active = false;
    }

    /**
     * 顯示贏得分數
     * @param value 贏得分數
     */
    private showWin(value: number): void {
        this.node.active = true;
        Utils.fadeIn(this.node, 0.1, 0, 255);
        this.node.scale = new Vec3(0.5, 0.5, 1);
        tween(this.node)
            .to(0.15, { scale: new Vec3(1.2, 1.2, 1) })
            .to(0.15, { scale: new Vec3(1, 1, 1) })
            .delay(0.7)
            .call(() => {
                Utils.fadeOut(this.node, 0.2, 255, 0, () => {
                    this.node.active = false;
                });
            })
            .start();
        //跑分動畫
        this.runNum.curValue = 0;
        this.runNum.finalValue = value;
        Utils.runNumber(0.5, this.winLabel, this.runNum);
    }

    /**
     * 隱藏贏得分數
     */
    private hideWin(): void {
        Tween.stopAllByTarget(this.node);
        this.node.active = false;
    }
}