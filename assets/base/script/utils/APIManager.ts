import { BaseDataManager } from '@base/script/main/BaseDataManager';

export class APIManager {
    private static instance: APIManager;

    /**socket連線位置 */
    private socketUrl: string[] = [];

    /**window.psapi */
    private psAPI: any;

    public static getInstance(): APIManager {
        if (!APIManager.instance) {
            APIManager.instance = new APIManager();
        }
        return APIManager.instance;
    }

    /**
     * 用 window['hostInitialize'] 判斷是否已初始化完畢
     * @returns 
     */
    public isReady(): boolean {
        return !!window['hostInitialize'];
    }

    public getHostName(): string {
        return this.callWindow('getHostName')();
    }

    public getHostImages(): string[] {
        return this.callWindow('getHostImages')();//psapi.hostInfo.host_image
    }

    public getLobbyTurntable(): string {
        return this.callWindow('getLobbyTurntable')();//psapi.hostInfo.lobby_turntable
    }

    public getPSImages(): string {
        return this.callWindow('getPSImages')();//psapi.hostInfo.host_resource
    }

    public getPSEvents(): string {
        return this.callWindow('getPSEvents')();//psapi.hostInfo.eventInfo
    }

    public goHome(): string {
        return this.callWindow('goHome')();
    }

    public openRecord(): void {
        return this.callWindow('openRecord')();
    }

    public getGameVersion(): number {
        return this.callWindow('getGameVersion')();
    }

    private callWindow(funcName: string): any {
        if (window[funcName]) {
            return window[funcName];
        }
        else {
            console.error(`window 找不到 ${funcName}`);
            return () => { };
        }
    }

    /**
     * 確定有psapi才呼叫的setup
     */
    public setup(): void {
        this.psAPI = window['psapi'];

        this.hostInitialize();
        this.setupHostSocket();
    }

    /**
     * 確定有psapi
     */
    private hostInitialize(): void {
        this.callWindow('hostInitialize')();
    }

    /**
     * 設定socket網址
     * 確定有psapi
     */
    private setupHostSocket(): void {
        let game_type = this.psAPI.hostInfo.game_type.toLowerCase();
        // let type_idx = this.psAPI.hostInfo.type_id.toLowerCase();
        if (this.psAPI.hostInfo.server_info[game_type] instanceof Array) {
            for (let i = 0; i < this.psAPI.hostInfo.server_info[game_type].length; i++) {
                this.socketUrl.push(this.psAPI.hostInfo.server_info[game_type][i].replace('@ORIGIN_DOMAIN@', location.hostname));
            }
        }
        else {
            this.socketUrl.push(this.psAPI.hostInfo.server_info[game_type].replace('@ORIGIN_DOMAIN@', location.hostname));
        }

        for (let i = 0; i < this.socketUrl.length; i++) {
            this.socketUrl[0] = this.socketUrl[0] + '/' + game_type.replace('-', '/');
        }
    }


    //psAPI相關內容使用時需要預防沒有psAPI=================================================================================
    //psAPI相關內容使用時需要預防沒有psAPI=================================================================================
    //psAPI相關內容使用時需要預防沒有psAPI=================================================================================

    /**
     * 取得版本
     * @returns 
     */
    public getVersion(): string {
        return this.psAPI ? `ver:${this.psAPI.hostInfo.game_version.rev} build:${this.psAPI.hostInfo.game_version.build}` : 'none';
    }

    /**
     * 是否收到結果再滾
     * @returns 
     */
    public getSpinLate(): boolean {
        return this.psAPI ? this.psAPI.hostInfo.reel_spin == 0 : true;
    }

    /**
     * 取得socket網址
     * @returns 
     */
    public getSocketUrl(): string {
        return this.psAPI ? this.socketUrl[0] : '';
    }

    /**
     * 取得記錄網址
     * @returns 
     */
    public getRecordUrl(): string {
        let url = '';
        if (this.psAPI) {
            url = this.psAPI.hostInfo.history_url;
            url = (!url || url == '') ? `${this.psAPI.origin}/gamehistory/` : url;
            url = `${url}?host_id=${this.psAPI.hostInfo.host_id}`;
            url += `&lang=${this.psAPI.hostInfo.lang}`;
            url += `&game_id=${this.psAPI.hostInfo.game_id}`;
            url += '&count=20';
            url += '&page=1';
            url += `&uid=${this.getURLParameter('uid')}`;
        }
        return url;
    }

    /**
     * 目前同GameHistory都先帶前端語系key(sch)給後端, 等舊系統移除後, 再調整為標準語系key(zh-CN)
     * @returns 
     */
    public getGameHelpUrl(): string {
        let url = '';
        //線上
        if (this.psAPI) {
            //新架構
            if (BaseDataManager.getInstance().urlParam.isNewGameServer) {
                url = this.psAPI.hostInfo.history_url;
                url = (!url || url == '') ? `${this.psAPI.origin}/GameHelp/GameInfo/` : url;
                url += `?lang=${this.psAPI.hostInfo.lang}`;
                url += `&game_id=${this.psAPI.hostInfo.game_id}`;
            }
            //舊架構
            else {
                let code = BaseDataManager.getInstance().urlParam.langCode;
                code = code == 'po-BR' ? 'pt-BR' : code;
                url = `${this.psAPI.origin}/gamehistory/GameHelp/GameInfo?lang=${code}&game_id=${this.psAPI.hostInfo.game_id}`;
            }
        }
        //本地
        else {
            url += 'https://platform-dev.5gg.win/#/game_info';
            url += '?lang=sch';
            url += `&game_id=${BaseDataManager.getInstance().gameID}`;
        }
        return url;
    }

    /**
     * 取得推廣提醒網址
     * @returns 
     */
    public getPromoReminderUrl(): string {
        let url = '';
        if (this.psAPI) {
            url = `${this.psAPI.origin}/campaign/promo`;
            url += `?lang=${this.psAPI.hostInfo.lang}`;
        }
        else {
            url += 'https://platform-dev.5gg.win/#/promo';
            url += '?lang=zh-TW';
        }
        return url;
    }

    /**
     * 取得推廣資訊網址
     * @returns 
     */
    public getPromoInfoUrl(): string {
        let url = '';
        if (this.psAPI) {
            url = `${this.psAPI.origin}/campaign/promo_info`;
            url += `?lang=${this.psAPI.hostInfo.lang}`;
        }
        else {
            url += 'https://platform-dev.5gg.win/#/promo/info';
            url += '?lang=zh-TW';
        }
        return url;
    }

    /**
     * 取得URL參數
     * @param param {string} 參數名稱
     * @returns 
     */
    private getURLParameter(param: string): string {
        if (!this.psAPI) {
            return '';
        }
        else {
            return Object.hasOwn(this.psAPI.queryString, param) ? this.psAPI.queryString[param] : '';
        }
    }

    /**
     * 返回類型(5g館return_type = 2)
     * @returns 
     */
    public getReturnType(): number {
        return this.psAPI ? this.psAPI.hostInfo.return_type : -1;
    }

    /**
     * 取得歷史紀錄SN啟用
     * @returns 
     */
    public getHistorySnEnabled(): boolean {
        return (this.psAPI && this.psAPI.hostInfo.history_sn_enabled !== undefined) ? this.psAPI.hostInfo.history_sn_enabled : false;
    }

    /**
     * 取得載入logo啟用
     * @returns 
     */
    public getLoadingLogoEnabled(): boolean {
        return (this.psAPI && this.psAPI.hostInfo.loading_logo_enable !== undefined) ? this.psAPI.hostInfo.loading_logo_enable : false;
    }
}