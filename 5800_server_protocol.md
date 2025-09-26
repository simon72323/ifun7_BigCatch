# Game Server Protocol

# 啟動遊戲 url 參數

```
https://xxx.xxx.xxx.xxx/?token=xxxxx&betrecordurl=xxxxx&lang=xxx&homeurl=xxxx&mode=0&gameid=1111&serverurl=https://xxxx&b=xx&t=xxx
``` 
|parameter|description|type|
|--|--|--|
|gameid	        |遊戲id	                                 |int	|
|token	        |用戶 token 後續api 呼叫都會需要傳給server"   |string|	
|betrecordurl	|投注記錄 url	                           |string|	
|lang	        |遊戲語言常數	                              |string|
|homeurl	    |忽略	                                    |string	|
|serverurl      |game server url(發送api 呼叫)"            |string	|
|mode	        |忽略	                                    |int	|
|b              |依據參數顯示不同 loading 頁"                |string	見[常數]頁|
|t              |忽略	                                    |string	|



# 啟動投注紀錄 bet record 的 url 參數

用戶在遊戲按下[紀錄]按鈕，然後開啟新頁面，傳入參數：

```
 https://betrecordurl/?token=xxxx&lang=IDR&serverurl=https://xxxxx

      token = user token
      lang = 語言
      serverurl = post  host:port

```

# Error Code

```
   	CodeSuccess                int = 0   //成功
   	CodeError                  int = 100 //沒詳細定義的錯誤             (NO)
   	CodePanic                  int = 101 //程式不預期錯誤(不應該發生的)   (NO)
   	CodeTokenError             int = 102 //用戶 token 錯誤             (NO)
   	CodeOrderIDError           int = 103 //訂單 id 錯誤                (NO)
   	CodeAgentKeyError          int = 104 //代理密鑰錯誤                 (NO)
   	CodeValidateAgentNodeError int = 105 //驗證代理的 node(代理的一種編號) 錯誤 (NO)
   	CodeOpenGameTimesExceed    int = 106 //用戶開遊戲次數錯誤(prod 每個用戶一次只能開一個遊戲)(NO)
   	CodeTokenNotFound          int = 107 //用戶 token 沒找到    (NO)
   	CodeCommandNotFound        int = 108 //command 沒找到    (NO)

   	//CodeUnmarshalError json marshal/unmarshal
   	CodeUnmarshalError int = 109 //解碼 request json 錯誤   不一定
   	CodeMarshalError   int = 110 //編碼 request  json 錯誤  不一定
	CodeParameterError int = 111 //參數錯誤

   	//收到 client request 相關
   	CodeHTTPMethodError int = 200 //client request http method 錯誤     外部
   	CodeBodyNil         int = 201 //client request 內容 (body) 為空     外部
   	CodeBodyReadError   int = 202 //client request 讀取內容 (body) 錯誤     外部
   	CodeBodyReadNil     int = 203 //client request 讀取內容 (body) 為空     外部

   	//simulator 相關
   	CodeToSimulatorError   int = 210 //game request to simulator 錯誤   內部(NO)
   	CodeFromSimulatorError int = 211 //game receive response from simulator 錯誤    內部(NO)
   	CodeReSimulatorLimit   int = 212 //重複向 simulator 發送資料，達到上限  內部(NO)

   	//spin相關
   	CodeUserCreditNotEnough      int = 220 //spin 但 credit 不足(小於 spin 金額)       非錯誤
   	CodeUserSpinDataError        int = 221 //spin 資料錯誤(可能戶自己偷改資料)       外部(NO)
   	CodeGameNotOpen              int = 222 //遊戲未開放，處理：1後台打開 2redis裡面要有遊戲設定 (NO)      內部
   	CodeGameProfitBoundary       int = 223 //遊戲達到風控上限，不能spin (本遊戲輸錢達到每日上限，後台打開) 內部(NO)
   	CodeGameIDNotMatchUserGameID int = 224 //spin傳的game id 跟 user login game id 不同	外部(NO)

   	//錢包相關
   	CodeWalletPostBalanceError  int = 230 //request to wallet credit 錯誤(例如 time out)    外部
   	CodeWalletPostBetError      int = 231 //request to wallet spin bet 錯誤(例如 time out)  外部
   	CodeWalletPostResultError   int = 232 //request to wallet spin result 錯誤(例如 time out)   外部
   	CodeWalletCancelError       int = 233
   	CodeWalletPostBalanceFail   int = 234 //request to wallet bet 失敗(錢包有返回，但返回失敗)		非錯誤
   	CodeWalletPostBetFail       int = 235 //request to wallet bet 失敗(錢包有返回，但返回失敗)		非錯誤
   	CodeWalletPostResultFail    int = 236 //request to wallet result 失敗(錢包有返回，但返回失敗)	非錯誤
   	CodeWalletUserBalanceZero   int = 237 //request to wallet credit ，但用戶 credit =0			非錯誤
   	CodeWalletUserCancelFail    int = 238 //request to wallet credit ，但用戶 credit =0			非錯誤
   	CodeWalletPostIDNBetTimeout int = 239 //bet operator 回送 timeout字串 (並非真的wallet timeout) client 重送spin (idn only)

   	//DB相關
   	CodeDBSelectError int = 240 //資料庫取資料錯誤  內部(NO)
   	CodeDBInsertError int = 241 //資料庫新增資料錯誤    內部(NO)
   	CodeDBUpdateError int = 242 //資料庫更改資料錯誤    內部(NO)

   	//Redis相關
   	CodeRedisError                  int = 250 //redis 發生錯誤             內部(NO)
   	CodeRedisGetError               int = 251 //redis 取資料錯誤            內部(NO)
   	CodeRedisPushError              int = 252 //redis 放入資料錯誤(push)	內部(NO)
   	CodeGetUserCreditFromRedisError int = 253 //從 redis 取用戶 credit 錯誤 內部(NO)
   	CodeGetMasterDataError          int = 254 //從 redis 取 master 錯誤	內部(NO)
   	CodeGetAgentDataError           int = 255 //從 redis 取 agent 錯誤	內部(NO)

   	//config 相關
   	CodeNTToOtherError    int = 260 //新台幣換算其他幣別錯誤    內部(NO)
   	CodeGetWalletURLError int = 261 //取錢包 url 錯誤   內部(NO)
    
    //Promotion 相關
    CodePromotionServerError           int = 270 // client request promotion 錯誤	內部
    CodePromotionBriefError            int = 271 //client request promotion的簡易資料錯誤  內部
    CodePromotionGetCashDropError      int = 272 //client request cash drop 資料錯誤	   內部
    CodePromotionGetCashDropPrizeError int = 273 //client request cash drop 的 派獎資料錯誤 內部
    CodePromotionGetTournamentError    int = 274 //client request tournament 資料錯誤		內部
    CodePromotionGetPrizeRecordError   int = 275 //client request tournament 派獎資料錯誤	內部
    CodePromotionGetJpError            int = 276 //client request jp 資料錯誤		內部
    CodePromotionGetJpAmountError      int = 277 //client request jp 金額資料錯誤		內部
    CodePromotionGetJpPrizeRecordError int = 278 //client request jp 派獎資料錯誤	內部
    CodePromotionGetExtraDataError     int = 279 //client request extra data 最近得獎資料錯誤	內部

    //Api Server 相關
    CodeApiServerError  int = 280 // client request api 錯誤	內部
    CodeApiReloginError int = 281 // client request api 重新登入錯誤	內部

    //CodeGetExtraDataError 一般 get 相關
    CodeGetExtraDataError int = 290 //client request 額外資料錯誤   內部
    CodeGetBetRecordError int = 291 //client request 投注記錄錯誤	內部
    CodeGetGameDataError  int = 292 //client request game data      內部(NO)
    CodeGetUserDataError  int = 293 //client request user data      內部(NO)

```

# Protocol Basic

#### Method

| Item         | Value            |
| ------------ | ---------------- |
| Method       | POST             |
| Content-Type | application/json |
| charset      | UTF-8            |

#### Format

#### Request  from client JSON Specification

```
{
    command:”command”,        //string, command name
    token:"xxxxxxxxxxx",     //原本的 client 'Session'
    data:{}                  //json array
}
```

#### Response to client JSON Specification

```
{
    command:”command”,        //string, command name
    error_code:0,             //int, error code, 0=success, above 1 = fail
    message:”error message”,  //string, message if error，預設空白
    data:[{},{}]              //json array
}
```

## Command Example

```
//Request
{
    command:"spin",  
    token:"xxxxxxxxxxx",      //原本的 client 'Session'
    "data": {
        "game_id": 1603,
        "line_bet": 10,
        "line_num": 20,
        "coin_value": 0.01,
        "bet_credit": 2,
        "free_spin_id": ""
    }        
}
//Response
{
    "command": "spin",
    "error_code": 0,
    "message": "",
    "data": {
        "game_id": 1603,                //遊戲id
        "main_game": {
            "pay_credit_total": 2,      //投注金幣
            "game_result": [
                [
                    14,                 //盤面 3X5 圖片icon
                    12,
                    14
                ],
                [
                    11,
                    16,
                    14
                ],
                [
                    14,
                    17,
                    14
                ],
                [
                    13,
                    11,
                    15
                ],
                [
                    13,
                    14,
                    9
                ]
            ],
            "pay_line": [
                {
                    "pay_line": 2,
                    "symbol_id": 14,
                    "amount": 3,
                    "pay_credit": 1
                },
                {
                    "pay_line": 18,
                    "symbol_id": 14,
                    "amount": 3,
                    "pay_credit": 1
                }
            ]
        },
        "get_sub_game": false,
        "sub_game": {
            "pay_credit_total": 0,
            "result": null
        },
        "get_jackpot": false,
        "jackpot": {
            "jackpot_id": "",
            "jackpot_credit": 0,
            "symbol_id": []
        },
        "get_jackpot_increment": true,
        "jackpot_increment": {
            "grand": 0.0024,
            "major": 0.0016,
            "minor": 0.0012,
            "mini": 0.0008,
            "pool": 0
        },
        "grand": 9118,                  //水池
        "major": 18969606,              //水池
        "minor": 991551,                //水池
        "mini": 5144066,                //水池
        "user_credit": 499999988,       //用戶目前金幣
        "bet_credit": 2,                //投注金幣
        "payout_credit": 2,
        "change_credit": 0,
        "effect_credit": 2,
        "buy_spin": 0,
        "buy_spin_multiplier": 1,
        "extra": null
    }
}
```

# 進入遊戲先依序呼叫這幾個commands
進入遊戲請先呼叫這幾個 command
請依序呼叫 admin-server 的 api

1. get_user_data
2. get_game_data
3. get_promotion_brief
4. get_in_game_menu_status

# Command 說明

### get_user_data
取得用戶基本資料

Request

```
{
    command:"get_user_data",  
    token:"xxxxxxxxxxx",  
    data:{}          
}
```

**邏輯**
- 檢查重複登入, 則回傳錯誤代碼 CodeGetUserDataError(293)． 檢查條件為 if !x.h.configurator.AllowURLMultipleGame && !user.IsTestUser && user.OpenGameTimes > 0
- 如果是正常帳號, 去錢包取得用戶餘額． 檢查條件為 !user.IsTestUser && x.h.seamlessWallet.IsSeamlessWallet()
    * 如果沒辦法獲取用戶餘額, 則等待 500 ms後, 再抓一次用戶餘額, 如果再失敗則回傳錯誤代碼 CodeWalletPostBalanceError(230)
- **讀取redis** 取得用戶 freespin資料  hgetall key=free_spin:user_id:9990002101:game_id:2101 (user_id和game_id自行帶入)
- **寫入redis** hmset key=token data=上面讀取用戶的freespin時,json.Marshal(ufs)後的二進位資料
- 組合回傳資料

Response

```
{
    command:”get_user_data”,    
    error_code:0,         
    message:””, 
    data:[{
        account:            "account",          //用戶帳號
        agent_account:      "agentAccount",     //用戶所屬代理商
        credit:             999999,             //用戶當前的錢，float
        currency:           "IDR",              //用戶的幣別，string IDR=印尼,CNY=人民幣,MYR=馬幣,THB=泰銖,VND=越南盾,韓元=KRW, 美金=USD,披索=PHP, 
        free_spin_data:     // free spin 資料。每次只回傳一筆資料
        [ 
            {
               free_spin_id:”123456789”, // 此為目前資料中最小 free spin id 字串，優先使用它的次數
               bet:2000,
               end_date:"2023-05-01 00:00:00",
               rounds_left:35
            }
        ],
        is_anchor:true // 是否是主播
    }]
 }  
```

### get_game_data
取得遊戲資料

Request

```
{
    command:”get_game_data”,  
    token:"xxxxxxxxxxx",  
    data:{
        game_id:1601    //int
    }          
}
```

**邏輯**
- game啟動時候, 會將資料夾內的 gameData.json 讀入記憶體內
- 收到api請求時候, 根據 封包的gameID 和 登入用戶的currency 撈取對應的遊戲資料
- 回傳給client


Response

```
{
    command:”get_game_data”,    
    error_code:0,         
    message:””, 
    data:[{
        game_id:1601,                   //game id, int
        line_bet:[1,2,3,4,5],           //線注內容,float32 array
        coin_value:[1,50,100,300,500],  //錢倍數內容,float32 array
        bet_available_idx:2,            //錢倍數可選index 跟 coin_value 搭配使用 (數字比他小就灰階不能spin) 
        line_total:10,                    //線數，int
        line_available:[20],            //合法的 lineNum, 用於檢查LineNum是否合法 int array
  
        line_bet_default_index:0,        //線注預設 index
        coin_value_default_index:1,      //倍數預設 index
  
        win:20,                         //totol bet 的幾倍秀win
        big_win:20,                     //totol bet 的幾倍秀big_win
        super_win:20,                   //totol bet 的幾倍秀super_win
        mega_win:20,                    //totol bet 的幾倍秀mega_win

        spin_mode:0,                    //spin 速度 0=normal, 1=quick, 2=turbo
        buy_spin:{
            allow_buy:0,                //遊戲是允許 buy
            multiplier:200,             //buy的倍數(總投注額的倍數)
            limit_total:10000           //totol bet 超過這個金額就不能買
        }
        //以下為遊戲本身有 jackpot 才有用
        jackpot":{
	      grand_multiplier:500, //倍數, -1表示沒用
	      major_multiplier:100, //倍數
	      minor_multiplier:40,  //倍數
	      mini_multiplier:20,   //倍數
        }
    }]
 }  
```

### get_promotion_brief

取 promotion 基本資料

顯示在活動頁面

Request

```
{
    command:get_promotion_brief,  
    token:"xxxxxxxxxxx",  
    data:{
        promotion_id:"-1",                  //string 固定用 "-1"。 -1=all, id=指定id
    }
}
```

Response

```
{
    command:get_promotion_brief,  
    error_code:0,   
    message:””, 
    data:[{ 
       promotion_type:       int       //0=cash drop, 1=tournament, 2=jackpot
       promotion_id:         "string", //活動id
       promotion_name:       "string", //活動名稱
       min_bet:              0.0, 
       time_zone:            "string", //時區, https://www.php.net/manual/en/timezones.asia.php
       end_date:             "string", //結束時間
       currency:             "string"
       budget:               "float64" // 總預算
       begin_date:           "string", // 開始時間
    },
    {
       promotion_type:       int   
       promotion_id:         "string", //活動id
       promotion_name:       "string", //活動名稱
       min_bet:              0, 
       time_zone:            "string", //時區, https://www.php.net/manual/en/timezones.asia.php
       end_date:             "string", //結束時間
       currency:             "string"
       budget:               "float64" // 總預算
       begin_date:           "string", // 開始時間
    }
    ]
}  
```
### get_in_game_menu_status
取 in game menu 開關狀態

status 0 不顯示 in game menu按鈕
status 1 顯示 in game menu按鈕

Request
```
{
    command:"get_in_game_menu_status",
    token:"xxxxxxxxxxx", 
    "data": {
    }
}
```

**邏輯**
- **讀取db** 撈取 select in_game_menu_status admin where id=用戶的總代理
- 

Response
```
{
    command:"get_in_game_menu_status",
    error_code:0,
    message:””,
    data:[
        {
            "status":0  // 開關狀態 0=off，1=on。
        }] 
}
```

## 用戶投注  example
### spin
投注

Request

```
{
    command:”spin”,  
    token:"xxxxxxxxxxx",  
    data:{
         game_id:5800,            //num
         line_bet:99,            //線注，num
         line_num:10,            //線數，num
         coin_value:999999,      //倍數，num
         bet_credit:99999.0,     //總下注金額,num
         buy_spin:0,            //本次spin 是否是buy free game。 0=no, 1=yes
    }          
}
```

**邏輯**
- 產生orderID (利用node)



Response

```
{
    command:"spin",
    error_code:0,             //int,error code,0=success
    data: [{
        game_id: 5800
        main_game:{
            game_result:[][]int         //盤面     
            pay_line:[
                {
                    pay_line    int     //pay line id
                    symbol_id   int     //這條線的symbol id
                    amount      int     //中幾個symbol
                    pay_credit  float64 //本條線金額
                    multiplier  int     //倍數
                },
                {
                    pay_line    int     //pay line id
                    symbol_id   int     //這條線的symbol id
                    amount      int     //中幾個symbol
                    pay_credit  float64 //本條線金額
                    multiplier  int     //倍數
                }
            ],
            pay_credit_total:float64    //main game 金額      
            scatter_info:{
                id         []int        // scatter id
                position   [][]int      // 盤面位置
                amount     int          // scatter 數量
            }
       },
  
        get_sub_game:true,         //是否中sub game, bool
        sub_game:{
	    game_result:[
                {
                    game_result:[][]int         //盤面     
                    pay_line:[
                        {
                            pay_line    int     //pay line id
                            symbol_id   int     //這條線的symbol id
                            amount      int     //中幾個symbol
                            pay_credit  float64 //本條線金額
                            multiplier  int     //倍數
                        },
                        {
                            pay_line    int     //pay line id
                            symbol_id   int     //這條線的symbol id
                            amount      int     //中幾個symbol
                            pay_credit  float64 //本條線金額
                            multiplier  int     //倍數
                        }
                    ],
                    pay_credit_total:float64    //free game 該盤面金額      
                    extra:{
                        no_m_add_spin:bool    // 是否有額外加spin
                        total_wild_count:int  // 總wild數量
                        wild_pos:[][]int      // 當局wild位置
                    }
                },
                {
                    game_result:[][]int         //盤面     
                    pay_line:[
                        {
                            pay_line    int     //pay line id
                            symbol_id   int     //這條線的symbol id
                            amount      int     //中幾個symbol
                            pay_credit  float64 //本條線金額
                            multiplier  int     //倍數
                        },
                        {
                            pay_line    int     //pay line id
                            symbol_id   int     //這條線的symbol id
                            amount      int     //中幾個symbol
                            pay_credit  float64 //本條線金額
                            multiplier  int     //倍數
                        }
                    ],
                    pay_credit_total:float64    //free game 該盤面金額      
                    extra:{
                        no_m_add_spin:bool    // 是否有額外加spin
                        total_wild_count:int  // 總wild數量
                        wild_pos:[][]int      // 當局wild位置
                    }
                },
        ]
	    pay_credit_total:float64           //free game 總金額 
	    over_win:bool                      //贏倍超出最大值
        },
  

        //用戶餘額
        user_credit:99999.0,   //用戶後來的金額
        bet_credit:9.9,        //總投注金額
        payout_credit:99.9,   //總派彩金額
        change_credit:-9.9,    //改變金額，如果沒中獎，是負的
        effect_credit:9.9    //有效投注，就是總投注額   
	  
        //buy free spin
        buy_spin:0,               //0=normal, 1=buy
        buy_spin_multiplier:200,  //購買花費(bet 的幾倍)
        extra:null
	}]
} 




type ExtraGameResult struct {
	NoMAddSpin     bool    `json:"no_m_add_spin"`    // 是否有額外加spin
	TotalWildCount int     `json:"total_wild_count"` // 總wild數量
	WildPos        [][]int `json:"wild_pos"`         // 當局wild位置
}
    

```


## 撒幣活動相關
### get_extra_data

取玩家最近有獲得 cash drop 得資料

Request

```
{
    command:”get_extra_data”,  
    token:"xxxxxxxxxxx",  
    data:{
        interval:60,  //int  get間隔秒數，預設60秒
    }              
}
```

Response

```
{
    command:”get_extra_data”,  
    error_code:0,   
    message:””, 
    data:[
	    {  
            cash_drop:{
                promotion_id:"12345678",    //promotion id
                account:"account",          //玩家帳號
                game_id:1601,               //game id
                prize_credit:90.0,          // 給的promotion 金額
                prize_type:""               //string 中獎類型 for jackpot grand,major,minor,mini
            },
	    jackpot:null,
    	},
        {  
            cash_drop:null,
	    jackpot:{
                promotion_id:"12345678",    //promotion id
                account:"account",          //玩家帳號
                game_id:1601,               //game id
                prize_credit:90.0,          // 給的promotion 金額
                prize_type:"major"           //string 中獎類型 for jackpot grand,major,minor,mini
            },
        },
    ]
 }  
```



### get_cash_drop

取撒幣活動詳細資料 
promotion cash drop 

Request

```
{
    command:get_cash_drop,  
    token:"xxxxxxxxxxx",  
    data:{
        promotion_id:"-1",                  //string -1=all, id=指定id
    }          
}
```

Response

```
{
    command:get_cash_drop,    
    error_code:0,         
    message:””, 
    data:[{  
       promotion_id:"123",                    //string",活動id
       promotion_content:"content",           //string",活動內容
       mode:                 0,               //派發方式, 0=range 1=column, 2=multiplier
       mode_rule:            [10, 100, ...]   //派發規則, 依不同方式有不同的規則
    }]
}  
```

### get_cash_drop_prize_record

取撒幣活動最新中獎紀錄
Request

```
{
    command:get_cash_drop_prize_record,  
    token:"xxxxxxxxxxx",  
    data:{
        promotion_id:"-1",           //string ,-1=all promotion, id=指定 promotion id
    }          
}
```

**邏輯**
- api 請求給 promotion, 取得 最新中獎紀錄

Response

```
{
    command:get_cash_drop_prize_record,    
    error_code:0,         
    message:””, 
    data:[{  
        promotion_id:        //string
        winner:[{
            account:"acc",              //string
            bet_credit:1000.0,          //float
            prize_credit:1000.0,        //float
            multiplier:3                //int
            date:"2021-02-05 00:00:00"  //string
            },
        {},
        {}],
        user:[{
            account:"acc",              //string
            bet_credit:1000.0,          //float
            prize_credit:1000.0,        //float
            multiplier:3                //int
            date:"2021-02-05 00:00:00"  //string
            },
        {},
        {}],
    },{
    }
    ]
}  
```
## 錦標賽活動相關
### get_tournament

取錦標賽詳細資料
Promotion tournament

Request

```
{
    command:get_tournament,  
    token:"xxxxxxxxxxx",  
    data:{
        promotion_id:"-1",                  //string -1=all, id=指定id
    }          
}
```

Response

```
{
    command:get_tournament,    
    error_code:0,         
    message:“”, 
    data:[{  
       promotion_id:"123",      //string,活動id
       promotion_content:"",    //string,活動內容
       payout_status:0,         //int,派發狀態, 0=未派發 1=已派發 2=派發中
       bonus_setting:[ start_rank:1,end_rank:2,bonus:3 ]  //json,獎金設定, 參照下方獎金設定json array
    }]
}  
```

**Bonus Setting**

```json
   [
      {
         "start_rank": 0,
         "end_rank": 0,
         "bonus": 0
      },
   ]
```

### get_tournament_prize_record

取錦標賽排行榜
Request

```
{
    command:get_tournament_prize_record,  
    token:"xxxxxxxxxxx",  
    data:{
        promotion_id:"-1",           //string ,-1=all promotion, id=指定 promotion id
    }          
}
```

**邏輯**
- 詢問promotion 取錦標賽排行榜 的結果

Response

```
{
    command:get_tournament_prize_record,    
    error_code:0,         
    message:””, 
    data:[{  
        promotion_id:        //string
        winner:[{
            account:"acc",            //string
            credit:1000.0,            //累積的投注額(score)
            prize_credit:0.0,           //獎金，沒派獎前是0
            },
        {},
        {}],
        user:{
            rank: -1,                //排名, -1= 還沒排
            account:"acc",           //string
            credit:1000.0,          //累積的投注額(score)
            prize_credit:0.0,           //獎金，沒派獎前是0
            },
    },{}
    ]
}  
```

## Free Spin 活動相關
* user free spin 資料，在 get_user_data 回傳
* spin 傳來的資料，加 free_spin_id:”123456789"，判斷是否 free spin
### get_free_spin_total_payout

取得 free spin 結算

Request

```
{
    command:"get_free_spin_total_payout",
    token:"xxxxxxxxxxx",
    data:{
        "free_spin_id":"" //string, free spin id
    }
}
```

Response

```
{
   "command": "get_free_spin_total_payout",
   "error_code": 0,
   "message": "",
   "data": [
      {
         free_spin_id:”123456789”, // free spin id
         total_payout:99999 // 結算金額
      }
   ]
}
```

## In game menu 相關
### get_in_game_menu
取 in game menu 內容
in game menu 是新遊戲、熱門遊戲、還是用戶收藏遊戲
用戶可直接點擊，進入新遊戲

Request
```
{
    command:"get_in_game_menu",
    token:"xxxxxxxxxxx", 
    "data": {
    }
}
```
**邏輯**
- **讀取db**  admin  user game_default_config


Response
```
{
    command:"get_in_game_menu",
    error_code:0,
    message:””,
    data: [
        {
            //遊戲名稱
            "game_name": [
                {
                    "game_id": 3800, // 遊戲ID int
                    "language": { // 各語系遊戲名稱
                        en: "Dreamy Komodo",
                        id: "Komodo Romantis",
                        ko: "로맨스 코모도",
                        ms: "Dreamy Komodo",
                        ph: "Dreamy Komodo",
                        th: "Dreamy Komodo",
                        vi: "Giấc Mơ Komodo",
                        zh-cn: "梦幻科摩多"
                    }
                },
                {

                }
            ],
            //每個遊戲分類，是新遊戲還是熱門
            //顯示在 Popular 頁面
            game:[
                [
                    3800, 0 //game ID, 0=none, 1=新遊戲, 2=熱門遊戲
                ],
                []
            ],
            //收藏遊戲，顯示在 Favorite 頁面
            favorite:[
                3800 //game ID
            ],
            image:"http://example/icon" //所有遊戲圖片url, 後面自己補上 gameid.png (3400.png、3500.png)
        }
    ]
}
```
### update_in_game_menu_favorite_game
修改收藏遊戲

Request
```
{
    command:"update_in_game_menu_favorite_game",
    token:"xxxxxxxxxxx", 
    "data": {
        favorite:[
            3800,3100 //int, game ID, 可傳單個或複數 收藏遊戲列表
        ]
    }
}
```

**邏輯**
- 取得收藏
- **更新db** update user set in_game_menu_favorite=xxx where id=UserID

Response
```
{
    command:"update_in_game_menu_favorite_game",
    error_code:0,                   //error code 0=success
    message:"",
    data: null
}
```
### get_in_game_menu_game_url
用戶從遊戲內切換遊戲

取得新的啟動遊戲 url, 開啟新遊戲

Request
```
{
    command:"get_in_game_menu_game_url",
    token:"xxxxxxxxxxx",
    "data": {
        "game_id":3800,      // 遊戲ID
        "lang":"id",        //id印尼,zh-cn簡中,ko 韓文,en英文, ms馬來西亞,vi越南, ph菲律賓, th泰文
        "b": "iqazwsxi"     // loading 頁面底圖 iqazwsxi = idn, iqazwsxd = dna
    }
}
```

**邏輯**
- 詢問 api_server 的結果

Response
```
{
    command:"get_in_game_menu_game_url",
    error_code:0,
    message:"",
    data: [
        {
            "url":"http://example.com/game" //新的遊戲啟動url
        }
    ]
}
```
### renew_token

Request

```
{
    command:    "renew_token",  
    token:      "xxxxxxxxxxx",  
    data:{}          
}
```

**邏輯**
- 判斷用戶是否可以重新產生token => 判斷條件 AllowURLMultipleGame=false && user.IsTestUser=false
- 利用 UserID 透過 base64演算法, 生產 newToken 
- 將 newToken 更新到 user 表 => update user set token=newToken where id=user.UserID and token=user.Token
- 如果db更新成功
  * **redis更新** renamenx newToken oldToken
  * **redis新增** hset newToken OpenGameTimes -1

Response

```
{
    command:        "renew_token",    
    error_code:     0,         
    message:        "", 
    data:[{
        "token":"新token"       
    }]
 } 
```

# 主播滾輪停止
當   is_anchor＝true 要通知 server 前端表演結束。
只有 main game： main game 結算後送給server。
有 free game：在free game 總結算後(大獎報完，顯示總結算換面時)送給server

## reel_stop
Request

```
{
    command:reel_stop, 
    token:"xxxxxxxxxxx", 
    data:{}          
}
```

Response

```
{
    "command": "reel_stop",
    "error_code": 0,
    "message": "",
    "data": []
}
```