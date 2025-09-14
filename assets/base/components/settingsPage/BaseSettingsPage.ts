import { _decorator, Button, Component, tween, UIOpacity, Vec3 } from 'cc';
const { ccclass } = _decorator;

/**
 * 按鈕介面2
 */
@ccclass('BaseSettingsPage')
export class BaseSettingsPage extends Component {

    private showPos: Vec3;
    private hidePos: Vec3;


    public onLoad() {
        this.showPos = this.node.position.clone();
        this.hidePos = new Vec3(this.showPos.x, this.showPos.y - 160, this.showPos.z);
    }

    protected fadeIn(): void {
        this.node.active = true;
        this.setButtonEnabled(false);

        tween()
            .target(this.node)
            .to(0.25, {
                position: this.showPos
            })
            .call(() => {
                this.setButtonEnabled(true);
            })
            .start();

        tween()
            .target(this.node.getComponent(UIOpacity))
            .to(0.25, {
                opacity: 255
            })
            .start();
    }

    protected fadeOut(): void {
        this.setButtonEnabled(false);

        tween()
            .target(this.node)
            .to(0.25, { position: this.hidePos })
            .call(() => {
                this.node.active = false;
            })
            .start();

        tween()
            .target(this.node.getComponent(UIOpacity))
            .to(0.25, {
                opacity: 0
            })
            .start();
    }

    protected show(): void {
        this.node.setPosition(this.showPos);
        this.node.active = true;
        this.node.getComponent(UIOpacity).opacity = 255;
    }

    protected hide(): void {
        this.node.setPosition(this.hidePos);
        this.node.active = false;
        this.node.getComponent(UIOpacity).opacity = 0;
    }


    /**
     * 設定按鈕是否用
     * @param enabled 
     */
    protected setButtonEnabled(enabled: boolean) {
        this.node.children.forEach(element => {
            if (element.getComponent(Button)) {
                element.getComponent(Button).interactable = enabled;
            }
        });
    }
}
