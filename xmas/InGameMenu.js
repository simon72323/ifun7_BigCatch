const GET_IN_GAME_MENU = 'get_in_game_menu';
const UPDATE_IN_GAME_MENU_FAVORITE_GAME = 'update_in_game_menu_favorite_game';
const GET_IN_GAME_MENU_GAME_URL = 'get_in_game_menu_game_url';

class InGameMenu {

    config;
    gameListStore;

    constructor(parent) {
        this.parentContainer = parent;
        this.layoutContainer = undefined;
        this.mainContainer = undefined;
        this.iconContainer = undefined
        this.menuContainer = undefined;
        this.slideButton = undefined;
        this.inGameMenuRedDot = undefined;

        this.config = {
            imageURL: '',
            isAvailable: false,
            hot: [],
            new: [],
            gameList: [],
            favList: [],
        };
        this.gameListStore = {};


        // * Default is show out
        this.isShowOut = false;
        this.isRedDotVisible = true ;
        this.server = new InGameMenuHttpRequest(this);
        
        this.init();
    }

    init() {
        // console.log('[InGameMenu] Init');
        
        this.layoutContainer = new extensions.PIXI.Container();
        this.layoutContainer.name = 'InGameMenuMain';
        this.parentContainer.addChild(this.layoutContainer);

        this.mainContainer = new extensions.PIXI.Container();
        this.mainContainer.name = 'InGameMenuContainer';
        this.mainContainer.position.set(0, 0);
        this.layoutContainer.addChild(this.mainContainer);

        this.iconContainer = new extensions.PIXI.Container();
        this.iconContainer.name = 'iconContainer';
        this.iconContainer.position.set(IN_GAME_MENU_ICON_CONTAINER_POSITION_X, IN_GAME_MENU_ICON_CONTAINER_POSITION_Y);
        this.mainContainer.addChild(this.iconContainer);

        let inGameMenuIcon = new IconButton(this.iconContainer, extensions.getTexture('in_game_menu_promotion_board'), () => {
            //20231110 remove inGameMenu button
            //this.getInGameMenuData();
        });
        inGameMenuIcon.setScale(0.5, 0.5);
        inGameMenuIcon.setInteractive(false) ;//disable button

        this.slideButton = new extensions.PIXI.Sprite(extensions.getTexture('in_game_menu_off'));
        this.slideButton.position.set(IN_GAME_MENU_SLIDE_BUTTON_POSITION_X, IN_GAME_MENU_SLIDE_BUTTON_POSITION_Y);
        this.slideButton.scale.set(0.5);
        this.slideButton.anchor.set(0.5);
        this.slideButton.interactive = true;
        this.slideButton.buttonMode = true;
        this.slideButton.on('pointertap', () => {
            this.onSlideClick();
        });

        this.mainContainer.addChild(this.slideButton);

        //red dot sprite
        this.inGameMenuRedDot = new PIXI.Sprite(s_oTextureLibrary.getTexture('in_game_menu_dot'));
        this.inGameMenuRedDot.scale.set(0.5);
		this.inGameMenuRedDot.anchor.set(0.5);
		this.inGameMenuRedDot.position.set(IN_GAME_MENU_MAIN_CONTAINER_RED_DOT_POSITION_X, IN_GAME_MENU_MAIN_CONTAINER_RED_DOT_POSITION_Y);
		this.mainContainer.addChild(this.inGameMenuRedDot);

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
        this.inGameMenuRedDot.addChild(this.redDotHint);

        this.inGameMenuMainContainerOnSlidePositionX = IN_GAME_MENU_MAIN_CONTAINER_ON_SLIDE_X ;
    }

     //add click InGameMenuButton
    onClickInGameMenuButton(){
        this.getInGameMenuData();
    }

    onResize(isPortrait) {
        if (this.menuContainer) {
            this.menuContainer.onResize(isPortrait);
        }
    }

    getInGameMenuData() {
        // * If we already have data, don't call the api
        if (this.config.favList.length > 0 || this.config.gameList.length > 0) {
            this.createInGameMenuContent();
        } else {
            let data = {
                command: GET_IN_GAME_MENU,
                token: extensions.getToken(),
                data: {}
            };
            this.server.sendRequest(JSON.stringify(data));
        }        
    }

    getGameUrl(gameId) {
        let data = {
            command: GET_IN_GAME_MENU_GAME_URL,
            token: extensions.getToken(),
            data: {
                game_id: gameId,
                lang: extensions.getParameter('lang'),
                b: extensions.getParameter('b')
            }
        };
        this.server.sendRequest(JSON.stringify(data));
    }

    updateFavoriteList() {
        let data = {
            command: UPDATE_IN_GAME_MENU_FAVORITE_GAME,
            token: extensions.getToken(),
            data: {
                favorite: this.config.favList,
            }
        };
        this.server.sendRequest(JSON.stringify(data));
    }

    createInGameMenuContent () {
        this.menuContainer = new InGameMenuContent(this);
        this.menuContainer.createInGameMenu();
    }
    closeInGameMenuContent() {
        this.menuContainer.closeWindowAndSave();
    }

    redirectToNewGame(url) {
        window.location.assign(url);
    }

    onSlideClick() {
        let slideTime = 0.5;
        let buttonTextName = 'in_game_menu_on';//右箭頭'>'
        let position = this.inGameMenuMainContainerOnSlidePositionX;
        if (this.isShowOut) {
            buttonTextName = 'in_game_menu_off';//左箭頭'<'
            position = IN_GAME_MENU_MAIN_CONTAINER_OFF_SLIDE_X;
        }

        extensions.TweenLite.to(
            this.mainContainer.position, 
            slideTime,
            { x: position }
        );

        this.slideButton.texture = extensions.getTexture(buttonTextName);
        this.isShowOut = !this.isShowOut;

        if (this.isRedDotVisible === true){
            this.isRedDotVisible = false ;
            this.inGameMenuRedDot.visible = false ;
        }
    }

    slideOff() {
        if (this.isShowOut) {
            let position = IN_GAME_MENU_MAIN_CONTAINER_OFF_SLIDE_X;
            extensions.TweenLite.to(
                this.mainContainer.position, 
                0.5,
                { x: 60 }
            );
            this.slideButton.texture = extensions.getTexture('in_game_menu_off');
            this.isShowOut = false;
        }
    }

    defaultOff() {
        this.mainContainer.position.x = IN_GAME_MENU_MAIN_CONTAINER_OFF_SLIDE_X;
        this.slideButton.texture = extensions.getTexture('in_game_menu_off');
        this.isShowOut = false;
    }

    setMainContainerOnSlidePositionFrom(set) {
        this.inGameMenuMainContainerOnSlidePositionX = (set === true) ? IN_GAME_MENU_MAIN_CONTAINER_ON_SLIDE_X : IN_GAME_MENU_MAIN_CONTAINER_ON_SLIDE_X_HALF ;
    }
}


class InGameMenuHttpRequest {
    inGameMenuInstance;
    constructor(igmInstance) {
        this.inGameMenuInstance = igmInstance;
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
            // console.log(command + "-" + response.error_code + ": " + response.message);
			this.showErrorMessage(response.error_code);
            return;
        }

        switch (command) {
            case GET_IN_GAME_MENU:
                if (response.data && response.data.length > 0) {
                    this.processInGameMenuData(response.data[0]);
                    this.inGameMenuInstance.createInGameMenuContent();
                }
                break;
            case UPDATE_IN_GAME_MENU_FAVORITE_GAME:
                this.inGameMenuInstance.closeInGameMenuContent();
                break;
            case GET_IN_GAME_MENU_GAME_URL:
                if (response.data && response.data.length > 0) {
                    let gameURL = response.data[0]['url'];
                    this.inGameMenuInstance.redirectToNewGame(gameURL);
                }
                break;
        }
    }

    sendRequest(data) {
        this.xhr.open('POST', extensions.getParameter('serverurl'));
        this.xhr.responseType = 'json';
        this.xhr.send(data);
    }

    processInGameMenuData(response) {
        // * Process Hot, New and All game list
        let menuGames = response['game'];
        for (let i = 0; i < menuGames.length; i++) {
            if (menuGames[i][1] == 1) {
                this.inGameMenuInstance.config.new.push(menuGames[i][0]);
            } else if (menuGames[i][1] == 2) {
                this.inGameMenuInstance.config.hot.push(menuGames[i][0]);
            }
            this.inGameMenuInstance.config.gameList.push(menuGames[i][0]);
        }

        // * Process favorite game list
        let favGames = response['favorite'];
        for (let i = 0; i < favGames.length; i++) {
            this.inGameMenuInstance.config.favList.push(favGames[i]);
        }

        // * Keeps imageURL
        this.inGameMenuInstance.config.imageURL = response['image'];
        
        // * Create game data
        let allGamesData = response['game_name'];
        for (let i = 0; i < allGamesData.length; i++) {
            this.inGameMenuInstance.gameListStore[allGamesData[i].game_id] = allGamesData[i].language;
        }
    }

    showErrorMessage(errorCode) {
        window.dispatchEvent(new CustomEvent('EXTENSIONS_ERROR_MESSAGE', { detail: { error_code: errorCode } }));
    }
}