import { BaseConst } from '@base/script/constant/BaseConst';
import { BaseData } from '@base/script/main/BaseData';
import { BetData } from '@base/script/main/BetData';
// import { SocketManager } from '@base/script/socket/SocketManager';
import { Auto, BaseLang, BaseLangSetting, BigWinType, CheatCodeData, CreditMode, DigitMode, FeatureBuyType, ModuleID, OrientationtMode, playAction, SpinMode, StripTable, TurboMode, UrlParam } from '@base/script/types/BaseType';
import { APIManager } from '@base/script/utils/APIManager';
import { ErrorCode, ErrorManager } from '@base/script/utils/ErrorManager';
import { XUtils } from '@base/script/utils/XUtils';


/**
 * 遊戲資料控制器
 */
export class BaseDataManager {

    private static instance: BaseDataManager = null;

    public static getInstance(): BaseDataManager {
        if (!BaseDataManager.instance) {
            BaseDataManager.instance = new BaseDataManager();
        }
        return BaseDataManager.instance;
    }

    /**當前SPIN模式 */
    public curSpinMode: SpinMode = SpinMode.Normal;

    /**當前方向模式 */
    public curOrientationMode: OrientationtMode = OrientationtMode.Portrait;

    /**當前模式 */
    public curModuleID: ModuleID = ModuleID.BS;

    /**下一模式 */
    public nextModuleID: ModuleID = ModuleID.BS;

    public curTurboMode: TurboMode = TurboMode.Speed;



    /**是否要走API版本 */
    public useAPI: boolean = false;

    /**網址參數 */
    private urlParamMap: Map<string, string> = new Map();

    /**網址參數 */
    public urlParam: UrlParam = new UrlParam();

    /**下注相關資料 */
    public bet: BetData = new BetData();

    /**加速模式(幸運一擊會強制設為Normal) */
    private turboMode: TurboMode = TurboMode.Normal;

    /**轉動過程設定的新模式,待機時帶入 */
    public tempTurboMode: TurboMode = TurboMode.Normal;

    /**目前狀態 */
    // public curState: s5g.game.proto.ESTATEID;

    /**玩家金額(真實數字要再除100) */
    public playerCent: number = 0;

    /**剩餘額度顯示模式 */
    public creditMode: CreditMode = CreditMode.Cent;

    /** 小數點顯示模式 */
    public digitMode: DigitMode = DigitMode.DOT;

    /**遊戲ID */
    public gameID: string;

    /**預設socket網址(但API優先) */
    public defaultSocketUrl: string;

    /**購買功能限制倍率(超過倍率不允許使用) */
    public luckyStrikeBlockRate: number = 0;

    /**是否開啟webview */
    public webViewVisible: boolean = false;

    /**是否已呼叫過init */
    private initialize: boolean = false;

    /**是否購買FS */
    public buyFs: boolean = false;

    /**幸運一擊購買類型(一般狀況為0) */
    public featureBuyType = 0;

    /**遊戲總贏分(BS表示一轉總得分, FS表示N轉總得分) */
    public winTotal: number = 0;

    //遊戲資料 (如果沒有呼叫setData就用預設)
    private data: BaseData = new BaseData();

    /**輪帶資料 */
    public stripTables: StripTable[] = [];

    /**盤面圖示賠率 */
    public payOfPos = [];

    /**幸運一擊購買倍率清單(幸運一擊允許N個Bet) */
    public featureBuyMultipleList: number[] = [];

    /**最低下注額(目前僅用於印尼版) */
    public lawMinBet: number = 0;

    /**自動轉資料 */
    public auto: Auto = new Auto();

    //TODO:不明
    public isMenuOn = false;
    //TODO:不明
    public isPayTable = false;

    /**狀態回復資料 */
    // public recoverData: s5g.game.proto.IRecoverData = null;

    /**8x12初始盤面 */
    public initFullSymbolPattern: number[] = [];

    /**輪帶索引 */
    public rng: number[] = [];

    /**登入帳號 */
    public account: string;
    /**登入密碼 */
    public password: string;

    /**密技內容 */
    public cheatCodeData: CheatCodeData = null;

    /**會員ID */
    public memberID: string;
    /**營運商ID */
    public operatorID: string;
    /**Token */
    public token: string;

    /**各語系設定檔 */
    public allLangSettings: Map<string, BaseLangSetting> = new Map([
        [BaseLang.bd, { demoStr: 'DEMO' }],
        [BaseLang.sch, { demoStr: '试玩' }],
        [BaseLang.tai, { demoStr: 'สาธิต' }],
        [BaseLang.ind, { demoStr: 'DEMO' }],
        [BaseLang.por, { demoStr: 'DEMO' }],
        [BaseLang.vie, { demoStr: '試玩' }],
        [BaseLang.in, { demoStr: 'DEMO' }],
        [BaseLang.esp, { demoStr: 'DEMO' }],
        [BaseLang.jp, { demoStr: 'DEMO' }],
        [BaseLang.kor, { demoStr: 'DEMO' }],
        [BaseLang.tur, { demoStr: 'DEMO' }],
        [BaseLang.eng, { demoStr: 'DEMO' }],
        [BaseLang.tch, { demoStr: 'DEMO' }]
    ]);

    public getLangSetting(): BaseLangSetting {
        return this.allLangSettings.get(this.urlParam.lang);
    }


    /**
     * 初始化
     * @param config 
     */
    public init(config: any): void {

        if (this.initialize) {
            return;//已經初始化過
        }
        this.initialize = true;

        this.parseUrlParams();//解析網址參數

        //API版本(有token資料)
        if (this.urlParam.accessToken) {
            this.gameID = /.{3}-.{2}-\d{5}/.exec(window.location.pathname)[0];
            this.useAPI = true;
            this.account = 'guest';
            this.password = '1234';
        }
        //preview, 本地開發版本
        else {
            this.gameID = config.gameID;
            this.urlParam.lang = config.lang;
            this.defaultSocketUrl = config.socketUrl;
            this.useAPI = false;
            this.urlParam.accessToken = config.token || '';
            this.account = config.account || 'guest';
            this.password = config.password || '1234';
        }

        // 根據信用模式設定貨幣單位
        let currency = this.creditMode == CreditMode.Dollar ? 'USD' : 'EUR';
        // 根據數字模式設定地區格式
        let locale = this.digitMode == DigitMode.COMMA ? 'vi-VN' : 'en-US';
        // 初始化數字格式
        XUtils.initFormat(currency, locale);
    }

    /**
     * 設置遊戲資料
     * @param data 
     */
    public setData<T extends BaseData>(data: T): void {
        this.data = data;
    }

    /**
     * 取得遊戲資料
     * @param data 
     * @returns 
     */
    public getData<T extends BaseData>(): T {
        return this.data as T;
    }

    /**
     * 解析網址參數
     */
    private parseUrlParams() {
        let sPageURL = window.location.search.substring(1);
        let sURLVariables: string[] = sPageURL.split('&');
        for (let i = 0; i < sURLVariables.length; i++) {
            let param = sURLVariables[i].split('=');
            this.urlParamMap.set(param[0], param[1]);
        }

        //sm(0:小數點表示法, 1:逗號表示法, 2:彩金表示法)
        this.creditMode = this.parseCreditMode(this.getUrlParam('sm'));
        this.digitMode = this.parseDigitMode(this.getUrlParam('sm'));
        this.urlParam.lang = this.getUrlParam('lang');
        this.urlParam.currency = this.getUrlParam('ccy').toUpperCase() || 'USD';
        this.urlParam.return_url = this.getUrlParam('return_url');
        this.urlParam.return_target = this.getUrlParam('return_target');
        this.urlParam.playMode = this.getUrlParam('pm');
        this.urlParam.accessToken = this.getUrlParam('access_token');
        this.urlParam.langCode = this.getUrlParam('lc');
        this.urlParam.isNewGameServer = parseInt(this.getUrlParam('ngf')) === 1;
        this.urlParam.customParam = this.getUrlParam('cp').toLowerCase();

        //ifun7相關
        this.urlParam.betrecordurl = this.getUrlParam('betrecordurl');
        this.urlParam.token = this.getUrlParam('token');
        this.urlParam.serverurl = this.getUrlParam('serverurl');
    }

    /**
     * 取得完整下注紀錄網址
     * @returns 
     */
    public getFullBetrecordurl(): string {
        const { betrecordurl, token, serverurl, lang } = this.urlParam;
        return `${betrecordurl}?token=${token}&lang=${lang}&serverurl=${serverurl}`;
    }

    /**
     * 
     * @param key 
     * @returns 
     */
    private getUrlParam(key: string): string {
        return this.urlParamMap.get(key) || '';
    }

    /**
     * 金額模式
     */
    public parseCreditMode(param: string): CreditMode {
        let mode: CreditMode;
        if (param.length == 0) {
            mode = CreditMode.Cent;
        }
        if (param.substring(0, 1) == '0') {
            mode = CreditMode.Cent;
        }
        else if (param.substring(0, 1) == '1') {
            mode = CreditMode.Dollar;
        }
        else if (param.substring(0, 1) == '2') {
            mode = CreditMode.Credit;  //so far do no support
        }
        return mode;
    }

    /**
     * 取得贏錢倍數
     * @param value 
     * @returns 
     */
    public getWinMultipleByValue(value: number): number {
        return value / this.bet.getCurBetXCurLine();
    }

    /**
     * 取得橫幅等級
     * @param value 
     */
    public getBannerLevelByValue(value: number): number {
        let multiple: number = this.getWinMultipleByValue(value);
        let level: number = 0;
        for (let i = 0; i < BaseConst.BANNER_WIN_RANGE.length; i++) {
            if (multiple > BaseConst.BANNER_WIN_RANGE[i]) {
                level = i;
            }
        }
        return level;
    }

    /**
     * 取得value對應BigWin類型
     * @param value 
     */
    public getBigWinTypeByValue(value: number): BigWinType {
        let bigWinLevel: BigWinType = BigWinType.non;
        let multiple: number = this.getWinMultipleByValue(value);
        for (let i = 0; i < this.data.BIG_WIN_MULTIPLE.length; i++) {
            if (multiple >= this.data.BIG_WIN_MULTIPLE[i]) {
                bigWinLevel = i;
            }
        }
        return bigWinLevel;
    }

    public isIdle(): boolean {
        return false;
        // return this.curState === s5g.game.proto.ESTATEID.K_IDLE;
    }

    // public setState(state: s5g.game.proto.ESTATEID): void {
    //     this.curState = state;
    //     SocketManager.getInstance().sendMessage(s5g.game.proto.EMSGID.eStateCall);
    // }

    /**
     * 
     */
    private parseDigitMode(param: string): DigitMode {
        let mode: DigitMode;
        if (param.length == 0) {
            mode = DigitMode.DOT;
        }
        else if (param.substr(1, 1) == '1') {
            mode = DigitMode.COMMA;
        }
        else {
            mode = DigitMode.DOT;
        }
        return mode;
    }

    /**
     * 取得輪帶
     * @param id 
     * @returns 
     */
    public getStripTable() {
        for (let i = 0; i < this.stripTables.length; i++) {
            if (this.stripTables[i]._id == this.curModuleID) {
                return this.stripTables[i];
            }
        }
        return null;
    }

    /**
     * 取得ID對應輪帶表
     * @param id 
     * @returns 
     */
    public getStripTableByID(id: ModuleID) {
        for (let i = 0; i < this.stripTables.length; i++) {
            if (this.stripTables[i]._id == id) {
                return this.stripTables[i];
            }
        }
        return null;
    }

    public getPlayerAction(): playAction {
        let actionIndex = playAction.NormalNAutoNSpeed;
        if (this.featureBuyType == FeatureBuyType.LuckyStrick100) {
            actionIndex = playAction.LuckyStrick100;
        } else if (this.featureBuyType === FeatureBuyType.LuckyStrick80) {
            actionIndex = playAction.LuckyStrick80;
        } else if (this.featureBuyType === FeatureBuyType.LuckyStrick60) {
            actionIndex = playAction.LuckyStrick60;
        } else if (this.auto.isAutoPlay() && this.isTurboOn() === true) {
            actionIndex = playAction.NormalAutoSpeed;
        } else if (this.auto.isAutoPlay() && this.isTurboOn() === false) {
            actionIndex = playAction.NormalAutoNSpeed;
        } else if (this.auto.isAutoPlay() === false && this.isTurboOn() === true) {
            actionIndex = playAction.NormalNAutoSpeed;
        } else {
            actionIndex = playAction.NormalNAutoNSpeed;
        }
        return actionIndex;
    }

    public isBlockKeyboard(): boolean {
        return this.webViewVisible || this.isPayTable;
    }

    public getSocketUrl(): string {
        return APIManager.getInstance().getSocketUrl() || this.defaultSocketUrl;
    }

    public getMapIndex(idx: number): number {
        return XUtils.getMapIndex(idx, this.getData().REEL_ROW);
    }

    /**
     * 設定幸運一擊購買倍率清單
     * @param data 
     */
    public setFeatureBuyMultipleList(data: number[] | number): void {
        //一律存為陣列
        if (Array.isArray(data)) {
            this.featureBuyMultipleList = data.concat();
        }
        else {
            this.featureBuyMultipleList = [data];
        }

    }

    /**
     * 幸運一擊是否可用
     * @returns 幸運一擊購買金額 <= 幸運一擊限制購買金額(最大投注 x 幸運一擊限制倍率)
     */
    public isFeatureBuyEnabled(): boolean {
        return this.getCurFeatureBuyTotal() <= this.bet.getMaxTotal() * this.luckyStrikeBlockRate;
    }

    /**
     * 幸運一擊購買金額
     * @returns 幸運一擊購買金額 = 幸運一擊購買倍率 x 總下注
     */
    public getCurFeatureBuyTotal(): number {
        return this.getCurFeatureBuyMultiple() * this.bet.getCurRateXCurBet();
    }

    public getFeatureBuyCostAt(type: number): number {
        return this.featureBuyMultipleList[type] * this.bet.getCurRateXCurBet();
    }

    /**
     * 取得目前幸運一擊購買倍率(幸運一擊允許N個Bet)
     * @returns 
     */
    public getCurFeatureBuyMultiple(): number {
        return this.featureBuyMultipleList[this.featureBuyType];
    }

    /**
     * 幸運一擊金額為N個Bet
     * @returns 
     */
    public getFeatureBuyNumOfCost(): number {
        return this.getCurFeatureBuyMultiple() / this.bet.getLineAt(0);
    }

    /**
     * 取得幸運一擊最大購買金額
     */
    public getFeatureBuyMaxBet(): number {
        let lk = this.luckyStrikeBlockRate;
        let max = this.bet.getMaxTotal();
        let numCost = this.getFeatureBuyNumOfCost();
        let len = this.bet.getTotalLength();
        let featureBuyLimit = (lk * max) / numCost;
        let totalIdx: number = -1;
        for (let i = 0; i < len; i++) {
            if (this.bet.getTotalAt(i) <= featureBuyLimit) {
                totalIdx = i;
            }
        }

        //設為0時, 回傳購買金額0
        if (totalIdx === -1) {
            return 0;
        }
        else {
            return XUtils.numberToFloor(this.bet.getTotalAt(totalIdx));
        }
    }

    /**
     * 取得幸運一擊購買倍率
     * @param type 
     * @returns 
     */
    public getFeatureBuyMultipleByType(type: number): number {
        return this.featureBuyMultipleList[type] / this.bet.getLineAt(0);
    }

    /**
     * 是否為Demo模式
     * @returns 
     */
    public isDemoMode(): boolean {
        return this.urlParam.playMode == '1';
    }

    //TODO:太多地方用, 還不確定明確用途, 暫時保留
    /**
     * 測試溢位
     * @param value 
     * @returns 
     */
    public TestOverFlow(value: number): boolean {
        if (value < 1000000000000) {
            return true;
        }
        else {
            ErrorManager.getInstance().showError(ErrorCode.Overflow);
            return false;
        }
    }

    /**
     * 是否為BS模式
     * @returns 
     */
    public isBS(): boolean {
        return this.curModuleID === ModuleID.BS;
    }

    /**
     * 設定加速模式
     * @param mode 
     */
    public setTurboMode(mode: TurboMode) {
        this.turboMode = mode;
    }

    /**
     * 取得加速模式
     * @returns 
     */
    public getTurboMode(): TurboMode {
        if (this.curModuleID != ModuleID.BS) {
            return TurboMode.Normal;
        }
        else {
            return this.turboMode;
        }
    }

    /**
     * 非Normal都是加速
     * @returns 
     */
    public isTurboOn(): boolean {
        return this.getTurboMode() !== TurboMode.Normal;
    }


    /**
     * Rng是1-base所以要-1
     * @param rngList 
     * @returns 
     */
    public getMapByRng(rngList: number[]): number[] {
        let stripTable = this.getStripTable();
        let strips = stripTable._strips;
        let map: number[] = [];
        for (let row: number = 0; row < 8; ++row) {
            for (let col: number = 0; col < 8; ++col) {
                let symbol: number = -1;
                let reel_strip = strips[col];
                if (reel_strip && row < this.data.REEL_ROW) {
                    let rng = (rngList[col] - 1 + row + strips[col].length) % strips[col].length;
                    symbol = strips[col][rng];
                }
                else {
                    symbol = 255;
                }

                map.push(symbol);
            }
        }
        return map;
    }
}