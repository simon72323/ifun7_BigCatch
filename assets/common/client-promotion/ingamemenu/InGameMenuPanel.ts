import { _decorator, Component, Vec3, Node, tween, Button, UITransform, easing, sp, SpriteFrame, Sprite, Label } from 'cc';

import { addBtnClickEvent } from 'db://assets/common/script/utils/Utils';
import { AudioManager } from 'db://assets/common/script/manager/AudioManager';
import { AudioKey } from 'db://assets/game/script/data/AudioKey';
import { InGameInformation } from 'db://assets/common/client-promotion/ingamemenu/InGameInformation';
import { NetworkManager } from 'db://assets/common/script/network/NetworkManager';
import { XEvent } from 'db://assets/common/script/event/XEvent';
import { UIPromotionTips } from 'db://assets/common/client-promotion/ingamemenu/PromotionTips/UIPromotionTips';

declare global {
    var __GAME_PLUGIN__: any;
}

/**
 * 類別,浮動式按鈕
 */
const { ccclass, property } = _decorator;
@ccclass('InGameMenuPanel')
export class InGameMenuPanel extends Component {
    public static initialize: XEvent = new XEvent();
    public static onClickInGameMenu: XEvent = new XEvent();

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
     * 設置事件
     */
    private setupEvent() {
        const scriptName = 'InGameMenuPanel';
        addBtnClickEvent(this.node, scriptName, this.arrowLBtn.getComponent(Button), 'onClickBtn');
        addBtnClickEvent(this.node, scriptName, this.btnPromotion.getComponent(Button), 'onClickPromotion');
        addBtnClickEvent(this.node, scriptName, this.btnJackpot.getComponent(Button), 'onClickJackpot');
        InGameMenuPanel.onClickInGameMenu.on(this.onClickInGameMenu, this);
        InGameMenuPanel.initialize.on(this.initialize, this);
    }

    start() {
        if (typeof __GAME_PLUGIN__ !== 'undefined' && __GAME_PLUGIN__ !== null) {
            __GAME_PLUGIN__.dispatch({
                type: 'setting/setFlags',
                payload: {
                    // 遊戲咧表
                    gameListDialogEnable: true,
                    // Promotion計分板
                    promotionTableDialogEnable: true,
                    // Promotion提示
                    promotionDialogEnable: true,
                    // Cash Drop Reward Popup提示
                    cashDropRewardPopupEnable: true
                }
            });
        }
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

    //============================== 觸發活動頁面 API  ==============================

    /** 打開Promotion計分板,浮動按鈕左下 撒幣＋晉升賽＋錦標賽 */
    public onClickPromotion(): void {
        if (typeof __GAME_PLUGIN__ === 'undefined' || __GAME_PLUGIN__ == null) return;
        //this.promotionContent.setSlideToIndex( this.visiblePromotion );
        //this.promotionContent.sendPromoteApi( Date.now() );
        __GAME_PLUGIN__.dispatch({
            type: 'setting/setPromotionTableDialogShow',
            payload: true
        });

        AudioManager.getInstance().playSound(AudioKey.btnClick);
        // Utils.GoogleTag('PromotionOpen', { 'event_category': 'open_ui', 'event_label': 'open_ui' });
    }

    /** 浮動按鈕左上 Jackpot */
    public onClickJackpot(): void {
        // this.promotionContent.sendJackpotRefreshApi(Date.now());
        AudioManager.getInstance().playSound(AudioKey.btnClick);
        //GoogleAnalytics.AddGtag( 'event', 'promotion_open', { 'event_category': 'open_jackpot_ui', 'event_label': 'open_jackpot_ui' } );
        // Utils.GoogleTag('PromotionOpen', { 'event_category': 'open_jackpot_ui', 'event_label': 'open_jackpot_ui' });
    }

    /** 打開遊戲列表視窗,浮動按鈕右 熱門遊戲＋最愛遊戲 */
    public onClickInGameMenu(): void {
        //this.getInGameMenuData();
        if (typeof __GAME_PLUGIN__ === 'undefined' || __GAME_PLUGIN__ == null) return;
        __GAME_PLUGIN__.dispatch({
            type: 'setting/setGameListDialogShow',
            payload: true
        });
        //GoogleAnalytics.AddGtag( 'event', 'in_game_menu_open_ui', { 'event_category': 'open_ui', 'event_label': 'open_ui' } );
        // Utils.GoogleTag('InGameMenuOpenUI', { 'event_category': 'open_ui', 'event_label': 'open_ui' });
        let element = document.getElementsByClassName('igm_close')?.[0] as HTMLElement;
        if (element == null) return;

        AudioManager.getInstance().playSound(AudioKey.btnClick);
    }
    //============================== 觸發活動頁面 API  ==============================

    /**
     * 初始化處銷活動
     */
    public async initialize() {
        //設置促銷簡介資料並顯示Promotion提示
        await this.setPromotionBriefData();
        //設置遊戲內選單狀態
        await this.setInGameMenuStatus();
        this.createIcon();
    }

    /**
     * 設置促銷簡介資料
     */
    private async setPromotionBriefData(): Promise<void> {
        let promotionBriefResponse = await NetworkManager.getInstance().sendPromotionBrief();
        // 進行排序的程式碼
        if (Array.isArray(promotionBriefResponse)) {
            promotionBriefResponse.sort((a, b) => {
                const timeZoneNow: Date = new Date(new Date().toLocaleString('sv-SE', { timeZone: a.time_zone }).replace(/-/g, '/'));
                const timeA = new Date(a.end_date.replace(/-/g, '/')).getTime() - timeZoneNow.getTime();
                const timeB = new Date(b.end_date.replace(/-/g, '/')).getTime() - timeZoneNow.getTime();
                return timeB > timeA ? 1 : -1;
            });
        }

        // 把錦標賽拿到後面放
        let pushType = 1;
        let temp = promotionBriefResponse.filter(value => value.promotion_type === pushType);
        for (let i = promotionBriefResponse.length - 1; i >= 0; i--) {
            if (promotionBriefResponse[i].promotion_type === pushType) {
                promotionBriefResponse.splice(i, 1);
            }
        }

        promotionBriefResponse = promotionBriefResponse.concat(temp);
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
        //顯示Promotion提示
        UIPromotionTips.show.emit(promotionBriefResponse);
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
        // 提取更新逻辑为一个函数
        const updateContent = () => {
            const isFinish = (this.promotionReciprocalTime[index] === '');
            const labelTimeLeft = this.btnPromotion.node.getChildByName('LabelTime');
            if (isFinish) {
                labelTimeLeft.active = false;
            } else {
                labelTimeLeft.active = true;
                labelTimeLeft.getComponent(Label).string = this.promotionReciprocalTime[index];
            }

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
        };

        // 立即执行一次
        updateContent();

        // 每5秒輪播cash drop活動按鈕
        setInterval(() => {
            updateContent();
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
}