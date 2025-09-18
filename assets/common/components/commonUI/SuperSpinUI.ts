import { _decorator, Component, Node } from 'cc';

import { BaseDataManager } from '@base/script/main/BaseDataManager';
import { BaseEvent } from '@base/script/main/BaseEvent';

const { ccclass, property } = _decorator;

@ccclass('SuperSpinUI')
export class SuperSpinUI extends Component {
    private superSpin: Node = null;//超級SPIN節點
    private content: Node = null;//超級SPIN內容
    private preMessage: Node = null;//超級SPIN預先訊息
    private BsBg: Node = null;//超級SPIN BS背景
    private FsBg: Node = null;//超級SPIN FS背景

    onLoad() {
        BaseEvent.clickTurbo.on(this.onSuperSpinMode, this);
        BaseEvent.clickSpin.on(this.startSuperSpin, this);

        this.superSpin = this.node.getChildByName('SuperSpin');
        this.content = this.superSpin.getChildByName('Content');
        this.preMessage = this.superSpin.getChildByName('PreMessage');
        this.BsBg = this.superSpin.getChildByName('BsBg');
        this.FsBg = this.superSpin.getChildByName('FsBg');
    }

    /**
     * 啟用/禁用超級 SPIN 模式
     * @param active {boolean} 啟用/禁用
     */
    public onSuperSpinMode(active: boolean) {
        this.superSpin.active = active;
        this.content.active = !active;
        this.preMessage.active = active;
        const isBS = BaseDataManager.getInstance().isBS();
        this.BsBg.active = isBS;
        this.FsBg.active = !isBS;

        // const copy = instantiate(this.props['superSpin']['win'].node);
        // ObjectPool.registerNode('winLabelClone', copy);
    }

    /**
     * 開始超級SPIN
     */
    private startSuperSpin() {
        if (!this.superSpin.active) return;

        if (this.preMessage.active) {
            this.content.active = true;
            this.preMessage.active = false;
        }

        console.log('開始超級SPIN');
    }
}