
import { SettingsController } from '@common/components/settingsController/SettingsController';
import { SlotReelMachine } from '@common/components/slotMachine/SlotReelMachine';
import { DataManager } from '@common/script/data/DataManager';
import { AudioKey } from '@common/script/manager/AudioKey';
import { AudioManager } from '@common/script/manager/AudioManager';
import { GameTask } from '@common/script/tasks/GameTask';
import { Utils } from '@common/script/utils/Utils';

/**
 * FS返回NG總結算(先BigWin再橫幅)
 */
export class BackBSSettleTask extends GameTask {

    protected name: string = 'BackBSSettleTask';

    /**目前累計獲得金額(右下角Win) */
    public userCredit: number;

    /**剩餘額度 */
    // public playerCent: number;

    execute(): void {

        // AudioManager.getInstance().stopMusic(AudioKey.FsMusic);
        AudioManager.getInstance().playMusic(AudioKey.BsMusic);

        //更新玩家餘額
        SettingsController.refreshCredit.emit(this.userCredit);
        DataManager.getInstance().userCredit = this.userCredit;

        //回復盤面
        // SlotReelMachine.backBSParser.emit(this.backBSParser);
        // SlotMachine.change.emit(SlotMachineID.BS, DataManager.getInstance().gameData.bsLastMap);
        // UIController
        // SettingsPage1.setSpinState.emit(SpinButtonState.Disabled);

        this.onTaskEnd();
    }

    /**
     * 
     */
    private async onTaskEnd(): Promise<void> {

        // SettingsController.refreshCredit.emit(this.playerCent);
        // SettingsController.refreshWin.emit(this.sumWin * DataManager.getInstance().bet.getLineTotal());

        //橫幅贏分
        // if (this.sumWin > 0) {
        //     let multiple: number = DataManager.getInstance().bet.getWinMultipleByValue(this.sumWin);
        //     BannerUI.showTotalWin.emit(this.sumWin * DataManager.getInstance().bet.getLineTotal(), multiple);
        // }

        //要多等一秒
        // await Utils.delay(1);
        // DataManager.getInstance().setState(s5g.game.proto.ESTATEID.K_FEATURE_SHOWWIN);
        // DataManager.getInstance().setState(s5g.game.proto.ESTATEID.K_FEATURE_WAIT);
        // DataManager.getInstance().setState(s5g.game.proto.ESTATEID.K_FEATURE_CHEKRESULT);
        // DataManager.getInstance().setState(s5g.game.proto.ESTATEID.K_SHOWWIN);
        // DataManager.getInstance().setState(s5g.game.proto.ESTATEID.K_WAIT);
        // DataManager.getInstance().setState(s5g.game.proto.ESTATEID.K_ENDGAME);
        this.finish();
    }

    update(deltaTime: number): void {
        // throw new Error('Method not implemented.');
    }
}