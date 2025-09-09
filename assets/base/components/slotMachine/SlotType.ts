import { _decorator, CCFloat, Prefab, RealCurve } from "cc";
import { BaseDataManager } from "../../script/main/BaseDataManager";
const { ccclass, property } = _decorator;
/**
 * 軸參數
 */
export class SlotReelConfig {
    /**Symbol */
    symbolPrefab: Prefab;
    /**啟動曲線 */
    beginCurve: RealCurve;
    /**結尾曲線 */
    endCurve: RealCurve;
    /**畫面列數 */
    viewRow: number = 3;
    /**保留列數 */
    keepRow: number = 2;
    /**方向 */
    direction: number = 1;
    /**速度參數 */
    speedConfigList: SpeedConfig[];

    public getSpeedConfig(): SpeedConfig {
        let turboMode = BaseDataManager.getInstance().getTurboMode();
        return this.speedConfigList[turboMode];
    }
}

/**
 * 速度參數
 */
@ccclass('SpeedConfig')
export class SpeedConfig {
    /**軸間隔秒數 */
    @property({ type: CCFloat, tooltip: "軸間隔秒數" })
    reelInterval: number = 0.1;
    /**啟動秒數 */
    @property({ type: CCFloat, tooltip: "啟動曲線秒數" })
    beginCurveTime: number = 0.5;
    /**循環秒數 */
    @property({ type: CCFloat, tooltip: "循環曲線秒數" })
    loopCurveTime: number = 0.05;
    /**結尾秒數 */
    @property({ type: CCFloat, tooltip: "結尾曲線秒數" })
    endCurveTime: number = 0.1;
    /**至少滾動N秒 */
    @property({ type: CCFloat, tooltip: "至少滾動N秒" })
    spinTime: number = 1;
    /**掉落秒數 */
    @property({ type: CCFloat, tooltip: "掉落秒數" })
    dropTime: number = 0.1;
    /**掉落秒數 */
    @property({ type: CCFloat, tooltip: "瞇牌秒數" })
    slowMotionTime: number = 3;
}

export enum SymbolState {
    Normal = 0,
    Blur = 1
}