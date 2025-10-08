import { _decorator, Component, Label, Node } from 'cc';

import { XEvent1 } from '@common/script/event/XEvent';

// import { LangBundleDir } from '@game/script/data/GameConst';

const { ccclass } = _decorator;

@ccclass('FSUI')
export class FSUI extends Component {

    /**更新剩餘次數(fsRemainTimes, shine) */
    public static refreshRemainTimes: XEvent1<number> = new XEvent1();

    private num_freeSpin: Label = null;

    private freespin_last: Node;
    private freespin_remaining: Node;

    onLoad() {
        this.num_freeSpin = this.node.getChildByName('num_freeSpin').getComponent(Label);
        this.freespin_last = this.node.getChildByName('freespin_last');
        this.freespin_remaining = this.node.getChildByName('freespin_remaining');

        FSUI.refreshRemainTimes.on(this.onRefreshRemainTimes, this);//監聽刷新剩餘次數事件
    }

    /**刷新剩餘次數事件 */
    private onRefreshRemainTimes(fsRemainTimes: number): void {
        this.freespin_last.active = fsRemainTimes === 0;
        this.num_freeSpin.node.active = fsRemainTimes > 0;
        this.freespin_remaining.active = fsRemainTimes > 0;
        this.num_freeSpin.string = fsRemainTimes.toString();
    }
}