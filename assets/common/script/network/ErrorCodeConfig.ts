export class ErrorCodeConfig {

    // 需要重試的錯誤代碼
    public retryErrorCodes: Array<number> = [ 239 ];

    // 需要關閉並繼續的錯誤代碼
    public closeAndContinueCodes: Array<number> = [ 220, 234, 235, 236, 237, 238 ];

    // 錯誤代碼對應的描述
    public errorCodes: Map<number, string> = new Map<number, string>( [
        [ -1, 'InternetError' ], // 網路錯誤
        //
        [ 100, 'CodeError' ], // 沒詳細定義的錯誤
        [ 101, 'CodePanic' ], // 程式不預期錯誤(不應該發生的)
        [ 102, 'CodeTokenError' ], // 用戶 token 錯誤
        [ 103, 'CodeOrderIDError' ], // 訂單 id 錯誤
        [ 104, 'CodeAgentKeyError' ], // 代理密鑰錯誤
        [ 105, 'CodeValidateAgentNodeError' ], // 驗證代理的 node(代理的一種編號) 錯誤
        [ 106, 'CodeOpenGameTimesExceed' ], // 用戶開遊戲次數錯誤(prod 每個用戶一次只能開一個遊戲)
        [ 107, 'CodeTokenNotFound' ], // 用戶 token 沒找到
        [ 108, 'CodeCommandNotFound' ], // command 沒找到
        [ 109, 'CodeUnmarshalError' ], // 解碼 request json 錯誤
        [ 110, 'CodeMarshalError' ], // 編碼 request json 錯誤
        [ 111, 'CodeParameterError' ], // 參數錯誤
        //
        [ 200, 'CodeHTTPMethodError' ], // client request http method 錯誤
        [ 201, 'CodeBodyNil' ], // client request 內容 (body) 為空
        [ 202, 'CodeBodyReadError' ], // client request 讀取內容 (body) 錯誤
        [ 203, 'CodeBodyReadNil' ], // client request 讀取內容 (body) 為空
        //
        [ 210, 'CodeToSimulatorError' ], // game request to simulator 錯誤
        [ 211, 'CodeFromSimulatorError' ], // game receive response from simulator 錯誤
        [ 212, 'CodeReSimulatorLimit' ], // 重複向 simulator 發送資料，達到上限
        //
        [ 220, 'CodeUserCreditNotEnough' ], // spin 但 credit 不足(小於 spin 金額)
        [ 221, 'CodeUserSpinDataError' ], // spin 資料錯誤(可能戶自己偷改資料)
        [ 222, 'CodeGameNotOpen' ], // 遊戲未開放，處理：1後台打開 2redis裡面要有遊戲設定
        [ 223, 'CodeGameProfitBoundary' ], // 遊戲達到風控上限，不能spin (本遊戲輸錢達到每日上限，後台打開)
        [ 224, 'CodeGameIDNotMatchUserGameID' ], // spin傳的game id 跟 user login game id 不同
        //
        [ 230, 'CodeWalletPostBalanceError' ], // request to wallet credit 錯誤(例如 time out)
        [ 231, 'CodeWalletPostBetError' ], // request to wallet spin bet 錯誤(例如 time out)
        [ 232, 'CodeWalletPostResultError' ], // request to wallet spin result 錯誤(例如 time out)
        [ 233, 'CodeWalletCancelError' ], // 錢包取消錯誤
        [ 234, 'CodeWalletPostBalanceFail' ], // request to wallet bet 失敗(錢包有返回，但返回失敗)
        [ 235, 'CodeWalletPostBetFail' ], // request to wallet bet 失敗(錢包有返回，但返回失敗)
        [ 236, 'CodeWalletPostResultFail' ], // request to wallet result 失敗(錢包有返回，但返回失敗)
        [ 237, 'CodeWalletUserBalanceZero' ], // request to wallet credit，但用戶 credit =0
        [ 238, 'CodeWalletUserCancelFail' ], // request to wallet credit，但用戶 credit =0
        [ 239, 'CodeWalletPostIDNBetTimeout' ], // bet operator 回送 timeout字串 (並非真的wallet timeout) client 重送spin (idn only)
        //
        [ 240, 'CodeDBSelectError' ], // 資料庫取資料錯誤
        [ 241, 'CodeDBInsertError' ], // 資料庫新增資料錯誤
        [ 242, 'CodeDBUpdateError' ], // 資料庫更改資料錯誤
        //
        [ 250, 'CodeRedisError' ], // redis 發生錯誤
        [ 251, 'CodeRedisGetError' ], // redis 取資料錯誤
        [ 252, 'CodeRedisPushError' ], // redis 放入資料錯誤(push)
        [ 253, 'CodeGetUserCreditFromRedisError' ], // 從 redis 取用戶 credit 錯誤
        [ 254, 'CodeGetMasterDataError' ], // 從 redis 取 master 錯誤
        [ 255, 'CodeGetAgentDataError' ], // 從 redis 取 agent 錯誤
        //
        [ 260, 'CodeNTToOtherError' ], // 新台幣換算其他幣別錯誤
        [ 261, 'CodeGetWalletURLError' ], // 取錢包 url 錯誤
        //
        [ 270, 'CodePromotionServerError' ], // client request promotion 錯誤
        [ 271, 'CodePromotionBriefError' ], // client request promotion的簡易資料錯誤
        [ 272, 'CodePromotionGetCashDropError' ], // client request cash drop 資料錯誤
        [ 273, 'CodePromotionGetCashDropPrizeError' ], // client request cash drop 的 派獎資料錯誤
        [ 274, 'CodePromotionGetTournamentError' ], // client request tournament 資料錯誤
        [ 275, 'CodePromotionGetPrizeRecordError' ], // client request tournament 派獎資料錯誤
        [ 276, 'CodePromotionGetJpError' ], // client request jp 資料錯誤
        [ 277, 'CodePromotionGetJpAmountError' ], // client request jp 金額資料錯誤
        [ 278, 'CodePromotionGetJpPrizeRecordError' ], // client request jp 派獎資料錯誤
        [ 279, 'CodePromotionGetExtraDataError' ], // client request extra data 最近得獎資料錯誤
        //
        [ 280, 'CodeApiServerError' ], // client request api 錯誤
        [ 281, 'CodeApiReloginError' ], // client request api 重新登入錯誤
        //
        [ 290, 'CodeGetExtraDataError' ], // client request 額外資料錯誤
        [ 291, 'CodeGetBetRecordError' ], // client request 投注記錄錯誤
        [ 292, 'CodeGetGameDataError' ], // client request game data
        [ 293, 'CodeGetUserDataError' ] // client request user data
    ] );

    /**
     * 檢查是否為需要重試的錯誤
     * @param errorCode 錯誤代碼
     * @returns 是否需要重試
     */
    public isRetryError(errorCode: number): boolean {
        return this.retryErrorCodes.includes(errorCode);
    }

    /**
     * 檢查是否為需要關閉並繼續的錯誤
     * @param errorCode 錯誤代碼
     * @returns 是否需要關閉並繼續
     */
    public isCloseAndContinueError(errorCode: number): boolean {
        return this.closeAndContinueCodes.includes(errorCode);
    }

    /**
     * 獲取錯誤描述
     * @param errorCode 錯誤代碼
     * @returns 錯誤描述
     */
    public getErrorDescription(errorCode: number): string {
        return this.errorCodes.get(errorCode) || '未知錯誤';
    }
}
