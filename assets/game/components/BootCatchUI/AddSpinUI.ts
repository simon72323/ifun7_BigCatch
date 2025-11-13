import { _decorator, Component, Node, sp, tween, Vec3 } from 'cc';
import { SettingsController } from 'db://assets/common/components/settingsController/SettingsController';
import { XEvent1 } from 'db://assets/common/script/event/XEvent';
import { Utils } from 'db://assets/common/script/utils/Utils';


const { ccclass, property } = _decorator;
@ccclass('AddSpinUI')
export class AddSpinUI extends Component {
    public static show: XEvent1<() => void> = new XEvent1();
    private move: Node;
    private ani_multiply: sp.Skeleton;

    onLoad() {
        AddSpinUI.show.on(this.show, this);
        this.move = this.node.getChildByName('move');
        this.ani_multiply = this.node.getChildByPath('move/ani_multiply').getComponent(sp.Skeleton);
        this.node.active = false;
    }

    /**
     * 顯示加spinUI
     * @param onComplete 完成事件
     */
    private async show(onComplete: () => void): Promise<void> {
        // if (this.node.active) return;
        this.move.position = Vec3.ZERO;
        this.node.active = true;
        Utils.fadeIn(this.node, 0.1, 0, 255);
        const spinPos = SettingsController.getInstance().getSpinPos();
        this.ani_multiply.setAnimation(0, 'hitbubble', false);
        tween(this.move)
            .to(0.2, { scale: new Vec3(1.5, 1.5, 1) })
            .to(0.2, { scale: new Vec3(1, 1, 1) })
            .to(0.6, { position: spinPos }, { easing: 'cubicIn' })
            .to(0.2, { scale: new Vec3(0, 0, 1) })
            .call(() => {
                this.node.active = false;
                onComplete?.();
            })
            .start();
    }

    onDestroy() {
        AddSpinUI.show.off(this);
    }
}