import { _decorator, Component, Vec3, Node, tween, Button, UITransform, easing, sp, SpriteFrame, Sprite } from 'cc';

import { addBtnClickEvent } from 'db://assets/common/script/utils/Utils';
import { AudioManager } from 'db://assets/common/script/manager/AudioManager';
import { AudioKey } from 'db://assets/game/script/data/AudioKey';
import { InGameInformation } from 'db://assets/common/client-promotion/ingamemenu/InGameInformation';
import { NetworkManager } from 'db://assets/common/script/network/NetworkManager';
import { XEvent } from 'db://assets/common/script/event/XEvent';

/**
 * 類別,浮動式按鈕
 */
const { ccclass, property } = _decorator;
@ccclass('InGameMenuPanel')
export class InGameMenuPanel extends Component {
    public static initialize: XEvent = new XEvent();
    // private static instance: InGameMenuPanel;
    // public static getInstance(): InGameMenuPanel {
    //     if (!InGameMenuPanel.instance) {
    //         InGameMenuPanel.instance = new InGameMenuPanel();
    //     }
    //     return InGameMenuPanel.instance;
    // }

    @property({ type: SpriteFrame })
    public cashDropSF: SpriteFrame[] = [];

    @property({ type: SpriteFrame })
    public cashDropFinishSF: SpriteFrame[] = [];

    @property({ type: SpriteFrame })
    public tournamentSF: SpriteFrame[] = [];

    @property({ type: SpriteFrame })
    public tournamentFinishSF: SpriteFrame[] = [];

    private promotionUI: Node = null;//促銷UI
    private redDot: Node = null;//小紅點
    private arrowLBtn: Node = null;//箭頭按鈕
    private on: Node = null;//開啟
    private off: Node = null;//關閉

    private inGameMenuStatus: boolean = false;//遊戲內選單狀態

    private btnJackpot: Button = null;//Jackpot按鈕
    private btnPromotion: Button = null;//Promotion按鈕

    private isOpen: boolean = false;//是否開啟
    private promotionReciprocalTime: string[] = [];//promotion剩餘時間


    protected onLoad(): void {
        this.promotionUI = this.node.getChildByPath('PromotionUI');
        this.btnJackpot = this.node.getChildByPath('PromotionUI/BtnJackpot').getComponent(Button);
        this.btnPromotion = this.node.getChildByPath('PromotionUI/BtnPromotion').getComponent(Button);
        this.redDot = this.node.getChildByPath('PromotionUI/ArrowBtn/RedDot');
        this.arrowLBtn = this.node.getChildByPath('PromotionUI/ArrowBtn');
        this.on = this.node.getChildByPath('PromotionUI/ArrowBtn/On');
        this.off = this.node.getChildByPath('PromotionUI/ArrowBtn/Off');
        this.setupEvent();
    }

    /**
     * 初始化處銷活動
     */
    public async initialize() {
        await this.setPromotionBriefData();
        await this.setInGameMenuStatus();
        this.createIcon();
    }

    /**
     * 設置促銷簡介資料
     */
    private async setPromotionBriefData(): Promise<void> {
        const promotionBriefResponse = await NetworkManager.getInstance().sendPromotionBrief();
        for (let i = 0; i < promotionBriefResponse.length; i++) {
            if (promotionBriefResponse[i].promotion_type === 2) {
                InGameInformation.instance.jackpotInformation.push({
                    promotion_id: promotionBriefResponse[i].promotion_id,
                    end_date: promotionBriefResponse[i].end_date,
                    promotion_name: promotionBriefResponse[i].promotion_name,
                    time_zone: promotionBriefResponse[i].time_zone,
                    min_bet: promotionBriefResponse[i].min_bet,
                    currency: promotionBriefResponse[i].currency
                });
            } else {
                InGameInformation.instance.promotionInformation.push({
                    promotion_id: promotionBriefResponse[i].promotion_id,
                    begin_date: promotionBriefResponse[i].begin_date,
                    end_date: promotionBriefResponse[i].end_date,
                    promotion_name: promotionBriefResponse[i].promotion_name,
                    time_zone: promotionBriefResponse[i].time_zone,
                    min_bet: promotionBriefResponse[i].min_bet,
                    budget: promotionBriefResponse[i].budget,
                    currency: promotionBriefResponse[i].currency,
                    promotion_type: promotionBriefResponse[i].promotion_type
                });
            }
        }
    }

    /**
     * 設置遊戲內選單狀態
     */
    private async setInGameMenuStatus(): Promise<void> {
        this.inGameMenuStatus = await NetworkManager.getInstance().sendInGameMenuStatus();
    }

    /**
     * 建立活動圖示
     */
    private createIcon() {
        const promotionAmount = InGameInformation.instance.promotionInformation.length;
        const jackpotAmount = InGameInformation.instance.jackpotInformation.length;

        this.runPromotionTimeExpand();//啟用剩餘時間計算

        this.btnPromotion.node.active = promotionAmount > 0;
        if (promotionAmount > 0) {
            this.updatePromotion();
            const promotionType = InGameInformation.instance.promotionInformation[0].promotion_type;
            const cashDropSpine = this.btnPromotion.node.getChildByName('CashDropSpine').getComponent(sp.Skeleton);
            const tournamentSpine = this.btnPromotion.node.getChildByName('TournamentSpine').getComponent(sp.Skeleton);
            if (promotionType === 0) {
                cashDropSpine.node.active = true;
                tournamentSpine.node.active = false;
                cashDropSpine.setAnimation(0, 'play', true);
            } else {
                cashDropSpine.node.active = false;
                tournamentSpine.node.active = true;
                tournamentSpine.setAnimation(0, 'play', true);
            }
        }

        this.btnJackpot.node.active = jackpotAmount > 0;
        if (jackpotAmount > 0) {
            const jackpotSpine = this.btnJackpot.node.getChildByName('JackpotSpine').getComponent(sp.Skeleton);
            jackpotSpine.setAnimation(0, 'play_0', true);
        }

        // 如果沒有活動，則不顯示
        let allPromotionAmount = promotionAmount + jackpotAmount;
        this.promotionUI.active = allPromotionAmount > 0;
    }

    /**
     * 更新促銷活動
     */
    private updatePromotion() {
        let index = 0;
        // 每5秒輪播cash drop活動按鈕
        setInterval(() => {
            const isFinish = (this.promotionReciprocalTime[index] === '');
            this.btnPromotion.node.getChildByName('LabelTime').active = !isFinish;
            const promotionType = InGameInformation.instance.promotionInformation[index].promotion_type;
            const promotionSprite = this.btnPromotion.node.getChildByName('Sprite').getComponent(Sprite);
            if (promotionType === 0) {
                promotionSprite.spriteFrame = isFinish ? this.cashDropFinishSF[index] : this.cashDropSF[index];
            } else {
                promotionSprite.spriteFrame = isFinish ? this.tournamentFinishSF[index] : this.tournamentSF[index];
            }
            index++;
            if (index >= InGameInformation.instance.promotionInformation.length) {
                index = 0;
            }
        }, 5000);
    }

    /**
     * 啟用活動剩餘時間計算
     */
    private runPromotionTimeExpand() {
        const promotionInfo = InGameInformation.instance.promotionInformation;
        for (let i = 0; i < promotionInfo.length; i++) {
            const endTime = new Date(promotionInfo[i].end_date.replace(/-/g, '/')).getTime();
            const nowTime = new Date(
                new Date().toLocaleString('sv-SE', { timeZone: promotionInfo[i].time_zone })
                    .replace(/-/g, '/')
            ).getTime();
            const timeDifference = endTime - nowTime;

            if (timeDifference < 0) {
                this.promotionReciprocalTime[i] = '';
            } else {
                const totalSeconds = Math.floor(timeDifference / 1000);
                const date = Math.floor(totalSeconds / 86400);
                const hour = Math.floor((totalSeconds % 86400) / 3600);
                const minute = Math.floor((totalSeconds % 3600) / 60);
                this.promotionReciprocalTime[i] = date === 0 ? `${hour}h ${minute}m ` : `${date}d ${hour}h `;
            }
        }
        setTimeout(() => {
            this.runPromotionTimeExpand();
        }, 60000);
    }

    /**
     * 設置事件
     */
    private setupEvent() {
        const scriptName = 'InGameMenuPanel';
        addBtnClickEvent(this.node, scriptName, this.arrowLBtn.getComponent(Button), 'onClickBtn');
        InGameMenuPanel.initialize.on(this.initialize, this);
    }

    /**
     * 開啟或關閉按鈕
     */
    public onClickBtn(): void {
        AudioManager.getInstance().playSound(AudioKey.btnClick);
        this.isOpen = !this.isOpen;
        this.on.active = this.isOpen;
        this.off.active = !this.isOpen;

        if (this.redDot.active) {
            this.redDot.active = false;
        }
        const nodeWidth = this.promotionUI.getComponent(UITransform).width;
        const movePos = this.isOpen ? new Vec3(-nodeWidth, 0, 0) : new Vec3(-60, 0, 0);
        tween(this.promotionUI)
            .to(0.3, { position: movePos }, { easing: easing.sineOut })
            .start();
    }
}