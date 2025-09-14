import { InfoBar } from '@base/components/infoBar/InfoBar';
import { Notice } from '@base/components/notice/Notice';
import { SettingsPage1 } from '@base/components/settingsPage/SettingsPage1';
import { AudioKey } from '@base/script/audio/AudioKey';
import { AudioManager } from '@base/script/audio/AudioManager';
import { BaseConst } from '@base/script/constant/BaseConst';
import { BaseDataManager } from '@base/script/main/BaseDataManager';
import { BaseEvent } from '@base/script/main/BaseEvent';
import { GameTask } from '@base/script/tasks/GameTask';
import { AutoPlayMode, ModuleID, SpinButtonState } from '@base/script/types/BaseType';
import { PromoManager } from '@base/script/utils/PromoManager';
import { TimeoutManager } from '@base/script/utils/TimeoutManager';


/**
 * 共用待機流程
 */
export abstract class BaseIdleTask extends GameTask {

    protected name: string = 'IdleTask';

    /**是否為首次Idle */
    private static isFirstIdle: boolean = true;

    private static payoutCallback: () => void;

    execute(): void {
        //檢查是否剛活動結束要跳結算
        if (PromoManager.getInstance().waitingPayout) {
            PromoManager.getInstance().setPayoutCallback(this.execute2.bind(this));
        }
        else {
            this.execute2();
        }
    }

    execute2(): void {
        BaseDataManager.getInstance().curModuleID = ModuleID.BS;

        BaseDataManager.getInstance().setState(s5g.game.proto.ESTATEID.K_IDLE);

        SettingsPage1.setSpinState.emit(SpinButtonState.Idle);

        //表示轉動過程被修改, 待機時重新帶入
        if (BaseDataManager.getInstance().getTurboMode() != BaseDataManager.getInstance().tempTurboMode) {
            BaseDataManager.getInstance().setTurboMode(BaseDataManager.getInstance().tempTurboMode);
        }

        //免費轉
        if (PromoManager.getInstance().curCampaignRemainCount > 0) {
            this.onSpin(false);
        }
        //有待通知訊系
        else if (PromoManager.getInstance().hasNotifyCampaign() === true) {
            //活動異動通知時取消自動轉
            if (BaseDataManager.getInstance().auto.isAutoPlay() == true) {
                BaseDataManager.getInstance().auto.stopAuto();
            }

            this.idleState();
        }
        //自動轉
        else if (BaseDataManager.getInstance().auto.isAutoPlay() == true) {
            if (BaseDataManager.getInstance().auto.mode == AutoPlayMode.num) {
                BaseDataManager.getInstance().auto.num -= 1;
                SettingsPage1.setSpinNum.emit(BaseDataManager.getInstance().auto.num);
            }
            this.onSpin(false);
        }
        //待機狀態
        else {
            this.idleState();
        }
    }

    private idleState(): void {

        //第一次Idle要做的事情
        if (BaseIdleTask.isFirstIdle === true) {
            BaseIdleTask.isFirstIdle = false;
            //確認是否要開啟活動按鈕
            PromoManager.getInstance().checkInfoBtn();
        }

        //檢查是否需要主動提示
        PromoManager.getInstance().checkReminder();

        InfoBar.setEnabled.emit(true);

        SettingsPage1.lessEnabled.emit(BaseDataManager.getInstance().bet.getLessEnabled());
        SettingsPage1.plusEnabled.emit(BaseDataManager.getInstance().bet.getPlusEnabled());
        SettingsPage1.setEnabled.emit(true);

        BaseEvent.refreshBet.emit(BaseDataManager.getInstance().bet.getCurTotal());
        BaseEvent.buyFeatureVisible.emit(BaseDataManager.getInstance().isFeatureBuyEnabled());
        BaseEvent.buyFeatureEnabled.emit(true);

        BaseEvent.clickSpin.on(() => {
            this.onSpin(false);
        }, this);

        //購買功能
        BaseEvent.buyFeature.on(() => {
            BaseDataManager.getInstance().isMenuOn = false;
            this.onSpin(true);
        }, this);

        //待機過久淡出音樂
        TimeoutManager.getInstance().register(BaseConst.TIMEOUT_IDLE_MUTE.key, BaseConst.TIMEOUT_IDLE_MUTE.seconds, () => {
            AudioManager.getInstance().stop(AudioKey.BsMusic, 1);
        });

        this.childExecute();
    }

    /**
     * 
     * @param buyFs 
     */
    private onSpin(buyFs: boolean): void {

        let curBet = buyFs ? BaseDataManager.getInstance().getCurFeatureBuyTotal() : BaseDataManager.getInstance().bet.getCurTotal();
        BaseDataManager.getInstance().buyFs = buyFs;

        BaseEvent.refreshWin.emit(0);

        //免費轉
        if (PromoManager.getInstance().isFreeSpin() === true) {

            //觸發免費轉時取消自動轉
            if (BaseDataManager.getInstance().auto.isAutoPlay() == true) {
                BaseDataManager.getInstance().auto.stopAuto();
            }

            //Spin時就先扣除次數, 假設3次會顯示2、1、空
            PromoManager.getInstance().curCampaignRemainCount -= 1;

            SettingsPage1.setFreeSpinRemainCount.emit(PromoManager.getInstance().curCampaignRemainCount);
            BaseEvent.refreshBet.emit(BaseDataManager.getInstance().bet.getCurTotal());
            SettingsPage1.setFreeSpinVisible.emit(PromoManager.getInstance().curCampaignRemainCount > 0);
            if (PromoManager.getInstance().curCampaignRemainCount == 0) {
                PromoManager.getInstance().waitingPayout = true;
            }
            this.sendSpin();
        }
        //下注不足
        else if (curBet < BaseDataManager.getInstance().lawMinBet) {
            let multi = BaseDataManager.getInstance().featureBuyMultipleList[0];
            let featureBuyTotal = BaseDataManager.getInstance().bet.getRateAt(0) * BaseDataManager.getInstance().bet.getBetAt(0) * multi;
            if (featureBuyTotal < BaseDataManager.getInstance().lawMinBet) {
                featureBuyTotal = BaseDataManager.getInstance().lawMinBet;
            }
            BaseDataManager.getInstance().auto.stopAuto();
            Notice.showSpinMin.emit(featureBuyTotal, BaseDataManager.getInstance().lawMinBet);
            this.idleState();
        }
        // 餘額不足
        else if (BaseDataManager.getInstance().playerCent < curBet) {
            BaseEvent.refreshCredit.emit(BaseDataManager.getInstance().playerCent);
            BaseDataManager.getInstance().auto.stopAuto();
            Notice.showNoBalance.emit(false);
            this.idleState();
        }
        // 成功SPIN
        else {
            this.sendSpin();
        }
    }

    private sendSpin(): void {
        TimeoutManager.getInstance().remove(BaseConst.TIMEOUT_IDLE_MUTE.key);

        BaseEvent.clickSpin.off(this);
        BaseEvent.buyFeature.off(this);
        this.finish();

        this.childFinish();
    }

    public update(_deltaTime: number): void {
        // throw new Error('Method not implemented.');
    }

    protected childExecute(): void {
        //由子類別覆寫, 處理閒置狀態額外需要的動作
    }

    protected childFinish(): void {
        //由子類別覆寫, 自行決定任務完成後要添加什麼Task或執行其他動作
    }
}