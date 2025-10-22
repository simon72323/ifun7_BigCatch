import { _decorator, Component, Label, tween, Vec3 } from 'cc';

import { XEvent1 } from '@common/script/event/XEvent';
import { RunNumber } from '@common/script/types/BaseType';
import { Utils } from '@common/script/utils/Utils';

const { ccclass } = _decorator;
@ccclass('WinScoreUI')
export class WinScoreUI extends Component {
    public static showWin: XEvent1<number> = new XEvent1();
    private winLabel: Label = null;
    private runNum: RunNumber = {
        curValue: 0,
        finalValue: 0
    };

    onLoad(): void {
        this.winLabel = this.node.getChildByName('WinNum').getComponent(Label);
        WinScoreUI.showWin.on(this.showWin, this);
        this.node.active = false;
    }

    /**
     * 顯示贏得分數
     * @param value 贏得分數
     */
    private async showWin(value: number): Promise<void> {
        this.node.active = true;
        Utils.fadeIn(this.node, 0.2);
        this.node.scale = new Vec3(0.5, 0.5, 1);
        tween(this.node)
            .to(0.2, { scale: new Vec3(1.1, 1.1, 1) }, { easing: 'sineOut' })
            .to(0.5, { scale: new Vec3(1, 1, 1) }, { easing: 'sineIn' })
            .start();
        //跑分動畫
        this.runNum.curValue = 0;
        this.runNum.finalValue = value;
        Utils.runNumber(0.5, this.winLabel, this.runNum);
        await Utils.delay(1);
        Utils.fadeOut(this.node, 0.2, () => {
            this.node.active = false;
        });
    }
}