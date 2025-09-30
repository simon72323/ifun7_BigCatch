import { _decorator, Button, Color, Component, Input, Label, Sprite, SpriteFrame } from 'cc';

import { XEvent1 } from '@common/script/event/XEvent';
const { ccclass, property } = _decorator;

@ccclass('AutoOption')
export class AutoOption extends Component {

    private static NORMAL_COLOR = Color.fromHEX(new Color(), '#777777');
    private static SELECT_COLOR = Color.fromHEX(new Color(), '#ffc258');

    @property({ type: SpriteFrame })
    private normal: SpriteFrame;

    @property({ type: SpriteFrame })
    private over: SpriteFrame;

    /** 選定次數 */
    public static select: XEvent1<number> = new XEvent1();

    private value: number = -1;

    start() {
        //點擊
        this.node.on(Button.EventType.CLICK, (e) => {
            AutoOption.select.emit(this.value);
        }, this);

        this.node.on(Input.EventType.TOUCH_START, (e) => {
            e.currentTarget.getChildByName('Label').getComponent(Label).color = AutoOption.SELECT_COLOR;
            e.currentTarget.getComponent(Sprite).spriteFrame = this.over;
        });

        this.node.on(Input.EventType.TOUCH_CANCEL, (e) => {
            e.currentTarget.getChildByName('Label').getComponent(Label).color = AutoOption.NORMAL_COLOR;
            e.currentTarget.getComponent(Sprite).spriteFrame = this.normal;

        });
    }

    public setValue(value: number) {
        this.value = value;
        this.node.getChildByName('Label').getComponent(Label).string = value.toString();
    }

    update(deltaTime: number) {

    }
}

