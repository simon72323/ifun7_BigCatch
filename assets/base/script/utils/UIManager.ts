// import { KeyCode } from 'cc';

// import { AutoPage } from '@base/components/autoPage/AutoPage';
// import { BackGame } from '@base/components/backGame/BackGame';
// import { BetPage } from '@base/components/betPage/BetPage';
// import { GameHistory } from '@base/components/gameHistory/GameHistory';
// import { InfoBar } from '@base/components/infoBar/InfoBar';

// import { SettingsPage1 } from '@base/components/settingsPage/SettingsPage1';
// import { SettingsPage2 } from '@base/components/settingsPage/SettingsPage2';
// import { AudioKey } from '@base/script/audio/AudioKey';
// import { AudioManager } from '@common/script/manager/AudioManager';
// import { BaseEvent } from '@common/script/event/BaseEvent';
// import { ModuleID, SpinBtnState, TurboMode } from '@base/script/types/BaseType';
// import { APIManager } from '@base/script/utils/APIManager';

// import { Notice } from '@common/components/notice/Notice';
// import { DataManager } from '@common/script/data/DataManager';

// /**
//  * 共用UI管理
//  */
// export class UIManager {
//     private static instance: UIManager;

//     /**目前操作介面索引 */
//     private currentSettingPage = 0;

//     public static getInstance(): UIManager {
//         if (!UIManager.instance) {
//             UIManager.instance = new UIManager();
//         }
//         return UIManager.instance;
//     }

//     /**
//      * 初始化
//      */
//     public initialize(): void {
//         //遊戲開始再加入鍵盤監聽
//         BaseEvent.startGame.once(() => {
//             //SPACE等同Spin按鈕
//             BaseEvent.keyDown.on((keyCode: KeyCode) => {
//                 if (keyCode == KeyCode.SPACE || keyCode == KeyCode.ENTER) {
//                     this.onClickSpin();
//                 }
//             }, this);
//         }, this);

//         //操作介面一 ======================================================
//         //減號按鈕
//         SettingsPage1.clickLess.on(this.onClickLess, this);
//         //加號按鈕
//         SettingsPage1.clickPlus.on(this.onClickPlus, this);
//         //Turbo按鈕
//         SettingsPage1.clickTurbo.on(this.onClickTurbo, this);
//         //Spin按鈕
//         SettingsPage1.clickSpin.on(this.onClickSpin, this);
//         //自動按鈕
//         SettingsPage1.clickAuto.on(this.onClickAuto, this);
//         //Menu按鈕
//         SettingsPage1.clickMenu.on(() => {
//             this.changeSettingPage(1);
//         }, this);

//         //操作介面二 ======================================================
//         //操作介面2
//         SettingsPage2.clickCancel.on(() => {
//             this.changeSettingPage(0);
//         }, this);
//         SettingsPage2.clickHistory.on(this.goRecord, this);
//         SettingsPage2.clickHome.on(this.goHome, this);
//         SettingsPage2.clickVoice.on(this.onClickVoice, this);

//         //下注介面 ======================================================
//         //確認按鈕
//         BetPage.onBetCheck.on(() => {
//             this.refreshBet();
//         }, this);
//         //下注面板關閉
//         BetPage.onHide.on(() => {
//             DataManager.getInstance().isMenuOn = false;
//             InfoBar.moveToTop.emit();
//         }, this);

//         //自動面板 ======================================================
//         AutoPage.close.on(this.onAutoPageClosed, this);
//         AutoPage.choose.on(this.ChooseAutoOption, this);

//         //其他 ======================================================
//         //歷史紀錄提示
//         GameHistory.onHide.on(() => {
//             DataManager.getInstance().webViewVisible = false;
//         }, this);

//         //監聽點擊重新載入
//         // Notice.clickReload.on(() => {
//         //     window.location.reload();
//         // }, this);

//         //餘額資訊
//         InfoBar.clickBet.on(this.onClickBet, this);
//         InfoBar.clickWin.on(this.onClickWin, this);
//         BaseEvent.changeScene.on(this.onChangeScene, this);

//     }


//     //操作介面 =====================================================

//     /**
//      * 加速按鈕
//      * @returns 
//      */
//     private onClickTurbo(): void {
//         if (DataManager.getInstance().isMenuOn == true) return;
//         if (DataManager.getInstance().isBS() === false) return;

//         let newTurboMode;
//         switch (DataManager.getInstance().tempTurboMode) {
//             case TurboMode.Normal:
//                 newTurboMode = TurboMode.Quick;
//                 break;
//             case TurboMode.Quick:
//                 newTurboMode = TurboMode.Turbo;
//                 break;
//             case TurboMode.Turbo:
//                 newTurboMode = TurboMode.Normal;
//                 break;
//         }

//         SettingsPage1.setTurbo.emit(newTurboMode);
//         // Notice.showMode.emit(newTurboMode);

//         //待機狀態才能直接修改, 否則先存等到待機帶入
//         if (DataManager.getInstance().isIdle() === true) {
//             DataManager.getInstance().setTurboMode(newTurboMode);
//             DataManager.getInstance().tempTurboMode = newTurboMode;
//         }
//         else {
//             DataManager.getInstance().tempTurboMode = newTurboMode;
//         }
//     }

//     /**
//      * 減號按鈕
//      * @returns 
//      */
//     private onClickLess(): void {
//         if (DataManager.getInstance().isMenuOn == true) return;
//         if (DataManager.getInstance().isIdle() === false) return;
//         // DataManager.getInstance().bet.less();
//         this.refreshBet();
//     }

//     /**
//      * 加號按鈕
//      * @returns 
//      */
//     private onClickPlus(): void {
//         if (DataManager.getInstance().isMenuOn == true) return;
//         if (DataManager.getInstance().isIdle() === false) return;
//         // DataManager.getInstance().bet.plus();
//         this.refreshBet();
//     }


//     /**
//      * 點擊Spin
//      * @returns 
//      */
//     private onClickSpin() {
//         // if (this.currentSettingPage == 1) return;
//         // if (DataManager.getInstance().isMenuOn == true) return;

//         // //自動轉過程若點擊手動轉要停止自動
//         // if (DataManager.getInstance().auto.isAutoPlay() === true) {
//         //     DataManager.getInstance().auto.stopAuto();
//         //     return;
//         // }
//         // if (DataManager.getInstance().isIdle()) {
//         //     AudioManager.getInstance().play(AudioKey.SpinClick);
//         //     BaseEvent.clickSpin.emit(false);
//         // }
//         // else {
//         //     BaseEvent.clickSkip.emit();
//         // }
//     }

//     /**
//      * 點擊自動按鈕
//      * @returns 
//      */
//     private onClickAuto() {
//         // if (DataManager.getInstance().isMenuOn == true) return;

//         // //停止自動
//         // if (DataManager.getInstance().auto.isAutoPlay() == true) {

//         //     DataManager.getInstance().auto.stopAuto();
//         // }
//         // //開啟自動面板
//         // else if (DataManager.getInstance().isIdle() &&
//         //     DataManager.getInstance().auto.isAutoPlay() == false) {

//         //     //下注不足
//         //     if (DataManager.getInstance().bet.getCurTotal() < DataManager.getInstance().lawMinBet) {
//         //         let multi = DataManager.getInstance().featureBuyMultipleList[0];
//         //         let featureBuyTotal = DataManager.getInstance().bet.getRateAt(0) * DataManager.getInstance().bet.getBetAt(0) * multi;
//         //         if (featureBuyTotal < DataManager.getInstance().lawMinBet) {
//         //             featureBuyTotal = DataManager.getInstance().lawMinBet;
//         //         }
//         //         // Notice.showSpinMin.emit(featureBuyTotal, DataManager.getInstance().lawMinBet);
//         //     }
//         //     else {
//         //         DataManager.getInstance().isMenuOn = true;
//         //         AutoPage.open.emit();
//         //         InfoBar.moveToDown.emit();
//         //         SettingsPage1.showAutoPage.emit(true);
//         //     }
//         // }
//     }

//     /**
//      * 切換按鈕頁面
//      * @param page 
//      * @returns 
//      */
//     private changeSettingPage(page: number) {
//         if (DataManager.getInstance().isMenuOn == true) return;
//         if (DataManager.getInstance().autoMode == true) return;
//         if (DataManager.getInstance().isIdle() === false) return;
//         if (page === 0) {
//             this.currentSettingPage = 0;
//             SettingsPage1.fadeIn.emit();
//             SettingsPage2.fadeOut.emit();
//             BaseEvent.fadeInFeatureBuy.emit();
//         }
//         else if (page === 1) {
//             this.currentSettingPage = 1;
//             SettingsPage1.fadeOut.emit();
//             SettingsPage2.fadeIn.emit();
//             BaseEvent.fadeOutFeatureBuy.emit();
//         }
//     }

//     /**
//      * 點擊歷史紀錄
//      * @returns 
//      */
//     public goRecord() {
//         if (DataManager.getInstance().isMenuOn == true) return;
//         if (DataManager.getInstance().isIdle() === false) return;
//         if (DataManager.getInstance().autoMode == true) return;
//         GameHistory.show.emit(APIManager.getInstance().getRecordUrl());
//         DataManager.getInstance().webViewVisible = true;
//     }

//     /**
//      * 點擊Home鍵
//      * @returns 
//      */
//     public goHome() {
//         if (DataManager.getInstance().isMenuOn == true) return;
//         if (DataManager.getInstance().isIdle() === false) return;
//         APIManager.getInstance().goHome();

//         BackGame.show.emit();
//     }

//     /**
//      * 點擊音量按鈕
//      * @returns 
//      */
//     private onClickVoice() {
//         if (DataManager.getInstance().isMenuOn == true) return;
//         let newMute = !AudioManager.getInstance().getIsMute();
//         AudioManager.getInstance().setMute(newMute);
//         SettingsPage1.setMute.emit(newMute);
//         SettingsPage2.setMute.emit(newMute);
//     }

//     //自動轉介面 =====================================================
//     /**
//      * 自動轉介面關閉
//      */
//     private onAutoPageClosed() {
//         DataManager.getInstance().isMenuOn = false;
//         InfoBar.moveToTop.emit();
//         SettingsPage1.showAutoPage.emit(false);
//     }

//     private ChooseAutoOption(value: number) {
//         // if (value == 1) {
//         //     DataManager.getInstance().auto.mode = AutoPlayMode.always;
//         // }
//         // else if (value == 2) {
//         //     DataManager.getInstance().auto.mode = AutoPlayMode.tillBonus;
//         // }
//         // else if (value > 3) {
//         //     DataManager.getInstance().auto.mode = AutoPlayMode.num;
//         //     DataManager.getInstance().auto.num = Number(value) - 1;
//         // }

//         // SettingsPage1.setSpinState.emit(SpinBtnState.Auto);
//         // BaseEvent.clickSpin.emit(false);
//     }

//     //額度介面 =====================================================

//     /**
//      * INFOBar 
//      * @returns 
//      */
//     private onClickBet() {
//         if (DataManager.getInstance().isMenuOn == true) return;
//         if (DataManager.getInstance().isIdle() === false) return;

//         if (this.currentSettingPage === 1) {
//             this.currentSettingPage = 0;
//             SettingsPage1.show.emit();
//             SettingsPage2.hide.emit();
//             BaseEvent.fadeInFeatureBuy.emit();
//         }

//         BetPage.show.emit();

//         InfoBar.moveToDown.emit();
//     }

//     private onClickWin() {
//         if (DataManager.getInstance().isDemoMode() === true) return;
//         if (DataManager.getInstance().isMenuOn == true) return;
//         if (DataManager.getInstance().isIdle() === false) return;
//         this.goRecord();
//     }

//     /**
//      * 切換場景動畫
//      * @param id 
//      */
//     private onChangeScene(id: ModuleID) {
//         if (id === ModuleID.BS) {
//             InfoBar.moveToTop.emit();
//         }
//         else {
//             InfoBar.moveToDown.emit();
//         }
//     }

//     /**
//      * 刷新下注資訊
//      */
//     private refreshBet(): void {
//         // BaseEvent.refreshBet.emit(DataManager.getInstance().bet.getCurTotal());
//         // BaseEvent.buyFeatureVisible.emit(DataManager.getInstance().isFeatureBuyEnabled());

//         // SettingsPage1.lessEnabled.emit(DataManager.getInstance().bet.getLessEnabled());
//         // SettingsPage1.plusEnabled.emit(DataManager.getInstance().bet.getPlusEnabled());
//         // SettingsPage1.setEnabled.emit(true);
//     }
// }