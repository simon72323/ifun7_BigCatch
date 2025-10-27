import { _decorator, Component, sp } from 'cc';

import { XEvent } from '@common/script/event/XEvent';

const { ccclass, property } = _decorator;
@ccclass('CharacterUI')
export class CharacterUI extends Component {
    public static win: XEvent = new XEvent();
    public static idle: XEvent = new XEvent();
    private ani_character: sp.Skeleton;

    onLoad() {
        this.ani_character = this.node.getChildByPath('mask/ani_character').getComponent(sp.Skeleton);
        CharacterUI.win.on(this.win, this);
        CharacterUI.idle.on(this.idle, this);
    }

    private win(): void {
        this.ani_character.setAnimation(0, 'win', true);
    }

    private idle(): void {
        this.ani_character.setAnimation(0, 'idle', true);
    }

    onDestroy() {
        CharacterUI.win.off(this);
    }
}