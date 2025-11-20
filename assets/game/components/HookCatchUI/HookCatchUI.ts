import { _decorator, Component, Node, Size, sp, tween, UITransform, Vec3 } from 'cc';
import { XEvent1, XEvent3 } from 'db://assets/common/script/event/XEvent';
import { AudioManager } from 'db://assets/common/script/manager/AudioManager';
import { Utils } from 'db://assets/common/script/utils/Utils';

import { AudioKey } from 'db://assets/game/script/data/AudioKey';

const { ccclass, property } = _decorator;
@ccclass('HookCatchUI')
export class HookCatchUI extends Component {
    public static catchBoot: XEvent1<() => void> = new XEvent1();
    public static catchScatter: XEvent3<number, number, () => void> = new XEvent3();
    private ani_hook: sp.Skeleton;
    private ani_multiply: sp.Skeleton;
    private hook: Node;
    private pic_scatter: Node;
    private pic_boot: Node;
    // private pic_boots: Node;

    onLoad() {
        HookCatchUI.catchBoot.on(this.catchBoot, this);
        HookCatchUI.catchScatter.on(this.catchScatter, this);
        this.ani_hook = this.node.getChildByName('ani_hook').getComponent(sp.Skeleton);
        this.hook = this.node.getChildByPath('ani_hook/hook');
        this.pic_scatter = this.node.getChildByPath('ani_hook/hook/pic_scatter');
        this.pic_boot = this.node.getChildByPath('ani_hook/hook/pic_boot');
        // this.pic_boots = this.node.getChildByPath('ani_hook/boot/pic_boots');
        this.ani_multiply = this.node.getChildByPath('ani_hook/ani_multiply').getComponent(sp.Skeleton);
        this.node.active = false;
        this.pic_scatter.active = false;
        this.pic_boot.active = false;
        // this.hook.active = false;
        this.ani_multiply.node.active = false;
    }

    /**
     * 表演釣靴
     * @param onComplete 完成事件
     */
    private async catchBoot(onComplete: () => void): Promise<void> {
        // if (this.node.active) return;
        this.scheduleOnce(() => {
            AudioManager.getInstance().playSound(AudioKey.hook);
        }, 0.3);
        this.node.getComponent(UITransform).setContentSize(new Size(1000, 1200));
        this.ani_hook.node.position = new Vec3(0, -35, 0);
        this.node.active = true;
        Utils.fadeIn(this.node, 0.1, 0, 255);
        this.ani_hook.setAnimation(0, 'hook_in', false);
        await Utils.delay(1);
        this.node.getComponent(UITransform).setContentSize(new Size(1000, 620));
        this.ani_hook.setAnimation(0, 'hook_get', false);
        await Utils.delay(0.8);
        this.ani_multiply.node.active = true;
        this.ani_multiply.setAnimation(0, 'light', false);
        this.pic_boot.active = true;//釣到靴子
        Utils.fadeIn(this.hook, 0.2, 0, 255);
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
                    this.pic_boot.active = false;
                    // this.hook.active = false;
                    this.ani_multiply.node.active = false;
                });
            })
            .start();
    }

    /**
     * 表演釣scatter
     * @param reelCol 軸號
     * @param reelRow 行號
     * @param onComplete 完成事件
     */
    private async catchScatter(reelCol: number, reelRow: number, onComplete: () => void): Promise<void> {
        // if (this.node.active) return;
        this.scheduleOnce(() => {
            AudioManager.getInstance().playSound(AudioKey.hook);
        }, 0.3);
        this.node.getComponent(UITransform).setContentSize(new Size(1000, 1200));
        const xPos = reelCol * 164 - 308;//x位置
        const endYPos = 415 - reelRow * 158;//y位置
        this.ani_hook.node.position = new Vec3(xPos, -35, 0);
        this.node.active = true;
        Utils.fadeIn(this.node, 0.1, 0, 255);
        this.ani_hook.setAnimation(0, 'hook_in', false);
        await Utils.delay(1);
        this.node.getComponent(UITransform).setContentSize(new Size(1000, 620));
        this.ani_hook.setAnimation(0, 'hook_get', false);
        await Utils.delay(0.8);
        this.ani_multiply.node.active = true;
        this.ani_multiply.setAnimation(0, 'light', false);
        this.pic_scatter.active = true;//釣到scatter
        Utils.fadeIn(this.hook, 0.2, 0, 255);
        await Utils.delay(0.4);

        //鉤子上移
        tween(this.ani_hook.node)
            .to(1.1, { position: new Vec3(xPos, endYPos, 0) }, { easing: 'sineInOut' })
            .call(() => {
                onComplete?.();
                this.pic_scatter.active = false;
            })
            .call(() => {
                Utils.fadeOut(this.node, 0.4, 255, 0, () => {
                    this.node.active = false;
                    // this.hook.active = false;
                    this.ani_multiply.node.active = false;
                });
            })
            .start();
    }

    onDestroy() {
        HookCatchUI.catchBoot.off(this);
        HookCatchUI.catchScatter.off(this);
    }
}