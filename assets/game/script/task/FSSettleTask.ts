import { FSSettleUI } from '@game/components/SettleUI/FSSettleUI';

import { DataManager } from '@common/script/data/DataManager';
import { BaseEvent } from '@common/script/event/BaseEvent';
import { AudioKey } from '@common/script/manager/AudioKey';
import { AudioManager } from '@common/script/manager/AudioManager';
import { GameTask } from '@common/script/tasks/GameTask';
import { ModuleID } from '@common/script/types/BaseType';


/**
 * FS總結算
 */
export class FSSettleTask extends GameTask {

    protected name: string = 'FSSettleTask';

    /**目前累計獲得金額 */
    public win: number;

    execute(): void {

        AudioManager.getInstance().stopMusic(AudioKey.FsMusic);

        FSSettleUI.show.emit(this.win * DataManager.getInstance().bet.getLineTotal(),
            //轉場全遮蔽
            () => {
                BaseEvent.changeScene.emit(ModuleID.BS);
            },
            //演示完畢
            () => {
                this.finish();
            });

    }

    update(deltaTime: number): void {
        // throw new Error('Method not implemented.');
    }
}