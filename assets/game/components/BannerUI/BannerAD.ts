import { _decorator, Component, Sprite, SpriteFrame, Tween, tween, UIOpacity, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

/**
 * 輪播廣告控制器
 */
@ccclass('BannerAD')
export class BannerAD extends Component {
    @property({ tooltip: "最大寬度(超過寬度以跑馬燈演示)" })
    maxWidth: number = 720; // 自訂最大寬度

    private spriteFrames: SpriteFrame[] = [];

    @property(Sprite)
    private sprite: Sprite = null;

    private currentIndex: number = 0;
    private isPlaying: boolean = false;

    private spaceX: number = 200;
    // 速度，跑馬燈用，單位 px/sec
    private marqueeSpeed: number = 300;

    private spriteOpacity: UIOpacity = null;

    onLoad(): void {
        this.spriteOpacity = this.sprite.getComponent(UIOpacity);
    }

    /**
     * 圖片陣列
     * @param spriteFrames 
     */
    setup(spriteFrames: SpriteFrame[]) {
        this.spriteFrames = spriteFrames;
        this.currentIndex = 0;
        if (this.spriteFrames.length > 0) {
            this.sprite.spriteFrame = this.spriteFrames[0];
        }
    }

    /**
     * 
     * @returns 
     */
    play() {
        if (this.isPlaying || this.spriteFrames.length === 0) return;
        this.stop();

        this.isPlaying = true;
        this.currentIndex = 0;


        this.showNextImage();
    }

    /**
     * 
     * @returns 
     */
    private showNextImage() {
        if (!this.isPlaying) return;

        let spf = this.spriteFrames[this.currentIndex];
        this.sprite.spriteFrame = spf;

        // 重置 sprite 位置和透明度
        this.sprite.node.setPosition(0, 0);

        const width = spf.originalSize.width;


        // 寬度小於 maxWidth，淡入顯示，alpha 255 後停留1秒，再淡出切換下一張
        if (width <= this.maxWidth) {
            this.spriteOpacity.opacity = 0;
            tween(this.spriteOpacity)
                .to(0.5, { opacity: 255 })
                .delay(1)
                .to(0.5, { opacity: 0 })
                .call(() => {
                    this.currentIndex = (this.currentIndex + 1) % this.spriteFrames.length;
                    this.showNextImage();
                })
                .start();
        }
        // 寬度超過 maxWidth，跑馬燈
        else {
            let exceedWidth = width - this.maxWidth;
            this.sprite.node.setPosition(exceedWidth / 2 + this.spaceX, 0);
            const distance = width + this.maxWidth;
            const duration = distance / this.marqueeSpeed;

            this.spriteOpacity.opacity = 0;

            tween(this.spriteOpacity)
                .to(0.5, { opacity: 255 })
                .call(() => {
                    tween(this.sprite.node)
                        .to(duration, { position: new Vec3(-this.maxWidth - (exceedWidth / 2)) })
                        .call(() => {
                            this.currentIndex = (this.currentIndex + 1) % this.spriteFrames.length;
                            this.showNextImage();
                        })
                        .start();
                })
                .start();
        }
    }

    stop() {

        Tween.stopAllByTarget(this.spriteOpacity);
        Tween.stopAllByTarget(this.sprite.node);

        this.isPlaying = false;
    }
}

