import { _decorator, Component, sp } from 'cc';
import { AudioManager } from '@/base/script/audio/AudioManager';
import { XEvent2 } from '@/base/script/utils/XEvent';
import { XUtils } from '@/base/script/utils/XUtils';
import { GameAudioKey } from '../../script/constant/GameConst';
const { ccclass, property } = _decorator;

@ccclass('MultiplierUI')
export class MultiplierUI extends Component {

    public static show: XEvent2<number, () => void> = new XEvent2();

    private multiply_ani: sp.Skeleton;

    onLoad() {
        this.multiply_ani = this.node.getChildByName("multiply_ani").getComponent(sp.Skeleton);

        //倍數演示
        MultiplierUI.show.on((multiplier, onComplete) => {

            AudioManager.getInstance().play(GameAudioKey.combine);


            this.node.active = true;
            XUtils.ClearSpine(this.multiply_ani);
            this.multiply_ani.timeScale = 1.2;
            this.multiply_ani.setCompleteListener(() => {
                this.multiply_ani.setCompleteListener(null);
                this.node.active = false;
                onComplete?.();
            });
            this.multiply_ani.setAnimation(0, MultiplierAni.multiply_xN.replace("#", multiplier.toString()), false);
        }, this);
        this.node.active = false;
    }

    update(deltaTime: number) {

    }
}

enum MultiplierAni {
    multiply_xN = "multiply_x#",
    multiply_x1 = "multiply_x1",
    multiply_x2 = "multiply_x2",
    multiply_x4 = "multiply_x4",
    multiply_x8 = "multiply_x8",
    multiply_x16 = "multiply_x16",
    multiply_x32 = "multiply_x32",
    multiply_x64 = "multiply_x64",
    multiply_x128 = "multiply_x128",
    multiply_x256 = "multiply_x256",
    multiply_x512 = "multiply_x512",
    multiply_x1024 = "multiply_x1024",
}

