// // import { InfoBar } from '@base/components/infoBar/InfoBar';
// // import { SettingsPage1 } from '@base/components/settingsPage/SettingsPage1';


// import { BaseConst } from '@common/script/data/BaseConst';
// import { DataManager } from '@common/script/data/DataManager';
// import { BaseEvent } from '@common/script/event/BaseEvent';
// import { AudioKey } from '@common/script/manager/AudioKey';
// import { AudioManager } from '@common/script/manager/AudioManager';
// import { TimeoutManager } from '@common/script/manager/TimeoutManager';
// import { BaseSpinTask } from '@common/script/tasks/BaseSpinTask';
// import { GameTask } from '@common/script/tasks/GameTask';
// import { TaskManager } from '@common/script/tasks/TaskManager';
// import { SpinBtnState, TurboMode } from '@common/script/types/BaseType';




// // import { TimeoutManager } from '@common/script/utils/TimeoutManager';
// // import { logger } from '@common/script/utils/XUtils';


// /**
//  * 共用開始轉動流程(成功送出Spin請求)
//  */
// export abstract class BaseSpinTask extends GameTask {

//     protected name: string = 'BaseSpinTask';

//     execute(): void {
//         console.log('==========================================新局開始==========================================');

//         TimeoutManager.getInstance().remove(BaseConst.TIMEOUT_IDLE_MUTE.key);
//         const dataManager = DataManager.getInstance();
//         // if (dataManager.isBS()) {
//         //     AudioManager.getInstance().playMusic(AudioKey.BsMusic);
//         // }
//         AudioManager.getInstance().playSound(AudioKey.SpinLoop);

//         InfoBar.setEnabled.emit(false);
//         BaseEvent.buyFeatureEnabled.emit(false);
//         SettingsPage1.setSpinState.emit(SpinBtnState.Loop);
//         SettingsPage1.setEnabled.emit(false);
//         SettingsPage1.lessEnabled.emit(false);
//         SettingsPage1.plusEnabled.emit(false);


//         //購買免費遊戲強制取消Turbo, 但不跳通知
//         if (dataManager.buyFs == true && dataManager.isTurboOn() == true) {
//             dataManager.setTurboMode(TurboMode.Normal);
//             dataManager.tempTurboMode = TurboMode.Normal;
//             SettingsPage1.setTurbo.emit(TurboMode.Normal);

//             //購買免費遊戲強制取消Turbo, 但不跳通知
//             // Notice.showMode.emit(DataManager.getInstance().TurboMode);
//         }

//         //取消自動轉
//         if (dataManager.isAutoMode && dataManager.autoSpinCount <= 0) {
//             dataManager.isAutoMode = false;
//         }

//         //監聽spin是否成功,
//         BaseEvent.spinResult.once((success) => {

//             //還原免費遊戲
//             DataManager.getInstance().buyFs = false;
//             DataManager.getInstance().featureBuyType = 0;

//             //收到結果就停止loop音效
//             AudioManager.getInstance().stop(AudioKey.SpinLoop);

//             //失敗要回idle
//             if (!success) {
//                 this.childSpinFailed();
//             }

//             this.finish();
//         }, this);
//         if (DataManager.getInstance().isBS() === true) {
//             // DataManager.getInstance().setState(s5g.game.proto.ESTATEID.K_SPIN);
//             // SocketManager.getInstance().sendMessage(s5g.game.proto.EMSGID.eResultCall);
//         }
//         else {
//             // DataManager.getInstance().setState(s5g.game.proto.ESTATEID.K_FEATURE_SPIN);
//             // SocketManager.getInstance().sendMessage(s5g.game.proto.EMSGID.eResultCall);
//         }

//         //還原跑馬燈狀態
//         BannerUI.reset.emit();

//         //考量到先轉型、後轉型, 所以音效要在spin監聽
//         SlotMachine.spinComplete.once(() => {
//             AudioManager.getInstance().playSound(GameAudioKey.in);
//         }, this);

//         if (DataManager.getInstance().isBS()) {
//             //先轉型(免費遊戲直接給結果不轉動)
//             if (!DataManager.getInstance().isBuyFs && APIManager.getInstance().getSpinLate() === false) {
//                 SlotMachine.spin.emit();
//             }
//         }


//     }

//     /**持續更新 */
//     update(_deltaTime: number): void {
//         // throw new Error('Method not implemented.');
//     }

//     /**子類別實現執行 */
//     public childSpinFailed(): void {
//         if (DataManager.getInstance().isBS()) {
//             TaskManager.getInstance().addTask(new IdleTask());
//         }
//     }

//     /**子類別實現Spin失敗 */
//     abstract childSpinFailed(): void;
// }