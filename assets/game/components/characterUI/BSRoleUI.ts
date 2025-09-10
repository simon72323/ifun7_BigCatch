import { _decorator, Component, sp } from 'cc';
import { BaseEvent } from '@/base/script/main/BaseEvent';
import { ModuleID } from '@/base/script/types/BaseType';
import { XEvent, XEvent1 } from '@/base/script/utils/XEvent';
import { XUtils } from '@/base/script/utils/XUtils';
import { SlotMachine2 } from '../slotMachine2/base/slotMachine2/SlotMachine2';
const { ccclass, property } = _decorator;

/**
 * BS女孩
 */
@ccclass('BSRoleUI')
export class BSRoleUI extends Component {


    /**待機 */
    public static idle: XEvent = new XEvent();

    /**播放開始 */
    public static begin: XEvent1<number> = new XEvent1();

    /**播放結束 */
    public static back: XEvent1<() => void> = new XEvent1();

    public static scatterWin: XEvent1<boolean> = new XEvent1();
    /**外部設定此盤面是否scatter中獎, 決定角色瞇牌後動作 */
    private isScatterWin: boolean = false;

    private spine: sp.Skeleton = null;

    private multiplierList: number[] = [2, 16, 128, 512];
    private prefixList: string[] = ["a", "b", "c", "d"];
    private curPrefix: string = "";
    private curMultiplier: number = 1;


    onLoad() {

        this.spine = this.node.getChildByName("ng_common_character_ani").getComponent(sp.Skeleton);

        BaseEvent.changeScene.on(this.onChangeScene, this);

        BSRoleUI.idle.on(this.onIdle, this);
        BSRoleUI.begin.on(this.onBegin, this);
        BSRoleUI.back.on(this.onBack, this);
        BSRoleUI.scatterWin.on(this.onScatterWin, this);
        
        this.onIdle();

        this.onChangeScene(ModuleID.BS);

        SlotMachine2.startMi.on(this.onStartMi, this);
        SlotMachine2.stopMi.on(this.onStopMi, this);
    }

    /**
     * 設定散點中獎狀態
     * @param value 
     */
    private onScatterWin(value: boolean): void {
        this.isScatterWin = value;
    }

    /**
     * 切換場景動畫
     * @param id 
     */
    private onChangeScene(id: ModuleID) {
        this.node.active = id === ModuleID.BS;
    }

    /**
     * 待機
     */
    private onIdle(): void {
        XUtils.ClearSpine(this.spine);
        this.spine.setCompleteListener(() => {
            this.onIdle();
        })
        if (Math.random() <= 0.1) {
            this.spine.setAnimation(0, GirlAni.idel_loop_b, false);
        }
        else {
            this.spine.setAnimation(0, GirlAni.idel_loop_a, false);
        }
    }

    /**
     * 播放開始
     * @param multiplier 
     */
    private onBegin(multiplier: number): void {
        let aniIdx: number = 0;
        this.curMultiplier = multiplier;

        if (this.curMultiplier === 1) {
            return;
        }

        this.multiplierList.forEach((value, idx) => {
            if (multiplier >= value) {
                aniIdx = idx;
            }
        })

        if (this.curPrefix !== this.prefixList[aniIdx]) {
            this.curPrefix = this.prefixList[aniIdx];
            XUtils.ClearSpine(this.spine);
            this.spine.addAnimation(0, GirlAni.ng_x_start.replace("#", this.curPrefix), false);
            this.spine.addAnimation(0, GirlAni.ng_x_loop.replace("#", this.curPrefix), true);
        }
    }


    private onBack(onComplete): void {
        if (this.curMultiplier === 1) {
            onComplete?.();
            return;
        }

        this.spine.setCompleteListener(() => {
            this.spine.setCompleteListener(null);
            this.onIdle();
            onComplete?.();
        });
        XUtils.ClearSpine(this.spine);
        if (this.curMultiplier === 2) {
            this.spine.setAnimation(0, GirlAni.ng_a_end, false);
        }
        else {
            this.spine.setAnimation(0, GirlAni.ng_x_win.replace("#", this.curPrefix), false);
        }
        this.curMultiplier = 1;
        this.curPrefix = "";
    }

    private isMi: boolean = false;
    
    private async onStartMi(): Promise<void> {
        if (this.isMi) {
            return;
        }
        this.isMi = true;
        XUtils.ClearSpine(this.spine);
        this.spine.addAnimation(0, GirlAni.mipie_start, false);
        this.spine.addAnimation(0, GirlAni.mipie_loop, true);
    }

    private onStopMi(): void {
        if (!this.isMi) {
            return;
        }
        this.isMi = false;

        XUtils.ClearSpine(this.spine);
        this.spine.setCompleteListener(() => {
            this.spine.setCompleteListener(null);
            this.onIdle();
        });

        if (this.isScatterWin) {
            this.spine.addAnimation(0, GirlAni.mipie_win, false);
        }
        else {
            this.spine.addAnimation(0, GirlAni.mipie_end, false);
        }
    }
}


enum GirlAni {
    idel_loop_a = "idel_loop_a",
    idel_loop_b = "idel_loop_b",
    mipie_end = "mipie_end",
    mipie_loop = "mipie_loop",
    mipie_start = "mipie_start",
    mipie_to_fg = "mipie_to_fg",
    mipie_win = "mipie_win",
    ng_a_end = "ng_a_end",
    // ng_a_loop = "ng_a_loop",
    // ng_a_start = "ng_a_start",
    // ng_a_win = "ng_a_win",
    // ng_b_loop = "ng_b_loop",
    // ng_b_start = "ng_b_start",
    // ng_b_win = "ng_b_win",
    // ng_c_loop = "ng_c_loop",
    // ng_c_start = "ng_c_start",
    // ng_c_win = "ng_c_win",
    // ng_d_loop = "ng_d_loop",
    // ng_d_start = "ng_d_start",
    // ng_d_win = "ng_d_win",

    ng_x_start = "ng_#_start",
    ng_x_loop = "ng_#_loop",
    ng_x_end = "ng_#_end",
    ng_x_win = "ng_#_win"
}
