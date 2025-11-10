import { _decorator, Component, Node, Label, Button, Toggle, Sprite, EventTarget, sys } from 'cc';
import { Utils, addBtnClickEvent } from 'db://assets/common/script/utils/Utils';
import { LanguageLabel } from 'db://assets/common/components/localized/LanguageLabel';
import { i18n } from 'db://assets/common/script/utils/i18n';
import { XEvent1 } from 'db://assets/common/script/event/XEvent';
import { PromotionData } from 'db://assets/common/client-promotion/ingamemenu/InGameInformation';
import { DataManager } from 'db://assets/common/script/data/DataManager';
const { ccclass, property } = _decorator;

@ccclass('UIPromotionTips')
export class UIPromotionTips extends Component {
    public static show: XEvent1<PromotionData[]> = new XEvent1();

    private content: Node = null; // 內容
    private title: LanguageLabel = null; // 標題
    private nameLabel: Label = null; // 名稱
    private time: Label = null; // 時間
    private reward: Label = null; // 獎勵
    private date: Label = null; // 日期
    private confirmBtn: Button = null; // 確認按鈕
    private toggle: Toggle = null; // 顯示設定

    private onComplete: Function = null;
    private isReady: boolean = false;
    private lastData: PromotionData = null;

    onLoad() {
        this.node.setPosition(0, 0, 0);
        this.setupNode();
        this.setupEvent();
        this.node.active = false;
    }

    /**
     * 設置節點
     */
    private setupNode() {
        this.content = this.node.getChildByName('Content');
        this.title = this.content.getChildByName('Title').getComponent(LanguageLabel);
        this.nameLabel = this.content.getChildByName('Name').getComponent(Label);
        this.time = this.content.getChildByName('Time').getComponent(Label);
        this.reward = this.content.getChildByPath('Reward/Value').getComponent(Label);
        this.date = this.content.getChildByPath('Date/Value').getComponent(Label);
        this.confirmBtn = this.content.getChildByPath('Confirm').getComponent(Button);
        this.toggle = this.content.getChildByPath('Toggle').getComponent(Toggle);
    }

    /**
     * 設置事件
     */
    private setupEvent() {
        const scriptName = 'UIPromotionTips';
        addBtnClickEvent(this.node, scriptName, this.confirmBtn, 'clickConfirm');
        UIPromotionTips.show.on(this.show, this);
    }

    /**
     * 顯示Promotion提示
     * @param dataList 促銷資料列表
     */
    private async show(dataList: PromotionData[] | any[]) {
        if (dataList === null || dataList.length === 0) return;
        for (let i = 0; i < dataList.length; i++) {
            await this.openUI(dataList, i);
        }
    }

    /**
     * 關閉Promotion提示
     */
    private closeUI() {
        Utils.fadeOut(this.node, 0.3, 255, 0, () => {
            this.node.active = false;
            DataManager.getInstance().lockKeyboard = false;//解除鎖定鍵盤功能
            this.onComplete?.();
            this.onComplete = null;
        });
        Utils.tweenScaleTo(this.content, 0.3, 1, 0.5, () => {
            this.content.active = false;
        });
    }

    /**
     * 打開Promotion提示
     * @param dataList 促銷資料列表
     * @param idx 索引
     */
    private async openUI(dataList: PromotionData[], idx: number = 0): Promise<void> {
        return new Promise<void>((resolve) => {
            this.isReady = false;
            if (dataList === null || dataList.length === 0) return;

            const data = dataList[idx];
            if (this.displayContent(data) == false) return;
            DataManager.getInstance().lockKeyboard = true;//鎖定鍵盤功能
            this.node.active = true;
            this.content.active = true;

            Utils.fadeIn(this.node, 0.3, 0, 255);
            this.rollingReward();
            Utils.tweenScaleTo(this.content, 0.3, 0.5, 1, () => {
                this.keepDisplayTimeMessage();
            });
            this.isReady = true;
            this.onComplete = resolve;
        });
    }

    /**
     * 顯示Promotion內容
     * @param data 
     */
    private promotionTypeTitle = { 0: '281', 1: '283', 2: '0' }; // 對應多國語言文字表編號
    public displayContent(data: PromotionData | any) {
        if (data == null) return false;
        if (data.budget == null || data.budget === 0) return false;

        /// 檢查時間有沒有過期
        const now = new Date().getTime();
        const end_date = new Date(data.end_date);
        if (now > end_date.getTime()) return false;

        // 檢查時間有沒有在開始時間之前
        const begin_date = new Date(data.begin_date);
        if (now < begin_date.getTime()) return false;

        // 活動類別
        const typeName = this.promotionTypeTitle[data.promotion_type];
        if (typeName == null) return false;

        // 今日顯示設定
        if (this.getStorageToday(data.promotion_id) === true) return false;

        // 時間顯示，只顯示日期 yyyy-mm-dd
        const beginDate = data.begin_date.split(' ')[0];
        const endDate = data.end_date.split(' ')[0];
        const reward = Utils.numberFormat(data.budget / 2);

        this.title.string = i18n.getContent('default', typeName);
        this.nameLabel.string = data.promotion_name;
        this.reward.string = `${reward} ${data.currency}`;
        this.date.string = `${beginDate} ~ ${endDate}`;
        this.lastData = data;
        this.time.string = this.getTimeMessage();
        return true;
    }

    /**
     * 滾動獎勵分數
     */
    public async rollingReward() {
        const rewardScore = this.lastData.budget;
        const rewardCurrency = this.lastData.currency;

        // 滾動獎勵分數
        Utils.runNumber(1, this.reward, { curValue: rewardScore / 2, finalValue: rewardScore }, () => {
            this.reward.string = `${Utils.numberFormat(rewardScore)} ${rewardCurrency}`;
        });
    }

    // 持續顯示秒數
    public async keepDisplayTimeMessage() {
        if (this.node.active == false) return;
        this.time.string = this.getTimeMessage();
        await Utils.delay(1);
        this.keepDisplayTimeMessage();
    }

    // 取得時間訊息
    public getTimeMessage() {
        if (this.lastData == null) return '00d:00h:00m:00s';

        const now = new Date().getTime();
        const end_date = new Date(this.lastData.end_date).getTime();
        if (now > end_date) return '00d:00h:00m:00s';

        let sec = Math.floor((end_date - now) / 1000);
        let day = Math.floor(sec / 86400);
        sec -= day * 86400;
        let hour = Math.floor(sec / 3600);
        sec -= hour * 3600;
        let min = Math.floor(sec / 60);
        sec -= min * 60;

        return `${day}d:${hour}h:${min}m:${sec}s`;
    }

    /**
     * 確認按鈕
     */
    public clickConfirm() {
        if (this.isReady === false) return;
        this.closeUI();
        // console.log('clickConfirm', this.toggle.isChecked);
        if (this.toggle.isChecked === false) return;
        this.saveStorageToday(this.lastData.promotion_id);
    }

    /**
     * 保存今日顯示設定
     * @param id 
     */
    public saveStorageToday(id: string) {
        const today = this.formatDateToYYYYMMDD(Date.now());
        // console.log('saveStorageToday', id, today);
        sys.localStorage.setItem(id, today);
    }

    /**
     * 取得今日顯示設定
     * @param id 
     */
    public getStorageToday(id: string): boolean {
        return sys.localStorage.getItem(id) === this.formatDateToYYYYMMDD(Date.now());
    }

    public clickToggle() { }

    /**
     * 格式化日期為yyyy-mm-dd
     * @param timestamp 
     * @returns 
     */
    public formatDateToYYYYMMDD(timestamp: number): string {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份從 0 開始，所以需要加 1
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
}