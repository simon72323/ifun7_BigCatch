import { KeyCode } from "cc";
import { ModuleID } from "../types/BaseType";
import { XEvent, XEvent1 } from "../utils/XEvent";

/**
 * 共用遊戲事件
 */
export class BaseEvent {

    /**開啟"開始遊戲"按鈕 */
    public static showStartBtn: XEvent = new XEvent();

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

    /**切換場景 */
    public static changeScene: XEvent1<ModuleID> = new XEvent1();

    /**按下鍵盤 */
    public static keyDown: XEvent1<KeyCode> = new XEvent1<KeyCode>();

    /**停止自動轉通知 */
    public static onStopAuto: XEvent = new XEvent();

    /**Config回應 */
    public static onConfigRecall: XEvent1<s5g.game.proto.ConfigRecall> = new XEvent1();
    /**結果回應 */
    public static onResultRecall: XEvent1<s5g.game.proto.ResultRecall> = new XEvent1();

    /**淡入FeatureBuy */
    public static fadeInFeatureBuy: XEvent = new XEvent();
    /**淡出FeatureBuy */
    public static fadeOutFeatureBuy: XEvent = new XEvent();
}