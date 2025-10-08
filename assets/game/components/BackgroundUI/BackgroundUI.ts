import { _decorator, Component, Node } from 'cc';

import { BaseEvent } from '@common/script/event/BaseEvent';
import { ModuleID } from '@common/script/types/BaseType';
const { ccclass } = _decorator;

/**
 * 背景UI
 */
@ccclass('BackgroundUI')
export class BackgroundUI extends Component {

    private fg_bkg: Node;
    private ng_bkg: Node;

    onLoad() {
        this.ng_bkg = this.node.getChildByName('ng_bkg_ani');
        this.fg_bkg = this.node.getChildByName('fg_bkg_ani');

        BaseEvent.changeScene.on(this.onChangeScene, this);

        this.onChangeScene(ModuleID.BS);
    }

    /**
     * 切換場景
     * @param id 
     */
    private onChangeScene(id: ModuleID) {
        this.ng_bkg.active = id === ModuleID.BS;
        this.fg_bkg.active = id === ModuleID.FG;
    }
}

