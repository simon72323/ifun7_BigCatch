
import { _decorator, CCBoolean, Component, Node, Size, Sprite, SpriteFrame, UITransform, Vec3 } from 'cc';
import { EDITOR } from 'cc/env';

import { BaseEvent } from '@base/script/main/BaseEvent';
import { OrientationID } from '@base/script/types/BaseType';

const { ccclass, property } = _decorator;

/**
 * 直橫式節點搬移
 */
@ccclass('OrientationNode')
class OrientationNode {
    @property({ type: Node, tooltip: '目標節點' })
    public target: Node = null!;

    @property({ type: Node, tooltip: '直式位置節點' })
    public portraitPos: Node = null!;

    @property({ type: Node, tooltip: '橫式位置節點' })
    public landscapePos: Node = null!;
}

/**
 * 直橫式節點縮放
 */
@ccclass('OrientationScale')
class OrientationScale {
    @property({ type: Node, tooltip: '目標節點' })
    public target: Node = null!;

    @property({ type: Vec3, tooltip: '直式縮放比例' })
    public portraitScale: Vec3 = new Vec3(1, 1, 1);

    @property({ type: Vec3, tooltip: '橫式縮放比例' })
    public landscapeScale: Vec3 = new Vec3(1, 1, 1);
}

/**
 * 直橫式節點位置
 */
@ccclass('OrientationPosition')
class OrientationPosition {
    @property({ type: Node, tooltip: '目標節點' })
    public target: Node = null!;

    @property({ type: Vec3, tooltip: '直式位置' })
    public portraitPosition: Vec3 = new Vec3(0, 0, 0);

    @property({ type: Vec3, tooltip: '橫式位置' })
    public landscapePosition: Vec3 = new Vec3(0, 0, 0);
}

/**
 * 直橫式貼圖
 */
@ccclass('OrientationSpriteFrame')
class OrientationSpriteFrame {
    @property({ type: Node, tooltip: '目標節點' })
    public target: Node = null!;

    @property({ type: SpriteFrame, tooltip: '直式貼圖' })
    public portraitSpriteFrame: SpriteFrame = null!;

    @property({ type: SpriteFrame, tooltip: '橫式貼圖' })
    public landscapeSpriteFrame: SpriteFrame = null!;
}


@ccclass('OrientationManager')
export class OrientationManager extends Component {
    private _isLandscape: boolean = false;
    @property({ type: CCBoolean, tooltip: '是否切換為橫式' })
    get isLandscape(): boolean {
        return this._isLandscape;
    }

    set isLandscape(value: boolean) {
        if (this._isLandscape !== value) {
            this._isLandscape = value;
            // 在編輯器模式下觸發方向切換
            if (EDITOR) {
                this.onChangeOrientation(value ? OrientationID.Landscape : OrientationID.Portrait);
            }
        }
    }

    @property({ type: [OrientationNode], tooltip: '直橫式搬移控制' })
    private orientationNode: OrientationNode[] = [];

    @property({ type: [OrientationScale], tooltip: '直橫式縮放控制' })
    private orientationScale: OrientationScale[] = [];

    @property({ type: [OrientationPosition], tooltip: '直橫式位置控制' })
    private orientationPosition: OrientationPosition[] = [];

    @property({ type: [OrientationSpriteFrame], tooltip: '直橫式貼圖控制' })
    private orientationSpriteFrame: OrientationSpriteFrame[] = [];

    onLoad() {
        //監聽直橫式切換事件
        BaseEvent.changeOrientation.on(this.onChangeOrientation, this);
    }

    /**
     * 執行直橫式切換
     * @param orientation 
     */
    private onChangeOrientation(orientation: OrientationID) {
        //節點搬移
        this.orientationNode.forEach((node, index) => {
            const target = node.target;
            const portraitPos = node.portraitPos;
            const landscapePos = node.landscapePos;
            target.parent = orientation === OrientationID.Portrait ? portraitPos : landscapePos;
        });

        //節點縮放
        this.orientationScale.forEach((scale, index) => {
            const target = scale.target;
            const scaleValue = orientation === OrientationID.Portrait ? scale.portraitScale : scale.landscapeScale;
            if (target) {
                target.setScale(scaleValue);
            }
        });

        //節點位置
        this.orientationPosition.forEach((position, index) => {
            const target = position.target;
            const positionValue = orientation === OrientationID.Portrait ? position.portraitPosition : position.landscapePosition;
            if (target) {
                target.setPosition(positionValue);
            }
        });

        //節點貼圖
        this.orientationSpriteFrame.forEach((spriteFrame, index) => {
            const target = spriteFrame.target;
            const spriteFrameValue = orientation === OrientationID.Portrait ? spriteFrame.portraitSpriteFrame : spriteFrame.landscapeSpriteFrame;
            if (target) {
                target.getComponent(Sprite).spriteFrame = spriteFrameValue;
            }
        });
    }
}