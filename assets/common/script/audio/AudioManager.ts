import { AudioSource, Node, tween, Tween } from 'cc';

import { Logger } from '@common/script/utils/Logger';

/**
 * 遊戲音樂音效管理
 */
export class AudioManager {
    private static instance: AudioManager;
    public static getInstance(): AudioManager {
        if (!AudioManager.instance) {
            AudioManager.instance = new AudioManager();
        }
        return AudioManager.instance;
    }

    /**所有音樂音效檔 */
    private soundMap: Map<string, AudioSource> = new Map();

    /**裝載所有音樂音效的節點 */
    private audioNode: Node;

    /**靜音模式 */
    private isMute: boolean = false;
    /**系統音量 */
    private systemVolume: number = 1;

    /**
     * 設定音樂音效節點
     * @param audioNode 
     */
    public initialize(audioNode: Node): void {
        this.audioNode = audioNode;
    }

    /**
     * 註冊
     * @param key 
     * @param clip 
     */
    public register(key: string, path: string): void {
        let node = this.audioNode.getChildByPath(path);
        if (!node) {
            Logger.error(`AudioManager找不到對應的節點 = ${path}`);
        }
        let source = node.getComponent(AudioSource);
        if (this.soundMap.has(key)) {
            Logger.error(`AudioManager已經有對應的key = ${key}`);
        }
        this.soundMap.set(key, source);
    }

    /**
     * 播放
     * @param key 
     * @param duration 花幾秒音量到1
     */
    public play(key: string, volume: number = 1, duration?: number, callback?: Function): void {
        let source = this.getAudioSource(key);
        if (source) {
            //要先清空動畫, 否則其他正在跑的tween會衝突
            Tween.stopAllByTarget(source);
            if (callback) {
                source.node.once(AudioSource.EventType.ENDED, () => {
                    callback();
                }, source);
            }
            source.play();

            if (duration) {
                source.volume = 0;
                tween(source).to(duration, { volume: volume * this.systemVolume }).start();
            }
            else {
                source.volume = volume * this.systemVolume;
            }
        }
        else {
            Logger.error(`AudioManager找不到對應的key = ${key}`);
        }
    }

    /**
     * 新增一次性播放功能(避免截斷)
     * @param key 
     * @param volume 
     */
    public playOneShot(key: string, volume: number = 1): void {
        let target = this.getAudioSource(key);
        if (target) {
            let source = new AudioSource();
            source.playOneShot(target.clip, volume * this.systemVolume);
        }
        else {
            Logger.error(`AudioManager找不到對應的key = ${key}`);
        }
    }

    /**
     * 停止
     * @param key 
     * @param duration 花幾秒音樂到0
     */
    public stop(key: string, duration?: number): void {
        let source = this.getAudioSource(key);
        if (source) {
            //要先清空動畫, 否則其他正在跑的tween會衝突
            Tween.stopAllByTarget(source);
            //時間停
            if (duration) {
                tween(source)
                    .to(duration, { volume: 0 * this.systemVolume })
                    .call(() => { source.stop(); })
                    .start();
            }
            //直接停
            else {
                source.stop();
            }
        }
    }

    /**
     * 靜音設定
     * @param mute 
     */
    public setMute(mute: boolean): void {
        this.isMute = mute;
        this.systemVolume = mute ? 0 : 1;
        this.soundMap.forEach((value, _key) => {
            value.volume = value.volume * this.systemVolume;
        });
    }

    /**
     * 是否靜音
     * @returns 
     */
    public getIsMute(): boolean {
        return this.isMute;
    }


    /**
     * 是否正在播放
     * @param key 
     * @returns 
     */
    public isPlaying(key: string): boolean {
        let source = this.getAudioSource(key);
        if (source) {
            return source.playing;
        }
        return false;
    }

    /**
     * 編輯音量
     * @param key 
     * @param volume 
     * @param duration 
     */
    public edit(key: string, volume?: number, duration?: number): void {
        let source = this.getAudioSource(key);
        if (source) {
            //要先清空動畫, 否則其他正在跑的tween會衝突
            Tween.stopAllByTarget(source);
            //時間編輯
            if (duration) {
                tween(source)
                    .to(duration, { volume: volume * this.systemVolume })
                    .start();
            }
            //直接編輯
            else {
                source.volume = volume * this.systemVolume;
            }

        }
    }

    /**
     * 取得音效來源
     * @param key 
     * @returns 
     */
    private getAudioSource(key: string): AudioSource {
        let source = this.soundMap.get(key);
        if (source) {
            return source;
        }
        else {
            Logger.error(`AudioManager找不到對應的key = ${key}`);
        }
        return null;
    }
}