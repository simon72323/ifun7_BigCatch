class Extensions {

    mainUIContainer;
    promotionInformation;
    jackpotInformation;
    inGameMenuStatus;

    promotion;
    inGameMenu;

    PIXI;
    TweenLite;

    userAccount;

    ratio = (16 / 9);

    promotionForcePosition = undefined;
    inGameMenuForcePosition = undefined;

    constructor () {
        console.log('[Extensions] init');
        this.init();
    }

    init () {
        this.addScriptsAndCss();
        this.addListeners();

        // * Start schedule fetch teh extra data per 60 sec
        this.scheduleFetchExtraData();
    }

    addScriptsAndCss () {
        // * Add shared js and css
        document.write(`
            <script type="text/javascript" src="./extensions/libs/bootstrap.bundle.min.js"><\/script>
            <link type="text/css" rel="stylesheet" href="./extensions/libs/bootStrape.css">
            <script type="text/javascript" src="./extensions/libs/swiper-bundle.min.js"><\/script>
            <link type="text/css" rel="stylesheet" href="./extensions/libs/swiper-bundle.min.css">
            <script type="text/javascript" src="./extensions/js/config.js"><\/script>
            <script type="text/javascript" src="./extensions/js/IconButton.js"><\/script>
        `);
        // * Add Promotion/Jackpot
        document.write(`
            <script type="text/javascript" src="./extensions/js/Promotion.js"><\/script>
            <script type="text/javascript" src="./extensions/js/promotionalContent.js"><\/script>
            <script type="text/javascript" src="./extensions/js/promotionHint.js"><\/script>
            <link type="text/css" rel="stylesheet" href="./extensions/css/Promotion_css.css">
        `);
        // * Add InGameMenu
        document.write(`
            <script type="text/javascript" src="./extensions/js/InGameMenu.js"><\/script>
            <script type="text/javascript" src="./extensions/js/InGameMenuContent.js"><\/script>
            <link type="text/css" rel="stylesheet" href="./extensions/css/in_game_menu_css.css">
        `);
    }

    addListeners() {
        // * Add HTML Tags
        let tags = [ 'inGameMenuContent', 'promotionContent', 'jackpotContent' ];
        window.addEventListener( 'load', ( event ) => {
            // console.log('[Extensions] onLoad');
            const firstBodyTag = document.getElementsByTagName('body')[0];
            for (let i = 0; i < tags.length; i++ ) {
                let newDiv = document.createElement('div');
                newDiv.id = tags[i];
                firstBodyTag.appendChild(newDiv);
            }
        });

        // * Add onResize listener
        window.addEventListener('resize', () => { this.onResize(); });

        // * Add custom listener
        window.addEventListener( 'PIXI_START_LOADING', ( event ) => {
            // console.log('[Extensions] PIXI_START_LOADING --- extension', event);
            this.PIXI = event.detail.pixi;
            this.PIXI.loader.add('Promotion', './extensions/sprites/Promotion.json');
            this.PIXI.loader.add('CrazyCashDrop_fx', './extensions/sprites/anim/CrazyCashDrop_fx.json');
            this.PIXI.loader.add('Tournament_fx', './extensions/sprites/anim/Tournament_fx.json');
            this.PIXI.loader.add('Jackpot_fx', './extensions/sprites/anim/JACKPOT.json');

            this.TweenLite = event.detail.tween;
        });

        window.addEventListener( 'GAME_READY_TO_SPIN', this.afterGameReadyToSpin.bind(this));

        window.addEventListener( 'GAME_UPDATE_TOTAL_BET', this.onTotalBetChange.bind(this));

        window.addEventListener( 'EXTENSIONS_SLIDE_OFF', this.slideOffAllIcons.bind(this));

        window.addEventListener( 'BUTTON_FAVORITES_ON_CLICK', this.buttonFavoritesOnClick.bind(this));
    }

    onResize() {
        let height = Math.max(window.innerHeight, document.documentElement.clientHeight)
        let width = Math.max(window.innerWidth, document.documentElement.clientWidth);
        
        let isSupportPortrait = ORIENTATION_CONFIG[this.getParameter('gameid')].PORTRAIT === true;
        let isSupportLandscape = ORIENTATION_CONFIG[this.getParameter('gameid')].LANDSCAPE === true;
        let isPortrait = (height > width) || !isSupportLandscape;
        if (!isSupportPortrait) {
            isPortrait = false;
        }

        if (this.inGameMenu) {
            this.inGameMenu.onResize(isPortrait);
        }
        if (this.promotion) {
            this.promotion.onResize(isPortrait);
        }
        
        if (isPortrait) {
			this.updatePortraitElement();
		} else {
			this.updateLandscapeElement();
		}
        
        let innerWidth = window.innerWidth;
        let innerHeight = window.innerHeight;
        let wideScreenRatio = (16 / 9);
        if (isPortrait) {
            if (innerWidth < (VIEW_CONFIG.WIDTH * (innerHeight / VIEW_CONFIG.CANVAS_HEIGHT))) {
                this.ratio = innerWidth / VIEW_CONFIG.WIDTH;
            } else {
                this.ratio = innerHeight / VIEW_CONFIG.CANVAS_HEIGHT;
            }
        } else {
            if (innerWidth > innerHeight * wideScreenRatio) {
                this.ratio = innerHeight / ( VIEW_CONFIG.UI_MIN_WIDTH / wideScreenRatio);
            } else {
                this.ratio = innerWidth / VIEW_CONFIG.UI_MIN_WIDTH;
            }
        }
    }

    updatePortraitElement() {
        if (this.inGameMenu) {
            this.inGameMenu.layoutContainer.position.set(0, 0);
        }
        if (this.promotion) {
            this.promotion.mainContainer.position.set(0, 0);
        }
        this.refreshToForcePosition();
    }

    updateLandscapeElement() {
        if (this.inGameMenu) {
            this.inGameMenu.layoutContainer.position.set(322, 0);
        }
        if (this.promotion) {
            this.promotion.mainContainer.position.set(0, 0);
        }
        this.refreshToForcePosition();
    }

    forceChangePromotionIconPosition(x, y) {
        if (this.promotion) {
            this.promotion.mainContainer.position.set(x, y);
        }
        this.promotionForcePosition = { x: x, y: y };
    }

    forceChangeInGameMenuIconPosition(x, y) {
        if (this.inGameMenu) {
            this.inGameMenu.layoutContainer.position.set(x, y);
        }
        this.inGameMenuForcePosition = { x: x, y: y };
    }

    refreshToForcePosition() {
        if (this.promotion && this.promotionForcePosition) {
            this.promotion.mainContainer.position.set(
                this.promotionForcePosition.x, 
                this.promotionForcePosition.y
            );
        }
        if (this.inGameMenu && this.inGameMenuForcePosition) {
            this.inGameMenu.layoutContainer.position.set(
                this.inGameMenuForcePosition.x,
                this.inGameMenuForcePosition.y
            );
        }
    }

    onTotalBetChange(event) {
        let totalBet = event.detail.totalBet;
        if (this.promotion) {
            this.promotion.updateTotalBet(totalBet);
        }
    }

    async afterGameReadyToSpin ( event ) {
        // console.log('[Extensions] GAME_READY_TO_SPIN --- extension', event);
        this.mainUIContainer = event.detail.container;
        this.userAccount = event.detail.account;

        let promotionResponse = await this.fetchPromotionBrief();
        this.processPromotionBriefResponse( promotionResponse );

        let igmStatusResponse = await this.fetchInGameMenuStatus();
        this.inGameMenuStatus = igmStatusResponse[0].status;

        this.createIcon();
    }

    getParameter ( name ) {
        const location = new URL(window.location); 
        if ( location.searchParams.has( name ) ) {
            return location.searchParams.get( name );
        } else {
            return undefined;
        }
    }

    getToken() {
        let paramToken = this.getParameter('token');
        let gToken = sessionStorage.getItem(paramToken);
        if ( gToken == null || gToken.length === 0 ) return paramToken;

        return gToken;
    }

    getRequestInfo ( request ) {
        return {
            method: 'POST',
            body: JSON.stringify( request )
        };
    }

    async fetchInGameMenuStatus () {
        const GET_IN_GAME_MENU_STATUS = 'get_in_game_menu_status';
        let getIGMData = {
            command: GET_IN_GAME_MENU_STATUS,
            token: this.getToken(),
            data: {}
        };

        return fetch( this.getParameter( 'serverurl' ), this.getRequestInfo(getIGMData) )
            .then( response => response.json() )
            .then( json => json.data );
    }

    async fetchPromotionBrief () {
        const GET_PROMOTION_BRIEF = 'get_promotion_brief';
        let promotionBrief = {
            command: GET_PROMOTION_BRIEF,
            token: this.getToken(),
            data: {
                promotion_id: '-1',
            }
        };

        return fetch( this.getParameter( 'serverurl' ), this.getRequestInfo(promotionBrief) )
            .then( response => response.json() )
            .then( json => json.data );
    }

    processPromotionBriefResponse( response ) {
        let promotionBriefResponse = response;
        promotionBriefResponse.sort( (a, b) => {
            const timeZoneNow = new Date(new Date().toLocaleString('sv-SE', { timeZone: a.time_zone }).replace(/-/g, '/'));
            const timeA = new Date(a.end_date.replace(/-/g, '/')).getTime() - timeZoneNow;
            const timeB = new Date(b.end_date.replace(/-/g, '/')).getTime() - timeZoneNow;
            return timeB > timeA ? 1 : -1;
        });

        // 把錦標賽拿到後面放
        let pushType = 1;
        let temp = promotionBriefResponse.filter(value => value.promotion_type === pushType);
        for (let i = promotionBriefResponse.length - 1; i >= 0; i--) {
            if (promotionBriefResponse[i].promotion_type === pushType) {
                promotionBriefResponse.splice(i, 1);
            }
        }
        promotionBriefResponse = promotionBriefResponse.concat(temp);

        this.promotionInformation = [];
        this.jackpotInformation = [];

        for (let i = 0; i < promotionBriefResponse.length; i++) {
            // * `promotion_type === 2` means jackpot
            if (promotionBriefResponse[i].promotion_type === 2) {
                this.jackpotInformation.push({
                    promotion_id: promotionBriefResponse[i].promotion_id,
                    end_date: promotionBriefResponse[i].end_date,
                    promotion_name: promotionBriefResponse[i].promotion_name,
                    time_zone: promotionBriefResponse[i].time_zone,
                    min_bet: promotionBriefResponse[i].min_bet,
                    currency: promotionBriefResponse[i].currency,
                    promotion_type: promotionBriefResponse[i].promotion_type,
                });
            } else {
                this.promotionInformation.push({
                    promotion_id: promotionBriefResponse[i].promotion_id,
                    end_date: promotionBriefResponse[i].end_date,
                    promotion_name: promotionBriefResponse[i].promotion_name,
                    time_zone: promotionBriefResponse[i].time_zone,
                    min_bet: promotionBriefResponse[i].min_bet,
                    currency: promotionBriefResponse[i].currency,
                    promotion_type: promotionBriefResponse[i].promotion_type,
                });
            }
        }
    }

    scheduleFetchExtraData() {
        this.scheduleId = setInterval(async () => {
            let extraResponse = await this.fetchExtraData();
            this.processExtraData(extraResponse);
        }, (60 * 1000));
    }

    async fetchExtraData () {
        const GET_EXTRA_DATA = 'get_extra_data';
        let extraData = {
            command: GET_EXTRA_DATA,
            token: this.getToken(),
            data: {
                interval: 60,
            }
        };

        return fetch( this.getParameter( 'serverurl' ), this.getRequestInfo(extraData) )
            .then( response => response.json() );
    }

    processExtraData( response ) {
        if (response.error_code) {
			// console.log(response.command + '-' + response.error_code + ': ' + response.message);
			return;
		}

        if ( !this.promotion ) {
            // * There is no promotion, so clear it
            clearInterval(this.scheduleId);
        }

        let extraResponse = response.data;
        for (let i = 0; i < extraResponse.length; i++) {
            let extraData = extraResponse[i];
            // * For cash drop
            if (extraData.cash_drop !== null) {
                for (let j = 0; j < this.promotionInformation.length; j++) {
                    if (this.promotionInformation[j].promotion_id === extraData.cash_drop.promotion_id) {
						this.promotion.showUpPromotionNotification(j, extraData.cash_drop);
                    }
                }
            }

            // * For jackpot
            if (extraData.jackpot) {
                for (let j = 0; j < this.jackpotInformation.length; j++) {
                    this.promotion.showUpJackpotNotification(j, extraData.jackpot);
                }
            }
        }
    }

    createIcon() {
        if (this.inGameMenuStatus === 1) {
            this.inGameMenu = new InGameMenu(this.mainUIContainer);
            this.inGameMenu.layoutContainer.scale.set(EXTENSIONS_SCALE);
        }
        if (this.promotionInformation.length > 0 || this.jackpotInformation.length > 0) {
            this.promotion = new Promotion(this.inGameMenu.iconContainer, this.promotionInformation, this.jackpotInformation);
            this.promotion.mainContainer.scale.set(EXTENSIONS_SCALE);
        }
        if (this.inGameMenu){
            //disable if no event
            if (this.promotionInformation.length <= 0 && this.jackpotInformation.length <= 0) {
                this.inGameMenu.layoutContainer.visible = false ;
            }
            //change tween size
            else if (this.promotionInformation.length <= 0 || this.jackpotInformation.length <= 0) {
                this.inGameMenu.setMainContainerOnSlidePositionFrom(false) ;
            }
        }
        this.onResize();
    }

    getTexture(key) {
        let resources = this.PIXI.loader.resources;
        if (resources[key]) {
            return resources[key].texture;
        } else {
            return this.PIXI.Texture.from(key);
        }
    }

    getSpine(key) {
        return this.PIXI.loader.resources[key];
    }
    
    slideOffAllIcons() {
        if (this.inGameMenu) {
            this.inGameMenu.slideOff();
        }
        if (this.promotion) {
            this.promotion.slideOff();
        }
    }

    buttonFavoritesOnClick(event){
        //console.log('[Extensions] BUTTON_FAVORITES_ON_CLICK', event);
        if (this.inGameMenu) {
            this.inGameMenu.onClickInGameMenuButton();
        }
    }
    
    defaultOffIcons() {
        if (this.inGameMenu) {
            this.inGameMenu.defaultOff();
        }
        if (this.promotion) {
            this.promotion.defaultOff();
        }
    }
}

let extensions = new Extensions();
