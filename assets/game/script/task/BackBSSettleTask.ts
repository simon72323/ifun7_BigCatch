import { SettingsController } from 'db://assets/common/components/settingsController/SettingsController';
import { DataManager } from 'db://assets/common/script/data/DataManager';
import { AudioManager } from 'db://assets/common/script/manager/AudioManager';
import { GameTask } from 'db://assets/common/script/tasks/GameTask';

import { FeatureBuyBtn } from 'db://assets/game/components/FeatureBuyUI/FeatureBuyBtn';
import { AudioKey } from 'db://assets/game/script/data/AudioKey';

/**
 * FS返回NG總結算(先BigWin再橫幅)
 */
export class BackBSSettleTask extends GameTask {

    protected name: string = 'BackBSSettleTask';

    /**目前累計獲得金額(右下角Win) */
    public userCredit: number;


    execute(): void {
        AudioManager.getInstance().playMusic(AudioKey.bgmMg);

        //更新玩家餘額
        SettingsController.refreshCredit.emit(this.userCredit);
        DataManager.getInstance().userCredit = this.userCredit;
        FeatureBuyBtn.show.emit();

        //回復盤面
        // SlotMachine.backBSParser.emit(this.backBSParser);
        // SlotMachine.change.emit(SlotMachineID.BS, DataManager.getInstance().gameData.bsLastMap);
        // UIController
        // SettingsPage1.setSpinState.emit(SpinButtonState.Disabled);
        this.finish();
    }

    update(deltaTime: number): void {
        // throw new Error('Method not implemented.');
    }
}