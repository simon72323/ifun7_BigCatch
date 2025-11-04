import { _decorator, Component, Node } from 'cc';

import { BaseEvent } from '@common/script/event/BaseEvent';
import { ModuleID } from '@common/script/types/BaseType';
import { Utils } from '@common/script/utils/Utils';
const { ccclass } = _decorator;

/**
 * 背景UI
 */
@ccclass('BackgroundUI')
export class BackgroundUI extends Component {

    private bg_fg: Node;
    // private bg_mg: Node;

    onLoad() {
        // this.bg_mg = this.node.getChildByName('bg_mg');
        this.bg_fg = this.node.getChildByName('bg_fg');

        BaseEvent.changeScene.on(this.onChangeScene, this);

        this.onChangeScene(ModuleID.BS);
    }

    /**
     * 切換場景
     * @param id 
     */
    private onChangeScene(id: ModuleID) {
        if (id === ModuleID.BS) {
            if (this.bg_fg.active) {
                Utils.fadeOut(this.bg_fg, 0.5, 255, 0, () => {
                    this.bg_fg.active = false;
                });
            }
        } else {
            if (!this.bg_fg.active) {
                this.bg_fg.active = true;
                Utils.fadeIn(this.bg_fg, 0.5, 0, 255);
            }
        }
    }
}

