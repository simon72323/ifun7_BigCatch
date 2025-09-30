import { SettingsPage1 } from '@base/components/settingsPage/SettingsPage1';
import { AudioKey } from '@base/script/audio/AudioKey';
import { AudioManager } from '@common/script/manager/AudioManager';
import { DataManager } from '@common/script/data/DataManager';;
import { BaseEvent } from '@common/script/event/BaseEvent';
import { GameTask } from '@base/script/tasks/GameTask';
import { BigWinType, SpinButtonState } from '@base/script/types/BaseType';
import { XUtils } from '@base/script/utils/XUtils';

import { BannerUI } from '@game/components/BannerUI/BannerUI';
import { BigWinUI } from '@game/components/BigWinUI/BigWinUI';
import { SlotMachine2 } from '@game/components/slotMachine2/base/slotMachine2/SlotMachine2';
import { SlotMachineID } from '@game/script/constant/GameConst';
import { GameData } from '@game/script/main/GameData';

/**
 * FS返回NG總結算(先BigWin再橫幅)
 */
export class BackBSSettleTask extends GameTask {

    protected name: string = 'BackBSSettleTask';

    /**目前累計獲得金額(右下角Win) */
    public sumWin: number;

    /**剩餘額度 */
    public playerCent: number;

    execute(): void {

        AudioManager.getInstance().stop(AudioKey.FsMusic);
        AudioManager.getInstance().play(AudioKey.BsMusic);

        //回復盤面
        SlotMachine2.change.emit(SlotMachineID.BS, DataManager.getInstance().getData<GameData>().bsLastMap);
        // UIController
        SettingsPage1.setSpinState.emit(SpinButtonState.Disabled);

        //達到BigWin額外演示
        if (DataManager.getInstance().getBigWinTypeByValue(this.sumWin) != BigWinType.non) {
            BigWinUI.complete.once(() => {
                this.onTaskEnd();
            }, this);

            BigWinUI.show.emit(this.sumWin);
        }
        else {
            this.onTaskEnd();
        }
    }

    /**
     * 
     */
    private onTaskEnd(): void {

        BaseEvent.refreshCredit.emit(this.playerCent);
        BaseEvent.refreshWin.emit(this.sumWin * DataManager.getInstance().bet.getCurRate());

        //橫幅贏分
        if (this.sumWin > 0) {
            let multiple: number = DataManager.getInstance().getWinMultipleByValue(this.sumWin);
            BannerUI.showTotalWin.emit(this.sumWin * DataManager.getInstance().bet.getCurRate(), multiple);
        }

        //要多等一秒
        XUtils.scheduleOnce(() => {

            // DataManager.getInstance().setState(s5g.game.proto.ESTATEID.K_FEATURE_SHOWWIN);
            // DataManager.getInstance().setState(s5g.game.proto.ESTATEID.K_FEATURE_WAIT);
            // DataManager.getInstance().setState(s5g.game.proto.ESTATEID.K_FEATURE_CHEKRESULT);
            // DataManager.getInstance().setState(s5g.game.proto.ESTATEID.K_SHOWWIN);
            // DataManager.getInstance().setState(s5g.game.proto.ESTATEID.K_WAIT);
            // DataManager.getInstance().setState(s5g.game.proto.ESTATEID.K_ENDGAME);

            this.finish();
        }, 1, this);
    }

    update(deltaTime: number): void {
        // throw new Error('Method not implemented.');
    }
}