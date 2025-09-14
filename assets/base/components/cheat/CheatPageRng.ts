import { _decorator, Button, Component, EditBox, instantiate, Label, Node, Pool, Prefab } from 'cc';

import { BaseRngItem } from '@base/components/cheat/BaseRngItem';
import { BaseDataManager } from '@base/script/main/BaseDataManager';
import { CheatCodeData } from '@base/script/types/BaseType';

const { ccclass } = _decorator;

@ccclass('CheatPageRng')
export class CheatPageRng extends Component {

    private itemPrefab: Prefab = null;

    private itemPool: Pool<Node> = null;

    private moduleID: string = 'BS';

    private content: Node = null;

    private rngList: number[][] = [];

    onLoad() {
        if (!this.itemPrefab) {
            return;
        }
        let editBox = this.node.getChildByName('EditBox').getComponent(EditBox);
        this.content = this.node.getChildByPath('ScrollView/view/content');
        let stateLabel = this.node.getChildByPath('ScrollView/view/content/StateLabel').getComponent(Label);
        stateLabel.node.removeFromParent();
        this.itemPool = new Pool(() => {
            return instantiate(this.itemPrefab);
        }, 3);

        for (let i: number = 0; i < 3; ++i) {
            let toggleBtn = this.node.getChildByPath(`ToggleGroup/Toggle${i}`).getComponent(Button);
            toggleBtn.node.on(Button.EventType.CLICK, (_v: any) => {
                this.selectModule(i);
            });
        }
        this.selectModule(0);

        editBox.node.on(EditBox.EventType.EDITING_DID_ENDED, (_box: EditBox) => {
            while (this.content.children.length > 0) {
                let child = this.content.children[0];
                child.removeFromParent();
                this.itemPool.free(child);
            }

            let rngStringList = editBox.string.split('\n');
            let invalid;
            let len = rngStringList.length;
            this.rngList.length = 0;
            for (let i: number = 0; i < len; ++i) {
                let rng = rngStringList[i].split(',').map((v) => Number(v));
                invalid = rng.some((v) => isNaN(v));
                if (invalid) {
                    stateLabel.string = 'rng 設定不合法!';
                    this.content.addChild(stateLabel.node);
                    return;
                }
                let item = this.itemPool.alloc().getComponent(BaseRngItem);
                item.setRng(this.moduleID, rng);
                this.content.addChild(item.node);
                this.rngList.push(rng);
            }

            let data = new CheatCodeData();
            data.rngList = this.rngList;
            BaseDataManager.getInstance().cheatCodeData = data;
        });
    }

    /**
     * 選擇rng模組
     * @param idx 
     */
    private selectModule(idx: number) {
        for (let i: number = 0; i < 3; ++i) {
            let toggle = this.node.getChildByPath(`ToggleGroup/Toggle${i}`);
            if (i == idx) {
                toggle.getChildByPath('Toggle/Checkmark').active = true;
                this.moduleID = toggle.getChildByName('Label').getComponent(Label).string;
            }
            else {
                toggle.getChildByPath('Toggle/Checkmark').active = false;
            }
        }

        let len = this.rngList.length;
        for (let ri: number = 0; ri < len; ++ri) {
            let item = this.content.children[ri].getComponent(BaseRngItem);
            item.setRng(this.moduleID, this.rngList[ri]);
        }
    }

    public setItemPrefab(prefab) {
        this.itemPrefab = prefab;
    }


}

