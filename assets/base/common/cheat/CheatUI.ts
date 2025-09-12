import { _decorator, Button, Component, EditBox, EventTouch, instantiate, Label, Node, Prefab, Slider } from 'cc';
import { XEvent, XEvent4, XEvent5 } from '../../script/utils/XEvent';
import { CheatPageRng } from './CheatPageRng';
const { ccclass, property } = _decorator;

/**
 * 共用密技UI
 */
@ccclass('CheatUI')
export class CheatUI extends Component {

    /**是否啟用密技 */
    public static activate: boolean = false;

    /**註冊按鈕(page, group, txt, callback) */
    public static registerButton: XEvent4<string, string, string, () => void> = new XEvent4();
    public static registerSlider: XEvent5<string, string, string, any[], (value: number) => void> = new XEvent5();

    /**關閉 */
    public static hide: XEvent = new XEvent();

    @property({ type: Prefab })
    public rngItem: Prefab = null;

    /**容器 */
    private container: Node;

    /**頁面 */
    private pageMap: Map<string, Node> = new Map();

    /**工具組件 */
    private pageRef: Node;
    private groupRef: Node;
    private btnRef: Node;
    private sliderRef: Node;

    /**頁面容器 */
    private pageNode: Node;

    /**頁籤容器 */
    private tabLayout: Node;

    /**
     * 
     */
    onLoad() {

        if (CheatUI.activate === false) {
            this.node.removeFromParent();
            return;
        }

        this.container = this.node.getChildByName("Container");

        this.pageNode = this.node.getChildByPath("Container/PageNode");

        this.pageRef = this.node.getChildByPath("Ref/PageRef");
        this.pageRef.removeFromParent();
        this.groupRef = this.node.getChildByPath("Ref/GroupRef");
        this.groupRef.removeFromParent();
        this.btnRef = this.node.getChildByPath("Ref/ButtonRef");
        this.btnRef.removeFromParent();
        this.sliderRef = this.node.getChildByPath("Ref/SliderEditorRef");
        this.sliderRef.removeFromParent();

        this.tabLayout = this.node.getChildByPath("Container/Tab/Layout");

        //開啟密技介面
        let openBtn = this.node.getChildByName("OpenButton").getComponent(Button);
        openBtn.node.on(Button.EventType.CLICK, () => {
            this.container.active = !this.container.active;
        })

        //壓黑
        let block = this.node.getChildByPath("Container/Block").addComponent(Button);
        // block.node.on(Button.EventType.CLICK, () => {
        //     this.container.active = false;
        // })

        this.container.active = false;

        CheatUI.registerButton.on(this.registerButton, this);
        CheatUI.registerSlider.on(this.registerSlider, this);
        //處理擺好的頁面
        let firstPage = this.pageNode.children[0].name;
        this.pageNode.children.forEach(pageNode => {
            pageNode.removeFromParent();
            this.pageMap.set(pageNode.name, pageNode);
            this.createTab(pageNode.name);
        })

        this.showPage(firstPage);

        let rngPage = this.pageMap.get("Rng").getComponent(CheatPageRng);
        rngPage.setItemPrefab(this.rngItem);

        CheatUI.hide.on(() => {
            this.container.active = false;
        }, this);
    }

    /**
     * 註冊按鈕
     */
    private registerButton(pageName: string, groupName: string, btnText: string, callback: () => void): void {
        let pageNode = this.getPage(pageName);
        let btnNode = this.createButton(btnText, callback);
        let content = pageNode.getChildByPath("ScrollView/view/content");
        let groupNode = content.getChildByName(groupName);
        if (!groupNode) {
            groupNode = this.createGroup(groupName);
            groupNode.name = groupName;
            pageNode.getChildByPath("ScrollView/view/content").addChild(groupNode);
        }
        groupNode.getChildByPath("ItemLayout").addChild(btnNode);
    }

    /**
     * 取得頁面
     * @param pageName 
     * @returns 
     */
    private getPage(pageName: string): Node {
        let pageNode = this.pageMap.get(pageName);
        if (!pageNode) {
            pageNode = this.createPage(pageName);
        }
        return pageNode;
    }

    /**
     * 建立頁面
     * @param pageName 
     * @returns 
     */
    private createPage(pageName: string): Node {
        let pageNode = this.pageMap.get(pageName);
        if (!pageNode) {
            pageNode = instantiate(this.pageRef);
            pageNode.name = pageName;
            pageNode.active = true;
            this.pageMap.set(pageName, pageNode);
            this.createTab(pageName);
        }
        return pageNode;
    }

    private createTab(pageName: string): Node {
        let pageTab = this.createButton(pageName, () => {
            this.showPage(pageName);
        })
        this.tabLayout.addChild(pageTab);
        return pageTab;
    }

    /**
     * 顯示頁面
     * @param pageName 
     */
    private showPage(pageName: string): void {
        this.pageNode.removeAllChildren();
        let pageNode = this.getPage(pageName);
        this.pageNode.addChild(pageNode);
    }

    /**
     * 建立按鈕
     * @param btnText 
     * @param callback 
     * @returns 
     */
    private createButton(btnText: string, callback: () => void): Node {
        let btnNode = instantiate(this.btnRef);
        btnNode.getComponent(Button).node.getChildByName("Label").getComponent(Label).string = btnText;
        btnNode.on(Button.EventType.CLICK, () => {
            callback();
        })
        return btnNode;
    }

    private createGroup(groupName: string): Node {
        let groupNode = instantiate(this.groupRef);
        groupNode.active = true;
        groupNode.getChildByPath("Title/Label").getComponent(Label).string = groupName;
        return groupNode;
    }

    /*
    * 註冊按鈕
     */
    private registerSlider(pageName: string, groupName: string, sliderText: string, param: any[], callback: () => void): void {
        let range: number[] = [param[0], param[1]];
        let initValue = param[2];
        let pageNode = this.getPage(pageName);
        let sliderNode = this.createSlider(sliderText, range, initValue, callback);
        let content = pageNode.getChildByPath("ScrollView/view/content");
        let groupNode = content.getChildByName(groupName);
        if (!groupNode) {
            groupNode = this.createGroup(groupName);
            groupNode.name = groupName;
            pageNode.getChildByPath("ScrollView/view/content").addChild(groupNode);
        }
        groupNode.getChildByPath("ItemLayout").addChild(sliderNode);
    }


    /**
     * 建立拉霸
     * @param sliderText 
     * @param callback 
     * @returns 
     */
    private createSlider(sliderText: string, range: number[], initValue: number, callback: (value: number) => void): Node {
        let sliderNode = instantiate(this.sliderRef);
        sliderNode.getChildByName("Title").getComponent(Label).string = sliderText;

        let slider = sliderNode.getChildByName("Slider").getComponent(Slider);
        slider.node.on(Node.EventType.TOUCH_START, (e: EventTouch) => {
            e.propagationStopped = true;
        }, this)
        slider.node.on(Node.EventType.TOUCH_MOVE, (e: EventTouch) => {
            e.propagationStopped = true;
        }, this)
        slider.node.on(Node.EventType.TOUCH_END, (e: EventTouch) => {
            e.propagationStopped = true;
        }, this)
        slider.node.on('slide', (slider: Slider) => {
            let result = range[0] + slider.progress * (range[1] - range[0]);
            editBox.string = result.toFixed(2);
            callback(result);
        })


        let editBox = sliderNode.getChildByName("EditBox").getComponent(EditBox);
        editBox.node.on(EditBox.EventType.EDITING_DID_ENDED, (editBox: EditBox) => {
            let value = parseFloat(editBox.string);
            if (isNaN(value) === false) {
                slider.progress = value;
                editBox.string = value.toFixed(2);
                callback(value);
            }
        })

        slider.progress = (initValue - range[0]) / (range[1] - range[0]);
        editBox.string = initValue.toString();

        return sliderNode;
    }
}

