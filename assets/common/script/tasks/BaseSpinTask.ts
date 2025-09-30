// // import { InfoBar } from '@base/components/infoBar/InfoBar';
// // import { SettingsPage1 } from '@base/components/settingsPage/SettingsPage1';
// // import { AudioKey } from '@common/script/audio/AudioKey';
// import { AudioManager } from '@common/script/manager/AudioManager';
// import { BaseConst } from '@common/script/data/BaseConst';

// import { BaseEvent } from '@common/script/event/BaseEvent';
// // import { SocketManager } from '@base/script/socket/SocketManager';
// import { GameTask } from '@base/script/tasks/GameTask';
// import { SpinBtnState, TurboMode } from '@base/script/types/BaseType';
// import { TimeoutManager } from '@base/script/utils/TimeoutManager';
// import { logger } from '@base/script/utils/XUtils';

// import { DataManager } from '@common/script/data/DataManager';
// /**
//  * 共用開始轉動流程(成功送出Spin請求)
//  */
// export abstract class BaseSpinTask extends GameTask {

//     protected name: string = 'BaseSpinTask';

//     execute(): void {
//         logger('==========================================新局開始==========================================');

//         TimeoutManager.getInstance().remove(BaseConst.TIMEOUT_IDLE_MUTE.key);
//         const dataManager = DataManager.getInstance();
//         if (dataManager.isBS() == true) {
//             //沒在播放的話才從頭淡入
//             if (AudioManager.getInstance().isPlaying(AudioKey.BsMusic) === false) {
//                 //一秒淡入BS背景音樂
//                 AudioManager.getInstance().play(AudioKey.BsMusic, 1, 1);
//             }
//             //正在播放的話直接編輯音量
//             else {
//                 AudioManager.getInstance().edit(AudioKey.BsMusic, 1);
//             }
//         }
//         AudioManager.getInstance().play(AudioKey.SpinLoop);

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

//         this.childExecute();


//     }

//     /**持續更新 */
//     update(_deltaTime: number): void {
//         // throw new Error('Method not implemented.');
//     }

//     /**子類別實現執行 */
//     protected childExecute(): void {
//         //由子類別覆寫, 處理閒置狀態額外需要的動作
//     }

//     /**子類別實現Spin失敗 */
//     abstract childSpinFailed(): void;
// }