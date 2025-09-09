import { Vec2 } from "cc";
import { BaseEvent } from "../main/BaseEvent";

/**
 * 大獎類型
 */
export enum BigWinType {
    big = 0,
    mega = 1,
    super = 2,
    ultra = 3,
    ultimate = 4,
    non = 5
};


/**場景類型 */
export enum ModuleID {
    /**一般遊戲 */
    BS = 'BS',
    /**免費遊戲 */
    FS = 'FS',
    /**購買免費遊戲 */
    BFS = 'BFS',
}

/**
 * Spin按鈕狀態
 */
export enum SpinButtonState {
    Idle = 0,
    Loop,
    Win,
    Auto,
    Disabled
}

export enum playAction {
    NormalNAutoNSpeed = 0,
    NormalNAutoSpeed = 1,
    NormalAutoNSpeed = 2,
    NormalAutoSpeed = 3,
    LuckyStrick100 = 4,
    LuckyStrick80 = 5,
    LuckyStrick60 = 6,
}

export enum FeatureBuyType {
    LuckyStrick100 = 0,
    LuckyStrick80 = 1,
    LuckyStrick60 = 2,
}

export enum ScrollEventType {
    SCROLL_TO_TOP = 0,
    SCROLL_TO_BOTTOM = 1,
    SCROLL_TO_LEFT = 2,
    SCROLL_TO_RIGHT = 3,
    SCROLLING = 4,
    BOUNCE_TOP = 5,
    BOUNCE_BOTTOM = 6,
    BOUNCE_LEFT = 7,
    BOUNCE_RIGHT = 8,
    SCROLL_ENDED = 9,
    TOUCH_UP = 10,
    AUTOSCROLL_ENDED_WITH_THRESHOLD = 11,
    SCROLL_BEGAN = 12
}

/**
 * 輪帶資料結構
 */
export class StripTable {
    /**場景ID */
    _id: ModuleID;

    /**各軸輪帶資料 */
    _strips: number[][] = [];

    /**各軸輪帶長度 */
    _strips_length: number[] = [];

    constructor(id: ModuleID) {
        this._id = id;
    }
    public setStrips(strips: number[][]) {
        this._strips = strips;
        this._strips_length = [];
        for (let i = 0; i < this._strips.length; i++) {
            this._strips_length.push(this._strips[i].length);
        }
    }
}

/**
 * 遊戲說明結構
 */
export type HelpTextData = {
    lineText: string,
    fontName: string,
    fontSize: number,
    color: string,
    position: Vec2,
    Anchor: Vec2,
    align: Vec2,
    page: number
}


export type HostInfo = {
    access_token: string,//"eyJpdiI6Im9...""
    banking_url: string,
    bill_currency: any,//空
    eventDrawInfo: any,//空
    eventInfo: any,//[]
    fullscr: string,//"1"
    game_enable: boolean,
    game_id: string,//"S5G-H5-99969"
    game_type: string,//"SLOT"
    game_version: { br: string, build: number, major: number, rev: number }//{major: 46, rev: 118, build: 1532, br: 'main'}
    history_enable: boolean,//true
    history_url: string,//""
    host_id: string,//"89228c3fdf4072d8a554dc212a18207d"
    host_image: any,//{}
    host_name: string,//"1ky"
    host_resource: number[],//[0, 0, 0, 0, 0]
    lang: string,//"sch"
    lang_code: string,//"zh-CN"
    loading_logo_enable: number,//0
    lobby_turntable: string,//"0"
    logo: string,//""
    min_rev: number,//0
    reel_spin: number,//0
    return_type: number,//2
    server_info: any,//{slot:'wss://uat-gs.5gg.dev:2052'}
    site_name: string,//"1ky"
    subgame_id: string,//"0"
    type_id: string,//"CC"
    windows_resize: number,//0
    windows_rotation: number,//0
}

export enum CreditMode {
    Cent = 0,
    Dollar = 1,
    Credit = 2
};
export enum DigitMode {
    DOT = 0,
    COMMA = 1
};
export enum EVENTTYPE {
    COMMON = 0,
    REEL = 1,
    UI = 2,
    STATE = 3,
    ACTIONS = 4,
    OTHER = 5
};

/**
 * 自動轉狀態
 */
export enum AutoPlayMode {
    /**禁用 */
    disable = 0,
    /**連續轉 */
    always = 1,
    /**直到免費轉 */
    tillBonus = 2,
    /**轉N次 */
    num = 3,
};

/**
 * 快速模式
 */
export enum TurboMode {
    Normal = 0,
    Speed = 1,
    Turbo = 2
};

/**
 * 擴散動畫物件
 */
export class SpreadObject {
    public pos: number = 0;
    public direct: string;
    constructor(pos: number, direct: string) {
        this.pos = pos;
        this.direct = direct;
    }
}

/**
 * 欄列物件
 */
export type Grid = {
    col: number,
    row: number
}


/**
 * URL參數
 */
export class UrlParam {
    /** */
    public accessToken: string;
    /** */
    public subID: number;
    /**金額模式 */
    public creditMode: CreditMode;
    /**幣別 */
    public currency: string;
    /**語系 */
    public lang: string;
    /** */
    public return_url: string;
    /** */
    public return_target: string;
    /**遊戲模式 */
    public playMode: string;
    /**正規語系 */
    public langCode: string;
    /**是否為新架構(新架構才有此參數) */
    public isNewGameServer: boolean;
    /**客製化參數 */
    public customParam: string;
}

/**
 * 自動轉資料
 */
export class Auto {
    /**自動轉模式 */
    public mode: AutoPlayMode = AutoPlayMode.disable;
    /**自動轉次數 */
    public num: number = -1;

    /**是否正在自動轉 */
    public isAutoPlay(): boolean {
        return this.mode != AutoPlayMode.disable;
    }

    /**
     * 停止自動轉並廣播
     */
    public stopAuto(): void {
        if (this.isAutoPlay()) {
            this.mode = AutoPlayMode.disable;
            BaseEvent.onStopAuto.emit();
        }
    }
}

/**
 * 逾時定義
 */
export type Timeout = {
    /**逾時key */
    key: string;
    /**逾時秒數 */
    seconds: number;
}

/**
 * 共用bundle資料
 */
export enum BaseLangBundleDir {
    bigWin = "bigwin",
    ui3_0 = "ui3.0",
    loading = "loading",
}

/**
 * 共用Animation
 */
export enum BaseAnimationName {
    fadeInOpacity = "fadeInOpacity",
    fadeOutOpacity = "fadeOutOpacity",
    fadeInAndOut = "fadeIn&Out",
}

/**
 * 語系代號
 */
export enum BaseLang {
    sch = "sch",
    tch = "tch",
    ind = "ind",
    por = "por",
    tai = "tai",
    vie = "vie",
    in = "in",
    esp = "esp",
    jp = "jp",
    kor = "kor",
    tur = "tur",
    bd = "bd",
    eng = "eng",
}

export type BaseLangSetting = {
    demoStr: string
}

/**
 * 密技內容
 */
export class CheatCodeData {
    public rng: number[];
    public rngList: number[][];
}