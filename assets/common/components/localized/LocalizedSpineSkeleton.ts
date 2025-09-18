/**
 * 使用步驟：
 * 1. 將此組件直接掛載在包含 cc.sp.Skeleton 組件的節點上
 * 2. 設置對應的資源路徑folderPath
 * 3. 確保 LanguageManager 已設置bundleName
 */
import { _decorator, Component, sp } from 'cc';

import { LanguageManager } from '@common/script/manager/LanguageManager';
const { ccclass, property } = _decorator;

@ccclass('LocalizedSpineSkeleton')
export class LocalizedSpineSkeleton extends Component {
    @property({ tooltip: 'bundle語系名稱下的資源路徑' })
    public folderPath: string = '';

    onEnable() {
        this.setSpineSkeleton();//啟動時設置spine語系
    }

    //設置spine資源，由LanguageManager觸發
    public async setSpineSkeleton() {
        if (this.folderPath === '') return;
        const skeleton = this.getComponent(sp.Skeleton);
        if (skeleton) {
            skeleton.skeletonData = await LanguageManager.getInstance().getSkeletonData(this.folderPath);
        }
    }
}