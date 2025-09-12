import { _decorator, Component } from 'cc';

const { ccclass, property } = _decorator;
@ccclass('BaseGameLoading')
export class BaseGameLoading extends Component {

    public showButton(): void {
        //override
    }
}
