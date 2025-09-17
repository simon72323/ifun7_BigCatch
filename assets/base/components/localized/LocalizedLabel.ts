/**
 * 使用步驟：
 * 1. 將此組件直接掛載在包含 cc.Label 組件的節點上
 * 2. Label.string 設置對應的資源路徑key
 * 3. 確保 LanguageManager 已設置bundleName
 */
import { _decorator, Component, Label } from 'cc';

import { LanguageManager } from '../../script/utils/LanguageManager';
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