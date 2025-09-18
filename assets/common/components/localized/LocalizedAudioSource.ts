/**
 * 使用步驟：
 * 1. 將此組件直接掛載在包含 cc.AudioSource 組件的節點上
 * 2. 設置對應的資源路徑folderPath
 * 3. 確保 LanguageManager 已設置bundleName
 */
import { _decorator, AudioSource, Component } from 'cc';

import { LanguageManager } from '@common/script/manager/LanguageManager';
const { ccclass, property } = _decorator;

@ccclass('LocalizedAudioSource')
export class LocalizedAudioSource extends Component {
    @property({ tooltip: 'bundle語系名稱下的資源路徑' })
    public folderPath: string = '';

    onEnable() {
        this.setAudioClip();//啟動時設置音效語系
    }

    //設置audio資源，由LanguageManager觸發
    public async setAudioClip() {
        if (this.folderPath === '') return;
        const audioSource = this.getComponent(AudioSource);
        if (audioSource) {
            audioSource.clip = await LanguageManager.getInstance().getAudioClip(this.folderPath);
        }
    }
}