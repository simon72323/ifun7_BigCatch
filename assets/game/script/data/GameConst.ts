import { BaseConst } from '@common/script/data/BaseConst';

/**
 * 遊戲常數
 */
export class GameConst {
    /**Scatter中獎數量 */
    public static SCATTER_WIN_COUNT: number = 3;
    /**消去演示時間 */
    public static EXPLODE_TIME: number = 1;
    /**圖示權重(越大越上層) */
    // public static symbolWeight: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 99];
    /**圖示ID數量 */
    // public static symbolCount: number = 16;
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
    /**scatter中獎次數 */
    public static SCATTER_MAPPING: { [key: number]: number } = {
        3: 10,  // 索引1對應3個scatter，10次
        4: 15,  // 索引2對應4個scatter，15次
        5: 20   // 索引3對應5個scatter，20次
    };

    /**BS初始盤面結果 */
    public static BS_INIT_RESULT: number[][] = [
        [15, 16, 17],
        [1, 6, 2],
        [8, 0, 7],
        [3, 5, 4],
        [18, 19, 20]
    ];

    /**遊戲表演時間 */
    // public static COMMON_TIME = {
    //     autoSpinTime: 0.5,        // 自動轉停止後，等待一段時間再開始下一輪
    //     bigWinEndDelay: 0.5,       // BigWin結束延遲
    //     bonusTimeAddInterval: 0.2  // 獎勵時間累加間隔
    // };
}

/**符號ID */
export enum SymbolID {
    Wild = 0,
    H1 = 1,
    H2 = 2,
    H3 = 3,
    H4 = 4,
    F1 = 5,
    F2 = 6,
    F3 = 7,
    F4 = 8,
    F5 = 9,
    F6 = 10,
    F7 = 11,
    F8 = 12,
    LA = 15,
    LK = 16,
    LQ = 17,
    LJ = 18,
    LT = 19,
    Scatter = 20,
}

/**魚倍率 */
export const FISH_ODDS = {
    [SymbolID.F1]: 2,
    [SymbolID.F2]: 5,
    [SymbolID.F3]: 10,
    [SymbolID.F4]: 15,
    [SymbolID.F5]: 20,
    [SymbolID.F6]: 25,
    [SymbolID.F7]: 50,
    [SymbolID.F8]: 2000
} as const;

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