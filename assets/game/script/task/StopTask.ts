import { SettingsPage1 } from '@base/components/settingsPage/SettingsPage1';
import { AudioKey } from '@base/script/audio/AudioKey';
import { AudioManager } from '@base/script/audio/AudioManager';
import { DataManager } from '@common/script/data/DataManager';;
import { BaseEvent } from '@base/script/main/BaseEvent';
import { GameTask } from '@base/script/tasks/GameTask';
import { SpinButtonState } from '@base/script/types/BaseType';

import { BSRoleUI } from '@game/components/characterUI/BSRoleUI';
import { SkipUI } from '@game/components/SkipUI/SkipUI';
import { SlotMachine2 } from '@game/components/slotMachine2/base/slotMachine2/SlotMachine2';
import { SlotMachineID } from '@game/script/constant/GameConst';
import { GameData } from '@game/script/main/GameData';

/**
 * 老虎機停輪
 */
export class StopTask extends GameTask {

    protected name: string = 'StopTask';

    /**輪帶索引 */
    public rngList: number[];

    public isScatterWin: boolean = false;

    /**是否為最後一盤 */
    public isLastPlane: boolean = false;


    execute(): void {

        DataManager.getInstance().getData<GameData>().hasSkip = false;

        //預先設定此盤面是否中獎, 讓瞇牌結束可以決定要播什麼動作
        BSRoleUI.scatterWin.emit(this.isScatterWin);

        //單軸停止
        SlotMachine2.stopOnReel.on((id: number, col: number) => {
            if (col == 0) {
                AudioManager.getInstance().playOneShot(AudioKey.ReelStop);
            }

            if (id !== SlotMachineID.BS) {
                return;
            }
        }, this);

        //老虎機停止
        SlotMachine2.stop.emit(SlotMachineID.BS, this.rngList, () => {
            SlotMachine2.stopOnReel.off(this);
            this.checkFinish();
        });

        //急停
        BaseEvent.clickSkip.once(() => {
            this.onSkip();
        }, this);
        SkipUI.show.emit();
    }

    private checkFinish(): void {

        //公版規定, 停盤後Spin按鈕禁用
        SettingsPage1.setSpinState.emit(SpinButtonState.Disabled);

        BaseEvent.clickSkip.off(this);
        SkipUI.hide.emit();

        this.finish();
    }

    private onSkip(): void {
        DataManager.getInstance().getData<GameData>().hasSkip = true;
        SkipUI.hide.emit();
        BaseEvent.clickSkip.off(this);
        SlotMachine2.skip.emit(SlotMachineID.BS);

    }

    update(deltaTime: number): void {
        // throw new Error('Method not implemented.');
    }
}