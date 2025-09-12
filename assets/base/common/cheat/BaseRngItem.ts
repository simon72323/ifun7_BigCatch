import { _decorator, Component } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BaseRngItem')
export class BaseRngItem extends Component {

    public setRng(moduleID: string, rng: number[]): void {
        //override
    }
}

