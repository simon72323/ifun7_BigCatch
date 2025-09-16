import { KeyCode } from 'cc';

import { ModuleID, OrientationID } from '@base/script/types/BaseType';
import { XEvent, XEvent1 } from '@base/script/utils/XEvent';

/**
 * 共用遊戲事件
 */
export class BaseEvent {

    /**開啟'開始遊戲'按鈕 */
    public static showStartBtn: XEvent = new XEvent();

    /**切換直橫式 */
    public static changeOrientation: XEvent1<OrientationID> = new XEvent1();

    /**初始化封包完成 */
    public static initMessageComplete: XEvent = new XEvent();
    /**遊戲資源讀取完成 */
    public static initResourceComplete: XEvent = new XEvent();
    /**通知LoadingUI關閉(必須和initMessageComplete錯開,否則可能會有順序問題) */
    public static hideLoading: XEvent = new XEvent();
    /**讀取畫面關閉,開始遊戲 */
    public static startGame: XEvent = new XEvent();

    /**點擊開始 */
    public static clickStart: XEvent = new XEvent();

    /**點擊SPIN */
    public static clickSpin: XEvent1<boolean> = new XEvent1();
    /**點擊超級SPIN */
    public static clickSuperSpin: XEvent1<boolean> = new XEvent1();
    /**點擊SKIP */
    public static clickSkip: XEvent = new XEvent();

    /**SPIN結果是否成功(失敗回idle) */
    public static spinResult: XEvent1<boolean> = new XEvent1();

    /**購買功能 */
    public static buyFeature: XEvent = new XEvent();
    /**廣播是否可看見購買功能 */
    public static buyFeatureVisible: XEvent1<boolean> = new XEvent1();
    /**廣播是否可點擊購買功能 */
    public static buyFeatureEnabled: XEvent1<boolean> = new XEvent1();


    /**刷新獲得 */
    public static refreshWin: XEvent1<number> = new XEvent1<number>();
    /**刷新額度 */
    public static refreshCredit: XEvent1<number> = new XEvent1<number>();
    /**刷新額度 */
    public static refreshBet: XEvent1<number> = new XEvent1<number>();

    /**切換場景(BS/FS) */
    public static changeScene: XEvent1<ModuleID> = new XEvent1();

    /**按下鍵盤 */
    public static keyDown: XEvent1<KeyCode> = new XEvent1<KeyCode>();

    /**停止自動轉通知 */
    public static onStopAuto: XEvent = new XEvent();

    /**Config回應 */
    // public static onConfigRecall: XEvent1<s5g.game.proto.ConfigRecall> = new XEvent1();
    // /**結果回應 */
    // public static onResultRecall: XEvent1<s5g.game.proto.ResultRecall> = new XEvent1();

    /**淡入FeatureBuy */
    public static fadeInFeatureBuy: XEvent = new XEvent();
    /**淡出FeatureBuy */
    public static fadeOutFeatureBuy: XEvent = new XEvent();

    /**
     * 清除所有 BaseEvent 的事件監聽
     */
    public static clearAll(): void {
        BaseEvent.changeOrientation.clear();
        BaseEvent.showStartBtn.clear();
        BaseEvent.initMessageComplete.clear();
        BaseEvent.initResourceComplete.clear();
        BaseEvent.hideLoading.clear();
        BaseEvent.startGame.clear();
        BaseEvent.clickStart.clear();
        BaseEvent.clickSpin.clear();
        BaseEvent.clickSkip.clear();
        BaseEvent.spinResult.clear();
        BaseEvent.buyFeature.clear();
        BaseEvent.buyFeatureVisible.clear();
        BaseEvent.buyFeatureEnabled.clear();
        BaseEvent.refreshWin.clear();
        BaseEvent.refreshCredit.clear();
        BaseEvent.refreshBet.clear();
        BaseEvent.changeScene.clear();
        BaseEvent.keyDown.clear();
        BaseEvent.onStopAuto.clear();
        // BaseEvent.onConfigRecall.clear();
        // BaseEvent.onResultRecall.clear();
        BaseEvent.fadeInFeatureBuy.clear();
        BaseEvent.fadeOutFeatureBuy.clear();
    }
}