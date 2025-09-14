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
    /**倍數清單 */
    public static multiplierList: number[] = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024];
    /**FS初始倍數 */
    public static FS_INIT_MULTIPLIER: number = 8;
    public static FS_INIT_MULTIPLIER_INDEX: number = GameConst.multiplierList.indexOf(GameConst.FS_INIT_MULTIPLIER);

    /**FS獲得次數累加毫秒 */
    public static BONUS_TIME_ADD_INTERVAL = 0.2;

    /**BigWin End 播放完畢後等待時間 */
    public static BIG_WIN_END_DELAY: number = 1;

    /**金框隨機值 */
    public static RANDOM_GOLDEN: number = 0.2;
}

export enum SymbolID {
    Wild = 0,
    Scatter,
    H1,
    H2,
    H3,
    H4,
    L1,
    L2,
    L3,
    L4,
}

/**語系資源目錄 */
export enum LangBundleDir {
    banner = 'banner',
    bigwin = 'bigwin',
    board = 'board',
    featureBuy = 'featureBuy',
    fs = 'fs',
    paytable = 'paytable',
}

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

    //幸運一擊----------------------------
    /**幸運一擊按鈕 */
    FeatureBuy = 'FeatureBuy',
    /**幸運一擊購買按鈕 */
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

export enum BlackKey {
    DiceBlack = 'DiceBlack',
    UIBlack = 'UIBlack',

}

export enum GameLayer {
    Reel = 0,
    Reel2 = 1,
    Scatter = 2
}

export enum SlotMachineID {
    BS = 0,
    FS = 1
}
