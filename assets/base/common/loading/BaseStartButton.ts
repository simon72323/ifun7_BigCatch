import { _decorator, Component } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BaseStartButton')
export class BaseStartButton extends Component {
    start() {
    }

    update(deltaTime: number) {

    }

    public setEnabled(v: boolean): void {
        //override
    }
}

