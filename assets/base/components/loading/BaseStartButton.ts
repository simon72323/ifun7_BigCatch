import { _decorator, Component } from 'cc';
const { ccclass } = _decorator;

@ccclass('BaseStartButton')
export class BaseStartButton extends Component {
    start() {
    }

    update(_deltaTime: number) {

    }

    public setEnabled(_v: boolean): void {
        //override
    }
}

