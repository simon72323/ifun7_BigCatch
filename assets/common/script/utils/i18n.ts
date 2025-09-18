import { _decorator, Component, JsonAsset, Enum, Label, Vec3 } from 'cc';
import { EDITOR, PREVIEW } from 'cc/env';

import { delay } from '@base/script/utils/XUtils';

import { LanguageLabel } from '@common/components/localized/LanguageLabel';

// import { Utils } from './Utils';
const { ccclass, property, menu, help, disallowMultiple, executeInEditMode } = _decorator;

export enum PREVIEW_LANGUAGE {
    'en',
    'zh-cn',
    'id',
    'ko',
    'vi',
    'th',
    'ms',
    'ph',
}

export var PreviewValue = ['en', 'zh-cn', 'id', 'ko', 'vi', 'th', 'ms', 'ph'];


@ccclass('i18nLanguageData')
export class i18nLanguageData {
    @property({ displayName: 'ID' })
    public id = '';

    @property({ type: JsonAsset, displayName: 'JsonFile' })
    public jsonFile: JsonAsset;


    @property({ displayName: '下載多國語言設定', group: { name: 'Develop', id: 'develop' } })
    public set downloadLanguageButton(value: boolean) {
        if (!EDITOR) return;
        i18n.EditDownloadJson(this);
    }

    public get downloadLanguageButton(): boolean { return false; }

    @property({ displayName: 'ProdPath' })
    public prodPath = '';

}

@ccclass('i18n')
@disallowMultiple(true)
@menu('SlotMachine/i18n/i18n')
// @help('https://docs.google.com/document/d/1dphr3ShXfiQeFBN_UhPWQ2qZvvQtS38hXS8EIeAwM-Q/edit#heading=h.dwwq3zul0c5a')
@executeInEditMode(true)
export class i18n extends Component {
    public static instance: i18n;
    public static language: {};
    public static languageType: string = 'en';
    public static getLanguage() { return i18n.languageType; }
    public static setLanguage(value: string) { i18n.languageType = value; }
    private static labelContents: LanguageLabel[] = [];//label的組件

    @property({ type: [i18nLanguageData], displayName: 'JsonDataList', group: { name: 'setting', id: '0' } })
    public languageData: i18nLanguageData[] = [];

    @property({ displayName: '下載Json API網址', group: { name: 'develop', id: '1' } })
    public editDownloadJsonURL = 'https://www.google.com/url?q=https://script.google.com/a/macros/ideatek.tech/s/AKfycbwHQEm5vUzr4ByllvzTKwpJlNQ9Ju_fwQRLyLgbvmGk43qyLF92MI5oim2hbJbH8O68NQ/exec';

    @property({ type: Enum(PREVIEW_LANGUAGE), displayName: '預覽語言', group: { name: 'develop', id: '1' } })
    public previewLanguage: PREVIEW_LANGUAGE = PREVIEW_LANGUAGE.en;

    public isLoadDone = false;
    public fontSizeGroupData: { [key: string]: { 'labels': LanguageLabel[], 'size': number } } = {};


    /**
     * 下載多國語言設定
     * @param data 
     */
    public static EditDownloadJson(data: i18nLanguageData) {
        if (!EDITOR) return;
        if (i18n.instance.editDownloadJsonURL == null) return;
        let url = i18n.instance.editDownloadJsonURL + '?download=1&gameID=' + data.id;
        console.log('EditDownloadJson', url);
        window.open(url);
    }

    public onLoad() {
        i18n.instance = this;
        this.loadLanguage();

        if (!EDITOR) return;
        console.log('i18n', PreviewValue[this.previewLanguage]);
    }

    /**
     * 載入多國語言設定
     */
    public async loadLanguage() {
        i18n.language = {};
        for (let idx in this.languageData) {
            const data = this.languageData[idx];
            // const domain = PREVIEW ? 'gc.prep.lab' : window.location.hostname;
            // const protocol = window.location.protocol === 'https:' ? 'https://' : 'http://';
            // const jsonPath = `${protocol}${domain}/${data.prodPath}`;

            if (data.id.length === 0) continue;
            // if (data.jsonFile == null) continue;
            if (i18n.language[data.id] != null) continue;

            // console.log('jsonPath', jsonPath);
            // let jsonData = null;
            // 從 jsonPath 取得 json 資料
            // try {
            //     console.log('取得網路 json 資料');
            //     jsonData = await fetch(jsonPath).then(res => res.json());
            //     this.parseLanguage(data.id, jsonData);
            //     console.log('取得網路 json 資料成功:', jsonPath);
            // } catch (error) {
            //     jsonData = null;
            // }

            // if (jsonData === null) { // 如果沒有取得 json 資料，則使用 resources 中的 JsonAsset
            console.log('data.jsonFile', data.jsonFile);
            this.parseLanguage(data.id, data.jsonFile);
            continue;
            // }
        }

        this.isLoadDone = true;
        i18n.refreshLanguageContent();
        console.log('i18n 資料載入完成');
    }

    /**
     * 解析多國語言設定
     * @param id 
     * @param data 
     */
    // public parseLanguage(id: string, data: any) {
    //     if (i18n.language[id] == null) i18n.language[id] = {};
    //     if (data == null || data.json == null) return;
    //     let lanKeys = Object.keys(data.json);
    //     for (let i in lanKeys) {
    //         let lan = lanKeys[i];
    //         // console.log('lan', lan);
    //         let ids = Object.keys(data.json[lan]);
    //         if (i18n.language[id][lan] == null) i18n.language[id][lan] = {};
    //         // console.log('i18n.language222222', i18n.language);
    //         // console.log('ids', ids);
    //         for (let j in ids) {
    //             let id = ids[j];
    //             console.log('id', id);
    //             let no = parseInt(ids[j]);
    //             console.log('no', no);
    //             i18n.language[id][lan][no] = data.json[lan][id];
    //             // console.log('i18n.language', i18n.language);
    //         }
    //     }
    // }

    /**
     * 解析多國語言設定(修正key衝突)
     * 變數名稱衝突：迴圈中的 let id = ids[j] 覆蓋了函數參數 id
錯誤的索引：i18n.language[id][lan][no] 中的 id 現在是 ids[j] 的值，而不是原本的 id 參數
     * @param id 
     * @param data 
     */
    public parseLanguage(id: string, data: any) {
        if (i18n.language[id] == null) i18n.language[id] = {};
        if (data == null || data.json == null) return;
        let lanKeys = Object.keys(data.json);
        for (let i in lanKeys) {
            let lan = lanKeys[i];
            let ids = Object.keys(data.json[lan]);
            if (i18n.language[id][lan] == null) i18n.language[id][lan] = {};
            for (let j in ids) {
                let keyId = ids[j];  // 改為 keyId 避免衝突
                console.log('keyId', keyId);
                let no = parseInt(ids[j]);
                console.log('no', no);
                i18n.language[id][lan][no] = data.json[lan][keyId];  // 使用正確的變數
            }
        }
    }

    /**
     * 取得文字
     * @param key 獲取json檔的key
     * @param id 語系數字id
     * @param label label的組件
     * @returns 
     */
    public static getContent(key: string, id: number, label: LanguageLabel = null): string {
        if (!key || key.length == 0) return null;

        if (i18n.instance.isLoadDone !== true) {
            if (label == null) return null;
            i18n.labelContents.push(label);
            return null;
        }

        if (id === 0) return null;
        if (i18n.language == null) return null;
        if (i18n.language[key] == null) return null;

        let type = (EDITOR) ? PreviewValue[i18n.instance.previewLanguage] : i18n.languageType;
        if (i18n.language[key][type] == null) type = 'en';

        if (i18n.language[key][type] == null) {
            console.error('i18n', 'Can not find language id', key, id, type);
            return null;
        }

        i18n.instance.checkFontSize(label);
        return i18n.language[key][type][id];
    }

    /**
     * 檢查字體大小
     * @param label label的組件
     */
    private async checkFontSize(label: LanguageLabel) {
        if (EDITOR) return;
        if (label == null) return;
        if (label.fontSizeGroupName == null || label.fontSizeGroupName.length == 0) return;

        await delay(100);
        console.log('checkFontSize', label.fontSizeGroupName, label.actualFontSize);
        let key = label.fontSizeGroupName;
        if (i18n.instance.fontSizeGroupData[key] == null) {
            i18n.instance.fontSizeGroupData[key] = { 'labels': [], 'size': label.actualFontSize };
        }

        i18n.instance.fontSizeGroupData[key].labels.push(label);

        if (i18n.instance.fontSizeGroupData[key].size > label.actualFontSize) {
            i18n.instance.fontSizeGroupData[key].size = label.actualFontSize;
            for (let label of i18n.instance.fontSizeGroupData[key].labels) {
                const l = label as Label;
                l.fontSize = i18n.instance.fontSizeGroupData[key].size;
            }
        } else {
            label.fontSize = i18n.instance.fontSizeGroupData[key].size;
        }
    }

    /**
     * 刷新多國語言內容
     */
    private static refreshLanguageContent() {
        if (i18n.labelContents.length == 0) return;

        for (let label of i18n.labelContents) {
            let content = i18n.getContent(label.key, label.languageID, label);
            if (content == null) continue;
            label.string = content;
        }
        i18n.labelContents = [];
    }

    /**
     * 初始化多國語言
     * @param language 語系
     */
    public static init(language: string) {
        i18n.languageType = language;
    }
}
