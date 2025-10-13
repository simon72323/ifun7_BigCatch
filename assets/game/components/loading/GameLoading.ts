// import { _decorator, AudioSource, Button, Node, Sprite } from 'cc';

// import { BaseGameLoading } from '@base/components/loading/BaseGameLoading';

// // import { BaseConst } from '@common/script/data/BaseConst';
// // import { DataManager } from '@common/script/data/DataManager';;
// import { BaseEvent } from '@common/script/event/BaseEvent';
// // import { BundleLoader } from '@base/script/main/BundleLoader';

// const { ccclass } = _decorator;

// @ccclass('GameLoading')
// export class GameLoading extends BaseGameLoading {

//     /**開始遊戲按鈕(就算沒讀取完成也允許點擊) */
//     // private container: Node = null;
//     private btnStart: Node = null;

//     onLoad() {
//         this.btnStart = this.node.getChildByPath('BtnStart');
//         // const loadingBg = this.node.getChildByName('LoadingBg');
//         // const button = this.btnStart.getComponent(Button);

//         //加載多語系圖片
//         // let dir: string = DataManager.getInstance().urlParam.lang + '/' + BaseConst.DIR_LOADING;
//         // BundleLoader.onLoaded(BaseConst.BUNDLE_LANGUAGE, dir, (langRes: any) => {
//         //     loadingBg.getComponent(Sprite).spriteFrame = langRes['background_loading'];
//         //     button.normalSprite = langRes['start_btn_N'];
//         //     let btnDown = langRes['start_btn_H'];
//         //     button.pressedSprite = btnDown;
//         //     button.disabledSprite = btnDown;
//         // });

//         //點擊按鈕
//         this.btnStart.on(Button.EventType.CLICK, () => {
//             this.getComponent(AudioSource).play();
//             BaseEvent.clickStart.emit();
//         }, this);

//         this.btnStart.active = false;
//     }

//     /**
//      * 啟用開始按鈕
//      */
//     public showButton(): void {
//         this.btnStart.active = true;
//     }
// }