import { _decorator, Component } from 'cc';
import { SpinButtonState } from '../../script/types/BaseType';
const { ccclass, property } = _decorator;

/**
 * Spin按鈕基底類別, 定義介面
 */
@ccclass('BaseSpinBtn')
export class BaseSpinBtn extends Component {

    /**
     * 停止自動轉
     */
    public stopAuto(): void {
        //override
    }

    /**
     * 設定自動轉次數
     * @param value 
     */
    public setAutoNum(value: number): void {
        //override
    }

    /**
     * 設定按鈕狀態
     * @param state 
     */
    public setState(state: SpinButtonState): void {
        //override
    }
}