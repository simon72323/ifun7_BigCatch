// /**
//  * 使用步驟：
//  * 1. 將此組件直接掛載在包含 cc.Label 組件的節點上
//  * 2. 設置對應的語系資源key(通常是語系檔案名)，設置languageID(數字格式)
//  * 3. 確保 i18n 已設置languageData
//  */
// import { _decorator, CCInteger, Component, Label } from 'cc';

// import { i18n } from '@common/script/utils/i18n';

// const { ccclass, property, executeInEditMode } = _decorator;
// @ccclass('LocalizedLabel')
// @executeInEditMode(true)
// export class LocalizedLabel extends Component {
//     @property({ displayName: 'LanguageKey' })
//     private languageKey = 'default';

//     @property({ displayName: 'LanguageID', type: CCInteger })
//     private languageID = 0;

//     // @property({ displayName: '刷新語系文字' })
//     // public set getMessage(value: boolean) { this.displayContent(); }

//     // public get getMessage(): boolean { return false; }

//     // onEnable() {
//     //     this.displayContent();
//     // }

//     /**
//      * 顯示文字
//      * @returns 
//      */
//     // public displayContent() {
//     //     if (this.languageKey == null || this.languageKey.length == 0) return;
//     //     const label = this.getComponent(Label);
//     //     let content = i18n.getContent(this.languageKey, this.languageID, label);
//     //     if (content == null || content.length == 0) return;
//     //     label.string = content;
//     // }
// }