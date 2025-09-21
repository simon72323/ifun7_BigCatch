import { AsyncDelegate, _decorator } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('HttpRequestUtils')
export class HttpRequestUtils {
    /** 錯誤事件 */
    public onErrorDelegate: AsyncDelegate<(errorCode: number) => void>;

    /** XMLHttpRequest */
    protected xhr: XMLHttpRequest;

    constructor() {
        this.onErrorDelegate = new AsyncDelegate();

        this.xhr = new XMLHttpRequest();
        this.xhr.responseType = 'json';
        this.xhr.timeout = 4 * 60 * 1000;
    }

    /**
     * 發送請求
     * @param data 請求資料
     * @param callback 回傳回應
     * @returns 
     */
    public sendRequest(data: IPayload, callback: Function): Promise<void> {
        return new Promise((resolve, reject) => {
            // 開始連線(請求方法和URL)
            this.xhr.open(data.method, data.url);

            // 監聽請求完成事件
            this.xhr.onload = () => {
                if (this.xhr.status === 404) {
                    reject('404');
                    this.onErrorDelegate.dispatch(-1);
                } else if (this.xhr.status >= 200 && this.xhr.status < 300) {
                    // 獲取回應
                    let response: any = this.xhr.response;
                    if (response && response.data) {
                        callback(response);
                        resolve();
                    } else {
                        reject('INVALID_RESPONSE');
                        this.onErrorDelegate.dispatch(-1);
                    }
                } else {
                    reject(`HTTP_ERROR_${this.xhr.status}`);
                    this.onErrorDelegate.dispatch(this.xhr.status);
                }
            };

            // 監聽請求錯誤事件
            this.xhr.onerror = () => {
                reject('NETWORK_ERROR');
                this.onErrorDelegate.dispatch(-1);
            };

            // 監聽超時事件
            this.xhr.ontimeout = () => {
                reject('TIMEOUT');
                this.onErrorDelegate.dispatch(-2);
            };

            // 發送請求
            this.xhr.send(data.content);
        });
    }
}

export interface IPayload {
    url: string;
    method: HTTP_METHODS;
    content: string;
}

export enum HTTP_METHODS {
    POST = 'POST',
    GET = 'GET'
}