import { Timeout } from "../types/BaseType";

/**
 * 全域常數(絕對不會改的資料放這, 若放BaseDataManager容易出現循環引用問題)
 */
export class BaseConst {
    /**後端最大盤面欄數 */
    public static MAP_MAX_COLUMN = 8;

    /**Banner中獎等級倍數 */
    public static BANNER_WIN_RANGE: number[] = [0, 5, 10];

    /**自動轉次數選項 */
    public static AUTO_OPTIONS: number[] = [10, 30, 50, 80, 1000];

    /**自動轉間隔秒數(未中獎) */
    public static DEF_AUTOPLAY_IDLE_TIME: number = 0.3;

    /**自動轉間隔秒數(中獎) */
    public static DEF_AUTOPLAY_IDLE_TIME_WIN: number = 1;
    /**BIGWIN等級表演時間 */
    public static BIG_WIN_LEVEL_TIME: number = 5;
    /**BIGWIN等級表演時間 */
    public static TOTAL_WIN_SCROLL_TIME: number = 1;

    /**BigWin 文字淡出時間 */
    public static BIG_WIN_FADE_OUT_DURATION: number = 0.5;
    /**BigWin End 播放完畢後等待時間 */
    public static BIG_WIN_END_DELAY: number = 2;

    /**讀取畫面逾時設定(2分鐘) */
    public static TIMEOUT_LOADING: Timeout = { key: "Loading", seconds: 120 };
    /**待機5秒後靜音 */
    public static TIMEOUT_IDLE_MUTE: Timeout = { key: "IdleMute", seconds: 5 };
    /**FS10秒自動進入 */
    public static TIMEOUT_FEATURE_WAIT_START: Timeout = { key: "FeatureWaitStart", seconds: 10 };
    /**spin30秒內需回應 */
    public static TIMEOUT_RESULT_RECALL: Timeout = { key: "ResultRecall", seconds: 30 };

    public static BUNDLE_BASE_LANGUAGE: string = "baseLanguage";
    public static BUNDLE_BASE_CURRENCY: string = "currency";
    public static BUNDLE_LANGUAGE: string = "language";

    public static DIR_LOADING: string = "loading";

    /**
     * 跑分隨機值
     * @param t 
     * @returns 
     */
    public static noisyEasing(t: number): number {
        // 加一點正向亂數，但不能超過1，也不能比t小
        const noise = Math.random() * 0.01; // 隨機減少最多 0.1
        if (t < 0.9) {
            return t - t * noise;
        }
        else {
            return t;
        }
    }
}

export enum BaseFont {
    /**一般數字 ['0123456789|2', '.,|1'] */
    number = "number",
}

export enum OperatorName {
    BP = "bp",
}

export enum WebViewEnum {
    GameHistory = 0,
    GameHelp,
    Promo
}