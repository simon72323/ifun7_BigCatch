import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

/**
 * 層級管理器
 */
@ccclass('LayerManager')
export class LayerManager extends Component {

    @property({ type: Node })
    public layers: Node[] = [];

    private static instance: LayerManager;
    public static getInstance(): LayerManager {
        if (!LayerManager.instance) {
            LayerManager.instance = new LayerManager();
        }
        return LayerManager.instance;
    }

    onLoad() {
        LayerManager.instance = this;
    }


    public getLayer(layer: number): Node {
        return this.layers[layer];
    }

    public addChildToLayer(col: number, node: Node, layer: number) {
        this.layers[layer].getChildByName("Reel" + col).addChild(node);
    }

    public removeChildFromLayer(node: Node, layer: number) {
        node.removeFromParent();
    }
}

