class IconButton {

    mainContainer;
    buttonSprite;
    callback;

    constructor ( parent, texture, callback ) {
        this.mainContainer = new extensions.PIXI.Container();
        this.mainContainer.name = 'IconButton';
        parent.addChild( this.mainContainer );

        this.buttonSprite = new extensions.PIXI.Sprite( texture );
        this.buttonSprite.name = `Sprite: ${ texture.textureCacheIds[ 0 ] }`;
        this.buttonSprite.buttonMode = true;
        this.buttonSprite.anchor.set( 0.5, 0.5 );
        this.buttonSprite.interactive = true;
        this.mainContainer.addChild( this.buttonSprite );

        this.callback = callback;

        this.addListener();
    }

    buttonDown () {
        TweenLite.to( this.mainContainer.scale, 0.1, { x: 0.9 * this.scale.x, y: 0.9 * this.scale.y } );
    }

    buttonUp () {
        TweenLite.to( this.mainContainer.scale, 0.1, { x: 1 * this.scale.x, y: 1 * this.scale.y } );

        if ( this.callback ) {
            this.callback();
        }
    }

    buttonUpOutside () {
        TweenLite.to( this.mainContainer.scale, 0.1, { x: 1 * this.scale.x, y: 1 * this.scale.y } );
    }

    addListener () {
        this.buttonSprite.on( 'mousedown', this.buttonDown.bind( this ) );
        this.buttonSprite.on( 'touchstart', this.buttonDown.bind( this ) );

        this.buttonSprite.on( 'mouseup', this.buttonUp.bind( this ) );
        this.buttonSprite.on( 'touchend', this.buttonUp.bind( this ) );

        this.buttonSprite.on( 'mouseupoutside', this.buttonUpOutside.bind( this ) );
        this.buttonSprite.on( 'touchendoutside', this.buttonUpOutside.bind( this ) );
    }

    setPosition ( x, y ) {
        this.mainContainer.position.set( x, y );
    }

    setScale ( x, y ) {
        this.mainContainer.scale.set( x, y );
        this.scale = { x: x, y: y };
    }

    setInteractive ( interactive ) {
        this.buttonSprite.interactive = interactive;
    }

    setAlpha ( alpha ) {
        this.mainContainer.alpha = alpha;
    }

    setTexture ( texture ) {
        this.buttonSprite.texture = texture;
        this.buttonSprite.name = `Sprite: ${ texture.textureCacheIds[ 0 ] }`;
    }

    addChild ( displayObject ) {
        this.mainContainer.addChild( displayObject );
    }
}