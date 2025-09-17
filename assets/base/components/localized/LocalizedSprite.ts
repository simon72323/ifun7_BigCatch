/**
 * 使用步驟：
 * 1. 將此組件直接掛載在包含 cc.Sprite 組件的節點上
 * 2. 設置對應的資源路徑folderPath
 * 3. 確保 LanguageManager 已設置bundleName
 */
import { _decorator, Component, Sprite } from 'cc';

import { LanguageManager } from '../../script/utils/LanguageManager';
const { ccclass, property } = _decorator;

@ccclass('LocalizedSprite')
export class LocalizedSprite extends Component {
    @property({ tooltip: 'bundle語系名稱下的資源路徑' })
    public folderPath: string = '';

    onEnable() {
        this.setSpriteFrame();//啟動時設置圖片語系
    }

    //設置sprite資源，LanguageManager會觸發
    public async setSpriteFrame() {
        if (this.folderPath === '') return;
        const sprite = this.getComponent(Sprite);
        if (sprite) {
            sprite.spriteFrame = await LanguageManager.getInstance().getSpriteFrame(this.folderPath);
        }
    }
}