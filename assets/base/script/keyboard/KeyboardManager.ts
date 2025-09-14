import { EventKeyboard, input, Input } from 'cc';

import { BaseDataManager } from '@base/script/main/BaseDataManager';
import { BaseEvent } from '@base/script/main/BaseEvent';

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
     * 
     */
    public initialize(): void {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    /**
     * 
     * @param event 
     */
    private onKeyDown(event: EventKeyboard) {

        if (BaseDataManager.getInstance().isBlockKeyboard() === true) {
            return;
        }

        BaseEvent.keyDown.emit(event.keyCode);
    }
}