
import { SkipUI } from '@game/components/SkipUI/SkipUI';
import { SlotMachine2 } from '@game/components/slotMachine2/base/slotMachine2/SlotMachine2';
import { IWinLineData, IWinScatterData } from '@game/script/data/GameType';

import { DataManager } from '@common/script/data/DataManager';
import { BaseEvent } from '@common/script/event/BaseEvent';
import { GameTask } from '@common/script/tasks/GameTask';

/**
 * 老虎機停輪
 */
export class StopTask extends GameTask {

    protected name: string = 'StopTask';

    /**輪帶索引 */
    // public rngList: number[];
    public winLineData: IWinLineData[];
    public winScatterData: IWinScatterData;

    // public isScatterWin: boolean = false;

    /**是否為最後一盤 */
    public isLastPlane: boolean = false;


    execute(): void {

        DataManager.getInstance().hasSkip = false;

        //預先設定此盤面是否中獎, 讓瞇牌結束可以決定要播什麼動作
        // BSRoleUI.scatterWin.emit(this.isScatterWin);


        //老虎機停止
        SlotMachine2.stop.emit(() => {
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
        // SettingsPage1.setSpinState.emit(SpinButtonState.Disabled);

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
        SlotMachine2.skip.emit();

    }

    update(deltaTime: number): void {
        // throw new Error('Method not implemented.');
    }
}