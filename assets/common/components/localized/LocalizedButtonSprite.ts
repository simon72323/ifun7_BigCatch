/**
 * 使用步驟：
 * 1. 將此組件掛載在包含 Sprite 組件的節點上
 * 2. 在屬性檢查器中設置：
 *    - upSpritePath: 一般狀態圖片路徑
 *    - downSpritePath: 按下狀態圖片路徑
 *    - hoverSpritePath: 懸停狀態圖片路徑
 *    - disableSpritePath: 禁用狀態圖片路徑
 *    - button: 需要控制的按鈕組件
 * 3. 確保 LanguageManager 已設置bundleName
 */
import { _decorator, Button, CCString, Component, NodeEventType, Sprite } from 'cc';

import { LanguageManager } from '@common/script/manager/LanguageManager';
const { ccclass, property } = _decorator;

@ccclass('LocalizedButtonSprite')
export class LocalizedButtonSprite extends Component {
    @property(CCString)
    public upSpritePath: string = '';

    @property(CCString)
    public downSpritePath: string = '';

    @property(CCString)
    public hoverSpritePath: string = '';

    @property(CCString)
    public disableSpritePath: string = '';

    @property({ type: Button, tooltip: '主要按鈕' })
    public button: Button = null!;

    private isPressed: boolean = false;//紀錄是否按下狀態
    private originalUpdateState: (() => void) | null = null; // 添加這個屬性來存儲原始函數

    protected onEnable() {
        this.updateSpriteFrame();//初始化圖片
        this.originalUpdateState = this.button['_updateState'].bind(this.button);//保存原始的 _updateState
        //重寫 _updateState
        const updateStateWrapper = () => {
            if (this.originalUpdateState) {
                this.originalUpdateState();
                this.updateSpriteFrame();
            }
        };
        this.button['_updateState'] = updateStateWrapper;//重寫 _updateState
        // 添加滑鼠進入事件監聽
        this.button.node.on(NodeEventType.MOUSE_ENTER, this.updateSpriteFrame.bind(this));
        this.button.node.on(NodeEventType.MOUSE_LEAVE, this.updateSpriteFrame.bind(this));
    }

    protected onDisable() {
        this.button.node.off(NodeEventType.MOUSE_ENTER, this.updateSpriteFrame.bind(this));
        this.button.node.off(NodeEventType.MOUSE_LEAVE, this.updateSpriteFrame.bind(this));
        //恢復原始的 _updateState
        if (this.originalUpdateState) {
            this.button['_updateState'] = this.originalUpdateState;
            this.originalUpdateState = null;
        }
    }

    /**
     * 當按鈕狀態改變時，設置sprite資源
     */
    public updateSpriteFrame() {
        const button = this.button as any;
        if (!this.button.interactable) {
            // 禁用狀態
            this.setSpriteFrame(this.disableSpritePath);
        } else if (button._pressed) {
            // 按下狀態
            if (button._hovered) {
                // 在按鈕區內
                this.setSpriteFrame(this.downSpritePath);
            } else {
                // 在按鈕區外(如果回到按鈕區，要再判斷是否處於按下階段)
                const name = this.isPressed ? this.downSpritePath : this.upSpritePath;
                this.setSpriteFrame(name);
                this.isPressed = !this.isPressed;
            }
        } else if (button._hovered) {
            // 懸停狀態
            this.setSpriteFrame(this.hoverSpritePath);
        } else {
            // 一般狀態
            this.setSpriteFrame(this.upSpritePath);
            this.isPressed = false;
        }
    }

    /**
     * 設置sprite資源
     */
    private async setSpriteFrame(spritePath: string) {
        if (spritePath === '') {
            // console.error('Sprite name is empty');
            return;
        }
        const sprite = this.getComponent(Sprite);
        if (sprite) {
            sprite.spriteFrame = await LanguageManager.getInstance().getSpriteFrame(spritePath);
        }
    }
}