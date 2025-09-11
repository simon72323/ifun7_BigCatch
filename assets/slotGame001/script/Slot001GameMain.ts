import { _decorator, Component, Node } from 'cc';
import { getNetworkManager } from '../common/network/NetworkManager';
const { ccclass, property } = _decorator;

@ccclass('Slot001GameMain')
export class Slot001GameMain extends Component {

    onLoad() {

    }

    start() {
        getNetworkManager().init();//初始化網絡管理器
    }

    update(deltaTime: number) {

    }
}


