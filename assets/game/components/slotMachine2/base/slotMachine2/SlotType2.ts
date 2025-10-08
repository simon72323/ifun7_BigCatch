import { _decorator, CCFloat, Node, Prefab, RealCurve } from 'cc';

import { DataManager } from '@common/script/data/DataManager';

/**
 * 圖示狀態
 */
export enum SymbolState2 {
    Normal = 0,
    Blur,
    Ani
}


/**
 * 軸狀態定義
 */
export enum ReelState2 {
    /**待機 */
    IDLE = 0,
    /**啟動 */
    BEGIN,
    /**循環 */
    LOOP,
    /**最後N顆(先校正位置,才不會把替換到畫面中圖示) */
    STOPPING_1,
    /**最後N顆 */
    STOPPING,
    /**結尾 */
    END,
    /**已停止 */
    STOPPED,
    /**戲謔 */
    NUDGE
}

const { ccclass, property } = _decorator;
/**
 * 軸參數
 */
export class SlotReelConfig2 {
    /**Symbol */
    symbolPrefab: Prefab;
    /**啟動曲線 */
    beginCurve: RealCurve;
    /**結尾曲線 */
    endCurve: RealCurve;
    /**結尾曲線 */
    nudgeCurveList: RealCurve[];
    /**方向 */
    direction: number = 1;
    /**速度參數 */
    speedConfigList: SpeedConfig2[];
    /**層級 */
    public layerList: Node[] = [];
    /**層級 */
    // public reelLayerList: Node[] = [];
    /**最大列數 */
    public maxRow: number = 0;

    public getSpeedConfig(): SpeedConfig2 {
        let turboMode = DataManager.getInstance().curTurboMode;
        return this.speedConfigList[turboMode];
    }
}

/**
 * 速度參數
 */
@ccclass('SpeedConfig2')
export class SpeedConfig2 {
    @property({ type: CCFloat, tooltip: '轉動軸間隔秒數' })
    public spinInterval: number = 0.1;

    @property({ type: CCFloat, tooltip: '停止軸間隔秒數' })
    public stopInterval: number = 1;

    @property({ type: CCFloat, tooltip: '啟動曲線秒數' })
    public beginCurveTime: number = 0.5;

    @property({ type: CCFloat, tooltip: '循環曲線秒數' })
    public loopCurveTime: number = 0.05;

    @property({ type: CCFloat, tooltip: '結尾曲線秒數' })
    public endCurveTime: number = 0.1;

    @property({ type: CCFloat, tooltip: '戲謔曲線秒數' })
    public nudgeCurveTime: number = 1;

    @property({ type: CCFloat, tooltip: '至少滾動N秒' })
    public spinTime: number = 1;

    @property({ type: CCFloat, tooltip: '掉落軸間隔秒數' })
    public dropInterval: number = 0.1;

    @property({ type: CCFloat, tooltip: '掉落秒數' })
    public dropTime: number = 0.1;

    @property({ type: CCFloat, tooltip: '瞇牌秒數' })
    public slowMotionTime: number = 3;

    @property({ type: CCFloat, tooltip: '瞇牌循環曲線秒數' })
    public slowMotionLoopCurveTime: number = 0.08;

    @property({ tooltip: '是否瞇全部軸' })
    public miAllReel: boolean = true;
}