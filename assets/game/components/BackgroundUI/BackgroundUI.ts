import { _decorator, Component, Node } from 'cc';

import { BaseEvent } from '@common/script/event/BaseEvent';
import { ModuleID } from '@common/script/types/BaseType';
const { ccclass } = _decorator;

/**
 * 背景UI
 */
@ccclass('BackgroundUI')
export class BackgroundUI extends Component {

    private bg_fg: Node;
    private bg_mg: Node;

    onLoad() {
        this.bg_mg = this.node.getChildByName('bg_mg');
        this.bg_fg = this.node.getChildByName('bg_fg');

        BaseEvent.changeScene.on(this.onChangeScene, this);

        this.onChangeScene(ModuleID.BS);
    }

    /**
     * 切換場景
     * @param id 
     */
    private onChangeScene(id: ModuleID) {
        this.bg_mg.active = id === ModuleID.BS;
        this.bg_fg.active = id === ModuleID.FG;
    }
}

