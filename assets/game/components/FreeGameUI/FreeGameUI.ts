import { _decorator, Component, instantiate, Label, Node, Prefab, sp, Sprite, tween, Vec3 } from 'cc';
import { XEvent, XEvent3, XEvent4 } from 'db://assets/common/script/event/XEvent';
import { AudioManager } from 'db://assets/common/script/manager/AudioManager';
import { Utils } from 'db://assets/common/script/utils/Utils';

import { AudioKey } from 'db://assets/game/script/data/AudioKey';

const { ccclass, property } = _decorator;
@ccclass('FreeGameUI')
export class FreeGameUI extends Component {
    public static show: XEvent = new XEvent();
    public static hide: XEvent = new XEvent();
    public static showMoveScore: XEvent4<number, Vec3, Vec3, number> = new XEvent4();
    public static addProgress: XEvent3<number, Vec3, () => void> = new XEvent3();

    @property({ type: Prefab, tooltip: '移動分數' })
    private moveScore: Prefab = null;

    @property({ type: Prefab, tooltip: '倍數閃光特效' })
    private multiplyLight: Prefab = null;

    @property({ type: Prefab, tooltip: '倍數飛行特效' })
    private multiplyFly: Prefab = null;

    // 進度列表
    private progressList: Node[] = [];
    // 等級列表
    private levelList: Node[] = [];

    onLoad() {
        FreeGameUI.show.on(this.show, this);
        FreeGameUI.hide.on(this.hide, this);
        FreeGameUI.showMoveScore.on(this.showMoveScore, this);
        FreeGameUI.addProgress.on(this.addProgress, this);
        this.node.active = false;

        // 初始化進度列表(8顆)
        for (let i = 0; i < 8; i++) {
            const progress = this.node.getChildByName(`FgProgress_${i}`);
            this.progressList.push(progress);
        }
        // 初始化等級列表(2顆)
        for (let i = 0; i < 2; i++) {
            const level = this.node.getChildByPath(`Level/Level_${i}`);
            this.levelList.push(level);
        }
    }

    /**
     * 顯示免費遊戲UI
     */
    private show(): void {
        //初始化進度列表狀態
        this.progressList.forEach(progress => {
            progress.getChildByName('image').getComponent(Sprite).grayscale = true;
            progress.getChildByName('ani_multiply').getComponent(sp.Skeleton).node.active = false;
        });
        //初始化等級列表狀態
        this.levelList.forEach(level => {
            level.getChildByName('image').getComponent(Sprite).grayscale = true;
            level.getChildByName('ani_multiply').getComponent(sp.Skeleton).node.active = false;
        });

        this.node.active = true;
        this.node.scale = new Vec3(0.6, 0.6, 1);
        tween(this.node)
            .to(0.2, { scale: new Vec3(1.02, 1.02, 1) }, { easing: 'sineOut' })
            .to(0.2, { scale: new Vec3(1, 1, 1) }, { easing: 'sineIn' })
            .start();
        Utils.fadeIn(this.node, 0.2, 0, 255);
    }

    /**
     * 隱藏免費遊戲UI
     */
    private hide(): void {
        Utils.fadeOut(this.node, 0.2, 255, 0, () => {
            this.node.active = false;
        });
    }

    /**
     * 顯示移動分數
     * @param value 分數
     * @param startPos 起始位置
     * @param targetPos 目標位置
     * @param moveTime 移動時間
     */
    private showMoveScore(score: number, startPos: Vec3, targetPos: Vec3, moveTime: number): void {
        AudioManager.getInstance().playSound(AudioKey.wildFishMove);//拉線
        const moveScore = instantiate(this.moveScore);
        moveScore.setParent(this.node);
        moveScore.setPosition(startPos);
        moveScore.getChildByPath('numLayout/currency').getComponent(Label).string = Utils.getCurrencySymbol();
        moveScore.getChildByPath('numLayout/Label').getComponent(Label).string = Utils.numberFormat(score);
        tween(moveScore)
            .to(moveTime, { position: targetPos }, { easing: 'sineIn' })
            .call(() => {
                this.creatLight(new Vec3(targetPos.x, targetPos.y - 57, 0), 'hitbubble');
                // AudioManager.getInstance().playSound(AudioKey.wildCash);
                moveScore.destroy();
            })
            .start();
    }

    /**
     * 增加進度
     * @param id 進度ID
     * @param startPos 起始位置
     */
    private addProgress(id: number, startPos: Vec3, callback: () => void): void {
        if (id >= this.progressList.length) return;
        const progress = this.progressList[id];
        const endPos = progress.position;
        this.creatLight(startPos, 'light');

        const angle = Utils.calculateAngle(startPos, endPos);
        const moveFly = instantiate(this.multiplyFly);
        moveFly.setParent(this.node);
        moveFly.setPosition(startPos);
        moveFly.angle = angle;
        moveFly.getComponent(sp.Skeleton).setAnimation(0, 'fly', true);
        tween(moveFly)
            .to(0.4, { position: endPos }, { easing: 'sineOut' })
            .call(() => {
                AudioManager.getInstance().playSound(AudioKey.wildCount);
                moveFly.destroy();
                this.showNodeFx(progress, () => {
                    callback();
                });
                //判斷等級球是否顯示
                if (id === 3) {
                    this.showNodeFx(this.levelList[0]);
                    AudioManager.getInstance().playSound(AudioKey.wildMultWin);
                } else if (id === 7) {
                    this.showNodeFx(this.levelList[1]);
                    AudioManager.getInstance().playSound(AudioKey.wildMultWin);
                }
            })
            .start();
    }

    /**
     * 顯示節點特效
     * @param node 節點
     */
    private showNodeFx(node: Node, callback?: () => void): void {
        const aniMultiply = node.getChildByName('ani_multiply').getComponent(sp.Skeleton);
        aniMultiply.node.active = true;
        aniMultiply.setAnimation(0, 'light', false);
        aniMultiply.setCompleteListener(() => {
            aniMultiply.setCompleteListener(null);
            aniMultiply.node.active = false;
        });
        node.getChildByName('image').getComponent(Sprite).grayscale = false;
        tween(node)
            .to(0.2, { scale: new Vec3(1.3, 1.3, 1) }, { easing: 'sineOut' })
            .to(0.2, { scale: new Vec3(1, 1, 1) })
            .call(() => {
                callback?.();
            })
            .start();
    }

    /**
     * 創建閃光特效
     * @param pos 位置
     * @param animName 動畫名稱
     */
    private creatLight(pos: Vec3, animName: string): void {
        const light = instantiate(this.multiplyLight);
        light.setParent(this.node);
        light.setPosition(pos);
        light.getComponent(sp.Skeleton).setAnimation(0, animName, false);
        Utils.delay(0.4).then(() => {
            Utils.fadeOut(light, 0.2, 255, 0, () => {
                light.destroy();
            });
        });
        // light.getComponent(sp.Skeleton).setCompleteListener(() => {
        //     light.destroy();
        // });
    }

    onDestroy() {
        FreeGameUI.show.off(this);
        FreeGameUI.hide.off(this);
        FreeGameUI.showMoveScore.off(this);
        FreeGameUI.addProgress.off(this);
    }
}