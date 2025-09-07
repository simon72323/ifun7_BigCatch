const GET_CASH_DROP = 'get_cash_drop';
const GET_TOURNAMENT = 'get_tournament';
const GET_CASH_DROP_PRIZE_RECORD = 'get_cash_drop_prize_record';
const GET_TOURNAMENT_PRIZE_RECORD = 'get_tournament_prize_record';

const GET_JP = 'get_jp';
const GET_JP_AMOUNT = 'get_jp_amount';
const GET_JP_PRIZE_RECORD = 'get_jp_prize_record';

const REFRESH_FREQUENCY = 300000;

let JACKPOT_NOTIFICATIONS = {
    notification: true,
    settings: {
        myGrand: true,
        myMajor: true,
        myMinor: false,
        myMini: false,
        otherGrand: true,
        otherMajor: true,
        otherMinor: false,
        otherMini: false,
    }
};
const LOCALSTORAGE_JACKPOT_KEY = 'settings_for_jp';

class Promotion {

    promotionContent;
    promotionInformation;
    promotionContainer;
    jackpotInformation;
    jackpotTierData;
    constructor(parent, promotion, jackpot) {
        this.parentContainer = parent;
        this.promotionInformation = promotion;
        this.jackpotInformation = jackpot;
        this.jackpotTierData = {
            mini: 0,
            minor: 0,
            major: 0,
            grand: 0,
            content: ''
        };
        this.reciprocalTime = [];
        this.previousPromotion = 0;
        this.visiblePromotion = 0;

        this.jackpotLastUpdateTime = 0;
        this.promotionLastUpdateTime = 0;

        this.server = new PromotionHttpRequest(this);
        this.isJackpotRedDotVisible = true ;
        this.isPromotionRedDotVisible = true ;
        this.init();
    }

    init() {
        // console.log('[Promotion] Init');

        this.mainContainer = new extensions.PIXI.Container();
        this.mainContainer.name = 'PromotionMain';
        this.parentContainer.addChild(this.mainContainer);

        this.promotionContent = new PromotionalContent(this);
        if (this.jackpotInformation.length > 0) {
            this.createJackpotItem();
        }
        if (this.promotionInformation.length > 0) {
            this.createPromotionItem();
        }

        this.loadSettings();
    }

    onResize(isPortrait) {
        if (this.promotionContent) {
            this.promotionContent.onResize(isPortrait);
        }
    }

    loadSettings() {
        let storage = window.localStorage;
        let jpData = storage.getItem(LOCALSTORAGE_JACKPOT_KEY);
        if (jpData !== null) {
            JACKPOT_NOTIFICATIONS = JSON.parse(jpData);
        } else {
            storage.setItem(LOCALSTORAGE_JACKPOT_KEY, JSON.stringify(JACKPOT_NOTIFICATIONS));
        }
    }

    createJackpotItem() {
        // * Default is show out
        this.isJackpotshowOut = true;

        this.jackpotContainer = new extensions.PIXI.Container();
        this.jackpotContainer.name = 'JackpotContainer';
        this.jackpotContainer.position.set(PROMOTION_JACKPOT_CONTAINER_POSITION_X, PROMOTION_JACKPOT_CONTAINER_POSITION_Y);
        this.mainContainer.addChild(this.jackpotContainer);

        this.jackpotHintContainer = new extensions.PIXI.Container();
        this.jackpotHintContainer.name = 'JackpotHint';
        this.jackpotContainer.addChild(this.jackpotHintContainer);

        this.jackpotHint = new PromotionHint(0, 0, 320, 50, this.jackpotHintContainer, { PIXI: PIXI },PROMOTION_JACKPOT_HINT_SHOW,PROMOTION_JACKPOT_HINT_HIDE,PROMOTION_JACKPOT_HINT_MASK_SHOW_POSITION_X);
        this.jackpotHint.init();
        this.jackpotHint.setTextWithIcon(PROMOTION_PROMOTION_TEXT_POSITION_X, -8, { size: 12 }, { size: 11 });

        this.jackpotButton = new IconButton(this.jackpotContainer, extensions.getTexture('icon_jackpot_0'), () => {
            this.onClickJackpotButton();
        });
        this.jackpotButton.setScale(PROMOTION_BUTTON_SCALE, PROMOTION_BUTTON_SCALE);

        // * Jackpot icon fx
        let jackpotFx = new extensions.PIXI.spine.Spine(extensions.getSpine('Jackpot_fx').spineData);
        jackpotFx.state.setAnimation(0, 'play_0', true);
        this.jackpotButton.addChild(jackpotFx);

        //red dot sprite
        this.jackpotRedDot = new PIXI.Sprite(s_oTextureLibrary.getTexture('in_game_menu_dot'));
        this.jackpotRedDot.scale.set(0.5);
		this.jackpotRedDot.anchor.set(0.5);
		this.jackpotRedDot.position.set(PROMOTION_JACKPOT_CONTAINER_RED_DOT_POSITION_X,PROMOTION_JACKPOT_CONTAINER_RED_DOT_POSITION_Y);
		this.mainContainer.addChild(this.jackpotRedDot);

        let textStyle = {
            font: '24px Arial',
            fill: 0xffffff,
            align: 'center',
            textBaseline: 'alphabetic'
        };
        this.redDotHint = undefined ;
        this.redDotHint = new extensions.PIXI.Text('N', textStyle);
        this.redDotHint.scale.set(0.6);
        this.redDotHint.anchor.set(0.5);
        this.redDotHint.position.set(0, 0);
        this.jackpotRedDot.addChild(this.redDotHint);
        /*
        // * Jackpot icon slide in button
        this.jackpotSlideButton = new extensions.PIXI.Sprite(extensions.getTexture('off'));
        this.jackpotSlideButton.position.set(40, 3);
        this.jackpotSlideButton.scale.set(0.5);
        this.jackpotSlideButton.anchor.set(0.5);
        this.jackpotSlideButton.interactive = true;
        this.jackpotSlideButton.buttonMode = true;
        this.jackpotSlideButton.on('pointertap', () => {
            this.onSlideClick(true);
        });
        this.jackpotContainer.addChild(this.jackpotSlideButton);
        */
    }

    createPromotionItem() {
        this.isPromotionShowOut = true;
        let isJackpot = (this.jackpotInformation.length > 0);

        this.promotionContainer = new extensions.PIXI.Container();
        this.promotionContainer.name = 'PromotionContainer';
       this.promotionContainer.position.set(isJackpot ? PROMOTION_PROMOTION_CONTAINER_POSITION_X : PROMOTION_JACKPOT_CONTAINER_POSITION_X , PROMOTION_PROMOTION_CONTAINER_POSITION_Y);
        this.mainContainer.addChild(this.promotionContainer);

        this.promotionHintContainer = new extensions.PIXI.Container();
        this.promotionHintContainer.name = 'PromotionHint';
        this.promotionContainer.addChild(this.promotionHintContainer);

        this.promotionHint = new PromotionHint(0, 0, 320, 50, this.promotionHintContainer, { PIXI: PIXI }, PROMOTION_PROMOTION_HINT_SHOW , PROMOTION_PROMOTION_HINT_HIDE,PROMOTION_PROMOTION_HINT_MASK_SHOW_POSITION_X );
        this.promotionHint.init();
        this.promotionHint.setTextWithIcon(PROMOTION_PROMOTION_TEXT_POSITION_X, -8, { size: 12 }, { size: 11 });

        //red dot sprite
        this.promotionRedDot = new PIXI.Sprite(s_oTextureLibrary.getTexture('in_game_menu_dot'));
        this.promotionRedDot.scale.set(0.5);
        this.promotionRedDot.anchor.set(0.5);
        this.promotionRedDot.position.set(PROMOTION_PROMOTION_CONTAINER_RED_DOT_POSITION_X, PROMOTION_PROMOTION_CONTAINER_RED_DOT_POSITION_Y);
        this.mainContainer.addChild(this.promotionRedDot);

        let textStyle = {
            font: '24px Arial',
            fill: 0xffffff,
            align: 'center',
            textBaseline: 'alphabetic'
        };
        this.redDotHint = undefined ;
        this.redDotHint = new extensions.PIXI.Text('N', textStyle);
        this.redDotHint.scale.set(0.6);
        this.redDotHint.anchor.set(0.5);
        this.redDotHint.position.set(0, 0);
        this.promotionRedDot.addChild(this.redDotHint);

        this.promotionButtons = [];
        this.remainingTime = [];

        for (let i = 0; i < this.promotionInformation.length; i++) {

            let buttonPrefix = 'icon_CrazyCashDrop_';
            let promotionFxName = 'CrazyCashDrop_fx';
            // * promotion_type => 0: cash drop, 1: tournament, 2: jackpot
            if (this.promotionInformation[i].promotion_type === 0) {
                buttonPrefix = 'icon_CrazyCashDrop_';
                promotionFxName = 'CrazyCashDrop_fx';
            } else if (this.promotionInformation[i].promotion_type === 1) {
                buttonPrefix = 'icon_Tournament_';
                promotionFxName = 'Tournament_fx';
            }

            let textureName = this.getReciprocalTime()[i] === 0 ? buttonPrefix + i % 5 + '_finished' : buttonPrefix + i % 5;
            this.promotionButtons[i] = new IconButton(this.promotionContainer, extensions.getTexture(textureName), () => {
                this.onClickPromotionButton(i);
            });
            let promotionFx = new extensions.PIXI.spine.Spine(extensions.getSpine(promotionFxName).spineData);
            promotionFx.state.setAnimation(0, 'play', true);
            this.promotionButtons[i].addChild(promotionFx);
            this.promotionButtons[i].setScale(PROMOTION_BUTTON_SCALE, PROMOTION_BUTTON_SCALE);
            this.promotionButtons[i].setAlpha(0);
            this.promotionButtons[i].setInteractive(false);

            // 剩餘時間
            let timeLeftText = this.getReciprocalTime()[i] === 0 ? '' : this.getReciprocalTime()[i];
            let textStyle = {
                font: '24px Arial',
                fill: 0xffffff,
                align: 'center',
                textBaseline: 'alphabetic'
            };
            this.remainingTime[i] = new extensions.PIXI.Text(timeLeftText, textStyle);
            this.remainingTime[i].anchor.set(0.5);
            this.remainingTime[i].position.set(0, 32);
            this.promotionButtons[i].addChild(this.remainingTime[i]);
        }

        if (this.remainingTime.every(value => { return value.text === '' })) {
            // 只剩結束的活動
            this.promotionButtons[0].setAlpha(0.6);
            this.promotionButtons[0].setInteractive(true);
        } else {
            // 搜第一個活動
            for (let i = 0; i < this.promotionButtons.length; i++) {
                if (this.remainingTime[i].text !== '') {
                    this.promotionButtons[i].setAlpha(1);
                    this.promotionButtons[i].setInteractive(true);
                    break;
                }
            }
        }
        /*//20231110 remove slide button
        this.promotionSlideButton = new extensions.PIXI.Sprite(extensions.getTexture('off'));
        this.promotionSlideButton.position.set(32, 6);
        this.promotionSlideButton.scale.set(0.5);
        this.promotionSlideButton.anchor.set(0.5);
        this.promotionSlideButton.interactive = true;
        this.promotionSlideButton.buttonMode = true;
        this.promotionSlideButton.on('pointertap', () => {
            this.onSlideClick(false);
        });
        this.promotionContainer.addChild(this.promotionSlideButton);
        */
        // 每60秒撈一次活動剩餘時間
        setInterval(() => {
            for (let i = 0; i < this.promotionInformation.length; i++) {
                this.remainingTime[i].text = this.getReciprocalTime()[i];
                if (this.getReciprocalTime()[i] === 0) {
                    this.remainingTime[i].text = '';
                    this.promotionButtons[i].setTexture(extensions.getTexture('icon_CrazyCashDrop_' + i % 5 + '_finished'));
                }
            }
        }, 60000);

        // 每5秒輪播活動按鈕
        setInterval(() => {
            if (this.promotionInformation.length === 0) {
                return;
            }

            this.previousPromotion = this.visiblePromotion;
            do {
                this.visiblePromotion++;
                if (this.visiblePromotion >= this.promotionInformation.length) {
                    this.visiblePromotion = 0;
                }

                // 這次跑出來的結果跟上次一樣就表示只有一個或是沒有活動
                if (this.previousPromotion === this.visiblePromotion) {
                    return;
                }
            } while (this.remainingTime[this.visiblePromotion].text === '');

            let alpha = {
                currentButtonAlpha: 1,
                nextButtonAlpha: 0,
            };

            extensions.TweenLite.to(alpha, 0, {
                currentButtonAlpha: 0,
                onUpdate: () => {
                    this.promotionButtons[this.previousPromotion].setAlpha(alpha.currentButtonAlpha);
                },
                onComplete: () => {
                    extensions.TweenLite.to(alpha, 0, {
                        nextButtonAlpha: 1,
                        onUpdate: () => {
                            this.promotionButtons[this.visiblePromotion].setAlpha(alpha.nextButtonAlpha);
                            this.promotionButtons[this.previousPromotion].setInteractive(false);
                            this.promotionButtons[this.visiblePromotion].setInteractive(true);
                        },
                    });
                },
            });
        }, 5000);
    }

    onSlideClick(isJackpot) {
        if (isJackpot) {
            /*//20231110 remove slide button
            let buttonTextName = (this.isJackpotshowOut) ? 'on' : 'off';
            let position = (this.isJackpotshowOut) ? 538 : 610;
            extensions.TweenLite.to(
                this.jackpotContainer.position, 
                0.5,
                { x: position }
            );

            this.jackpotSlideButton.texture = extensions.getTexture(buttonTextName);
            this.isJackpotshowOut = !this.isJackpotshowOut;
            */
        } else {
            /*//20231110 remove slide button
            let buttonTextName = (this.isPromotionShowOut) ? 'on' : 'off';
            let position = (this.isPromotionShowOut) ? 546 : 610;
            extensions.TweenLite.to(
                this.promotionContainer.position, 
                0.5,
                { x: position }
            );

            this.promotionSlideButton.texture = extensions.getTexture(buttonTextName);
            this.isPromotionShowOut = !this.isPromotionShowOut;
            */
        }
    }

    slideOff() {
        if (this.jackpotInformation.length > 0) {
            /*//20231110 remove slide button
            if (this.isJackpotshowOut) {
                extensions.TweenLite.to(
                    this.jackpotContainer.position, 
                    0.5,
                    { x: 538 }
                );
                this.jackpotSlideButton.texture = extensions.getTexture('on');
                this.isJackpotshowOut = false;
            }
            */
        }
        if (this.promotionInformation.length > 0) {
            /*//20231110 remove slide button
            if (this.isPromotionShowOut) {
                extensions.TweenLite.to(
                    this.promotionContainer.position, 
                    0.5,
                    { x: 546 }
                );
                this.promotionSlideButton.texture = extensions.getTexture('on');
                this.isPromotionShowOut = false;
            }
            */
        }
    }

    defaultOff() {
        if (this.jackpotInformation.length > 0) {
            /*//20231110 remove slide button
            if (this.isJackpotshowOut) {
                this.jackpotContainer.position.x = 538;
                this.jackpotSlideButton.texture = extensions.getTexture('on');
                this.isJackpotshowOut = false;
            }
            */
        }
        if (this.promotionInformation.length > 0) {
            /*//20231110 remove slide button
            if (this.isPromotionShowOut) {
                this.promotionContainer.position.x = 546;
                this.promotionSlideButton.texture = extensions.getTexture('on');
                this.isPromotionShowOut = false;
            }
            */
        }
    }

    getReciprocalTime() {
        for (let i = 0; i < this.promotionInformation.length; i++) {
            //換算時區時間差異
            let timeDifference = new Date(this.promotionInformation[i].end_date.replace(/-/g, '/')).getTime() - new Date(new Date().toLocaleString('sv-SE', { timeZone: this.promotionInformation[i].time_zone }).replace(/-/g, '/'));
            let date = Math.floor(timeDifference / 1000 / 86400);
            let hour = Math.floor(timeDifference / 1000 % 86400 / 3600);
            let minute = Math.floor(timeDifference / 1000 % 86400 % 3600 / 60);
            let second = Math.floor(timeDifference / 1000 % 86400 % 3600 % 60);

            if (timeDifference < 0) {
                this.reciprocalTime[i] = 0;
            } else {
                if (date === 0) {
                    this.reciprocalTime[i] = hour + 'h ' + minute + 'm ';
                } else {
                    this.reciprocalTime[i] = date + 'd ' + hour + 'h ';
                }
            }
        }
        return this.reciprocalTime;
    }

    onClickJackpotButton() {
        this.promotionContent.sendJackpotRefreshApi(Date.now());
        if (this.isJackpotRedDotVisible === true){
            this.isJackpotRedDotVisible = false ;
            this.jackpotRedDot.visible = false ;
        }
    }

    sendGetJp() {
        let getJpData = {
            command: GET_JP,
            token: extensions.getToken(),
            data: {}
        };
        this.server.sendRequest(JSON.stringify(getJpData));
    }

    sendGetJpPrizeRecord() {
        let getJpPrizeRecordData = {
            command: GET_JP_PRIZE_RECORD,
            token: extensions.getToken(),
            data: {}
        };
        this.server.sendRequest(JSON.stringify(getJpPrizeRecordData));
    }

    sendGetJpAmount() {
        let getJpAmountData = {
            command: GET_JP_AMOUNT,
            token: extensions.getToken(),
            data: {}
        };
        this.server.sendRequest(JSON.stringify(getJpAmountData));
    }

    onClickPromotionButton(index) {
        this.promotionContent.setSlideToIndex(index);
        this.promotionContent.sendPromoteApi(Date.now());
        if (this.isPromotionRedDotVisible === true){
            this.isPromotionRedDotVisible = false ;
            this.promotionRedDot.visible = false ;
        }
    }

    sendGetCashDrop() {
        let getCashDropData = {
            command: GET_CASH_DROP,
            token: extensions.getToken(),
            data: {
                promotion_id: '-1'
            }
        };
        this.server.sendRequest(JSON.stringify(getCashDropData));
    }

    sendGetTournament() {
        let getTournamentData = {
            command: GET_TOURNAMENT,
            token: extensions.getToken(),
            data: {
                promotion_id: '-1'
            }
        };
        this.server.sendRequest(JSON.stringify(getTournamentData));
    }

    sendGetCashDropPrizeRecord() {
        let getCashDropPrizeRecordData = {
            command: GET_CASH_DROP_PRIZE_RECORD,
            token: extensions.getToken(),
            data: {
                promotion_id: '-1'
            }
        };
        this.server.sendRequest(JSON.stringify(getCashDropPrizeRecordData));
    }

    sendGetTournamentPrizeRecord() {
        let getTournamentPrizeRecordData = {
            command: GET_TOURNAMENT_PRIZE_RECORD,
            token: extensions.getToken(),
            data: {
                promotion_id: '-1'
            }
        };
        this.server.sendRequest(JSON.stringify(getTournamentPrizeRecordData));
    }

    showUpPromotionNotification(index, data) {
        let title = this.promotionInformation[index].promotion_name;
        let currency = this.promotionInformation[index].currency;
        let prize = data.prize_credit.toFixedNoRound();
        let message = `Congratulation, You Won ${currency} ${prize}`;

        this.promotionHint.popOutHint(title, message, undefined);
    }

    showUpJackpotNotification(index, data) {
        let isYou = data.account === extensions.userAccount;
        let wonAmount = data.prize_credit.toFixedNoRound();
        let jpTier = data.prize_type;
        let stride = '                  ';
        let playerName = isYou ? 'You' : data.account;

        if (JACKPOT_NOTIFICATIONS.notification) {
            let checkKeyName = '';
            switch (jpTier) {
                case 'grand':
                    checkKeyName = (isYou) ? 'myGrand' : 'otherGrand';
                    break;
                case 'major':
                    checkKeyName = (isYou) ? 'myMajor' : 'otherMajor';
                    break;
                case 'minor':
                    checkKeyName = (isYou) ? 'myMinor' : 'otherMinor';
                    break;
                case 'mini':
                    checkKeyName = (isYou) ? 'myMini' : 'otherMini';
                    break;
            }

            if (JACKPOT_NOTIFICATIONS.settings[checkKeyName]) {
                let currency = this.jackpotInformation[index].currency;
                let displayText = `${playerName} Won${stride}${currency}${wonAmount}!!`;
                this.jackpotHint.jackpotPopUpSetting(isYou);
                this.jackpotHint.popOutHint(this.jackpotInformation[index].promotion_name, displayText, jpTier);
            }
        }
    }

    updateTotalBet(totalBet) {
        for (let i = 0; i < this.promotionInformation.length; i++) {
            let isRequireMinBet = (this.promotionInformation[i].min_bet !== 0);
            if (isRequireMinBet && totalBet < this.promotionInformation[i].min_bet) {
                let title = this.promotionInformation[i].promotion_name;
                let minBet = `${this.promotionInformation[i].currency} ${this.promotionInformation[i].min_bet.toFixedNoRound()}`;
                let message = `Qualifying promo bet amount must be higher than ${minBet}`;
                this.promotionHint.popOutHint(title, message);
            }
        }

        // * Keep for jackpot
        // for (let i = 0; i < this.jackpotInformation.length; i++) {
        //     let isRequireMinBet = (this.jackpotInformation[i].min_bet !== 0);
        //     if (isRequireMinBet && totalBet < this.jackpotInformation[i].min_bet) {

        //     }
        // }
    }
}


class PromotionHttpRequest {
    promotionInstance;
    constructor(promotionInstance) {
        this.promotionInstance = promotionInstance;
        this.jackpotInformation = promotionInstance.jackpotInformation;
        this.promotionInformation = promotionInstance.promotionInformation;
        this.init();
    }

    init () {
        this.xhr = new XMLHttpRequest();
        this.xhr.timeout = 4 * 60 * 1000;
        this.xhr.ontimeout = function (e) {
			this.showErrorMessage('ERROR_INTERNET');
		};
        this.xhr.onerror = function () {
			this.showErrorMessage('ERROR_INTERNET');
		};
        this.xhr.onreadystatechange = this.stateChange.bind(this);
    }

    stateChange() {
        if (this.xhr.readyState === 4 && this.xhr.status === 200) {
            this.processResponse();
        }
    }

    processResponse() {
        let response = this.xhr.response;
		if (response == null) {
			return;
		}
        let command = response.command;
        if (response.error_code !== 0) {
            // console.log(command + '-' + response.error_code + ': ' + response.message);
			this.showErrorMessage(response.error_code);
            return;
        }

        switch (command) {
            case GET_CASH_DROP:
				let cashDropResponse = response.data;
				for (let i = 0; i < cashDropResponse.length; i++) {
					for (let j = 0; j < this.promotionInformation.length; j++) {
						if (cashDropResponse[i].promotion_id === this.promotionInformation[j].promotion_id) {
							this.promotionInformation[j].mode = cashDropResponse[i].mode;
							this.promotionInformation[j].mode_rule = cashDropResponse[i].mode_rule;
							this.promotionInformation[j].promotion_content = cashDropResponse[i].promotion_content;
						}
					}
				}
                this.promotionInstance.sendGetTournament();
				break;

			case GET_TOURNAMENT:
				let tournamentResponse = response.data;
				for (let i = 0; i < tournamentResponse.length; i++) {
					for (let j = 0; j < this.promotionInformation.length; j++) {
						if (tournamentResponse[i].promotion_id === this.promotionInformation[j].promotion_id) {
							this.promotionInformation[j].mode = -1; //錦標賽給特定模式-1
							this.promotionInformation[j].bonus_setting = tournamentResponse[i].bonus_setting;
							this.promotionInformation[j].promotion_content = tournamentResponse[i].promotion_content;
							this.promotionInformation[j].payout_status = tournamentResponse[i].payout_status;
						}
					}
				}
                this.promotionInstance.sendGetCashDropPrizeRecord();
                this.promotionInstance.promotionContent.createAllPage(false);
				break;

            case GET_CASH_DROP_PRIZE_RECORD:
                let cashDropPrizeRecordResponse = response?.data || [];
                cashDropPrizeRecordResponse.sort(function (a, b) {
                    return a.promotion_id > b.promotion_id ? 1 : -1;
                })
                for (let i = 0; i < cashDropPrizeRecordResponse.length; i++) {
                    for (let j = 0; j < this.promotionInformation.length; j++) {
                        if (cashDropPrizeRecordResponse[i].promotion_id === this.promotionInformation[j].promotion_id) {
                            this.promotionInformation[j].user = cashDropPrizeRecordResponse[i].user;
                            this.promotionInformation[j].user.sort((a, b) => {
                                return b.date > a.date ? 1 : -1;
                            })
                            this.promotionInformation[j].winner = cashDropPrizeRecordResponse[i].winner;
                        }
                    }
                }
                this.promotionInstance.sendGetTournamentPrizeRecord();
                break;

            case GET_TOURNAMENT_PRIZE_RECORD:
                let tournamentPrizeRecordResponse = response?.data || [];
                tournamentPrizeRecordResponse.sort(function (a, b) {
                    return a.promotion_id > b.promotion_id ? 1 : -1;
                });
                for (let i = 0; i < tournamentPrizeRecordResponse.length; i++) {
                    for (let j = 0; j < this.promotionInformation.length; j++) {
                        if (tournamentPrizeRecordResponse[i].promotion_id === this.promotionInformation[j].promotion_id) {
                            this.promotionInformation[j].user = tournamentPrizeRecordResponse[i].user;
                            this.promotionInformation[j].winner = tournamentPrizeRecordResponse[i].winner;
                        }
                    }
                }
                this.promotionInstance.promotionContent.updatePromoteWinner();
                break;

            case GET_JP:
                if (response.data && response.data.length > 0) {
                    let responseData = response.data[0];
                    this.promotionInstance.jackpotTierData['content'] = responseData.promotion_content;
                }
                this.promotionInstance.sendGetJpPrizeRecord();
                this.promotionInstance.promotionContent.createAllPage(true);
                break;

            case GET_JP_PRIZE_RECORD:
                let responseData = response.data;
                for (let i = 0; i < responseData.length; i++) {
                    for (let j = 0; j < this.jackpotInformation.length; j++) {
                        if (responseData[i].promotion_id === this.jackpotInformation[j].promotion_id) {
                            this.jackpotInformation[j].user = responseData[i].user;
                            this.jackpotInformation[j].winner = responseData[i].winner;
                        }
                    }
                }
                this.promotionInstance.sendGetJpAmount();
                this.promotionInstance.promotionContent.updateJackpotWinner();
                break;

            case GET_JP_AMOUNT:
                if (response.data && response.data.length > 0) {
                    let responseData = response.data[0];
                    let dataKeys = Object.keys(responseData);
                    for (let i = 0; i < dataKeys.length; i++) {
                        this.promotionInstance.jackpotTierData[dataKeys[i]] = responseData[dataKeys[i]];
                    }
                }
                this.promotionInstance.promotionContent.updateJackpotTierInfotmation();
                break;
        }
    }

    sendRequest(data) {
        this.xhr.open('POST', extensions.getParameter('serverurl'));
        this.xhr.responseType = 'json';
        this.xhr.send(data);
    }

    showErrorMessage(errorCode) {
        window.dispatchEvent(new CustomEvent('EXTENSIONS_ERROR_MESSAGE', { detail: { error_code: errorCode } }));
    }
}