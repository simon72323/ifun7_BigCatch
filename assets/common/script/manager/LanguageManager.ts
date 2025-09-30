/**
 * 語系管理器 (LanguageManager) - 加載與管理遊戲多語言資源
 * 
 * 使用方式：
 * 1. 遊戲開始前需先設置遊戲名稱：LanguageManager.loadLanguageBundle('遊戲名稱');
 * 
 * 2. 獲取語系翻譯文本：
 *    const data = await LanguageManager.getInstance().getLanguageData('key語系標籤');
 * 
 * 3. 獲取語系圖片：
 *    const spriteFrame = await LanguageManager.getInstance().getSpriteFrame('圖片路徑');
 * 
 * 4. 獲取語系音效：
 *    const audioClip = await LanguageManager.getInstance().getAudioClip('音效路徑');
 * 
 * 5. 獲取語系skeletonData：
 *    const skeletonData = await LanguageManager.getInstance().getSkeletonData('spine路徑');
 */
import { _decorator, SpriteFrame, AudioClip, Component, Node, director, sp, AssetManager, assetManager, JsonAsset } from 'cc';

// import { LocalizedAudioSource } from '../../components/localized/LocalizedAudioSource';
// import { LocalizedButtonSprite } from '../../components/localized/LocalizedButtonSprite';
// import { LocalizedLabel } from '../../components/localized/LocalizedLabel';
// import { LocalizedSpineSkeleton } from '../../components/localized/LocalizedSpineSkeleton';
// import { LocalizedSprite } from '../../components/localized/LocalizedSprite';
import { DataManager } from '@common/script/data/DataManager';
// import { Logger } from '@base/script/utils/Logger';
// import { UrlHelper } from '@base/script/utils/UrlHelper';

const { ccclass } = _decorator;

@ccclass('LanguageManager')
export class LanguageManager extends Component {
    private static _instance: LanguageManager | null = null;
    private _bundleName: string = '';

    /**
     * 獲取實例
     * @param bundleName 遊戲名稱
     * @returns 實例
     */
    public static getInstance(): LanguageManager {
        if (!LanguageManager._instance) {
            const node = new Node('LanguageManager');
            director.getScene()!.addChild(node);
            director.addPersistRootNode(node);
            LanguageManager._instance = node.addComponent(LanguageManager);
        }
        return LanguageManager._instance;
    }

    /**
     * 加載語言包
     * @param bundleName bundle名稱
     */
    public static async loadLanguageBundle(bundleName: string) {
        // 確保實例存在
        if (!LanguageManager._instance) {
            LanguageManager._instance = LanguageManager.getInstance();
        }
        LanguageManager._instance!._bundleName = bundleName;
        await LanguageManager._instance!.getBundle();
        console.log('語言包加載完成', bundleName);
        // LanguageManager.setBundleName(bundleName);
    }


    /**
     * 設置語言包
     * @param bundleName 語言包名稱
     */
    // private static setBundleName(bundleName: string) {
    //     LanguageManager._instance!._bundleName = bundleName;
    //     // LanguageManager._instance!.updateAllLocalizedComponents();
    // }

    /**
     * 更新場景下的所有Localized組件
     */
    // private updateAllLocalizedComponents() {
    //     // 更新場景下的spineSkeleton
    //     const localizedSpines = director.getScene()!.getComponentsInChildren(LocalizedSpineSkeleton);
    //     for (const spine of localizedSpines) {
    //         spine.setSpineSkeleton();
    //     }
    //     // 更新場景下的audioSource
    //     const localizedAudio = director.getScene()!.getComponentsInChildren(LocalizedAudioSource);
    //     for (const audio of localizedAudio) {
    //         audio.setAudioClip();
    //     }
    //     // 更新場景下的spriteFrame
    //     const localizedSprites = director.getScene()!.getComponentsInChildren(LocalizedSprite);
    //     for (const sprite of localizedSprites) {
    //         sprite.setSpriteFrame();
    //     }
    //     // 更新場景下的spriteButton
    //     const localizedSpriteButtons = director.getScene()!.getComponentsInChildren(LocalizedButtonSprite);
    //     for (const spriteButton of localizedSpriteButtons) {
    //         spriteButton.updateSpriteFrame();
    //     }
    //     // 更新場景下的label
    //     const localizedLabels = director.getScene()!.getComponentsInChildren(LocalizedLabel);
    //     for (const label of localizedLabels) {
    //         label.setLabel();
    //     }
    // }

    /**
     * 釋放資源
     */
    protected onDestroy() {
        if (this !== LanguageManager._instance)
            return;
        LanguageManager._instance = null;
    }

    /**
     * 獲取語系翻譯資料(語系.json)
     * @param key 語系翻譯資料key
     * @returns 語系翻譯資料
     */
    public async getLanguageData(key: string): Promise<any> {
        return new Promise(async resolve => {
            const bundle = await this.getBundle();
            const lang = DataManager.getInstance().urlParam.lang;
            const langPath = `${lang}/${lang}`;
            const defaultPath = 'en/en';
            const languageData = bundle?.get(langPath, JsonAsset) || bundle?.get(defaultPath, JsonAsset);//語系.json
            if (languageData) {
                resolve(languageData.json);
            } else {
                console.error(`無法獲取${lang}語系翻譯資料: ${langPath}`);
            }
        });
    }

    /**
     * 取得遊戲語系spriteFrame
     * @param folderPath 資料夾名稱(預設為gameCore)
     * @returns spriteFrame
     */
    public async getSpriteFrame(folderPath: string): Promise<SpriteFrame> {
        return new Promise(async resolve => {
            const bundle = await this.getBundle();
            console.log('bundle', bundle);
            const lang = DataManager.getInstance().urlParam.lang;
            const langPath = `${lang}/${folderPath}/spriteFrame`;
            const defaultPath = `eng/${folderPath}/spriteFrame`;
            const spriteFrame = bundle?.get(langPath, SpriteFrame) || bundle?.get(defaultPath, SpriteFrame);
            if (spriteFrame) {
                resolve(spriteFrame);
            } else {
                console.error(`無法獲取${lang}語系SpriteFrame: ${langPath}`);
            }
        });
    }

    /**
     * 取得語系audioClip
     * @param folderPath 資料夾名稱(預設為gameCore)
     * @returns audioClip
     */
    public async getAudioClip(folderPath: string): Promise<AudioClip> {
        return new Promise(async resolve => {
            const bundle = await this.getBundle();
            const lang = DataManager.getInstance().urlParam.lang;
            const langPath = `${lang}/${folderPath}`;
            const defaultPath = `eng/${folderPath}`;
            const audioClip = bundle?.get(langPath, AudioClip) || bundle?.get(defaultPath, AudioClip);
            if (audioClip) {
                resolve(audioClip);
            } else {
                console.error(`無法獲取${lang}語系AudioClip: ${langPath}`);
            }
        });
    }

    /**
     * 取得遊戲語系spineSkeletonData
     * @param folderPath 資料夾名稱(預設為gameCore)
     * @returns spineSkeletonData
     */
    public async getSkeletonData(folderPath: string): Promise<sp.SkeletonData> {
        return new Promise(async resolve => {
            const bundle = await this.getBundle();
            const lang = DataManager.getInstance().urlParam.lang;
            const langPath = `${lang}/${folderPath}`;
            const defaultPath = `eng/${folderPath}`;
            const skeletonData = bundle?.get(langPath, sp.SkeletonData) || bundle?.get(defaultPath, sp.SkeletonData);
            if (skeletonData) {
                resolve(skeletonData);
            } else {
                console.error(`無法獲取${lang}語系spineSkeleton: ${langPath}`);
            }
        });
    }

    /**
     * 獲取遊戲bundle
     * @returns bundle
     */
    private async getBundle(): Promise<AssetManager.Bundle | null> {
        if (!this._bundleName) {
            // Logger.error('Game name is not set');
            return null;
        }
        const existingBundle = assetManager.getBundle(this._bundleName);
        if (existingBundle) {
            return existingBundle;
        }

        return new Promise(resolve => {
            assetManager.loadBundle(this._bundleName, (err, bundle) => {
                if (err) {
                    console.error(`無法獲取${this._bundleName} bundle: ${err}`);
                    return;
                }
                resolve(bundle);
            });
        });
    }
}