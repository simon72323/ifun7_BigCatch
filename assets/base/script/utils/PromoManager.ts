import { FreeSpinBonus } from '@base/components/campaign/FreeSpinBonus';
import { FreeSpinInfoBtn } from '@base/components/campaign/FreeSpinInfoBtn';
import { BaseEvent } from '@common/script/event/BaseEvent';

import { DataManager } from '@common/script/data/DataManager';
// import { SocketManager } from '@base/script/socket/SocketManager';

export enum CampaignStatusEnum {
    /// <summary>
    /// 尚未開始
    /// </summary>
    CampaignStatusEnum_NotStartYet = 1,

    /// <summary>
    /// 即將開始
    /// </summary>
    CampaignStatusEnum_ComingSoon = 2,

    /// <summary>
    /// 進行中
    /// </summary>
    CampaignStatusEnum_Running = 3,

    /// <summary>
    /// 暫停中
    /// </summary>
    CampaignStatusEnum_Suspend = 4,

    /// <summary>
    /// 強制終止
    /// </summary>
    CampaignStatusEnum_Terminate = 5,

    /// <summary>
    /// 已結束
    /// </summary>
    CampaignStatusEnum_End = 6,

    /// <summary>
    /// 結算中
    /// </summary>
    CampaignStatusEnum_Result = 7,
}

/**
 * 活動管理
 */
export class PromoManager {
    private static instance: PromoManager;

    /**進行中活動清單 */
    public campaign_list: string[] = [];
    /**要通知活動清單 */
    public notifiable_campaign_list: { redirect_game_id: string, campaign_id: string, event_type: number }[] = [];
    /**目前活動ID */
    public curCampaignID: string = '';
    /**剩餘次數 */
    public curCampaignRemainCount: number = 0;

    /**是否正在顯示webview */
    public isWebViewOpen: boolean = false;

    /**GS通知可贏分callback */
    public waitingPayout: boolean = false;
    private payoutCallback: () => void;

    public static getInstance(): PromoManager {
        if (!PromoManager.instance) {
            PromoManager.instance = new PromoManager();
        }
        return PromoManager.instance;
    }

    /**
     * 檢查是否要轉導遊戲
     */
    public checkRedirect(): void {
        //非當前遊戲, 跳出提示訊息, 並重新導向遊戲
        let curCampaign = this.notifiable_campaign_list[0];
        if (curCampaign && curCampaign.redirect_game_id && curCampaign.redirect_game_id !== DataManager.getInstance().gameID) {
            FreeSpinBonus.clickPlayNow.once(() => {
                window.location.replace(window.location.href.replace(DataManager.getInstance().gameID, curCampaign.redirect_game_id));
            }, this);
            // FreeSpinBonus.clickClose
            DataManager.getInstance().isMenuOn = true;
            this.isWebViewOpen = true;
            FreeSpinBonus.showReminder.emit(curCampaign.campaign_id, -1);
        }
    }

    /**
     * 遊戲開始
     */
    public checkInfoBtn(): void {

        if (this.hasCampaign() === true) {
            //顯示活動資訊按鈕
            FreeSpinInfoBtn.show.emit();
            FreeSpinInfoBtn.clickInfo.on(() => {
                DataManager.getInstance().isMenuOn = true;
                this.isWebViewOpen = true;
                FreeSpinBonus.showInfo.emit();

                FreeSpinBonus.clickClose.once(() => {
                    this.hideFreeSpinBonus();
                }, this);

            }, this);
        }
        else {
            //顯示活動資訊按鈕
            FreeSpinInfoBtn.hide.emit();
            FreeSpinInfoBtn.clickInfo.off(this);
        }
    }

    private reset(): void {
        this.curCampaignID = '';
        this.curCampaignRemainCount = 0;
        DataManager.getInstance().bet.setPromoRate(-1, -1);
    }

    /**
     * 活動回應
     * @param campaign_id 活動ID
     * @param campaign_type 活動狀態
     * @param campaign_status 活動類型
     * @param remain_count 活動剩餘次數
     */
    public responseCampaign(campaign_id: string, campaign_type: number, campaign_status: number, remain_count: number, bet_rate: number, bet_level: number): void {

        //送出免費轉Spin
        this.curCampaignRemainCount = remain_count;
        this.curCampaignID = campaign_id;
        DataManager.getInstance().bet.setPromoRate(bet_rate, bet_level);
        //送出Spin
        BaseEvent.clickSpin.emit(false);
    }

    /**
     * 刷新當前活動狀態
     * @param campaignData 
     */
    // public updateResultCallCampaign(campaignData: s5g.game.proto.ICampaignData): void {
    //     this.curCampaignRemainCount = campaignData.fsb_remaining_count;
    // }

    /**
     * 刷新當前活動狀態
     * @param campaignData 
     */
    // public updateCampaignEvent(campaign_id: string, campaign_type: number, campaign_status: number, event_type: number): void {

    //     //正在開啟就刷新資訊
    //     if (this.isWebViewOpen) {
    //         FreeSpinBonus.update.emit(campaign_id, event_type);
    //     }
    //     //放到通知清單, 如果待機狀態就直接跳, 否則等回待機再跳
    //     else {
    //         this.notifiable_campaign_list.push({ campaign_id, event_type, redirect_game_id: '' });

    //         if (DataManager.getInstance().isIdle() === true) {
    //             this.checkReminder();
    //         }
    //     }

    //     //進行中:添加到活動清單, 再次檢查info按鈕
    //     if (campaign_status === CampaignStatusEnum.CampaignStatusEnum_Running) {
    //         if (this.campaign_list.indexOf(campaign_id) === -1) {
    //             this.campaign_list.push(campaign_id);
    //         }
    //         this.checkInfoBtn();
    //     }
    //     //強制終止:從活動清單中移除, 再次檢查info按鈕
    //     else if (campaign_status === CampaignStatusEnum.CampaignStatusEnum_Terminate) {
    //         //因為活動終止還要保留3天info按鈕, 所以不能移除
    //         // let idx = this.campaign_list.indexOf(campaign_id);
    //         // if (idx !== -1) {
    //         //     this.campaign_list.splice(idx, 1);
    //         // }
    //         // this.checkInfoBtn();
    //     }

    // }

    /**
     * 通知玩家獲得贏分
     * @param _campaign_id 
     * @param _campaign_type 
     * @param _total_win 
     */
    public notifyWin(_campaign_id: string, _campaign_type: number, _total_win: number): void {
        this.waitingPayout = false;
        let fn = this.payoutCallback;
        fn?.();
        this.payoutCallback = null;
    }

    /**
     * 檢查是否需要主動提示
     */
    public checkReminder(): void {
        console.log('檢查reminder:' + JSON.stringify(this.notifiable_campaign_list));

        //有結算訊息優先顯示, 結束再檢查其他活動異動訊息
        if (this.curCampaignID != '') {
            DataManager.getInstance().isMenuOn = true;
            this.isWebViewOpen = true;
            FreeSpinBonus.showReminder.emit(this.curCampaignID, -1);
            this.reset();

            //開啟reminder後, 只有可能'關閉'或'開始Spin'
            FreeSpinBonus.clickClose.once(() => {
                this.hideFreeSpinBonus();
                this.checkReminder();
            }, this);
        }
        //其他活動異動訊息
        if (this.hasNotifyCampaign() === true) {
            let curCampaign = this.notifiable_campaign_list[0];
            this.notifiable_campaign_list.length = 0;//顯示第一則, 其他清空
            DataManager.getInstance().isMenuOn = true;
            this.isWebViewOpen = true;
            FreeSpinBonus.showReminder.emit(curCampaign.campaign_id, curCampaign.event_type);
            //開啟reminder後, 只有可能'關閉'或'開始Spin'
            FreeSpinBonus.clickClose.once(() => {
                this.hideFreeSpinBonus();

                this.checkReminder();
            }, this);
            FreeSpinBonus.clickPlayNow.once(() => {
                this.hideFreeSpinBonus();

                // SocketManager.getInstance().sendMessage(s5g.game.proto.EMSGID.eCampaignCall, curCampaign.campaign_id);
            }, this);
        }
    }

    /**
     * 顯示活動結算
     */
    public setPayoutCallback(payoutCallback: () => void): void {
        this.payoutCallback = payoutCallback;
    }

    private hideFreeSpinBonus(): void {
        FreeSpinBonus.clickPlayNow.off(this);
        FreeSpinBonus.clickClose.off(this);

        DataManager.getInstance().isMenuOn = false;
        this.isWebViewOpen = false;
        FreeSpinBonus.hide.emit();
    }

    public hasCampaign(): boolean {
        return this.campaign_list.length > 0;
    }

    public isFreeSpin(): boolean {
        return this.curCampaignID !== '';
    }

    public hasNotifyCampaign(): boolean {
        return this.notifiable_campaign_list.length > 0;
    }
}