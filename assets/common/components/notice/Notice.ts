import { _decorator, Button, Component, Label, Node } from 'cc';

import { XEvent, XEvent1 } from '@common/script/event/XEvent';
import { ErrorCodeConfig } from '@common/script/network/ErrorCodeConfig';

const { ccclass } = _decorator;

/**
 * 畫面提示
 */
@ccclass('Notice')
export class Notice extends Component {
    // private static instance: Notice;
    // public static getInstance(): Notice {
    //     return Notice.instance;
    // }
    public static showError: XEvent1<number> = new XEvent1();
    public static showNoBalance: XEvent = new XEvent();

    /**錯誤提示 */
    private infoError: Node;
    /**餘額不足提示 */
    private infoNoBalance: Node;

    /**錯誤代碼配置 */
    private errorCodeConfig: ErrorCodeConfig;

    onLoad() {
        Notice.showError.on(this.showError, this);
        Notice.showNoBalance.on(this.showNoBalance, this);
        // Notice.instance = this;
        this.errorCodeConfig = new ErrorCodeConfig();
        this.infoError = this.node.getChildByName('InfoError');
        this.infoNoBalance = this.node.getChildByName('InfoNoBalance');

        this.infoError.getChildByName('Click').on(Button.EventType.CLICK, () => {
            this.onCloseNotice();
        }, this);

        this.infoNoBalance.getChildByName('Click').on(Button.EventType.CLICK, () => {
            window.location.reload();//重新加載
            this.onCloseNotice();
        }, this);
    }

    /**
     * 顯示錯誤提示
     * @param errorCode {number} 錯誤代碼
     */
    public showError(errorCode: number) {
        const errorDescription = this.errorCodeConfig.getErrorDescription(errorCode);
        this.infoError.getChildByName('Label').getComponent(Label).string = errorDescription;
        this.node.getChildByPath('BlackMask').active = true;
        this.infoError.active = true;
    }

    /**
     * 顯示餘額不足提示 
     * @param errorCode {number} 錯誤代碼
     */
    public showNoBalance() {
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