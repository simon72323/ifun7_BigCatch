

// import { SettingsPage1 } from '@base/components/settingsPage/SettingsPage1';


// // import { InfoBar } from '@common/components/infoBar/InfoBar';
// import { Notice } from '@common/components/notice/Notice';
// import { SettingsController } from '@common/components/settingsController/SettingsController';


// import { BaseConst } from '@common/script/data/BaseConst';
// import { DataManager } from '@common/script/data/DataManager';
// import { BaseEvent } from '@common/script/event/BaseEvent';
// import { AudioKey } from '@common/script/manager/AudioKey';
// import { AudioManager } from '@common/script/manager/AudioManager';
// // import { PromoManager } from '@common/script/manager/PromoManager';
// import { TimeoutManager } from '@common/script/manager/TimeoutManager';
// import { GameTask } from '@common/script/tasks/GameTask';
// import { AutoMode, ModuleID, SpinBtnState } from '@common/script/types/BaseType';




// /**
//  * 共用待機流程
//  */
// export abstract class BaseIdleTask extends GameTask {

//     protected name: string = 'IdleTask';

//     /**是否為首次Idle */
//     private static isFirstIdle: boolean = true;

//     private static payoutCallback: () => void;

//     execute(): void {
//         //檢查是否剛活動結束要跳結算
//         // if (PromoManager.getInstance().waitingPayout) {
//         //     PromoManager.getInstance().setPayoutCallback(this.execute2.bind(this));
//         // }
//         // else {
//         this.execute2();
//         // }
//     }

//     execute2(): void {
//         DataManager.getInstance().moduleID = ModuleID.BS;

//         // DataManager.getInstance().setState(s5g.game.proto.ESTATEID.K_IDLE);

//         SettingsPage1.setSpinState.emit(SpinBtnState.Idle);

//         //表示轉動過程被修改, 待機時重新帶入
//         // if (DataManager.getInstance().turboMode != DataManager.getInstance().tempTurboMode) {
//         //     DataManager.getInstance().turboMode = DataManager.getInstance().tempTurboMode;
//         // }

//         //免費轉
//         // if (PromoManager.getInstance().curCampaignRemainCount > 0) {
//         //     this.onSpin(false);
//         // }
//         // // 有待通知訊系
//         // else if (PromoManager.getInstance().hasNotifyCampaign() === true) {
//         //     //活動異動通知時取消自動轉
//         //     if (DataManager.getInstance().isAutoMode) {
//         //         DataManager.getInstance().isAutoMode = false;
//         //     }

//         //     this.idleState();
//         // }
//         // //自動轉
//         // else 
//         if (DataManager.getInstance().curAutoMode != AutoMode.Off) {
//             if (DataManager.getInstance().curAutoMode == AutoMode.Limited) {
//                 DataManager.getInstance().autoSpinCount -= 1;
//                 SettingsController.updateAutoSpinCount.emit();
//             }
//             this.onSpin(false);
//         }
//         // 待機狀態
//         else {
//             this.idleState();
//         }
//     }

//     /**
//      * 待機狀態
//      */
//     private idleState(): void {
//         SettingsController.setEnabled.emit(true);//設定可用狀態
//         SettingsController.refreshBet.emit(DataManager.getInstance().getBetTotal());//刷新下注
//         // SettingsPage1.lessEnabled.emit(DataManager.getInstance().bet.getLessEnabled());
//         // SettingsPage1.plusEnabled.emit(DataManager.getInstance().bet.getPlusEnabled());
//         // SettingsPage1.setEnabled.emit(true);
//         // BaseEvent.buyFeatureVisible.emit(DataManager.getInstance().isFeatureBuyEnabled());
//         // BaseEvent.buyFeatureEnabled.emit(true);

//         BaseEvent.clickSpin.on(() => {
//             this.onSpin(false);
//         }, this);

//         //購買功能
//         BaseEvent.buyFeature.on(() => {
//             DataManager.getInstance().isMenuOn = false;
//             this.onSpin(true);
//         }, this);

//         //待機過久淡出音樂
//         // TimeoutManager.getInstance().register(BaseConst.TIMEOUT_IDLE_MUTE.key, BaseConst.TIMEOUT_IDLE_MUTE.seconds, () => {
//         //     AudioManager.getInstance().stop(AudioKey.BsMusic, 1);
//         // });

//         this.childExecute();
//     }

//     /**
//      * 執行Spin
//      * @param buyFs 是否購買免費遊戲
//      */
//     private onSpin(buyFs: boolean): void {
//         let curBet = buyFs ? DataManager.getInstance().getBuyFeatureTotal()
//             : DataManager.getInstance().getBetTotal();
//         DataManager.getInstance().isBuyFs = buyFs;

//         SettingsController.refreshWin.emit(0);//刷新贏分=0

//         //免費轉
//         // if (PromoManager.getInstance().isFreeSpin() === true) {

//         //     //觸發免費轉時取消自動轉
//         //     // if (DataManager.getInstance().isAutoMode == true) {
//         //     //     DataManager.getInstance().auto.stopAuto();
//         //     // }

//         //     //Spin時就先扣除次數, 假設3次會顯示2、1、空
//         //     PromoManager.getInstance().curCampaignRemainCount -= 1;

//         //     SettingsPage1.setFreeSpinRemainCount.emit(PromoManager.getInstance().curCampaignRemainCount);
//         //     BaseEvent.refreshBet.emit(DataManager.getInstance().getBetCredit());
//         //     SettingsPage1.setFreeSpinVisible.emit(PromoManager.getInstance().curCampaignRemainCount > 0);
//         //     if (PromoManager.getInstance().curCampaignRemainCount == 0) {
//         //         PromoManager.getInstance().waitingPayout = true;
//         //     }
//         //     this.sendSpin();
//         // }
//         // //下注不足
//         // else if (curBet < DataManager.getInstance().lawMinBet) {
//         //     let multi = DataManager.getInstance().featureBuyMultipleList[0];
//         //     let featureBuyTotal = DataManager.getInstance().bet.getRateAt(0) * DataManager.getInstance().bet.getBetAt(0) * multi;
//         //     if (featureBuyTotal < DataManager.getInstance().lawMinBet) {
//         //         featureBuyTotal = DataManager.getInstance().lawMinBet;
//         //     }
//         //     DataManager.getInstance().auto.stopAuto();
//         //     // Notice.showSpinMin.emit(featureBuyTotal, DataManager.getInstance().lawMinBet);
//         //     this.idleState();
//         // }
//         // 餘額不足
//         if (DataManager.getInstance().userCredit < curBet) {
//             SettingsController.refreshCredit.emit(DataManager.getInstance().userCredit);
//             // DataManager.getInstance().isAutoMode = false;
//             Notice.showNoBalance.emit();
//             this.idleState();
//         }
//         // 成功SPIN
//         else {
//             this.sendSpin();
//         }
//     }

//     private sendSpin(): void {
//         TimeoutManager.getInstance().remove(BaseConst.TIMEOUT_IDLE_MUTE.key);

//         BaseEvent.clickSpin.off(this);
//         BaseEvent.buyFeature.off(this);
//         this.finish();

//         this.childFinish();
//     }

//     public update(_deltaTime: number): void {
//         // throw new Error('Method not implemented.');
//     }

//     protected childExecute(): void {
//         //由子類別覆寫, 處理閒置狀態額外需要的動作
//     }

//     protected childFinish(): void {
//         //由子類別覆寫, 自行決定任務完成後要添加什麼Task或執行其他動作
//     }
// }