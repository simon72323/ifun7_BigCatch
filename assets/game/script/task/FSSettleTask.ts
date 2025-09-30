import { AudioKey } from '@base/script/audio/AudioKey';
import { AudioManager } from '@common/script/manager/AudioManager';
import { DataManager } from '@common/script/data/DataManager';;
import { BaseEvent } from '@common/script/event/BaseEvent';
import { GameTask } from '@base/script/tasks/GameTask';
import { ModuleID } from '@base/script/types/BaseType';

import { FSRoleUI } from '@game/components/characterUI/FSRoleUI';
import { RevolverUI } from '@game/components/RevolverUI/RevolverUI';
import { FSSettleUI } from '@game/components/SettleUI/FSSettleUI';
import { GameConst } from '@game/script/constant/GameConst';

/**
 * FS總結算
 */
export class FSSettleTask extends GameTask {

    protected name: string = 'FSSettleTask';

    /**目前累計獲得金額 */
    public win: number;

    execute(): void {

        FSRoleUI.final.emit(() => {
            AudioManager.getInstance().stop(AudioKey.FsMusic);

            FSSettleUI.show.emit(this.win * DataManager.getInstance().bet.getCurRate(),
                //轉場全遮蔽
                () => {
                    BaseEvent.changeScene.emit(ModuleID.BS);
                    RevolverUI.reset.emit(DataManager.getInstance().curModuleID, GameConst.multiplierList[0]);
                },
                //演示完畢
                () => {
                    this.finish();
                });
        });
    }


    update(deltaTime: number): void {
        // throw new Error('Method not implemented.');
    }
}