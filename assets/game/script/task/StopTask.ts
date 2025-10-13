
import { SkipUI } from '@game/components/SkipUI/SkipUI';

import { SettingsController } from '@common/components/settingsController/SettingsController';
import { SlotMachine } from '@common/components/slotMachine/SlotMachine';
import { DataManager } from '@common/script/data/DataManager';
import { BaseEvent } from '@common/script/event/BaseEvent';
import { GameTask } from '@common/script/tasks/GameTask';


/**
 * 老虎機停輪
 */
export class StopTask extends GameTask {

    protected name: string = 'StopTask';

    /**盤面停止符號(二維陣列) */
    public slotPattern: number[][];
    /**輪帶索引 */
    // public rngList: number[];

    /**中線資料 */
    // public winLineData: IWinLineData[];
    /**scatter獲得資料 */
    // public winScatterData: IWinScatterData;

    /**是否中scatter免費遊戲 */
    // public isScatterWin: boolean = false;

    /**是否為最後一盤 */
    // public isLastPlane: boolean = false;


    execute(): void {

        DataManager.getInstance().hasSkip = false;

        //預先設定此盤面是否中獎, 讓瞇牌結束可以決定要播什麼動作
        // BSRoleUI.scatterWin.emit(this.isScatterWin);

        //設定老虎機盤面停止符號
        let slotParser = DataManager.getInstance().slotData.slotParser;
        slotParser.slotPattern = this.slotPattern;
        console.log('發送盤面結果', slotParser);
        SlotMachine.setSlotParser.emit(slotParser);

        //老虎機停止
        SlotMachine.stop.emit(() => {
            this.checkFinish();
        });

        //急停
        BaseEvent.clickSkip.once(this.onSkip, this);
        SkipUI.show.emit();
    }

    /**
     * 檢查是否完成
     */
    private checkFinish(): void {

        //公版規定, 停盤後Spin按鈕禁用
        SettingsController.setEnabled.emit(false);

        BaseEvent.clickSkip.off(this);
        SkipUI.hide.emit();

        this.finish();
    }

    /**
     * 跳過
     */
    private onSkip(): void {
        DataManager.getInstance().hasSkip = true;
        SkipUI.hide.emit();
        BaseEvent.clickSkip.off(this);
        SlotMachine.skip.emit();

    }

    update(deltaTime: number): void {
        // throw new Error('Method not implemented.');
    }
}