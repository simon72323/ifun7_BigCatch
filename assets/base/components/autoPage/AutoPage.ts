import { _decorator, Button, Component, Node, Sprite } from 'cc';

import { AutoOption } from '@base/components/autoPage/AutoOption';
import { AudioKey } from '@base/script/audio/AudioKey';
import { AudioManager } from '@base/script/audio/AudioManager';
import { BaseConst } from '@base/script/constant/BaseConst';
import { BaseDataManager } from '@base/script/main/BaseDataManager';
import { BundleLoader } from '@base/script/main/BundleLoader';
import { BaseLangBundleDir } from '@base/script/types/BaseType';
import { XEvent, XEvent1 } from '@base/script/utils/XEvent';


const { ccclass } = _decorator;

/**
 * 自動轉面板
 */
@ccclass('AutoPage')
export class AutoPage extends Component {

    /**開啟自動面板 */
    public static open: XEvent = new XEvent();
    /**關閉自動面板 */
    public static close: XEvent = new XEvent();
    /**次數設定 */
    public static setup: XEvent1<number[]> = new XEvent1();
    /**次數選擇 */
    public static choose: XEvent1<number> = new XEvent1();

    private container: Node;

    /**自動次數選項 */
    private options: AutoOption[] = [];
    private optionValues: number[] = [];

    /**
     * 
     */
    onLoad() {
        BundleLoader.onLoaded(BaseConst.BUNDLE_BASE_CURRENCY, `${BaseDataManager.getInstance().urlParam.lang}/${BaseLangBundleDir.ui3_0}`, (LngRes: any) => {
            this.container.getChildByPath('Title').getComponent(Sprite).spriteFrame = LngRes['auto_title'];

            let button;
            button = this.container.getChildByPath('Layout1/Btn_Always').getComponent(Button);
            button.normalSprite = LngRes['btn_auto_00'];
            button.pressedSprite = LngRes['btn_auto_00_h'];
            button.hoverSprite = LngRes['btn_auto_00'];
            button.disabledSprite = LngRes['btn_auto_00_h'];

            button = this.container.getChildByPath('Layout1/Btn_Tilebonus').getComponent(Button);
            button.normalSprite = LngRes['btn_auto_01'];
            button.pressedSprite = LngRes['btn_auto_01_h'];
            button.hoverSprite = LngRes['btn_auto_01'];
            button.disabledSprite = LngRes['btn_auto_01_h'];
        });

        this.container = this.node.getChildByPath('Container');

        //自動(關閉)
        this.container.getChildByPath('Btn_Close').on(Button.EventType.CLICK, () => {
            AudioManager.getInstance().play(AudioKey.BtnClick);
            this.onClose();
        }, this);
        //自動(底板上)
        this.container.getChildByPath('Block').on(Button.EventType.CLICK, () => {
            this.onClose();
        }, this);
        //自動(底板下)
        this.container.getChildByPath('Block2').on(Button.EventType.CLICK, () => {
            this.onClose();
        }, this);

        this.container.getChildByPath('Layout1/Btn_Tilebonus').on(Button.EventType.CLICK, () => {
            AutoPage.choose.emit(2);
            this.onClose();

        }, this);
        this.container.getChildByPath('Layout1/Btn_Always').on(Button.EventType.CLICK, () => {
            AutoPage.choose.emit(1);
            this.onClose();
        }, this);

        AutoPage.open.on(this.onOpen, this);

        //預設次數
        this.optionValues = BaseConst.AUTO_OPTIONS;
        //次數設定
        AutoPage.setup.on((options: number[]) => {
            this.optionValues = options;
            this.options.forEach((option, idx) => {
                option.setValue(this.optionValues[idx]);
            });
        }, this);

        //設定次數元件
        let idx = 0;
        let optionNode = this.container.getChildByPath(`Layout0/Options_${idx}`);
        while (optionNode) {
            let option = optionNode.getComponent(AutoOption);
            option.setValue(this.optionValues[idx]);
            this.options.push(option);
            optionNode = this.container.getChildByPath(`Layout0/Options_${++idx}`);
        }

        AutoOption.select.on((value: number) => {
            AutoPage.choose.emit(value);
            this.onClose();
        }, this);

        this.node.active = false;
    }

    private onOpen(): void {
        this.node.active = true;
    }

    private onClose(): void {
        this.node.active = false;
        AutoPage.close.emit();
    }
}