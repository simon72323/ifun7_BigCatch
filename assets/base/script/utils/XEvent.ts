export interface XEventCallback {
    (): any;
}

/**
 * 公司專用 事件
 * 同一個target只能註冊一次事件
 */
export class XEvent {

    private listeners: Map<any, XEventCallback> = new Map();
    private listenersOnce: Map<any, XEventCallback> = new Map();

    public on(callback: XEventCallback, scope: any) {
        this.listeners.set(scope, callback.bind(scope));
    };

    public once(callback: XEventCallback, scope: any) {
        this.listenersOnce.set(scope, callback.bind(scope));
    };

    public off(scope: any) {
        this.listeners.delete(scope);
        this.listenersOnce.delete(scope);
    };

    public emit() {
        //把 listeners Clone 出來，避免事件中 Map 被增減
        let temp: Map<any, XEventCallback> = new Map<any, XEventCallback>(this.listeners);

        temp.forEach((callback) => callback());

        if (this.listenersOnce.size > 0) {
            let tempOnce: Map<any, XEventCallback> = this.listenersOnce;
            this.listenersOnce = new Map<any, XEventCallback>();

            tempOnce.forEach(callback => callback());
        }
    };

    public clear() {
        this.listeners.clear();
        this.listenersOnce.clear();
    }
}

//
export interface XEventCallback1<T1> {
    (val: T1): any;
}
export class XEvent1<T1> {

    private listeners: Map<any, XEventCallback1<T1>> = new Map();
    private listenersOnce: Map<any, XEventCallback1<T1>> = new Map();

    public on(callback: XEventCallback1<T1>, scope: any) {
        this.listeners.set(scope, callback.bind(scope));
    };

    public once(callback: XEventCallback1<T1>, scope: any) {
        this.listenersOnce.set(scope, callback.bind(scope));
    };

    public off(target: any) {
        this.listeners.delete(target);
        this.listenersOnce.delete(target);
    };

    /**
     * 觸發事件
     * @param val1 事件的第一個參數
     */
    public emit(val1: T1) {
        //把 listeners Clone 出來，避免事件中 Map 被增減
        let temp: Map<any, XEventCallback1<T1>> = new Map<any, XEventCallback1<T1>>(this.listeners);

        temp.forEach((callback) => callback(val1));

        if (this.listenersOnce.size > 0) {
            let tempOnce: Map<any, XEventCallback1<T1>> = this.listenersOnce;
            this.listenersOnce = new Map<any, XEventCallback1<T1>>();

            tempOnce.forEach(callback => callback(val1));
        }
    };

    public clear() {
        this.listeners.clear();
        this.listenersOnce.clear();
    }
}

//
export interface XEventCallback2<T1, T2> {
    (val1: T1, val2: T2): any;
}
export class XEvent2<T1, T2> {

    private listeners: Map<any, XEventCallback2<T1, T2>> = new Map();
    private listenersOnce: Map<any, XEventCallback2<T1, T2>> = new Map();

    public on(callback: XEventCallback2<T1, T2>, scope: any) {
        this.listeners.set(scope, callback.bind(scope));
    };

    public once(callback: XEventCallback2<T1, T2>, scope: any) {
        this.listenersOnce.set(scope, callback.bind(scope));
    };

    public off(scope: any) {
        this.listeners.delete(scope);
        this.listenersOnce.delete(scope);
    };

    public emit(val1: T1, val2: T2) {
        //把 listeners Clone 出來，避免事件中 Map 被增減
        let temp: Map<any, XEventCallback2<T1, T2>> = new Map<any, XEventCallback2<T1, T2>>(this.listeners);

        temp.forEach((callback) => callback(val1, val2));

        if (this.listenersOnce.size > 0) {
            let tempOnce: Map<any, XEventCallback2<T1, T2>> = this.listenersOnce;
            this.listenersOnce = new Map<any, XEventCallback2<T1, T2>>();

            tempOnce.forEach(callback => callback(val1, val2));
        }
    };

    public clear() {
        this.listeners.clear();
        this.listenersOnce.clear();
    }
}

//
export interface XEventCallback3<T1, T2, T3> {
    (val1: T1, val2: T2, val3: T3): any;
}
export class XEvent3<T1, T2, T3> {

    private listeners: Map<any, XEventCallback3<T1, T2, T3>> = new Map();
    private listenersOnce: Map<any, XEventCallback3<T1, T2, T3>> = new Map();

    public on(callback: XEventCallback3<T1, T2, T3>, scope: any) {
        this.listeners.set(scope, callback.bind(scope));
    };

    public once(callback: XEventCallback3<T1, T2, T3>, scope: any) {
        this.listenersOnce.set(scope, callback.bind(scope));
    };

    public off(scope: any) {
        this.listeners.delete(scope);
        this.listenersOnce.delete(scope);
    };

    public emit(val1: T1, val2: T2, val3: T3) {
        //把 listeners Clone 出來，避免事件中 Map 被增減
        let temp: Map<any, XEventCallback3<T1, T2, T3>> = new Map<any, XEventCallback3<T1, T2, T3>>(this.listeners);

        temp.forEach((callback) => callback(val1, val2, val3));

        if (this.listenersOnce.size > 0) {
            let tempOnce: Map<any, XEventCallback3<T1, T2, T3>> = this.listenersOnce;
            this.listenersOnce = new Map<any, XEventCallback3<T1, T2, T3>>();

            tempOnce.forEach(callback => callback(val1, val2, val3));
        }
    };

    public clear() {
        this.listeners.clear();
        this.listenersOnce.clear();
    }
}

//
export interface XEventCallback4<T1, T2, T3, T4> {
    (val1: T1, val2: T2, val3: T3, val4: T4): any;
}
export class XEvent4<T1, T2, T3, T4> {

    private listeners: Map<any, XEventCallback4<T1, T2, T3, T4>> = new Map();
    private listenersOnce: Map<any, XEventCallback4<T1, T2, T3, T4>> = new Map();

    public on(callback: XEventCallback4<T1, T2, T3, T4>, scope: any) {
        this.listeners.set(scope, callback.bind(scope));
    };

    public once(callback: XEventCallback4<T1, T2, T3, T4>, scope: any) {
        this.listenersOnce.set(scope, callback.bind(scope));
    };

    public off(scope: any) {
        this.listeners.delete(scope);
        this.listenersOnce.delete(scope);
    };

    public emit(val1: T1, val2: T2, val3: T3, val4: T4) {
        //把 listeners Clone 出來，避免事件中 Map 被增減
        let temp: Map<any, XEventCallback4<T1, T2, T3, T4>> = new Map<any, XEventCallback4<T1, T2, T3, T4>>(this.listeners);

        temp.forEach((callback) => callback(val1, val2, val3, val4));

        if (this.listenersOnce.size > 0) {
            let tempOnce: Map<any, XEventCallback4<T1, T2, T3, T4>> = this.listenersOnce;
            this.listenersOnce = new Map<any, XEventCallback4<T1, T2, T3, T4>>();

            tempOnce.forEach(callback => callback(val1, val2, val3, val4));
        }
    };

    public clear() {
        this.listeners.clear();
        this.listenersOnce.clear();
    }
}


//
export interface XEventCallback5<T1, T2, T3, T4, T5> {
    (val1: T1, val2: T2, val3: T3, val4: T4, val5: T5): any;
}
export class XEvent5<T1, T2, T3, T4, T5> {

    private listeners: Map<any, XEventCallback5<T1, T2, T3, T4, T5>> = new Map();
    private listenersOnce: Map<any, XEventCallback5<T1, T2, T3, T4, T5>> = new Map();

    public on(callback: XEventCallback5<T1, T2, T3, T4, T5>, scope: any) {
        this.listeners.set(scope, callback.bind(scope));
    };

    public once(callback: XEventCallback5<T1, T2, T3, T4, T5>, scope: any) {
        this.listenersOnce.set(scope, callback.bind(scope));
    };

    public off(scope: any) {
        this.listeners.delete(scope);
        this.listenersOnce.delete(scope);
    };

    public emit(val1: T1, val2: T2, val3: T3, val4: T4, val5: T5) {
        //把 listeners Clone 出來，避免事件中 Map 被增減
        let temp: Map<any, XEventCallback5<T1, T2, T3, T4, T5>> = new Map<any, XEventCallback5<T1, T2, T3, T4, T5>>(this.listeners);

        temp.forEach((callback) => callback(val1, val2, val3, val4, val5));

        if (this.listenersOnce.size > 0) {
            let tempOnce: Map<any, XEventCallback5<T1, T2, T3, T4, T5>> = this.listenersOnce;
            this.listenersOnce = new Map<any, XEventCallback5<T1, T2, T3, T4, T5>>();

            tempOnce.forEach(callback => callback(val1, val2, val3, val4, val5));
        }
    };

    public clear() {
        this.listeners.clear();
        this.listenersOnce.clear();
    }
}