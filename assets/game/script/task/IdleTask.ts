
import { Notice } from 'db://assets/common/components/notice/Notice';
import { SettingsController } from 'db://assets/common/components/settingsController/SettingsController';
import { DataManager } from 'db://assets/common/script/data/DataManager';
import { BaseEvent } from 'db://assets/common/script/event/BaseEvent';
import { GameTask } from 'db://assets/common/script/tasks/GameTask';
import { TaskManager } from 'db://assets/common/script/tasks/TaskManager';
import { ModuleID } from 'db://assets/common/script/types/BaseType';

import { SpinTask } from 'db://assets/game/script/task/SpinTask';
/**
 * 待機
 */
export class IdleTask extends GameTask {
    protected name: string = 'IdleTask';

    /**是否為首次Idle */
    // private static isFirstIdle: boolean = true;

    // private static payoutCallback: () => void;

    // execute(): void {
    //     //檢查是否剛活動結束要跳結算
    //     // if (PromoManager.getInstance().waitingPayout) {
    //     //     PromoManager.getInstance().setPayoutCallback(this.execute2.bind(this));
    //     // }
    //     // else {
    //     this.execute2();
    //     // }
    // }

    execute(): void {
        DataManager.getInstance().curModuleID = ModuleID.BS;

        // DataManager.getInstance().setState(s5g.game.proto.ESTATEID.K_IDLE);

        // SettingsPage1.setSpinState.emit(SpinBtnState.Idle);

        //表示轉動過程被修改, 待機時重新帶入
        // if (DataManager.getInstance().turboMode != DataManager.getInstance().tempTurboMode) {
        //     DataManager.getInstance().turboMode = DataManager.getInstance().tempTurboMode;
        // }

        //免費轉
        // if (PromoManager.getInstance().curCampaignRemainCount > 0) {
        //     this.onSpin(false);
        // }
        // // 有待通知訊系
        // else if (PromoManager.getInstance().hasNotifyCampaign() === true) {
        //     //活動異動通知時取消自動轉
        //     if (DataManager.getInstance().isAutoMode) {
        //         DataManager.getInstance().isAutoMode = false;
        //     }

        //     this.idleState();
        // }
        // //自動轉
        // else 
        if (DataManager.getInstance().isAutoMode) {
            if (DataManager.getInstance().isAutoTimes && DataManager.getInstance().autoSpinCount > 0) {
                DataManager.getInstance().autoSpinCount -= 1;
                SettingsController.updateAutoSpinCount.emit();
            }
            this.onSpin(false);
        }
        // 待機狀態
        else {
            this.idleState();
        }
    }

    /**
     * 待機狀態
     */
    private idleState(): void {
        BaseEvent.resetSpin.emit();//重置Spin按鈕
        BaseEvent.buyFeatureEnabled.emit(true);//啟用購買功能
        // SettingsController.setEnabled.emit(true);//設定可用狀態
        SettingsController.refreshBet.emit(DataManager.getInstance().bet.getBetTotal());//刷新下注

        // console.log('待機狀態監聽按下');
        BaseEvent.clickSpin.on(this.onSpin, this);

        //購買功能
        BaseEvent.buyFeature.on(() => {
            SettingsController.clickSpin.emit(true);//透過點擊Spin按鈕(購買免費遊戲)
        }, this);

        // if (IdleTask.isFirstIdle) {
        //     IdleTask.isFirstIdle = false;
        // }
    }

    /**
     * 執行Spin
     * @param buyFs 是否購買免費遊
     */
    private onSpin(buyFs: boolean = false): void {
        let betCredit = buyFs ? DataManager.getInstance().bet.getBuyFeatureTotal()
            : DataManager.getInstance().bet.getBetTotal();
        // DataManager.getInstance().isBuyFs = buyFs;

        // console.log('Spin下注金額', betCredit);
        SettingsController.refreshWin.emit(0, 0);//刷新贏分=0

        //免費轉
        // if (PromoManager.getInstance().isFreeSpin() === true) {

        //     //觸發免費轉時取消自動轉
        //     // if (DataManager.getInstance().isAutoMode == true) {
        //     //     DataManager.getInstance().auto.stopAuto();
        //     // }

        //     //Spin時就先扣除次數, 假設3次會顯示2、1、空
        //     PromoManager.getInstance().curCampaignRemainCount -= 1;

        //     SettingsPage1.setFreeSpinRemainCount.emit(PromoManager.getInstance().curCampaignRemainCount);
        //     BaseEvent.refreshBet.emit(DataManager.getInstance().getBetCredit());
        //     SettingsPage1.setFreeSpinVisible.emit(PromoManager.getInstance().curCampaignRemainCount > 0);
        //     if (PromoManager.getInstance().curCampaignRemainCount == 0) {
        //         PromoManager.getInstance().waitingPayout = true;
        //     }
        //     this.sendSpin();
        // }
        // //下注不足
        // else if (curBet < DataManager.getInstance().lawMinBet) {
        //     let multi = DataManager.getInstance().featureBuyMultipleList[0];
        //     let featureBuyTotal = DataManager.getInstance().bet.getRateAt(0) * DataManager.getInstance().bet.getBetAt(0) * multi;
        //     if (featureBuyTotal < DataManager.getInstance().lawMinBet) {
        //         featureBuyTotal = DataManager.getInstance().lawMinBet;
        //     }
        //     DataManager.getInstance().auto.stopAuto();
        //     // Notice.showSpinMin.emit(featureBuyTotal, DataManager.getInstance().lawMinBet);
        //     this.idleState();
        // }

        if (DataManager.getInstance().userCredit < betCredit) {
            // 餘額不足
            SettingsController.refreshCredit.emit(DataManager.getInstance().userCredit);
            // DataManager.getInstance().isAutoMode = false;
            Notice.showError.emit(220);
            this.idleState();
        }
        else {
            // 成功SPIN
            BaseEvent.clickSpin.off(this);
            BaseEvent.buyFeature.off(this);

            const spinTask = new SpinTask();
            spinTask.isBuyFs = buyFs;
            spinTask.betCredit = betCredit;
            TaskManager.getInstance().addTask(spinTask);

            this.finish();
        }
    }

    public update(_deltaTime: number): void {
        // throw new Error('Method not implemented.');
    }
}