import { BaseConst } from '@common/script/data/BaseConst';
import { TurboMode } from '@common/script/types/BaseType';

/**
 * 遊戲常數
 */
export class GameConst extends BaseConst {
    /**Scatter中獎數量 */
    public static SCATTER_WIN_COUNT: number = 3;

    /** 中獎線路配置 (3x5盤面) */
    public static payLineData: number[][] = [
        [1, 1, 1, 1, 1], [0, 0, 0, 0, 0], [2, 2, 2, 2, 2], [1, 0, 0, 0, 1], [1, 2, 2, 2, 1],
        [2, 1, 0, 1, 2], [0, 1, 2, 1, 0], [2, 2, 1, 0, 0], [0, 0, 1, 2, 2], [2, 1, 1, 1, 0]
    ];

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

    /**遊戲轉動時間(遊戲可覆寫BaseConst的SLOT_TIME) */
    public static SLOT_TIME = {
        [TurboMode.Normal]: {
            spinIntervalTime: 0.04,  // 轉動/停止間隔秒數
            stopIntervalTime: 0.2,  // 停止間隔秒數
            beginTime: 0.5,   // 啟動秒數
            loopTime: 0.25,   // 循環秒數
            stopTime: 0.5,  // 停止秒數
            skipStopTime: 0.3,  // 急停秒數
            spinTime: 1,  // 至少滾動N秒
            mipieTime: 2,   // 瞇牌秒數
            showWinTime: 2,      // 中獎演示時間
            waitNextSpinTime: 0.1      // 下一輪轉動等待秒數
        },
        [TurboMode.Fast]: {
            spinIntervalTime: 0,  // 轉動/停止間隔秒數
            stopIntervalTime: 0.1,  // 停止間隔秒數
            beginTime: 0.4,   // 啟動秒數
            loopTime: 0.2,   // 循環秒
            stopTime: 0.4,  // 停止秒數
            skipStopTime: 0.3,  // 急停秒數
            spinTime: 0.7,  // 至少滾動N秒
            mipieTime: 2,   // 瞇牌秒數
            showWinTime: 2,      // 中獎演示時間
            waitNextSpinTime: 0.1       // 下一輪轉動等待秒數
        },
        [TurboMode.Turbo]: {
            spinIntervalTime: 0,  // 轉動/停止間隔秒數
            stopIntervalTime: 0,  // 停止間隔秒數
            beginTime: 0.3,   // 啟動秒數
            loopTime: 0.15,   // 循環秒數
            stopTime: 0.3,  // 停止秒數
            skipStopTime: 0.3,  // 急停秒數
            spinTime: 0.4,  // 至少滾動N秒
            mipieTime: 2,   // 瞇牌秒數
            showWinTime: 2,      // 中獎演示時間
            waitNextSpinTime: 0.1       // 下一輪轉動等待秒數
        }
    };

}

/**覆蓋BaseConst的SLOT_TIME */
BaseConst.SLOT_TIME = GameConst.SLOT_TIME;

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
    F7,
    F8,
    LA = 15,
    LK,
    LQ,
    LJ,
    LT,
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

/**
 * 共用音樂音效Key
 */
// export enum GameAudioKey {
//     //BGM----------------------------
//     /**BS BGM */
//     MG = 'MG',
//     /**BS BGM2 */
//     noBtn = 'noBtn',
//     /**FS BGM */
//     FG = 'FG',

//     //老虎機----------------------------
//     /**瞇牌 */
//     waiting = 'waiting',
//     /**第一軸掉落到定位 */
//     down = 'down',

//     //FS轉場----------------------------
//     /**FS點開始 */
//     FgStart = 'FgStart',
//     /**FS轉場 */
//     FgTran = 'FgTran',
//     /**FS面板 */
//     confrats = 'confrats',

//     //準心----------------------------
//     /**準心 */
//     line = 'line',
//     /**準心開槍 */
//     lineShot = 'lineShot',

//     //scatter----------------------------
//     /**scatter出現 */
//     scatter = 'scatter',
//     /**SC中獎 */
//     st = 'st',

//     //左輪----------------------------
//     /**左輪補彈匣 */
//     reloading = 'reloading',

//     //FS----------------------------
//     /**FS結算 */
//     TW = 'TW',
//     /**拔槍 */
//     dg = 'dg',
//     /**拍槍 */
//     hitGun = 'hitGun',
//     /**開槍 */
//     shot = 'shot',
//     /**收槍 */
//     putaway = 'putaway',
//     /**轉槍 */
//     rotation = 'rotation',
//     /**壞人笑 */
//     laughing = 'laughing',
//     /**壞人死 */
//     die = 'die',

//     //免費遊戲----------------------------
//     /**免費遊戲按鈕 */
//     FeatureBuy = 'FeatureBuy',
//     /**免費遊戲購買按鈕 */
//     buy = 'buy',

//     //其他----------------------------
//     /**倍數出現 */
//     combine = 'combine',
//     /**贏得 */
//     win = 'win',
//     /**共贏得 */
//     wt = 'wt',
//     /**炸彈引信 */
//     fuse = 'fuse',
//     /**字母*/
//     Letter = 'Letter',
//     /**FS輪軸發光*/
//     scExpand = 'scExpand',
//     /**手槍*/
//     symbolGun = 'symbolGun',
//     /**帽子*/
//     symbolHat = 'symbolHat',
//     /**轉軸啟動*/
//     in = 'in',
// }

/**遊戲Layer */
// export enum GameLayer {
//     Reel = 0,
//     Reel2 = 1,
//     Scatter = 2
// }

/**老虎機ID */
export enum SlotMachineID {
    BS = 0,
    FS = 1
}