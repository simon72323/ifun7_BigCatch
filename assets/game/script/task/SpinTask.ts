// import { AudioManager } from '@common/script/manager/AudioManager';

// import { XUtils } from '@base/script/utils/XUtils';

import { BannerUI } from '@game/components/BannerUI/BannerUI';
import { FSRoleUI } from '@game/components/characterUI/FSRoleUI';
import { RevolverUI } from '@game/components/RevolverUI/RevolverUI';
import { SlotMachine2 } from '@game/components/slotMachine2/base/slotMachine2/SlotMachine2';
import { GameAudioKey, GameConst, SlotMachineID } from '@game/script/data/GameConst';
// import { GameData } from '@game/script/data/GameData';
import { IdleTask } from '@game/script/task/IdleTask';

import { DataManager } from '@common/script/data/DataManager';
// import { APIManager } from '@base/script/utils/APIManager';
// import { BaseSpinTask } from '@common/script/tasks/BaseSpinTask';
import { TaskManager } from '@common/script/tasks/TaskManager';

// import { XUtils } from '@common/script/utils/XUtils';

/**
 * 開始轉動
 */
export class SpinTask extends BaseSpinTask {

    protected childExecute(): void {

        XUtils.scheduleOnce(() => {
            let initMultiplier = GameConst.multiplierList[DataManager.getInstance().getData<GameData>().getInitMultiplierIdx()];
            RevolverUI.reset.emit(DataManager.getInstance().curModuleID, initMultiplier);
        }, 0.3, this);

        //還原廣告狀態
        BannerUI.reset.emit();

        //考量到先轉型、後轉型, 所以音效要在spin監聽
        SlotMachine2.spinComplete.once((id) => {
            AudioManager.getInstance().play(GameAudioKey.in);
        }, this);

        if (DataManager.getInstance().isBS()) {
            //先轉型(免費遊戲直接給結果不轉動)
            if (DataManager.getInstance().buyFs === false && APIManager.getInstance().getSpinLate() === false) {
                SlotMachine2.spin.emit();
            }
        }
        else {
            FSRoleUI.reset.emit();
        }
    }

    public childSpinFailed(): void {
        if (DataManager.getInstance().isBS()) {
            TaskManager.getInstance().addTask(new IdleTask());
        }
    }
}