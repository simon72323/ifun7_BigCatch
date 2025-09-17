/**
 * 【LocalizedLabel 使用說明】
 * 
 * 功能說明：
 * - 自動根據設定的 key 值從 LanguageManager 獲取對應的多語言文本
 * - 如果勾選isLoading，則會從 loadingPage 資料夾中獲取文本，否則從 gameCore 資料夾中獲取文本
 * 
 * 使用步驟：
 * 1. 將此組件直接掛載在包含 cc.Label 組件的節點上
 * 2. 在屬性檢查器中設置對應的語言 key 值
 * 3. 確保 LanguageManager 中已經載入了對應的語言配置
 * 
 * 注意事項：
 * - key 值不能為空
 * - 節點必須包含 cc.Label 組件
 * - 依賴 LanguageManager 的正確初始化
 */
import { _decorator, Component, Label } from 'cc';

import { LanguageManager } from '@base/script/utils/LanguageManager';
const { ccclass, property } = _decorator;

@ccclass('LocalizedLabel')
export class LocalizedLabel extends Component {

    onEnable() {
        this.setLabel();//啟動時設置label語系
    }

    //設置label資源，由LanguageManager觸發
    public async setLabel() {
        const label = this.getComponent(Label);
        if (label) {
            const key = label.string;
            if (key === '') return;
            const languageData = await LanguageManager.getInstance().getLanguageData(key);
            label.string = languageData;
        }
    }
}