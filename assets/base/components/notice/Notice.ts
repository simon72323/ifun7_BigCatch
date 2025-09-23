import { _decorator, Animation, Button, Component, Label, Node, Sprite } from 'cc';

import { BaseConst } from '@base/script/constant/BaseConst';
import { BundleLoader } from '@base/script/main/BundleLoader';
import { BaseAnimationName, BaseLangBundleDir, TurboMode } from '@base/script/types/BaseType';
import { XEvent, XEvent1, XEvent2 } from '@base/script/utils/XEvent';
import { XUtils } from '@base/script/utils/XUtils';

import { DataManager } from '@common/script/data/DataManager';

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

    public static showMode: XEvent1<TurboMode> = new XEvent1();

    // /**下注不足提示 */
    // private spinMinText: string = 'ANDA BISA BELI SPIN GRATIS MULAI DARI RP #1 DAN LEBIH ATAU NAIKKAN TARUHAN ANDA KE RP #2 UNTUK SPIN';
    // public static showSpinMin: XEvent2<number, number> = new XEvent2();

    /**錯誤提示系統字(多語系資源讀取完成前使用) */
    // private label: Label;

    /**餘額不足提示 */
    private noBalanceSR: Node;

    /**
     * 顯示餘額不足提示 
     * @param reload {boolean} 是否重新載入
     */
    private onShowNoBalance() {
        this.noBalanceSR.active = true;
        this.noBalanceSR.getChildByName('check').on(Button.EventType.CLICK, () => {
            Notice.clickReload.emit();
        }, this);
    }

    onLoad() {
        // this.label = this.node.getChildByPath('InfoBg/Label').getComponent(Label);
        // /**錯誤提示系統字 */
        // this.label.string = 'PLEASE RECONNECT OR\nTRY AGAIN LATER.';

        //SR回傳餘額不足, 點擊OK後重刷
        this.noBalanceSR = this.node.getChildByName('InfoNoBalanceSR');


        Notice.showNoBalance.on(this.onShowNoBalance, this);
        // Notice.showNoBalance.on((reload: boolean) => {
        //     //顯示餘額不足提示
        //     // this.node.getChildByPath('BlackBg').active = true;
        //     if (reload) {
        //         this.noBalanceSR.active = true;
        //     }
        //     // else {
        //     //     this.node.getChildByPath('InfoNoBalance').active = true;
        //     // }
        // }, this);

        Notice.showError.on((str: string) => {
            this.node.getChildByPath('BlackBg').active = true;
            this.node.getChildByPath('InfoBg').active = true;
            this.node.getChildByPath('InfoBg/state').getComponent(Label).string = str;
        }, this);

        //餘額不足提示
        this.node.getChildByPath('InfoNoBalance/check').on(Button.EventType.CLICK, () => {
            this.node.getChildByPath('InfoNoBalance').active = false;
            this.node.getChildByPath('BlackBg').active = false;
        }, this);

        //錯誤提示
        this.node.getChildByPath('InfoBg/check').on(Button.EventType.CLICK, () => {
            this.node.getChildByPath('BlackBg').active = false;
            this.node.getChildByPath('InfoBg').active = false;
            // Notice.clickError.emit();
        }, this);

        //下注不足提示
        this.node.getChildByPath('BetBlock/Back').on(Button.EventType.CLICK, () => {
            this.node.getChildByPath('BetBlock').active = false;
        }, this);
        // Notice.showSpinMin.on((v1: number, v2: number) => {
        //     this.node.getChildByPath('BlackBg').active = false;
        //     this.node.getChildByPath('InfoBg').active = false;
        //     this.node.getChildByPath('InfoNoBalance').active = false;
        //     this.node.getChildByPath('BetBlock').active = true;
        //     this.node.getChildByPath('BetBlock/Label').getComponent(Label).string = this.spinMinText.replace('#1', XUtils.NumberToCentString(v1)).replace('#2', XUtils.NumberToCentString(v2));
        // }, this);

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
}

