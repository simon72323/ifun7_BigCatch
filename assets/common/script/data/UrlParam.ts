export class UrlParam {
    /** 用戶token */
    public token: string = '';
    /** 遊戲id */
    public gameId: number = 0;
    /** 語言 */
    public lang: string = '';
    /** 投注記錄url */
    public betRecordUrl: string = '';
    /** 主頁url */
    public homeUrl: string = '';
    /** 模式 */
    public mode: string = '';
    /** 伺服器url */
    public serverUrl: string = '';
    /** 依據參數顯示不同 loading 頁 */
    public b: string = '';

    /**
     * 初始化並快取所有URL參數
     */
    public initUrlParameters(): void {
        const urlParams = new URLSearchParams(window.location.search);

        this.token = urlParams.get(urlParamKey.TOKEN) || '';
        this.gameId = parseInt(urlParams.get(urlParamKey.GAME_ID) || '0');
        this.lang = urlParams.get(urlParamKey.LANGUAGE) || '';
        this.betRecordUrl = urlParams.get(urlParamKey.BET_RECORD_URL) || '';
        this.homeUrl = urlParams.get(urlParamKey.HOME_URL) || '';
        this.mode = urlParams.get(urlParamKey.MODE) || '';
        this.serverUrl = urlParams.get(urlParamKey.SERVER_URL) || '';
        this.b = urlParams.get(urlParamKey.B) || '';
    }
}

// export const gerUrlParam = new UrlParam();

enum urlParamKey {
    TOKEN = 'token',
    GAME_ID = 'gameid',
    LANGUAGE = 'lang',
    BET_RECORD_URL = 'betrecordurl',
    HOME_URL = 'homeurl',
    MODE = 'mode',
    SERVER_URL = 'serverurl',
    B = 'b',
}