import { _decorator, Label, Sprite, SpriteFrame } from 'cc';
import { BaseRngItem } from '@/base/components/cheat/BaseRngItem';
import { BaseDataManager } from '@/base/script/main/BaseDataManager';
import { ModuleID } from '@/base/script/types/BaseType';
const { ccclass, property } = _decorator;

@ccclass('RngItem')
export class RngItem extends BaseRngItem {

    @property({ type: SpriteFrame })
    public spriteFrame: SpriteFrame[] = [];

    start() {

    }

    update(deltaTime: number) {

    }

    public setRng(moduleID: string, rng: number[]): void {
        this.node.getChildByPath("Layout-001/Label").getComponent(Label).string = `rng: ${rng}`;
        let strips = BaseDataManager.getInstance().getStripTableByID(moduleID as ModuleID)._strips;
        for (let col: number = 0; col < 6; ++col) {
            for (let row: number = 0; row < 6; ++row) {
                let idx = col * 6 + row;
                let symbolRng = rng[col] + row - 1;
                let symbolID = strips[col][(symbolRng + strips[col].length) % strips[col].length];
                let sprite = this.node.getChildByPath(`Layout-001/Layout/symbol${idx}/Sprite`).getComponent(Sprite);
                sprite.spriteFrame = this.spriteFrame[symbolID];
            }
        }
    }
}

