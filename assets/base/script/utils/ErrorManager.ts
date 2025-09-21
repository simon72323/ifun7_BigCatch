import { Notice } from '@base/components/notice/Notice';
import { AudioManager } from '@base/script/audio/AudioManager';
// import { SocketManager } from '@base/script/socket/SocketManager';

/**
 * 錯誤處理
 */
export class ErrorManager {
    private static instance: ErrorManager;

    private dead: boolean = false;

    public static getInstance(): ErrorManager {
        if (!ErrorManager.instance) {
            ErrorManager.instance = new ErrorManager();
        }
        return ErrorManager.instance;
    }

    /**
     * 跳錯
     * @param code 
     * @param type 
     */
    public showError(code: ErrorCode) {

        //不重覆跳錯
        if (this.dead) {
            return;
        }
        this.dead = true;

        Notice.showError.emit(code.toString());
        // SocketManager.getInstance().disconnect();
        AudioManager.getInstance().setMute(true);
    }
}

export enum ErrorCode {
    Unknown = 0,
    NetDisconnect = 1,
    LoginError = 2,
    SpinningTImeOut = 3,
    Overflow = 4,
    RngError = 5,
    SetConfigError = 6,
    SetStripError = 7,
    GetResultError = 8,
    GetOptionsResultError = 9,
    CheckResultError = 10,
    JackpotDataError = 11,
    JackpotServerOffline = 12,
    SetStateError = 13,
    HostError = 14,
    GetMedalResultError = 15,
    OutOfDate = 16,
    ErrorTime = 17,
    Timeout = 18
}

export enum ErrorType {
    NOTICE = 0,    //unlock
    WARNING = 1,   //unlock
    ALARM = 2,      //lock
    INSUFFICIENT_BALANCE = 3,
    INSUFFICIENT_BALANCE_DO_NOT_LOCK = 4
}