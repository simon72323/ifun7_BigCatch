import { _decorator, Component, Label } from 'cc';


const { ccclass, property } = _decorator;

/**
 * 轉場UI
 */
@ccclass('TimeUI')
export class TimeUI extends Component {
    private timeInterval: any = null;

    onLoad() {
        this.updateTime();
        // 每秒更新一次时间
        this.timeInterval = setInterval(() => {
            this.updateTime();
        }, 1000);
        document.addEventListener('visibilitychange', this.onVisibilityChange, false);
    }

    updateTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const timeString = `${hours}:${minutes}:${seconds}`;
        this.node.getComponent(Label).string = timeString;
    }

    private onVisibilityChange = (): void => {
        if (!document.hidden) {
            this.updateTime();
        }
    };

    onDestroy() {
        if (this.timeInterval) {
            clearInterval(this.timeInterval);
            this.timeInterval = null;
        }
        document.removeEventListener('visibilitychange', this.onVisibilityChange, false);
    }
}