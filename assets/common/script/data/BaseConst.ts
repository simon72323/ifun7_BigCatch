import { Timeout, TurboMode } from '@common/script/types/BaseType';

// export enum BaseFont {
//     /**一般數字 ['0123456789|2', '.,|1'] */
//     number = 'number',
// }

// export enum OperatorName {
//     BP = 'bp',
// }

/**
 * 公版全域常數(絕對不會改的資料放這, 若放BaseDataManager容易出現循環引用問題)
 */
export class BaseConst {
    /**自動轉次數選項 */
    // public static AUTO_OPTIONS: number[] = [10, 25, 50, 75, 100, 250, 500, 750, 1000, -1];
    /**BIGWIN表演時間 */
    public static BIG_WIN_LEVEL_TIME: number = 5;
    /**TOTALWIN表演時間 */
    public static TOTAL_WIN_SCROLL_TIME: number = 1;
    /**BigWin/totalWin播放完畢後等待時間 */
    public static WIN_END_DELAY: number = 2;

    /**讀取畫面逾時設定(2分鐘) */
    public static TIMEOUT_LOADING: Timeout = { key: 'Loading', seconds: 120 };
    /**待機5秒後靜音 */
    public static TIMEOUT_IDLE_MUTE: Timeout = { key: 'IdleMute', seconds: 5 };
    /**FreeGame 倒數10秒後自動進入 */
    public static TIMEOUT_FEATURE_WAIT_START: Timeout = { key: 'FeatureWaitStart', seconds: 10 };
    /**spin30秒內需回應 */
    public static TIMEOUT_RESULT_RECALL: Timeout = { key: 'ResultRecall', seconds: 30 };

    //============================= bundle資料夾名稱 =============================
    /**bundle公版語系資料夾名稱 */
    public static BUNDLE_BASE_LANGUAGE: string = 'baseLanguage';
    /**bundle公版幣別資料夾名稱 */
    public static BUNDLE_BASE_CURRENCY: string = 'currency';
    /**bundle遊戲語系資料夾名稱 */
    public static BUNDLE_LANGUAGE: string = 'language';
    /**bundle遊戲載入頁資料夾名稱 */
    public static DIR_LOADING: string = 'loading';
    //============================= bundle資料夾名稱 =============================

    /**遊戲轉動時間 */
    public static SLOT_TIME = {
        [TurboMode.Normal]: {
            spinIntervalTime: 0.1,  // 轉動/停止間隔秒數
            stopIntervalTime: 0.25,  // 停止間隔秒數
            beginTime: 0.5,   // 啟動秒數(loop是他的一半時間)
            stopTime: 0.5,  // 停止秒數
            spinTime: 1,  // 至少滾動N秒
            mipieTime: 2,   // 瞇牌秒數
            showWinTime: 1,      // 中獎演示時間
            waitNextSpinTime: 0.5       // 下一輪轉動等待秒數
        },
        [TurboMode.Fast]: {
            spinIntervalTime: 0,  // 轉動/停止間隔秒數
            stopIntervalTime: 0,  // 停止間隔秒數
            beginTime: 0.4,   // 啟動秒數(loop是他的一半時間)
            stopTime: 0.4,  // 停止秒數
            spinTime: 1,  // 至少滾動N秒
            mipieTime: 2,   // 瞇牌秒數
            showWinTime: 1,      // 中獎演示時間
            waitNextSpinTime: 0.5       // 下一輪轉動等待秒數
        },
        [TurboMode.Turbo]: {
            spinIntervalTime: 0,  // 轉動/停止間隔秒數
            stopIntervalTime: 0,  // 停止間隔秒數
            beginTime: 0.3,   // 啟動秒數(loop是他的一半時間)
            stopTime: 0.3,  // 停止秒數
            spinTime: 0.75,  // 至少滾動N秒
            mipieTime: 2,   // 瞇牌秒數
            showWinTime: 1,      // 中獎演示時間
            waitNextSpinTime: 0.5       // 下一輪轉動等待秒數
        }
    };
}