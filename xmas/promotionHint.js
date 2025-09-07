class PromotionHint {
    
    constructor(positionX, positionY, width, height, operateContainer, PIXI, show , hide , mask) {
        this.positionX = positionX;
        this.positionY = positionY;
        this.width = width;
        this.height = height;
        this.operateContainer = operateContainer;
        this.PIXI = PIXI;

        this.background = null;
        this.hintContainer = null;
        this.hitMask = null;
        this.messageQueue = [];
        this.waitTime = 10;

        this.showHintPosition = show ;
        this.hideHintPosition = hide ;
        this.hideMaskPosition = mask ;
    }

    init() {
        this.hintContainer = new this.PIXI.PIXI.Container();
        this.hintContainer.position.set(this.hideHintPosition, this.positionY);
        this.hintContainer.interactive = true;
        this.hintContainer.on('pointertap', () => {
            clearTimeout(this.backTimeout);
            extensions.TweenLite.to(this.hintContainer.position, 0.5, {
                x: this.hideHintPosition,
                onComplete: () => {
                    // 提示框收進去之後就把訊息從序列移除, 接著顯示下一條訊息
                    this.messageQueue.splice(0, 1);
                    if (this.messageQueue.length > 0) {
                        this.showHint();
                    }
                }
            });
        });
        this.operateContainer.addChild(this.hintContainer);

        // this.background = new this.PIXI.PIXI.Graphics();
        // this.background.beginFill(0, 0.8);
        // this.background.drawRoundedRect(0, -this.height / 2, this.width, this.height, this.height / 2);
        // this.background.endFill();
        this.background = new extensions.PIXI.Sprite(extensions.getTexture( 'promotion_board' ));
        this.background.scale.set(-0.5, 0.5);
        this.background.anchor.set(0.5, 0.5);
        this.hintContainer.addChild(this.background);

        this.hitMask = new this.PIXI.PIXI.Graphics();
        this.hitMask.beginFill(0xFF0000, 0.8);
        this.hitMask.drawRect(this.hideMaskPosition, -this.height / 2 + this.positionY, this.width, this.height);
        this.hitMask.endFill();
        this.operateContainer.addChild(this.hitMask);

        this.hintContainer.mask = this.hitMask;
    }

    setPosition(x, y) {
        this.hintContainer.position.set(x, y);
    }

    setText(positionX, positionY, titleFont, contentFont) {
        let firstX = positionX;
        let firstY = positionY;
        let lineHeight = 4;
        
        this.messageTitle = new this.PIXI.PIXI.Text('promotion name', {
            font: 'Arial',
            fontSize: titleFont.size,
            fill: 0xFFFFFF,
            align: 'center',
            textBaseline: 'alphabetic'
        });
        this.messageTitle.anchor.set(0, 0.5);
        this.messageTitle.position.set(firstX, firstY);
        this.hintContainer.addChild(this.messageTitle);

        this.messageText = new this.PIXI.PIXI.Text('恭喜獲得獎金 ', {
            font: 'Arial',
            fontSize: contentFont.size,
            fill: 0xFFFF00,
            align: 'left',
            textBaseline: 'alphabetic',
            wordWrap: true,
            wordWrapWidth: this.width - 70,
        });
        this.messageText.anchor.set(0, 0.5);
        this.messageText.position.set(firstX, firstY + this.messageTitle._style._fontSize + lineHeight);
        this.hintContainer.addChild(this.messageText);

        // * Mark messageIcon to undefined
        this.messageIcon = undefined;
    }

    setTextWithIcon(positionX, positionY, titleFont, contentFont) {
        this.setText(positionX, positionY, titleFont, contentFont);

        // this.messageIcon = new extensions.PIXI.Sprite(extensions.getTexture( 'jackpot_grand' ));
        this.messageIcon = new extensions.PIXI.Sprite(PIXI.Texture.WHITE);
        this.messageIcon.alpha = 0;
        this.messageIcon.position.set(98, 7);
        this.messageIcon.scale.set(0.5, 0.5);
        this.messageIcon.anchor.set(0, 0.5);
        this.hintContainer.addChild(this.messageIcon);
    }

    jackpotPopUpSetting (isSelf) {
        this.isNeedOffset = isSelf;
    }

    popOutHint(title, message, jpTier) {
        // 先把訊息丟到序列裡面
        this.messageQueue.push({
            title: title,
            message: message,
            jpTier: jpTier,
            isOffset: this.isNeedOffset
        });
        // 只有一個訊息表示第一次進來
        if (this.messageQueue.length === 1) {
            this.showHint();
        }
    }

    showHint() {
        this.messageTitle.text = this.messageQueue[0].title;
        this.messageText.text = this.messageQueue[0].message;
        
        if (this.messageQueue[0].jpTier && this.messageIcon) {
            this.messageIcon.alpha = 1;
            this.messageIcon.texture = extensions.getTexture( `jackpot_${this.messageQueue[0].jpTier}` );

            if (this.messageQueue[0].isOffset) {
                this.messageIcon.position.set(98, 7);
            } else {
                this.messageIcon.position.set(130, 7);
            }
        }
        extensions.TweenLite.to(this.hintContainer.position, 0.5, {
            x: this.showHintPosition,
            onComplete: () => {
                this.backTimeout = setTimeout(() => {
                    extensions.TweenLite.to(this.hintContainer.position, 0.5, {
                        x: this.hideHintPosition,
                        onComplete: () => {
                            if (this.messageIcon) {
                                this.messageIcon.alpha = 0;
                            }
                            // 提示框收進去之後就把訊息從序列移除, 接著顯示下一條訊息
                            this.messageQueue.splice(0, 1);
                            if (this.messageQueue.length > 0) {
                                this.showHint();
                            }
                        }
                    });
                }, this.waitTime * 1000);
            }
        });
    }

    setWaitTime(time) {
        this.waitTime = time;
    }
}