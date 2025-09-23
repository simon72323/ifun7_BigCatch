export enum NetworkApi {
    // RENEW_TOKEN = 'renew_token',
    GET_USER_DATA = 'get_user_data',
    GET_GAME_DATA = 'get_game_data',
    GET_JACKPOT = 'get_jackpot',
    GET_CASH_DROP = 'get_cash_drop',
    GET_TOURNAMENT = 'get_tournament',
    GET_PROMOTION_BRIEF = 'get_promotion_brief',
    GET_CASH_DROP_PRIZE_RECORD = 'get_cash_drop_prize_record',
    GET_TOURNAMENT_PRIZE_RECORD = 'get_tournament_prize_record',
    GET_JP = 'get_jp',
    GET_JP_AMOUNT = 'get_jp_amount',
    GET_JP_PRIZE_RECORD = 'get_jp_prize_record',
    GET_IN_GAME_MENU_STATUS = 'get_in_game_menu_status',
    GET_EXTRA_DATA = 'get_extra_data',
    SPIN = 'spin',
    GET_IN_GAME_MENU = 'get_in_game_menu',
    UPDATE_IN_GAME_MENU_FAVORITE_GAME = 'update_in_game_menu_favorite_game',
    GET_IN_GAME_MENU_GAME_URL = 'get_in_game_menu_game_url'
}

//========================= 接收用戶資料 =========================
// export interface IUserDataResponse {
//     command: string;
//     error_code: number;
//     message: string;
//     data: IUserData;
// }

export interface IUserData {
    account: string;
    agent_account: string;
    credit: number;
    currency: string;
    free_spin_data: IFreeSpinData[];
    is_anchor: boolean;
    simulator_data: any;
}

interface IFreeSpinData {
    free_spin_id: string;
    bet: number;
    end_date: string;
    rounds_left: number;
}
//========================= 接收用戶資料 =========================


//========================= 接收遊戲資料 =========================
// export interface IGameDataResponse {
//     command: string;
//     error_code: number;
//     message: string;
//     data: IGameData;
// }
export interface IGameData {
    game_id: number;
    line_bet: number[];
    coin_value: number[];
    bet_available_idx: number;
    line_total: number;
    line_available: number[];
    line_bet_default_index: number;
    coin_value_default_index: number;
    win: number;
    big_win: number;
    super_win: number;
    mega_win: number;
    spin_mode: number;
    buy_spin: IBuySpin;
}

interface IBuySpin {
    allow_buy: number;
    multiplier: number;
    limit_total: number;
}
//========================= 接收遊戲資料 =========================


//========================= 接收遊戲選單資料 =========================
// export interface IGameMenuResponse {
//     command: string;
//     error_code: number;
//     message: string;
//     data: IGameMenu;
// }
export interface IGameMenu {
    game_name: {
        game_id: number;
        language: IGameLanguage;
    }[];
    game: {
        game_id: number;
        status: number;
    }[];
    favorite: number[]; // 我的最愛遊戲 ID 列表
    image: string; // 遊戲圖示 URL
}

// 遊戲語言資料
export interface IGameLanguage {
    en: string;
    id: string;
    ko: string;
    ms: string;
    ph: string;
    th: string;
    vi: string;
    'zh-cn': string;
}
//========================= 接收遊戲選單資料 =========================


//========================= 接收下注資料 =========================
// export interface ISpinResponse {
//     command: string;
//     error_code: number;
//     message: string;
//     data: ISpinData;
// }

export interface ISpinData {
    game_id: number;
    main_game: IGameResult;
    get_sub_game: boolean;
    sub_game: {
        pay_credit_total: number;
        spin_times: number;
        result: IGameResult[] | null;
    } | null;
    get_jackpot: boolean;
    jackpot: {
        jackpot_id: string;
        jackpot_credit: number;
        symbol_id: any;
    };
    get_jackpot_increment: boolean;
    jackpot_increment: any;
    grand: number;
    major: number;
    minor: number;
    mini: number;
    user_credit: number;
    bet_credit: number;
    payout_credit: number;
    change_credit: number;
    effect_credit: number;
    buy_spin: number;
    buy_spin_multiplier: number;
    extra: {
        user_data: {
            random_wild_gem: number;
            wildX2_gem: number;
        };
        free_spin_times: number;
    } | null;
}

export interface IGameResult {
    pay_credit_total: number;
    game_result: number[][];
    pay_line: {
        pay_line: number;
        symbol_id: number;
        amount: number;
        pay_credit: number;
        multiplier: number;
    }[];
    scatter_info: ISymbolInfo | null;
    wild_info: ISymbolInfo | null;
    scatter_extra: any[] | null;
    extra: IExtraInfo | null;
}

export interface ISymbolInfo {
    id: number[];
    position: number[][];
    amount: number;
    multiplier: number;
    pay_credit: number;
    pay_rate: number;
}

export interface IExtraInfo {
    game_result: number[][];
    near_win: number;
    free_spin: IFreeSpinInfo;
    all_wild_position: number[][];
}

export interface IFreeSpinInfo {
    times: number;
    init_result: number[][] | null;
    scatter_info: ISymbolInfo | null;
}
//========================= 接收下注資料 =========================


//========================= 傳送下注資料 =========================
// export interface IBetDataRequest {
//     game_id: number,
//     line_bet: number,
//     line_num: number,
//     coin_value: number,
//     bet_credit: number,
//     buy_spin: number
// }


//========================= 傳送下注資料 =========================