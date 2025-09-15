
import { _decorator, Component, Node } from 'cc';

import { BaseEvent } from '@base/script/main/BaseEvent';
import { OrientationID } from '@base/script/types/BaseType';
const { ccclass, property } = _decorator;

@ccclass('ControllerUI')
export class ControllerUI extends Component {

    onLoad() {
        BaseEvent.changeOrientation.on(this.onChangeOrientation, this);
    }

    /**
     * 切換直橫式
     * @param orientation 
     */
    private onChangeOrientation(orientation: OrientationID) {
        // this.node.active = orientation === OrientationID.Portrait;
    }

    start() {

    }

    update(deltaTime: number) {

    }
}


