
// /**
//  * Window事件管理
//  */
// export class WindowEventManager {
//     private static instance: WindowEventManager;

//     private eventMap: Map<string, (data) => void> = new Map();

//     public static getInstance(): WindowEventManager {
//         if (!WindowEventManager.instance) {
//             WindowEventManager.instance = new WindowEventManager();
//         }
//         return WindowEventManager.instance;
//     }

//     public constructor() {
//         window.addEventListener('message', this.webViewMessageHandler.bind(this));
//     }

//     public registerEventHandler(eventType: string, callback: Function) {
//         this.eventMap[eventType] = callback;
//     }

//     /**
//      * WebView資料處理
//      * @param e 
//      */
//     private webViewMessageHandler(e): void {
//         let json;
//         try {
//             json = JSON.parse(e.data);
//         }
//         catch {
//             //無法解析json
//             return;
//         }

//         //非json資料不處理
//         if (!json) {
//             return;
//         }

//         //未註冊處理函示
//         if (!this.eventMap[json.type]) {
//             return;
//         }

//         let callback = this.eventMap[json.type];
//         callback(json);
//     }

// }