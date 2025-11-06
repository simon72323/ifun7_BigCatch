import { JsonAsset, resources, _decorator, game, Node, tween, Vec3, UIOpacity, director, Scheduler, Component, Button, sp, Label, Color, EventTarget, find } from 'cc';

import { BaseConfig } from 'db://assets/common/script/data/BaseConfig';
import { RunNumber } from 'db://assets/common/script/types/BaseType';

const { ccclass, property } = _decorator;

export class Utils {
    //================================== 數字相關 =====================================
    /**
     * 數字格式化，添加千分位逗號
     * @param value 要格式化的數字
     * @returns 格式化後的字符串
     */
    public static numberFormat(value: number): string {
        const decimalPoint = BaseConfig.DecimalPlaces;
        const preciseValue = Utils.accMul(value, 1);
        return preciseValue.toLocaleString('en', { minimumFractionDigits: decimalPoint, maximumFractionDigits: decimalPoint });
    }

    /**
     * 數字格式化，添加幣別符號
     * @param value 要格式化的數字
     * @returns 格式化後的字符串
     */
    public static numberFormatCurrency(value: number): string {
        return BaseConfig.CurrencySymbol + ' ' + Utils.numberFormat(value);
    }

    /**
     * 跑分動畫
     * @param time 動畫時間
     * @param nodeLabel 顯示label
     * @param runNum 跑分數據(curValue: 起點值, finalValue: 最終值)
     * @param callback 
     */
    public static runNumber(time: number, nodeLabel: Label, runNum: RunNumber, callback?: () => void) {
        tween(runNum)
            .to(time, { curValue: runNum.finalValue }, {
                onUpdate: () => {
                    nodeLabel.string = Utils.numberFormat(runNum.curValue);
                },
                easing: Utils.noisyEasing
            })
            .call(() => {
                callback?.();
            })
            .start();
    }

    /**
     * 跑分動畫(帶幣別，無return)
     * @param time 動畫時間
     * @param nodeLabel 顯示label
     * @param runNum 跑分數據(curValue: 起點值, finalValue: 最終值)
     */
    public static runNumberCurrency(time: number, nodeLabel: Label, runNum: RunNumber) {
        tween(runNum)
            .to(time, { curValue: runNum.finalValue }, {
                onUpdate: () => {
                    nodeLabel.string = Utils.numberFormatCurrency(runNum.curValue);
                },
                easing: Utils.noisyEasing
            })
            .call(() => {
                nodeLabel.string = Utils.numberFormatCurrency(runNum.curValue);
                // callback?.();
            })
            .start();
    }

    /**
     * 精確數字
     * @param value 要精確的數字
     * @returns 精確的數字
     */
    public static accNumber(value: number): number {
        return Utils.accMul(value, 1);
    }

    /**
     * 精確乘法
     * @param arg1 第一個數
     * @param arg2 第二個數
     * @returns 精確的乘積
     */
    public static accMul(arg1: number, arg2: number): number {
        const arg1Str = `${arg1}`;
        const arg2Str = `${arg2}`;
        let pow = 0;

        const arg1Decimal = arg1Str.split('.')[1];
        const arg2Decimal = arg2Str.split('.')[1];

        pow += arg1Decimal ? arg1Decimal.length : 0;
        pow += arg2Decimal ? arg2Decimal.length : 0;

        const r1 = +arg1Str.replace('.', '');
        const r2 = +arg2Str.replace('.', '');

        return r1 * r2 / Math.pow(10, pow);
    }

    /**
     * 精確除法
     * @param arg1 被除數
     * @param arg2 除數
     * @returns 精確的商
     */
    public static accDiv(arg1: number, arg2: number): number {
        const arg1Str = `${arg1}`;
        const arg2Str = `${arg2}`;

        const t1 = arg1Str.split('.')[1]?.length || 0;
        const t2 = arg2Str.split('.')[1]?.length || 0;

        const r1 = +arg1Str.replace('.', '');
        const r2 = +arg2Str.replace('.', '');

        return Utils.accMul(r1 / r2, +`1e${t2 - t1}`);
    }

    /**
     * 精確加法
     * @param arg1 第一個數
     * @param arg2 第二個數
     * @returns 精確的和
     */
    public static accAdd(arg1: number, arg2: number): number {
        let r1 = 0;
        let r2 = 0;
        let m: number;

        try {
            r1 = arg1.toString().split('.')[1].length;
        } catch {
            // 忽略錯誤
        }

        try {
            r2 = arg2.toString().split('.')[1].length;
        } catch {
            // 忽略錯誤
        }

        m = Math.pow(10, Math.max(r1, r2));
        return (Utils.accMul(arg1, m) + Utils.accMul(arg2, m)) / m;
    }
    //================================== 數字相關 =====================================

    //================= 動畫相關 =================
    /**
     * 淡入
     * @param node 
     * @param time 
     * @param startOpacity 起始透明度
     * @param endOpacity 結束透明度
     * @param callback 
     */
    public static fadeIn(node: Node, time: number, startOpacity: number, endOpacity: number, callback?: () => void) {
        if (node.getComponent(UIOpacity) == null) {
            node.addComponent(UIOpacity);
        }
        node.getComponent(UIOpacity).opacity = startOpacity;
        tween(node.getComponent(UIOpacity))
            .to(time, { opacity: endOpacity })
            .call(() => {
                if (callback) callback();
            })
            .start();
    }

    /**
     * 淡出
     * @param node 
     * @param time 
     * @param startOpacity 起始透明度
     * @param endOpacity 結束透明度
     * @param callback 
     */
    public static fadeOut(node: Node, time: number, startOpacity: number, endOpacity: number, callback?: () => void) {
        if (node.getComponent(UIOpacity) == null) {
            node.addComponent(UIOpacity);
        }
        node.getComponent(UIOpacity).opacity = startOpacity;
        tween(node.getComponent(UIOpacity))
            .to(time, { opacity: endOpacity })
            .call(() => {
                if (callback) callback();
            })
            .start();
    }

    /**
     * 縮放動態
     * @param node 
     * @param time 
     * @param startScale 起始縮放
     * @param endScale 結束縮放
     * @param callback 
     */
    public static tweenScaleTo(node: Node, time: number, startScale: number, endScale: number, callback?: () => void) {
        node.scale = new Vec3(startScale, startScale, 1);
        tween(node)
            .to(time, { scale: new Vec3(endScale, endScale, 1) }, { easing: 'sineOut' })
            .call(() => {
                if (callback) callback();
            })
            .start();
    }
    //================= 動畫相關 =================

    /**
     * 延遲執行
     * @param callback 要執行的回調函數
     * @param delay 延遲秒數
     * @param scope 作用域（this 指向）
     */
    public static scheduleOnce(callback: (dt?: number) => void, delay: number, scope: any) {
        Utils.schedule(callback, scope, 0, 0, delay);
    }

    /**
     * 延遲執行
     * @param callback 要執行的回調函數
     * @param scope 作用域（this 指向）
     * @param interval 間隔秒數
     * @param repeat 重複次數
     * @param delay 延遲秒數
     */
    public static schedule(callback: (dt?: number) => void, scope: any, interval: number, repeat?: number, delay?: number) {
        Scheduler.enableForTarget(scope);
        director.getScheduler().schedule(callback, scope, interval, repeat, delay, false);
    }

    /**
     * 取消延遲執行
     * @param callback 要執行的回調函數
     * @param scope 作用域（this 指向）
     */
    public static unschedule(callback: (dt?: number) => void, scope: any) {
        director.getScheduler().unschedule(callback, scope);
    }

    /**
     * 精確減法
     * @param arg1 被減數
     * @param arg2 減數
     * @returns 精確的差
     */
    public static accSub(arg1: number, arg2: number): number {
        return Utils.accAdd(arg1, -arg2);
    }

    /**
     * 根據中獎線ID獲取路徑位置
     * @param payLineId 中獎線ID (從1開始)
     * @param amount 需要的位置数量
     * @param slotPattern 盤面符號
     * @param payLineData 中獎線路徑配置
     * @returns 路徑位置數組
     */
    public static getLinePathPosition(payLineId: number, amount: number, slotPattern: number[][], payLineData: number[][]): { winPos: number[], winSymbolIDs: number[] } {
        const linePath = payLineData[payLineId];
        let winPos: number[] = [];
        let winSymbolIDs: number[] = [];

        // 從payLineData推導出行數 (假設所有路徑都有相同的行數)
        const rowCount = Math.max(...payLineData.flat()) + 1; // 最大行號 + 1

        // 根據amount限制返回的位置數量
        for (let col = 0; col < linePath.length && col < amount; col++) {
            const row = linePath[col];
            const pos = col * rowCount + row;
            winPos.push(pos);
            winSymbolIDs.push(slotPattern[row][col]);
        }

        return { winPos, winSymbolIDs };
    }

    /**
     * 排除陣列重複資料
     * @param list 
     * @returns 
     */
    public static uniq(list: any[]) {
        return Array.from(new Set(list));
    }

    /**
     * 清除Spine
     * @param obj 
     */
    public static ClearSpine(obj: sp.Skeleton) {
        obj.clearTracks();
        obj.setToSetupPose();
        obj.setCompleteListener(null);
    }

    /**
     * 跑分隨機值
     * @param t 
     * @returns 
     */
    public static noisyEasing(t: number): number {
        // 加一點正向亂數，但不能超過1，也不能比t小
        const noise = Math.random() * 0.01; // 隨機減少最多 0.1
        if (t < 0.9) {
            return t - t * noise;
        }
        else {
            return t;
        }
    }

    /**
     * 延遲
     * @param s 延遲秒數
     * @returns 
     */
    public static async delay(s: number): Promise<void> {
        return new Promise<void>(resolve => {
            Utils.scheduleOnce(() => resolve(), s, this);
        });
    }

    /**
     * 等待下一幀
     * @returns 
     */
    public static async waitNextFrame(): Promise<void> {
        return new Promise<void>(resolve => {
            Utils.scheduleOnce(() => resolve(), 0, this);
        });
    }

    /**
     * 計算角度
     * @param startPos 起始位置
     * @param endPos 結束位置
     * @returns 角度
     */
    public static calculateAngle(startPos: Vec3, endPos: Vec3): number {
        const direction = endPos.clone().subtract(startPos);
        return Math.atan2(direction.y, direction.x) * 180 / Math.PI;
    }

    /**
     * 載入本地貨幣資料
     * @returns 本地貨幣資料
     */
    public static loadCurrency(): Promise<any> {
        return new Promise((resolve, reject) => {
            resources.load('data/currency', JsonAsset, (err, currency) => {
                if (err != null) {
                    console.error(err);
                    reject(err);
                    return;
                }
                resolve(currency.json);
            });
        });
    }

    /**
     * 添加手型懸停事件
     * @param target 目標節點
     */
    public static AddHandHoverEvent(target: Node) {
        target.on(Node.EventType.MOUSE_ENTER, () => { game.canvas.style.cursor = 'pointer'; });
        target.on(Node.EventType.MOUSE_LEAVE, () => { game.canvas.style.cursor = 'default'; });
    }

    //================= 以下待確認 =================

    // private static seed: number = Date.now();
    // /**
    //  * 獲取隨機數
    //  * @param min 最小值
    //  * @param max 最大值
    //  * @returns 隨機數
    //  */
    // private static seededRandom(min: number, max: number): number {
    //     Utils.seed = (Utils.seed * 9301 + 49297) % 233280;
    //     const rnd = Utils.seed / 233280;
    //     return Math.floor(min + rnd * (max - min));
    // }

    // /**
    //  * 合併兩個 JSON 物件
    //  * @param target 目標 JSON 物件
    //  * @param source 源 JSON 物件
    //  * @returns 合併後的 JSON 物件
    //  */
    // public static mergeJsonData(target: any, source: any) {
    //     const result = target ?? {};
    //     if (source == null) return target;

    //     let keys = Object.keys(source);
    //     for (let i in keys) {
    //         let key = keys[i];
    //         target[key] = source[key];
    //     }
    //     return target;
    // }


    // /**
    //  * 將字符串中的 `{0}...{1}` 替換為參數
    //  * @param target 要替換的字符串
    //  * @param args 參數
    //  * @returns 替換後的字符串
    //  */
    // public static formatString(target: string, ...args: string[]): string {
    //     let result: string = target;
    //     for (let i = 0; i < args.length; i++) {
    //         result = result.replace('{' + i + '}', args[i]);
    //     }
    //     return result;
    // }

    // /**
    //  * 將 URL 參數轉換為 JSON
    //  * @returns JSON
    //  */
    // public static parseURLToJson(): any {
    //     let fullURL: string = window.location.href;
    //     if (fullURL == null) return null;

    //     let splitURL = fullURL.split('?');
    //     if (splitURL.length != 2) return null;

    //     let queryString = splitURL[1];
    //     let params = new URLSearchParams(queryString);
    //     let paramsObj: { [key: string]: string } = {};

    //     for (const [key, value] of params.entries()) {
    //         paramsObj[key] = value;
    //     }
    //     return paramsObj;
    // }

    // /**
    //  * 谷歌分析
    //  * @param event 事件
    //  * @param data 數據
    //  * @returns 
    //  */
    // public static GoogleTag(event: string, data: any = null) {
    //     try {
    //         if (gtag == undefined || gtag == null) return;

    //         const eventData = data ?? { 'event_category': 'click' };

    //         // console.log('GoogleTag', event, data);
    //         return gtag('event', event, data);

    //     } catch (e) {
    //         return;
    //     }
    // }

    // /**
    //  * 計算環狀距離
    //  * @param a 
    //  * @param b 
    //  * @param length 
    //  * @returns 
    //  */
    // public static circularDistance(a: number, b: number, length: number): number {
    //     return Math.min(Math.abs(a - b), length - Math.abs(a - b));
    // }

    public static async commonFadeIn(ui: Node, fadeout: boolean = false, color: Color[] = null, colorComponent = null, duration: number = 0.3, eventTarget: EventTarget = null) {
        if (ui == null) return;
        if (eventTarget && eventTarget['running'] === true) return;
        if (this.activeUIEventTarget?.['running'] === true) return;
        let sprite = colorComponent;
        if (sprite == null) sprite = Utils.getColorComponent(ui);
        if (sprite == null) return;

        const refColor = color ?? this.activeUIAlpha;
        let fromColor = fadeout ? refColor[1] : refColor[0];
        let toColor = fadeout ? refColor[0] : refColor[1];

        const targetEventTarget = eventTarget ?? new EventTarget();
        targetEventTarget.removeAll('done');
        targetEventTarget['running'] = true;

        sprite.color = fromColor;
        let alpha = { value: fromColor.a };
        tween(alpha).to(duration, { value: toColor.a }, {
            easing: 'smooth',
            onUpdate: () => { sprite.color = new Color(toColor.r, toColor.g, toColor.b, alpha.value); },
            onComplete: () => { eventTarget.emit('done'); }
        }).start();
        //tween( sprite ).to(0.3, { color: toColor }, { easing: 'smooth' }).start();
        await this.delayEvent(eventTarget);
        targetEventTarget['running'] = false;
        ui.active = !fadeout;
    }

    public static readonly activeUIScale = [new Vec3(0.7, 0.7, 1), new Vec3(1, 1, 1)];
    public static readonly activeUIAlpha = [new Color(255, 255, 255, 0), new Color(255, 255, 255, 255)];
    public static activeUIEventTarget: EventTarget = null;
    public static async commonActiveUITween(ui: Node, active: boolean, colorAlpha: boolean = true, duration: number = 0.3) {
        if (ui == null) return;
        if (this.activeUIEventTarget?.['running'] === true) return;

        let fromScale = active ? this.activeUIScale[0] : this.activeUIScale[1];
        let toScale = active ? this.activeUIScale[1] : this.activeUIScale[0];
        this.activeUIEventTarget = this.activeUIEventTarget ?? new EventTarget();
        this.activeUIEventTarget.removeAll('done');
        this.activeUIEventTarget['running'] = true;
        ui.setScale(fromScale);
        ui.active = true;
        tween(ui).to(duration, { scale: toScale }, {
            easing: 'backOut',
            onComplete: (x) => Utils.activeUIEventTarget.emit('done')
        }).start();

        let sprite = Utils.getColorComponent(ui);
        if (sprite != null) {

            if (colorAlpha === false) {
                let fromColor = active ? this.activeUIAlpha[0] : this.activeUIAlpha[1];
                let toColor = active ? this.activeUIAlpha[1] : this.activeUIAlpha[0];
                sprite.color = fromColor;
                tween(sprite).to(duration, { color: toColor }, { easing: 'smooth' }).start();
            } else {
                // if ( duration >= 0.2 ) duration -= 0.1;
                let fromColor = active ? { value: 0 } : { value: 255 };
                let toColor = active ? { value: 255 } : { value: 0 };
                tween(fromColor).to(duration, toColor, {
                    easing: 'smooth',
                    onUpdate: () => { sprite.color = new Color(255, 255, 255, fromColor.value); }
                }).start();
            }
        }

        await this.delayEvent(this.activeUIEventTarget);
        this.activeUIEventTarget['running'] = false;
        ui.active = active;
    }

    public static getColorComponent(node: Node): any {
        if (node == null) return null;
        const components = node['_components'];
        if (components == null || components.length === 0) return null;
        for (let i in components) {
            const comp = components[i];
            if (comp == null) continue;
            if (comp['color'] == null) continue;
            if (comp['color'] instanceof Color) return comp;
        }

        return null;
    }

    public static async delayEvent(event: EventTarget = null, eventType: string = 'done'): Promise<any> {
        if (event == null) return;
        return await new Promise((resolve) => { event.once(eventType, resolve); });
    }

    /**
     * 預載資料初始化
     * @param initData 
     * @param bindComponent 
     * @returns 
     */
    public static initData(initData: any, bindComponent: any, propertiesKey: string = 'properties') {
        if (initData == null) return;
        if (bindComponent == null) return;
        // if ( bindComponent.node == null ) return;

        let properties = bindComponent[propertiesKey];
        if (properties == null) properties = {};

        for (let i = 0; i < Object.keys(initData).length; i++) {
            const key = Object.keys(initData)[i];
            const property = initData[key];
            const { property: processedProperty, haveInitEvent } = Utils.processProperty(bindComponent, key, property);

            properties[key] = processedProperty;

            if (haveInitEvent != null) haveInitEvent();
        }
    }

    public static processProperty(bindComponent: any, key: string, property: any) {
        let haveInitEvent = null;

        for (let j = 0; j < Object.keys(property).length; j++) {
            const subKey = Object.keys(property)[j];
            const subProperty = property[subKey];

            if (subKey === 'INIT_EVENT') {
                let boundSubProperty = subProperty.bind(bindComponent);
                haveInitEvent = boundSubProperty;
                continue;
            }
            let node: any, path: string;
            if (subProperty == null) continue;

            if (subProperty[DATA_TYPE.SCENE_PATH] != null) {
                path = subProperty[DATA_TYPE.SCENE_PATH];
                if (path == null || typeof (path) !== 'string') continue;

                node = find(path);
                if (node == null) {
                    console.error('Node not found: ' + subProperty[DATA_TYPE.SCENE_PATH], [key, property, path, bindComponent]);
                    console.log('subProperty', subProperty);
                    continue;
                }
            } else {
                path = subProperty[DATA_TYPE.NODE_PATH];
                if (path == null || typeof (path) !== 'string') continue;

                if (path === '') node = bindComponent.node;
                else node = bindComponent.node.getChildByPath(path);

                if (node == null) {
                    console.error('Node not found: ' + subProperty[DATA_TYPE.NODE_PATH]);
                    console.log('subProperty', subProperty);
                    continue;
                }
            }

            const t = subProperty[DATA_TYPE.TYPE] ? subProperty[DATA_TYPE.TYPE] : Node;
            const component = (t == Node) ? node : node.getComponent(t);

            if (component == null) {
                // console.error('Component not found: ' + subProperty[DATE_TYPE.TYPE], path);
                continue;
            }

            let propertiesData = Utils.initPropertyData(component);

            if (subProperty[DATA_TYPE.CLICK_EVENT] != null) {
                node.on(Node.EventType.TOUCH_END, subProperty[DATA_TYPE.CLICK_EVENT], bindComponent);
                Utils.AddHandHoverEvent(node);

                // if (subProperty['buttonSound'] === true) { // 播放共用音效
                //     node.on(Node.EventType.TOUCH_END, () => { SoundManager.PlayButtonSound(); }, bindComponent);
                // }
            }

            propertiesData[DATA_TYPE.NODE] = node;
            propertiesData[DATA_TYPE.COMPONENT] = component;
            propertiesData[DATA_TYPE.TYPE] = t;
            propertiesData[DATA_TYPE.NODE_PATH] = path;
            propertiesData[DATA_TYPE.CLICK_EVENT] = subProperty[DATA_TYPE.CLICK_EVENT];

            const otherData = subProperty;
            delete otherData[DATA_TYPE.NODE];
            delete otherData[DATA_TYPE.COMPONENT];
            delete otherData[DATA_TYPE.TYPE];
            delete otherData[DATA_TYPE.NODE_PATH];
            delete otherData[DATA_TYPE.CLICK_EVENT];
            if (Object.keys(otherData).length > 0) propertiesData = Utils.mergeJsonData(propertiesData, otherData);

            if (!property[key] || !property[key][subKey]) property[subKey] = propertiesData;
            else property[subKey] = Utils.mergeJsonData(property[key][subKey], propertiesData);
        }

        return { property, haveInitEvent };
    }

    public static initPropertyData<T>(component: T) {
        return {
            [DATA_TYPE.NODE]: Node,
            [DATA_TYPE.COMPONENT]: component,
            [DATA_TYPE.TYPE]: null,
            [DATA_TYPE.NODE_PATH]: '',
            [DATA_TYPE.CLICK_EVENT]: Function,

            get node() { return this[DATA_TYPE.NODE]; },
            get component() { return this[DATA_TYPE.COMPONENT]; },
            get type() { return this[DATA_TYPE.TYPE]; },
            get clickEvent() { return this[DATA_TYPE.CLICK_EVENT]; }
        };
    }

    /**
     * 合併兩個 JSON 物件
     */
    public static mergeJsonData(target: any, source: any) {
        const mergedTarget = target ?? {};
        if (source == null) return mergedTarget;

        let keys = Object.keys(source);
        for (let i in keys) {
            let key = keys[i];
            mergedTarget[key] = source[key];
        }
        return mergedTarget;
    }

    /**
     * 共用 tween 數字變化動畫
     * @param label             { Label  }           顯示的 Label
     * @param from              { number }           起始數字
     * @param to                { number }           結束數字
     * @param duration          { float }             動畫時間
     * @param numberStringFunc  { Function }         數字轉換字串函式 (value:number)=>string
     * @param eventTarget       { EventTarget }      指定等待結束事件
     * @returns 
     */
    public static async commonTweenNumber(label: Label, from: number = 0, to: number, duration: number, numberStringFunc?: Function, eventTarget?: EventTarget, onBreak?: Function): Promise<{ tween: any, eventPromise?: Promise<void>, data: { value: number } }> {
        if (label == null) return;

        let data = { value: from };

        const formatFunc = numberStringFunc ?? Utils.numberFormat;
        label.string = formatFunc(from);

        const t = tween(data).to(duration, { value: to }, {
            easing: 'smooth',
            onUpdate: () => {
                label.string = formatFunc(data.value);
                if (eventTarget) eventTarget['value'] = data.value;
                // if ( onBreak != null ) onBreak(t);
            },
            onComplete: () => {
                if (eventTarget == null) return;
                eventTarget.emit('done');
                eventTarget['done'] = true;
            }
        });

        t.start();
        t['isDone'] = get => { return data.value === to; };

        if (eventTarget) {
            const eventPromise = new Promise<void>((resolve) => { eventTarget.once('done', () => resolve()); });
            return { tween: t, eventPromise, data };
        }
        await Utils.delay(duration * 1000);
        return { tween: t, data };
    }
}

export enum DATA_TYPE {
    NODE = 0, // object node
    COMPONENT = 1, // object component
    TYPE = 2, // object component type
    NODE_PATH = 3, // node path for init object
    CLICK_EVENT = 4, // click event
    SCENE_PATH = 5, // scene path
}

/**
* 添加button Click事件監聽器
* @param target 目標(掛腳本的節點)
* @param component 組件名稱
* @param button 按鈕
* @param handler 處理器名稱
* @param eventData 事件數據(可選)
*/
export function addBtnClickEvent(target: Node, component: string, button: Button, handler: string, eventData?: string) {
    const eventHandler = new Component.EventHandler();
    eventHandler.target = target;
    eventHandler.component = component;
    eventHandler.handler = handler;
    if (eventData) eventHandler.customEventData = eventData;
    button.clickEvents.push(eventHandler);
}

// /**
// * 添加toggle事件監聽器（包含check和uncheck）
// * @param target 目標(掛腳本的節點)
// * @param component 組件名稱
// * @param toggle 切換按鈕
// * @param handler 處理器名稱
// * @param eventData 事件數據(可選)
// */
// export function addToggleClickEvent(target: Node, component: string, toggle: Toggle, handler: string, eventData?: string) {
//     const eventHandler = new Component.EventHandler();
//     eventHandler.target = target;
//     eventHandler.component = component;
//     eventHandler.handler = handler;
//     if (eventData) eventHandler.customEventData = eventData;
//     toggle.checkEvents.push(eventHandler);
// }
