import { _decorator, Button, Component, Node } from 'cc';

import { XEvent, XEvent1 } from '@base/script/utils/XEvent';

const { ccclass } = _decorator;

/**
 * 畫面提示
 */
@ccclass('Notice')
export class Notice extends Component {

    /**顯示餘額不足提示(reload:boolean) */
    public static showNoBalance: XEvent1<boolean> = new XEvent1();
    /**顯示錯誤提示 */
    public static showError: XEvent1<string> = new XEvent1();

    /**點擊錯誤提示OK */
    public static clickReload: XEvent = new XEvent();
    /**點擊錯誤提示OK */
    public static clickError: XEvent = new XEvent();

    // public static showMode: XEvent1<TurboMode> = new XEvent1();

    // /**下注不足提示 */
    // private spinMinText: string = 'ANDA BISA BELI SPIN GRATIS MULAI DARI RP #1 DAN LEBIH ATAU NAIKKAN TARUHAN ANDA KE RP #2 UNTUK SPIN';
    // public static showSpinMin: XEvent2<number, number> = new XEvent2();

    /**錯誤提示系統字(多語系資源讀取完成前使用) */
    // private label: Label;

    /**錯誤提示 */
    private infoError: Node;
    /**餘額不足提示 */
    private infoNoBalance: Node;


    onLoad() {
        this.infoError = this.node.getChildByName('InfoError');
        this.infoNoBalance = this.node.getChildByName('InfoNoBalance');

        //監聽
        Notice.showNoBalance.on(this.onShowNoBalance, this);
        Notice.showError.on(this.onShowError, this);

        this.infoError.getChildByName('Click').on(Button.EventType.CLICK, () => {
            Notice.clickError.emit();//點擊OK後關閉提示
            this.onCloseNotice();
        }, this);

        this.infoNoBalance.getChildByName('Click').on(Button.EventType.CLICK, () => {
            Notice.clickReload.emit();//點擊OK後重刷
            this.onCloseNotice();
        }, this);


        //切換模式
        // Notice.showMode.on((mode: TurboMode) => {
        //     //一般模式
        //     if (mode === TurboMode.Normal) {
        //         this.node.getChildByPath('speedOn').getComponent(Animation).stop();
        //         this.node.getChildByPath('speedOn').active = false;

        //         this.node.getChildByPath('turboOn').getComponent(Animation).stop();
        //         this.node.getChildByPath('turboOn').active = false;

        //         this.node.getChildByPath('turboOff').active = true;
        //         this.node.getChildByPath('turboOff').getComponent(Animation).play(BaseAnimationName.fadeInAndOut);
        //     }
        //     //閃電模式
        //     else if (mode === TurboMode.Speed) {
        //         this.node.getChildByPath('speedOn').active = true;
        //         this.node.getChildByPath('speedOn').getComponent(Animation).play(BaseAnimationName.fadeInAndOut);

        //         this.node.getChildByPath('turboOn').getComponent(Animation).stop();
        //         this.node.getChildByPath('turboOn').active = false;

        //         this.node.getChildByPath('turboOff').getComponent(Animation).stop();
        //         this.node.getChildByPath('turboOff').active = false;
        //     }
        //     //Turbo模式
        //     else if (mode === TurboMode.Turbo) {
        //         this.node.getChildByPath('speedOn').getComponent(Animation).stop();
        //         this.node.getChildByPath('speedOn').active = false;

        //         this.node.getChildByPath('turboOn').active = true;
        //         this.node.getChildByPath('turboOn').getComponent(Animation).play(BaseAnimationName.fadeInAndOut);

        //         this.node.getChildByPath('turboOff').getComponent(Animation).stop();
        //         this.node.getChildByPath('turboOff').active = false;
        //     }
        // }, this);

        // BundleLoader.onLoaded(BaseConst.BUNDLE_BASE_CURRENCY, `${DataManager.getInstance().urlParam.lang}/${BaseLangBundleDir.ui3_0}`, (langRes: any) => {
        //     //多語系資源讀取完成後, 就不再使用系統字
        //     this.label.node.active = false;

        //     this.node.getChildByPath('InfoBg/text').getComponent(Sprite).spriteFrame = langRes['popui_txt_01'];
        //     this.node.getChildByPath('InfoNoBalance/text').getComponent(Sprite).spriteFrame = langRes['popui_txt_00'];
        //     this.noBalanceSR.getChildByPath('text').getComponent(Sprite).spriteFrame = langRes['popui_txt_00'];

        //     this.node.getChildByPath('speedOn').getComponent(Sprite).spriteFrame = langRes['hint_speed_on'];
        //     this.node.getChildByPath('turboOn').getComponent(Sprite).spriteFrame = langRes['hint_turbo_on'];
        //     this.node.getChildByPath('turboOff').getComponent(Sprite).spriteFrame = langRes['hint_turbo_off'];
        // });
    }

    /**
     * 顯示錯誤提示
     * @param str {string} 錯誤提示
     */
    private onShowError(str: string) {
        this.node.getChildByPath('BlackMask').active = true;
        this.infoError.active = true;
    }

    /**
     * 顯示餘額不足提示 
     * @param reload {boolean} 是否重新載入
     */
    private onShowNoBalance() {
        this.node.getChildByPath('BlackMask').active = true;
        this.infoNoBalance.active = true;
    }

    /**
     * 關閉提示
     */
    private onCloseNotice() {
        this.node.getChildByPath('BlackMask').active = false;
        this.infoError.active = false;
        this.infoNoBalance.active = false;
    }
}

