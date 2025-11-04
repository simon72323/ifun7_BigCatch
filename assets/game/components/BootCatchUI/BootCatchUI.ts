import { _decorator, Component, Node, sp, tween, Vec3 } from 'cc';

import { AudioKey } from 'db://assets/game/script/data/AudioKey';

import { XEvent1 } from 'db://assets/common/script/event/XEvent';
import { AudioManager } from 'db://assets/common/script/manager/AudioManager';
import { Utils } from 'db://assets/common/script/utils/Utils';


const { ccclass, property } = _decorator;
@ccclass('BootCatchUI')
export class BootCatchUI extends Component {
    public static show: XEvent1<() => void> = new XEvent1();
    private ani_hook: sp.Skeleton;
    private ani_multiply: sp.Skeleton;
    private boot: Node;
    // private pic_boots: Node;

    onLoad() {
        BootCatchUI.show.on(this.show, this);
        this.ani_hook = this.node.getChildByName('ani_hook').getComponent(sp.Skeleton);
        this.boot = this.node.getChildByPath('ani_hook/boot');
        // this.pic_boots = this.node.getChildByPath('ani_hook/boot/pic_boots');
        this.ani_multiply = this.node.getChildByPath('ani_hook/ani_multiply').getComponent(sp.Skeleton);
        this.node.active = false;
        this.boot.active = false;
        this.ani_multiply.node.active = false;
    }

    /**
     * 顯示釣靴UI
     * @param onComplete 完成事件
     */
    private async show(onComplete: () => void): Promise<void> {
        // if (this.node.active) return;
        this.scheduleOnce(() => {
            AudioManager.getInstance().playSound(AudioKey.hook);
        }, 0.3);
        this.ani_hook.node.position = new Vec3(0, -35, 0);
        this.node.active = true;
        Utils.fadeIn(this.node, 0.1, 0, 255);
        this.ani_hook.setAnimation(0, 'hook_in', false);
        await Utils.delay(1);
        this.ani_hook.setAnimation(0, 'hook_get', false);
        await Utils.delay(0.8);
        this.ani_multiply.node.active = true;
        this.ani_multiply.setAnimation(0, 'light', false);
        this.boot.active = true;//釣到靴子
        Utils.fadeIn(this.boot, 0.2, 0, 255);
        await Utils.delay(0.4);

        //鉤子上移
        tween(this.ani_hook.node)
            .to(1.1, { position: new Vec3(0, 180, 0) }, { easing: 'sineInOut' })
            .call(() => {
                onComplete?.();
            })
            .delay(0.2)
            .call(() => {
                Utils.fadeOut(this.node, 0.4, 255, 0, () => {
                    this.node.active = false;
                    this.boot.active = false;
                    this.ani_multiply.node.active = false;
                });
            })
            .start();
    }

    onDestroy() {
        BootCatchUI.show.off(this);
    }
}