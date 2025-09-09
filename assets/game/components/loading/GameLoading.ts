import { _decorator, AudioSource, Button, Mask, Node, sp, Sprite, Vec3 } from 'cc';
import { BaseGameLoading } from '@/base/components/loading/BaseGameLoading';
import { BaseConst } from '@/base/script/constant/BaseConst';
import { BaseDataManager } from '@/base/script/main/BaseDataManager';
import { BaseEvent } from '@/base/script/main/BaseEvent';
import { BundleLoader } from '@/base/script/main/BundleLoader';
const { ccclass, property } = _decorator;

@ccclass('GameLoading')
export class GameLoading extends BaseGameLoading {

    /**開始遊戲按鈕(就算沒讀取完成也允許點擊) */
    private container: Node = null;
    private btn: Button = null;
    private StartGame: Node = null;
    private StartGame_r: Node = null;
    private BtnMaskWake: boolean = false;
    private BtnMaskPos = 0;
    private StartGamePos: Vec3;

    onLoad() {

        this.container = this.node.getChildByPath("StartGame/StartGame_r/Container");
        this.btn = this.container.getChildByPath("Button").getComponent(Button);
        this.StartGame = this.node.getChildByPath("StartGame");
        this.StartGame_r = this.node.getChildByPath("StartGame/StartGame_r/");
        this.StartGamePos = this.StartGame.getPosition();
        //替換多語系圖片
        let dir: string = BaseDataManager.getInstance().urlParam.lang + '/' + BaseConst.DIR_LOADING;
        BundleLoader.onLoaded(BaseConst.BUNDLE_LANGUAGE, dir, (langRes: any) => {
            this.node.getChildByName('loading_bg_01').getComponent(Sprite).spriteFrame = langRes['background_loading'];
            this.btn.normalSprite = langRes['start_btn_N'];
            let btnDown = langRes['start_btn_H'];
            this.btn.pressedSprite = btnDown;
            this.btn.disabledSprite = btnDown;
        });

        //點擊按鈕
        this.btn.node.on(Button.EventType.CLICK, () => {
            this.getComponent(AudioSource).play();
            BaseEvent.clickStart.emit();
        }, this);

        this.btn.enabled = false;
    }
    start() {

    }

    update(deltaTime: number) {
        if (this.BtnMaskWake == true) {
            this.BtnMaskPos = this.BtnMaskPos + 360 * (deltaTime / 1.2);
            if (this.BtnMaskPos >= 360) {
                this.BtnMaskPos = 360;
                this.BtnMaskWake = false;
                this.StartGame.getComponent(Mask).enabled = false;
                this.StartGame_r.getComponent(Mask).enabled = false;
                this.btn.enabled = true;
            }
            let value = Math.floor(this.BtnMaskPos / 12) % 2;
            this.StartGame.setPosition((235 - this.BtnMaskPos), this.StartGamePos.y + 12 * value);
            this.StartGame_r.setPosition((235 - this.BtnMaskPos) * -2, 12 * value * -2);
            this.container.setPosition((235 - this.BtnMaskPos), 12 * value);
        }
    }

    /**
     * 啟用按鈕
     */
    public showButton(): void {
        this.BtnMaskWake = true;
        this.node.getChildByPath("StartGame/StartGame_r/Container/WakeAnm").getComponent(sp.Skeleton).setAnimation(0, 'btn', false);
    }
}