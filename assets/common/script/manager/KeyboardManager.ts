import { EventKeyboard, input, Input } from 'cc';

import { DataManager } from '@common/script/data/DataManager';
import { BaseEvent } from '@common/script/event/BaseEvent';



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

        if (DataManager.getInstance().isBlockKeyboard() === true) {
            return;
        }

        BaseEvent.keyDown.emit(event.keyCode);
    }
}