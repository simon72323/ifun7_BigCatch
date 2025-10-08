/**
 * 遊戲常數
 */
export class GameConst {
    /**Scatter中獎數量 */
    public static BONUS_WIN_COUNT: number = 3;
    /**消去演示時間 */
    public static EXPLODE_TIME: number = 1;
    /**圖示權重(越大越上層) */
    public static symbolWeight: number[] = [0, 99, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    /**圖示ID數量 */
    public static symbolCount: number = 16;
    /**倍數清單 */
    // public static multiplierList: number[] = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024];

    /** 中獎線路配置 (3x5盤面) */
    public static payLineData: number[][] = [
        [1, 1, 1, 1, 1], [0, 0, 0, 0, 0], [2, 2, 2, 2, 2], [1, 0, 0, 0, 1], [1, 2, 2, 2, 1],
        [2, 1, 0, 1, 2], [0, 1, 2, 1, 0], [2, 2, 1, 0, 0], [0, 0, 1, 2, 2], [2, 1, 1, 1, 0]
    ];

    /**FS獲得次數累加毫秒 */
    public static BONUS_TIME_ADD_INTERVAL = 0.2;
    /**BigWin End 播放完畢後等待時間 */
    public static BIG_WIN_END_DELAY: number = 1;
    /**金框隨機值 */
    public static RANDOM_GOLDEN: number = 0.2;
    /**橫軸列數 */
    public static REEL_COL: number = 5;
    /**縱軸列數 */
    public static REEL_ROW: number = 3;
    /**自訂BigWin倍數 */
    public static BIG_WIN_MULTIPLE: number[] = [10, 20, 40, 80, 120];

    /**遊戲表演時間 */
    public static SLOT_TIME = {
        // 正常模式
        normal: {
            showWinDuration: 1,      // 中獎演示時間
            explodeTime: 1,          // 消去動畫時間
            autoSpinTime: 0.5,        // 自動轉停止後，等待一段時間再開始下一輪
            reelStopTime: 0.1,        // 每個轉軸停止間隔時間
            reelMiTime: 1,          // 每個轉軸瞇牌時間
            symbolFallTime: 0.5,      // 符號掉落速度倍率
            bigWinEndDelay: 0.5,       // BigWin結束延遲
            bonusTimeAddInterval: 0.2  // 獎勵時間累加間隔
        },
        // 快速模式
        speed: {
            showWinDuration: 0.6,      // 中獎演示時間
            explodeTime: 0.6,          // 消去動畫時間
            autoSpinTime: 0.3,        // 自動轉停止後，等待一段時間再開始下一輪
            reelStopTime: 0.05,        // 每個轉軸停止間隔時間
            reelMiTime: 0.6,          // 每個轉軸瞇牌時間
            symbolFallTime: 0.3,      // 符號掉落速度倍率
            bigWinEndDelay: 0.3,       // BigWin結束延遲
            bonusTimeAddInterval: 0.2  // 獎勵時間累加間隔
        },
        // 極速模式
        turbo: {
            showWinDuration: 0.4,      // 中獎演示時間
            explodeTime: 0.4,          // 消去動畫時間
            autoSpinTime: 0.2,        // 自動轉停止後，等待一段時間再開始下一輪
            reelStopTime: 0,        // 每個轉軸停止間隔時間
            reelMiTime: 0.4,          // 每個轉軸瞇牌時間
            symbolFallTime: 0.2,      // 符號掉落速度倍率
            bigWinEndDelay: 0.2,       // BigWin結束延遲
            bonusTimeAddInterval: 0.1  // 獎勵時間累加間隔
        }
        // ,
        // 超速模式
        // ultra: {
        //     showWinDuration: 0.1,      // 中獎演示時間
        //     explodeTime: 0.1,          // 消去動畫時間
        //     autoSpinTime: 0.1,        // 自動轉停止後，等待一段時間再開始下一輪
        //     reelStopTime: 0,        // 每個轉軸停止間隔時間
        //     reelMiTime: 0,          // 每個轉軸瞇牌時間
        //     symbolFallTime: 0,      // 符號掉落速度倍率
        //     bigWinEndDelay: 0,       // BigWin結束延遲
        //     bonusTimeAddInterval: 0  // 獎勵時間累加間隔
        // }
    };
}

/**符號ID */
export enum SymbolID {
    Wild = 0,
    H1 = 1,
    H2,
    H3,
    H4,
    F1 = 5,
    F2,
    F3,
    F4,
    F5,
    F6,
    LA = 11,
    LK,
    LQ,
    LJ,
    LT,
    Scatter = 16,
}

/**語系資源目錄 */
// export enum LangBundleDir {
//     banner = 'banner',
//     bigwin = 'bigwin',
//     board = 'board',
//     featureBuy = 'featureBuy',
//     fs = 'fs',
//     paytable = 'paytable',
// }

export enum GameAnimationName {
    /**scale:0(0s)->scale:1.2(in 0.2s)->scale:1(in 0.1s) */
    scaleTxt = 'scaleTxt',
    ScaleJumpWinTxt = 'ScaleJumpWinTxt',
    ScaleJumpMultipleTxt = 'ScaleJumpMultTxt',
    gameShakeUp = 'gameShakeUp',
    gameShakeLeft = 'gameShakeLeft',
    fadeInSpine = 'fadeInSpine',
    fadeOutSpine = 'fadeOutSpine',
}

/**
 * 共用音樂音效Key
 */
export enum GameAudioKey {
    //BGM----------------------------
    /**BS BGM */
    MG = 'MG',
    /**BS BGM2 */
    noBtn = 'noBtn',
    /**FS BGM */
    FG = 'FG',

    //老虎機----------------------------
    /**瞇牌 */
    waiting = 'waiting',
    /**第一軸掉落到定位 */
    down = 'down',

    //FS轉場----------------------------
    /**FS點開始 */
    FgStart = 'FgStart',
    /**FS轉場 */
    FgTran = 'FgTran',
    /**FS面板 */
    confrats = 'confrats',

    //準心----------------------------
    /**準心 */
    line = 'line',
    /**準心開槍 */
    lineShot = 'lineShot',

    //scatter----------------------------
    /**scatter出現 */
    scatter = 'scatter',
    /**SC中獎 */
    st = 'st',

    //左輪----------------------------
    /**左輪補彈匣 */
    reloading = 'reloading',

    //FS----------------------------
    /**FS結算 */
    TW = 'TW',
    /**拔槍 */
    dg = 'dg',
    /**拍槍 */
    hitGun = 'hitGun',
    /**開槍 */
    shot = 'shot',
    /**收槍 */
    putaway = 'putaway',
    /**轉槍 */
    rotation = 'rotation',
    /**壞人笑 */
    laughing = 'laughing',
    /**壞人死 */
    die = 'die',

    //免費遊戲----------------------------
    /**免費遊戲按鈕 */
    FeatureBuy = 'FeatureBuy',
    /**免費遊戲購買按鈕 */
    buy = 'buy',

    //其他----------------------------
    /**倍數出現 */
    combine = 'combine',
    /**贏得 */
    win = 'win',
    /**共贏得 */
    wt = 'wt',
    /**炸彈引信 */
    fuse = 'fuse',
    /**字母*/
    Letter = 'Letter',
    /**FS輪軸發光*/
    scExpand = 'scExpand',
    /**手槍*/
    symbolGun = 'symbolGun',
    /**帽子*/
    symbolHat = 'symbolHat',
    /**轉軸啟動*/
    in = 'in',
}

/**壓黑Key */
export enum BlackKey {
    DiceBlack = 'DiceBlack',
    UIBlack = 'UIBlack',

}

/**遊戲Layer */
export enum GameLayer {
    Reel = 0,
    Reel2 = 1,
    Scatter = 2
}

/**老虎機ID */
export enum SlotMachineID {
    BS = 0,
    FS = 1
}