
// import { BannerUI } from '@game/components/BannerUI/BannerUI';

// import { Notice } from '@common/components/notice/Notice';
// import { SettingsController } from '@common/components/settingsController/SettingsController';
// import { SlotMachine } from '@common/components/slotMachine/SlotMachine';

// import { DataManager } from '@common/script/data/DataManager';
// import { BaseEvent } from '@common/script/event/BaseEvent';
// import { AudioKey } from '@common/script/manager/AudioKey';
// import { AudioManager } from '@common/script/manager/AudioManager';
// import { NetworkManager } from '@common/script/network/NetworkManager';


// import { GameTask } from '@common/script/tasks/GameTask';
// import { ModuleID, TurboMode } from '@common/script/types/BaseType';


// /**
//  * 初始狀態，等待Spin請求回傳
//  */
// export class IdleSpinTask extends GameTask {

//     protected name: string = 'IdleSpinTask';

//     execute(): void {
//         console.log('========================================= 新局開始,等待Spin =========================================');
//         DataManager.getInstance().moduleID = ModuleID.BS;

//         //判斷是否要自動轉
//         if (DataManager.getInstance().isAutoMode) {
//             if (DataManager.getInstance().isAutoTimes) {
//                 DataManager.getInstance().autoSpinCount -= 1;
//                 SettingsController.updateAutoSpinCount.emit();
//             }
//             this.onSpin(false);
//         }
//         else {
//             this.idleState(); // 待機狀態
//         }

//     }

//     /**
//      * 待機狀態
//      */
//     private idleState(): void {
//         SettingsController.setEnabled.emit(true);//設定可用狀態
//         SettingsController.refreshBet.emit(DataManager.getInstance().bet.getBetTotal());//刷新下注

//         BaseEvent.clickSpin.on(() => {
//             this.onSpin(false);
//         }, this);

//         //購買功能
//         BaseEvent.buyFeature.on(() => {
//             DataManager.getInstance().isMenuOn = false;
//             this.onSpin(true);
//         }, this);
//     }


//     /**
//      * 執行Spin
//      * @param buyFs 是否購買免費遊戲
//      */
//     private onSpin(buyFs: boolean): void {
//         //判斷要傳送一般spin還是免費spin(檢查一下免費遊戲按下時是否有變更成FS模式)
//         // const isBS = DataManager.getInstance().isBS();
//         let betCredit = buyFs ? DataManager.getInstance().bet.getBuyFeatureTotal() : DataManager.getInstance().bet.getBetTotal();
//         let spinID = buyFs ? 1 : 0;
//         DataManager.getInstance().isBuyFs = buyFs;
//         SettingsController.refreshWin.emit(0);//刷新贏分=0


//         if (DataManager.getInstance().userCredit < betCredit) {
//             // 餘額不足
//             SettingsController.refreshCredit.emit(DataManager.getInstance().userCredit);
//             // DataManager.getInstance().isAutoMode = false;
//             Notice.showNoBalance.emit();
//             // this.idleState();
//         }
//         else {
//             // 成功SPIN
//             BaseEvent.clickSpin.off(this);
//             BaseEvent.buyFeature.off(this);
//             AudioManager.getInstance().playSound(AudioKey.SpinLoop);

//             //禁用所有設定相關按鈕
//             BaseEvent.buyFeatureEnabled.emit(false);
//             SettingsController.setEnabled.emit(false);
//             // SettingsPage1.setSpinState.emit(SpinBtnState.Loop);

//             //購買免費遊戲強制取消Turbo, 但不跳通知
//             if (buyFs) {
//                 DataManager.getInstance().curTurboMode = TurboMode.Normal;
//                 BaseEvent.setTurboBtnState.emit(TurboMode.Normal);
//             }

//             //判斷取消自動轉
//             if (DataManager.getInstance().isAutoMode && DataManager.getInstance().autoSpinCount <= 0) {
//                 DataManager.getInstance().isAutoMode = false;
//             }

//             BannerUI.reset.emit();//還原跑馬燈狀態
//             //考量到先轉型、後轉型, 所以音效要在spin監聽
//             SlotMachine.spinComplete.once(() => {
//                 // AudioManager.getInstance().playSound(GameAudioKey.in);
//             }, this);

//             NetworkManager.getInstance().sendSpin(betCredit, spinID, (success) => {
//                 if (success) {
//                     DataManager.getInstance().isBuyFs = false;//還原免費遊戲
//                     // DataManager.getInstance().featureBuyType = 0;
//                     AudioManager.getInstance().stopSound(AudioKey.SpinLoop);//收到結果就停止loop音效
//                 } else {
//                     this.idleState(); // Spin失敗要回待機狀態
//                 }
//                 this.finish();//此任務結束
//             });
//         }
//     }

//     /**持續更新 */
//     update(_deltaTime: number): void {
//         // throw new Error('Method not implemented.');
//     }
// }