import { BaseEvent } from "../main/BaseEvent";
import { XEvent, XEvent1, XEvent2, XEvent3, XEvent4, XEvent5 } from "./XEvent";

/**
 * 事件管理工具類
 */
export class EventManager {

    /**
     * 清除所有 BaseEvent 的事件監聽
     */
    public static clearAllBaseEvents(): void {
        BaseEvent.clearAll();
    }

    /**
     * 清除特定對象的所有 BaseEvent 監聽
     * @param target 要清除的對象
     */
    public static clearBaseEventsForTarget(target: any): void {
        BaseEvent.clearAllForTarget(target);
    }

    /**
     * 清除多個事件的所有監聽器
     * @param events 要清除的事件列表
     */
    public static clearEvents(...events: (XEvent | XEvent1<any> | XEvent2<any, any> | XEvent3<any, any, any> | XEvent4<any, any, any, any> | XEvent5<any, any, any, any, any>)[]): void {
        events.forEach(event => {
            if (event && typeof event.clear === 'function') {
                event.clear();
            }
        });
    }

    /**
     * 清除多個事件的特定對象監聽
     * @param target 要清除的對象
     * @param events 要清除的事件列表
     */
    public static clearEventsForTarget(target: any, ...events: (XEvent | XEvent1<any> | XEvent2<any, any> | XEvent3<any, any, any> | XEvent4<any, any, any, any> | XEvent5<any, any, any, any, any>)[]): void {
        events.forEach(event => {
            if (event && typeof event.off === 'function') {
                event.off(target);
            }
        });
    }

    /**
     * 批量清除組件事件
     * @param componentEvents 組件事件對象
     */
    public static clearComponentEvents(componentEvents: { [key: string]: XEvent | XEvent1<any> | XEvent2<any, any> | XEvent3<any, any, any> | XEvent4<any, any, any, any> | XEvent5<any, any, any, any, any> }): void {
        Object.values(componentEvents).forEach(event => {
            if (event && typeof event.clear === 'function') {
                event.clear();
            }
        });
    }

    /**
     * 批量清除組件事件的特定對象監聽
     * @param target 要清除的對象
     * @param componentEvents 組件事件對象
     */
    public static clearComponentEventsForTarget(target: any, componentEvents: { [key: string]: XEvent | XEvent1<any> | XEvent2<any, any> | XEvent3<any, any, any> | XEvent4<any, any, any, any> | XEvent5<any, any, any, any, any> }): void {
        Object.values(componentEvents).forEach(event => {
            if (event && typeof event.off === 'function') {
                event.off(target);
            }
        });
    }
}
