import { EventKeyboard, input, Input } from 'cc';

import { DataManager } from 'db://assets/common/script/data/DataManager';
import { BaseEvent } from 'db://assets/common/script/event/BaseEvent';

/**
 * 鍵盤控制器
 */
export class KeyboardManager {
    private static instance: KeyboardManager;
    public static getInstance(): KeyboardManager {
        if (!KeyboardManager.instance) {
            KeyboardManager.instance = new KeyboardManager();
        }
        return KeyboardManager.instance;
    }

    constructor() {
    }

    /**
     * 初始化
     */
    public initialize(): void {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    /**
     * 按下鍵盤
     * @param event 事件
     */
    private onKeyDown(event: EventKeyboard) {

        if (DataManager.getInstance().lockKeyboard
            || DataManager.getInstance().isAutoMode
            || !DataManager.getInstance().isMG()) {
            return;
        }

        BaseEvent.keyDown.emit(event.keyCode);
    }
}