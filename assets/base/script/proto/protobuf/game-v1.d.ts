declare global {
 // DO NOT EDIT! This is a generated file. Edit the JSDoc in src/*.js instead and run 'npm run types'.

/** Namespace s5g. */
export namespace s5g {

    /** Namespace game. */
    namespace game {

        /** Namespace proto. */
        namespace proto {

            /** EMSGID enum. */
            enum EMSGID {
                eLoginCall = 100,
                eLoginRecall = 101,
                eConfigCall = 102,
                eConfigRecall = 103,
                eStripsCall = 104,
                eStripsRecall = 105,
                eResultCall = 106,
                eResultRecall = 107,
                eOptionCall = 108,
                eOptionRecall = 109,
                eCheckCall = 110,
                eCheckRecall = 111,
                eStateCall = 112,
                eStateRecall = 113,
                eSuicideCall = 114,
                eDataCall = 115,
                eDataRecall = 116,
                eCampaignCall = 117,
                eCampaignRecall = 118,
                eCampaignEventCall = 119,
                eCampaignEventRecall = 120,
                eCampaignWinRecall = 122,
                eCentInAsk = 200,
                eCentInReask = 201,
                eJackpotInfo = 202,
                eJackpotNotify = 203,
                eCampaignInfo = 204,
                eCampaignInfoNotify = 205,
                eMemberInfoAsk = 301
            }

            /** ESTATEID enum. */
            enum ESTATEID {
                K_IDLE = 0,
                K_SPIN = 1,
                K_SPINSTOPING = 2,
                K_PRE_SHOWWIN = 3,
                K_SHOWWIN = 4,
                K_WAIT = 5,
                K_FEATURE_TRIGGER = 6,
                K_FEATURE_SHOWSCATTERWIN = 7,
                K_FEATURE_TRANSLATE = 8,
                K_FEATURE_WAIT_START = 9,
                K_FEATURE_SPIN = 10,
                K_FEATURE_SPINSTOPING = 11,
                K_FEATURE_PRE_SHOWWIN = 12,
                K_FEATURE_SHOWWIN = 13,
                K_FEATURE_WAIT = 14,
                K_FEATURE_CHEKRESULT = 15,
                K_FEATURE_RETRIGGER = 16,
                K_FEATURE_SHOW_RETIGGER = 17,
                K_ENDGAME = 18,
                K_FEATURE_PRE_WAIT_START = 19,
                K_FEATURE_CHANGESYB_MENUSHOW = 20,
                K_FEATURE_CHANGESYB_PRESHOWWIN = 21,
                K_FEATURE_CHANGESYB_SHOWWIN = 22,
                K_SHOW_JP = 23,
                K_5LINE_SHOW = 24,
                K_BIGWIN_WAIT = 25,
                K_RESPIN = 26,
                K_EXPAND = 27,
                K_FEATURE_EXPEND = 28,
                K_SHOW_MULT = 29,
                K_DROP = 30,
                K_FEATURE_DROP = 31,
                K_SHOW_UC = 32,
                K_COLLECTSCATTER = 33,
                K_OPENBOX = 34,
                K_CHECK_DROP_STOP = 35,
                K_USER_DEF18 = 36,
                K_USER_DEF19 = 37,
                K_USER_DEF20 = 38,
                K_USER_DEF21 = 39,
                K_USER_DEF22 = 40,
                K_USER_DEF23 = 41,
                K_USER_DEF24 = 42,
                K_USER_DEF25 = 43,
                K_USER_DEF26 = 44,
                K_USER_DEF27 = 45,
                K_USER_DEF28 = 46,
                K_USER_DEF29 = 47,
                K_USER_DEF30 = 48
            }

            /** Properties of a Status. */
            interface IStatus {
            }

            /** Represents a Status. */
            class Status implements IStatus {

                /**
                 * Constructs a new Status.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: s5g.game.proto.IStatus);

                /**
                 * Creates a new Status instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Status instance
                 */
                public static create(properties?: s5g.game.proto.IStatus): s5g.game.proto.Status;

                /**
                 * Encodes the specified Status message. Does not implicitly {@link s5g.game.proto.Status.verify|verify} messages.
                 * @param message Status message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: s5g.game.proto.IStatus, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Status message, length delimited. Does not implicitly {@link s5g.game.proto.Status.verify|verify} messages.
                 * @param message Status message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: s5g.game.proto.IStatus, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Status message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Status
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.Status;

                /**
                 * Decodes a Status message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Status
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.Status;

                /**
                 * Verifies a Status message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a Status message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Status
                 */
                public static fromObject(object: { [k: string]: any }): s5g.game.proto.Status;

                /**
                 * Creates a plain object from a Status message. Also converts values to other types if specified.
                 * @param message Status
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: s5g.game.proto.Status, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Status to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            namespace Status {

                /** Code enum. */
                enum Code {
                    kSuccess = 0,
                    kInvalid = 1,
                    kOffline = 2,
                    kNoEnoughCredit = 3,
                    kHostError = 4,
                    kOutOfDate = 5,
                    kFreeGameEnd = 6,
                    kNoMoreBets = 7,
                    kNotEnoughMinBet = 8
                }
            }

            /** Properties of a Header. */
            interface IHeader {

                /** Header msgid */
                msgid: s5g.game.proto.EMSGID;
            }

            /** Represents a Header. */
            class Header implements IHeader {

                /**
                 * Constructs a new Header.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: s5g.game.proto.IHeader);

                /** Header msgid. */
                public msgid: s5g.game.proto.EMSGID;

                /**
                 * Creates a new Header instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Header instance
                 */
                public static create(properties?: s5g.game.proto.IHeader): s5g.game.proto.Header;

                /**
                 * Encodes the specified Header message. Does not implicitly {@link s5g.game.proto.Header.verify|verify} messages.
                 * @param message Header message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: s5g.game.proto.IHeader, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Header message, length delimited. Does not implicitly {@link s5g.game.proto.Header.verify|verify} messages.
                 * @param message Header message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: s5g.game.proto.IHeader, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Header message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Header
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.Header;

                /**
                 * Decodes a Header message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Header
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.Header;

                /**
                 * Verifies a Header message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a Header message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Header
                 */
                public static fromObject(object: { [k: string]: any }): s5g.game.proto.Header;

                /**
                 * Creates a plain object from a Header message. Also converts values to other types if specified.
                 * @param message Header
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: s5g.game.proto.Header, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Header to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a LoginCall. */
            interface ILoginCall {

                /** LoginCall msgid */
                msgid: s5g.game.proto.EMSGID;

                /** LoginCall member_id */
                member_id: string;

                /** LoginCall password */
                password: string;

                /** LoginCall machine_id */
                machine_id: string;

                /** LoginCall token */
                token?: (string|null);

                /** LoginCall game_id */
                game_id?: (string|null);
            }

            /** Represents a LoginCall. */
            class LoginCall implements ILoginCall {

                /**
                 * Constructs a new LoginCall.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: s5g.game.proto.ILoginCall);

                /** LoginCall msgid. */
                public msgid: s5g.game.proto.EMSGID;

                /** LoginCall member_id. */
                public member_id: string;

                /** LoginCall password. */
                public password: string;

                /** LoginCall machine_id. */
                public machine_id: string;

                /** LoginCall token. */
                public token: string;

                /** LoginCall game_id. */
                public game_id: string;

                /**
                 * Creates a new LoginCall instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns LoginCall instance
                 */
                public static create(properties?: s5g.game.proto.ILoginCall): s5g.game.proto.LoginCall;

                /**
                 * Encodes the specified LoginCall message. Does not implicitly {@link s5g.game.proto.LoginCall.verify|verify} messages.
                 * @param message LoginCall message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: s5g.game.proto.ILoginCall, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified LoginCall message, length delimited. Does not implicitly {@link s5g.game.proto.LoginCall.verify|verify} messages.
                 * @param message LoginCall message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: s5g.game.proto.ILoginCall, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a LoginCall message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns LoginCall
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.LoginCall;

                /**
                 * Decodes a LoginCall message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns LoginCall
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.LoginCall;

                /**
                 * Verifies a LoginCall message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a LoginCall message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns LoginCall
                 */
                public static fromObject(object: { [k: string]: any }): s5g.game.proto.LoginCall;

                /**
                 * Creates a plain object from a LoginCall message. Also converts values to other types if specified.
                 * @param message LoginCall
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: s5g.game.proto.LoginCall, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this LoginCall to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a LoginRecall. */
            interface ILoginRecall {

                /** LoginRecall msgid */
                msgid: s5g.game.proto.EMSGID;

                /** LoginRecall status_code */
                status_code: s5g.game.proto.Status.Code;

                /** LoginRecall token */
                token?: (string|null);

                /** LoginRecall member_id */
                member_id: string;

                /** LoginRecall operator_id */
                operator_id: string;
            }

            /** Represents a LoginRecall. */
            class LoginRecall implements ILoginRecall {

                /**
                 * Constructs a new LoginRecall.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: s5g.game.proto.ILoginRecall);

                /** LoginRecall msgid. */
                public msgid: s5g.game.proto.EMSGID;

                /** LoginRecall status_code. */
                public status_code: s5g.game.proto.Status.Code;

                /** LoginRecall token. */
                public token: string;

                /** LoginRecall member_id. */
                public member_id: string;

                /** LoginRecall operator_id. */
                public operator_id: string;

                /**
                 * Creates a new LoginRecall instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns LoginRecall instance
                 */
                public static create(properties?: s5g.game.proto.ILoginRecall): s5g.game.proto.LoginRecall;

                /**
                 * Encodes the specified LoginRecall message. Does not implicitly {@link s5g.game.proto.LoginRecall.verify|verify} messages.
                 * @param message LoginRecall message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: s5g.game.proto.ILoginRecall, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified LoginRecall message, length delimited. Does not implicitly {@link s5g.game.proto.LoginRecall.verify|verify} messages.
                 * @param message LoginRecall message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: s5g.game.proto.ILoginRecall, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a LoginRecall message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns LoginRecall
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.LoginRecall;

                /**
                 * Decodes a LoginRecall message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns LoginRecall
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.LoginRecall;

                /**
                 * Verifies a LoginRecall message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a LoginRecall message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns LoginRecall
                 */
                public static fromObject(object: { [k: string]: any }): s5g.game.proto.LoginRecall;

                /**
                 * Creates a plain object from a LoginRecall message. Also converts values to other types if specified.
                 * @param message LoginRecall
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: s5g.game.proto.LoginRecall, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this LoginRecall to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a ConfigCall. */
            interface IConfigCall {

                /** ConfigCall msgid */
                msgid: s5g.game.proto.EMSGID;

                /** ConfigCall token */
                token: string;

                /** ConfigCall gameid */
                gameid: string;

                /** ConfigCall clear_power_cycle */
                clear_power_cycle?: (boolean|null);

                /** ConfigCall version */
                version?: (number|null);

                /** ConfigCall game_version */
                game_version?: (number|null);

                /** ConfigCall subgame_id */
                subgame_id?: (number|null);
            }

            /** Represents a ConfigCall. */
            class ConfigCall implements IConfigCall {

                /**
                 * Constructs a new ConfigCall.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: s5g.game.proto.IConfigCall);

                /** ConfigCall msgid. */
                public msgid: s5g.game.proto.EMSGID;

                /** ConfigCall token. */
                public token: string;

                /** ConfigCall gameid. */
                public gameid: string;

                /** ConfigCall clear_power_cycle. */
                public clear_power_cycle: boolean;

                /** ConfigCall version. */
                public version: number;

                /** ConfigCall game_version. */
                public game_version: number;

                /** ConfigCall subgame_id. */
                public subgame_id: number;

                /**
                 * Creates a new ConfigCall instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ConfigCall instance
                 */
                public static create(properties?: s5g.game.proto.IConfigCall): s5g.game.proto.ConfigCall;

                /**
                 * Encodes the specified ConfigCall message. Does not implicitly {@link s5g.game.proto.ConfigCall.verify|verify} messages.
                 * @param message ConfigCall message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: s5g.game.proto.IConfigCall, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ConfigCall message, length delimited. Does not implicitly {@link s5g.game.proto.ConfigCall.verify|verify} messages.
                 * @param message ConfigCall message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: s5g.game.proto.IConfigCall, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a ConfigCall message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns ConfigCall
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.ConfigCall;

                /**
                 * Decodes a ConfigCall message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns ConfigCall
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.ConfigCall;

                /**
                 * Verifies a ConfigCall message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a ConfigCall message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ConfigCall
                 */
                public static fromObject(object: { [k: string]: any }): s5g.game.proto.ConfigCall;

                /**
                 * Creates a plain object from a ConfigCall message. Also converts values to other types if specified.
                 * @param message ConfigCall
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: s5g.game.proto.ConfigCall, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ConfigCall to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a BonusTimesCounter. */
            interface IBonusTimesCounter {

                /** BonusTimesCounter module_id */
                module_id: string;

                /** BonusTimesCounter played_times */
                played_times: number;

                /** BonusTimesCounter total_times */
                total_times: number;
            }

            /** Represents a BonusTimesCounter. */
            class BonusTimesCounter implements IBonusTimesCounter {

                /**
                 * Constructs a new BonusTimesCounter.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: s5g.game.proto.IBonusTimesCounter);

                /** BonusTimesCounter module_id. */
                public module_id: string;

                /** BonusTimesCounter played_times. */
                public played_times: number;

                /** BonusTimesCounter total_times. */
                public total_times: number;

                /**
                 * Creates a new BonusTimesCounter instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns BonusTimesCounter instance
                 */
                public static create(properties?: s5g.game.proto.IBonusTimesCounter): s5g.game.proto.BonusTimesCounter;

                /**
                 * Encodes the specified BonusTimesCounter message. Does not implicitly {@link s5g.game.proto.BonusTimesCounter.verify|verify} messages.
                 * @param message BonusTimesCounter message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: s5g.game.proto.IBonusTimesCounter, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified BonusTimesCounter message, length delimited. Does not implicitly {@link s5g.game.proto.BonusTimesCounter.verify|verify} messages.
                 * @param message BonusTimesCounter message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: s5g.game.proto.IBonusTimesCounter, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a BonusTimesCounter message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns BonusTimesCounter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.BonusTimesCounter;

                /**
                 * Decodes a BonusTimesCounter message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns BonusTimesCounter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.BonusTimesCounter;

                /**
                 * Verifies a BonusTimesCounter message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a BonusTimesCounter message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns BonusTimesCounter
                 */
                public static fromObject(object: { [k: string]: any }): s5g.game.proto.BonusTimesCounter;

                /**
                 * Creates a plain object from a BonusTimesCounter message. Also converts values to other types if specified.
                 * @param message BonusTimesCounter
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: s5g.game.proto.BonusTimesCounter, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this BonusTimesCounter to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a PlayerData. */
            interface IPlayerData {

                /** PlayerData bet_index */
                bet_index: number;

                /** PlayerData line_index */
                line_index: number;

                /** PlayerData rate_index */
                rate_index: number;
            }

            /** Represents a PlayerData. */
            class PlayerData implements IPlayerData {

                /**
                 * Constructs a new PlayerData.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: s5g.game.proto.IPlayerData);

                /** PlayerData bet_index. */
                public bet_index: number;

                /** PlayerData line_index. */
                public line_index: number;

                /** PlayerData rate_index. */
                public rate_index: number;

                /**
                 * Creates a new PlayerData instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns PlayerData instance
                 */
                public static create(properties?: s5g.game.proto.IPlayerData): s5g.game.proto.PlayerData;

                /**
                 * Encodes the specified PlayerData message. Does not implicitly {@link s5g.game.proto.PlayerData.verify|verify} messages.
                 * @param message PlayerData message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: s5g.game.proto.IPlayerData, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified PlayerData message, length delimited. Does not implicitly {@link s5g.game.proto.PlayerData.verify|verify} messages.
                 * @param message PlayerData message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: s5g.game.proto.IPlayerData, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a PlayerData message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns PlayerData
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.PlayerData;

                /**
                 * Decodes a PlayerData message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns PlayerData
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.PlayerData;

                /**
                 * Verifies a PlayerData message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a PlayerData message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns PlayerData
                 */
                public static fromObject(object: { [k: string]: any }): s5g.game.proto.PlayerData;

                /**
                 * Creates a plain object from a PlayerData message. Also converts values to other types if specified.
                 * @param message PlayerData
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: s5g.game.proto.PlayerData, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this PlayerData to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a WinBonus. */
            interface IWinBonus {

                /** WinBonus module_id */
                module_id: string;

                /** WinBonus times */
                times: number;
            }

            /** Represents a WinBonus. */
            class WinBonus implements IWinBonus {

                /**
                 * Constructs a new WinBonus.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: s5g.game.proto.IWinBonus);

                /** WinBonus module_id. */
                public module_id: string;

                /** WinBonus times. */
                public times: number;

                /**
                 * Creates a new WinBonus instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns WinBonus instance
                 */
                public static create(properties?: s5g.game.proto.IWinBonus): s5g.game.proto.WinBonus;

                /**
                 * Encodes the specified WinBonus message. Does not implicitly {@link s5g.game.proto.WinBonus.verify|verify} messages.
                 * @param message WinBonus message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: s5g.game.proto.IWinBonus, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified WinBonus message, length delimited. Does not implicitly {@link s5g.game.proto.WinBonus.verify|verify} messages.
                 * @param message WinBonus message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: s5g.game.proto.IWinBonus, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a WinBonus message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns WinBonus
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.WinBonus;

                /**
                 * Decodes a WinBonus message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns WinBonus
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.WinBonus;

                /**
                 * Verifies a WinBonus message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a WinBonus message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns WinBonus
                 */
                public static fromObject(object: { [k: string]: any }): s5g.game.proto.WinBonus;

                /**
                 * Creates a plain object from a WinBonus message. Also converts values to other types if specified.
                 * @param message WinBonus
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: s5g.game.proto.WinBonus, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this WinBonus to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a ReelStackPay. */
            interface IReelStackPay {

                /** ReelStackPay icon_id */
                icon_id: number;

                /** ReelStackPay pay */
                pay: number;

                /** ReelStackPay reel_index */
                reel_index?: (number[]|null);
            }

            /** Represents a ReelStackPay. */
            class ReelStackPay implements IReelStackPay {

                /**
                 * Constructs a new ReelStackPay.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: s5g.game.proto.IReelStackPay);

                /** ReelStackPay icon_id. */
                public icon_id: number;

                /** ReelStackPay pay. */
                public pay: number;

                /** ReelStackPay reel_index. */
                public reel_index: number[];

                /**
                 * Creates a new ReelStackPay instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ReelStackPay instance
                 */
                public static create(properties?: s5g.game.proto.IReelStackPay): s5g.game.proto.ReelStackPay;

                /**
                 * Encodes the specified ReelStackPay message. Does not implicitly {@link s5g.game.proto.ReelStackPay.verify|verify} messages.
                 * @param message ReelStackPay message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: s5g.game.proto.IReelStackPay, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ReelStackPay message, length delimited. Does not implicitly {@link s5g.game.proto.ReelStackPay.verify|verify} messages.
                 * @param message ReelStackPay message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: s5g.game.proto.IReelStackPay, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a ReelStackPay message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns ReelStackPay
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.ReelStackPay;

                /**
                 * Decodes a ReelStackPay message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns ReelStackPay
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.ReelStackPay;

                /**
                 * Verifies a ReelStackPay message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a ReelStackPay message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ReelStackPay
                 */
                public static fromObject(object: { [k: string]: any }): s5g.game.proto.ReelStackPay;

                /**
                 * Creates a plain object from a ReelStackPay message. Also converts values to other types if specified.
                 * @param message ReelStackPay
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: s5g.game.proto.ReelStackPay, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ReelStackPay to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a Mystery. */
            interface IMystery {

                /** Mystery to_symbol */
                to_symbol: number;

                /** Mystery to_wild_reel */
                to_wild_reel: number;
            }

            /** Represents a Mystery. */
            class Mystery implements IMystery {

                /**
                 * Constructs a new Mystery.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: s5g.game.proto.IMystery);

                /** Mystery to_symbol. */
                public to_symbol: number;

                /** Mystery to_wild_reel. */
                public to_wild_reel: number;

                /**
                 * Creates a new Mystery instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Mystery instance
                 */
                public static create(properties?: s5g.game.proto.IMystery): s5g.game.proto.Mystery;

                /**
                 * Encodes the specified Mystery message. Does not implicitly {@link s5g.game.proto.Mystery.verify|verify} messages.
                 * @param message Mystery message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: s5g.game.proto.IMystery, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Mystery message, length delimited. Does not implicitly {@link s5g.game.proto.Mystery.verify|verify} messages.
                 * @param message Mystery message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: s5g.game.proto.IMystery, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Mystery message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Mystery
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.Mystery;

                /**
                 * Decodes a Mystery message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Mystery
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.Mystery;

                /**
                 * Verifies a Mystery message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a Mystery message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Mystery
                 */
                public static fromObject(object: { [k: string]: any }): s5g.game.proto.Mystery;

                /**
                 * Creates a plain object from a Mystery message. Also converts values to other types if specified.
                 * @param message Mystery
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: s5g.game.proto.Mystery, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Mystery to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a CommonDataInfo. */
            interface ICommonDataInfo {

                /** CommonDataInfo idata1 */
                idata1?: (number|null);

                /** CommonDataInfo idata2 */
                idata2?: (number|null);

                /** CommonDataInfo idata3 */
                idata3?: (number|null);

                /** CommonDataInfo udata1 */
                udata1?: (number|null);

                /** CommonDataInfo udata2 */
                udata2?: (number|null);

                /** CommonDataInfo udata3 */
                udata3?: (number|null);

                /** CommonDataInfo idata64 */
                idata64?: (number|Long|null);

                /** CommonDataInfo udata64 */
                udata64?: (number|Long|null);

                /** CommonDataInfo i_data_list1 */
                i_data_list1?: (s5g.game.proto.CommonDataInfo.IIntDataList|null);

                /** CommonDataInfo i_data_list2 */
                i_data_list2?: (s5g.game.proto.CommonDataInfo.IIntDataList|null);

                /** CommonDataInfo u_data_list1 */
                u_data_list1?: (s5g.game.proto.CommonDataInfo.IUintDataList|null);

                /** CommonDataInfo u_data_list2 */
                u_data_list2?: (s5g.game.proto.CommonDataInfo.IUintDataList|null);

                /** CommonDataInfo multi_data_list1 */
                multi_data_list1?: (s5g.game.proto.CommonDataInfo.IMultiDataList|null);

                /** CommonDataInfo multi_data_list2 */
                multi_data_list2?: (s5g.game.proto.CommonDataInfo.IMultiDataList|null);
            }

            /** Represents a CommonDataInfo. */
            class CommonDataInfo implements ICommonDataInfo {

                /**
                 * Constructs a new CommonDataInfo.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: s5g.game.proto.ICommonDataInfo);

                /** CommonDataInfo idata1. */
                public idata1: number;

                /** CommonDataInfo idata2. */
                public idata2: number;

                /** CommonDataInfo idata3. */
                public idata3: number;

                /** CommonDataInfo udata1. */
                public udata1: number;

                /** CommonDataInfo udata2. */
                public udata2: number;

                /** CommonDataInfo udata3. */
                public udata3: number;

                /** CommonDataInfo idata64. */
                public idata64: (number|Long);

                /** CommonDataInfo udata64. */
                public udata64: (number|Long);

                /** CommonDataInfo i_data_list1. */
                public i_data_list1?: (s5g.game.proto.CommonDataInfo.IIntDataList|null);

                /** CommonDataInfo i_data_list2. */
                public i_data_list2?: (s5g.game.proto.CommonDataInfo.IIntDataList|null);

                /** CommonDataInfo u_data_list1. */
                public u_data_list1?: (s5g.game.proto.CommonDataInfo.IUintDataList|null);

                /** CommonDataInfo u_data_list2. */
                public u_data_list2?: (s5g.game.proto.CommonDataInfo.IUintDataList|null);

                /** CommonDataInfo multi_data_list1. */
                public multi_data_list1?: (s5g.game.proto.CommonDataInfo.IMultiDataList|null);

                /** CommonDataInfo multi_data_list2. */
                public multi_data_list2?: (s5g.game.proto.CommonDataInfo.IMultiDataList|null);

                /**
                 * Creates a new CommonDataInfo instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns CommonDataInfo instance
                 */
                public static create(properties?: s5g.game.proto.ICommonDataInfo): s5g.game.proto.CommonDataInfo;

                /**
                 * Encodes the specified CommonDataInfo message. Does not implicitly {@link s5g.game.proto.CommonDataInfo.verify|verify} messages.
                 * @param message CommonDataInfo message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: s5g.game.proto.ICommonDataInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified CommonDataInfo message, length delimited. Does not implicitly {@link s5g.game.proto.CommonDataInfo.verify|verify} messages.
                 * @param message CommonDataInfo message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: s5g.game.proto.ICommonDataInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a CommonDataInfo message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns CommonDataInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.CommonDataInfo;

                /**
                 * Decodes a CommonDataInfo message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns CommonDataInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.CommonDataInfo;

                /**
                 * Verifies a CommonDataInfo message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a CommonDataInfo message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns CommonDataInfo
                 */
                public static fromObject(object: { [k: string]: any }): s5g.game.proto.CommonDataInfo;

                /**
                 * Creates a plain object from a CommonDataInfo message. Also converts values to other types if specified.
                 * @param message CommonDataInfo
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: s5g.game.proto.CommonDataInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this CommonDataInfo to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            namespace CommonDataInfo {

                /** Properties of an IntDataList. */
                interface IIntDataList {

                    /** IntDataList data */
                    data?: (number[]|null);
                }

                /** Represents an IntDataList. */
                class IntDataList implements IIntDataList {

                    /**
                     * Constructs a new IntDataList.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: s5g.game.proto.CommonDataInfo.IIntDataList);

                    /** IntDataList data. */
                    public data: number[];

                    /**
                     * Creates a new IntDataList instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns IntDataList instance
                     */
                    public static create(properties?: s5g.game.proto.CommonDataInfo.IIntDataList): s5g.game.proto.CommonDataInfo.IntDataList;

                    /**
                     * Encodes the specified IntDataList message. Does not implicitly {@link s5g.game.proto.CommonDataInfo.IntDataList.verify|verify} messages.
                     * @param message IntDataList message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: s5g.game.proto.CommonDataInfo.IIntDataList, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified IntDataList message, length delimited. Does not implicitly {@link s5g.game.proto.CommonDataInfo.IntDataList.verify|verify} messages.
                     * @param message IntDataList message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: s5g.game.proto.CommonDataInfo.IIntDataList, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes an IntDataList message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns IntDataList
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.CommonDataInfo.IntDataList;

                    /**
                     * Decodes an IntDataList message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns IntDataList
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.CommonDataInfo.IntDataList;

                    /**
                     * Verifies an IntDataList message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates an IntDataList message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns IntDataList
                     */
                    public static fromObject(object: { [k: string]: any }): s5g.game.proto.CommonDataInfo.IntDataList;

                    /**
                     * Creates a plain object from an IntDataList message. Also converts values to other types if specified.
                     * @param message IntDataList
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: s5g.game.proto.CommonDataInfo.IntDataList, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this IntDataList to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of an UintDataList. */
                interface IUintDataList {

                    /** UintDataList data */
                    data?: (number[]|null);
                }

                /** Represents an UintDataList. */
                class UintDataList implements IUintDataList {

                    /**
                     * Constructs a new UintDataList.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: s5g.game.proto.CommonDataInfo.IUintDataList);

                    /** UintDataList data. */
                    public data: number[];

                    /**
                     * Creates a new UintDataList instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns UintDataList instance
                     */
                    public static create(properties?: s5g.game.proto.CommonDataInfo.IUintDataList): s5g.game.proto.CommonDataInfo.UintDataList;

                    /**
                     * Encodes the specified UintDataList message. Does not implicitly {@link s5g.game.proto.CommonDataInfo.UintDataList.verify|verify} messages.
                     * @param message UintDataList message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: s5g.game.proto.CommonDataInfo.IUintDataList, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified UintDataList message, length delimited. Does not implicitly {@link s5g.game.proto.CommonDataInfo.UintDataList.verify|verify} messages.
                     * @param message UintDataList message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: s5g.game.proto.CommonDataInfo.IUintDataList, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes an UintDataList message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns UintDataList
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.CommonDataInfo.UintDataList;

                    /**
                     * Decodes an UintDataList message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns UintDataList
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.CommonDataInfo.UintDataList;

                    /**
                     * Verifies an UintDataList message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates an UintDataList message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns UintDataList
                     */
                    public static fromObject(object: { [k: string]: any }): s5g.game.proto.CommonDataInfo.UintDataList;

                    /**
                     * Creates a plain object from an UintDataList message. Also converts values to other types if specified.
                     * @param message UintDataList
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: s5g.game.proto.CommonDataInfo.UintDataList, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this UintDataList to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a MultiDataList. */
                interface IMultiDataList {

                    /** MultiDataList i_data */
                    i_data?: (s5g.game.proto.CommonDataInfo.IIntDataList[]|null);

                    /** MultiDataList u_data */
                    u_data?: (s5g.game.proto.CommonDataInfo.IUintDataList[]|null);
                }

                /** Represents a MultiDataList. */
                class MultiDataList implements IMultiDataList {

                    /**
                     * Constructs a new MultiDataList.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: s5g.game.proto.CommonDataInfo.IMultiDataList);

                    /** MultiDataList i_data. */
                    public i_data: s5g.game.proto.CommonDataInfo.IIntDataList[];

                    /** MultiDataList u_data. */
                    public u_data: s5g.game.proto.CommonDataInfo.IUintDataList[];

                    /**
                     * Creates a new MultiDataList instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns MultiDataList instance
                     */
                    public static create(properties?: s5g.game.proto.CommonDataInfo.IMultiDataList): s5g.game.proto.CommonDataInfo.MultiDataList;

                    /**
                     * Encodes the specified MultiDataList message. Does not implicitly {@link s5g.game.proto.CommonDataInfo.MultiDataList.verify|verify} messages.
                     * @param message MultiDataList message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: s5g.game.proto.CommonDataInfo.IMultiDataList, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified MultiDataList message, length delimited. Does not implicitly {@link s5g.game.proto.CommonDataInfo.MultiDataList.verify|verify} messages.
                     * @param message MultiDataList message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: s5g.game.proto.CommonDataInfo.IMultiDataList, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a MultiDataList message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns MultiDataList
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.CommonDataInfo.MultiDataList;

                    /**
                     * Decodes a MultiDataList message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns MultiDataList
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.CommonDataInfo.MultiDataList;

                    /**
                     * Verifies a MultiDataList message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a MultiDataList message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns MultiDataList
                     */
                    public static fromObject(object: { [k: string]: any }): s5g.game.proto.CommonDataInfo.MultiDataList;

                    /**
                     * Creates a plain object from a MultiDataList message. Also converts values to other types if specified.
                     * @param message MultiDataList
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: s5g.game.proto.CommonDataInfo.MultiDataList, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this MultiDataList to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }
            }

            /** Properties of a SlotResult. */
            interface ISlotResult {

                /** SlotResult module_id */
                module_id: string;

                /** SlotResult credit */
                credit: (number|Long);

                /** SlotResult rng */
                rng?: (number[]|null);

                /** SlotResult win_line_group */
                win_line_group?: (s5g.game.proto.SlotResult.IWinLine[]|null);

                /** SlotResult multiplier_alone */
                multiplier_alone?: (number|null);

                /** SlotResult mulitplier_pattern */
                mulitplier_pattern?: (number[]|null);

                /** SlotResult random_syb_pattern */
                random_syb_pattern?: (number[]|null);

                /** SlotResult bonus_multiplier */
                bonus_multiplier?: (number|null);

                /** SlotResult win_bonus_group */
                win_bonus_group?: (s5g.game.proto.IWinBonus[]|null);

                /** SlotResult be_locked_pattern */
                be_locked_pattern?: (number[]|null);

                /** SlotResult position_pay */
                position_pay?: (number[]|null);

                /** SlotResult reel_stack_pay */
                reel_stack_pay?: (s5g.game.proto.IReelStackPay[]|null);

                /** SlotResult golden_wild_flag */
                golden_wild_flag?: (boolean[]|null);

                /** SlotResult pay_of_scatter */
                pay_of_scatter?: (number[]|null);

                /** SlotResult capture_award */
                capture_award?: (number|null);

                /** SlotResult win_line_multiple */
                win_line_multiple?: (number|null);

                /** SlotResult mystery */
                mystery?: (s5g.game.proto.IMystery|null);

                /** SlotResult jp */
                jp?: (s5g.game.proto.SlotResult.IJPPay|null);

                /** SlotResult overlap */
                overlap?: (boolean[]|null);

                /** SlotResult pay_of_pos */
                pay_of_pos?: (number[]|null);

                /** SlotResult golden_icon */
                golden_icon?: (s5g.game.proto.SlotResult.IGoldenIcon[]|null);

                /** SlotResult exp_wild */
                exp_wild?: (boolean[]|null);

                /** SlotResult pre_exp_wild */
                pre_exp_wild?: (boolean[]|null);

                /** SlotResult trigger_respin_times */
                trigger_respin_times?: (number|null);

                /** SlotResult push_wild */
                push_wild?: (boolean[]|null);

                /** SlotResult typed_wild */
                typed_wild?: (s5g.game.proto.SlotResult.ITypedWild|null);

                /** SlotResult sub_result */
                sub_result?: (s5g.game.proto.SlotResult.ISubResult[]|null);

                /** SlotResult icon_accumulate */
                icon_accumulate?: (number|null);

                /** SlotResult scatter_type */
                scatter_type?: (number[]|null);

                /** SlotResult pre_scatter_type */
                pre_scatter_type?: (number[]|null);

                /** SlotResult full_pay */
                full_pay?: (number|null);

                /** SlotResult block_reel_index */
                block_reel_index?: (number|null);

                /** SlotResult trigger_super_scatter */
                trigger_super_scatter?: (boolean[]|null);

                /** SlotResult strip_index */
                strip_index?: (number|null);

                /** SlotResult cascade_result */
                cascade_result?: (s5g.game.proto.SlotResult.ICascadeResult[]|null);

                /** SlotResult random_bonus_times */
                random_bonus_times?: (number|null);

                /** SlotResult bonus_multiplier_list */
                bonus_multiplier_list?: (number[]|null);

                /** SlotResult bonus_multiplier_index */
                bonus_multiplier_index?: (number|null);

                /** SlotResult col_cascade_count */
                col_cascade_count?: (number[]|null);

                /** SlotResult external_multiplier */
                external_multiplier?: (number|null);

                /** SlotResult pre_no_win_acc */
                pre_no_win_acc?: (number|null);

                /** SlotResult no_win_acc */
                no_win_acc?: (number|null);

                /** SlotResult respin_types */
                respin_types?: (number[]|null);

                /** SlotResult respin_costs */
                respin_costs?: ((number|Long)[]|null);

                /** SlotResult jackpot_rng */
                jackpot_rng?: (number|null);

                /** SlotResult jackpot_type */
                jackpot_type?: (number|null);

                /** SlotResult capture_award_list */
                capture_award_list?: (number[]|null);

                /** SlotResult capture_award_index */
                capture_award_index?: (number|null);

                /** SlotResult golden_scatter_flag */
                golden_scatter_flag?: (boolean[]|null);

                /** SlotResult full_symbol */
                full_symbol?: (number|null);

                /** SlotResult pay_of_star */
                pay_of_star?: (number[]|null);

                /** SlotResult collect_counter */
                collect_counter?: (number|null);

                /** SlotResult cur_collect_counter */
                cur_collect_counter?: (number|null);

                /** SlotResult upgrade_id */
                upgrade_id?: (number[]|null);

                /** SlotResult change_symbol_id */
                change_symbol_id?: (number|null);

                /** SlotResult full_symbol_pattern */
                full_symbol_pattern?: (number[]|null);

                /** SlotResult avg_bet */
                avg_bet?: (number|null);

                /** SlotResult trigger_bonus_total_bet */
                trigger_bonus_total_bet?: (number|null);

                /** SlotResult respin_reels */
                respin_reels?: (number[]|null);

                /** SlotResult cent_in_ask */
                cent_in_ask?: (s5g.game.proto.ICentInAsk[]|null);

                /** SlotResult next_strip_index */
                next_strip_index?: (number|null);

                /** SlotResult bonus_bet_list */
                bonus_bet_list?: (s5g.game.proto.SlotResult.IBonusBet[]|null);

                /** SlotResult last_player_opt_index */
                last_player_opt_index?: (number|null);

                /** SlotResult cur_star_counts */
                cur_star_counts?: (number[]|null);

                /** SlotResult total_star_times */
                total_star_times?: (s5g.game.proto.SlotResult.ICollectTimes[]|null);

                /** SlotResult bonus_star_times */
                bonus_star_times?: (s5g.game.proto.SlotResult.ICollectTimes[]|null);

                /** SlotResult cur_random_prize */
                cur_random_prize?: (number[]|null);

                /** SlotResult pool_info */
                pool_info?: (s5g.game.proto.SlotResult.IPoolInfo|null);

                /** SlotResult crush_syb_pattern */
                crush_syb_pattern?: (number[]|null);

                /** SlotResult bonus_symbol_pos */
                bonus_symbol_pos?: (number|null);

                /** SlotResult arcade_mario_bar */
                arcade_mario_bar?: (s5g.game.proto.SlotResult.IArcadeMarioBar|null);

                /** SlotResult race_game_data */
                race_game_data?: (s5g.game.proto.SlotResult.IArcadeRaceGame|null);

                /** SlotResult coin_pusher_data */
                coin_pusher_data?: (s5g.game.proto.SlotResult.IArcadeCoinPusher|null);

                /** SlotResult arcade_monopoly */
                arcade_monopoly?: (s5g.game.proto.SlotResult.IArcadeMonopoly|null);

                /** SlotResult player_data */
                player_data?: (s5g.game.proto.IPlayerData|null);

                /** SlotResult village_infor */
                village_infor?: (s5g.game.proto.SlotResult.IVillageInfor|null);

                /** SlotResult arcade_football */
                arcade_football?: (s5g.game.proto.SlotResult.IArcadeFootBall|null);

                /** SlotResult arcade_tamagotchi */
                arcade_tamagotchi?: (s5g.game.proto.SlotResult.IArcadeTamagotchi|null);

                /** SlotResult record_list */
                record_list?: (s5g.game.proto.SlotResult.IRecordList[]|null);

                /** SlotResult color_bingo */
                color_bingo?: (s5g.game.proto.SlotResult.IColorBingo|null);

                /** SlotResult mega_ace */
                mega_ace?: (s5g.game.proto.SlotResult.IMegaAce|null);

                /** SlotResult coin_trio */
                coin_trio?: (s5g.game.proto.ICoinTrio|null);

                /** SlotResult deadshot_wilds */
                deadshot_wilds?: (s5g.game.proto.SlotResult.IDeadshotWilds|null);

                /** SlotResult labuby */
                labuby?: (s5g.game.proto.ILabuby|null);

                /** SlotResult expending_wild */
                expending_wild?: (number|null);
            }

            /** Represents a SlotResult. */
            class SlotResult implements ISlotResult {

                /**
                 * Constructs a new SlotResult.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: s5g.game.proto.ISlotResult);

                /** SlotResult module_id. */
                public module_id: string;

                /** SlotResult credit. */
                public credit: (number|Long);

                /** SlotResult rng. */
                public rng: number[];

                /** SlotResult win_line_group. */
                public win_line_group: s5g.game.proto.SlotResult.IWinLine[];

                /** SlotResult multiplier_alone. */
                public multiplier_alone: number;

                /** SlotResult mulitplier_pattern. */
                public mulitplier_pattern: number[];

                /** SlotResult random_syb_pattern. */
                public random_syb_pattern: number[];

                /** SlotResult bonus_multiplier. */
                public bonus_multiplier: number;

                /** SlotResult win_bonus_group. */
                public win_bonus_group: s5g.game.proto.IWinBonus[];

                /** SlotResult be_locked_pattern. */
                public be_locked_pattern: number[];

                /** SlotResult position_pay. */
                public position_pay: number[];

                /** SlotResult reel_stack_pay. */
                public reel_stack_pay: s5g.game.proto.IReelStackPay[];

                /** SlotResult golden_wild_flag. */
                public golden_wild_flag: boolean[];

                /** SlotResult pay_of_scatter. */
                public pay_of_scatter: number[];

                /** SlotResult capture_award. */
                public capture_award: number;

                /** SlotResult win_line_multiple. */
                public win_line_multiple: number;

                /** SlotResult mystery. */
                public mystery?: (s5g.game.proto.IMystery|null);

                /** SlotResult jp. */
                public jp?: (s5g.game.proto.SlotResult.IJPPay|null);

                /** SlotResult overlap. */
                public overlap: boolean[];

                /** SlotResult pay_of_pos. */
                public pay_of_pos: number[];

                /** SlotResult golden_icon. */
                public golden_icon: s5g.game.proto.SlotResult.IGoldenIcon[];

                /** SlotResult exp_wild. */
                public exp_wild: boolean[];

                /** SlotResult pre_exp_wild. */
                public pre_exp_wild: boolean[];

                /** SlotResult trigger_respin_times. */
                public trigger_respin_times: number;

                /** SlotResult push_wild. */
                public push_wild: boolean[];

                /** SlotResult typed_wild. */
                public typed_wild?: (s5g.game.proto.SlotResult.ITypedWild|null);

                /** SlotResult sub_result. */
                public sub_result: s5g.game.proto.SlotResult.ISubResult[];

                /** SlotResult icon_accumulate. */
                public icon_accumulate: number;

                /** SlotResult scatter_type. */
                public scatter_type: number[];

                /** SlotResult pre_scatter_type. */
                public pre_scatter_type: number[];

                /** SlotResult full_pay. */
                public full_pay: number;

                /** SlotResult block_reel_index. */
                public block_reel_index: number;

                /** SlotResult trigger_super_scatter. */
                public trigger_super_scatter: boolean[];

                /** SlotResult strip_index. */
                public strip_index: number;

                /** SlotResult cascade_result. */
                public cascade_result: s5g.game.proto.SlotResult.ICascadeResult[];

                /** SlotResult random_bonus_times. */
                public random_bonus_times: number;

                /** SlotResult bonus_multiplier_list. */
                public bonus_multiplier_list: number[];

                /** SlotResult bonus_multiplier_index. */
                public bonus_multiplier_index: number;

                /** SlotResult col_cascade_count. */
                public col_cascade_count: number[];

                /** SlotResult external_multiplier. */
                public external_multiplier: number;

                /** SlotResult pre_no_win_acc. */
                public pre_no_win_acc: number;

                /** SlotResult no_win_acc. */
                public no_win_acc: number;

                /** SlotResult respin_types. */
                public respin_types: number[];

                /** SlotResult respin_costs. */
                public respin_costs: (number|Long)[];

                /** SlotResult jackpot_rng. */
                public jackpot_rng: number;

                /** SlotResult jackpot_type. */
                public jackpot_type: number;

                /** SlotResult capture_award_list. */
                public capture_award_list: number[];

                /** SlotResult capture_award_index. */
                public capture_award_index: number;

                /** SlotResult golden_scatter_flag. */
                public golden_scatter_flag: boolean[];

                /** SlotResult full_symbol. */
                public full_symbol: number;

                /** SlotResult pay_of_star. */
                public pay_of_star: number[];

                /** SlotResult collect_counter. */
                public collect_counter: number;

                /** SlotResult cur_collect_counter. */
                public cur_collect_counter: number;

                /** SlotResult upgrade_id. */
                public upgrade_id: number[];

                /** SlotResult change_symbol_id. */
                public change_symbol_id: number;

                /** SlotResult full_symbol_pattern. */
                public full_symbol_pattern: number[];

                /** SlotResult avg_bet. */
                public avg_bet: number;

                /** SlotResult trigger_bonus_total_bet. */
                public trigger_bonus_total_bet: number;

                /** SlotResult respin_reels. */
                public respin_reels: number[];

                /** SlotResult cent_in_ask. */
                public cent_in_ask: s5g.game.proto.ICentInAsk[];

                /** SlotResult next_strip_index. */
                public next_strip_index: number;

                /** SlotResult bonus_bet_list. */
                public bonus_bet_list: s5g.game.proto.SlotResult.IBonusBet[];

                /** SlotResult last_player_opt_index. */
                public last_player_opt_index: number;

                /** SlotResult cur_star_counts. */
                public cur_star_counts: number[];

                /** SlotResult total_star_times. */
                public total_star_times: s5g.game.proto.SlotResult.ICollectTimes[];

                /** SlotResult bonus_star_times. */
                public bonus_star_times: s5g.game.proto.SlotResult.ICollectTimes[];

                /** SlotResult cur_random_prize. */
                public cur_random_prize: number[];

                /** SlotResult pool_info. */
                public pool_info?: (s5g.game.proto.SlotResult.IPoolInfo|null);

                /** SlotResult crush_syb_pattern. */
                public crush_syb_pattern: number[];

                /** SlotResult bonus_symbol_pos. */
                public bonus_symbol_pos: number;

                /** SlotResult arcade_mario_bar. */
                public arcade_mario_bar?: (s5g.game.proto.SlotResult.IArcadeMarioBar|null);

                /** SlotResult race_game_data. */
                public race_game_data?: (s5g.game.proto.SlotResult.IArcadeRaceGame|null);

                /** SlotResult coin_pusher_data. */
                public coin_pusher_data?: (s5g.game.proto.SlotResult.IArcadeCoinPusher|null);

                /** SlotResult arcade_monopoly. */
                public arcade_monopoly?: (s5g.game.proto.SlotResult.IArcadeMonopoly|null);

                /** SlotResult player_data. */
                public player_data?: (s5g.game.proto.IPlayerData|null);

                /** SlotResult village_infor. */
                public village_infor?: (s5g.game.proto.SlotResult.IVillageInfor|null);

                /** SlotResult arcade_football. */
                public arcade_football?: (s5g.game.proto.SlotResult.IArcadeFootBall|null);

                /** SlotResult arcade_tamagotchi. */
                public arcade_tamagotchi?: (s5g.game.proto.SlotResult.IArcadeTamagotchi|null);

                /** SlotResult record_list. */
                public record_list: s5g.game.proto.SlotResult.IRecordList[];

                /** SlotResult color_bingo. */
                public color_bingo?: (s5g.game.proto.SlotResult.IColorBingo|null);

                /** SlotResult mega_ace. */
                public mega_ace?: (s5g.game.proto.SlotResult.IMegaAce|null);

                /** SlotResult coin_trio. */
                public coin_trio?: (s5g.game.proto.ICoinTrio|null);

                /** SlotResult deadshot_wilds. */
                public deadshot_wilds?: (s5g.game.proto.SlotResult.IDeadshotWilds|null);

                /** SlotResult labuby. */
                public labuby?: (s5g.game.proto.ILabuby|null);

                /** SlotResult expending_wild. */
                public expending_wild: number;

                /**
                 * Creates a new SlotResult instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns SlotResult instance
                 */
                public static create(properties?: s5g.game.proto.ISlotResult): s5g.game.proto.SlotResult;

                /**
                 * Encodes the specified SlotResult message. Does not implicitly {@link s5g.game.proto.SlotResult.verify|verify} messages.
                 * @param message SlotResult message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: s5g.game.proto.ISlotResult, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified SlotResult message, length delimited. Does not implicitly {@link s5g.game.proto.SlotResult.verify|verify} messages.
                 * @param message SlotResult message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: s5g.game.proto.ISlotResult, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a SlotResult message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns SlotResult
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.SlotResult;

                /**
                 * Decodes a SlotResult message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns SlotResult
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.SlotResult;

                /**
                 * Verifies a SlotResult message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a SlotResult message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns SlotResult
                 */
                public static fromObject(object: { [k: string]: any }): s5g.game.proto.SlotResult;

                /**
                 * Creates a plain object from a SlotResult message. Also converts values to other types if specified.
                 * @param message SlotResult
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: s5g.game.proto.SlotResult, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this SlotResult to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            namespace SlotResult {

                /** Properties of a WinLine. */
                interface IWinLine {

                    /** WinLine win_line_type */
                    win_line_type: s5g.game.proto.SlotResult.WinLine.WinLineType;

                    /** WinLine line_no */
                    line_no: number;

                    /** WinLine symbol_id */
                    symbol_id: number;

                    /** WinLine pos */
                    pos?: (number[]|null);

                    /** WinLine credit */
                    credit: number;

                    /** WinLine multiplier */
                    multiplier: number;

                    /** WinLine credit_long */
                    credit_long?: (number|Long|null);
                }

                /** Represents a WinLine. */
                class WinLine implements IWinLine {

                    /**
                     * Constructs a new WinLine.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: s5g.game.proto.SlotResult.IWinLine);

                    /** WinLine win_line_type. */
                    public win_line_type: s5g.game.proto.SlotResult.WinLine.WinLineType;

                    /** WinLine line_no. */
                    public line_no: number;

                    /** WinLine symbol_id. */
                    public symbol_id: number;

                    /** WinLine pos. */
                    public pos: number[];

                    /** WinLine credit. */
                    public credit: number;

                    /** WinLine multiplier. */
                    public multiplier: number;

                    /** WinLine credit_long. */
                    public credit_long: (number|Long);

                    /**
                     * Creates a new WinLine instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns WinLine instance
                     */
                    public static create(properties?: s5g.game.proto.SlotResult.IWinLine): s5g.game.proto.SlotResult.WinLine;

                    /**
                     * Encodes the specified WinLine message. Does not implicitly {@link s5g.game.proto.SlotResult.WinLine.verify|verify} messages.
                     * @param message WinLine message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: s5g.game.proto.SlotResult.IWinLine, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified WinLine message, length delimited. Does not implicitly {@link s5g.game.proto.SlotResult.WinLine.verify|verify} messages.
                     * @param message WinLine message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: s5g.game.proto.SlotResult.IWinLine, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a WinLine message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns WinLine
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.SlotResult.WinLine;

                    /**
                     * Decodes a WinLine message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns WinLine
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.SlotResult.WinLine;

                    /**
                     * Verifies a WinLine message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a WinLine message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns WinLine
                     */
                    public static fromObject(object: { [k: string]: any }): s5g.game.proto.SlotResult.WinLine;

                    /**
                     * Creates a plain object from a WinLine message. Also converts values to other types if specified.
                     * @param message WinLine
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: s5g.game.proto.SlotResult.WinLine, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this WinLine to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                namespace WinLine {

                    /** WinLineType enum. */
                    enum WinLineType {
                        kCommon = 0,
                        kXTotalBet = 1,
                        kXTotalBetTrigger = 2
                    }
                }

                /** Properties of a JPPay. */
                interface IJPPay {

                    /** JPPay cent */
                    cent: number;

                    /** JPPay win_line_group */
                    win_line_group?: (s5g.game.proto.SlotResult.IWinLine[]|null);
                }

                /** Represents a JPPay. */
                class JPPay implements IJPPay {

                    /**
                     * Constructs a new JPPay.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: s5g.game.proto.SlotResult.IJPPay);

                    /** JPPay cent. */
                    public cent: number;

                    /** JPPay win_line_group. */
                    public win_line_group: s5g.game.proto.SlotResult.IWinLine[];

                    /**
                     * Creates a new JPPay instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns JPPay instance
                     */
                    public static create(properties?: s5g.game.proto.SlotResult.IJPPay): s5g.game.proto.SlotResult.JPPay;

                    /**
                     * Encodes the specified JPPay message. Does not implicitly {@link s5g.game.proto.SlotResult.JPPay.verify|verify} messages.
                     * @param message JPPay message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: s5g.game.proto.SlotResult.IJPPay, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified JPPay message, length delimited. Does not implicitly {@link s5g.game.proto.SlotResult.JPPay.verify|verify} messages.
                     * @param message JPPay message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: s5g.game.proto.SlotResult.IJPPay, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a JPPay message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns JPPay
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.SlotResult.JPPay;

                    /**
                     * Decodes a JPPay message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns JPPay
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.SlotResult.JPPay;

                    /**
                     * Verifies a JPPay message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a JPPay message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns JPPay
                     */
                    public static fromObject(object: { [k: string]: any }): s5g.game.proto.SlotResult.JPPay;

                    /**
                     * Creates a plain object from a JPPay message. Also converts values to other types if specified.
                     * @param message JPPay
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: s5g.game.proto.SlotResult.JPPay, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this JPPay to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a GoldenIcon. */
                interface IGoldenIcon {

                    /** GoldenIcon symbol_id */
                    symbol_id: number;

                    /** GoldenIcon is_golden */
                    is_golden: boolean;

                    /** GoldenIcon is_trig */
                    is_trig?: (boolean|null);
                }

                /** Represents a GoldenIcon. */
                class GoldenIcon implements IGoldenIcon {

                    /**
                     * Constructs a new GoldenIcon.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: s5g.game.proto.SlotResult.IGoldenIcon);

                    /** GoldenIcon symbol_id. */
                    public symbol_id: number;

                    /** GoldenIcon is_golden. */
                    public is_golden: boolean;

                    /** GoldenIcon is_trig. */
                    public is_trig: boolean;

                    /**
                     * Creates a new GoldenIcon instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns GoldenIcon instance
                     */
                    public static create(properties?: s5g.game.proto.SlotResult.IGoldenIcon): s5g.game.proto.SlotResult.GoldenIcon;

                    /**
                     * Encodes the specified GoldenIcon message. Does not implicitly {@link s5g.game.proto.SlotResult.GoldenIcon.verify|verify} messages.
                     * @param message GoldenIcon message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: s5g.game.proto.SlotResult.IGoldenIcon, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified GoldenIcon message, length delimited. Does not implicitly {@link s5g.game.proto.SlotResult.GoldenIcon.verify|verify} messages.
                     * @param message GoldenIcon message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: s5g.game.proto.SlotResult.IGoldenIcon, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a GoldenIcon message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns GoldenIcon
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.SlotResult.GoldenIcon;

                    /**
                     * Decodes a GoldenIcon message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns GoldenIcon
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.SlotResult.GoldenIcon;

                    /**
                     * Verifies a GoldenIcon message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a GoldenIcon message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns GoldenIcon
                     */
                    public static fromObject(object: { [k: string]: any }): s5g.game.proto.SlotResult.GoldenIcon;

                    /**
                     * Creates a plain object from a GoldenIcon message. Also converts values to other types if specified.
                     * @param message GoldenIcon
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: s5g.game.proto.SlotResult.GoldenIcon, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this GoldenIcon to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a TypedWild. */
                interface ITypedWild {

                    /** TypedWild type */
                    type: number;

                    /** TypedWild value */
                    value?: (number[]|null);
                }

                /** Represents a TypedWild. */
                class TypedWild implements ITypedWild {

                    /**
                     * Constructs a new TypedWild.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: s5g.game.proto.SlotResult.ITypedWild);

                    /** TypedWild type. */
                    public type: number;

                    /** TypedWild value. */
                    public value: number[];

                    /**
                     * Creates a new TypedWild instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns TypedWild instance
                     */
                    public static create(properties?: s5g.game.proto.SlotResult.ITypedWild): s5g.game.proto.SlotResult.TypedWild;

                    /**
                     * Encodes the specified TypedWild message. Does not implicitly {@link s5g.game.proto.SlotResult.TypedWild.verify|verify} messages.
                     * @param message TypedWild message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: s5g.game.proto.SlotResult.ITypedWild, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified TypedWild message, length delimited. Does not implicitly {@link s5g.game.proto.SlotResult.TypedWild.verify|verify} messages.
                     * @param message TypedWild message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: s5g.game.proto.SlotResult.ITypedWild, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a TypedWild message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns TypedWild
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.SlotResult.TypedWild;

                    /**
                     * Decodes a TypedWild message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns TypedWild
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.SlotResult.TypedWild;

                    /**
                     * Verifies a TypedWild message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a TypedWild message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns TypedWild
                     */
                    public static fromObject(object: { [k: string]: any }): s5g.game.proto.SlotResult.TypedWild;

                    /**
                     * Creates a plain object from a TypedWild message. Also converts values to other types if specified.
                     * @param message TypedWild
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: s5g.game.proto.SlotResult.TypedWild, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this TypedWild to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a SubResult. */
                interface ISubResult {

                    /** SubResult sub_game_id */
                    sub_game_id: number;

                    /** SubResult credit */
                    credit: (number|Long);

                    /** SubResult win_line_group */
                    win_line_group?: (s5g.game.proto.SlotResult.IWinLine[]|null);

                    /** SubResult rng */
                    rng?: (number[]|null);

                    /** SubResult win_bonus_group */
                    win_bonus_group?: (s5g.game.proto.IWinBonus[]|null);

                    /** SubResult trigger_super_scatter */
                    trigger_super_scatter?: (boolean[]|null);
                }

                /** Represents a SubResult. */
                class SubResult implements ISubResult {

                    /**
                     * Constructs a new SubResult.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: s5g.game.proto.SlotResult.ISubResult);

                    /** SubResult sub_game_id. */
                    public sub_game_id: number;

                    /** SubResult credit. */
                    public credit: (number|Long);

                    /** SubResult win_line_group. */
                    public win_line_group: s5g.game.proto.SlotResult.IWinLine[];

                    /** SubResult rng. */
                    public rng: number[];

                    /** SubResult win_bonus_group. */
                    public win_bonus_group: s5g.game.proto.IWinBonus[];

                    /** SubResult trigger_super_scatter. */
                    public trigger_super_scatter: boolean[];

                    /**
                     * Creates a new SubResult instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns SubResult instance
                     */
                    public static create(properties?: s5g.game.proto.SlotResult.ISubResult): s5g.game.proto.SlotResult.SubResult;

                    /**
                     * Encodes the specified SubResult message. Does not implicitly {@link s5g.game.proto.SlotResult.SubResult.verify|verify} messages.
                     * @param message SubResult message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: s5g.game.proto.SlotResult.ISubResult, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified SubResult message, length delimited. Does not implicitly {@link s5g.game.proto.SlotResult.SubResult.verify|verify} messages.
                     * @param message SubResult message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: s5g.game.proto.SlotResult.ISubResult, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a SubResult message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns SubResult
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.SlotResult.SubResult;

                    /**
                     * Decodes a SubResult message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns SubResult
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.SlotResult.SubResult;

                    /**
                     * Verifies a SubResult message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a SubResult message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns SubResult
                     */
                    public static fromObject(object: { [k: string]: any }): s5g.game.proto.SlotResult.SubResult;

                    /**
                     * Creates a plain object from a SubResult message. Also converts values to other types if specified.
                     * @param message SubResult
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: s5g.game.proto.SlotResult.SubResult, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this SubResult to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a CascadeResult. */
                interface ICascadeResult {

                    /** CascadeResult win_line_group */
                    win_line_group?: (s5g.game.proto.SlotResult.IWinLine[]|null);

                    /** CascadeResult random_syb_pattern */
                    random_syb_pattern?: (number[]|null);
                }

                /** Represents a CascadeResult. */
                class CascadeResult implements ICascadeResult {

                    /**
                     * Constructs a new CascadeResult.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: s5g.game.proto.SlotResult.ICascadeResult);

                    /** CascadeResult win_line_group. */
                    public win_line_group: s5g.game.proto.SlotResult.IWinLine[];

                    /** CascadeResult random_syb_pattern. */
                    public random_syb_pattern: number[];

                    /**
                     * Creates a new CascadeResult instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns CascadeResult instance
                     */
                    public static create(properties?: s5g.game.proto.SlotResult.ICascadeResult): s5g.game.proto.SlotResult.CascadeResult;

                    /**
                     * Encodes the specified CascadeResult message. Does not implicitly {@link s5g.game.proto.SlotResult.CascadeResult.verify|verify} messages.
                     * @param message CascadeResult message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: s5g.game.proto.SlotResult.ICascadeResult, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified CascadeResult message, length delimited. Does not implicitly {@link s5g.game.proto.SlotResult.CascadeResult.verify|verify} messages.
                     * @param message CascadeResult message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: s5g.game.proto.SlotResult.ICascadeResult, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a CascadeResult message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns CascadeResult
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.SlotResult.CascadeResult;

                    /**
                     * Decodes a CascadeResult message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns CascadeResult
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.SlotResult.CascadeResult;

                    /**
                     * Verifies a CascadeResult message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a CascadeResult message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns CascadeResult
                     */
                    public static fromObject(object: { [k: string]: any }): s5g.game.proto.SlotResult.CascadeResult;

                    /**
                     * Creates a plain object from a CascadeResult message. Also converts values to other types if specified.
                     * @param message CascadeResult
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: s5g.game.proto.SlotResult.CascadeResult, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this CascadeResult to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a BonusBet. */
                interface IBonusBet {

                    /** BonusBet bet */
                    bet: number;

                    /** BonusBet count */
                    count: number;
                }

                /** Represents a BonusBet. */
                class BonusBet implements IBonusBet {

                    /**
                     * Constructs a new BonusBet.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: s5g.game.proto.SlotResult.IBonusBet);

                    /** BonusBet bet. */
                    public bet: number;

                    /** BonusBet count. */
                    public count: number;

                    /**
                     * Creates a new BonusBet instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns BonusBet instance
                     */
                    public static create(properties?: s5g.game.proto.SlotResult.IBonusBet): s5g.game.proto.SlotResult.BonusBet;

                    /**
                     * Encodes the specified BonusBet message. Does not implicitly {@link s5g.game.proto.SlotResult.BonusBet.verify|verify} messages.
                     * @param message BonusBet message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: s5g.game.proto.SlotResult.IBonusBet, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified BonusBet message, length delimited. Does not implicitly {@link s5g.game.proto.SlotResult.BonusBet.verify|verify} messages.
                     * @param message BonusBet message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: s5g.game.proto.SlotResult.IBonusBet, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a BonusBet message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns BonusBet
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.SlotResult.BonusBet;

                    /**
                     * Decodes a BonusBet message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns BonusBet
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.SlotResult.BonusBet;

                    /**
                     * Verifies a BonusBet message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a BonusBet message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns BonusBet
                     */
                    public static fromObject(object: { [k: string]: any }): s5g.game.proto.SlotResult.BonusBet;

                    /**
                     * Creates a plain object from a BonusBet message. Also converts values to other types if specified.
                     * @param message BonusBet
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: s5g.game.proto.SlotResult.BonusBet, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this BonusBet to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a CollectTimes. */
                interface ICollectTimes {

                    /** CollectTimes times */
                    times?: (number[]|null);
                }

                /** Represents a CollectTimes. */
                class CollectTimes implements ICollectTimes {

                    /**
                     * Constructs a new CollectTimes.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: s5g.game.proto.SlotResult.ICollectTimes);

                    /** CollectTimes times. */
                    public times: number[];

                    /**
                     * Creates a new CollectTimes instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns CollectTimes instance
                     */
                    public static create(properties?: s5g.game.proto.SlotResult.ICollectTimes): s5g.game.proto.SlotResult.CollectTimes;

                    /**
                     * Encodes the specified CollectTimes message. Does not implicitly {@link s5g.game.proto.SlotResult.CollectTimes.verify|verify} messages.
                     * @param message CollectTimes message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: s5g.game.proto.SlotResult.ICollectTimes, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified CollectTimes message, length delimited. Does not implicitly {@link s5g.game.proto.SlotResult.CollectTimes.verify|verify} messages.
                     * @param message CollectTimes message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: s5g.game.proto.SlotResult.ICollectTimes, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a CollectTimes message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns CollectTimes
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.SlotResult.CollectTimes;

                    /**
                     * Decodes a CollectTimes message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns CollectTimes
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.SlotResult.CollectTimes;

                    /**
                     * Verifies a CollectTimes message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a CollectTimes message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns CollectTimes
                     */
                    public static fromObject(object: { [k: string]: any }): s5g.game.proto.SlotResult.CollectTimes;

                    /**
                     * Creates a plain object from a CollectTimes message. Also converts values to other types if specified.
                     * @param message CollectTimes
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: s5g.game.proto.SlotResult.CollectTimes, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this CollectTimes to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a PoolInfo. */
                interface IPoolInfo {

                    /** PoolInfo pool_level */
                    pool_level?: (number|null);

                    /** PoolInfo lost_pool_condition */
                    lost_pool_condition?: (number|null);

                    /** PoolInfo lost_pool_total */
                    lost_pool_total?: (number|Long|null);
                }

                /** Represents a PoolInfo. */
                class PoolInfo implements IPoolInfo {

                    /**
                     * Constructs a new PoolInfo.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: s5g.game.proto.SlotResult.IPoolInfo);

                    /** PoolInfo pool_level. */
                    public pool_level: number;

                    /** PoolInfo lost_pool_condition. */
                    public lost_pool_condition: number;

                    /** PoolInfo lost_pool_total. */
                    public lost_pool_total: (number|Long);

                    /**
                     * Creates a new PoolInfo instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns PoolInfo instance
                     */
                    public static create(properties?: s5g.game.proto.SlotResult.IPoolInfo): s5g.game.proto.SlotResult.PoolInfo;

                    /**
                     * Encodes the specified PoolInfo message. Does not implicitly {@link s5g.game.proto.SlotResult.PoolInfo.verify|verify} messages.
                     * @param message PoolInfo message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: s5g.game.proto.SlotResult.IPoolInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified PoolInfo message, length delimited. Does not implicitly {@link s5g.game.proto.SlotResult.PoolInfo.verify|verify} messages.
                     * @param message PoolInfo message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: s5g.game.proto.SlotResult.IPoolInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a PoolInfo message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns PoolInfo
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.SlotResult.PoolInfo;

                    /**
                     * Decodes a PoolInfo message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns PoolInfo
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.SlotResult.PoolInfo;

                    /**
                     * Verifies a PoolInfo message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a PoolInfo message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns PoolInfo
                     */
                    public static fromObject(object: { [k: string]: any }): s5g.game.proto.SlotResult.PoolInfo;

                    /**
                     * Creates a plain object from a PoolInfo message. Also converts values to other types if specified.
                     * @param message PoolInfo
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: s5g.game.proto.SlotResult.PoolInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this PoolInfo to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of an ArcadeMarioBar. */
                interface IArcadeMarioBar {

                    /** ArcadeMarioBar light_bonus_rng */
                    light_bonus_rng?: (number[]|null);

                    /** ArcadeMarioBar full_award */
                    full_award?: (number|null);

                    /** ArcadeMarioBar win_line_group */
                    win_line_group?: (s5g.game.proto.SlotResult.IWinLine[]|null);
                }

                /** Represents an ArcadeMarioBar. */
                class ArcadeMarioBar implements IArcadeMarioBar {

                    /**
                     * Constructs a new ArcadeMarioBar.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: s5g.game.proto.SlotResult.IArcadeMarioBar);

                    /** ArcadeMarioBar light_bonus_rng. */
                    public light_bonus_rng: number[];

                    /** ArcadeMarioBar full_award. */
                    public full_award: number;

                    /** ArcadeMarioBar win_line_group. */
                    public win_line_group: s5g.game.proto.SlotResult.IWinLine[];

                    /**
                     * Creates a new ArcadeMarioBar instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns ArcadeMarioBar instance
                     */
                    public static create(properties?: s5g.game.proto.SlotResult.IArcadeMarioBar): s5g.game.proto.SlotResult.ArcadeMarioBar;

                    /**
                     * Encodes the specified ArcadeMarioBar message. Does not implicitly {@link s5g.game.proto.SlotResult.ArcadeMarioBar.verify|verify} messages.
                     * @param message ArcadeMarioBar message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: s5g.game.proto.SlotResult.IArcadeMarioBar, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified ArcadeMarioBar message, length delimited. Does not implicitly {@link s5g.game.proto.SlotResult.ArcadeMarioBar.verify|verify} messages.
                     * @param message ArcadeMarioBar message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: s5g.game.proto.SlotResult.IArcadeMarioBar, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes an ArcadeMarioBar message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns ArcadeMarioBar
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.SlotResult.ArcadeMarioBar;

                    /**
                     * Decodes an ArcadeMarioBar message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns ArcadeMarioBar
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.SlotResult.ArcadeMarioBar;

                    /**
                     * Verifies an ArcadeMarioBar message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates an ArcadeMarioBar message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns ArcadeMarioBar
                     */
                    public static fromObject(object: { [k: string]: any }): s5g.game.proto.SlotResult.ArcadeMarioBar;

                    /**
                     * Creates a plain object from an ArcadeMarioBar message. Also converts values to other types if specified.
                     * @param message ArcadeMarioBar
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: s5g.game.proto.SlotResult.ArcadeMarioBar, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this ArcadeMarioBar to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of an ArcadeRaceGame. */
                interface IArcadeRaceGame {

                    /** ArcadeRaceGame rank */
                    rank?: (number[]|null);

                    /** ArcadeRaceGame gold_data */
                    gold_data?: (s5g.game.proto.SlotResult.ArcadeRaceGame.IRData[]|null);

                    /** ArcadeRaceGame section_data */
                    section_data: s5g.game.proto.SlotResult.ArcadeRaceGame.ISectionData;

                    /** ArcadeRaceGame item_wins */
                    item_wins?: (number[]|null);

                    /** ArcadeRaceGame gold_win */
                    gold_win: number;

                    /** ArcadeRaceGame next_bet */
                    next_bet?: (number[]|null);

                    /** ArcadeRaceGame next_max_bet */
                    next_max_bet?: (number[]|null);
                }

                /** Represents an ArcadeRaceGame. */
                class ArcadeRaceGame implements IArcadeRaceGame {

                    /**
                     * Constructs a new ArcadeRaceGame.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: s5g.game.proto.SlotResult.IArcadeRaceGame);

                    /** ArcadeRaceGame rank. */
                    public rank: number[];

                    /** ArcadeRaceGame gold_data. */
                    public gold_data: s5g.game.proto.SlotResult.ArcadeRaceGame.IRData[];

                    /** ArcadeRaceGame section_data. */
                    public section_data: s5g.game.proto.SlotResult.ArcadeRaceGame.ISectionData;

                    /** ArcadeRaceGame item_wins. */
                    public item_wins: number[];

                    /** ArcadeRaceGame gold_win. */
                    public gold_win: number;

                    /** ArcadeRaceGame next_bet. */
                    public next_bet: number[];

                    /** ArcadeRaceGame next_max_bet. */
                    public next_max_bet: number[];

                    /**
                     * Creates a new ArcadeRaceGame instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns ArcadeRaceGame instance
                     */
                    public static create(properties?: s5g.game.proto.SlotResult.IArcadeRaceGame): s5g.game.proto.SlotResult.ArcadeRaceGame;

                    /**
                     * Encodes the specified ArcadeRaceGame message. Does not implicitly {@link s5g.game.proto.SlotResult.ArcadeRaceGame.verify|verify} messages.
                     * @param message ArcadeRaceGame message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: s5g.game.proto.SlotResult.IArcadeRaceGame, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified ArcadeRaceGame message, length delimited. Does not implicitly {@link s5g.game.proto.SlotResult.ArcadeRaceGame.verify|verify} messages.
                     * @param message ArcadeRaceGame message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: s5g.game.proto.SlotResult.IArcadeRaceGame, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes an ArcadeRaceGame message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns ArcadeRaceGame
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.SlotResult.ArcadeRaceGame;

                    /**
                     * Decodes an ArcadeRaceGame message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns ArcadeRaceGame
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.SlotResult.ArcadeRaceGame;

                    /**
                     * Verifies an ArcadeRaceGame message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates an ArcadeRaceGame message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns ArcadeRaceGame
                     */
                    public static fromObject(object: { [k: string]: any }): s5g.game.proto.SlotResult.ArcadeRaceGame;

                    /**
                     * Creates a plain object from an ArcadeRaceGame message. Also converts values to other types if specified.
                     * @param message ArcadeRaceGame
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: s5g.game.proto.SlotResult.ArcadeRaceGame, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this ArcadeRaceGame to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                namespace ArcadeRaceGame {

                    /** Properties of a RData. */
                    interface IRData {

                        /** RData data */
                        data?: (number[]|null);
                    }

                    /** Represents a RData. */
                    class RData implements IRData {

                        /**
                         * Constructs a new RData.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: s5g.game.proto.SlotResult.ArcadeRaceGame.IRData);

                        /** RData data. */
                        public data: number[];

                        /**
                         * Creates a new RData instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns RData instance
                         */
                        public static create(properties?: s5g.game.proto.SlotResult.ArcadeRaceGame.IRData): s5g.game.proto.SlotResult.ArcadeRaceGame.RData;

                        /**
                         * Encodes the specified RData message. Does not implicitly {@link s5g.game.proto.SlotResult.ArcadeRaceGame.RData.verify|verify} messages.
                         * @param message RData message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: s5g.game.proto.SlotResult.ArcadeRaceGame.IRData, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Encodes the specified RData message, length delimited. Does not implicitly {@link s5g.game.proto.SlotResult.ArcadeRaceGame.RData.verify|verify} messages.
                         * @param message RData message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encodeDelimited(message: s5g.game.proto.SlotResult.ArcadeRaceGame.IRData, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a RData message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns RData
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.SlotResult.ArcadeRaceGame.RData;

                        /**
                         * Decodes a RData message from the specified reader or buffer, length delimited.
                         * @param reader Reader or buffer to decode from
                         * @returns RData
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.SlotResult.ArcadeRaceGame.RData;

                        /**
                         * Verifies a RData message.
                         * @param message Plain object to verify
                         * @returns `null` if valid, otherwise the reason why it is not
                         */
                        public static verify(message: { [k: string]: any }): (string|null);

                        /**
                         * Creates a RData message from a plain object. Also converts values to their respective internal types.
                         * @param object Plain object
                         * @returns RData
                         */
                        public static fromObject(object: { [k: string]: any }): s5g.game.proto.SlotResult.ArcadeRaceGame.RData;

                        /**
                         * Creates a plain object from a RData message. Also converts values to other types if specified.
                         * @param message RData
                         * @param [options] Conversion options
                         * @returns Plain object
                         */
                        public static toObject(message: s5g.game.proto.SlotResult.ArcadeRaceGame.RData, options?: $protobuf.IConversionOptions): { [k: string]: any };

                        /**
                         * Converts this RData to JSON.
                         * @returns JSON object
                         */
                        public toJSON(): { [k: string]: any };
                    }

                    /** Properties of a SectionData. */
                    interface ISectionData {

                        /** SectionData init_speed */
                        init_speed: number;

                        /** SectionData differ */
                        differ: number;

                        /** SectionData result_section */
                        result_section?: (s5g.game.proto.SlotResult.ArcadeRaceGame.IRData[]|null);
                    }

                    /** Represents a SectionData. */
                    class SectionData implements ISectionData {

                        /**
                         * Constructs a new SectionData.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: s5g.game.proto.SlotResult.ArcadeRaceGame.ISectionData);

                        /** SectionData init_speed. */
                        public init_speed: number;

                        /** SectionData differ. */
                        public differ: number;

                        /** SectionData result_section. */
                        public result_section: s5g.game.proto.SlotResult.ArcadeRaceGame.IRData[];

                        /**
                         * Creates a new SectionData instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns SectionData instance
                         */
                        public static create(properties?: s5g.game.proto.SlotResult.ArcadeRaceGame.ISectionData): s5g.game.proto.SlotResult.ArcadeRaceGame.SectionData;

                        /**
                         * Encodes the specified SectionData message. Does not implicitly {@link s5g.game.proto.SlotResult.ArcadeRaceGame.SectionData.verify|verify} messages.
                         * @param message SectionData message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: s5g.game.proto.SlotResult.ArcadeRaceGame.ISectionData, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Encodes the specified SectionData message, length delimited. Does not implicitly {@link s5g.game.proto.SlotResult.ArcadeRaceGame.SectionData.verify|verify} messages.
                         * @param message SectionData message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encodeDelimited(message: s5g.game.proto.SlotResult.ArcadeRaceGame.ISectionData, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a SectionData message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns SectionData
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.SlotResult.ArcadeRaceGame.SectionData;

                        /**
                         * Decodes a SectionData message from the specified reader or buffer, length delimited.
                         * @param reader Reader or buffer to decode from
                         * @returns SectionData
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.SlotResult.ArcadeRaceGame.SectionData;

                        /**
                         * Verifies a SectionData message.
                         * @param message Plain object to verify
                         * @returns `null` if valid, otherwise the reason why it is not
                         */
                        public static verify(message: { [k: string]: any }): (string|null);

                        /**
                         * Creates a SectionData message from a plain object. Also converts values to their respective internal types.
                         * @param object Plain object
                         * @returns SectionData
                         */
                        public static fromObject(object: { [k: string]: any }): s5g.game.proto.SlotResult.ArcadeRaceGame.SectionData;

                        /**
                         * Creates a plain object from a SectionData message. Also converts values to other types if specified.
                         * @param message SectionData
                         * @param [options] Conversion options
                         * @returns Plain object
                         */
                        public static toObject(message: s5g.game.proto.SlotResult.ArcadeRaceGame.SectionData, options?: $protobuf.IConversionOptions): { [k: string]: any };

                        /**
                         * Converts this SectionData to JSON.
                         * @returns JSON object
                         */
                        public toJSON(): { [k: string]: any };
                    }
                }

                /** Properties of an ArcadeCoinPusher. */
                interface IArcadeCoinPusher {

                    /** ArcadeCoinPusher special_pos */
                    special_pos?: (s5g.game.proto.SlotResult.ArcadeCoinPusher.IExtraData[]|null);

                    /** ArcadeCoinPusher wins */
                    wins?: (number[]|null);

                    /** ArcadeCoinPusher total_win */
                    total_win: number;

                    /** ArcadeCoinPusher bonus_hit_data */
                    bonus_hit_data?: (s5g.game.proto.SlotResult.ArcadeCoinPusher.IBonusHit[]|null);
                }

                /** Represents an ArcadeCoinPusher. */
                class ArcadeCoinPusher implements IArcadeCoinPusher {

                    /**
                     * Constructs a new ArcadeCoinPusher.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: s5g.game.proto.SlotResult.IArcadeCoinPusher);

                    /** ArcadeCoinPusher special_pos. */
                    public special_pos: s5g.game.proto.SlotResult.ArcadeCoinPusher.IExtraData[];

                    /** ArcadeCoinPusher wins. */
                    public wins: number[];

                    /** ArcadeCoinPusher total_win. */
                    public total_win: number;

                    /** ArcadeCoinPusher bonus_hit_data. */
                    public bonus_hit_data: s5g.game.proto.SlotResult.ArcadeCoinPusher.IBonusHit[];

                    /**
                     * Creates a new ArcadeCoinPusher instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns ArcadeCoinPusher instance
                     */
                    public static create(properties?: s5g.game.proto.SlotResult.IArcadeCoinPusher): s5g.game.proto.SlotResult.ArcadeCoinPusher;

                    /**
                     * Encodes the specified ArcadeCoinPusher message. Does not implicitly {@link s5g.game.proto.SlotResult.ArcadeCoinPusher.verify|verify} messages.
                     * @param message ArcadeCoinPusher message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: s5g.game.proto.SlotResult.IArcadeCoinPusher, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified ArcadeCoinPusher message, length delimited. Does not implicitly {@link s5g.game.proto.SlotResult.ArcadeCoinPusher.verify|verify} messages.
                     * @param message ArcadeCoinPusher message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: s5g.game.proto.SlotResult.IArcadeCoinPusher, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes an ArcadeCoinPusher message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns ArcadeCoinPusher
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.SlotResult.ArcadeCoinPusher;

                    /**
                     * Decodes an ArcadeCoinPusher message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns ArcadeCoinPusher
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.SlotResult.ArcadeCoinPusher;

                    /**
                     * Verifies an ArcadeCoinPusher message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates an ArcadeCoinPusher message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns ArcadeCoinPusher
                     */
                    public static fromObject(object: { [k: string]: any }): s5g.game.proto.SlotResult.ArcadeCoinPusher;

                    /**
                     * Creates a plain object from an ArcadeCoinPusher message. Also converts values to other types if specified.
                     * @param message ArcadeCoinPusher
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: s5g.game.proto.SlotResult.ArcadeCoinPusher, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this ArcadeCoinPusher to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                namespace ArcadeCoinPusher {

                    /** Properties of a BonusHit. */
                    interface IBonusHit {

                        /** BonusHit type */
                        type: number;

                        /** BonusHit time */
                        time: number;

                        /** BonusHit win */
                        win: number;
                    }

                    /** Represents a BonusHit. */
                    class BonusHit implements IBonusHit {

                        /**
                         * Constructs a new BonusHit.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: s5g.game.proto.SlotResult.ArcadeCoinPusher.IBonusHit);

                        /** BonusHit type. */
                        public type: number;

                        /** BonusHit time. */
                        public time: number;

                        /** BonusHit win. */
                        public win: number;

                        /**
                         * Creates a new BonusHit instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns BonusHit instance
                         */
                        public static create(properties?: s5g.game.proto.SlotResult.ArcadeCoinPusher.IBonusHit): s5g.game.proto.SlotResult.ArcadeCoinPusher.BonusHit;

                        /**
                         * Encodes the specified BonusHit message. Does not implicitly {@link s5g.game.proto.SlotResult.ArcadeCoinPusher.BonusHit.verify|verify} messages.
                         * @param message BonusHit message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: s5g.game.proto.SlotResult.ArcadeCoinPusher.IBonusHit, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Encodes the specified BonusHit message, length delimited. Does not implicitly {@link s5g.game.proto.SlotResult.ArcadeCoinPusher.BonusHit.verify|verify} messages.
                         * @param message BonusHit message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encodeDelimited(message: s5g.game.proto.SlotResult.ArcadeCoinPusher.IBonusHit, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a BonusHit message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns BonusHit
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.SlotResult.ArcadeCoinPusher.BonusHit;

                        /**
                         * Decodes a BonusHit message from the specified reader or buffer, length delimited.
                         * @param reader Reader or buffer to decode from
                         * @returns BonusHit
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.SlotResult.ArcadeCoinPusher.BonusHit;

                        /**
                         * Verifies a BonusHit message.
                         * @param message Plain object to verify
                         * @returns `null` if valid, otherwise the reason why it is not
                         */
                        public static verify(message: { [k: string]: any }): (string|null);

                        /**
                         * Creates a BonusHit message from a plain object. Also converts values to their respective internal types.
                         * @param object Plain object
                         * @returns BonusHit
                         */
                        public static fromObject(object: { [k: string]: any }): s5g.game.proto.SlotResult.ArcadeCoinPusher.BonusHit;

                        /**
                         * Creates a plain object from a BonusHit message. Also converts values to other types if specified.
                         * @param message BonusHit
                         * @param [options] Conversion options
                         * @returns Plain object
                         */
                        public static toObject(message: s5g.game.proto.SlotResult.ArcadeCoinPusher.BonusHit, options?: $protobuf.IConversionOptions): { [k: string]: any };

                        /**
                         * Converts this BonusHit to JSON.
                         * @returns JSON object
                         */
                        public toJSON(): { [k: string]: any };
                    }

                    /** Properties of an ExtraData. */
                    interface IExtraData {

                        /** ExtraData data */
                        data?: (number[]|null);
                    }

                    /** Represents an ExtraData. */
                    class ExtraData implements IExtraData {

                        /**
                         * Constructs a new ExtraData.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: s5g.game.proto.SlotResult.ArcadeCoinPusher.IExtraData);

                        /** ExtraData data. */
                        public data: number[];

                        /**
                         * Creates a new ExtraData instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns ExtraData instance
                         */
                        public static create(properties?: s5g.game.proto.SlotResult.ArcadeCoinPusher.IExtraData): s5g.game.proto.SlotResult.ArcadeCoinPusher.ExtraData;

                        /**
                         * Encodes the specified ExtraData message. Does not implicitly {@link s5g.game.proto.SlotResult.ArcadeCoinPusher.ExtraData.verify|verify} messages.
                         * @param message ExtraData message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: s5g.game.proto.SlotResult.ArcadeCoinPusher.IExtraData, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Encodes the specified ExtraData message, length delimited. Does not implicitly {@link s5g.game.proto.SlotResult.ArcadeCoinPusher.ExtraData.verify|verify} messages.
                         * @param message ExtraData message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encodeDelimited(message: s5g.game.proto.SlotResult.ArcadeCoinPusher.IExtraData, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes an ExtraData message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns ExtraData
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.SlotResult.ArcadeCoinPusher.ExtraData;

                        /**
                         * Decodes an ExtraData message from the specified reader or buffer, length delimited.
                         * @param reader Reader or buffer to decode from
                         * @returns ExtraData
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.SlotResult.ArcadeCoinPusher.ExtraData;

                        /**
                         * Verifies an ExtraData message.
                         * @param message Plain object to verify
                         * @returns `null` if valid, otherwise the reason why it is not
                         */
                        public static verify(message: { [k: string]: any }): (string|null);

                        /**
                         * Creates an ExtraData message from a plain object. Also converts values to their respective internal types.
                         * @param object Plain object
                         * @returns ExtraData
                         */
                        public static fromObject(object: { [k: string]: any }): s5g.game.proto.SlotResult.ArcadeCoinPusher.ExtraData;

                        /**
                         * Creates a plain object from an ExtraData message. Also converts values to other types if specified.
                         * @param message ExtraData
                         * @param [options] Conversion options
                         * @returns Plain object
                         */
                        public static toObject(message: s5g.game.proto.SlotResult.ArcadeCoinPusher.ExtraData, options?: $protobuf.IConversionOptions): { [k: string]: any };

                        /**
                         * Converts this ExtraData to JSON.
                         * @returns JSON object
                         */
                        public toJSON(): { [k: string]: any };
                    }
                }

                /** Properties of an ArcadeMonopoly. */
                interface IArcadeMonopoly {

                    /** ArcadeMonopoly light_bonus_rng */
                    light_bonus_rng?: (number[]|null);

                    /** ArcadeMonopoly win_line_group */
                    win_line_group?: (s5g.game.proto.SlotResult.IWinLine[]|null);

                    /** ArcadeMonopoly collect_slot */
                    collect_slot: s5g.game.proto.SlotResult.ArcadeMonopoly.ICollectSlot;

                    /** ArcadeMonopoly collect_anm */
                    collect_anm: s5g.game.proto.SlotResult.ArcadeMonopoly.ICollectAnm;

                    /** ArcadeMonopoly chance */
                    chance: s5g.game.proto.SlotResult.ArcadeMonopoly.IChance;

                    /** ArcadeMonopoly fortune */
                    fortune: s5g.game.proto.SlotResult.ArcadeMonopoly.IFortune;
                }

                /** Represents an ArcadeMonopoly. */
                class ArcadeMonopoly implements IArcadeMonopoly {

                    /**
                     * Constructs a new ArcadeMonopoly.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: s5g.game.proto.SlotResult.IArcadeMonopoly);

                    /** ArcadeMonopoly light_bonus_rng. */
                    public light_bonus_rng: number[];

                    /** ArcadeMonopoly win_line_group. */
                    public win_line_group: s5g.game.proto.SlotResult.IWinLine[];

                    /** ArcadeMonopoly collect_slot. */
                    public collect_slot: s5g.game.proto.SlotResult.ArcadeMonopoly.ICollectSlot;

                    /** ArcadeMonopoly collect_anm. */
                    public collect_anm: s5g.game.proto.SlotResult.ArcadeMonopoly.ICollectAnm;

                    /** ArcadeMonopoly chance. */
                    public chance: s5g.game.proto.SlotResult.ArcadeMonopoly.IChance;

                    /** ArcadeMonopoly fortune. */
                    public fortune: s5g.game.proto.SlotResult.ArcadeMonopoly.IFortune;

                    /**
                     * Creates a new ArcadeMonopoly instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns ArcadeMonopoly instance
                     */
                    public static create(properties?: s5g.game.proto.SlotResult.IArcadeMonopoly): s5g.game.proto.SlotResult.ArcadeMonopoly;

                    /**
                     * Encodes the specified ArcadeMonopoly message. Does not implicitly {@link s5g.game.proto.SlotResult.ArcadeMonopoly.verify|verify} messages.
                     * @param message ArcadeMonopoly message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: s5g.game.proto.SlotResult.IArcadeMonopoly, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified ArcadeMonopoly message, length delimited. Does not implicitly {@link s5g.game.proto.SlotResult.ArcadeMonopoly.verify|verify} messages.
                     * @param message ArcadeMonopoly message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: s5g.game.proto.SlotResult.IArcadeMonopoly, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes an ArcadeMonopoly message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns ArcadeMonopoly
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.SlotResult.ArcadeMonopoly;

                    /**
                     * Decodes an ArcadeMonopoly message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns ArcadeMonopoly
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.SlotResult.ArcadeMonopoly;

                    /**
                     * Verifies an ArcadeMonopoly message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates an ArcadeMonopoly message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns ArcadeMonopoly
                     */
                    public static fromObject(object: { [k: string]: any }): s5g.game.proto.SlotResult.ArcadeMonopoly;

                    /**
                     * Creates a plain object from an ArcadeMonopoly message. Also converts values to other types if specified.
                     * @param message ArcadeMonopoly
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: s5g.game.proto.SlotResult.ArcadeMonopoly, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this ArcadeMonopoly to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                namespace ArcadeMonopoly {

                    /** Properties of a CollectSlot. */
                    interface ICollectSlot {

                        /** CollectSlot bar */
                        bar: number;

                        /** CollectSlot enable */
                        enable: boolean;

                        /** CollectSlot pattern */
                        pattern?: (number[]|null);

                        /** CollectSlot pay */
                        pay: number;
                    }

                    /** Represents a CollectSlot. */
                    class CollectSlot implements ICollectSlot {

                        /**
                         * Constructs a new CollectSlot.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: s5g.game.proto.SlotResult.ArcadeMonopoly.ICollectSlot);

                        /** CollectSlot bar. */
                        public bar: number;

                        /** CollectSlot enable. */
                        public enable: boolean;

                        /** CollectSlot pattern. */
                        public pattern: number[];

                        /** CollectSlot pay. */
                        public pay: number;

                        /**
                         * Creates a new CollectSlot instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns CollectSlot instance
                         */
                        public static create(properties?: s5g.game.proto.SlotResult.ArcadeMonopoly.ICollectSlot): s5g.game.proto.SlotResult.ArcadeMonopoly.CollectSlot;

                        /**
                         * Encodes the specified CollectSlot message. Does not implicitly {@link s5g.game.proto.SlotResult.ArcadeMonopoly.CollectSlot.verify|verify} messages.
                         * @param message CollectSlot message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: s5g.game.proto.SlotResult.ArcadeMonopoly.ICollectSlot, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Encodes the specified CollectSlot message, length delimited. Does not implicitly {@link s5g.game.proto.SlotResult.ArcadeMonopoly.CollectSlot.verify|verify} messages.
                         * @param message CollectSlot message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encodeDelimited(message: s5g.game.proto.SlotResult.ArcadeMonopoly.ICollectSlot, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a CollectSlot message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns CollectSlot
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.SlotResult.ArcadeMonopoly.CollectSlot;

                        /**
                         * Decodes a CollectSlot message from the specified reader or buffer, length delimited.
                         * @param reader Reader or buffer to decode from
                         * @returns CollectSlot
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.SlotResult.ArcadeMonopoly.CollectSlot;

                        /**
                         * Verifies a CollectSlot message.
                         * @param message Plain object to verify
                         * @returns `null` if valid, otherwise the reason why it is not
                         */
                        public static verify(message: { [k: string]: any }): (string|null);

                        /**
                         * Creates a CollectSlot message from a plain object. Also converts values to their respective internal types.
                         * @param object Plain object
                         * @returns CollectSlot
                         */
                        public static fromObject(object: { [k: string]: any }): s5g.game.proto.SlotResult.ArcadeMonopoly.CollectSlot;

                        /**
                         * Creates a plain object from a CollectSlot message. Also converts values to other types if specified.
                         * @param message CollectSlot
                         * @param [options] Conversion options
                         * @returns Plain object
                         */
                        public static toObject(message: s5g.game.proto.SlotResult.ArcadeMonopoly.CollectSlot, options?: $protobuf.IConversionOptions): { [k: string]: any };

                        /**
                         * Converts this CollectSlot to JSON.
                         * @returns JSON object
                         */
                        public toJSON(): { [k: string]: any };
                    }

                    /** Properties of a CollectAnm. */
                    interface ICollectAnm {

                        /** CollectAnm bar */
                        bar: number;

                        /** CollectAnm enable */
                        enable: boolean;

                        /** CollectAnm type */
                        type: number;

                        /** CollectAnm multiplier */
                        multiplier: number;

                        /** CollectAnm pay */
                        pay: number;
                    }

                    /** Represents a CollectAnm. */
                    class CollectAnm implements ICollectAnm {

                        /**
                         * Constructs a new CollectAnm.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: s5g.game.proto.SlotResult.ArcadeMonopoly.ICollectAnm);

                        /** CollectAnm bar. */
                        public bar: number;

                        /** CollectAnm enable. */
                        public enable: boolean;

                        /** CollectAnm type. */
                        public type: number;

                        /** CollectAnm multiplier. */
                        public multiplier: number;

                        /** CollectAnm pay. */
                        public pay: number;

                        /**
                         * Creates a new CollectAnm instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns CollectAnm instance
                         */
                        public static create(properties?: s5g.game.proto.SlotResult.ArcadeMonopoly.ICollectAnm): s5g.game.proto.SlotResult.ArcadeMonopoly.CollectAnm;

                        /**
                         * Encodes the specified CollectAnm message. Does not implicitly {@link s5g.game.proto.SlotResult.ArcadeMonopoly.CollectAnm.verify|verify} messages.
                         * @param message CollectAnm message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: s5g.game.proto.SlotResult.ArcadeMonopoly.ICollectAnm, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Encodes the specified CollectAnm message, length delimited. Does not implicitly {@link s5g.game.proto.SlotResult.ArcadeMonopoly.CollectAnm.verify|verify} messages.
                         * @param message CollectAnm message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encodeDelimited(message: s5g.game.proto.SlotResult.ArcadeMonopoly.ICollectAnm, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a CollectAnm message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns CollectAnm
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.SlotResult.ArcadeMonopoly.CollectAnm;

                        /**
                         * Decodes a CollectAnm message from the specified reader or buffer, length delimited.
                         * @param reader Reader or buffer to decode from
                         * @returns CollectAnm
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.SlotResult.ArcadeMonopoly.CollectAnm;

                        /**
                         * Verifies a CollectAnm message.
                         * @param message Plain object to verify
                         * @returns `null` if valid, otherwise the reason why it is not
                         */
                        public static verify(message: { [k: string]: any }): (string|null);

                        /**
                         * Creates a CollectAnm message from a plain object. Also converts values to their respective internal types.
                         * @param object Plain object
                         * @returns CollectAnm
                         */
                        public static fromObject(object: { [k: string]: any }): s5g.game.proto.SlotResult.ArcadeMonopoly.CollectAnm;

                        /**
                         * Creates a plain object from a CollectAnm message. Also converts values to other types if specified.
                         * @param message CollectAnm
                         * @param [options] Conversion options
                         * @returns Plain object
                         */
                        public static toObject(message: s5g.game.proto.SlotResult.ArcadeMonopoly.CollectAnm, options?: $protobuf.IConversionOptions): { [k: string]: any };

                        /**
                         * Converts this CollectAnm to JSON.
                         * @returns JSON object
                         */
                        public toJSON(): { [k: string]: any };
                    }

                    /** Properties of a Chance. */
                    interface IChance {

                        /** Chance type */
                        type: number;
                    }

                    /** Represents a Chance. */
                    class Chance implements IChance {

                        /**
                         * Constructs a new Chance.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: s5g.game.proto.SlotResult.ArcadeMonopoly.IChance);

                        /** Chance type. */
                        public type: number;

                        /**
                         * Creates a new Chance instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns Chance instance
                         */
                        public static create(properties?: s5g.game.proto.SlotResult.ArcadeMonopoly.IChance): s5g.game.proto.SlotResult.ArcadeMonopoly.Chance;

                        /**
                         * Encodes the specified Chance message. Does not implicitly {@link s5g.game.proto.SlotResult.ArcadeMonopoly.Chance.verify|verify} messages.
                         * @param message Chance message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: s5g.game.proto.SlotResult.ArcadeMonopoly.IChance, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Encodes the specified Chance message, length delimited. Does not implicitly {@link s5g.game.proto.SlotResult.ArcadeMonopoly.Chance.verify|verify} messages.
                         * @param message Chance message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encodeDelimited(message: s5g.game.proto.SlotResult.ArcadeMonopoly.IChance, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a Chance message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns Chance
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.SlotResult.ArcadeMonopoly.Chance;

                        /**
                         * Decodes a Chance message from the specified reader or buffer, length delimited.
                         * @param reader Reader or buffer to decode from
                         * @returns Chance
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.SlotResult.ArcadeMonopoly.Chance;

                        /**
                         * Verifies a Chance message.
                         * @param message Plain object to verify
                         * @returns `null` if valid, otherwise the reason why it is not
                         */
                        public static verify(message: { [k: string]: any }): (string|null);

                        /**
                         * Creates a Chance message from a plain object. Also converts values to their respective internal types.
                         * @param object Plain object
                         * @returns Chance
                         */
                        public static fromObject(object: { [k: string]: any }): s5g.game.proto.SlotResult.ArcadeMonopoly.Chance;

                        /**
                         * Creates a plain object from a Chance message. Also converts values to other types if specified.
                         * @param message Chance
                         * @param [options] Conversion options
                         * @returns Plain object
                         */
                        public static toObject(message: s5g.game.proto.SlotResult.ArcadeMonopoly.Chance, options?: $protobuf.IConversionOptions): { [k: string]: any };

                        /**
                         * Converts this Chance to JSON.
                         * @returns JSON object
                         */
                        public toJSON(): { [k: string]: any };
                    }

                    /** Properties of a Fortune. */
                    interface IFortune {

                        /** Fortune type */
                        type: number;

                        /** Fortune multiplier */
                        multiplier: number;

                        /** Fortune pos */
                        pos?: (number[]|null);
                    }

                    /** Represents a Fortune. */
                    class Fortune implements IFortune {

                        /**
                         * Constructs a new Fortune.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: s5g.game.proto.SlotResult.ArcadeMonopoly.IFortune);

                        /** Fortune type. */
                        public type: number;

                        /** Fortune multiplier. */
                        public multiplier: number;

                        /** Fortune pos. */
                        public pos: number[];

                        /**
                         * Creates a new Fortune instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns Fortune instance
                         */
                        public static create(properties?: s5g.game.proto.SlotResult.ArcadeMonopoly.IFortune): s5g.game.proto.SlotResult.ArcadeMonopoly.Fortune;

                        /**
                         * Encodes the specified Fortune message. Does not implicitly {@link s5g.game.proto.SlotResult.ArcadeMonopoly.Fortune.verify|verify} messages.
                         * @param message Fortune message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: s5g.game.proto.SlotResult.ArcadeMonopoly.IFortune, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Encodes the specified Fortune message, length delimited. Does not implicitly {@link s5g.game.proto.SlotResult.ArcadeMonopoly.Fortune.verify|verify} messages.
                         * @param message Fortune message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encodeDelimited(message: s5g.game.proto.SlotResult.ArcadeMonopoly.IFortune, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a Fortune message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns Fortune
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.SlotResult.ArcadeMonopoly.Fortune;

                        /**
                         * Decodes a Fortune message from the specified reader or buffer, length delimited.
                         * @param reader Reader or buffer to decode from
                         * @returns Fortune
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.SlotResult.ArcadeMonopoly.Fortune;

                        /**
                         * Verifies a Fortune message.
                         * @param message Plain object to verify
                         * @returns `null` if valid, otherwise the reason why it is not
                         */
                        public static verify(message: { [k: string]: any }): (string|null);

                        /**
                         * Creates a Fortune message from a plain object. Also converts values to their respective internal types.
                         * @param object Plain object
                         * @returns Fortune
                         */
                        public static fromObject(object: { [k: string]: any }): s5g.game.proto.SlotResult.ArcadeMonopoly.Fortune;

                        /**
                         * Creates a plain object from a Fortune message. Also converts values to other types if specified.
                         * @param message Fortune
                         * @param [options] Conversion options
                         * @returns Plain object
                         */
                        public static toObject(message: s5g.game.proto.SlotResult.ArcadeMonopoly.Fortune, options?: $protobuf.IConversionOptions): { [k: string]: any };

                        /**
                         * Converts this Fortune to JSON.
                         * @returns JSON object
                         */
                        public toJSON(): { [k: string]: any };
                    }
                }

                /** Properties of a VillageInfor. */
                interface IVillageInfor {

                    /** VillageInfor player_id */
                    player_id?: (string|null);

                    /** VillageInfor player_level */
                    player_level?: (number|null);

                    /** VillageInfor virtual_coin */
                    virtual_coin?: (number|null);

                    /** VillageInfor shield_value */
                    shield_value?: (number|null);

                    /** VillageInfor gain_coin */
                    gain_coin?: (number|null);

                    /** VillageInfor steal_player_id */
                    steal_player_id?: (string|null);

                    /** VillageInfor steal_gain_non_player_bet */
                    steal_gain_non_player_bet?: (number|null);

                    /** VillageInfor is_get_shield */
                    is_get_shield?: (boolean|null);

                    /** VillageInfor fighter_value */
                    fighter_value?: (number|null);

                    /** VillageInfor house_level */
                    house_level?: (number[]|null);

                    /** VillageInfor house_update_cost */
                    house_update_cost?: (number[]|null);

                    /** VillageInfor house_repair_cost */
                    house_repair_cost?: (number[]|null);

                    /** VillageInfor next_era_update */
                    next_era_update?: (number|null);

                    /** VillageInfor attack_info */
                    attack_info?: (s5g.game.proto.SlotResult.VillageInfor.IAttackInfo[]|null);

                    /** VillageInfor steal_info */
                    steal_info?: (s5g.game.proto.SlotResult.VillageInfor.IStealInfo|null);

                    /** VillageInfor news_info */
                    news_info?: (s5g.game.proto.SlotResult.VillageInfor.INewsInfo[]|null);
                }

                /** Represents a VillageInfor. */
                class VillageInfor implements IVillageInfor {

                    /**
                     * Constructs a new VillageInfor.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: s5g.game.proto.SlotResult.IVillageInfor);

                    /** VillageInfor player_id. */
                    public player_id: string;

                    /** VillageInfor player_level. */
                    public player_level: number;

                    /** VillageInfor virtual_coin. */
                    public virtual_coin: number;

                    /** VillageInfor shield_value. */
                    public shield_value: number;

                    /** VillageInfor gain_coin. */
                    public gain_coin: number;

                    /** VillageInfor steal_player_id. */
                    public steal_player_id: string;

                    /** VillageInfor steal_gain_non_player_bet. */
                    public steal_gain_non_player_bet: number;

                    /** VillageInfor is_get_shield. */
                    public is_get_shield: boolean;

                    /** VillageInfor fighter_value. */
                    public fighter_value: number;

                    /** VillageInfor house_level. */
                    public house_level: number[];

                    /** VillageInfor house_update_cost. */
                    public house_update_cost: number[];

                    /** VillageInfor house_repair_cost. */
                    public house_repair_cost: number[];

                    /** VillageInfor next_era_update. */
                    public next_era_update: number;

                    /** VillageInfor attack_info. */
                    public attack_info: s5g.game.proto.SlotResult.VillageInfor.IAttackInfo[];

                    /** VillageInfor steal_info. */
                    public steal_info?: (s5g.game.proto.SlotResult.VillageInfor.IStealInfo|null);

                    /** VillageInfor news_info. */
                    public news_info: s5g.game.proto.SlotResult.VillageInfor.INewsInfo[];

                    /**
                     * Creates a new VillageInfor instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns VillageInfor instance
                     */
                    public static create(properties?: s5g.game.proto.SlotResult.IVillageInfor): s5g.game.proto.SlotResult.VillageInfor;

                    /**
                     * Encodes the specified VillageInfor message. Does not implicitly {@link s5g.game.proto.SlotResult.VillageInfor.verify|verify} messages.
                     * @param message VillageInfor message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: s5g.game.proto.SlotResult.IVillageInfor, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified VillageInfor message, length delimited. Does not implicitly {@link s5g.game.proto.SlotResult.VillageInfor.verify|verify} messages.
                     * @param message VillageInfor message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: s5g.game.proto.SlotResult.IVillageInfor, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a VillageInfor message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns VillageInfor
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.SlotResult.VillageInfor;

                    /**
                     * Decodes a VillageInfor message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns VillageInfor
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.SlotResult.VillageInfor;

                    /**
                     * Verifies a VillageInfor message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a VillageInfor message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns VillageInfor
                     */
                    public static fromObject(object: { [k: string]: any }): s5g.game.proto.SlotResult.VillageInfor;

                    /**
                     * Creates a plain object from a VillageInfor message. Also converts values to other types if specified.
                     * @param message VillageInfor
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: s5g.game.proto.SlotResult.VillageInfor, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this VillageInfor to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                namespace VillageInfor {

                    /** Properties of an AttackInfo. */
                    interface IAttackInfo {

                        /** AttackInfo id */
                        id?: (string|null);

                        /** AttackInfo level */
                        level?: (number|null);

                        /** AttackInfo house_level */
                        house_level?: (number[]|null);

                        /** AttackInfo house_repair_cost */
                        house_repair_cost?: (number[]|null);
                    }

                    /** Represents an AttackInfo. */
                    class AttackInfo implements IAttackInfo {

                        /**
                         * Constructs a new AttackInfo.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: s5g.game.proto.SlotResult.VillageInfor.IAttackInfo);

                        /** AttackInfo id. */
                        public id: string;

                        /** AttackInfo level. */
                        public level: number;

                        /** AttackInfo house_level. */
                        public house_level: number[];

                        /** AttackInfo house_repair_cost. */
                        public house_repair_cost: number[];

                        /**
                         * Creates a new AttackInfo instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns AttackInfo instance
                         */
                        public static create(properties?: s5g.game.proto.SlotResult.VillageInfor.IAttackInfo): s5g.game.proto.SlotResult.VillageInfor.AttackInfo;

                        /**
                         * Encodes the specified AttackInfo message. Does not implicitly {@link s5g.game.proto.SlotResult.VillageInfor.AttackInfo.verify|verify} messages.
                         * @param message AttackInfo message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: s5g.game.proto.SlotResult.VillageInfor.IAttackInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Encodes the specified AttackInfo message, length delimited. Does not implicitly {@link s5g.game.proto.SlotResult.VillageInfor.AttackInfo.verify|verify} messages.
                         * @param message AttackInfo message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encodeDelimited(message: s5g.game.proto.SlotResult.VillageInfor.IAttackInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes an AttackInfo message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns AttackInfo
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.SlotResult.VillageInfor.AttackInfo;

                        /**
                         * Decodes an AttackInfo message from the specified reader or buffer, length delimited.
                         * @param reader Reader or buffer to decode from
                         * @returns AttackInfo
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.SlotResult.VillageInfor.AttackInfo;

                        /**
                         * Verifies an AttackInfo message.
                         * @param message Plain object to verify
                         * @returns `null` if valid, otherwise the reason why it is not
                         */
                        public static verify(message: { [k: string]: any }): (string|null);

                        /**
                         * Creates an AttackInfo message from a plain object. Also converts values to their respective internal types.
                         * @param object Plain object
                         * @returns AttackInfo
                         */
                        public static fromObject(object: { [k: string]: any }): s5g.game.proto.SlotResult.VillageInfor.AttackInfo;

                        /**
                         * Creates a plain object from an AttackInfo message. Also converts values to other types if specified.
                         * @param message AttackInfo
                         * @param [options] Conversion options
                         * @returns Plain object
                         */
                        public static toObject(message: s5g.game.proto.SlotResult.VillageInfor.AttackInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

                        /**
                         * Converts this AttackInfo to JSON.
                         * @returns JSON object
                         */
                        public toJSON(): { [k: string]: any };
                    }

                    /** Properties of a StealInfo. */
                    interface IStealInfo {

                        /** StealInfo id */
                        id?: (string|null);

                        /** StealInfo level */
                        level?: (number|null);

                        /** StealInfo dig_pay */
                        dig_pay?: (number[]|null);

                        /** StealInfo dig_virtual_coin */
                        dig_virtual_coin?: (number[]|null);
                    }

                    /** Represents a StealInfo. */
                    class StealInfo implements IStealInfo {

                        /**
                         * Constructs a new StealInfo.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: s5g.game.proto.SlotResult.VillageInfor.IStealInfo);

                        /** StealInfo id. */
                        public id: string;

                        /** StealInfo level. */
                        public level: number;

                        /** StealInfo dig_pay. */
                        public dig_pay: number[];

                        /** StealInfo dig_virtual_coin. */
                        public dig_virtual_coin: number[];

                        /**
                         * Creates a new StealInfo instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns StealInfo instance
                         */
                        public static create(properties?: s5g.game.proto.SlotResult.VillageInfor.IStealInfo): s5g.game.proto.SlotResult.VillageInfor.StealInfo;

                        /**
                         * Encodes the specified StealInfo message. Does not implicitly {@link s5g.game.proto.SlotResult.VillageInfor.StealInfo.verify|verify} messages.
                         * @param message StealInfo message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: s5g.game.proto.SlotResult.VillageInfor.IStealInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Encodes the specified StealInfo message, length delimited. Does not implicitly {@link s5g.game.proto.SlotResult.VillageInfor.StealInfo.verify|verify} messages.
                         * @param message StealInfo message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encodeDelimited(message: s5g.game.proto.SlotResult.VillageInfor.IStealInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a StealInfo message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns StealInfo
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.SlotResult.VillageInfor.StealInfo;

                        /**
                         * Decodes a StealInfo message from the specified reader or buffer, length delimited.
                         * @param reader Reader or buffer to decode from
                         * @returns StealInfo
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.SlotResult.VillageInfor.StealInfo;

                        /**
                         * Verifies a StealInfo message.
                         * @param message Plain object to verify
                         * @returns `null` if valid, otherwise the reason why it is not
                         */
                        public static verify(message: { [k: string]: any }): (string|null);

                        /**
                         * Creates a StealInfo message from a plain object. Also converts values to their respective internal types.
                         * @param object Plain object
                         * @returns StealInfo
                         */
                        public static fromObject(object: { [k: string]: any }): s5g.game.proto.SlotResult.VillageInfor.StealInfo;

                        /**
                         * Creates a plain object from a StealInfo message. Also converts values to other types if specified.
                         * @param message StealInfo
                         * @param [options] Conversion options
                         * @returns Plain object
                         */
                        public static toObject(message: s5g.game.proto.SlotResult.VillageInfor.StealInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

                        /**
                         * Converts this StealInfo to JSON.
                         * @returns JSON object
                         */
                        public toJSON(): { [k: string]: any };
                    }

                    /** Properties of a NewsInfo. */
                    interface INewsInfo {

                        /** NewsInfo type */
                        type?: (number|null);

                        /** NewsInfo id */
                        id?: (string|null);

                        /** NewsInfo pay */
                        pay?: (number|null);

                        /** NewsInfo game_time */
                        game_time?: (string|null);
                    }

                    /** Represents a NewsInfo. */
                    class NewsInfo implements INewsInfo {

                        /**
                         * Constructs a new NewsInfo.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: s5g.game.proto.SlotResult.VillageInfor.INewsInfo);

                        /** NewsInfo type. */
                        public type: number;

                        /** NewsInfo id. */
                        public id: string;

                        /** NewsInfo pay. */
                        public pay: number;

                        /** NewsInfo game_time. */
                        public game_time: string;

                        /**
                         * Creates a new NewsInfo instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns NewsInfo instance
                         */
                        public static create(properties?: s5g.game.proto.SlotResult.VillageInfor.INewsInfo): s5g.game.proto.SlotResult.VillageInfor.NewsInfo;

                        /**
                         * Encodes the specified NewsInfo message. Does not implicitly {@link s5g.game.proto.SlotResult.VillageInfor.NewsInfo.verify|verify} messages.
                         * @param message NewsInfo message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: s5g.game.proto.SlotResult.VillageInfor.INewsInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Encodes the specified NewsInfo message, length delimited. Does not implicitly {@link s5g.game.proto.SlotResult.VillageInfor.NewsInfo.verify|verify} messages.
                         * @param message NewsInfo message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encodeDelimited(message: s5g.game.proto.SlotResult.VillageInfor.INewsInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a NewsInfo message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns NewsInfo
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.SlotResult.VillageInfor.NewsInfo;

                        /**
                         * Decodes a NewsInfo message from the specified reader or buffer, length delimited.
                         * @param reader Reader or buffer to decode from
                         * @returns NewsInfo
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.SlotResult.VillageInfor.NewsInfo;

                        /**
                         * Verifies a NewsInfo message.
                         * @param message Plain object to verify
                         * @returns `null` if valid, otherwise the reason why it is not
                         */
                        public static verify(message: { [k: string]: any }): (string|null);

                        /**
                         * Creates a NewsInfo message from a plain object. Also converts values to their respective internal types.
                         * @param object Plain object
                         * @returns NewsInfo
                         */
                        public static fromObject(object: { [k: string]: any }): s5g.game.proto.SlotResult.VillageInfor.NewsInfo;

                        /**
                         * Creates a plain object from a NewsInfo message. Also converts values to other types if specified.
                         * @param message NewsInfo
                         * @param [options] Conversion options
                         * @returns Plain object
                         */
                        public static toObject(message: s5g.game.proto.SlotResult.VillageInfor.NewsInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

                        /**
                         * Converts this NewsInfo to JSON.
                         * @returns JSON object
                         */
                        public toJSON(): { [k: string]: any };
                    }
                }

                /** Properties of an ArcadeFootBall. */
                interface IArcadeFootBall {

                    /** ArcadeFootBall next_game_Combination */
                    next_game_Combination?: (s5g.game.proto.SlotResult.ArcadeFootBall.ICombination[]|null);

                    /** ArcadeFootBall arcad_unit */
                    arcad_unit?: (number|null);

                    /** ArcadeFootBall bet_maximum */
                    bet_maximum?: (number|null);

                    /** ArcadeFootBall bet_minimum */
                    bet_minimum?: (number|null);

                    /** ArcadeFootBall video_url_prefix */
                    video_url_prefix?: (string|null);

                    /** ArcadeFootBall video_url_foldername */
                    video_url_foldername?: (string|null);

                    /** ArcadeFootBall win_pay */
                    win_pay?: (number|null);
                }

                /** Represents an ArcadeFootBall. */
                class ArcadeFootBall implements IArcadeFootBall {

                    /**
                     * Constructs a new ArcadeFootBall.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: s5g.game.proto.SlotResult.IArcadeFootBall);

                    /** ArcadeFootBall next_game_Combination. */
                    public next_game_Combination: s5g.game.proto.SlotResult.ArcadeFootBall.ICombination[];

                    /** ArcadeFootBall arcad_unit. */
                    public arcad_unit: number;

                    /** ArcadeFootBall bet_maximum. */
                    public bet_maximum: number;

                    /** ArcadeFootBall bet_minimum. */
                    public bet_minimum: number;

                    /** ArcadeFootBall video_url_prefix. */
                    public video_url_prefix: string;

                    /** ArcadeFootBall video_url_foldername. */
                    public video_url_foldername: string;

                    /** ArcadeFootBall win_pay. */
                    public win_pay: number;

                    /**
                     * Creates a new ArcadeFootBall instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns ArcadeFootBall instance
                     */
                    public static create(properties?: s5g.game.proto.SlotResult.IArcadeFootBall): s5g.game.proto.SlotResult.ArcadeFootBall;

                    /**
                     * Encodes the specified ArcadeFootBall message. Does not implicitly {@link s5g.game.proto.SlotResult.ArcadeFootBall.verify|verify} messages.
                     * @param message ArcadeFootBall message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: s5g.game.proto.SlotResult.IArcadeFootBall, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified ArcadeFootBall message, length delimited. Does not implicitly {@link s5g.game.proto.SlotResult.ArcadeFootBall.verify|verify} messages.
                     * @param message ArcadeFootBall message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: s5g.game.proto.SlotResult.IArcadeFootBall, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes an ArcadeFootBall message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns ArcadeFootBall
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.SlotResult.ArcadeFootBall;

                    /**
                     * Decodes an ArcadeFootBall message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns ArcadeFootBall
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.SlotResult.ArcadeFootBall;

                    /**
                     * Verifies an ArcadeFootBall message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates an ArcadeFootBall message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns ArcadeFootBall
                     */
                    public static fromObject(object: { [k: string]: any }): s5g.game.proto.SlotResult.ArcadeFootBall;

                    /**
                     * Creates a plain object from an ArcadeFootBall message. Also converts values to other types if specified.
                     * @param message ArcadeFootBall
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: s5g.game.proto.SlotResult.ArcadeFootBall, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this ArcadeFootBall to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                namespace ArcadeFootBall {

                    /** Properties of a Combination. */
                    interface ICombination {

                        /** Combination game_num */
                        game_num?: (number|null);

                        /** Combination home_id */
                        home_id?: (number|null);

                        /** Combination away_id */
                        away_id?: (number|null);

                        /** Combination home_name */
                        home_name?: (string|null);

                        /** Combination away_name */
                        away_name?: (string|null);

                        /** Combination home_odds */
                        home_odds?: (number|null);

                        /** Combination away_odds */
                        away_odds?: (number|null);

                        /** Combination tie_odds */
                        tie_odds?: (number|null);
                    }

                    /** Represents a Combination. */
                    class Combination implements ICombination {

                        /**
                         * Constructs a new Combination.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: s5g.game.proto.SlotResult.ArcadeFootBall.ICombination);

                        /** Combination game_num. */
                        public game_num: number;

                        /** Combination home_id. */
                        public home_id: number;

                        /** Combination away_id. */
                        public away_id: number;

                        /** Combination home_name. */
                        public home_name: string;

                        /** Combination away_name. */
                        public away_name: string;

                        /** Combination home_odds. */
                        public home_odds: number;

                        /** Combination away_odds. */
                        public away_odds: number;

                        /** Combination tie_odds. */
                        public tie_odds: number;

                        /**
                         * Creates a new Combination instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns Combination instance
                         */
                        public static create(properties?: s5g.game.proto.SlotResult.ArcadeFootBall.ICombination): s5g.game.proto.SlotResult.ArcadeFootBall.Combination;

                        /**
                         * Encodes the specified Combination message. Does not implicitly {@link s5g.game.proto.SlotResult.ArcadeFootBall.Combination.verify|verify} messages.
                         * @param message Combination message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: s5g.game.proto.SlotResult.ArcadeFootBall.ICombination, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Encodes the specified Combination message, length delimited. Does not implicitly {@link s5g.game.proto.SlotResult.ArcadeFootBall.Combination.verify|verify} messages.
                         * @param message Combination message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encodeDelimited(message: s5g.game.proto.SlotResult.ArcadeFootBall.ICombination, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a Combination message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns Combination
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.SlotResult.ArcadeFootBall.Combination;

                        /**
                         * Decodes a Combination message from the specified reader or buffer, length delimited.
                         * @param reader Reader or buffer to decode from
                         * @returns Combination
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.SlotResult.ArcadeFootBall.Combination;

                        /**
                         * Verifies a Combination message.
                         * @param message Plain object to verify
                         * @returns `null` if valid, otherwise the reason why it is not
                         */
                        public static verify(message: { [k: string]: any }): (string|null);

                        /**
                         * Creates a Combination message from a plain object. Also converts values to their respective internal types.
                         * @param object Plain object
                         * @returns Combination
                         */
                        public static fromObject(object: { [k: string]: any }): s5g.game.proto.SlotResult.ArcadeFootBall.Combination;

                        /**
                         * Creates a plain object from a Combination message. Also converts values to other types if specified.
                         * @param message Combination
                         * @param [options] Conversion options
                         * @returns Plain object
                         */
                        public static toObject(message: s5g.game.proto.SlotResult.ArcadeFootBall.Combination, options?: $protobuf.IConversionOptions): { [k: string]: any };

                        /**
                         * Converts this Combination to JSON.
                         * @returns JSON object
                         */
                        public toJSON(): { [k: string]: any };
                    }
                }

                /** Properties of an ArcadeTamagotchi. */
                interface IArcadeTamagotchi {

                    /** ArcadeTamagotchi virtual_coin */
                    virtual_coin?: (number|null);

                    /** ArcadeTamagotchi egg_amount */
                    egg_amount?: (number|null);

                    /** ArcadeTamagotchi food_amount */
                    food_amount?: (number|null);

                    /** ArcadeTamagotchi incubation_eggs_id */
                    incubation_eggs_id?: (number[]|null);

                    /** ArcadeTamagotchi incubation_eggs_price */
                    incubation_eggs_price?: (number[]|null);

                    /** ArcadeTamagotchi Dinosaurs_data */
                    Dinosaurs_data?: (s5g.game.proto.SlotResult.ArcadeTamagotchi.IDinosaurInfo[]|null);

                    /** ArcadeTamagotchi Area_data */
                    Area_data?: (s5g.game.proto.SlotResult.ArcadeTamagotchi.IAreaInfo[]|null);

                    /** ArcadeTamagotchi Favorability_data */
                    Favorability_data?: (s5g.game.proto.SlotResult.ArcadeTamagotchi.IFavorabilityInfo|null);

                    /** ArcadeTamagotchi Feed_return_data */
                    Feed_return_data?: (s5g.game.proto.SlotResult.ArcadeTamagotchi.IFeedInfo|null);

                    /** ArcadeTamagotchi sell_dinosaur_pay */
                    sell_dinosaur_pay?: (number|null);

                    /** ArcadeTamagotchi sub_game_data */
                    sub_game_data?: (s5g.game.proto.SlotResult.ArcadeTamagotchi.ISubgameInfo|null);

                    /** ArcadeTamagotchi News_data */
                    News_data?: (s5g.game.proto.SlotResult.ArcadeTamagotchi.INewsInfo[]|null);

                    /** ArcadeTamagotchi Dead_data */
                    Dead_data?: (s5g.game.proto.SlotResult.ArcadeTamagotchi.IDinosaurInfo[]|null);
                }

                /** Represents an ArcadeTamagotchi. */
                class ArcadeTamagotchi implements IArcadeTamagotchi {

                    /**
                     * Constructs a new ArcadeTamagotchi.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: s5g.game.proto.SlotResult.IArcadeTamagotchi);

                    /** ArcadeTamagotchi virtual_coin. */
                    public virtual_coin: number;

                    /** ArcadeTamagotchi egg_amount. */
                    public egg_amount: number;

                    /** ArcadeTamagotchi food_amount. */
                    public food_amount: number;

                    /** ArcadeTamagotchi incubation_eggs_id. */
                    public incubation_eggs_id: number[];

                    /** ArcadeTamagotchi incubation_eggs_price. */
                    public incubation_eggs_price: number[];

                    /** ArcadeTamagotchi Dinosaurs_data. */
                    public Dinosaurs_data: s5g.game.proto.SlotResult.ArcadeTamagotchi.IDinosaurInfo[];

                    /** ArcadeTamagotchi Area_data. */
                    public Area_data: s5g.game.proto.SlotResult.ArcadeTamagotchi.IAreaInfo[];

                    /** ArcadeTamagotchi Favorability_data. */
                    public Favorability_data?: (s5g.game.proto.SlotResult.ArcadeTamagotchi.IFavorabilityInfo|null);

                    /** ArcadeTamagotchi Feed_return_data. */
                    public Feed_return_data?: (s5g.game.proto.SlotResult.ArcadeTamagotchi.IFeedInfo|null);

                    /** ArcadeTamagotchi sell_dinosaur_pay. */
                    public sell_dinosaur_pay: number;

                    /** ArcadeTamagotchi sub_game_data. */
                    public sub_game_data?: (s5g.game.proto.SlotResult.ArcadeTamagotchi.ISubgameInfo|null);

                    /** ArcadeTamagotchi News_data. */
                    public News_data: s5g.game.proto.SlotResult.ArcadeTamagotchi.INewsInfo[];

                    /** ArcadeTamagotchi Dead_data. */
                    public Dead_data: s5g.game.proto.SlotResult.ArcadeTamagotchi.IDinosaurInfo[];

                    /**
                     * Creates a new ArcadeTamagotchi instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns ArcadeTamagotchi instance
                     */
                    public static create(properties?: s5g.game.proto.SlotResult.IArcadeTamagotchi): s5g.game.proto.SlotResult.ArcadeTamagotchi;

                    /**
                     * Encodes the specified ArcadeTamagotchi message. Does not implicitly {@link s5g.game.proto.SlotResult.ArcadeTamagotchi.verify|verify} messages.
                     * @param message ArcadeTamagotchi message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: s5g.game.proto.SlotResult.IArcadeTamagotchi, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified ArcadeTamagotchi message, length delimited. Does not implicitly {@link s5g.game.proto.SlotResult.ArcadeTamagotchi.verify|verify} messages.
                     * @param message ArcadeTamagotchi message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: s5g.game.proto.SlotResult.IArcadeTamagotchi, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes an ArcadeTamagotchi message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns ArcadeTamagotchi
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.SlotResult.ArcadeTamagotchi;

                    /**
                     * Decodes an ArcadeTamagotchi message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns ArcadeTamagotchi
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.SlotResult.ArcadeTamagotchi;

                    /**
                     * Verifies an ArcadeTamagotchi message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates an ArcadeTamagotchi message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns ArcadeTamagotchi
                     */
                    public static fromObject(object: { [k: string]: any }): s5g.game.proto.SlotResult.ArcadeTamagotchi;

                    /**
                     * Creates a plain object from an ArcadeTamagotchi message. Also converts values to other types if specified.
                     * @param message ArcadeTamagotchi
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: s5g.game.proto.SlotResult.ArcadeTamagotchi, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this ArcadeTamagotchi to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                namespace ArcadeTamagotchi {

                    /** Properties of a DinosaurInfo. */
                    interface IDinosaurInfo {

                        /** DinosaurInfo id */
                        id?: (number|null);

                        /** DinosaurInfo areaNO */
                        areaNO?: (number|null);

                        /** DinosaurInfo type */
                        type?: (number|null);

                        /** DinosaurInfo star */
                        star?: (number|null);

                        /** DinosaurInfo rarity */
                        rarity?: (number|null);

                        /** DinosaurInfo rank */
                        rank?: (number|null);

                        /** DinosaurInfo price */
                        price?: (number|null);

                        /** DinosaurInfo satiation */
                        satiation?: (number|null);

                        /** DinosaurInfo satiation_max */
                        satiation_max?: (number|null);

                        /** DinosaurInfo favorability */
                        favorability?: (number|null);

                        /** DinosaurInfo favorability_max */
                        favorability_max?: (number|null);

                        /** DinosaurInfo get_sick */
                        get_sick?: (boolean|null);

                        /** DinosaurInfo get_dirty */
                        get_dirty?: (boolean|null);

                        /** DinosaurInfo alive */
                        alive?: (boolean|null);

                        /** DinosaurInfo rise */
                        rise?: (boolean|null);

                        /** DinosaurInfo skin_type */
                        skin_type?: (number|null);

                        /** DinosaurInfo remain_time */
                        remain_time?: (string|null);
                    }

                    /** Represents a DinosaurInfo. */
                    class DinosaurInfo implements IDinosaurInfo {

                        /**
                         * Constructs a new DinosaurInfo.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: s5g.game.proto.SlotResult.ArcadeTamagotchi.IDinosaurInfo);

                        /** DinosaurInfo id. */
                        public id: number;

                        /** DinosaurInfo areaNO. */
                        public areaNO: number;

                        /** DinosaurInfo type. */
                        public type: number;

                        /** DinosaurInfo star. */
                        public star: number;

                        /** DinosaurInfo rarity. */
                        public rarity: number;

                        /** DinosaurInfo rank. */
                        public rank: number;

                        /** DinosaurInfo price. */
                        public price: number;

                        /** DinosaurInfo satiation. */
                        public satiation: number;

                        /** DinosaurInfo satiation_max. */
                        public satiation_max: number;

                        /** DinosaurInfo favorability. */
                        public favorability: number;

                        /** DinosaurInfo favorability_max. */
                        public favorability_max: number;

                        /** DinosaurInfo get_sick. */
                        public get_sick: boolean;

                        /** DinosaurInfo get_dirty. */
                        public get_dirty: boolean;

                        /** DinosaurInfo alive. */
                        public alive: boolean;

                        /** DinosaurInfo rise. */
                        public rise: boolean;

                        /** DinosaurInfo skin_type. */
                        public skin_type: number;

                        /** DinosaurInfo remain_time. */
                        public remain_time: string;

                        /**
                         * Creates a new DinosaurInfo instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns DinosaurInfo instance
                         */
                        public static create(properties?: s5g.game.proto.SlotResult.ArcadeTamagotchi.IDinosaurInfo): s5g.game.proto.SlotResult.ArcadeTamagotchi.DinosaurInfo;

                        /**
                         * Encodes the specified DinosaurInfo message. Does not implicitly {@link s5g.game.proto.SlotResult.ArcadeTamagotchi.DinosaurInfo.verify|verify} messages.
                         * @param message DinosaurInfo message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: s5g.game.proto.SlotResult.ArcadeTamagotchi.IDinosaurInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Encodes the specified DinosaurInfo message, length delimited. Does not implicitly {@link s5g.game.proto.SlotResult.ArcadeTamagotchi.DinosaurInfo.verify|verify} messages.
                         * @param message DinosaurInfo message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encodeDelimited(message: s5g.game.proto.SlotResult.ArcadeTamagotchi.IDinosaurInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a DinosaurInfo message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns DinosaurInfo
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.SlotResult.ArcadeTamagotchi.DinosaurInfo;

                        /**
                         * Decodes a DinosaurInfo message from the specified reader or buffer, length delimited.
                         * @param reader Reader or buffer to decode from
                         * @returns DinosaurInfo
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.SlotResult.ArcadeTamagotchi.DinosaurInfo;

                        /**
                         * Verifies a DinosaurInfo message.
                         * @param message Plain object to verify
                         * @returns `null` if valid, otherwise the reason why it is not
                         */
                        public static verify(message: { [k: string]: any }): (string|null);

                        /**
                         * Creates a DinosaurInfo message from a plain object. Also converts values to their respective internal types.
                         * @param object Plain object
                         * @returns DinosaurInfo
                         */
                        public static fromObject(object: { [k: string]: any }): s5g.game.proto.SlotResult.ArcadeTamagotchi.DinosaurInfo;

                        /**
                         * Creates a plain object from a DinosaurInfo message. Also converts values to other types if specified.
                         * @param message DinosaurInfo
                         * @param [options] Conversion options
                         * @returns Plain object
                         */
                        public static toObject(message: s5g.game.proto.SlotResult.ArcadeTamagotchi.DinosaurInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

                        /**
                         * Converts this DinosaurInfo to JSON.
                         * @returns JSON object
                         */
                        public toJSON(): { [k: string]: any };
                    }

                    /** Properties of an AreaInfo. */
                    interface IAreaInfo {

                        /** AreaInfo area_opened */
                        area_opened?: (boolean|null);

                        /** AreaInfo area_price */
                        area_price?: (number|null);

                        /** AreaInfo use_scene_id */
                        use_scene_id?: (number|null);
                    }

                    /** Represents an AreaInfo. */
                    class AreaInfo implements IAreaInfo {

                        /**
                         * Constructs a new AreaInfo.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: s5g.game.proto.SlotResult.ArcadeTamagotchi.IAreaInfo);

                        /** AreaInfo area_opened. */
                        public area_opened: boolean;

                        /** AreaInfo area_price. */
                        public area_price: number;

                        /** AreaInfo use_scene_id. */
                        public use_scene_id: number;

                        /**
                         * Creates a new AreaInfo instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns AreaInfo instance
                         */
                        public static create(properties?: s5g.game.proto.SlotResult.ArcadeTamagotchi.IAreaInfo): s5g.game.proto.SlotResult.ArcadeTamagotchi.AreaInfo;

                        /**
                         * Encodes the specified AreaInfo message. Does not implicitly {@link s5g.game.proto.SlotResult.ArcadeTamagotchi.AreaInfo.verify|verify} messages.
                         * @param message AreaInfo message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: s5g.game.proto.SlotResult.ArcadeTamagotchi.IAreaInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Encodes the specified AreaInfo message, length delimited. Does not implicitly {@link s5g.game.proto.SlotResult.ArcadeTamagotchi.AreaInfo.verify|verify} messages.
                         * @param message AreaInfo message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encodeDelimited(message: s5g.game.proto.SlotResult.ArcadeTamagotchi.IAreaInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes an AreaInfo message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns AreaInfo
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.SlotResult.ArcadeTamagotchi.AreaInfo;

                        /**
                         * Decodes an AreaInfo message from the specified reader or buffer, length delimited.
                         * @param reader Reader or buffer to decode from
                         * @returns AreaInfo
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.SlotResult.ArcadeTamagotchi.AreaInfo;

                        /**
                         * Verifies an AreaInfo message.
                         * @param message Plain object to verify
                         * @returns `null` if valid, otherwise the reason why it is not
                         */
                        public static verify(message: { [k: string]: any }): (string|null);

                        /**
                         * Creates an AreaInfo message from a plain object. Also converts values to their respective internal types.
                         * @param object Plain object
                         * @returns AreaInfo
                         */
                        public static fromObject(object: { [k: string]: any }): s5g.game.proto.SlotResult.ArcadeTamagotchi.AreaInfo;

                        /**
                         * Creates a plain object from an AreaInfo message. Also converts values to other types if specified.
                         * @param message AreaInfo
                         * @param [options] Conversion options
                         * @returns Plain object
                         */
                        public static toObject(message: s5g.game.proto.SlotResult.ArcadeTamagotchi.AreaInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

                        /**
                         * Converts this AreaInfo to JSON.
                         * @returns JSON object
                         */
                        public toJSON(): { [k: string]: any };
                    }

                    /** Properties of a FavorabilityInfo. */
                    interface IFavorabilityInfo {

                        /** FavorabilityInfo id */
                        id?: (number|null);

                        /** FavorabilityInfo stage */
                        stage?: (number|null);

                        /** FavorabilityInfo virtual_coin */
                        virtual_coin?: (number|null);

                        /** FavorabilityInfo egg */
                        egg?: (number|null);

                        /** FavorabilityInfo get_mode */
                        get_mode?: (boolean|null);
                    }

                    /** Represents a FavorabilityInfo. */
                    class FavorabilityInfo implements IFavorabilityInfo {

                        /**
                         * Constructs a new FavorabilityInfo.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: s5g.game.proto.SlotResult.ArcadeTamagotchi.IFavorabilityInfo);

                        /** FavorabilityInfo id. */
                        public id: number;

                        /** FavorabilityInfo stage. */
                        public stage: number;

                        /** FavorabilityInfo virtual_coin. */
                        public virtual_coin: number;

                        /** FavorabilityInfo egg. */
                        public egg: number;

                        /** FavorabilityInfo get_mode. */
                        public get_mode: boolean;

                        /**
                         * Creates a new FavorabilityInfo instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns FavorabilityInfo instance
                         */
                        public static create(properties?: s5g.game.proto.SlotResult.ArcadeTamagotchi.IFavorabilityInfo): s5g.game.proto.SlotResult.ArcadeTamagotchi.FavorabilityInfo;

                        /**
                         * Encodes the specified FavorabilityInfo message. Does not implicitly {@link s5g.game.proto.SlotResult.ArcadeTamagotchi.FavorabilityInfo.verify|verify} messages.
                         * @param message FavorabilityInfo message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: s5g.game.proto.SlotResult.ArcadeTamagotchi.IFavorabilityInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Encodes the specified FavorabilityInfo message, length delimited. Does not implicitly {@link s5g.game.proto.SlotResult.ArcadeTamagotchi.FavorabilityInfo.verify|verify} messages.
                         * @param message FavorabilityInfo message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encodeDelimited(message: s5g.game.proto.SlotResult.ArcadeTamagotchi.IFavorabilityInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a FavorabilityInfo message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns FavorabilityInfo
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.SlotResult.ArcadeTamagotchi.FavorabilityInfo;

                        /**
                         * Decodes a FavorabilityInfo message from the specified reader or buffer, length delimited.
                         * @param reader Reader or buffer to decode from
                         * @returns FavorabilityInfo
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.SlotResult.ArcadeTamagotchi.FavorabilityInfo;

                        /**
                         * Verifies a FavorabilityInfo message.
                         * @param message Plain object to verify
                         * @returns `null` if valid, otherwise the reason why it is not
                         */
                        public static verify(message: { [k: string]: any }): (string|null);

                        /**
                         * Creates a FavorabilityInfo message from a plain object. Also converts values to their respective internal types.
                         * @param object Plain object
                         * @returns FavorabilityInfo
                         */
                        public static fromObject(object: { [k: string]: any }): s5g.game.proto.SlotResult.ArcadeTamagotchi.FavorabilityInfo;

                        /**
                         * Creates a plain object from a FavorabilityInfo message. Also converts values to other types if specified.
                         * @param message FavorabilityInfo
                         * @param [options] Conversion options
                         * @returns Plain object
                         */
                        public static toObject(message: s5g.game.proto.SlotResult.ArcadeTamagotchi.FavorabilityInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

                        /**
                         * Converts this FavorabilityInfo to JSON.
                         * @returns JSON object
                         */
                        public toJSON(): { [k: string]: any };
                    }

                    /** Properties of a FeedInfo. */
                    interface IFeedInfo {

                        /** FeedInfo satiation_add */
                        satiation_add?: (number|null);

                        /** FeedInfo favorability_add */
                        favorability_add?: (number|null);

                        /** FeedInfo fall_id */
                        fall_id?: (number|null);

                        /** FeedInfo egg */
                        egg?: (number|null);

                        /** FeedInfo pay */
                        pay?: (number|null);
                    }

                    /** Represents a FeedInfo. */
                    class FeedInfo implements IFeedInfo {

                        /**
                         * Constructs a new FeedInfo.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: s5g.game.proto.SlotResult.ArcadeTamagotchi.IFeedInfo);

                        /** FeedInfo satiation_add. */
                        public satiation_add: number;

                        /** FeedInfo favorability_add. */
                        public favorability_add: number;

                        /** FeedInfo fall_id. */
                        public fall_id: number;

                        /** FeedInfo egg. */
                        public egg: number;

                        /** FeedInfo pay. */
                        public pay: number;

                        /**
                         * Creates a new FeedInfo instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns FeedInfo instance
                         */
                        public static create(properties?: s5g.game.proto.SlotResult.ArcadeTamagotchi.IFeedInfo): s5g.game.proto.SlotResult.ArcadeTamagotchi.FeedInfo;

                        /**
                         * Encodes the specified FeedInfo message. Does not implicitly {@link s5g.game.proto.SlotResult.ArcadeTamagotchi.FeedInfo.verify|verify} messages.
                         * @param message FeedInfo message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: s5g.game.proto.SlotResult.ArcadeTamagotchi.IFeedInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Encodes the specified FeedInfo message, length delimited. Does not implicitly {@link s5g.game.proto.SlotResult.ArcadeTamagotchi.FeedInfo.verify|verify} messages.
                         * @param message FeedInfo message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encodeDelimited(message: s5g.game.proto.SlotResult.ArcadeTamagotchi.IFeedInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a FeedInfo message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns FeedInfo
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.SlotResult.ArcadeTamagotchi.FeedInfo;

                        /**
                         * Decodes a FeedInfo message from the specified reader or buffer, length delimited.
                         * @param reader Reader or buffer to decode from
                         * @returns FeedInfo
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.SlotResult.ArcadeTamagotchi.FeedInfo;

                        /**
                         * Verifies a FeedInfo message.
                         * @param message Plain object to verify
                         * @returns `null` if valid, otherwise the reason why it is not
                         */
                        public static verify(message: { [k: string]: any }): (string|null);

                        /**
                         * Creates a FeedInfo message from a plain object. Also converts values to their respective internal types.
                         * @param object Plain object
                         * @returns FeedInfo
                         */
                        public static fromObject(object: { [k: string]: any }): s5g.game.proto.SlotResult.ArcadeTamagotchi.FeedInfo;

                        /**
                         * Creates a plain object from a FeedInfo message. Also converts values to other types if specified.
                         * @param message FeedInfo
                         * @param [options] Conversion options
                         * @returns Plain object
                         */
                        public static toObject(message: s5g.game.proto.SlotResult.ArcadeTamagotchi.FeedInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

                        /**
                         * Converts this FeedInfo to JSON.
                         * @returns JSON object
                         */
                        public toJSON(): { [k: string]: any };
                    }

                    /** Properties of a SubgameInfo. */
                    interface ISubgameInfo {

                        /** SubgameInfo game_type */
                        game_type?: (number|null);

                        /** SubgameInfo sub_game_type */
                        sub_game_type?: (number|null);

                        /** SubgameInfo do_times */
                        do_times?: (number|null);

                        /** SubgameInfo go_to_optioncall */
                        go_to_optioncall?: (boolean|null);

                        /** SubgameInfo pay */
                        pay?: (number|null);

                        /** SubgameInfo favorability_gain */
                        favorability_gain?: (number|null);

                        /** SubgameInfo virtual_coin_gain */
                        virtual_coin_gain?: (number|null);
                    }

                    /** Represents a SubgameInfo. */
                    class SubgameInfo implements ISubgameInfo {

                        /**
                         * Constructs a new SubgameInfo.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: s5g.game.proto.SlotResult.ArcadeTamagotchi.ISubgameInfo);

                        /** SubgameInfo game_type. */
                        public game_type: number;

                        /** SubgameInfo sub_game_type. */
                        public sub_game_type: number;

                        /** SubgameInfo do_times. */
                        public do_times: number;

                        /** SubgameInfo go_to_optioncall. */
                        public go_to_optioncall: boolean;

                        /** SubgameInfo pay. */
                        public pay: number;

                        /** SubgameInfo favorability_gain. */
                        public favorability_gain: number;

                        /** SubgameInfo virtual_coin_gain. */
                        public virtual_coin_gain: number;

                        /**
                         * Creates a new SubgameInfo instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns SubgameInfo instance
                         */
                        public static create(properties?: s5g.game.proto.SlotResult.ArcadeTamagotchi.ISubgameInfo): s5g.game.proto.SlotResult.ArcadeTamagotchi.SubgameInfo;

                        /**
                         * Encodes the specified SubgameInfo message. Does not implicitly {@link s5g.game.proto.SlotResult.ArcadeTamagotchi.SubgameInfo.verify|verify} messages.
                         * @param message SubgameInfo message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: s5g.game.proto.SlotResult.ArcadeTamagotchi.ISubgameInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Encodes the specified SubgameInfo message, length delimited. Does not implicitly {@link s5g.game.proto.SlotResult.ArcadeTamagotchi.SubgameInfo.verify|verify} messages.
                         * @param message SubgameInfo message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encodeDelimited(message: s5g.game.proto.SlotResult.ArcadeTamagotchi.ISubgameInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a SubgameInfo message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns SubgameInfo
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.SlotResult.ArcadeTamagotchi.SubgameInfo;

                        /**
                         * Decodes a SubgameInfo message from the specified reader or buffer, length delimited.
                         * @param reader Reader or buffer to decode from
                         * @returns SubgameInfo
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.SlotResult.ArcadeTamagotchi.SubgameInfo;

                        /**
                         * Verifies a SubgameInfo message.
                         * @param message Plain object to verify
                         * @returns `null` if valid, otherwise the reason why it is not
                         */
                        public static verify(message: { [k: string]: any }): (string|null);

                        /**
                         * Creates a SubgameInfo message from a plain object. Also converts values to their respective internal types.
                         * @param object Plain object
                         * @returns SubgameInfo
                         */
                        public static fromObject(object: { [k: string]: any }): s5g.game.proto.SlotResult.ArcadeTamagotchi.SubgameInfo;

                        /**
                         * Creates a plain object from a SubgameInfo message. Also converts values to other types if specified.
                         * @param message SubgameInfo
                         * @param [options] Conversion options
                         * @returns Plain object
                         */
                        public static toObject(message: s5g.game.proto.SlotResult.ArcadeTamagotchi.SubgameInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

                        /**
                         * Converts this SubgameInfo to JSON.
                         * @returns JSON object
                         */
                        public toJSON(): { [k: string]: any };
                    }

                    /** Properties of a NewsInfo. */
                    interface INewsInfo {

                        /** NewsInfo type */
                        type?: (number|null);

                        /** NewsInfo id */
                        id?: (number|null);

                        /** NewsInfo event_time */
                        event_time?: (string|null);
                    }

                    /** Represents a NewsInfo. */
                    class NewsInfo implements INewsInfo {

                        /**
                         * Constructs a new NewsInfo.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: s5g.game.proto.SlotResult.ArcadeTamagotchi.INewsInfo);

                        /** NewsInfo type. */
                        public type: number;

                        /** NewsInfo id. */
                        public id: number;

                        /** NewsInfo event_time. */
                        public event_time: string;

                        /**
                         * Creates a new NewsInfo instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns NewsInfo instance
                         */
                        public static create(properties?: s5g.game.proto.SlotResult.ArcadeTamagotchi.INewsInfo): s5g.game.proto.SlotResult.ArcadeTamagotchi.NewsInfo;

                        /**
                         * Encodes the specified NewsInfo message. Does not implicitly {@link s5g.game.proto.SlotResult.ArcadeTamagotchi.NewsInfo.verify|verify} messages.
                         * @param message NewsInfo message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: s5g.game.proto.SlotResult.ArcadeTamagotchi.INewsInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Encodes the specified NewsInfo message, length delimited. Does not implicitly {@link s5g.game.proto.SlotResult.ArcadeTamagotchi.NewsInfo.verify|verify} messages.
                         * @param message NewsInfo message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encodeDelimited(message: s5g.game.proto.SlotResult.ArcadeTamagotchi.INewsInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a NewsInfo message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns NewsInfo
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.SlotResult.ArcadeTamagotchi.NewsInfo;

                        /**
                         * Decodes a NewsInfo message from the specified reader or buffer, length delimited.
                         * @param reader Reader or buffer to decode from
                         * @returns NewsInfo
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.SlotResult.ArcadeTamagotchi.NewsInfo;

                        /**
                         * Verifies a NewsInfo message.
                         * @param message Plain object to verify
                         * @returns `null` if valid, otherwise the reason why it is not
                         */
                        public static verify(message: { [k: string]: any }): (string|null);

                        /**
                         * Creates a NewsInfo message from a plain object. Also converts values to their respective internal types.
                         * @param object Plain object
                         * @returns NewsInfo
                         */
                        public static fromObject(object: { [k: string]: any }): s5g.game.proto.SlotResult.ArcadeTamagotchi.NewsInfo;

                        /**
                         * Creates a plain object from a NewsInfo message. Also converts values to other types if specified.
                         * @param message NewsInfo
                         * @param [options] Conversion options
                         * @returns Plain object
                         */
                        public static toObject(message: s5g.game.proto.SlotResult.ArcadeTamagotchi.NewsInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

                        /**
                         * Converts this NewsInfo to JSON.
                         * @returns JSON object
                         */
                        public toJSON(): { [k: string]: any };
                    }
                }

                /** Properties of a RecordList. */
                interface IRecordList {

                    /** RecordList type */
                    type?: (string|null);

                    /** RecordList amount */
                    amount?: (number|null);

                    /** RecordList game_time */
                    game_time?: (string|null);
                }

                /** Represents a RecordList. */
                class RecordList implements IRecordList {

                    /**
                     * Constructs a new RecordList.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: s5g.game.proto.SlotResult.IRecordList);

                    /** RecordList type. */
                    public type: string;

                    /** RecordList amount. */
                    public amount: number;

                    /** RecordList game_time. */
                    public game_time: string;

                    /**
                     * Creates a new RecordList instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns RecordList instance
                     */
                    public static create(properties?: s5g.game.proto.SlotResult.IRecordList): s5g.game.proto.SlotResult.RecordList;

                    /**
                     * Encodes the specified RecordList message. Does not implicitly {@link s5g.game.proto.SlotResult.RecordList.verify|verify} messages.
                     * @param message RecordList message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: s5g.game.proto.SlotResult.IRecordList, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified RecordList message, length delimited. Does not implicitly {@link s5g.game.proto.SlotResult.RecordList.verify|verify} messages.
                     * @param message RecordList message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: s5g.game.proto.SlotResult.IRecordList, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a RecordList message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns RecordList
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.SlotResult.RecordList;

                    /**
                     * Decodes a RecordList message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns RecordList
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.SlotResult.RecordList;

                    /**
                     * Verifies a RecordList message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a RecordList message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns RecordList
                     */
                    public static fromObject(object: { [k: string]: any }): s5g.game.proto.SlotResult.RecordList;

                    /**
                     * Creates a plain object from a RecordList message. Also converts values to other types if specified.
                     * @param message RecordList
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: s5g.game.proto.SlotResult.RecordList, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this RecordList to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a ColorBingo. */
                interface IColorBingo {

                    /** ColorBingo bingo_feature */
                    bingo_feature?: (s5g.game.proto.SlotResult.ColorBingo.IBingoFeature|null);

                    /** ColorBingo wheel_feature */
                    wheel_feature?: (s5g.game.proto.SlotResult.ColorBingo.IWheelFeature|null);

                    /** ColorBingo sub_result */
                    sub_result?: (s5g.game.proto.SlotResult.ColorBingo.IResultList[]|null);

                    /** ColorBingo symbol_pattern */
                    symbol_pattern?: (number[]|null);

                    /** ColorBingo color_reel_id */
                    color_reel_id?: (number[]|null);
                }

                /** Represents a ColorBingo. */
                class ColorBingo implements IColorBingo {

                    /**
                     * Constructs a new ColorBingo.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: s5g.game.proto.SlotResult.IColorBingo);

                    /** ColorBingo bingo_feature. */
                    public bingo_feature?: (s5g.game.proto.SlotResult.ColorBingo.IBingoFeature|null);

                    /** ColorBingo wheel_feature. */
                    public wheel_feature?: (s5g.game.proto.SlotResult.ColorBingo.IWheelFeature|null);

                    /** ColorBingo sub_result. */
                    public sub_result: s5g.game.proto.SlotResult.ColorBingo.IResultList[];

                    /** ColorBingo symbol_pattern. */
                    public symbol_pattern: number[];

                    /** ColorBingo color_reel_id. */
                    public color_reel_id: number[];

                    /**
                     * Creates a new ColorBingo instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns ColorBingo instance
                     */
                    public static create(properties?: s5g.game.proto.SlotResult.IColorBingo): s5g.game.proto.SlotResult.ColorBingo;

                    /**
                     * Encodes the specified ColorBingo message. Does not implicitly {@link s5g.game.proto.SlotResult.ColorBingo.verify|verify} messages.
                     * @param message ColorBingo message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: s5g.game.proto.SlotResult.IColorBingo, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified ColorBingo message, length delimited. Does not implicitly {@link s5g.game.proto.SlotResult.ColorBingo.verify|verify} messages.
                     * @param message ColorBingo message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: s5g.game.proto.SlotResult.IColorBingo, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a ColorBingo message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns ColorBingo
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.SlotResult.ColorBingo;

                    /**
                     * Decodes a ColorBingo message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns ColorBingo
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.SlotResult.ColorBingo;

                    /**
                     * Verifies a ColorBingo message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a ColorBingo message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns ColorBingo
                     */
                    public static fromObject(object: { [k: string]: any }): s5g.game.proto.SlotResult.ColorBingo;

                    /**
                     * Creates a plain object from a ColorBingo message. Also converts values to other types if specified.
                     * @param message ColorBingo
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: s5g.game.proto.SlotResult.ColorBingo, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this ColorBingo to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                namespace ColorBingo {

                    /** Properties of a DataVec. */
                    interface IDataVec {

                        /** DataVec data */
                        data?: (number[]|null);
                    }

                    /** Represents a DataVec. */
                    class DataVec implements IDataVec {

                        /**
                         * Constructs a new DataVec.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: s5g.game.proto.SlotResult.ColorBingo.IDataVec);

                        /** DataVec data. */
                        public data: number[];

                        /**
                         * Creates a new DataVec instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns DataVec instance
                         */
                        public static create(properties?: s5g.game.proto.SlotResult.ColorBingo.IDataVec): s5g.game.proto.SlotResult.ColorBingo.DataVec;

                        /**
                         * Encodes the specified DataVec message. Does not implicitly {@link s5g.game.proto.SlotResult.ColorBingo.DataVec.verify|verify} messages.
                         * @param message DataVec message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: s5g.game.proto.SlotResult.ColorBingo.IDataVec, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Encodes the specified DataVec message, length delimited. Does not implicitly {@link s5g.game.proto.SlotResult.ColorBingo.DataVec.verify|verify} messages.
                         * @param message DataVec message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encodeDelimited(message: s5g.game.proto.SlotResult.ColorBingo.IDataVec, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a DataVec message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns DataVec
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.SlotResult.ColorBingo.DataVec;

                        /**
                         * Decodes a DataVec message from the specified reader or buffer, length delimited.
                         * @param reader Reader or buffer to decode from
                         * @returns DataVec
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.SlotResult.ColorBingo.DataVec;

                        /**
                         * Verifies a DataVec message.
                         * @param message Plain object to verify
                         * @returns `null` if valid, otherwise the reason why it is not
                         */
                        public static verify(message: { [k: string]: any }): (string|null);

                        /**
                         * Creates a DataVec message from a plain object. Also converts values to their respective internal types.
                         * @param object Plain object
                         * @returns DataVec
                         */
                        public static fromObject(object: { [k: string]: any }): s5g.game.proto.SlotResult.ColorBingo.DataVec;

                        /**
                         * Creates a plain object from a DataVec message. Also converts values to other types if specified.
                         * @param message DataVec
                         * @param [options] Conversion options
                         * @returns Plain object
                         */
                        public static toObject(message: s5g.game.proto.SlotResult.ColorBingo.DataVec, options?: $protobuf.IConversionOptions): { [k: string]: any };

                        /**
                         * Converts this DataVec to JSON.
                         * @returns JSON object
                         */
                        public toJSON(): { [k: string]: any };
                    }

                    /** Properties of a ResultList. */
                    interface IResultList {

                        /** ResultList credit */
                        credit: (number|Long);

                        /** ResultList win_line_group */
                        win_line_group?: (s5g.game.proto.SlotResult.IWinLine[]|null);

                        /** ResultList symbol_pattern */
                        symbol_pattern?: (s5g.game.proto.SlotResult.ColorBingo.IDataVec[]|null);

                        /** ResultList multiplier */
                        multiplier?: (number|null);
                    }

                    /** Represents a ResultList. */
                    class ResultList implements IResultList {

                        /**
                         * Constructs a new ResultList.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: s5g.game.proto.SlotResult.ColorBingo.IResultList);

                        /** ResultList credit. */
                        public credit: (number|Long);

                        /** ResultList win_line_group. */
                        public win_line_group: s5g.game.proto.SlotResult.IWinLine[];

                        /** ResultList symbol_pattern. */
                        public symbol_pattern: s5g.game.proto.SlotResult.ColorBingo.IDataVec[];

                        /** ResultList multiplier. */
                        public multiplier: number;

                        /**
                         * Creates a new ResultList instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns ResultList instance
                         */
                        public static create(properties?: s5g.game.proto.SlotResult.ColorBingo.IResultList): s5g.game.proto.SlotResult.ColorBingo.ResultList;

                        /**
                         * Encodes the specified ResultList message. Does not implicitly {@link s5g.game.proto.SlotResult.ColorBingo.ResultList.verify|verify} messages.
                         * @param message ResultList message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: s5g.game.proto.SlotResult.ColorBingo.IResultList, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Encodes the specified ResultList message, length delimited. Does not implicitly {@link s5g.game.proto.SlotResult.ColorBingo.ResultList.verify|verify} messages.
                         * @param message ResultList message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encodeDelimited(message: s5g.game.proto.SlotResult.ColorBingo.IResultList, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a ResultList message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns ResultList
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.SlotResult.ColorBingo.ResultList;

                        /**
                         * Decodes a ResultList message from the specified reader or buffer, length delimited.
                         * @param reader Reader or buffer to decode from
                         * @returns ResultList
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.SlotResult.ColorBingo.ResultList;

                        /**
                         * Verifies a ResultList message.
                         * @param message Plain object to verify
                         * @returns `null` if valid, otherwise the reason why it is not
                         */
                        public static verify(message: { [k: string]: any }): (string|null);

                        /**
                         * Creates a ResultList message from a plain object. Also converts values to their respective internal types.
                         * @param object Plain object
                         * @returns ResultList
                         */
                        public static fromObject(object: { [k: string]: any }): s5g.game.proto.SlotResult.ColorBingo.ResultList;

                        /**
                         * Creates a plain object from a ResultList message. Also converts values to other types if specified.
                         * @param message ResultList
                         * @param [options] Conversion options
                         * @returns Plain object
                         */
                        public static toObject(message: s5g.game.proto.SlotResult.ColorBingo.ResultList, options?: $protobuf.IConversionOptions): { [k: string]: any };

                        /**
                         * Converts this ResultList to JSON.
                         * @returns JSON object
                         */
                        public toJSON(): { [k: string]: any };
                    }

                    /** Properties of a BingoFeature. */
                    interface IBingoFeature {

                        /** BingoFeature bingo_map */
                        bingo_map?: (number[]|null);

                        /** BingoFeature bingo_hit_map */
                        bingo_hit_map?: (number[]|null);

                        /** BingoFeature bingo_type_map */
                        bingo_type_map?: (number[]|null);

                        /** BingoFeature choose_number */
                        choose_number?: (number[]|null);

                        /** BingoFeature win_line_id */
                        win_line_id?: (number[]|null);

                        /** BingoFeature jackpot_hit */
                        jackpot_hit?: (number[]|null);

                        /** BingoFeature ticket_multiplier */
                        ticket_multiplier?: (number|null);
                    }

                    /** Represents a BingoFeature. */
                    class BingoFeature implements IBingoFeature {

                        /**
                         * Constructs a new BingoFeature.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: s5g.game.proto.SlotResult.ColorBingo.IBingoFeature);

                        /** BingoFeature bingo_map. */
                        public bingo_map: number[];

                        /** BingoFeature bingo_hit_map. */
                        public bingo_hit_map: number[];

                        /** BingoFeature bingo_type_map. */
                        public bingo_type_map: number[];

                        /** BingoFeature choose_number. */
                        public choose_number: number[];

                        /** BingoFeature win_line_id. */
                        public win_line_id: number[];

                        /** BingoFeature jackpot_hit. */
                        public jackpot_hit: number[];

                        /** BingoFeature ticket_multiplier. */
                        public ticket_multiplier: number;

                        /**
                         * Creates a new BingoFeature instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns BingoFeature instance
                         */
                        public static create(properties?: s5g.game.proto.SlotResult.ColorBingo.IBingoFeature): s5g.game.proto.SlotResult.ColorBingo.BingoFeature;

                        /**
                         * Encodes the specified BingoFeature message. Does not implicitly {@link s5g.game.proto.SlotResult.ColorBingo.BingoFeature.verify|verify} messages.
                         * @param message BingoFeature message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: s5g.game.proto.SlotResult.ColorBingo.IBingoFeature, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Encodes the specified BingoFeature message, length delimited. Does not implicitly {@link s5g.game.proto.SlotResult.ColorBingo.BingoFeature.verify|verify} messages.
                         * @param message BingoFeature message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encodeDelimited(message: s5g.game.proto.SlotResult.ColorBingo.IBingoFeature, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a BingoFeature message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns BingoFeature
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.SlotResult.ColorBingo.BingoFeature;

                        /**
                         * Decodes a BingoFeature message from the specified reader or buffer, length delimited.
                         * @param reader Reader or buffer to decode from
                         * @returns BingoFeature
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.SlotResult.ColorBingo.BingoFeature;

                        /**
                         * Verifies a BingoFeature message.
                         * @param message Plain object to verify
                         * @returns `null` if valid, otherwise the reason why it is not
                         */
                        public static verify(message: { [k: string]: any }): (string|null);

                        /**
                         * Creates a BingoFeature message from a plain object. Also converts values to their respective internal types.
                         * @param object Plain object
                         * @returns BingoFeature
                         */
                        public static fromObject(object: { [k: string]: any }): s5g.game.proto.SlotResult.ColorBingo.BingoFeature;

                        /**
                         * Creates a plain object from a BingoFeature message. Also converts values to other types if specified.
                         * @param message BingoFeature
                         * @param [options] Conversion options
                         * @returns Plain object
                         */
                        public static toObject(message: s5g.game.proto.SlotResult.ColorBingo.BingoFeature, options?: $protobuf.IConversionOptions): { [k: string]: any };

                        /**
                         * Converts this BingoFeature to JSON.
                         * @returns JSON object
                         */
                        public toJSON(): { [k: string]: any };
                    }

                    /** Properties of a WheelFeature. */
                    interface IWheelFeature {

                        /** WheelFeature award_name */
                        award_name?: (string|null);

                        /** WheelFeature award_id */
                        award_id?: (number|null);

                        /** WheelFeature jackpot_wheel */
                        jackpot_wheel?: (number|null);

                        /** WheelFeature wheel_rng */
                        wheel_rng?: (number[]|null);

                        /** WheelFeature award_pay */
                        award_pay?: (number|null);
                    }

                    /** Represents a WheelFeature. */
                    class WheelFeature implements IWheelFeature {

                        /**
                         * Constructs a new WheelFeature.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: s5g.game.proto.SlotResult.ColorBingo.IWheelFeature);

                        /** WheelFeature award_name. */
                        public award_name: string;

                        /** WheelFeature award_id. */
                        public award_id: number;

                        /** WheelFeature jackpot_wheel. */
                        public jackpot_wheel: number;

                        /** WheelFeature wheel_rng. */
                        public wheel_rng: number[];

                        /** WheelFeature award_pay. */
                        public award_pay: number;

                        /**
                         * Creates a new WheelFeature instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns WheelFeature instance
                         */
                        public static create(properties?: s5g.game.proto.SlotResult.ColorBingo.IWheelFeature): s5g.game.proto.SlotResult.ColorBingo.WheelFeature;

                        /**
                         * Encodes the specified WheelFeature message. Does not implicitly {@link s5g.game.proto.SlotResult.ColorBingo.WheelFeature.verify|verify} messages.
                         * @param message WheelFeature message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: s5g.game.proto.SlotResult.ColorBingo.IWheelFeature, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Encodes the specified WheelFeature message, length delimited. Does not implicitly {@link s5g.game.proto.SlotResult.ColorBingo.WheelFeature.verify|verify} messages.
                         * @param message WheelFeature message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encodeDelimited(message: s5g.game.proto.SlotResult.ColorBingo.IWheelFeature, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a WheelFeature message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns WheelFeature
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.SlotResult.ColorBingo.WheelFeature;

                        /**
                         * Decodes a WheelFeature message from the specified reader or buffer, length delimited.
                         * @param reader Reader or buffer to decode from
                         * @returns WheelFeature
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.SlotResult.ColorBingo.WheelFeature;

                        /**
                         * Verifies a WheelFeature message.
                         * @param message Plain object to verify
                         * @returns `null` if valid, otherwise the reason why it is not
                         */
                        public static verify(message: { [k: string]: any }): (string|null);

                        /**
                         * Creates a WheelFeature message from a plain object. Also converts values to their respective internal types.
                         * @param object Plain object
                         * @returns WheelFeature
                         */
                        public static fromObject(object: { [k: string]: any }): s5g.game.proto.SlotResult.ColorBingo.WheelFeature;

                        /**
                         * Creates a plain object from a WheelFeature message. Also converts values to other types if specified.
                         * @param message WheelFeature
                         * @param [options] Conversion options
                         * @returns Plain object
                         */
                        public static toObject(message: s5g.game.proto.SlotResult.ColorBingo.WheelFeature, options?: $protobuf.IConversionOptions): { [k: string]: any };

                        /**
                         * Converts this WheelFeature to JSON.
                         * @returns JSON object
                         */
                        public toJSON(): { [k: string]: any };
                    }
                }

                /** Properties of a MegaAce. */
                interface IMegaAce {

                    /** MegaAce card_pattern */
                    card_pattern?: (s5g.game.proto.SlotResult.MegaAce.ICardPattern[]|null);
                }

                /** Represents a MegaAce. */
                class MegaAce implements IMegaAce {

                    /**
                     * Constructs a new MegaAce.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: s5g.game.proto.SlotResult.IMegaAce);

                    /** MegaAce card_pattern. */
                    public card_pattern: s5g.game.proto.SlotResult.MegaAce.ICardPattern[];

                    /**
                     * Creates a new MegaAce instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns MegaAce instance
                     */
                    public static create(properties?: s5g.game.proto.SlotResult.IMegaAce): s5g.game.proto.SlotResult.MegaAce;

                    /**
                     * Encodes the specified MegaAce message. Does not implicitly {@link s5g.game.proto.SlotResult.MegaAce.verify|verify} messages.
                     * @param message MegaAce message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: s5g.game.proto.SlotResult.IMegaAce, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified MegaAce message, length delimited. Does not implicitly {@link s5g.game.proto.SlotResult.MegaAce.verify|verify} messages.
                     * @param message MegaAce message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: s5g.game.proto.SlotResult.IMegaAce, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a MegaAce message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns MegaAce
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.SlotResult.MegaAce;

                    /**
                     * Decodes a MegaAce message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns MegaAce
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.SlotResult.MegaAce;

                    /**
                     * Verifies a MegaAce message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a MegaAce message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns MegaAce
                     */
                    public static fromObject(object: { [k: string]: any }): s5g.game.proto.SlotResult.MegaAce;

                    /**
                     * Creates a plain object from a MegaAce message. Also converts values to other types if specified.
                     * @param message MegaAce
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: s5g.game.proto.SlotResult.MegaAce, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this MegaAce to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                namespace MegaAce {

                    /** Properties of a CardPattern. */
                    interface ICardPattern {

                        /** CardPattern is_golden */
                        is_golden?: (number[]|null);

                        /** CardPattern card_suit */
                        card_suit?: (number[]|null);

                        /** CardPattern spread_action */
                        spread_action?: (number[]|null);
                    }

                    /** Represents a CardPattern. */
                    class CardPattern implements ICardPattern {

                        /**
                         * Constructs a new CardPattern.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: s5g.game.proto.SlotResult.MegaAce.ICardPattern);

                        /** CardPattern is_golden. */
                        public is_golden: number[];

                        /** CardPattern card_suit. */
                        public card_suit: number[];

                        /** CardPattern spread_action. */
                        public spread_action: number[];

                        /**
                         * Creates a new CardPattern instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns CardPattern instance
                         */
                        public static create(properties?: s5g.game.proto.SlotResult.MegaAce.ICardPattern): s5g.game.proto.SlotResult.MegaAce.CardPattern;

                        /**
                         * Encodes the specified CardPattern message. Does not implicitly {@link s5g.game.proto.SlotResult.MegaAce.CardPattern.verify|verify} messages.
                         * @param message CardPattern message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: s5g.game.proto.SlotResult.MegaAce.ICardPattern, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Encodes the specified CardPattern message, length delimited. Does not implicitly {@link s5g.game.proto.SlotResult.MegaAce.CardPattern.verify|verify} messages.
                         * @param message CardPattern message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encodeDelimited(message: s5g.game.proto.SlotResult.MegaAce.ICardPattern, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a CardPattern message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns CardPattern
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.SlotResult.MegaAce.CardPattern;

                        /**
                         * Decodes a CardPattern message from the specified reader or buffer, length delimited.
                         * @param reader Reader or buffer to decode from
                         * @returns CardPattern
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.SlotResult.MegaAce.CardPattern;

                        /**
                         * Verifies a CardPattern message.
                         * @param message Plain object to verify
                         * @returns `null` if valid, otherwise the reason why it is not
                         */
                        public static verify(message: { [k: string]: any }): (string|null);

                        /**
                         * Creates a CardPattern message from a plain object. Also converts values to their respective internal types.
                         * @param object Plain object
                         * @returns CardPattern
                         */
                        public static fromObject(object: { [k: string]: any }): s5g.game.proto.SlotResult.MegaAce.CardPattern;

                        /**
                         * Creates a plain object from a CardPattern message. Also converts values to other types if specified.
                         * @param message CardPattern
                         * @param [options] Conversion options
                         * @returns Plain object
                         */
                        public static toObject(message: s5g.game.proto.SlotResult.MegaAce.CardPattern, options?: $protobuf.IConversionOptions): { [k: string]: any };

                        /**
                         * Converts this CardPattern to JSON.
                         * @returns JSON object
                         */
                        public toJSON(): { [k: string]: any };
                    }
                }

                /** Properties of a DeadshotWilds. */
                interface IDeadshotWilds {

                    /** DeadshotWilds golden_pattern */
                    golden_pattern?: (s5g.game.proto.SlotResult.DeadshotWilds.IGoldenPattern[]|null);
                }

                /** Represents a DeadshotWilds. */
                class DeadshotWilds implements IDeadshotWilds {

                    /**
                     * Constructs a new DeadshotWilds.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: s5g.game.proto.SlotResult.IDeadshotWilds);

                    /** DeadshotWilds golden_pattern. */
                    public golden_pattern: s5g.game.proto.SlotResult.DeadshotWilds.IGoldenPattern[];

                    /**
                     * Creates a new DeadshotWilds instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns DeadshotWilds instance
                     */
                    public static create(properties?: s5g.game.proto.SlotResult.IDeadshotWilds): s5g.game.proto.SlotResult.DeadshotWilds;

                    /**
                     * Encodes the specified DeadshotWilds message. Does not implicitly {@link s5g.game.proto.SlotResult.DeadshotWilds.verify|verify} messages.
                     * @param message DeadshotWilds message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: s5g.game.proto.SlotResult.IDeadshotWilds, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified DeadshotWilds message, length delimited. Does not implicitly {@link s5g.game.proto.SlotResult.DeadshotWilds.verify|verify} messages.
                     * @param message DeadshotWilds message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: s5g.game.proto.SlotResult.IDeadshotWilds, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a DeadshotWilds message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns DeadshotWilds
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.SlotResult.DeadshotWilds;

                    /**
                     * Decodes a DeadshotWilds message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns DeadshotWilds
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.SlotResult.DeadshotWilds;

                    /**
                     * Verifies a DeadshotWilds message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a DeadshotWilds message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns DeadshotWilds
                     */
                    public static fromObject(object: { [k: string]: any }): s5g.game.proto.SlotResult.DeadshotWilds;

                    /**
                     * Creates a plain object from a DeadshotWilds message. Also converts values to other types if specified.
                     * @param message DeadshotWilds
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: s5g.game.proto.SlotResult.DeadshotWilds, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this DeadshotWilds to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                namespace DeadshotWilds {

                    /** Properties of a GoldenPattern. */
                    interface IGoldenPattern {

                        /** GoldenPattern is_golden */
                        is_golden?: (number[]|null);
                    }

                    /** Represents a GoldenPattern. */
                    class GoldenPattern implements IGoldenPattern {

                        /**
                         * Constructs a new GoldenPattern.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: s5g.game.proto.SlotResult.DeadshotWilds.IGoldenPattern);

                        /** GoldenPattern is_golden. */
                        public is_golden: number[];

                        /**
                         * Creates a new GoldenPattern instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns GoldenPattern instance
                         */
                        public static create(properties?: s5g.game.proto.SlotResult.DeadshotWilds.IGoldenPattern): s5g.game.proto.SlotResult.DeadshotWilds.GoldenPattern;

                        /**
                         * Encodes the specified GoldenPattern message. Does not implicitly {@link s5g.game.proto.SlotResult.DeadshotWilds.GoldenPattern.verify|verify} messages.
                         * @param message GoldenPattern message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: s5g.game.proto.SlotResult.DeadshotWilds.IGoldenPattern, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Encodes the specified GoldenPattern message, length delimited. Does not implicitly {@link s5g.game.proto.SlotResult.DeadshotWilds.GoldenPattern.verify|verify} messages.
                         * @param message GoldenPattern message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encodeDelimited(message: s5g.game.proto.SlotResult.DeadshotWilds.IGoldenPattern, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a GoldenPattern message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns GoldenPattern
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.SlotResult.DeadshotWilds.GoldenPattern;

                        /**
                         * Decodes a GoldenPattern message from the specified reader or buffer, length delimited.
                         * @param reader Reader or buffer to decode from
                         * @returns GoldenPattern
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.SlotResult.DeadshotWilds.GoldenPattern;

                        /**
                         * Verifies a GoldenPattern message.
                         * @param message Plain object to verify
                         * @returns `null` if valid, otherwise the reason why it is not
                         */
                        public static verify(message: { [k: string]: any }): (string|null);

                        /**
                         * Creates a GoldenPattern message from a plain object. Also converts values to their respective internal types.
                         * @param object Plain object
                         * @returns GoldenPattern
                         */
                        public static fromObject(object: { [k: string]: any }): s5g.game.proto.SlotResult.DeadshotWilds.GoldenPattern;

                        /**
                         * Creates a plain object from a GoldenPattern message. Also converts values to other types if specified.
                         * @param message GoldenPattern
                         * @param [options] Conversion options
                         * @returns Plain object
                         */
                        public static toObject(message: s5g.game.proto.SlotResult.DeadshotWilds.GoldenPattern, options?: $protobuf.IConversionOptions): { [k: string]: any };

                        /**
                         * Converts this GoldenPattern to JSON.
                         * @returns JSON object
                         */
                        public toJSON(): { [k: string]: any };
                    }
                }
            }

            /** Properties of an OptionResult. */
            interface IOptionResult {

                /** OptionResult module_id */
                module_id: string;

                /** OptionResult win_bonus_group */
                win_bonus_group?: (s5g.game.proto.IWinBonus[]|null);

                /** OptionResult times_choice */
                times_choice?: (number|null);

                /** OptionResult times_options */
                times_options?: (number[]|null);

                /** OptionResult multiplier_choice */
                multiplier_choice?: (number|null);

                /** OptionResult multiplier_options */
                multiplier_options?: (number[]|null);

                /** OptionResult lock_pattern */
                lock_pattern?: (number[]|null);

                /** OptionResult jp888_option */
                jp888_option?: (number[]|null);

                /** OptionResult win_option */
                win_option?: (number|null);

                /** OptionResult pay */
                pay?: (number|null);

                /** OptionResult jp888_progress */
                jp888_progress?: (number|null);

                /** OptionResult money_meow_options */
                money_meow_options?: (number[]|null);

                /** OptionResult bonus_times */
                bonus_times?: (number|null);

                /** OptionResult choice_order */
                choice_order?: (number[]|null);

                /** OptionResult cre_options */
                cre_options?: (number[]|null);
            }

            /** Represents an OptionResult. */
            class OptionResult implements IOptionResult {

                /**
                 * Constructs a new OptionResult.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: s5g.game.proto.IOptionResult);

                /** OptionResult module_id. */
                public module_id: string;

                /** OptionResult win_bonus_group. */
                public win_bonus_group: s5g.game.proto.IWinBonus[];

                /** OptionResult times_choice. */
                public times_choice: number;

                /** OptionResult times_options. */
                public times_options: number[];

                /** OptionResult multiplier_choice. */
                public multiplier_choice: number;

                /** OptionResult multiplier_options. */
                public multiplier_options: number[];

                /** OptionResult lock_pattern. */
                public lock_pattern: number[];

                /** OptionResult jp888_option. */
                public jp888_option: number[];

                /** OptionResult win_option. */
                public win_option: number;

                /** OptionResult pay. */
                public pay: number;

                /** OptionResult jp888_progress. */
                public jp888_progress: number;

                /** OptionResult money_meow_options. */
                public money_meow_options: number[];

                /** OptionResult bonus_times. */
                public bonus_times: number;

                /** OptionResult choice_order. */
                public choice_order: number[];

                /** OptionResult cre_options. */
                public cre_options: number[];

                /**
                 * Creates a new OptionResult instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns OptionResult instance
                 */
                public static create(properties?: s5g.game.proto.IOptionResult): s5g.game.proto.OptionResult;

                /**
                 * Encodes the specified OptionResult message. Does not implicitly {@link s5g.game.proto.OptionResult.verify|verify} messages.
                 * @param message OptionResult message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: s5g.game.proto.IOptionResult, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified OptionResult message, length delimited. Does not implicitly {@link s5g.game.proto.OptionResult.verify|verify} messages.
                 * @param message OptionResult message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: s5g.game.proto.IOptionResult, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an OptionResult message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns OptionResult
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.OptionResult;

                /**
                 * Decodes an OptionResult message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns OptionResult
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.OptionResult;

                /**
                 * Verifies an OptionResult message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an OptionResult message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns OptionResult
                 */
                public static fromObject(object: { [k: string]: any }): s5g.game.proto.OptionResult;

                /**
                 * Creates a plain object from an OptionResult message. Also converts values to other types if specified.
                 * @param message OptionResult
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: s5g.game.proto.OptionResult, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this OptionResult to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a BonusResult. */
            interface IBonusResult {

                /** BonusResult slot_result */
                slot_result?: (s5g.game.proto.ISlotResult|null);

                /** BonusResult option_result */
                option_result?: (s5g.game.proto.IOptionResult|null);
            }

            /** Represents a BonusResult. */
            class BonusResult implements IBonusResult {

                /**
                 * Constructs a new BonusResult.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: s5g.game.proto.IBonusResult);

                /** BonusResult slot_result. */
                public slot_result?: (s5g.game.proto.ISlotResult|null);

                /** BonusResult option_result. */
                public option_result?: (s5g.game.proto.IOptionResult|null);

                /**
                 * Creates a new BonusResult instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns BonusResult instance
                 */
                public static create(properties?: s5g.game.proto.IBonusResult): s5g.game.proto.BonusResult;

                /**
                 * Encodes the specified BonusResult message. Does not implicitly {@link s5g.game.proto.BonusResult.verify|verify} messages.
                 * @param message BonusResult message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: s5g.game.proto.IBonusResult, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified BonusResult message, length delimited. Does not implicitly {@link s5g.game.proto.BonusResult.verify|verify} messages.
                 * @param message BonusResult message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: s5g.game.proto.IBonusResult, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a BonusResult message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns BonusResult
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.BonusResult;

                /**
                 * Decodes a BonusResult message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns BonusResult
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.BonusResult;

                /**
                 * Verifies a BonusResult message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a BonusResult message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns BonusResult
                 */
                public static fromObject(object: { [k: string]: any }): s5g.game.proto.BonusResult;

                /**
                 * Creates a plain object from a BonusResult message. Also converts values to other types if specified.
                 * @param message BonusResult
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: s5g.game.proto.BonusResult, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this BonusResult to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a RecoverData. */
            interface IRecoverData {

                /** RecoverData player_data */
                player_data: s5g.game.proto.IPlayerData;

                /** RecoverData win_credit */
                win_credit: number;

                /** RecoverData base_result */
                base_result: s5g.game.proto.ISlotResult;

                /** RecoverData bonus_result_group */
                bonus_result_group?: (s5g.game.proto.IBonusResult[]|null);

                /** RecoverData cur_module */
                cur_module: string;

                /** RecoverData next_module */
                next_module: string;

                /** RecoverData bonus_times_counter */
                bonus_times_counter?: (s5g.game.proto.IBonusTimesCounter[]|null);

                /** RecoverData member_info */
                member_info?: (s5g.game.proto.IMemberInfo|null);

                /** RecoverData win_credit_long */
                win_credit_long?: (number|Long|null);

                /** RecoverData win_credit_long_without_rate */
                win_credit_long_without_rate?: (number|Long|null);
            }

            /** Represents a RecoverData. */
            class RecoverData implements IRecoverData {

                /**
                 * Constructs a new RecoverData.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: s5g.game.proto.IRecoverData);

                /** RecoverData player_data. */
                public player_data: s5g.game.proto.IPlayerData;

                /** RecoverData win_credit. */
                public win_credit: number;

                /** RecoverData base_result. */
                public base_result: s5g.game.proto.ISlotResult;

                /** RecoverData bonus_result_group. */
                public bonus_result_group: s5g.game.proto.IBonusResult[];

                /** RecoverData cur_module. */
                public cur_module: string;

                /** RecoverData next_module. */
                public next_module: string;

                /** RecoverData bonus_times_counter. */
                public bonus_times_counter: s5g.game.proto.IBonusTimesCounter[];

                /** RecoverData member_info. */
                public member_info?: (s5g.game.proto.IMemberInfo|null);

                /** RecoverData win_credit_long. */
                public win_credit_long: (number|Long);

                /** RecoverData win_credit_long_without_rate. */
                public win_credit_long_without_rate: (number|Long);

                /**
                 * Creates a new RecoverData instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns RecoverData instance
                 */
                public static create(properties?: s5g.game.proto.IRecoverData): s5g.game.proto.RecoverData;

                /**
                 * Encodes the specified RecoverData message. Does not implicitly {@link s5g.game.proto.RecoverData.verify|verify} messages.
                 * @param message RecoverData message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: s5g.game.proto.IRecoverData, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified RecoverData message, length delimited. Does not implicitly {@link s5g.game.proto.RecoverData.verify|verify} messages.
                 * @param message RecoverData message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: s5g.game.proto.IRecoverData, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a RecoverData message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns RecoverData
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.RecoverData;

                /**
                 * Decodes a RecoverData message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns RecoverData
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.RecoverData;

                /**
                 * Verifies a RecoverData message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a RecoverData message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns RecoverData
                 */
                public static fromObject(object: { [k: string]: any }): s5g.game.proto.RecoverData;

                /**
                 * Creates a plain object from a RecoverData message. Also converts values to other types if specified.
                 * @param message RecoverData
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: s5g.game.proto.RecoverData, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this RecoverData to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a BetConfig. */
            interface IBetConfig {

                /** BetConfig bet_arr */
                bet_arr?: (number[]|null);
            }

            /** Represents a BetConfig. */
            class BetConfig implements IBetConfig {

                /**
                 * Constructs a new BetConfig.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: s5g.game.proto.IBetConfig);

                /** BetConfig bet_arr. */
                public bet_arr: number[];

                /**
                 * Creates a new BetConfig instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns BetConfig instance
                 */
                public static create(properties?: s5g.game.proto.IBetConfig): s5g.game.proto.BetConfig;

                /**
                 * Encodes the specified BetConfig message. Does not implicitly {@link s5g.game.proto.BetConfig.verify|verify} messages.
                 * @param message BetConfig message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: s5g.game.proto.IBetConfig, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified BetConfig message, length delimited. Does not implicitly {@link s5g.game.proto.BetConfig.verify|verify} messages.
                 * @param message BetConfig message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: s5g.game.proto.IBetConfig, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a BetConfig message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns BetConfig
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.BetConfig;

                /**
                 * Decodes a BetConfig message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns BetConfig
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.BetConfig;

                /**
                 * Verifies a BetConfig message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a BetConfig message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns BetConfig
                 */
                public static fromObject(object: { [k: string]: any }): s5g.game.proto.BetConfig;

                /**
                 * Creates a plain object from a BetConfig message. Also converts values to other types if specified.
                 * @param message BetConfig
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: s5g.game.proto.BetConfig, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this BetConfig to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a LocalJackpot. */
            interface ILocalJackpot {

                /** LocalJackpot award_list */
                award_list?: (s5g.game.proto.LocalJackpot.IAward[]|null);
            }

            /** Represents a LocalJackpot. */
            class LocalJackpot implements ILocalJackpot {

                /**
                 * Constructs a new LocalJackpot.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: s5g.game.proto.ILocalJackpot);

                /** LocalJackpot award_list. */
                public award_list: s5g.game.proto.LocalJackpot.IAward[];

                /**
                 * Creates a new LocalJackpot instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns LocalJackpot instance
                 */
                public static create(properties?: s5g.game.proto.ILocalJackpot): s5g.game.proto.LocalJackpot;

                /**
                 * Encodes the specified LocalJackpot message. Does not implicitly {@link s5g.game.proto.LocalJackpot.verify|verify} messages.
                 * @param message LocalJackpot message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: s5g.game.proto.ILocalJackpot, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified LocalJackpot message, length delimited. Does not implicitly {@link s5g.game.proto.LocalJackpot.verify|verify} messages.
                 * @param message LocalJackpot message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: s5g.game.proto.ILocalJackpot, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a LocalJackpot message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns LocalJackpot
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.LocalJackpot;

                /**
                 * Decodes a LocalJackpot message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns LocalJackpot
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.LocalJackpot;

                /**
                 * Verifies a LocalJackpot message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a LocalJackpot message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns LocalJackpot
                 */
                public static fromObject(object: { [k: string]: any }): s5g.game.proto.LocalJackpot;

                /**
                 * Creates a plain object from a LocalJackpot message. Also converts values to other types if specified.
                 * @param message LocalJackpot
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: s5g.game.proto.LocalJackpot, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this LocalJackpot to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            namespace LocalJackpot {

                /** Properties of an Award. */
                interface IAward {

                    /** Award id */
                    id: number;

                    /** Award pay */
                    pay: (number|Long);
                }

                /** Represents an Award. */
                class Award implements IAward {

                    /**
                     * Constructs a new Award.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: s5g.game.proto.LocalJackpot.IAward);

                    /** Award id. */
                    public id: number;

                    /** Award pay. */
                    public pay: (number|Long);

                    /**
                     * Creates a new Award instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns Award instance
                     */
                    public static create(properties?: s5g.game.proto.LocalJackpot.IAward): s5g.game.proto.LocalJackpot.Award;

                    /**
                     * Encodes the specified Award message. Does not implicitly {@link s5g.game.proto.LocalJackpot.Award.verify|verify} messages.
                     * @param message Award message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: s5g.game.proto.LocalJackpot.IAward, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified Award message, length delimited. Does not implicitly {@link s5g.game.proto.LocalJackpot.Award.verify|verify} messages.
                     * @param message Award message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: s5g.game.proto.LocalJackpot.IAward, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes an Award message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns Award
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.LocalJackpot.Award;

                    /**
                     * Decodes an Award message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns Award
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.LocalJackpot.Award;

                    /**
                     * Verifies an Award message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates an Award message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns Award
                     */
                    public static fromObject(object: { [k: string]: any }): s5g.game.proto.LocalJackpot.Award;

                    /**
                     * Creates a plain object from an Award message. Also converts values to other types if specified.
                     * @param message Award
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: s5g.game.proto.LocalJackpot.Award, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this Award to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }
            }

            /** Properties of a PsRewardRules. */
            interface IPsRewardRules {

                /** PsRewardRules reward_divisor */
                reward_divisor: number;

                /** PsRewardRules reward_list */
                reward_list?: (s5g.game.proto.PsRewardRules.IReward[]|null);

                /** PsRewardRules exchange_list */
                exchange_list?: (s5g.game.proto.PsRewardRules.IExchange[]|null);
            }

            /** Represents a PsRewardRules. */
            class PsRewardRules implements IPsRewardRules {

                /**
                 * Constructs a new PsRewardRules.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: s5g.game.proto.IPsRewardRules);

                /** PsRewardRules reward_divisor. */
                public reward_divisor: number;

                /** PsRewardRules reward_list. */
                public reward_list: s5g.game.proto.PsRewardRules.IReward[];

                /** PsRewardRules exchange_list. */
                public exchange_list: s5g.game.proto.PsRewardRules.IExchange[];

                /**
                 * Creates a new PsRewardRules instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns PsRewardRules instance
                 */
                public static create(properties?: s5g.game.proto.IPsRewardRules): s5g.game.proto.PsRewardRules;

                /**
                 * Encodes the specified PsRewardRules message. Does not implicitly {@link s5g.game.proto.PsRewardRules.verify|verify} messages.
                 * @param message PsRewardRules message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: s5g.game.proto.IPsRewardRules, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified PsRewardRules message, length delimited. Does not implicitly {@link s5g.game.proto.PsRewardRules.verify|verify} messages.
                 * @param message PsRewardRules message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: s5g.game.proto.IPsRewardRules, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a PsRewardRules message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns PsRewardRules
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.PsRewardRules;

                /**
                 * Decodes a PsRewardRules message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns PsRewardRules
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.PsRewardRules;

                /**
                 * Verifies a PsRewardRules message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a PsRewardRules message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns PsRewardRules
                 */
                public static fromObject(object: { [k: string]: any }): s5g.game.proto.PsRewardRules;

                /**
                 * Creates a plain object from a PsRewardRules message. Also converts values to other types if specified.
                 * @param message PsRewardRules
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: s5g.game.proto.PsRewardRules, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this PsRewardRules to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            namespace PsRewardRules {

                /** Properties of a Reward. */
                interface IReward {

                    /** Reward times_of_bet */
                    times_of_bet: number;

                    /** Reward medal_code */
                    medal_code: s5g.game.proto.MemberInfo.Medal.Code;
                }

                /** Represents a Reward. */
                class Reward implements IReward {

                    /**
                     * Constructs a new Reward.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: s5g.game.proto.PsRewardRules.IReward);

                    /** Reward times_of_bet. */
                    public times_of_bet: number;

                    /** Reward medal_code. */
                    public medal_code: s5g.game.proto.MemberInfo.Medal.Code;

                    /**
                     * Creates a new Reward instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns Reward instance
                     */
                    public static create(properties?: s5g.game.proto.PsRewardRules.IReward): s5g.game.proto.PsRewardRules.Reward;

                    /**
                     * Encodes the specified Reward message. Does not implicitly {@link s5g.game.proto.PsRewardRules.Reward.verify|verify} messages.
                     * @param message Reward message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: s5g.game.proto.PsRewardRules.IReward, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified Reward message, length delimited. Does not implicitly {@link s5g.game.proto.PsRewardRules.Reward.verify|verify} messages.
                     * @param message Reward message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: s5g.game.proto.PsRewardRules.IReward, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a Reward message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns Reward
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.PsRewardRules.Reward;

                    /**
                     * Decodes a Reward message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns Reward
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.PsRewardRules.Reward;

                    /**
                     * Verifies a Reward message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a Reward message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns Reward
                     */
                    public static fromObject(object: { [k: string]: any }): s5g.game.proto.PsRewardRules.Reward;

                    /**
                     * Creates a plain object from a Reward message. Also converts values to other types if specified.
                     * @param message Reward
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: s5g.game.proto.PsRewardRules.Reward, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this Reward to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of an Exchange. */
                interface IExchange {

                    /** Exchange medal */
                    medal: s5g.game.proto.MemberInfo.IMedal;

                    /** Exchange ps_coin_by_level */
                    ps_coin_by_level?: (s5g.game.proto.PsRewardRules.Exchange.IPsCoinByLevel[]|null);
                }

                /** Represents an Exchange. */
                class Exchange implements IExchange {

                    /**
                     * Constructs a new Exchange.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: s5g.game.proto.PsRewardRules.IExchange);

                    /** Exchange medal. */
                    public medal: s5g.game.proto.MemberInfo.IMedal;

                    /** Exchange ps_coin_by_level. */
                    public ps_coin_by_level: s5g.game.proto.PsRewardRules.Exchange.IPsCoinByLevel[];

                    /**
                     * Creates a new Exchange instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns Exchange instance
                     */
                    public static create(properties?: s5g.game.proto.PsRewardRules.IExchange): s5g.game.proto.PsRewardRules.Exchange;

                    /**
                     * Encodes the specified Exchange message. Does not implicitly {@link s5g.game.proto.PsRewardRules.Exchange.verify|verify} messages.
                     * @param message Exchange message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: s5g.game.proto.PsRewardRules.IExchange, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified Exchange message, length delimited. Does not implicitly {@link s5g.game.proto.PsRewardRules.Exchange.verify|verify} messages.
                     * @param message Exchange message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: s5g.game.proto.PsRewardRules.IExchange, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes an Exchange message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns Exchange
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.PsRewardRules.Exchange;

                    /**
                     * Decodes an Exchange message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns Exchange
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.PsRewardRules.Exchange;

                    /**
                     * Verifies an Exchange message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates an Exchange message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns Exchange
                     */
                    public static fromObject(object: { [k: string]: any }): s5g.game.proto.PsRewardRules.Exchange;

                    /**
                     * Creates a plain object from an Exchange message. Also converts values to other types if specified.
                     * @param message Exchange
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: s5g.game.proto.PsRewardRules.Exchange, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this Exchange to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                namespace Exchange {

                    /** Properties of a PsCoinByLevel. */
                    interface IPsCoinByLevel {

                        /** PsCoinByLevel level */
                        level: number;

                        /** PsCoinByLevel count */
                        count: number;
                    }

                    /** Represents a PsCoinByLevel. */
                    class PsCoinByLevel implements IPsCoinByLevel {

                        /**
                         * Constructs a new PsCoinByLevel.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: s5g.game.proto.PsRewardRules.Exchange.IPsCoinByLevel);

                        /** PsCoinByLevel level. */
                        public level: number;

                        /** PsCoinByLevel count. */
                        public count: number;

                        /**
                         * Creates a new PsCoinByLevel instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns PsCoinByLevel instance
                         */
                        public static create(properties?: s5g.game.proto.PsRewardRules.Exchange.IPsCoinByLevel): s5g.game.proto.PsRewardRules.Exchange.PsCoinByLevel;

                        /**
                         * Encodes the specified PsCoinByLevel message. Does not implicitly {@link s5g.game.proto.PsRewardRules.Exchange.PsCoinByLevel.verify|verify} messages.
                         * @param message PsCoinByLevel message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: s5g.game.proto.PsRewardRules.Exchange.IPsCoinByLevel, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Encodes the specified PsCoinByLevel message, length delimited. Does not implicitly {@link s5g.game.proto.PsRewardRules.Exchange.PsCoinByLevel.verify|verify} messages.
                         * @param message PsCoinByLevel message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encodeDelimited(message: s5g.game.proto.PsRewardRules.Exchange.IPsCoinByLevel, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a PsCoinByLevel message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns PsCoinByLevel
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.PsRewardRules.Exchange.PsCoinByLevel;

                        /**
                         * Decodes a PsCoinByLevel message from the specified reader or buffer, length delimited.
                         * @param reader Reader or buffer to decode from
                         * @returns PsCoinByLevel
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.PsRewardRules.Exchange.PsCoinByLevel;

                        /**
                         * Verifies a PsCoinByLevel message.
                         * @param message Plain object to verify
                         * @returns `null` if valid, otherwise the reason why it is not
                         */
                        public static verify(message: { [k: string]: any }): (string|null);

                        /**
                         * Creates a PsCoinByLevel message from a plain object. Also converts values to their respective internal types.
                         * @param object Plain object
                         * @returns PsCoinByLevel
                         */
                        public static fromObject(object: { [k: string]: any }): s5g.game.proto.PsRewardRules.Exchange.PsCoinByLevel;

                        /**
                         * Creates a plain object from a PsCoinByLevel message. Also converts values to other types if specified.
                         * @param message PsCoinByLevel
                         * @param [options] Conversion options
                         * @returns Plain object
                         */
                        public static toObject(message: s5g.game.proto.PsRewardRules.Exchange.PsCoinByLevel, options?: $protobuf.IConversionOptions): { [k: string]: any };

                        /**
                         * Converts this PsCoinByLevel to JSON.
                         * @returns JSON object
                         */
                        public toJSON(): { [k: string]: any };
                    }
                }
            }

            /** Properties of a ConfigRecall. */
            interface IConfigRecall {

                /** ConfigRecall msgid */
                msgid: s5g.game.proto.EMSGID;

                /** ConfigRecall status_code */
                status_code: s5g.game.proto.Status.Code;

                /** ConfigRecall bet_5_arr */
                bet_5_arr?: (number[]|null);

                /** ConfigRecall line_5_arr */
                line_5_arr?: (number[]|null);

                /** ConfigRecall rate_arr */
                rate_arr?: (number[]|null);

                /** ConfigRecall rate_default_index */
                rate_default_index?: (number|null);

                /** ConfigRecall language_list */
                language_list?: (string[]|null);

                /** ConfigRecall language_default_index */
                language_default_index?: (number|null);

                /** ConfigRecall player_cent */
                player_cent?: (number|Long|null);

                /** ConfigRecall last_rng */
                last_rng?: (number[]|null);

                /** ConfigRecall recover_data */
                recover_data?: (s5g.game.proto.IRecoverData|null);

                /** ConfigRecall bet_config_list */
                bet_config_list?: (s5g.game.proto.IBetConfig[]|null);

                /** ConfigRecall last_bs_result */
                last_bs_result?: (s5g.game.proto.ISlotResult|null);

                /** ConfigRecall member_info */
                member_info?: (s5g.game.proto.IMemberInfo|null);

                /** ConfigRecall local_jp_list */
                local_jp_list?: (s5g.game.proto.ILocalJackpot[]|null);

                /** ConfigRecall ps_reward_rules */
                ps_reward_rules?: (s5g.game.proto.IPsRewardRules|null);

                /** ConfigRecall is_free_game */
                is_free_game?: (boolean|null);

                /** ConfigRecall free_game_info */
                free_game_info?: (s5g.game.proto.ConfigRecall.IFreeGameInfo|null);

                /** ConfigRecall has_lobby_logged */
                has_lobby_logged?: (boolean|null);

                /** ConfigRecall accounting_unit */
                accounting_unit?: (number|null);

                /** ConfigRecall module_config */
                module_config?: (s5g.game.proto.ConfigRecall.IModuleConfig[]|null);

                /** ConfigRecall bet_pays */
                bet_pays?: (number[]|null);

                /** ConfigRecall max_bets */
                max_bets?: (number[]|null);

                /** ConfigRecall extra_datas */
                extra_datas?: (s5g.game.proto.ConfigRecall.IDataList[]|null);

                /** ConfigRecall last_fs_result_list */
                last_fs_result_list?: (s5g.game.proto.ISlotResult[]|null);

                /** ConfigRecall common_datas */
                common_datas?: (s5g.game.proto.ConfigRecall.ICommonDataList[]|null);

                /** ConfigRecall village_infor */
                village_infor?: (s5g.game.proto.ConfigRecall.IVillageInfor|null);

                /** ConfigRecall arcade_football */
                arcade_football?: (s5g.game.proto.ConfigRecall.IArcadeFootBall|null);

                /** ConfigRecall arcade_tamagotchi */
                arcade_tamagotchi?: (s5g.game.proto.ConfigRecall.IArcadeTamagotchi|null);

                /** ConfigRecall daily_receive */
                daily_receive?: (s5g.game.proto.ConfigRecall.IDailyReceive|null);

                /** ConfigRecall record_list */
                record_list?: (s5g.game.proto.ConfigRecall.IRecordList[]|null);

                /** ConfigRecall common_data_info */
                common_data_info?: (s5g.game.proto.ICommonDataInfo|null);

                /** ConfigRecall ups_data */
                ups_data?: (s5g.game.proto.ConfigRecall.IUPSdata|null);

                /** ConfigRecall marquee_data */
                marquee_data?: (s5g.game.proto.ConfigRecall.IMarqueeData[]|null);

                /** ConfigRecall lucky_strike_block_rate */
                lucky_strike_block_rate?: (number|null);

                /** ConfigRecall law_min_bet */
                law_min_bet?: (number|null);
            }

            /** Represents a ConfigRecall. */
            class ConfigRecall implements IConfigRecall {

                /**
                 * Constructs a new ConfigRecall.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: s5g.game.proto.IConfigRecall);

                /** ConfigRecall msgid. */
                public msgid: s5g.game.proto.EMSGID;

                /** ConfigRecall status_code. */
                public status_code: s5g.game.proto.Status.Code;

                /** ConfigRecall bet_5_arr. */
                public bet_5_arr: number[];

                /** ConfigRecall line_5_arr. */
                public line_5_arr: number[];

                /** ConfigRecall rate_arr. */
                public rate_arr: number[];

                /** ConfigRecall rate_default_index. */
                public rate_default_index: number;

                /** ConfigRecall language_list. */
                public language_list: string[];

                /** ConfigRecall language_default_index. */
                public language_default_index: number;

                /** ConfigRecall player_cent. */
                public player_cent: (number|Long);

                /** ConfigRecall last_rng. */
                public last_rng: number[];

                /** ConfigRecall recover_data. */
                public recover_data?: (s5g.game.proto.IRecoverData|null);

                /** ConfigRecall bet_config_list. */
                public bet_config_list: s5g.game.proto.IBetConfig[];

                /** ConfigRecall last_bs_result. */
                public last_bs_result?: (s5g.game.proto.ISlotResult|null);

                /** ConfigRecall member_info. */
                public member_info?: (s5g.game.proto.IMemberInfo|null);

                /** ConfigRecall local_jp_list. */
                public local_jp_list: s5g.game.proto.ILocalJackpot[];

                /** ConfigRecall ps_reward_rules. */
                public ps_reward_rules?: (s5g.game.proto.IPsRewardRules|null);

                /** ConfigRecall is_free_game. */
                public is_free_game: boolean;

                /** ConfigRecall free_game_info. */
                public free_game_info?: (s5g.game.proto.ConfigRecall.IFreeGameInfo|null);

                /** ConfigRecall has_lobby_logged. */
                public has_lobby_logged: boolean;

                /** ConfigRecall accounting_unit. */
                public accounting_unit: number;

                /** ConfigRecall module_config. */
                public module_config: s5g.game.proto.ConfigRecall.IModuleConfig[];

                /** ConfigRecall bet_pays. */
                public bet_pays: number[];

                /** ConfigRecall max_bets. */
                public max_bets: number[];

                /** ConfigRecall extra_datas. */
                public extra_datas: s5g.game.proto.ConfigRecall.IDataList[];

                /** ConfigRecall last_fs_result_list. */
                public last_fs_result_list: s5g.game.proto.ISlotResult[];

                /** ConfigRecall common_datas. */
                public common_datas: s5g.game.proto.ConfigRecall.ICommonDataList[];

                /** ConfigRecall village_infor. */
                public village_infor?: (s5g.game.proto.ConfigRecall.IVillageInfor|null);

                /** ConfigRecall arcade_football. */
                public arcade_football?: (s5g.game.proto.ConfigRecall.IArcadeFootBall|null);

                /** ConfigRecall arcade_tamagotchi. */
                public arcade_tamagotchi?: (s5g.game.proto.ConfigRecall.IArcadeTamagotchi|null);

                /** ConfigRecall daily_receive. */
                public daily_receive?: (s5g.game.proto.ConfigRecall.IDailyReceive|null);

                /** ConfigRecall record_list. */
                public record_list: s5g.game.proto.ConfigRecall.IRecordList[];

                /** ConfigRecall common_data_info. */
                public common_data_info?: (s5g.game.proto.ICommonDataInfo|null);

                /** ConfigRecall ups_data. */
                public ups_data?: (s5g.game.proto.ConfigRecall.IUPSdata|null);

                /** ConfigRecall marquee_data. */
                public marquee_data: s5g.game.proto.ConfigRecall.IMarqueeData[];

                /** ConfigRecall lucky_strike_block_rate. */
                public lucky_strike_block_rate: number;

                /** ConfigRecall law_min_bet. */
                public law_min_bet: number;

                /**
                 * Creates a new ConfigRecall instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ConfigRecall instance
                 */
                public static create(properties?: s5g.game.proto.IConfigRecall): s5g.game.proto.ConfigRecall;

                /**
                 * Encodes the specified ConfigRecall message. Does not implicitly {@link s5g.game.proto.ConfigRecall.verify|verify} messages.
                 * @param message ConfigRecall message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: s5g.game.proto.IConfigRecall, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ConfigRecall message, length delimited. Does not implicitly {@link s5g.game.proto.ConfigRecall.verify|verify} messages.
                 * @param message ConfigRecall message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: s5g.game.proto.IConfigRecall, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a ConfigRecall message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns ConfigRecall
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.ConfigRecall;

                /**
                 * Decodes a ConfigRecall message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns ConfigRecall
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.ConfigRecall;

                /**
                 * Verifies a ConfigRecall message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a ConfigRecall message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ConfigRecall
                 */
                public static fromObject(object: { [k: string]: any }): s5g.game.proto.ConfigRecall;

                /**
                 * Creates a plain object from a ConfigRecall message. Also converts values to other types if specified.
                 * @param message ConfigRecall
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: s5g.game.proto.ConfigRecall, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ConfigRecall to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            namespace ConfigRecall {

                /** Properties of a FreeGameInfo. */
                interface IFreeGameInfo {

                    /** FreeGameInfo total_times */
                    total_times: number;

                    /** FreeGameInfo played_times */
                    played_times?: (number|null);

                    /** FreeGameInfo total_win */
                    total_win?: (number|Long|null);
                }

                /** Represents a FreeGameInfo. */
                class FreeGameInfo implements IFreeGameInfo {

                    /**
                     * Constructs a new FreeGameInfo.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: s5g.game.proto.ConfigRecall.IFreeGameInfo);

                    /** FreeGameInfo total_times. */
                    public total_times: number;

                    /** FreeGameInfo played_times. */
                    public played_times: number;

                    /** FreeGameInfo total_win. */
                    public total_win: (number|Long);

                    /**
                     * Creates a new FreeGameInfo instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns FreeGameInfo instance
                     */
                    public static create(properties?: s5g.game.proto.ConfigRecall.IFreeGameInfo): s5g.game.proto.ConfigRecall.FreeGameInfo;

                    /**
                     * Encodes the specified FreeGameInfo message. Does not implicitly {@link s5g.game.proto.ConfigRecall.FreeGameInfo.verify|verify} messages.
                     * @param message FreeGameInfo message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: s5g.game.proto.ConfigRecall.IFreeGameInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified FreeGameInfo message, length delimited. Does not implicitly {@link s5g.game.proto.ConfigRecall.FreeGameInfo.verify|verify} messages.
                     * @param message FreeGameInfo message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: s5g.game.proto.ConfigRecall.IFreeGameInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a FreeGameInfo message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns FreeGameInfo
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.ConfigRecall.FreeGameInfo;

                    /**
                     * Decodes a FreeGameInfo message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns FreeGameInfo
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.ConfigRecall.FreeGameInfo;

                    /**
                     * Verifies a FreeGameInfo message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a FreeGameInfo message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns FreeGameInfo
                     */
                    public static fromObject(object: { [k: string]: any }): s5g.game.proto.ConfigRecall.FreeGameInfo;

                    /**
                     * Creates a plain object from a FreeGameInfo message. Also converts values to other types if specified.
                     * @param message FreeGameInfo
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: s5g.game.proto.ConfigRecall.FreeGameInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this FreeGameInfo to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a ModuleConfig. */
                interface IModuleConfig {

                    /** ModuleConfig module_id */
                    module_id: string;

                    /** ModuleConfig max_eliminate_times */
                    max_eliminate_times?: (number[]|null);
                }

                /** Represents a ModuleConfig. */
                class ModuleConfig implements IModuleConfig {

                    /**
                     * Constructs a new ModuleConfig.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: s5g.game.proto.ConfigRecall.IModuleConfig);

                    /** ModuleConfig module_id. */
                    public module_id: string;

                    /** ModuleConfig max_eliminate_times. */
                    public max_eliminate_times: number[];

                    /**
                     * Creates a new ModuleConfig instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns ModuleConfig instance
                     */
                    public static create(properties?: s5g.game.proto.ConfigRecall.IModuleConfig): s5g.game.proto.ConfigRecall.ModuleConfig;

                    /**
                     * Encodes the specified ModuleConfig message. Does not implicitly {@link s5g.game.proto.ConfigRecall.ModuleConfig.verify|verify} messages.
                     * @param message ModuleConfig message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: s5g.game.proto.ConfigRecall.IModuleConfig, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified ModuleConfig message, length delimited. Does not implicitly {@link s5g.game.proto.ConfigRecall.ModuleConfig.verify|verify} messages.
                     * @param message ModuleConfig message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: s5g.game.proto.ConfigRecall.IModuleConfig, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a ModuleConfig message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns ModuleConfig
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.ConfigRecall.ModuleConfig;

                    /**
                     * Decodes a ModuleConfig message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns ModuleConfig
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.ConfigRecall.ModuleConfig;

                    /**
                     * Verifies a ModuleConfig message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a ModuleConfig message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns ModuleConfig
                     */
                    public static fromObject(object: { [k: string]: any }): s5g.game.proto.ConfigRecall.ModuleConfig;

                    /**
                     * Creates a plain object from a ModuleConfig message. Also converts values to other types if specified.
                     * @param message ModuleConfig
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: s5g.game.proto.ConfigRecall.ModuleConfig, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this ModuleConfig to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a DataList. */
                interface IDataList {

                    /** DataList data */
                    data?: (number[]|null);
                }

                /** Represents a DataList. */
                class DataList implements IDataList {

                    /**
                     * Constructs a new DataList.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: s5g.game.proto.ConfigRecall.IDataList);

                    /** DataList data. */
                    public data: number[];

                    /**
                     * Creates a new DataList instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns DataList instance
                     */
                    public static create(properties?: s5g.game.proto.ConfigRecall.IDataList): s5g.game.proto.ConfigRecall.DataList;

                    /**
                     * Encodes the specified DataList message. Does not implicitly {@link s5g.game.proto.ConfigRecall.DataList.verify|verify} messages.
                     * @param message DataList message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: s5g.game.proto.ConfigRecall.IDataList, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified DataList message, length delimited. Does not implicitly {@link s5g.game.proto.ConfigRecall.DataList.verify|verify} messages.
                     * @param message DataList message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: s5g.game.proto.ConfigRecall.IDataList, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a DataList message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns DataList
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.ConfigRecall.DataList;

                    /**
                     * Decodes a DataList message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns DataList
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.ConfigRecall.DataList;

                    /**
                     * Verifies a DataList message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a DataList message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns DataList
                     */
                    public static fromObject(object: { [k: string]: any }): s5g.game.proto.ConfigRecall.DataList;

                    /**
                     * Creates a plain object from a DataList message. Also converts values to other types if specified.
                     * @param message DataList
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: s5g.game.proto.ConfigRecall.DataList, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this DataList to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a CommonDataList. */
                interface ICommonDataList {

                    /** CommonDataList data */
                    data?: (number[]|null);
                }

                /** Represents a CommonDataList. */
                class CommonDataList implements ICommonDataList {

                    /**
                     * Constructs a new CommonDataList.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: s5g.game.proto.ConfigRecall.ICommonDataList);

                    /** CommonDataList data. */
                    public data: number[];

                    /**
                     * Creates a new CommonDataList instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns CommonDataList instance
                     */
                    public static create(properties?: s5g.game.proto.ConfigRecall.ICommonDataList): s5g.game.proto.ConfigRecall.CommonDataList;

                    /**
                     * Encodes the specified CommonDataList message. Does not implicitly {@link s5g.game.proto.ConfigRecall.CommonDataList.verify|verify} messages.
                     * @param message CommonDataList message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: s5g.game.proto.ConfigRecall.ICommonDataList, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified CommonDataList message, length delimited. Does not implicitly {@link s5g.game.proto.ConfigRecall.CommonDataList.verify|verify} messages.
                     * @param message CommonDataList message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: s5g.game.proto.ConfigRecall.ICommonDataList, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a CommonDataList message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns CommonDataList
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.ConfigRecall.CommonDataList;

                    /**
                     * Decodes a CommonDataList message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns CommonDataList
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.ConfigRecall.CommonDataList;

                    /**
                     * Verifies a CommonDataList message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a CommonDataList message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns CommonDataList
                     */
                    public static fromObject(object: { [k: string]: any }): s5g.game.proto.ConfigRecall.CommonDataList;

                    /**
                     * Creates a plain object from a CommonDataList message. Also converts values to other types if specified.
                     * @param message CommonDataList
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: s5g.game.proto.ConfigRecall.CommonDataList, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this CommonDataList to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a VillageInfor. */
                interface IVillageInfor {

                    /** VillageInfor player_id */
                    player_id?: (string|null);

                    /** VillageInfor player_level */
                    player_level?: (number|null);

                    /** VillageInfor virtual_coin */
                    virtual_coin?: (number|null);

                    /** VillageInfor shield_value */
                    shield_value?: (number|null);

                    /** VillageInfor steal_player_id */
                    steal_player_id?: (string|null);

                    /** VillageInfor steal_gain_non_player_bet */
                    steal_gain_non_player_bet?: (number|null);

                    /** VillageInfor fighter_value */
                    fighter_value?: (number|null);

                    /** VillageInfor house_level */
                    house_level?: (number[]|null);

                    /** VillageInfor house_update_cost */
                    house_update_cost?: (number[]|null);

                    /** VillageInfor house_repair_cost */
                    house_repair_cost?: (number[]|null);

                    /** VillageInfor next_era_update */
                    next_era_update?: (number|null);

                    /** VillageInfor news_info */
                    news_info?: (s5g.game.proto.ConfigRecall.VillageInfor.INewsInfo[]|null);

                    /** VillageInfor min_game_bet */
                    min_game_bet?: (number|null);
                }

                /** Represents a VillageInfor. */
                class VillageInfor implements IVillageInfor {

                    /**
                     * Constructs a new VillageInfor.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: s5g.game.proto.ConfigRecall.IVillageInfor);

                    /** VillageInfor player_id. */
                    public player_id: string;

                    /** VillageInfor player_level. */
                    public player_level: number;

                    /** VillageInfor virtual_coin. */
                    public virtual_coin: number;

                    /** VillageInfor shield_value. */
                    public shield_value: number;

                    /** VillageInfor steal_player_id. */
                    public steal_player_id: string;

                    /** VillageInfor steal_gain_non_player_bet. */
                    public steal_gain_non_player_bet: number;

                    /** VillageInfor fighter_value. */
                    public fighter_value: number;

                    /** VillageInfor house_level. */
                    public house_level: number[];

                    /** VillageInfor house_update_cost. */
                    public house_update_cost: number[];

                    /** VillageInfor house_repair_cost. */
                    public house_repair_cost: number[];

                    /** VillageInfor next_era_update. */
                    public next_era_update: number;

                    /** VillageInfor news_info. */
                    public news_info: s5g.game.proto.ConfigRecall.VillageInfor.INewsInfo[];

                    /** VillageInfor min_game_bet. */
                    public min_game_bet: number;

                    /**
                     * Creates a new VillageInfor instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns VillageInfor instance
                     */
                    public static create(properties?: s5g.game.proto.ConfigRecall.IVillageInfor): s5g.game.proto.ConfigRecall.VillageInfor;

                    /**
                     * Encodes the specified VillageInfor message. Does not implicitly {@link s5g.game.proto.ConfigRecall.VillageInfor.verify|verify} messages.
                     * @param message VillageInfor message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: s5g.game.proto.ConfigRecall.IVillageInfor, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified VillageInfor message, length delimited. Does not implicitly {@link s5g.game.proto.ConfigRecall.VillageInfor.verify|verify} messages.
                     * @param message VillageInfor message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: s5g.game.proto.ConfigRecall.IVillageInfor, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a VillageInfor message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns VillageInfor
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.ConfigRecall.VillageInfor;

                    /**
                     * Decodes a VillageInfor message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns VillageInfor
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.ConfigRecall.VillageInfor;

                    /**
                     * Verifies a VillageInfor message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a VillageInfor message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns VillageInfor
                     */
                    public static fromObject(object: { [k: string]: any }): s5g.game.proto.ConfigRecall.VillageInfor;

                    /**
                     * Creates a plain object from a VillageInfor message. Also converts values to other types if specified.
                     * @param message VillageInfor
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: s5g.game.proto.ConfigRecall.VillageInfor, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this VillageInfor to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                namespace VillageInfor {

                    /** Properties of a NewsInfo. */
                    interface INewsInfo {

                        /** NewsInfo type */
                        type?: (number|null);

                        /** NewsInfo id */
                        id?: (string|null);

                        /** NewsInfo pay */
                        pay?: (number|null);

                        /** NewsInfo game_time */
                        game_time?: (string|null);
                    }

                    /** Represents a NewsInfo. */
                    class NewsInfo implements INewsInfo {

                        /**
                         * Constructs a new NewsInfo.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: s5g.game.proto.ConfigRecall.VillageInfor.INewsInfo);

                        /** NewsInfo type. */
                        public type: number;

                        /** NewsInfo id. */
                        public id: string;

                        /** NewsInfo pay. */
                        public pay: number;

                        /** NewsInfo game_time. */
                        public game_time: string;

                        /**
                         * Creates a new NewsInfo instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns NewsInfo instance
                         */
                        public static create(properties?: s5g.game.proto.ConfigRecall.VillageInfor.INewsInfo): s5g.game.proto.ConfigRecall.VillageInfor.NewsInfo;

                        /**
                         * Encodes the specified NewsInfo message. Does not implicitly {@link s5g.game.proto.ConfigRecall.VillageInfor.NewsInfo.verify|verify} messages.
                         * @param message NewsInfo message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: s5g.game.proto.ConfigRecall.VillageInfor.INewsInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Encodes the specified NewsInfo message, length delimited. Does not implicitly {@link s5g.game.proto.ConfigRecall.VillageInfor.NewsInfo.verify|verify} messages.
                         * @param message NewsInfo message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encodeDelimited(message: s5g.game.proto.ConfigRecall.VillageInfor.INewsInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a NewsInfo message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns NewsInfo
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.ConfigRecall.VillageInfor.NewsInfo;

                        /**
                         * Decodes a NewsInfo message from the specified reader or buffer, length delimited.
                         * @param reader Reader or buffer to decode from
                         * @returns NewsInfo
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.ConfigRecall.VillageInfor.NewsInfo;

                        /**
                         * Verifies a NewsInfo message.
                         * @param message Plain object to verify
                         * @returns `null` if valid, otherwise the reason why it is not
                         */
                        public static verify(message: { [k: string]: any }): (string|null);

                        /**
                         * Creates a NewsInfo message from a plain object. Also converts values to their respective internal types.
                         * @param object Plain object
                         * @returns NewsInfo
                         */
                        public static fromObject(object: { [k: string]: any }): s5g.game.proto.ConfigRecall.VillageInfor.NewsInfo;

                        /**
                         * Creates a plain object from a NewsInfo message. Also converts values to other types if specified.
                         * @param message NewsInfo
                         * @param [options] Conversion options
                         * @returns Plain object
                         */
                        public static toObject(message: s5g.game.proto.ConfigRecall.VillageInfor.NewsInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

                        /**
                         * Converts this NewsInfo to JSON.
                         * @returns JSON object
                         */
                        public toJSON(): { [k: string]: any };
                    }
                }

                /** Properties of an ArcadeFootBall. */
                interface IArcadeFootBall {

                    /** ArcadeFootBall game_Combination */
                    game_Combination?: (s5g.game.proto.ConfigRecall.ArcadeFootBall.ICombination[]|null);

                    /** ArcadeFootBall arcad_unit */
                    arcad_unit?: (number|null);

                    /** ArcadeFootBall bet_maximum */
                    bet_maximum?: (number|null);

                    /** ArcadeFootBall bet_minimum */
                    bet_minimum?: (number|null);

                    /** ArcadeFootBall bet_list */
                    bet_list?: (number[]|null);
                }

                /** Represents an ArcadeFootBall. */
                class ArcadeFootBall implements IArcadeFootBall {

                    /**
                     * Constructs a new ArcadeFootBall.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: s5g.game.proto.ConfigRecall.IArcadeFootBall);

                    /** ArcadeFootBall game_Combination. */
                    public game_Combination: s5g.game.proto.ConfigRecall.ArcadeFootBall.ICombination[];

                    /** ArcadeFootBall arcad_unit. */
                    public arcad_unit: number;

                    /** ArcadeFootBall bet_maximum. */
                    public bet_maximum: number;

                    /** ArcadeFootBall bet_minimum. */
                    public bet_minimum: number;

                    /** ArcadeFootBall bet_list. */
                    public bet_list: number[];

                    /**
                     * Creates a new ArcadeFootBall instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns ArcadeFootBall instance
                     */
                    public static create(properties?: s5g.game.proto.ConfigRecall.IArcadeFootBall): s5g.game.proto.ConfigRecall.ArcadeFootBall;

                    /**
                     * Encodes the specified ArcadeFootBall message. Does not implicitly {@link s5g.game.proto.ConfigRecall.ArcadeFootBall.verify|verify} messages.
                     * @param message ArcadeFootBall message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: s5g.game.proto.ConfigRecall.IArcadeFootBall, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified ArcadeFootBall message, length delimited. Does not implicitly {@link s5g.game.proto.ConfigRecall.ArcadeFootBall.verify|verify} messages.
                     * @param message ArcadeFootBall message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: s5g.game.proto.ConfigRecall.IArcadeFootBall, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes an ArcadeFootBall message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns ArcadeFootBall
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.ConfigRecall.ArcadeFootBall;

                    /**
                     * Decodes an ArcadeFootBall message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns ArcadeFootBall
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.ConfigRecall.ArcadeFootBall;

                    /**
                     * Verifies an ArcadeFootBall message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates an ArcadeFootBall message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns ArcadeFootBall
                     */
                    public static fromObject(object: { [k: string]: any }): s5g.game.proto.ConfigRecall.ArcadeFootBall;

                    /**
                     * Creates a plain object from an ArcadeFootBall message. Also converts values to other types if specified.
                     * @param message ArcadeFootBall
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: s5g.game.proto.ConfigRecall.ArcadeFootBall, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this ArcadeFootBall to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                namespace ArcadeFootBall {

                    /** Properties of a Combination. */
                    interface ICombination {

                        /** Combination game_num */
                        game_num?: (number|null);

                        /** Combination home_id */
                        home_id?: (number|null);

                        /** Combination away_id */
                        away_id?: (number|null);

                        /** Combination home_name */
                        home_name?: (string|null);

                        /** Combination away_name */
                        away_name?: (string|null);

                        /** Combination home_odds */
                        home_odds?: (number|null);

                        /** Combination away_odds */
                        away_odds?: (number|null);

                        /** Combination tie_odds */
                        tie_odds?: (number|null);
                    }

                    /** Represents a Combination. */
                    class Combination implements ICombination {

                        /**
                         * Constructs a new Combination.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: s5g.game.proto.ConfigRecall.ArcadeFootBall.ICombination);

                        /** Combination game_num. */
                        public game_num: number;

                        /** Combination home_id. */
                        public home_id: number;

                        /** Combination away_id. */
                        public away_id: number;

                        /** Combination home_name. */
                        public home_name: string;

                        /** Combination away_name. */
                        public away_name: string;

                        /** Combination home_odds. */
                        public home_odds: number;

                        /** Combination away_odds. */
                        public away_odds: number;

                        /** Combination tie_odds. */
                        public tie_odds: number;

                        /**
                         * Creates a new Combination instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns Combination instance
                         */
                        public static create(properties?: s5g.game.proto.ConfigRecall.ArcadeFootBall.ICombination): s5g.game.proto.ConfigRecall.ArcadeFootBall.Combination;

                        /**
                         * Encodes the specified Combination message. Does not implicitly {@link s5g.game.proto.ConfigRecall.ArcadeFootBall.Combination.verify|verify} messages.
                         * @param message Combination message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: s5g.game.proto.ConfigRecall.ArcadeFootBall.ICombination, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Encodes the specified Combination message, length delimited. Does not implicitly {@link s5g.game.proto.ConfigRecall.ArcadeFootBall.Combination.verify|verify} messages.
                         * @param message Combination message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encodeDelimited(message: s5g.game.proto.ConfigRecall.ArcadeFootBall.ICombination, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a Combination message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns Combination
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.ConfigRecall.ArcadeFootBall.Combination;

                        /**
                         * Decodes a Combination message from the specified reader or buffer, length delimited.
                         * @param reader Reader or buffer to decode from
                         * @returns Combination
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.ConfigRecall.ArcadeFootBall.Combination;

                        /**
                         * Verifies a Combination message.
                         * @param message Plain object to verify
                         * @returns `null` if valid, otherwise the reason why it is not
                         */
                        public static verify(message: { [k: string]: any }): (string|null);

                        /**
                         * Creates a Combination message from a plain object. Also converts values to their respective internal types.
                         * @param object Plain object
                         * @returns Combination
                         */
                        public static fromObject(object: { [k: string]: any }): s5g.game.proto.ConfigRecall.ArcadeFootBall.Combination;

                        /**
                         * Creates a plain object from a Combination message. Also converts values to other types if specified.
                         * @param message Combination
                         * @param [options] Conversion options
                         * @returns Plain object
                         */
                        public static toObject(message: s5g.game.proto.ConfigRecall.ArcadeFootBall.Combination, options?: $protobuf.IConversionOptions): { [k: string]: any };

                        /**
                         * Converts this Combination to JSON.
                         * @returns JSON object
                         */
                        public toJSON(): { [k: string]: any };
                    }
                }

                /** Properties of an ArcadeTamagotchi. */
                interface IArcadeTamagotchi {

                    /** ArcadeTamagotchi player_id */
                    player_id?: (string|null);

                    /** ArcadeTamagotchi virtual_coin */
                    virtual_coin?: (number|null);

                    /** ArcadeTamagotchi egg_amount */
                    egg_amount?: (number|null);

                    /** ArcadeTamagotchi food_amount */
                    food_amount?: (number|null);

                    /** ArcadeTamagotchi Dinosaurs_data */
                    Dinosaurs_data?: (s5g.game.proto.ConfigRecall.ArcadeTamagotchi.IDinosaurInfo[]|null);

                    /** ArcadeTamagotchi Area_data */
                    Area_data?: (s5g.game.proto.ConfigRecall.ArcadeTamagotchi.IAreaInfo[]|null);

                    /** ArcadeTamagotchi Scene_data */
                    Scene_data?: (s5g.game.proto.ConfigRecall.ArcadeTamagotchi.ISceneInfo[]|null);

                    /** ArcadeTamagotchi Favorability_data */
                    Favorability_data?: (s5g.game.proto.ConfigRecall.ArcadeTamagotchi.IFavorabilityInfo[]|null);

                    /** ArcadeTamagotchi incubation_price */
                    incubation_price?: (number[]|null);

                    /** ArcadeTamagotchi News_data */
                    News_data?: (s5g.game.proto.ConfigRecall.ArcadeTamagotchi.INewsInfo[]|null);

                    /** ArcadeTamagotchi Dead_data */
                    Dead_data?: (s5g.game.proto.ConfigRecall.ArcadeTamagotchi.IDinosaurInfo[]|null);

                    /** ArcadeTamagotchi isDaily_show */
                    isDaily_show?: (boolean|null);

                    /** ArcadeTamagotchi feed_price */
                    feed_price?: (number|null);

                    /** ArcadeTamagotchi resurrection_price */
                    resurrection_price?: (number|null);

                    /** ArcadeTamagotchi bet_list */
                    bet_list?: (number[]|null);
                }

                /** Represents an ArcadeTamagotchi. */
                class ArcadeTamagotchi implements IArcadeTamagotchi {

                    /**
                     * Constructs a new ArcadeTamagotchi.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: s5g.game.proto.ConfigRecall.IArcadeTamagotchi);

                    /** ArcadeTamagotchi player_id. */
                    public player_id: string;

                    /** ArcadeTamagotchi virtual_coin. */
                    public virtual_coin: number;

                    /** ArcadeTamagotchi egg_amount. */
                    public egg_amount: number;

                    /** ArcadeTamagotchi food_amount. */
                    public food_amount: number;

                    /** ArcadeTamagotchi Dinosaurs_data. */
                    public Dinosaurs_data: s5g.game.proto.ConfigRecall.ArcadeTamagotchi.IDinosaurInfo[];

                    /** ArcadeTamagotchi Area_data. */
                    public Area_data: s5g.game.proto.ConfigRecall.ArcadeTamagotchi.IAreaInfo[];

                    /** ArcadeTamagotchi Scene_data. */
                    public Scene_data: s5g.game.proto.ConfigRecall.ArcadeTamagotchi.ISceneInfo[];

                    /** ArcadeTamagotchi Favorability_data. */
                    public Favorability_data: s5g.game.proto.ConfigRecall.ArcadeTamagotchi.IFavorabilityInfo[];

                    /** ArcadeTamagotchi incubation_price. */
                    public incubation_price: number[];

                    /** ArcadeTamagotchi News_data. */
                    public News_data: s5g.game.proto.ConfigRecall.ArcadeTamagotchi.INewsInfo[];

                    /** ArcadeTamagotchi Dead_data. */
                    public Dead_data: s5g.game.proto.ConfigRecall.ArcadeTamagotchi.IDinosaurInfo[];

                    /** ArcadeTamagotchi isDaily_show. */
                    public isDaily_show: boolean;

                    /** ArcadeTamagotchi feed_price. */
                    public feed_price: number;

                    /** ArcadeTamagotchi resurrection_price. */
                    public resurrection_price: number;

                    /** ArcadeTamagotchi bet_list. */
                    public bet_list: number[];

                    /**
                     * Creates a new ArcadeTamagotchi instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns ArcadeTamagotchi instance
                     */
                    public static create(properties?: s5g.game.proto.ConfigRecall.IArcadeTamagotchi): s5g.game.proto.ConfigRecall.ArcadeTamagotchi;

                    /**
                     * Encodes the specified ArcadeTamagotchi message. Does not implicitly {@link s5g.game.proto.ConfigRecall.ArcadeTamagotchi.verify|verify} messages.
                     * @param message ArcadeTamagotchi message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: s5g.game.proto.ConfigRecall.IArcadeTamagotchi, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified ArcadeTamagotchi message, length delimited. Does not implicitly {@link s5g.game.proto.ConfigRecall.ArcadeTamagotchi.verify|verify} messages.
                     * @param message ArcadeTamagotchi message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: s5g.game.proto.ConfigRecall.IArcadeTamagotchi, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes an ArcadeTamagotchi message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns ArcadeTamagotchi
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.ConfigRecall.ArcadeTamagotchi;

                    /**
                     * Decodes an ArcadeTamagotchi message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns ArcadeTamagotchi
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.ConfigRecall.ArcadeTamagotchi;

                    /**
                     * Verifies an ArcadeTamagotchi message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates an ArcadeTamagotchi message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns ArcadeTamagotchi
                     */
                    public static fromObject(object: { [k: string]: any }): s5g.game.proto.ConfigRecall.ArcadeTamagotchi;

                    /**
                     * Creates a plain object from an ArcadeTamagotchi message. Also converts values to other types if specified.
                     * @param message ArcadeTamagotchi
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: s5g.game.proto.ConfigRecall.ArcadeTamagotchi, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this ArcadeTamagotchi to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                namespace ArcadeTamagotchi {

                    /** Properties of a DinosaurInfo. */
                    interface IDinosaurInfo {

                        /** DinosaurInfo id */
                        id?: (number|null);

                        /** DinosaurInfo areaNO */
                        areaNO?: (number|null);

                        /** DinosaurInfo type */
                        type?: (number|null);

                        /** DinosaurInfo star */
                        star?: (number|null);

                        /** DinosaurInfo rarity */
                        rarity?: (number|null);

                        /** DinosaurInfo rank */
                        rank?: (number|null);

                        /** DinosaurInfo price */
                        price?: (number|null);

                        /** DinosaurInfo satiation */
                        satiation?: (number|null);

                        /** DinosaurInfo satiation_max */
                        satiation_max?: (number|null);

                        /** DinosaurInfo favorability */
                        favorability?: (number|null);

                        /** DinosaurInfo favorability_max */
                        favorability_max?: (number|null);

                        /** DinosaurInfo get_sick */
                        get_sick?: (boolean|null);

                        /** DinosaurInfo get_dirty */
                        get_dirty?: (boolean|null);

                        /** DinosaurInfo alive */
                        alive?: (boolean|null);

                        /** DinosaurInfo rise */
                        rise?: (boolean|null);

                        /** DinosaurInfo skin_type */
                        skin_type?: (number|null);

                        /** DinosaurInfo remain_time */
                        remain_time?: (string|null);
                    }

                    /** Represents a DinosaurInfo. */
                    class DinosaurInfo implements IDinosaurInfo {

                        /**
                         * Constructs a new DinosaurInfo.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: s5g.game.proto.ConfigRecall.ArcadeTamagotchi.IDinosaurInfo);

                        /** DinosaurInfo id. */
                        public id: number;

                        /** DinosaurInfo areaNO. */
                        public areaNO: number;

                        /** DinosaurInfo type. */
                        public type: number;

                        /** DinosaurInfo star. */
                        public star: number;

                        /** DinosaurInfo rarity. */
                        public rarity: number;

                        /** DinosaurInfo rank. */
                        public rank: number;

                        /** DinosaurInfo price. */
                        public price: number;

                        /** DinosaurInfo satiation. */
                        public satiation: number;

                        /** DinosaurInfo satiation_max. */
                        public satiation_max: number;

                        /** DinosaurInfo favorability. */
                        public favorability: number;

                        /** DinosaurInfo favorability_max. */
                        public favorability_max: number;

                        /** DinosaurInfo get_sick. */
                        public get_sick: boolean;

                        /** DinosaurInfo get_dirty. */
                        public get_dirty: boolean;

                        /** DinosaurInfo alive. */
                        public alive: boolean;

                        /** DinosaurInfo rise. */
                        public rise: boolean;

                        /** DinosaurInfo skin_type. */
                        public skin_type: number;

                        /** DinosaurInfo remain_time. */
                        public remain_time: string;

                        /**
                         * Creates a new DinosaurInfo instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns DinosaurInfo instance
                         */
                        public static create(properties?: s5g.game.proto.ConfigRecall.ArcadeTamagotchi.IDinosaurInfo): s5g.game.proto.ConfigRecall.ArcadeTamagotchi.DinosaurInfo;

                        /**
                         * Encodes the specified DinosaurInfo message. Does not implicitly {@link s5g.game.proto.ConfigRecall.ArcadeTamagotchi.DinosaurInfo.verify|verify} messages.
                         * @param message DinosaurInfo message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: s5g.game.proto.ConfigRecall.ArcadeTamagotchi.IDinosaurInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Encodes the specified DinosaurInfo message, length delimited. Does not implicitly {@link s5g.game.proto.ConfigRecall.ArcadeTamagotchi.DinosaurInfo.verify|verify} messages.
                         * @param message DinosaurInfo message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encodeDelimited(message: s5g.game.proto.ConfigRecall.ArcadeTamagotchi.IDinosaurInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a DinosaurInfo message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns DinosaurInfo
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.ConfigRecall.ArcadeTamagotchi.DinosaurInfo;

                        /**
                         * Decodes a DinosaurInfo message from the specified reader or buffer, length delimited.
                         * @param reader Reader or buffer to decode from
                         * @returns DinosaurInfo
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.ConfigRecall.ArcadeTamagotchi.DinosaurInfo;

                        /**
                         * Verifies a DinosaurInfo message.
                         * @param message Plain object to verify
                         * @returns `null` if valid, otherwise the reason why it is not
                         */
                        public static verify(message: { [k: string]: any }): (string|null);

                        /**
                         * Creates a DinosaurInfo message from a plain object. Also converts values to their respective internal types.
                         * @param object Plain object
                         * @returns DinosaurInfo
                         */
                        public static fromObject(object: { [k: string]: any }): s5g.game.proto.ConfigRecall.ArcadeTamagotchi.DinosaurInfo;

                        /**
                         * Creates a plain object from a DinosaurInfo message. Also converts values to other types if specified.
                         * @param message DinosaurInfo
                         * @param [options] Conversion options
                         * @returns Plain object
                         */
                        public static toObject(message: s5g.game.proto.ConfigRecall.ArcadeTamagotchi.DinosaurInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

                        /**
                         * Converts this DinosaurInfo to JSON.
                         * @returns JSON object
                         */
                        public toJSON(): { [k: string]: any };
                    }

                    /** Properties of an AreaInfo. */
                    interface IAreaInfo {

                        /** AreaInfo area_opened */
                        area_opened?: (boolean|null);

                        /** AreaInfo area_price */
                        area_price?: (number|null);

                        /** AreaInfo use_scene_id */
                        use_scene_id?: (number|null);
                    }

                    /** Represents an AreaInfo. */
                    class AreaInfo implements IAreaInfo {

                        /**
                         * Constructs a new AreaInfo.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: s5g.game.proto.ConfigRecall.ArcadeTamagotchi.IAreaInfo);

                        /** AreaInfo area_opened. */
                        public area_opened: boolean;

                        /** AreaInfo area_price. */
                        public area_price: number;

                        /** AreaInfo use_scene_id. */
                        public use_scene_id: number;

                        /**
                         * Creates a new AreaInfo instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns AreaInfo instance
                         */
                        public static create(properties?: s5g.game.proto.ConfigRecall.ArcadeTamagotchi.IAreaInfo): s5g.game.proto.ConfigRecall.ArcadeTamagotchi.AreaInfo;

                        /**
                         * Encodes the specified AreaInfo message. Does not implicitly {@link s5g.game.proto.ConfigRecall.ArcadeTamagotchi.AreaInfo.verify|verify} messages.
                         * @param message AreaInfo message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: s5g.game.proto.ConfigRecall.ArcadeTamagotchi.IAreaInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Encodes the specified AreaInfo message, length delimited. Does not implicitly {@link s5g.game.proto.ConfigRecall.ArcadeTamagotchi.AreaInfo.verify|verify} messages.
                         * @param message AreaInfo message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encodeDelimited(message: s5g.game.proto.ConfigRecall.ArcadeTamagotchi.IAreaInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes an AreaInfo message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns AreaInfo
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.ConfigRecall.ArcadeTamagotchi.AreaInfo;

                        /**
                         * Decodes an AreaInfo message from the specified reader or buffer, length delimited.
                         * @param reader Reader or buffer to decode from
                         * @returns AreaInfo
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.ConfigRecall.ArcadeTamagotchi.AreaInfo;

                        /**
                         * Verifies an AreaInfo message.
                         * @param message Plain object to verify
                         * @returns `null` if valid, otherwise the reason why it is not
                         */
                        public static verify(message: { [k: string]: any }): (string|null);

                        /**
                         * Creates an AreaInfo message from a plain object. Also converts values to their respective internal types.
                         * @param object Plain object
                         * @returns AreaInfo
                         */
                        public static fromObject(object: { [k: string]: any }): s5g.game.proto.ConfigRecall.ArcadeTamagotchi.AreaInfo;

                        /**
                         * Creates a plain object from an AreaInfo message. Also converts values to other types if specified.
                         * @param message AreaInfo
                         * @param [options] Conversion options
                         * @returns Plain object
                         */
                        public static toObject(message: s5g.game.proto.ConfigRecall.ArcadeTamagotchi.AreaInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

                        /**
                         * Converts this AreaInfo to JSON.
                         * @returns JSON object
                         */
                        public toJSON(): { [k: string]: any };
                    }

                    /** Properties of a SceneInfo. */
                    interface ISceneInfo {

                        /** SceneInfo scene_opened */
                        scene_opened?: (boolean|null);

                        /** SceneInfo scene_price */
                        scene_price?: (number|null);

                        /** SceneInfo building1_opened */
                        building1_opened?: (boolean|null);

                        /** SceneInfo building1_price */
                        building1_price?: (number|null);

                        /** SceneInfo building2_opened */
                        building2_opened?: (boolean|null);

                        /** SceneInfo building2_price */
                        building2_price?: (number|null);
                    }

                    /** Represents a SceneInfo. */
                    class SceneInfo implements ISceneInfo {

                        /**
                         * Constructs a new SceneInfo.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: s5g.game.proto.ConfigRecall.ArcadeTamagotchi.ISceneInfo);

                        /** SceneInfo scene_opened. */
                        public scene_opened: boolean;

                        /** SceneInfo scene_price. */
                        public scene_price: number;

                        /** SceneInfo building1_opened. */
                        public building1_opened: boolean;

                        /** SceneInfo building1_price. */
                        public building1_price: number;

                        /** SceneInfo building2_opened. */
                        public building2_opened: boolean;

                        /** SceneInfo building2_price. */
                        public building2_price: number;

                        /**
                         * Creates a new SceneInfo instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns SceneInfo instance
                         */
                        public static create(properties?: s5g.game.proto.ConfigRecall.ArcadeTamagotchi.ISceneInfo): s5g.game.proto.ConfigRecall.ArcadeTamagotchi.SceneInfo;

                        /**
                         * Encodes the specified SceneInfo message. Does not implicitly {@link s5g.game.proto.ConfigRecall.ArcadeTamagotchi.SceneInfo.verify|verify} messages.
                         * @param message SceneInfo message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: s5g.game.proto.ConfigRecall.ArcadeTamagotchi.ISceneInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Encodes the specified SceneInfo message, length delimited. Does not implicitly {@link s5g.game.proto.ConfigRecall.ArcadeTamagotchi.SceneInfo.verify|verify} messages.
                         * @param message SceneInfo message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encodeDelimited(message: s5g.game.proto.ConfigRecall.ArcadeTamagotchi.ISceneInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a SceneInfo message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns SceneInfo
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.ConfigRecall.ArcadeTamagotchi.SceneInfo;

                        /**
                         * Decodes a SceneInfo message from the specified reader or buffer, length delimited.
                         * @param reader Reader or buffer to decode from
                         * @returns SceneInfo
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.ConfigRecall.ArcadeTamagotchi.SceneInfo;

                        /**
                         * Verifies a SceneInfo message.
                         * @param message Plain object to verify
                         * @returns `null` if valid, otherwise the reason why it is not
                         */
                        public static verify(message: { [k: string]: any }): (string|null);

                        /**
                         * Creates a SceneInfo message from a plain object. Also converts values to their respective internal types.
                         * @param object Plain object
                         * @returns SceneInfo
                         */
                        public static fromObject(object: { [k: string]: any }): s5g.game.proto.ConfigRecall.ArcadeTamagotchi.SceneInfo;

                        /**
                         * Creates a plain object from a SceneInfo message. Also converts values to other types if specified.
                         * @param message SceneInfo
                         * @param [options] Conversion options
                         * @returns Plain object
                         */
                        public static toObject(message: s5g.game.proto.ConfigRecall.ArcadeTamagotchi.SceneInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

                        /**
                         * Converts this SceneInfo to JSON.
                         * @returns JSON object
                         */
                        public toJSON(): { [k: string]: any };
                    }

                    /** Properties of a FavorabilityInfo. */
                    interface IFavorabilityInfo {

                        /** FavorabilityInfo id */
                        id?: (number|null);

                        /** FavorabilityInfo favorability */
                        favorability?: (number|null);

                        /** FavorabilityInfo favorability_max */
                        favorability_max?: (number|null);

                        /** FavorabilityInfo reward */
                        reward?: (number[]|null);

                        /** FavorabilityInfo reward_get */
                        reward_get?: (boolean[]|null);
                    }

                    /** Represents a FavorabilityInfo. */
                    class FavorabilityInfo implements IFavorabilityInfo {

                        /**
                         * Constructs a new FavorabilityInfo.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: s5g.game.proto.ConfigRecall.ArcadeTamagotchi.IFavorabilityInfo);

                        /** FavorabilityInfo id. */
                        public id: number;

                        /** FavorabilityInfo favorability. */
                        public favorability: number;

                        /** FavorabilityInfo favorability_max. */
                        public favorability_max: number;

                        /** FavorabilityInfo reward. */
                        public reward: number[];

                        /** FavorabilityInfo reward_get. */
                        public reward_get: boolean[];

                        /**
                         * Creates a new FavorabilityInfo instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns FavorabilityInfo instance
                         */
                        public static create(properties?: s5g.game.proto.ConfigRecall.ArcadeTamagotchi.IFavorabilityInfo): s5g.game.proto.ConfigRecall.ArcadeTamagotchi.FavorabilityInfo;

                        /**
                         * Encodes the specified FavorabilityInfo message. Does not implicitly {@link s5g.game.proto.ConfigRecall.ArcadeTamagotchi.FavorabilityInfo.verify|verify} messages.
                         * @param message FavorabilityInfo message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: s5g.game.proto.ConfigRecall.ArcadeTamagotchi.IFavorabilityInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Encodes the specified FavorabilityInfo message, length delimited. Does not implicitly {@link s5g.game.proto.ConfigRecall.ArcadeTamagotchi.FavorabilityInfo.verify|verify} messages.
                         * @param message FavorabilityInfo message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encodeDelimited(message: s5g.game.proto.ConfigRecall.ArcadeTamagotchi.IFavorabilityInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a FavorabilityInfo message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns FavorabilityInfo
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.ConfigRecall.ArcadeTamagotchi.FavorabilityInfo;

                        /**
                         * Decodes a FavorabilityInfo message from the specified reader or buffer, length delimited.
                         * @param reader Reader or buffer to decode from
                         * @returns FavorabilityInfo
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.ConfigRecall.ArcadeTamagotchi.FavorabilityInfo;

                        /**
                         * Verifies a FavorabilityInfo message.
                         * @param message Plain object to verify
                         * @returns `null` if valid, otherwise the reason why it is not
                         */
                        public static verify(message: { [k: string]: any }): (string|null);

                        /**
                         * Creates a FavorabilityInfo message from a plain object. Also converts values to their respective internal types.
                         * @param object Plain object
                         * @returns FavorabilityInfo
                         */
                        public static fromObject(object: { [k: string]: any }): s5g.game.proto.ConfigRecall.ArcadeTamagotchi.FavorabilityInfo;

                        /**
                         * Creates a plain object from a FavorabilityInfo message. Also converts values to other types if specified.
                         * @param message FavorabilityInfo
                         * @param [options] Conversion options
                         * @returns Plain object
                         */
                        public static toObject(message: s5g.game.proto.ConfigRecall.ArcadeTamagotchi.FavorabilityInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

                        /**
                         * Converts this FavorabilityInfo to JSON.
                         * @returns JSON object
                         */
                        public toJSON(): { [k: string]: any };
                    }

                    /** Properties of a NewsInfo. */
                    interface INewsInfo {

                        /** NewsInfo type */
                        type?: (number|null);

                        /** NewsInfo id */
                        id?: (number|null);

                        /** NewsInfo event_time */
                        event_time?: (string|null);
                    }

                    /** Represents a NewsInfo. */
                    class NewsInfo implements INewsInfo {

                        /**
                         * Constructs a new NewsInfo.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: s5g.game.proto.ConfigRecall.ArcadeTamagotchi.INewsInfo);

                        /** NewsInfo type. */
                        public type: number;

                        /** NewsInfo id. */
                        public id: number;

                        /** NewsInfo event_time. */
                        public event_time: string;

                        /**
                         * Creates a new NewsInfo instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns NewsInfo instance
                         */
                        public static create(properties?: s5g.game.proto.ConfigRecall.ArcadeTamagotchi.INewsInfo): s5g.game.proto.ConfigRecall.ArcadeTamagotchi.NewsInfo;

                        /**
                         * Encodes the specified NewsInfo message. Does not implicitly {@link s5g.game.proto.ConfigRecall.ArcadeTamagotchi.NewsInfo.verify|verify} messages.
                         * @param message NewsInfo message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: s5g.game.proto.ConfigRecall.ArcadeTamagotchi.INewsInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Encodes the specified NewsInfo message, length delimited. Does not implicitly {@link s5g.game.proto.ConfigRecall.ArcadeTamagotchi.NewsInfo.verify|verify} messages.
                         * @param message NewsInfo message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encodeDelimited(message: s5g.game.proto.ConfigRecall.ArcadeTamagotchi.INewsInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a NewsInfo message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns NewsInfo
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.ConfigRecall.ArcadeTamagotchi.NewsInfo;

                        /**
                         * Decodes a NewsInfo message from the specified reader or buffer, length delimited.
                         * @param reader Reader or buffer to decode from
                         * @returns NewsInfo
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.ConfigRecall.ArcadeTamagotchi.NewsInfo;

                        /**
                         * Verifies a NewsInfo message.
                         * @param message Plain object to verify
                         * @returns `null` if valid, otherwise the reason why it is not
                         */
                        public static verify(message: { [k: string]: any }): (string|null);

                        /**
                         * Creates a NewsInfo message from a plain object. Also converts values to their respective internal types.
                         * @param object Plain object
                         * @returns NewsInfo
                         */
                        public static fromObject(object: { [k: string]: any }): s5g.game.proto.ConfigRecall.ArcadeTamagotchi.NewsInfo;

                        /**
                         * Creates a plain object from a NewsInfo message. Also converts values to other types if specified.
                         * @param message NewsInfo
                         * @param [options] Conversion options
                         * @returns Plain object
                         */
                        public static toObject(message: s5g.game.proto.ConfigRecall.ArcadeTamagotchi.NewsInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

                        /**
                         * Converts this NewsInfo to JSON.
                         * @returns JSON object
                         */
                        public toJSON(): { [k: string]: any };
                    }
                }

                /** Properties of a DailyReceive. */
                interface IDailyReceive {

                    /** DailyReceive daily_type */
                    daily_type?: (number|null);

                    /** DailyReceive award_type */
                    award_type?: (string[]|null);

                    /** DailyReceive award_amount */
                    award_amount?: (number[]|null);

                    /** DailyReceive award_received */
                    award_received?: (number[]|null);

                    /** DailyReceive remaining_time */
                    remaining_time?: (string|null);
                }

                /** Represents a DailyReceive. */
                class DailyReceive implements IDailyReceive {

                    /**
                     * Constructs a new DailyReceive.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: s5g.game.proto.ConfigRecall.IDailyReceive);

                    /** DailyReceive daily_type. */
                    public daily_type: number;

                    /** DailyReceive award_type. */
                    public award_type: string[];

                    /** DailyReceive award_amount. */
                    public award_amount: number[];

                    /** DailyReceive award_received. */
                    public award_received: number[];

                    /** DailyReceive remaining_time. */
                    public remaining_time: string;

                    /**
                     * Creates a new DailyReceive instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns DailyReceive instance
                     */
                    public static create(properties?: s5g.game.proto.ConfigRecall.IDailyReceive): s5g.game.proto.ConfigRecall.DailyReceive;

                    /**
                     * Encodes the specified DailyReceive message. Does not implicitly {@link s5g.game.proto.ConfigRecall.DailyReceive.verify|verify} messages.
                     * @param message DailyReceive message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: s5g.game.proto.ConfigRecall.IDailyReceive, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified DailyReceive message, length delimited. Does not implicitly {@link s5g.game.proto.ConfigRecall.DailyReceive.verify|verify} messages.
                     * @param message DailyReceive message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: s5g.game.proto.ConfigRecall.IDailyReceive, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a DailyReceive message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns DailyReceive
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.ConfigRecall.DailyReceive;

                    /**
                     * Decodes a DailyReceive message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns DailyReceive
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.ConfigRecall.DailyReceive;

                    /**
                     * Verifies a DailyReceive message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a DailyReceive message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns DailyReceive
                     */
                    public static fromObject(object: { [k: string]: any }): s5g.game.proto.ConfigRecall.DailyReceive;

                    /**
                     * Creates a plain object from a DailyReceive message. Also converts values to other types if specified.
                     * @param message DailyReceive
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: s5g.game.proto.ConfigRecall.DailyReceive, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this DailyReceive to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a RecordList. */
                interface IRecordList {

                    /** RecordList type */
                    type?: (string|null);

                    /** RecordList amount */
                    amount?: (number|null);

                    /** RecordList game_time */
                    game_time?: (string|null);
                }

                /** Represents a RecordList. */
                class RecordList implements IRecordList {

                    /**
                     * Constructs a new RecordList.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: s5g.game.proto.ConfigRecall.IRecordList);

                    /** RecordList type. */
                    public type: string;

                    /** RecordList amount. */
                    public amount: number;

                    /** RecordList game_time. */
                    public game_time: string;

                    /**
                     * Creates a new RecordList instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns RecordList instance
                     */
                    public static create(properties?: s5g.game.proto.ConfigRecall.IRecordList): s5g.game.proto.ConfigRecall.RecordList;

                    /**
                     * Encodes the specified RecordList message. Does not implicitly {@link s5g.game.proto.ConfigRecall.RecordList.verify|verify} messages.
                     * @param message RecordList message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: s5g.game.proto.ConfigRecall.IRecordList, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified RecordList message, length delimited. Does not implicitly {@link s5g.game.proto.ConfigRecall.RecordList.verify|verify} messages.
                     * @param message RecordList message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: s5g.game.proto.ConfigRecall.IRecordList, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a RecordList message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns RecordList
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.ConfigRecall.RecordList;

                    /**
                     * Decodes a RecordList message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns RecordList
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.ConfigRecall.RecordList;

                    /**
                     * Verifies a RecordList message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a RecordList message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns RecordList
                     */
                    public static fromObject(object: { [k: string]: any }): s5g.game.proto.ConfigRecall.RecordList;

                    /**
                     * Creates a plain object from a RecordList message. Also converts values to other types if specified.
                     * @param message RecordList
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: s5g.game.proto.ConfigRecall.RecordList, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this RecordList to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a UPSdata. */
                interface IUPSdata {

                    /** UPSdata upscoin_cent */
                    upscoin_cent?: (number|Long|null);

                    /** UPSdata ups_switch */
                    ups_switch?: (boolean|null);

                    /** UPSdata threshold */
                    threshold?: (number|Long|null);

                    /** UPSdata coin_in */
                    coin_in?: (number|Long|null);

                    /** UPSdata is_transfer */
                    is_transfer?: (boolean|null);

                    /** UPSdata transfer_cent */
                    transfer_cent?: (number|Long|null);

                    /** UPSdata remain_time */
                    remain_time?: (string|null);

                    /** UPSdata overage_type */
                    overage_type?: (number|null);
                }

                /** Represents a UPSdata. */
                class UPSdata implements IUPSdata {

                    /**
                     * Constructs a new UPSdata.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: s5g.game.proto.ConfigRecall.IUPSdata);

                    /** UPSdata upscoin_cent. */
                    public upscoin_cent: (number|Long);

                    /** UPSdata ups_switch. */
                    public ups_switch: boolean;

                    /** UPSdata threshold. */
                    public threshold: (number|Long);

                    /** UPSdata coin_in. */
                    public coin_in: (number|Long);

                    /** UPSdata is_transfer. */
                    public is_transfer: boolean;

                    /** UPSdata transfer_cent. */
                    public transfer_cent: (number|Long);

                    /** UPSdata remain_time. */
                    public remain_time: string;

                    /** UPSdata overage_type. */
                    public overage_type: number;

                    /**
                     * Creates a new UPSdata instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns UPSdata instance
                     */
                    public static create(properties?: s5g.game.proto.ConfigRecall.IUPSdata): s5g.game.proto.ConfigRecall.UPSdata;

                    /**
                     * Encodes the specified UPSdata message. Does not implicitly {@link s5g.game.proto.ConfigRecall.UPSdata.verify|verify} messages.
                     * @param message UPSdata message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: s5g.game.proto.ConfigRecall.IUPSdata, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified UPSdata message, length delimited. Does not implicitly {@link s5g.game.proto.ConfigRecall.UPSdata.verify|verify} messages.
                     * @param message UPSdata message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: s5g.game.proto.ConfigRecall.IUPSdata, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a UPSdata message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns UPSdata
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.ConfigRecall.UPSdata;

                    /**
                     * Decodes a UPSdata message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns UPSdata
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.ConfigRecall.UPSdata;

                    /**
                     * Verifies a UPSdata message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a UPSdata message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns UPSdata
                     */
                    public static fromObject(object: { [k: string]: any }): s5g.game.proto.ConfigRecall.UPSdata;

                    /**
                     * Creates a plain object from a UPSdata message. Also converts values to other types if specified.
                     * @param message UPSdata
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: s5g.game.proto.ConfigRecall.UPSdata, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this UPSdata to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a MarqueeData. */
                interface IMarqueeData {

                    /** MarqueeData type */
                    type?: (number|null);

                    /** MarqueeData level */
                    level?: (number|null);

                    /** MarqueeData data1 */
                    data1?: (string|null);

                    /** MarqueeData data2 */
                    data2?: (string|null);

                    /** MarqueeData show_time */
                    show_time?: (number|null);

                    /** MarqueeData delay_time */
                    delay_time?: (number|null);
                }

                /** Represents a MarqueeData. */
                class MarqueeData implements IMarqueeData {

                    /**
                     * Constructs a new MarqueeData.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: s5g.game.proto.ConfigRecall.IMarqueeData);

                    /** MarqueeData type. */
                    public type: number;

                    /** MarqueeData level. */
                    public level: number;

                    /** MarqueeData data1. */
                    public data1: string;

                    /** MarqueeData data2. */
                    public data2: string;

                    /** MarqueeData show_time. */
                    public show_time: number;

                    /** MarqueeData delay_time. */
                    public delay_time: number;

                    /**
                     * Creates a new MarqueeData instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns MarqueeData instance
                     */
                    public static create(properties?: s5g.game.proto.ConfigRecall.IMarqueeData): s5g.game.proto.ConfigRecall.MarqueeData;

                    /**
                     * Encodes the specified MarqueeData message. Does not implicitly {@link s5g.game.proto.ConfigRecall.MarqueeData.verify|verify} messages.
                     * @param message MarqueeData message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: s5g.game.proto.ConfigRecall.IMarqueeData, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified MarqueeData message, length delimited. Does not implicitly {@link s5g.game.proto.ConfigRecall.MarqueeData.verify|verify} messages.
                     * @param message MarqueeData message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: s5g.game.proto.ConfigRecall.IMarqueeData, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a MarqueeData message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns MarqueeData
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.ConfigRecall.MarqueeData;

                    /**
                     * Decodes a MarqueeData message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns MarqueeData
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.ConfigRecall.MarqueeData;

                    /**
                     * Verifies a MarqueeData message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a MarqueeData message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns MarqueeData
                     */
                    public static fromObject(object: { [k: string]: any }): s5g.game.proto.ConfigRecall.MarqueeData;

                    /**
                     * Creates a plain object from a MarqueeData message. Also converts values to other types if specified.
                     * @param message MarqueeData
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: s5g.game.proto.ConfigRecall.MarqueeData, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this MarqueeData to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }
            }

            /** Properties of a StripsCall. */
            interface IStripsCall {

                /** StripsCall msgid */
                msgid: s5g.game.proto.EMSGID;

                /** StripsCall token */
                token: string;
            }

            /** Represents a StripsCall. */
            class StripsCall implements IStripsCall {

                /**
                 * Constructs a new StripsCall.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: s5g.game.proto.IStripsCall);

                /** StripsCall msgid. */
                public msgid: s5g.game.proto.EMSGID;

                /** StripsCall token. */
                public token: string;

                /**
                 * Creates a new StripsCall instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns StripsCall instance
                 */
                public static create(properties?: s5g.game.proto.IStripsCall): s5g.game.proto.StripsCall;

                /**
                 * Encodes the specified StripsCall message. Does not implicitly {@link s5g.game.proto.StripsCall.verify|verify} messages.
                 * @param message StripsCall message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: s5g.game.proto.IStripsCall, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified StripsCall message, length delimited. Does not implicitly {@link s5g.game.proto.StripsCall.verify|verify} messages.
                 * @param message StripsCall message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: s5g.game.proto.IStripsCall, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a StripsCall message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns StripsCall
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.StripsCall;

                /**
                 * Decodes a StripsCall message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns StripsCall
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.StripsCall;

                /**
                 * Verifies a StripsCall message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a StripsCall message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns StripsCall
                 */
                public static fromObject(object: { [k: string]: any }): s5g.game.proto.StripsCall;

                /**
                 * Creates a plain object from a StripsCall message. Also converts values to other types if specified.
                 * @param message StripsCall
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: s5g.game.proto.StripsCall, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this StripsCall to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a StripsRecall. */
            interface IStripsRecall {

                /** StripsRecall msgid */
                msgid: s5g.game.proto.EMSGID;

                /** StripsRecall status_code */
                status_code: s5g.game.proto.Status.Code;

                /** StripsRecall allstrips */
                allstrips?: (s5g.game.proto.StripsRecall.IStripData[]|null);
            }

            /** Represents a StripsRecall. */
            class StripsRecall implements IStripsRecall {

                /**
                 * Constructs a new StripsRecall.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: s5g.game.proto.IStripsRecall);

                /** StripsRecall msgid. */
                public msgid: s5g.game.proto.EMSGID;

                /** StripsRecall status_code. */
                public status_code: s5g.game.proto.Status.Code;

                /** StripsRecall allstrips. */
                public allstrips: s5g.game.proto.StripsRecall.IStripData[];

                /**
                 * Creates a new StripsRecall instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns StripsRecall instance
                 */
                public static create(properties?: s5g.game.proto.IStripsRecall): s5g.game.proto.StripsRecall;

                /**
                 * Encodes the specified StripsRecall message. Does not implicitly {@link s5g.game.proto.StripsRecall.verify|verify} messages.
                 * @param message StripsRecall message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: s5g.game.proto.IStripsRecall, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified StripsRecall message, length delimited. Does not implicitly {@link s5g.game.proto.StripsRecall.verify|verify} messages.
                 * @param message StripsRecall message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: s5g.game.proto.IStripsRecall, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a StripsRecall message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns StripsRecall
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.StripsRecall;

                /**
                 * Decodes a StripsRecall message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns StripsRecall
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.StripsRecall;

                /**
                 * Verifies a StripsRecall message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a StripsRecall message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns StripsRecall
                 */
                public static fromObject(object: { [k: string]: any }): s5g.game.proto.StripsRecall;

                /**
                 * Creates a plain object from a StripsRecall message. Also converts values to other types if specified.
                 * @param message StripsRecall
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: s5g.game.proto.StripsRecall, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this StripsRecall to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            namespace StripsRecall {

                /** Properties of a StripData. */
                interface IStripData {

                    /** StripData module_id */
                    module_id: string;

                    /** StripData strips */
                    strips?: (s5g.game.proto.StripsRecall.StripData.IStrip[]|null);

                    /** StripData multi_strips */
                    multi_strips?: (s5g.game.proto.StripsRecall.StripData.IMultiStrip[]|null);
                }

                /** Represents a StripData. */
                class StripData implements IStripData {

                    /**
                     * Constructs a new StripData.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: s5g.game.proto.StripsRecall.IStripData);

                    /** StripData module_id. */
                    public module_id: string;

                    /** StripData strips. */
                    public strips: s5g.game.proto.StripsRecall.StripData.IStrip[];

                    /** StripData multi_strips. */
                    public multi_strips: s5g.game.proto.StripsRecall.StripData.IMultiStrip[];

                    /**
                     * Creates a new StripData instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns StripData instance
                     */
                    public static create(properties?: s5g.game.proto.StripsRecall.IStripData): s5g.game.proto.StripsRecall.StripData;

                    /**
                     * Encodes the specified StripData message. Does not implicitly {@link s5g.game.proto.StripsRecall.StripData.verify|verify} messages.
                     * @param message StripData message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: s5g.game.proto.StripsRecall.IStripData, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified StripData message, length delimited. Does not implicitly {@link s5g.game.proto.StripsRecall.StripData.verify|verify} messages.
                     * @param message StripData message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: s5g.game.proto.StripsRecall.IStripData, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a StripData message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns StripData
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.StripsRecall.StripData;

                    /**
                     * Decodes a StripData message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns StripData
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.StripsRecall.StripData;

                    /**
                     * Verifies a StripData message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a StripData message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns StripData
                     */
                    public static fromObject(object: { [k: string]: any }): s5g.game.proto.StripsRecall.StripData;

                    /**
                     * Creates a plain object from a StripData message. Also converts values to other types if specified.
                     * @param message StripData
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: s5g.game.proto.StripsRecall.StripData, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this StripData to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                namespace StripData {

                    /** Properties of a Strip. */
                    interface IStrip {

                        /** Strip strip_arr */
                        strip_arr?: (number[]|null);
                    }

                    /** Represents a Strip. */
                    class Strip implements IStrip {

                        /**
                         * Constructs a new Strip.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: s5g.game.proto.StripsRecall.StripData.IStrip);

                        /** Strip strip_arr. */
                        public strip_arr: number[];

                        /**
                         * Creates a new Strip instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns Strip instance
                         */
                        public static create(properties?: s5g.game.proto.StripsRecall.StripData.IStrip): s5g.game.proto.StripsRecall.StripData.Strip;

                        /**
                         * Encodes the specified Strip message. Does not implicitly {@link s5g.game.proto.StripsRecall.StripData.Strip.verify|verify} messages.
                         * @param message Strip message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: s5g.game.proto.StripsRecall.StripData.IStrip, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Encodes the specified Strip message, length delimited. Does not implicitly {@link s5g.game.proto.StripsRecall.StripData.Strip.verify|verify} messages.
                         * @param message Strip message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encodeDelimited(message: s5g.game.proto.StripsRecall.StripData.IStrip, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a Strip message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns Strip
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.StripsRecall.StripData.Strip;

                        /**
                         * Decodes a Strip message from the specified reader or buffer, length delimited.
                         * @param reader Reader or buffer to decode from
                         * @returns Strip
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.StripsRecall.StripData.Strip;

                        /**
                         * Verifies a Strip message.
                         * @param message Plain object to verify
                         * @returns `null` if valid, otherwise the reason why it is not
                         */
                        public static verify(message: { [k: string]: any }): (string|null);

                        /**
                         * Creates a Strip message from a plain object. Also converts values to their respective internal types.
                         * @param object Plain object
                         * @returns Strip
                         */
                        public static fromObject(object: { [k: string]: any }): s5g.game.proto.StripsRecall.StripData.Strip;

                        /**
                         * Creates a plain object from a Strip message. Also converts values to other types if specified.
                         * @param message Strip
                         * @param [options] Conversion options
                         * @returns Plain object
                         */
                        public static toObject(message: s5g.game.proto.StripsRecall.StripData.Strip, options?: $protobuf.IConversionOptions): { [k: string]: any };

                        /**
                         * Converts this Strip to JSON.
                         * @returns JSON object
                         */
                        public toJSON(): { [k: string]: any };
                    }

                    /** Properties of a MultiStrip. */
                    interface IMultiStrip {

                        /** MultiStrip strips */
                        strips?: (s5g.game.proto.StripsRecall.StripData.IStrip[]|null);
                    }

                    /** Represents a MultiStrip. */
                    class MultiStrip implements IMultiStrip {

                        /**
                         * Constructs a new MultiStrip.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: s5g.game.proto.StripsRecall.StripData.IMultiStrip);

                        /** MultiStrip strips. */
                        public strips: s5g.game.proto.StripsRecall.StripData.IStrip[];

                        /**
                         * Creates a new MultiStrip instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns MultiStrip instance
                         */
                        public static create(properties?: s5g.game.proto.StripsRecall.StripData.IMultiStrip): s5g.game.proto.StripsRecall.StripData.MultiStrip;

                        /**
                         * Encodes the specified MultiStrip message. Does not implicitly {@link s5g.game.proto.StripsRecall.StripData.MultiStrip.verify|verify} messages.
                         * @param message MultiStrip message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: s5g.game.proto.StripsRecall.StripData.IMultiStrip, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Encodes the specified MultiStrip message, length delimited. Does not implicitly {@link s5g.game.proto.StripsRecall.StripData.MultiStrip.verify|verify} messages.
                         * @param message MultiStrip message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encodeDelimited(message: s5g.game.proto.StripsRecall.StripData.IMultiStrip, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a MultiStrip message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns MultiStrip
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.StripsRecall.StripData.MultiStrip;

                        /**
                         * Decodes a MultiStrip message from the specified reader or buffer, length delimited.
                         * @param reader Reader or buffer to decode from
                         * @returns MultiStrip
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.StripsRecall.StripData.MultiStrip;

                        /**
                         * Verifies a MultiStrip message.
                         * @param message Plain object to verify
                         * @returns `null` if valid, otherwise the reason why it is not
                         */
                        public static verify(message: { [k: string]: any }): (string|null);

                        /**
                         * Creates a MultiStrip message from a plain object. Also converts values to their respective internal types.
                         * @param object Plain object
                         * @returns MultiStrip
                         */
                        public static fromObject(object: { [k: string]: any }): s5g.game.proto.StripsRecall.StripData.MultiStrip;

                        /**
                         * Creates a plain object from a MultiStrip message. Also converts values to other types if specified.
                         * @param message MultiStrip
                         * @param [options] Conversion options
                         * @returns Plain object
                         */
                        public static toObject(message: s5g.game.proto.StripsRecall.StripData.MultiStrip, options?: $protobuf.IConversionOptions): { [k: string]: any };

                        /**
                         * Converts this MultiStrip to JSON.
                         * @returns JSON object
                         */
                        public toJSON(): { [k: string]: any };
                    }
                }
            }

            /** Properties of a ResultCall. */
            interface IResultCall {

                /** ResultCall msgid */
                msgid: s5g.game.proto.EMSGID;

                /** ResultCall token */
                token: string;

                /** ResultCall module_id */
                module_id: string;

                /** ResultCall bet */
                bet: number;

                /** ResultCall line */
                line: number;

                /** ResultCall rate */
                rate: number;

                /** ResultCall module_command */
                module_command?: (Uint8Array[]|null);

                /** ResultCall orientation */
                orientation?: (number|null);

                /** ResultCall campaign_id */
                campaign_id?: (string|null);
            }

            /** Represents a ResultCall. */
            class ResultCall implements IResultCall {

                /**
                 * Constructs a new ResultCall.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: s5g.game.proto.IResultCall);

                /** ResultCall msgid. */
                public msgid: s5g.game.proto.EMSGID;

                /** ResultCall token. */
                public token: string;

                /** ResultCall module_id. */
                public module_id: string;

                /** ResultCall bet. */
                public bet: number;

                /** ResultCall line. */
                public line: number;

                /** ResultCall rate. */
                public rate: number;

                /** ResultCall module_command. */
                public module_command: Uint8Array[];

                /** ResultCall orientation. */
                public orientation: number;

                /** ResultCall campaign_id. */
                public campaign_id: string;

                /**
                 * Creates a new ResultCall instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ResultCall instance
                 */
                public static create(properties?: s5g.game.proto.IResultCall): s5g.game.proto.ResultCall;

                /**
                 * Encodes the specified ResultCall message. Does not implicitly {@link s5g.game.proto.ResultCall.verify|verify} messages.
                 * @param message ResultCall message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: s5g.game.proto.IResultCall, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ResultCall message, length delimited. Does not implicitly {@link s5g.game.proto.ResultCall.verify|verify} messages.
                 * @param message ResultCall message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: s5g.game.proto.IResultCall, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a ResultCall message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns ResultCall
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.ResultCall;

                /**
                 * Decodes a ResultCall message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns ResultCall
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.ResultCall;

                /**
                 * Verifies a ResultCall message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a ResultCall message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ResultCall
                 */
                public static fromObject(object: { [k: string]: any }): s5g.game.proto.ResultCall;

                /**
                 * Creates a plain object from a ResultCall message. Also converts values to other types if specified.
                 * @param message ResultCall
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: s5g.game.proto.ResultCall, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ResultCall to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a CampaignData. */
            interface ICampaignData {

                /** CampaignData fsb_remaining_count */
                fsb_remaining_count?: (number|null);
            }

            /** Represents a CampaignData. */
            class CampaignData implements ICampaignData {

                /**
                 * Constructs a new CampaignData.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: s5g.game.proto.ICampaignData);

                /** CampaignData fsb_remaining_count. */
                public fsb_remaining_count: number;

                /**
                 * Creates a new CampaignData instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns CampaignData instance
                 */
                public static create(properties?: s5g.game.proto.ICampaignData): s5g.game.proto.CampaignData;

                /**
                 * Encodes the specified CampaignData message. Does not implicitly {@link s5g.game.proto.CampaignData.verify|verify} messages.
                 * @param message CampaignData message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: s5g.game.proto.ICampaignData, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified CampaignData message, length delimited. Does not implicitly {@link s5g.game.proto.CampaignData.verify|verify} messages.
                 * @param message CampaignData message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: s5g.game.proto.ICampaignData, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a CampaignData message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns CampaignData
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.CampaignData;

                /**
                 * Decodes a CampaignData message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns CampaignData
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.CampaignData;

                /**
                 * Verifies a CampaignData message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a CampaignData message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns CampaignData
                 */
                public static fromObject(object: { [k: string]: any }): s5g.game.proto.CampaignData;

                /**
                 * Creates a plain object from a CampaignData message. Also converts values to other types if specified.
                 * @param message CampaignData
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: s5g.game.proto.CampaignData, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this CampaignData to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a ResultRecall. */
            interface IResultRecall {

                /** ResultRecall msgid */
                msgid: s5g.game.proto.EMSGID;

                /** ResultRecall status_code */
                status_code: s5g.game.proto.Status.Code;

                /** ResultRecall result */
                result?: (s5g.game.proto.ISlotResult|null);

                /** ResultRecall player_cent */
                player_cent?: (number|Long|null);

                /** ResultRecall next_module */
                next_module?: (string|null);

                /** ResultRecall cur_module_play_times */
                cur_module_play_times?: (number|null);

                /** ResultRecall cur_module_total_times */
                cur_module_total_times?: (number|null);

                /** ResultRecall member_info */
                member_info?: (s5g.game.proto.IMemberInfo|null);

                /** ResultRecall ups_data */
                ups_data?: (s5g.game.proto.ResultRecall.IUPSdata|null);

                /** ResultRecall marquee_data */
                marquee_data?: (s5g.game.proto.ResultRecall.IMarqueeData[]|null);

                /** ResultRecall campaign_data */
                campaign_data?: (s5g.game.proto.ICampaignData|null);
            }

            /** Represents a ResultRecall. */
            class ResultRecall implements IResultRecall {

                /**
                 * Constructs a new ResultRecall.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: s5g.game.proto.IResultRecall);

                /** ResultRecall msgid. */
                public msgid: s5g.game.proto.EMSGID;

                /** ResultRecall status_code. */
                public status_code: s5g.game.proto.Status.Code;

                /** ResultRecall result. */
                public result?: (s5g.game.proto.ISlotResult|null);

                /** ResultRecall player_cent. */
                public player_cent: (number|Long);

                /** ResultRecall next_module. */
                public next_module: string;

                /** ResultRecall cur_module_play_times. */
                public cur_module_play_times: number;

                /** ResultRecall cur_module_total_times. */
                public cur_module_total_times: number;

                /** ResultRecall member_info. */
                public member_info?: (s5g.game.proto.IMemberInfo|null);

                /** ResultRecall ups_data. */
                public ups_data?: (s5g.game.proto.ResultRecall.IUPSdata|null);

                /** ResultRecall marquee_data. */
                public marquee_data: s5g.game.proto.ResultRecall.IMarqueeData[];

                /** ResultRecall campaign_data. */
                public campaign_data?: (s5g.game.proto.ICampaignData|null);

                /**
                 * Creates a new ResultRecall instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ResultRecall instance
                 */
                public static create(properties?: s5g.game.proto.IResultRecall): s5g.game.proto.ResultRecall;

                /**
                 * Encodes the specified ResultRecall message. Does not implicitly {@link s5g.game.proto.ResultRecall.verify|verify} messages.
                 * @param message ResultRecall message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: s5g.game.proto.IResultRecall, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ResultRecall message, length delimited. Does not implicitly {@link s5g.game.proto.ResultRecall.verify|verify} messages.
                 * @param message ResultRecall message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: s5g.game.proto.IResultRecall, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a ResultRecall message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns ResultRecall
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.ResultRecall;

                /**
                 * Decodes a ResultRecall message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns ResultRecall
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.ResultRecall;

                /**
                 * Verifies a ResultRecall message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a ResultRecall message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ResultRecall
                 */
                public static fromObject(object: { [k: string]: any }): s5g.game.proto.ResultRecall;

                /**
                 * Creates a plain object from a ResultRecall message. Also converts values to other types if specified.
                 * @param message ResultRecall
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: s5g.game.proto.ResultRecall, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ResultRecall to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            namespace ResultRecall {

                /** Properties of a UPSdata. */
                interface IUPSdata {

                    /** UPSdata upscoin_cent */
                    upscoin_cent?: (number|Long|null);

                    /** UPSdata ups_switch */
                    ups_switch?: (boolean|null);

                    /** UPSdata threshold */
                    threshold?: (number|Long|null);

                    /** UPSdata coin_in */
                    coin_in?: (number|Long|null);

                    /** UPSdata is_transfer */
                    is_transfer?: (boolean|null);

                    /** UPSdata transfer_cent */
                    transfer_cent?: (number|Long|null);

                    /** UPSdata remain_time */
                    remain_time?: (string|null);
                }

                /** Represents a UPSdata. */
                class UPSdata implements IUPSdata {

                    /**
                     * Constructs a new UPSdata.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: s5g.game.proto.ResultRecall.IUPSdata);

                    /** UPSdata upscoin_cent. */
                    public upscoin_cent: (number|Long);

                    /** UPSdata ups_switch. */
                    public ups_switch: boolean;

                    /** UPSdata threshold. */
                    public threshold: (number|Long);

                    /** UPSdata coin_in. */
                    public coin_in: (number|Long);

                    /** UPSdata is_transfer. */
                    public is_transfer: boolean;

                    /** UPSdata transfer_cent. */
                    public transfer_cent: (number|Long);

                    /** UPSdata remain_time. */
                    public remain_time: string;

                    /**
                     * Creates a new UPSdata instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns UPSdata instance
                     */
                    public static create(properties?: s5g.game.proto.ResultRecall.IUPSdata): s5g.game.proto.ResultRecall.UPSdata;

                    /**
                     * Encodes the specified UPSdata message. Does not implicitly {@link s5g.game.proto.ResultRecall.UPSdata.verify|verify} messages.
                     * @param message UPSdata message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: s5g.game.proto.ResultRecall.IUPSdata, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified UPSdata message, length delimited. Does not implicitly {@link s5g.game.proto.ResultRecall.UPSdata.verify|verify} messages.
                     * @param message UPSdata message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: s5g.game.proto.ResultRecall.IUPSdata, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a UPSdata message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns UPSdata
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.ResultRecall.UPSdata;

                    /**
                     * Decodes a UPSdata message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns UPSdata
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.ResultRecall.UPSdata;

                    /**
                     * Verifies a UPSdata message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a UPSdata message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns UPSdata
                     */
                    public static fromObject(object: { [k: string]: any }): s5g.game.proto.ResultRecall.UPSdata;

                    /**
                     * Creates a plain object from a UPSdata message. Also converts values to other types if specified.
                     * @param message UPSdata
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: s5g.game.proto.ResultRecall.UPSdata, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this UPSdata to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a MarqueeData. */
                interface IMarqueeData {

                    /** MarqueeData type */
                    type?: (number|null);

                    /** MarqueeData level */
                    level?: (number|null);

                    /** MarqueeData data1 */
                    data1?: (string|null);

                    /** MarqueeData data2 */
                    data2?: (string|null);

                    /** MarqueeData show_time */
                    show_time?: (number|null);

                    /** MarqueeData delay_time */
                    delay_time?: (number|null);
                }

                /** Represents a MarqueeData. */
                class MarqueeData implements IMarqueeData {

                    /**
                     * Constructs a new MarqueeData.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: s5g.game.proto.ResultRecall.IMarqueeData);

                    /** MarqueeData type. */
                    public type: number;

                    /** MarqueeData level. */
                    public level: number;

                    /** MarqueeData data1. */
                    public data1: string;

                    /** MarqueeData data2. */
                    public data2: string;

                    /** MarqueeData show_time. */
                    public show_time: number;

                    /** MarqueeData delay_time. */
                    public delay_time: number;

                    /**
                     * Creates a new MarqueeData instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns MarqueeData instance
                     */
                    public static create(properties?: s5g.game.proto.ResultRecall.IMarqueeData): s5g.game.proto.ResultRecall.MarqueeData;

                    /**
                     * Encodes the specified MarqueeData message. Does not implicitly {@link s5g.game.proto.ResultRecall.MarqueeData.verify|verify} messages.
                     * @param message MarqueeData message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: s5g.game.proto.ResultRecall.IMarqueeData, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified MarqueeData message, length delimited. Does not implicitly {@link s5g.game.proto.ResultRecall.MarqueeData.verify|verify} messages.
                     * @param message MarqueeData message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: s5g.game.proto.ResultRecall.IMarqueeData, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a MarqueeData message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns MarqueeData
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.ResultRecall.MarqueeData;

                    /**
                     * Decodes a MarqueeData message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns MarqueeData
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.ResultRecall.MarqueeData;

                    /**
                     * Verifies a MarqueeData message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a MarqueeData message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns MarqueeData
                     */
                    public static fromObject(object: { [k: string]: any }): s5g.game.proto.ResultRecall.MarqueeData;

                    /**
                     * Creates a plain object from a MarqueeData message. Also converts values to other types if specified.
                     * @param message MarqueeData
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: s5g.game.proto.ResultRecall.MarqueeData, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this MarqueeData to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }
            }

            /** OPTION_MODE enum. */
            enum OPTION_MODE {
                eGetSpins = 1,
                eGetMultiplier = 2,
                eGetSpinandMultiplier = 3,
                eGetLockPattern = 4,
                eGetJp888Option = 5,
                eGetSelectGameOption = 6,
                eGetMoneyMeowOption = 7,
                eGetCreOption = 8,
                eGetCoinMasterOption = 9,
                eGetTamagotchiDinosaurOption = 10,
                eGetTamagotchiSubGame1 = 11,
                eGetTamagotchiSubGame2 = 12,
                eGetTamagotchiSubGame3 = 13,
                eGetFullRandomPay = 14
            }

            /** Properties of an OptionCall. */
            interface IOptionCall {

                /** OptionCall msgid */
                msgid: s5g.game.proto.EMSGID;

                /** OptionCall token */
                token: string;

                /** OptionCall player_opt_index */
                player_opt_index: number;

                /** OptionCall opt_mode */
                opt_mode: s5g.game.proto.OPTION_MODE;
            }

            /** Represents an OptionCall. */
            class OptionCall implements IOptionCall {

                /**
                 * Constructs a new OptionCall.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: s5g.game.proto.IOptionCall);

                /** OptionCall msgid. */
                public msgid: s5g.game.proto.EMSGID;

                /** OptionCall token. */
                public token: string;

                /** OptionCall player_opt_index. */
                public player_opt_index: number;

                /** OptionCall opt_mode. */
                public opt_mode: s5g.game.proto.OPTION_MODE;

                /**
                 * Creates a new OptionCall instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns OptionCall instance
                 */
                public static create(properties?: s5g.game.proto.IOptionCall): s5g.game.proto.OptionCall;

                /**
                 * Encodes the specified OptionCall message. Does not implicitly {@link s5g.game.proto.OptionCall.verify|verify} messages.
                 * @param message OptionCall message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: s5g.game.proto.IOptionCall, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified OptionCall message, length delimited. Does not implicitly {@link s5g.game.proto.OptionCall.verify|verify} messages.
                 * @param message OptionCall message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: s5g.game.proto.IOptionCall, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an OptionCall message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns OptionCall
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.OptionCall;

                /**
                 * Decodes an OptionCall message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns OptionCall
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.OptionCall;

                /**
                 * Verifies an OptionCall message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an OptionCall message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns OptionCall
                 */
                public static fromObject(object: { [k: string]: any }): s5g.game.proto.OptionCall;

                /**
                 * Creates a plain object from an OptionCall message. Also converts values to other types if specified.
                 * @param message OptionCall
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: s5g.game.proto.OptionCall, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this OptionCall to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of an OptionRecall. */
            interface IOptionRecall {

                /** OptionRecall msgid */
                msgid: s5g.game.proto.EMSGID;

                /** OptionRecall status_code */
                status_code: s5g.game.proto.Status.Code;

                /** OptionRecall player_opt_index */
                player_opt_index?: (number|null);

                /** OptionRecall multiplier */
                multiplier?: (number[]|null);

                /** OptionRecall earn_times */
                earn_times?: (number[]|null);

                /** OptionRecall win_nextmodule */
                win_nextmodule?: (string|null);

                /** OptionRecall lock_pattern */
                lock_pattern?: (number[]|null);

                /** OptionRecall jp888_option */
                jp888_option?: (number[]|null);

                /** OptionRecall win_option */
                win_option?: (number|null);

                /** OptionRecall pay */
                pay?: (number|null);

                /** OptionRecall trigger_index */
                trigger_index?: (number|null);

                /** OptionRecall money_meow_options */
                money_meow_options?: (number[]|null);

                /** OptionRecall bonus_times */
                bonus_times?: (number|null);

                /** OptionRecall options */
                options?: (s5g.game.proto.OptionRecall.IOption[]|null);

                /** OptionRecall attack_level */
                attack_level?: (number|null);

                /** OptionRecall get_shield */
                get_shield?: (boolean|null);

                /** OptionRecall gain_coin */
                gain_coin?: (number|null);

                /** OptionRecall arcade_tamagotchi */
                arcade_tamagotchi?: (s5g.game.proto.OptionRecall.IArcadeTamagotchi|null);

                /** OptionRecall player_cent */
                player_cent?: (number|Long|null);

                /** OptionRecall common_data_info */
                common_data_info?: (s5g.game.proto.ICommonDataInfo|null);

                /** OptionRecall ups_data */
                ups_data?: (s5g.game.proto.OptionRecall.IUPSdata|null);
            }

            /** Represents an OptionRecall. */
            class OptionRecall implements IOptionRecall {

                /**
                 * Constructs a new OptionRecall.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: s5g.game.proto.IOptionRecall);

                /** OptionRecall msgid. */
                public msgid: s5g.game.proto.EMSGID;

                /** OptionRecall status_code. */
                public status_code: s5g.game.proto.Status.Code;

                /** OptionRecall player_opt_index. */
                public player_opt_index: number;

                /** OptionRecall multiplier. */
                public multiplier: number[];

                /** OptionRecall earn_times. */
                public earn_times: number[];

                /** OptionRecall win_nextmodule. */
                public win_nextmodule: string;

                /** OptionRecall lock_pattern. */
                public lock_pattern: number[];

                /** OptionRecall jp888_option. */
                public jp888_option: number[];

                /** OptionRecall win_option. */
                public win_option: number;

                /** OptionRecall pay. */
                public pay: number;

                /** OptionRecall trigger_index. */
                public trigger_index: number;

                /** OptionRecall money_meow_options. */
                public money_meow_options: number[];

                /** OptionRecall bonus_times. */
                public bonus_times: number;

                /** OptionRecall options. */
                public options: s5g.game.proto.OptionRecall.IOption[];

                /** OptionRecall attack_level. */
                public attack_level: number;

                /** OptionRecall get_shield. */
                public get_shield: boolean;

                /** OptionRecall gain_coin. */
                public gain_coin: number;

                /** OptionRecall arcade_tamagotchi. */
                public arcade_tamagotchi?: (s5g.game.proto.OptionRecall.IArcadeTamagotchi|null);

                /** OptionRecall player_cent. */
                public player_cent: (number|Long);

                /** OptionRecall common_data_info. */
                public common_data_info?: (s5g.game.proto.ICommonDataInfo|null);

                /** OptionRecall ups_data. */
                public ups_data?: (s5g.game.proto.OptionRecall.IUPSdata|null);

                /**
                 * Creates a new OptionRecall instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns OptionRecall instance
                 */
                public static create(properties?: s5g.game.proto.IOptionRecall): s5g.game.proto.OptionRecall;

                /**
                 * Encodes the specified OptionRecall message. Does not implicitly {@link s5g.game.proto.OptionRecall.verify|verify} messages.
                 * @param message OptionRecall message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: s5g.game.proto.IOptionRecall, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified OptionRecall message, length delimited. Does not implicitly {@link s5g.game.proto.OptionRecall.verify|verify} messages.
                 * @param message OptionRecall message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: s5g.game.proto.IOptionRecall, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an OptionRecall message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns OptionRecall
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.OptionRecall;

                /**
                 * Decodes an OptionRecall message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns OptionRecall
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.OptionRecall;

                /**
                 * Verifies an OptionRecall message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an OptionRecall message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns OptionRecall
                 */
                public static fromObject(object: { [k: string]: any }): s5g.game.proto.OptionRecall;

                /**
                 * Creates a plain object from an OptionRecall message. Also converts values to other types if specified.
                 * @param message OptionRecall
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: s5g.game.proto.OptionRecall, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this OptionRecall to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            namespace OptionRecall {

                /** Properties of an Option. */
                interface IOption {

                    /** Option item */
                    item: number;

                    /** Option value */
                    value?: (number|null);
                }

                /** Represents an Option. */
                class Option implements IOption {

                    /**
                     * Constructs a new Option.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: s5g.game.proto.OptionRecall.IOption);

                    /** Option item. */
                    public item: number;

                    /** Option value. */
                    public value: number;

                    /**
                     * Creates a new Option instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns Option instance
                     */
                    public static create(properties?: s5g.game.proto.OptionRecall.IOption): s5g.game.proto.OptionRecall.Option;

                    /**
                     * Encodes the specified Option message. Does not implicitly {@link s5g.game.proto.OptionRecall.Option.verify|verify} messages.
                     * @param message Option message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: s5g.game.proto.OptionRecall.IOption, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified Option message, length delimited. Does not implicitly {@link s5g.game.proto.OptionRecall.Option.verify|verify} messages.
                     * @param message Option message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: s5g.game.proto.OptionRecall.IOption, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes an Option message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns Option
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.OptionRecall.Option;

                    /**
                     * Decodes an Option message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns Option
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.OptionRecall.Option;

                    /**
                     * Verifies an Option message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates an Option message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns Option
                     */
                    public static fromObject(object: { [k: string]: any }): s5g.game.proto.OptionRecall.Option;

                    /**
                     * Creates a plain object from an Option message. Also converts values to other types if specified.
                     * @param message Option
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: s5g.game.proto.OptionRecall.Option, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this Option to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of an ArcadeTamagotchi. */
                interface IArcadeTamagotchi {

                    /** ArcadeTamagotchi virtual_coin */
                    virtual_coin?: (number|null);

                    /** ArcadeTamagotchi Dinosaurs_data */
                    Dinosaurs_data?: (s5g.game.proto.OptionRecall.ArcadeTamagotchi.IDinosaurInfo[]|null);

                    /** ArcadeTamagotchi sub_game_data */
                    sub_game_data?: (s5g.game.proto.OptionRecall.ArcadeTamagotchi.ISubgameInfo|null);

                    /** ArcadeTamagotchi News_data */
                    News_data?: (s5g.game.proto.OptionRecall.ArcadeTamagotchi.INewsInfo[]|null);

                    /** ArcadeTamagotchi Dead_data */
                    Dead_data?: (s5g.game.proto.OptionRecall.ArcadeTamagotchi.IDinosaurInfo[]|null);

                    /** ArcadeTamagotchi is_reach_VC_max */
                    is_reach_VC_max?: (boolean|null);

                    /** ArcadeTamagotchi food_amount */
                    food_amount?: (number|null);
                }

                /** Represents an ArcadeTamagotchi. */
                class ArcadeTamagotchi implements IArcadeTamagotchi {

                    /**
                     * Constructs a new ArcadeTamagotchi.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: s5g.game.proto.OptionRecall.IArcadeTamagotchi);

                    /** ArcadeTamagotchi virtual_coin. */
                    public virtual_coin: number;

                    /** ArcadeTamagotchi Dinosaurs_data. */
                    public Dinosaurs_data: s5g.game.proto.OptionRecall.ArcadeTamagotchi.IDinosaurInfo[];

                    /** ArcadeTamagotchi sub_game_data. */
                    public sub_game_data?: (s5g.game.proto.OptionRecall.ArcadeTamagotchi.ISubgameInfo|null);

                    /** ArcadeTamagotchi News_data. */
                    public News_data: s5g.game.proto.OptionRecall.ArcadeTamagotchi.INewsInfo[];

                    /** ArcadeTamagotchi Dead_data. */
                    public Dead_data: s5g.game.proto.OptionRecall.ArcadeTamagotchi.IDinosaurInfo[];

                    /** ArcadeTamagotchi is_reach_VC_max. */
                    public is_reach_VC_max: boolean;

                    /** ArcadeTamagotchi food_amount. */
                    public food_amount: number;

                    /**
                     * Creates a new ArcadeTamagotchi instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns ArcadeTamagotchi instance
                     */
                    public static create(properties?: s5g.game.proto.OptionRecall.IArcadeTamagotchi): s5g.game.proto.OptionRecall.ArcadeTamagotchi;

                    /**
                     * Encodes the specified ArcadeTamagotchi message. Does not implicitly {@link s5g.game.proto.OptionRecall.ArcadeTamagotchi.verify|verify} messages.
                     * @param message ArcadeTamagotchi message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: s5g.game.proto.OptionRecall.IArcadeTamagotchi, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified ArcadeTamagotchi message, length delimited. Does not implicitly {@link s5g.game.proto.OptionRecall.ArcadeTamagotchi.verify|verify} messages.
                     * @param message ArcadeTamagotchi message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: s5g.game.proto.OptionRecall.IArcadeTamagotchi, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes an ArcadeTamagotchi message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns ArcadeTamagotchi
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.OptionRecall.ArcadeTamagotchi;

                    /**
                     * Decodes an ArcadeTamagotchi message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns ArcadeTamagotchi
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.OptionRecall.ArcadeTamagotchi;

                    /**
                     * Verifies an ArcadeTamagotchi message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates an ArcadeTamagotchi message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns ArcadeTamagotchi
                     */
                    public static fromObject(object: { [k: string]: any }): s5g.game.proto.OptionRecall.ArcadeTamagotchi;

                    /**
                     * Creates a plain object from an ArcadeTamagotchi message. Also converts values to other types if specified.
                     * @param message ArcadeTamagotchi
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: s5g.game.proto.OptionRecall.ArcadeTamagotchi, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this ArcadeTamagotchi to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                namespace ArcadeTamagotchi {

                    /** Properties of a DinosaurInfo. */
                    interface IDinosaurInfo {

                        /** DinosaurInfo id */
                        id?: (number|null);

                        /** DinosaurInfo areaNO */
                        areaNO?: (number|null);

                        /** DinosaurInfo type */
                        type?: (number|null);

                        /** DinosaurInfo star */
                        star?: (number|null);

                        /** DinosaurInfo rarity */
                        rarity?: (number|null);

                        /** DinosaurInfo rank */
                        rank?: (number|null);

                        /** DinosaurInfo price */
                        price?: (number|null);

                        /** DinosaurInfo satiation */
                        satiation?: (number|null);

                        /** DinosaurInfo satiation_max */
                        satiation_max?: (number|null);

                        /** DinosaurInfo favorability */
                        favorability?: (number|null);

                        /** DinosaurInfo favorability_max */
                        favorability_max?: (number|null);

                        /** DinosaurInfo get_sick */
                        get_sick?: (boolean|null);

                        /** DinosaurInfo get_dirty */
                        get_dirty?: (boolean|null);

                        /** DinosaurInfo alive */
                        alive?: (boolean|null);

                        /** DinosaurInfo rise */
                        rise?: (boolean|null);

                        /** DinosaurInfo skin_type */
                        skin_type?: (number|null);

                        /** DinosaurInfo remain_time */
                        remain_time?: (string|null);
                    }

                    /** Represents a DinosaurInfo. */
                    class DinosaurInfo implements IDinosaurInfo {

                        /**
                         * Constructs a new DinosaurInfo.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: s5g.game.proto.OptionRecall.ArcadeTamagotchi.IDinosaurInfo);

                        /** DinosaurInfo id. */
                        public id: number;

                        /** DinosaurInfo areaNO. */
                        public areaNO: number;

                        /** DinosaurInfo type. */
                        public type: number;

                        /** DinosaurInfo star. */
                        public star: number;

                        /** DinosaurInfo rarity. */
                        public rarity: number;

                        /** DinosaurInfo rank. */
                        public rank: number;

                        /** DinosaurInfo price. */
                        public price: number;

                        /** DinosaurInfo satiation. */
                        public satiation: number;

                        /** DinosaurInfo satiation_max. */
                        public satiation_max: number;

                        /** DinosaurInfo favorability. */
                        public favorability: number;

                        /** DinosaurInfo favorability_max. */
                        public favorability_max: number;

                        /** DinosaurInfo get_sick. */
                        public get_sick: boolean;

                        /** DinosaurInfo get_dirty. */
                        public get_dirty: boolean;

                        /** DinosaurInfo alive. */
                        public alive: boolean;

                        /** DinosaurInfo rise. */
                        public rise: boolean;

                        /** DinosaurInfo skin_type. */
                        public skin_type: number;

                        /** DinosaurInfo remain_time. */
                        public remain_time: string;

                        /**
                         * Creates a new DinosaurInfo instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns DinosaurInfo instance
                         */
                        public static create(properties?: s5g.game.proto.OptionRecall.ArcadeTamagotchi.IDinosaurInfo): s5g.game.proto.OptionRecall.ArcadeTamagotchi.DinosaurInfo;

                        /**
                         * Encodes the specified DinosaurInfo message. Does not implicitly {@link s5g.game.proto.OptionRecall.ArcadeTamagotchi.DinosaurInfo.verify|verify} messages.
                         * @param message DinosaurInfo message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: s5g.game.proto.OptionRecall.ArcadeTamagotchi.IDinosaurInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Encodes the specified DinosaurInfo message, length delimited. Does not implicitly {@link s5g.game.proto.OptionRecall.ArcadeTamagotchi.DinosaurInfo.verify|verify} messages.
                         * @param message DinosaurInfo message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encodeDelimited(message: s5g.game.proto.OptionRecall.ArcadeTamagotchi.IDinosaurInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a DinosaurInfo message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns DinosaurInfo
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.OptionRecall.ArcadeTamagotchi.DinosaurInfo;

                        /**
                         * Decodes a DinosaurInfo message from the specified reader or buffer, length delimited.
                         * @param reader Reader or buffer to decode from
                         * @returns DinosaurInfo
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.OptionRecall.ArcadeTamagotchi.DinosaurInfo;

                        /**
                         * Verifies a DinosaurInfo message.
                         * @param message Plain object to verify
                         * @returns `null` if valid, otherwise the reason why it is not
                         */
                        public static verify(message: { [k: string]: any }): (string|null);

                        /**
                         * Creates a DinosaurInfo message from a plain object. Also converts values to their respective internal types.
                         * @param object Plain object
                         * @returns DinosaurInfo
                         */
                        public static fromObject(object: { [k: string]: any }): s5g.game.proto.OptionRecall.ArcadeTamagotchi.DinosaurInfo;

                        /**
                         * Creates a plain object from a DinosaurInfo message. Also converts values to other types if specified.
                         * @param message DinosaurInfo
                         * @param [options] Conversion options
                         * @returns Plain object
                         */
                        public static toObject(message: s5g.game.proto.OptionRecall.ArcadeTamagotchi.DinosaurInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

                        /**
                         * Converts this DinosaurInfo to JSON.
                         * @returns JSON object
                         */
                        public toJSON(): { [k: string]: any };
                    }

                    /** Properties of a SubgameInfo. */
                    interface ISubgameInfo {

                        /** SubgameInfo game_type */
                        game_type?: (number|null);

                        /** SubgameInfo already_times */
                        already_times?: (number|null);

                        /** SubgameInfo pay */
                        pay?: (number|null);

                        /** SubgameInfo favorability_gain */
                        favorability_gain?: (number|null);

                        /** SubgameInfo virtual_coin_gain */
                        virtual_coin_gain?: (number|null);

                        /** SubgameInfo food_gain */
                        food_gain?: (number|null);

                        /** SubgameInfo select_pos_array */
                        select_pos_array?: (number[]|null);

                        /** SubgameInfo select_pay_array */
                        select_pay_array?: (number[]|null);

                        /** SubgameInfo is_game_over */
                        is_game_over?: (boolean|null);

                        /** SubgameInfo step_type */
                        step_type?: (number|null);
                    }

                    /** Represents a SubgameInfo. */
                    class SubgameInfo implements ISubgameInfo {

                        /**
                         * Constructs a new SubgameInfo.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: s5g.game.proto.OptionRecall.ArcadeTamagotchi.ISubgameInfo);

                        /** SubgameInfo game_type. */
                        public game_type: number;

                        /** SubgameInfo already_times. */
                        public already_times: number;

                        /** SubgameInfo pay. */
                        public pay: number;

                        /** SubgameInfo favorability_gain. */
                        public favorability_gain: number;

                        /** SubgameInfo virtual_coin_gain. */
                        public virtual_coin_gain: number;

                        /** SubgameInfo food_gain. */
                        public food_gain: number;

                        /** SubgameInfo select_pos_array. */
                        public select_pos_array: number[];

                        /** SubgameInfo select_pay_array. */
                        public select_pay_array: number[];

                        /** SubgameInfo is_game_over. */
                        public is_game_over: boolean;

                        /** SubgameInfo step_type. */
                        public step_type: number;

                        /**
                         * Creates a new SubgameInfo instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns SubgameInfo instance
                         */
                        public static create(properties?: s5g.game.proto.OptionRecall.ArcadeTamagotchi.ISubgameInfo): s5g.game.proto.OptionRecall.ArcadeTamagotchi.SubgameInfo;

                        /**
                         * Encodes the specified SubgameInfo message. Does not implicitly {@link s5g.game.proto.OptionRecall.ArcadeTamagotchi.SubgameInfo.verify|verify} messages.
                         * @param message SubgameInfo message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: s5g.game.proto.OptionRecall.ArcadeTamagotchi.ISubgameInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Encodes the specified SubgameInfo message, length delimited. Does not implicitly {@link s5g.game.proto.OptionRecall.ArcadeTamagotchi.SubgameInfo.verify|verify} messages.
                         * @param message SubgameInfo message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encodeDelimited(message: s5g.game.proto.OptionRecall.ArcadeTamagotchi.ISubgameInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a SubgameInfo message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns SubgameInfo
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.OptionRecall.ArcadeTamagotchi.SubgameInfo;

                        /**
                         * Decodes a SubgameInfo message from the specified reader or buffer, length delimited.
                         * @param reader Reader or buffer to decode from
                         * @returns SubgameInfo
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.OptionRecall.ArcadeTamagotchi.SubgameInfo;

                        /**
                         * Verifies a SubgameInfo message.
                         * @param message Plain object to verify
                         * @returns `null` if valid, otherwise the reason why it is not
                         */
                        public static verify(message: { [k: string]: any }): (string|null);

                        /**
                         * Creates a SubgameInfo message from a plain object. Also converts values to their respective internal types.
                         * @param object Plain object
                         * @returns SubgameInfo
                         */
                        public static fromObject(object: { [k: string]: any }): s5g.game.proto.OptionRecall.ArcadeTamagotchi.SubgameInfo;

                        /**
                         * Creates a plain object from a SubgameInfo message. Also converts values to other types if specified.
                         * @param message SubgameInfo
                         * @param [options] Conversion options
                         * @returns Plain object
                         */
                        public static toObject(message: s5g.game.proto.OptionRecall.ArcadeTamagotchi.SubgameInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

                        /**
                         * Converts this SubgameInfo to JSON.
                         * @returns JSON object
                         */
                        public toJSON(): { [k: string]: any };
                    }

                    /** Properties of a NewsInfo. */
                    interface INewsInfo {

                        /** NewsInfo type */
                        type?: (number|null);

                        /** NewsInfo id */
                        id?: (number|null);

                        /** NewsInfo event_time */
                        event_time?: (string|null);
                    }

                    /** Represents a NewsInfo. */
                    class NewsInfo implements INewsInfo {

                        /**
                         * Constructs a new NewsInfo.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: s5g.game.proto.OptionRecall.ArcadeTamagotchi.INewsInfo);

                        /** NewsInfo type. */
                        public type: number;

                        /** NewsInfo id. */
                        public id: number;

                        /** NewsInfo event_time. */
                        public event_time: string;

                        /**
                         * Creates a new NewsInfo instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns NewsInfo instance
                         */
                        public static create(properties?: s5g.game.proto.OptionRecall.ArcadeTamagotchi.INewsInfo): s5g.game.proto.OptionRecall.ArcadeTamagotchi.NewsInfo;

                        /**
                         * Encodes the specified NewsInfo message. Does not implicitly {@link s5g.game.proto.OptionRecall.ArcadeTamagotchi.NewsInfo.verify|verify} messages.
                         * @param message NewsInfo message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: s5g.game.proto.OptionRecall.ArcadeTamagotchi.INewsInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Encodes the specified NewsInfo message, length delimited. Does not implicitly {@link s5g.game.proto.OptionRecall.ArcadeTamagotchi.NewsInfo.verify|verify} messages.
                         * @param message NewsInfo message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encodeDelimited(message: s5g.game.proto.OptionRecall.ArcadeTamagotchi.INewsInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a NewsInfo message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns NewsInfo
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.OptionRecall.ArcadeTamagotchi.NewsInfo;

                        /**
                         * Decodes a NewsInfo message from the specified reader or buffer, length delimited.
                         * @param reader Reader or buffer to decode from
                         * @returns NewsInfo
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.OptionRecall.ArcadeTamagotchi.NewsInfo;

                        /**
                         * Verifies a NewsInfo message.
                         * @param message Plain object to verify
                         * @returns `null` if valid, otherwise the reason why it is not
                         */
                        public static verify(message: { [k: string]: any }): (string|null);

                        /**
                         * Creates a NewsInfo message from a plain object. Also converts values to their respective internal types.
                         * @param object Plain object
                         * @returns NewsInfo
                         */
                        public static fromObject(object: { [k: string]: any }): s5g.game.proto.OptionRecall.ArcadeTamagotchi.NewsInfo;

                        /**
                         * Creates a plain object from a NewsInfo message. Also converts values to other types if specified.
                         * @param message NewsInfo
                         * @param [options] Conversion options
                         * @returns Plain object
                         */
                        public static toObject(message: s5g.game.proto.OptionRecall.ArcadeTamagotchi.NewsInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

                        /**
                         * Converts this NewsInfo to JSON.
                         * @returns JSON object
                         */
                        public toJSON(): { [k: string]: any };
                    }
                }

                /** Properties of a UPSdata. */
                interface IUPSdata {

                    /** UPSdata upscoin_cent */
                    upscoin_cent?: (number|Long|null);

                    /** UPSdata ups_switch */
                    ups_switch?: (boolean|null);

                    /** UPSdata threshold */
                    threshold?: (number|Long|null);

                    /** UPSdata coin_in */
                    coin_in?: (number|Long|null);

                    /** UPSdata is_transfer */
                    is_transfer?: (boolean|null);

                    /** UPSdata transfer_cent */
                    transfer_cent?: (number|Long|null);

                    /** UPSdata remain_time */
                    remain_time?: (string|null);
                }

                /** Represents a UPSdata. */
                class UPSdata implements IUPSdata {

                    /**
                     * Constructs a new UPSdata.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: s5g.game.proto.OptionRecall.IUPSdata);

                    /** UPSdata upscoin_cent. */
                    public upscoin_cent: (number|Long);

                    /** UPSdata ups_switch. */
                    public ups_switch: boolean;

                    /** UPSdata threshold. */
                    public threshold: (number|Long);

                    /** UPSdata coin_in. */
                    public coin_in: (number|Long);

                    /** UPSdata is_transfer. */
                    public is_transfer: boolean;

                    /** UPSdata transfer_cent. */
                    public transfer_cent: (number|Long);

                    /** UPSdata remain_time. */
                    public remain_time: string;

                    /**
                     * Creates a new UPSdata instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns UPSdata instance
                     */
                    public static create(properties?: s5g.game.proto.OptionRecall.IUPSdata): s5g.game.proto.OptionRecall.UPSdata;

                    /**
                     * Encodes the specified UPSdata message. Does not implicitly {@link s5g.game.proto.OptionRecall.UPSdata.verify|verify} messages.
                     * @param message UPSdata message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: s5g.game.proto.OptionRecall.IUPSdata, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified UPSdata message, length delimited. Does not implicitly {@link s5g.game.proto.OptionRecall.UPSdata.verify|verify} messages.
                     * @param message UPSdata message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: s5g.game.proto.OptionRecall.IUPSdata, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a UPSdata message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns UPSdata
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.OptionRecall.UPSdata;

                    /**
                     * Decodes a UPSdata message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns UPSdata
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.OptionRecall.UPSdata;

                    /**
                     * Verifies a UPSdata message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a UPSdata message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns UPSdata
                     */
                    public static fromObject(object: { [k: string]: any }): s5g.game.proto.OptionRecall.UPSdata;

                    /**
                     * Creates a plain object from a UPSdata message. Also converts values to other types if specified.
                     * @param message UPSdata
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: s5g.game.proto.OptionRecall.UPSdata, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this UPSdata to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }
            }

            /** Properties of a CheckCall. */
            interface ICheckCall {

                /** CheckCall msgid */
                msgid: s5g.game.proto.EMSGID;

                /** CheckCall token */
                token: string;

                /** CheckCall cur_player_cent */
                cur_player_cent: (number|Long);
            }

            /** Represents a CheckCall. */
            class CheckCall implements ICheckCall {

                /**
                 * Constructs a new CheckCall.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: s5g.game.proto.ICheckCall);

                /** CheckCall msgid. */
                public msgid: s5g.game.proto.EMSGID;

                /** CheckCall token. */
                public token: string;

                /** CheckCall cur_player_cent. */
                public cur_player_cent: (number|Long);

                /**
                 * Creates a new CheckCall instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns CheckCall instance
                 */
                public static create(properties?: s5g.game.proto.ICheckCall): s5g.game.proto.CheckCall;

                /**
                 * Encodes the specified CheckCall message. Does not implicitly {@link s5g.game.proto.CheckCall.verify|verify} messages.
                 * @param message CheckCall message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: s5g.game.proto.ICheckCall, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified CheckCall message, length delimited. Does not implicitly {@link s5g.game.proto.CheckCall.verify|verify} messages.
                 * @param message CheckCall message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: s5g.game.proto.ICheckCall, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a CheckCall message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns CheckCall
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.CheckCall;

                /**
                 * Decodes a CheckCall message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns CheckCall
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.CheckCall;

                /**
                 * Verifies a CheckCall message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a CheckCall message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns CheckCall
                 */
                public static fromObject(object: { [k: string]: any }): s5g.game.proto.CheckCall;

                /**
                 * Creates a plain object from a CheckCall message. Also converts values to other types if specified.
                 * @param message CheckCall
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: s5g.game.proto.CheckCall, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this CheckCall to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a CheckRecall. */
            interface ICheckRecall {

                /** CheckRecall msgid */
                msgid: s5g.game.proto.EMSGID;

                /** CheckRecall status_code */
                status_code: s5g.game.proto.Status.Code;
            }

            /** Represents a CheckRecall. */
            class CheckRecall implements ICheckRecall {

                /**
                 * Constructs a new CheckRecall.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: s5g.game.proto.ICheckRecall);

                /** CheckRecall msgid. */
                public msgid: s5g.game.proto.EMSGID;

                /** CheckRecall status_code. */
                public status_code: s5g.game.proto.Status.Code;

                /**
                 * Creates a new CheckRecall instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns CheckRecall instance
                 */
                public static create(properties?: s5g.game.proto.ICheckRecall): s5g.game.proto.CheckRecall;

                /**
                 * Encodes the specified CheckRecall message. Does not implicitly {@link s5g.game.proto.CheckRecall.verify|verify} messages.
                 * @param message CheckRecall message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: s5g.game.proto.ICheckRecall, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified CheckRecall message, length delimited. Does not implicitly {@link s5g.game.proto.CheckRecall.verify|verify} messages.
                 * @param message CheckRecall message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: s5g.game.proto.ICheckRecall, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a CheckRecall message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns CheckRecall
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.CheckRecall;

                /**
                 * Decodes a CheckRecall message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns CheckRecall
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.CheckRecall;

                /**
                 * Verifies a CheckRecall message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a CheckRecall message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns CheckRecall
                 */
                public static fromObject(object: { [k: string]: any }): s5g.game.proto.CheckRecall;

                /**
                 * Creates a plain object from a CheckRecall message. Also converts values to other types if specified.
                 * @param message CheckRecall
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: s5g.game.proto.CheckRecall, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this CheckRecall to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a StateCall. */
            interface IStateCall {

                /** StateCall msgid */
                msgid: s5g.game.proto.EMSGID;

                /** StateCall token */
                token: string;

                /** StateCall stateid */
                stateid: s5g.game.proto.ESTATEID;

                /** StateCall reserved */
                reserved?: (number[]|null);
            }

            /** Represents a StateCall. */
            class StateCall implements IStateCall {

                /**
                 * Constructs a new StateCall.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: s5g.game.proto.IStateCall);

                /** StateCall msgid. */
                public msgid: s5g.game.proto.EMSGID;

                /** StateCall token. */
                public token: string;

                /** StateCall stateid. */
                public stateid: s5g.game.proto.ESTATEID;

                /** StateCall reserved. */
                public reserved: number[];

                /**
                 * Creates a new StateCall instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns StateCall instance
                 */
                public static create(properties?: s5g.game.proto.IStateCall): s5g.game.proto.StateCall;

                /**
                 * Encodes the specified StateCall message. Does not implicitly {@link s5g.game.proto.StateCall.verify|verify} messages.
                 * @param message StateCall message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: s5g.game.proto.IStateCall, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified StateCall message, length delimited. Does not implicitly {@link s5g.game.proto.StateCall.verify|verify} messages.
                 * @param message StateCall message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: s5g.game.proto.IStateCall, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a StateCall message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns StateCall
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.StateCall;

                /**
                 * Decodes a StateCall message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns StateCall
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.StateCall;

                /**
                 * Verifies a StateCall message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a StateCall message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns StateCall
                 */
                public static fromObject(object: { [k: string]: any }): s5g.game.proto.StateCall;

                /**
                 * Creates a plain object from a StateCall message. Also converts values to other types if specified.
                 * @param message StateCall
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: s5g.game.proto.StateCall, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this StateCall to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a StateRecall. */
            interface IStateRecall {

                /** StateRecall msgid */
                msgid: s5g.game.proto.EMSGID;

                /** StateRecall status_code */
                status_code: s5g.game.proto.Status.Code;
            }

            /** Represents a StateRecall. */
            class StateRecall implements IStateRecall {

                /**
                 * Constructs a new StateRecall.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: s5g.game.proto.IStateRecall);

                /** StateRecall msgid. */
                public msgid: s5g.game.proto.EMSGID;

                /** StateRecall status_code. */
                public status_code: s5g.game.proto.Status.Code;

                /**
                 * Creates a new StateRecall instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns StateRecall instance
                 */
                public static create(properties?: s5g.game.proto.IStateRecall): s5g.game.proto.StateRecall;

                /**
                 * Encodes the specified StateRecall message. Does not implicitly {@link s5g.game.proto.StateRecall.verify|verify} messages.
                 * @param message StateRecall message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: s5g.game.proto.IStateRecall, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified StateRecall message, length delimited. Does not implicitly {@link s5g.game.proto.StateRecall.verify|verify} messages.
                 * @param message StateRecall message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: s5g.game.proto.IStateRecall, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a StateRecall message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns StateRecall
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.StateRecall;

                /**
                 * Decodes a StateRecall message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns StateRecall
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.StateRecall;

                /**
                 * Verifies a StateRecall message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a StateRecall message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns StateRecall
                 */
                public static fromObject(object: { [k: string]: any }): s5g.game.proto.StateRecall;

                /**
                 * Creates a plain object from a StateRecall message. Also converts values to other types if specified.
                 * @param message StateRecall
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: s5g.game.proto.StateRecall, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this StateRecall to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a SuicideCall. */
            interface ISuicideCall {

                /** SuicideCall msgid */
                msgid: s5g.game.proto.EMSGID;
            }

            /** Represents a SuicideCall. */
            class SuicideCall implements ISuicideCall {

                /**
                 * Constructs a new SuicideCall.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: s5g.game.proto.ISuicideCall);

                /** SuicideCall msgid. */
                public msgid: s5g.game.proto.EMSGID;

                /**
                 * Creates a new SuicideCall instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns SuicideCall instance
                 */
                public static create(properties?: s5g.game.proto.ISuicideCall): s5g.game.proto.SuicideCall;

                /**
                 * Encodes the specified SuicideCall message. Does not implicitly {@link s5g.game.proto.SuicideCall.verify|verify} messages.
                 * @param message SuicideCall message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: s5g.game.proto.ISuicideCall, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified SuicideCall message, length delimited. Does not implicitly {@link s5g.game.proto.SuicideCall.verify|verify} messages.
                 * @param message SuicideCall message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: s5g.game.proto.ISuicideCall, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a SuicideCall message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns SuicideCall
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.SuicideCall;

                /**
                 * Decodes a SuicideCall message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns SuicideCall
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.SuicideCall;

                /**
                 * Verifies a SuicideCall message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a SuicideCall message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns SuicideCall
                 */
                public static fromObject(object: { [k: string]: any }): s5g.game.proto.SuicideCall;

                /**
                 * Creates a plain object from a SuicideCall message. Also converts values to other types if specified.
                 * @param message SuicideCall
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: s5g.game.proto.SuicideCall, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this SuicideCall to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a DataCall. */
            interface IDataCall {

                /** DataCall msgid */
                msgid: s5g.game.proto.EMSGID;

                /** DataCall token */
                token: string;

                /** DataCall target_index */
                target_index?: (number|null);

                /** DataCall target_value */
                target_value?: (number|null);
            }

            /** Represents a DataCall. */
            class DataCall implements IDataCall {

                /**
                 * Constructs a new DataCall.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: s5g.game.proto.IDataCall);

                /** DataCall msgid. */
                public msgid: s5g.game.proto.EMSGID;

                /** DataCall token. */
                public token: string;

                /** DataCall target_index. */
                public target_index: number;

                /** DataCall target_value. */
                public target_value: number;

                /**
                 * Creates a new DataCall instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns DataCall instance
                 */
                public static create(properties?: s5g.game.proto.IDataCall): s5g.game.proto.DataCall;

                /**
                 * Encodes the specified DataCall message. Does not implicitly {@link s5g.game.proto.DataCall.verify|verify} messages.
                 * @param message DataCall message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: s5g.game.proto.IDataCall, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified DataCall message, length delimited. Does not implicitly {@link s5g.game.proto.DataCall.verify|verify} messages.
                 * @param message DataCall message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: s5g.game.proto.IDataCall, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a DataCall message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns DataCall
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.DataCall;

                /**
                 * Decodes a DataCall message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns DataCall
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.DataCall;

                /**
                 * Verifies a DataCall message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a DataCall message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns DataCall
                 */
                public static fromObject(object: { [k: string]: any }): s5g.game.proto.DataCall;

                /**
                 * Creates a plain object from a DataCall message. Also converts values to other types if specified.
                 * @param message DataCall
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: s5g.game.proto.DataCall, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this DataCall to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a DataRecall. */
            interface IDataRecall {

                /** DataRecall msgid */
                msgid: s5g.game.proto.EMSGID;

                /** DataRecall status_code */
                status_code: s5g.game.proto.Status.Code;

                /** DataRecall arcade_football */
                arcade_football?: (s5g.game.proto.DataRecall.IArcadeFootBall|null);

                /** DataRecall arcade_tamagotchi */
                arcade_tamagotchi?: (s5g.game.proto.DataRecall.IArcadeTamagotchi|null);

                /** DataRecall record_list */
                record_list?: (s5g.game.proto.DataRecall.IRecordList[]|null);

                /** DataRecall player_cent */
                player_cent?: (number|Long|null);

                /** DataRecall ups_data */
                ups_data?: (s5g.game.proto.DataRecall.IUPSdata|null);
            }

            /** Represents a DataRecall. */
            class DataRecall implements IDataRecall {

                /**
                 * Constructs a new DataRecall.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: s5g.game.proto.IDataRecall);

                /** DataRecall msgid. */
                public msgid: s5g.game.proto.EMSGID;

                /** DataRecall status_code. */
                public status_code: s5g.game.proto.Status.Code;

                /** DataRecall arcade_football. */
                public arcade_football?: (s5g.game.proto.DataRecall.IArcadeFootBall|null);

                /** DataRecall arcade_tamagotchi. */
                public arcade_tamagotchi?: (s5g.game.proto.DataRecall.IArcadeTamagotchi|null);

                /** DataRecall record_list. */
                public record_list: s5g.game.proto.DataRecall.IRecordList[];

                /** DataRecall player_cent. */
                public player_cent: (number|Long);

                /** DataRecall ups_data. */
                public ups_data?: (s5g.game.proto.DataRecall.IUPSdata|null);

                /**
                 * Creates a new DataRecall instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns DataRecall instance
                 */
                public static create(properties?: s5g.game.proto.IDataRecall): s5g.game.proto.DataRecall;

                /**
                 * Encodes the specified DataRecall message. Does not implicitly {@link s5g.game.proto.DataRecall.verify|verify} messages.
                 * @param message DataRecall message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: s5g.game.proto.IDataRecall, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified DataRecall message, length delimited. Does not implicitly {@link s5g.game.proto.DataRecall.verify|verify} messages.
                 * @param message DataRecall message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: s5g.game.proto.IDataRecall, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a DataRecall message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns DataRecall
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.DataRecall;

                /**
                 * Decodes a DataRecall message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns DataRecall
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.DataRecall;

                /**
                 * Verifies a DataRecall message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a DataRecall message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns DataRecall
                 */
                public static fromObject(object: { [k: string]: any }): s5g.game.proto.DataRecall;

                /**
                 * Creates a plain object from a DataRecall message. Also converts values to other types if specified.
                 * @param message DataRecall
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: s5g.game.proto.DataRecall, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this DataRecall to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            namespace DataRecall {

                /** Properties of an ArcadeFootBall. */
                interface IArcadeFootBall {

                    /** ArcadeFootBall new_game_Combination */
                    new_game_Combination?: (s5g.game.proto.DataRecall.ArcadeFootBall.ICombination[]|null);

                    /** ArcadeFootBall arcad_unit */
                    arcad_unit?: (number|null);

                    /** ArcadeFootBall bet_maximum */
                    bet_maximum?: (number|null);

                    /** ArcadeFootBall bet_minimum */
                    bet_minimum?: (number|null);
                }

                /** Represents an ArcadeFootBall. */
                class ArcadeFootBall implements IArcadeFootBall {

                    /**
                     * Constructs a new ArcadeFootBall.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: s5g.game.proto.DataRecall.IArcadeFootBall);

                    /** ArcadeFootBall new_game_Combination. */
                    public new_game_Combination: s5g.game.proto.DataRecall.ArcadeFootBall.ICombination[];

                    /** ArcadeFootBall arcad_unit. */
                    public arcad_unit: number;

                    /** ArcadeFootBall bet_maximum. */
                    public bet_maximum: number;

                    /** ArcadeFootBall bet_minimum. */
                    public bet_minimum: number;

                    /**
                     * Creates a new ArcadeFootBall instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns ArcadeFootBall instance
                     */
                    public static create(properties?: s5g.game.proto.DataRecall.IArcadeFootBall): s5g.game.proto.DataRecall.ArcadeFootBall;

                    /**
                     * Encodes the specified ArcadeFootBall message. Does not implicitly {@link s5g.game.proto.DataRecall.ArcadeFootBall.verify|verify} messages.
                     * @param message ArcadeFootBall message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: s5g.game.proto.DataRecall.IArcadeFootBall, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified ArcadeFootBall message, length delimited. Does not implicitly {@link s5g.game.proto.DataRecall.ArcadeFootBall.verify|verify} messages.
                     * @param message ArcadeFootBall message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: s5g.game.proto.DataRecall.IArcadeFootBall, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes an ArcadeFootBall message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns ArcadeFootBall
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.DataRecall.ArcadeFootBall;

                    /**
                     * Decodes an ArcadeFootBall message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns ArcadeFootBall
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.DataRecall.ArcadeFootBall;

                    /**
                     * Verifies an ArcadeFootBall message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates an ArcadeFootBall message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns ArcadeFootBall
                     */
                    public static fromObject(object: { [k: string]: any }): s5g.game.proto.DataRecall.ArcadeFootBall;

                    /**
                     * Creates a plain object from an ArcadeFootBall message. Also converts values to other types if specified.
                     * @param message ArcadeFootBall
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: s5g.game.proto.DataRecall.ArcadeFootBall, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this ArcadeFootBall to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                namespace ArcadeFootBall {

                    /** Properties of a Combination. */
                    interface ICombination {

                        /** Combination game_num */
                        game_num?: (number|null);

                        /** Combination home_id */
                        home_id?: (number|null);

                        /** Combination away_id */
                        away_id?: (number|null);

                        /** Combination home_name */
                        home_name?: (string|null);

                        /** Combination away_name */
                        away_name?: (string|null);

                        /** Combination home_odds */
                        home_odds?: (number|null);

                        /** Combination away_odds */
                        away_odds?: (number|null);

                        /** Combination tie_odds */
                        tie_odds?: (number|null);
                    }

                    /** Represents a Combination. */
                    class Combination implements ICombination {

                        /**
                         * Constructs a new Combination.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: s5g.game.proto.DataRecall.ArcadeFootBall.ICombination);

                        /** Combination game_num. */
                        public game_num: number;

                        /** Combination home_id. */
                        public home_id: number;

                        /** Combination away_id. */
                        public away_id: number;

                        /** Combination home_name. */
                        public home_name: string;

                        /** Combination away_name. */
                        public away_name: string;

                        /** Combination home_odds. */
                        public home_odds: number;

                        /** Combination away_odds. */
                        public away_odds: number;

                        /** Combination tie_odds. */
                        public tie_odds: number;

                        /**
                         * Creates a new Combination instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns Combination instance
                         */
                        public static create(properties?: s5g.game.proto.DataRecall.ArcadeFootBall.ICombination): s5g.game.proto.DataRecall.ArcadeFootBall.Combination;

                        /**
                         * Encodes the specified Combination message. Does not implicitly {@link s5g.game.proto.DataRecall.ArcadeFootBall.Combination.verify|verify} messages.
                         * @param message Combination message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: s5g.game.proto.DataRecall.ArcadeFootBall.ICombination, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Encodes the specified Combination message, length delimited. Does not implicitly {@link s5g.game.proto.DataRecall.ArcadeFootBall.Combination.verify|verify} messages.
                         * @param message Combination message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encodeDelimited(message: s5g.game.proto.DataRecall.ArcadeFootBall.ICombination, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a Combination message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns Combination
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.DataRecall.ArcadeFootBall.Combination;

                        /**
                         * Decodes a Combination message from the specified reader or buffer, length delimited.
                         * @param reader Reader or buffer to decode from
                         * @returns Combination
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.DataRecall.ArcadeFootBall.Combination;

                        /**
                         * Verifies a Combination message.
                         * @param message Plain object to verify
                         * @returns `null` if valid, otherwise the reason why it is not
                         */
                        public static verify(message: { [k: string]: any }): (string|null);

                        /**
                         * Creates a Combination message from a plain object. Also converts values to their respective internal types.
                         * @param object Plain object
                         * @returns Combination
                         */
                        public static fromObject(object: { [k: string]: any }): s5g.game.proto.DataRecall.ArcadeFootBall.Combination;

                        /**
                         * Creates a plain object from a Combination message. Also converts values to other types if specified.
                         * @param message Combination
                         * @param [options] Conversion options
                         * @returns Plain object
                         */
                        public static toObject(message: s5g.game.proto.DataRecall.ArcadeFootBall.Combination, options?: $protobuf.IConversionOptions): { [k: string]: any };

                        /**
                         * Converts this Combination to JSON.
                         * @returns JSON object
                         */
                        public toJSON(): { [k: string]: any };
                    }
                }

                /** Properties of an ArcadeTamagotchi. */
                interface IArcadeTamagotchi {

                    /** ArcadeTamagotchi virtual_coin */
                    virtual_coin?: (number|null);

                    /** ArcadeTamagotchi Dinosaurs_data */
                    Dinosaurs_data?: (s5g.game.proto.DataRecall.ArcadeTamagotchi.IDinosaurInfo[]|null);

                    /** ArcadeTamagotchi Scene_data */
                    Scene_data?: (s5g.game.proto.DataRecall.ArcadeTamagotchi.ISceneInfo[]|null);

                    /** ArcadeTamagotchi Area_data */
                    Area_data?: (s5g.game.proto.DataRecall.ArcadeTamagotchi.IAreaInfo[]|null);

                    /** ArcadeTamagotchi News_data */
                    News_data?: (s5g.game.proto.DataRecall.ArcadeTamagotchi.INewsInfo[]|null);

                    /** ArcadeTamagotchi Dead_data */
                    Dead_data?: (s5g.game.proto.DataRecall.ArcadeTamagotchi.IDinosaurInfo[]|null);
                }

                /** Represents an ArcadeTamagotchi. */
                class ArcadeTamagotchi implements IArcadeTamagotchi {

                    /**
                     * Constructs a new ArcadeTamagotchi.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: s5g.game.proto.DataRecall.IArcadeTamagotchi);

                    /** ArcadeTamagotchi virtual_coin. */
                    public virtual_coin: number;

                    /** ArcadeTamagotchi Dinosaurs_data. */
                    public Dinosaurs_data: s5g.game.proto.DataRecall.ArcadeTamagotchi.IDinosaurInfo[];

                    /** ArcadeTamagotchi Scene_data. */
                    public Scene_data: s5g.game.proto.DataRecall.ArcadeTamagotchi.ISceneInfo[];

                    /** ArcadeTamagotchi Area_data. */
                    public Area_data: s5g.game.proto.DataRecall.ArcadeTamagotchi.IAreaInfo[];

                    /** ArcadeTamagotchi News_data. */
                    public News_data: s5g.game.proto.DataRecall.ArcadeTamagotchi.INewsInfo[];

                    /** ArcadeTamagotchi Dead_data. */
                    public Dead_data: s5g.game.proto.DataRecall.ArcadeTamagotchi.IDinosaurInfo[];

                    /**
                     * Creates a new ArcadeTamagotchi instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns ArcadeTamagotchi instance
                     */
                    public static create(properties?: s5g.game.proto.DataRecall.IArcadeTamagotchi): s5g.game.proto.DataRecall.ArcadeTamagotchi;

                    /**
                     * Encodes the specified ArcadeTamagotchi message. Does not implicitly {@link s5g.game.proto.DataRecall.ArcadeTamagotchi.verify|verify} messages.
                     * @param message ArcadeTamagotchi message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: s5g.game.proto.DataRecall.IArcadeTamagotchi, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified ArcadeTamagotchi message, length delimited. Does not implicitly {@link s5g.game.proto.DataRecall.ArcadeTamagotchi.verify|verify} messages.
                     * @param message ArcadeTamagotchi message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: s5g.game.proto.DataRecall.IArcadeTamagotchi, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes an ArcadeTamagotchi message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns ArcadeTamagotchi
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.DataRecall.ArcadeTamagotchi;

                    /**
                     * Decodes an ArcadeTamagotchi message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns ArcadeTamagotchi
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.DataRecall.ArcadeTamagotchi;

                    /**
                     * Verifies an ArcadeTamagotchi message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates an ArcadeTamagotchi message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns ArcadeTamagotchi
                     */
                    public static fromObject(object: { [k: string]: any }): s5g.game.proto.DataRecall.ArcadeTamagotchi;

                    /**
                     * Creates a plain object from an ArcadeTamagotchi message. Also converts values to other types if specified.
                     * @param message ArcadeTamagotchi
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: s5g.game.proto.DataRecall.ArcadeTamagotchi, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this ArcadeTamagotchi to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                namespace ArcadeTamagotchi {

                    /** Properties of a DinosaurInfo. */
                    interface IDinosaurInfo {

                        /** DinosaurInfo id */
                        id?: (number|null);

                        /** DinosaurInfo areaNO */
                        areaNO?: (number|null);

                        /** DinosaurInfo type */
                        type?: (number|null);

                        /** DinosaurInfo star */
                        star?: (number|null);

                        /** DinosaurInfo rarity */
                        rarity?: (number|null);

                        /** DinosaurInfo rank */
                        rank?: (number|null);

                        /** DinosaurInfo price */
                        price?: (number|null);

                        /** DinosaurInfo satiation */
                        satiation?: (number|null);

                        /** DinosaurInfo satiation_max */
                        satiation_max?: (number|null);

                        /** DinosaurInfo favorability */
                        favorability?: (number|null);

                        /** DinosaurInfo favorability_max */
                        favorability_max?: (number|null);

                        /** DinosaurInfo get_sick */
                        get_sick?: (boolean|null);

                        /** DinosaurInfo get_dirty */
                        get_dirty?: (boolean|null);

                        /** DinosaurInfo alive */
                        alive?: (boolean|null);

                        /** DinosaurInfo rise */
                        rise?: (boolean|null);

                        /** DinosaurInfo skin_type */
                        skin_type?: (number|null);

                        /** DinosaurInfo remain_time */
                        remain_time?: (string|null);
                    }

                    /** Represents a DinosaurInfo. */
                    class DinosaurInfo implements IDinosaurInfo {

                        /**
                         * Constructs a new DinosaurInfo.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: s5g.game.proto.DataRecall.ArcadeTamagotchi.IDinosaurInfo);

                        /** DinosaurInfo id. */
                        public id: number;

                        /** DinosaurInfo areaNO. */
                        public areaNO: number;

                        /** DinosaurInfo type. */
                        public type: number;

                        /** DinosaurInfo star. */
                        public star: number;

                        /** DinosaurInfo rarity. */
                        public rarity: number;

                        /** DinosaurInfo rank. */
                        public rank: number;

                        /** DinosaurInfo price. */
                        public price: number;

                        /** DinosaurInfo satiation. */
                        public satiation: number;

                        /** DinosaurInfo satiation_max. */
                        public satiation_max: number;

                        /** DinosaurInfo favorability. */
                        public favorability: number;

                        /** DinosaurInfo favorability_max. */
                        public favorability_max: number;

                        /** DinosaurInfo get_sick. */
                        public get_sick: boolean;

                        /** DinosaurInfo get_dirty. */
                        public get_dirty: boolean;

                        /** DinosaurInfo alive. */
                        public alive: boolean;

                        /** DinosaurInfo rise. */
                        public rise: boolean;

                        /** DinosaurInfo skin_type. */
                        public skin_type: number;

                        /** DinosaurInfo remain_time. */
                        public remain_time: string;

                        /**
                         * Creates a new DinosaurInfo instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns DinosaurInfo instance
                         */
                        public static create(properties?: s5g.game.proto.DataRecall.ArcadeTamagotchi.IDinosaurInfo): s5g.game.proto.DataRecall.ArcadeTamagotchi.DinosaurInfo;

                        /**
                         * Encodes the specified DinosaurInfo message. Does not implicitly {@link s5g.game.proto.DataRecall.ArcadeTamagotchi.DinosaurInfo.verify|verify} messages.
                         * @param message DinosaurInfo message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: s5g.game.proto.DataRecall.ArcadeTamagotchi.IDinosaurInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Encodes the specified DinosaurInfo message, length delimited. Does not implicitly {@link s5g.game.proto.DataRecall.ArcadeTamagotchi.DinosaurInfo.verify|verify} messages.
                         * @param message DinosaurInfo message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encodeDelimited(message: s5g.game.proto.DataRecall.ArcadeTamagotchi.IDinosaurInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a DinosaurInfo message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns DinosaurInfo
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.DataRecall.ArcadeTamagotchi.DinosaurInfo;

                        /**
                         * Decodes a DinosaurInfo message from the specified reader or buffer, length delimited.
                         * @param reader Reader or buffer to decode from
                         * @returns DinosaurInfo
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.DataRecall.ArcadeTamagotchi.DinosaurInfo;

                        /**
                         * Verifies a DinosaurInfo message.
                         * @param message Plain object to verify
                         * @returns `null` if valid, otherwise the reason why it is not
                         */
                        public static verify(message: { [k: string]: any }): (string|null);

                        /**
                         * Creates a DinosaurInfo message from a plain object. Also converts values to their respective internal types.
                         * @param object Plain object
                         * @returns DinosaurInfo
                         */
                        public static fromObject(object: { [k: string]: any }): s5g.game.proto.DataRecall.ArcadeTamagotchi.DinosaurInfo;

                        /**
                         * Creates a plain object from a DinosaurInfo message. Also converts values to other types if specified.
                         * @param message DinosaurInfo
                         * @param [options] Conversion options
                         * @returns Plain object
                         */
                        public static toObject(message: s5g.game.proto.DataRecall.ArcadeTamagotchi.DinosaurInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

                        /**
                         * Converts this DinosaurInfo to JSON.
                         * @returns JSON object
                         */
                        public toJSON(): { [k: string]: any };
                    }

                    /** Properties of a SceneInfo. */
                    interface ISceneInfo {

                        /** SceneInfo scene_opened */
                        scene_opened?: (boolean|null);

                        /** SceneInfo scene_price */
                        scene_price?: (number|null);

                        /** SceneInfo building1_opened */
                        building1_opened?: (boolean|null);

                        /** SceneInfo building1_price */
                        building1_price?: (number|null);

                        /** SceneInfo building2_opened */
                        building2_opened?: (boolean|null);

                        /** SceneInfo building2_price */
                        building2_price?: (number|null);
                    }

                    /** Represents a SceneInfo. */
                    class SceneInfo implements ISceneInfo {

                        /**
                         * Constructs a new SceneInfo.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: s5g.game.proto.DataRecall.ArcadeTamagotchi.ISceneInfo);

                        /** SceneInfo scene_opened. */
                        public scene_opened: boolean;

                        /** SceneInfo scene_price. */
                        public scene_price: number;

                        /** SceneInfo building1_opened. */
                        public building1_opened: boolean;

                        /** SceneInfo building1_price. */
                        public building1_price: number;

                        /** SceneInfo building2_opened. */
                        public building2_opened: boolean;

                        /** SceneInfo building2_price. */
                        public building2_price: number;

                        /**
                         * Creates a new SceneInfo instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns SceneInfo instance
                         */
                        public static create(properties?: s5g.game.proto.DataRecall.ArcadeTamagotchi.ISceneInfo): s5g.game.proto.DataRecall.ArcadeTamagotchi.SceneInfo;

                        /**
                         * Encodes the specified SceneInfo message. Does not implicitly {@link s5g.game.proto.DataRecall.ArcadeTamagotchi.SceneInfo.verify|verify} messages.
                         * @param message SceneInfo message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: s5g.game.proto.DataRecall.ArcadeTamagotchi.ISceneInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Encodes the specified SceneInfo message, length delimited. Does not implicitly {@link s5g.game.proto.DataRecall.ArcadeTamagotchi.SceneInfo.verify|verify} messages.
                         * @param message SceneInfo message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encodeDelimited(message: s5g.game.proto.DataRecall.ArcadeTamagotchi.ISceneInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a SceneInfo message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns SceneInfo
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.DataRecall.ArcadeTamagotchi.SceneInfo;

                        /**
                         * Decodes a SceneInfo message from the specified reader or buffer, length delimited.
                         * @param reader Reader or buffer to decode from
                         * @returns SceneInfo
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.DataRecall.ArcadeTamagotchi.SceneInfo;

                        /**
                         * Verifies a SceneInfo message.
                         * @param message Plain object to verify
                         * @returns `null` if valid, otherwise the reason why it is not
                         */
                        public static verify(message: { [k: string]: any }): (string|null);

                        /**
                         * Creates a SceneInfo message from a plain object. Also converts values to their respective internal types.
                         * @param object Plain object
                         * @returns SceneInfo
                         */
                        public static fromObject(object: { [k: string]: any }): s5g.game.proto.DataRecall.ArcadeTamagotchi.SceneInfo;

                        /**
                         * Creates a plain object from a SceneInfo message. Also converts values to other types if specified.
                         * @param message SceneInfo
                         * @param [options] Conversion options
                         * @returns Plain object
                         */
                        public static toObject(message: s5g.game.proto.DataRecall.ArcadeTamagotchi.SceneInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

                        /**
                         * Converts this SceneInfo to JSON.
                         * @returns JSON object
                         */
                        public toJSON(): { [k: string]: any };
                    }

                    /** Properties of an AreaInfo. */
                    interface IAreaInfo {

                        /** AreaInfo area_opened */
                        area_opened?: (boolean|null);

                        /** AreaInfo area_price */
                        area_price?: (number|null);

                        /** AreaInfo use_scene_id */
                        use_scene_id?: (number|null);
                    }

                    /** Represents an AreaInfo. */
                    class AreaInfo implements IAreaInfo {

                        /**
                         * Constructs a new AreaInfo.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: s5g.game.proto.DataRecall.ArcadeTamagotchi.IAreaInfo);

                        /** AreaInfo area_opened. */
                        public area_opened: boolean;

                        /** AreaInfo area_price. */
                        public area_price: number;

                        /** AreaInfo use_scene_id. */
                        public use_scene_id: number;

                        /**
                         * Creates a new AreaInfo instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns AreaInfo instance
                         */
                        public static create(properties?: s5g.game.proto.DataRecall.ArcadeTamagotchi.IAreaInfo): s5g.game.proto.DataRecall.ArcadeTamagotchi.AreaInfo;

                        /**
                         * Encodes the specified AreaInfo message. Does not implicitly {@link s5g.game.proto.DataRecall.ArcadeTamagotchi.AreaInfo.verify|verify} messages.
                         * @param message AreaInfo message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: s5g.game.proto.DataRecall.ArcadeTamagotchi.IAreaInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Encodes the specified AreaInfo message, length delimited. Does not implicitly {@link s5g.game.proto.DataRecall.ArcadeTamagotchi.AreaInfo.verify|verify} messages.
                         * @param message AreaInfo message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encodeDelimited(message: s5g.game.proto.DataRecall.ArcadeTamagotchi.IAreaInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes an AreaInfo message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns AreaInfo
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.DataRecall.ArcadeTamagotchi.AreaInfo;

                        /**
                         * Decodes an AreaInfo message from the specified reader or buffer, length delimited.
                         * @param reader Reader or buffer to decode from
                         * @returns AreaInfo
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.DataRecall.ArcadeTamagotchi.AreaInfo;

                        /**
                         * Verifies an AreaInfo message.
                         * @param message Plain object to verify
                         * @returns `null` if valid, otherwise the reason why it is not
                         */
                        public static verify(message: { [k: string]: any }): (string|null);

                        /**
                         * Creates an AreaInfo message from a plain object. Also converts values to their respective internal types.
                         * @param object Plain object
                         * @returns AreaInfo
                         */
                        public static fromObject(object: { [k: string]: any }): s5g.game.proto.DataRecall.ArcadeTamagotchi.AreaInfo;

                        /**
                         * Creates a plain object from an AreaInfo message. Also converts values to other types if specified.
                         * @param message AreaInfo
                         * @param [options] Conversion options
                         * @returns Plain object
                         */
                        public static toObject(message: s5g.game.proto.DataRecall.ArcadeTamagotchi.AreaInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

                        /**
                         * Converts this AreaInfo to JSON.
                         * @returns JSON object
                         */
                        public toJSON(): { [k: string]: any };
                    }

                    /** Properties of a NewsInfo. */
                    interface INewsInfo {

                        /** NewsInfo type */
                        type?: (number|null);

                        /** NewsInfo id */
                        id?: (number|null);

                        /** NewsInfo event_time */
                        event_time?: (string|null);
                    }

                    /** Represents a NewsInfo. */
                    class NewsInfo implements INewsInfo {

                        /**
                         * Constructs a new NewsInfo.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: s5g.game.proto.DataRecall.ArcadeTamagotchi.INewsInfo);

                        /** NewsInfo type. */
                        public type: number;

                        /** NewsInfo id. */
                        public id: number;

                        /** NewsInfo event_time. */
                        public event_time: string;

                        /**
                         * Creates a new NewsInfo instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns NewsInfo instance
                         */
                        public static create(properties?: s5g.game.proto.DataRecall.ArcadeTamagotchi.INewsInfo): s5g.game.proto.DataRecall.ArcadeTamagotchi.NewsInfo;

                        /**
                         * Encodes the specified NewsInfo message. Does not implicitly {@link s5g.game.proto.DataRecall.ArcadeTamagotchi.NewsInfo.verify|verify} messages.
                         * @param message NewsInfo message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: s5g.game.proto.DataRecall.ArcadeTamagotchi.INewsInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Encodes the specified NewsInfo message, length delimited. Does not implicitly {@link s5g.game.proto.DataRecall.ArcadeTamagotchi.NewsInfo.verify|verify} messages.
                         * @param message NewsInfo message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encodeDelimited(message: s5g.game.proto.DataRecall.ArcadeTamagotchi.INewsInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a NewsInfo message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns NewsInfo
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.DataRecall.ArcadeTamagotchi.NewsInfo;

                        /**
                         * Decodes a NewsInfo message from the specified reader or buffer, length delimited.
                         * @param reader Reader or buffer to decode from
                         * @returns NewsInfo
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.DataRecall.ArcadeTamagotchi.NewsInfo;

                        /**
                         * Verifies a NewsInfo message.
                         * @param message Plain object to verify
                         * @returns `null` if valid, otherwise the reason why it is not
                         */
                        public static verify(message: { [k: string]: any }): (string|null);

                        /**
                         * Creates a NewsInfo message from a plain object. Also converts values to their respective internal types.
                         * @param object Plain object
                         * @returns NewsInfo
                         */
                        public static fromObject(object: { [k: string]: any }): s5g.game.proto.DataRecall.ArcadeTamagotchi.NewsInfo;

                        /**
                         * Creates a plain object from a NewsInfo message. Also converts values to other types if specified.
                         * @param message NewsInfo
                         * @param [options] Conversion options
                         * @returns Plain object
                         */
                        public static toObject(message: s5g.game.proto.DataRecall.ArcadeTamagotchi.NewsInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

                        /**
                         * Converts this NewsInfo to JSON.
                         * @returns JSON object
                         */
                        public toJSON(): { [k: string]: any };
                    }
                }

                /** Properties of a RecordList. */
                interface IRecordList {

                    /** RecordList type */
                    type?: (string|null);

                    /** RecordList amount */
                    amount?: (number|null);

                    /** RecordList game_time */
                    game_time?: (string|null);
                }

                /** Represents a RecordList. */
                class RecordList implements IRecordList {

                    /**
                     * Constructs a new RecordList.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: s5g.game.proto.DataRecall.IRecordList);

                    /** RecordList type. */
                    public type: string;

                    /** RecordList amount. */
                    public amount: number;

                    /** RecordList game_time. */
                    public game_time: string;

                    /**
                     * Creates a new RecordList instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns RecordList instance
                     */
                    public static create(properties?: s5g.game.proto.DataRecall.IRecordList): s5g.game.proto.DataRecall.RecordList;

                    /**
                     * Encodes the specified RecordList message. Does not implicitly {@link s5g.game.proto.DataRecall.RecordList.verify|verify} messages.
                     * @param message RecordList message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: s5g.game.proto.DataRecall.IRecordList, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified RecordList message, length delimited. Does not implicitly {@link s5g.game.proto.DataRecall.RecordList.verify|verify} messages.
                     * @param message RecordList message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: s5g.game.proto.DataRecall.IRecordList, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a RecordList message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns RecordList
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.DataRecall.RecordList;

                    /**
                     * Decodes a RecordList message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns RecordList
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.DataRecall.RecordList;

                    /**
                     * Verifies a RecordList message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a RecordList message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns RecordList
                     */
                    public static fromObject(object: { [k: string]: any }): s5g.game.proto.DataRecall.RecordList;

                    /**
                     * Creates a plain object from a RecordList message. Also converts values to other types if specified.
                     * @param message RecordList
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: s5g.game.proto.DataRecall.RecordList, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this RecordList to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a UPSdata. */
                interface IUPSdata {

                    /** UPSdata upscoin_cent */
                    upscoin_cent?: (number|Long|null);

                    /** UPSdata ups_switch */
                    ups_switch?: (boolean|null);

                    /** UPSdata threshold */
                    threshold?: (number|Long|null);

                    /** UPSdata coin_in */
                    coin_in?: (number|Long|null);

                    /** UPSdata is_transfer */
                    is_transfer?: (boolean|null);

                    /** UPSdata transfer_cent */
                    transfer_cent?: (number|Long|null);

                    /** UPSdata remain_time */
                    remain_time?: (string|null);
                }

                /** Represents a UPSdata. */
                class UPSdata implements IUPSdata {

                    /**
                     * Constructs a new UPSdata.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: s5g.game.proto.DataRecall.IUPSdata);

                    /** UPSdata upscoin_cent. */
                    public upscoin_cent: (number|Long);

                    /** UPSdata ups_switch. */
                    public ups_switch: boolean;

                    /** UPSdata threshold. */
                    public threshold: (number|Long);

                    /** UPSdata coin_in. */
                    public coin_in: (number|Long);

                    /** UPSdata is_transfer. */
                    public is_transfer: boolean;

                    /** UPSdata transfer_cent. */
                    public transfer_cent: (number|Long);

                    /** UPSdata remain_time. */
                    public remain_time: string;

                    /**
                     * Creates a new UPSdata instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns UPSdata instance
                     */
                    public static create(properties?: s5g.game.proto.DataRecall.IUPSdata): s5g.game.proto.DataRecall.UPSdata;

                    /**
                     * Encodes the specified UPSdata message. Does not implicitly {@link s5g.game.proto.DataRecall.UPSdata.verify|verify} messages.
                     * @param message UPSdata message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: s5g.game.proto.DataRecall.IUPSdata, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified UPSdata message, length delimited. Does not implicitly {@link s5g.game.proto.DataRecall.UPSdata.verify|verify} messages.
                     * @param message UPSdata message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: s5g.game.proto.DataRecall.IUPSdata, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a UPSdata message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns UPSdata
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.DataRecall.UPSdata;

                    /**
                     * Decodes a UPSdata message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns UPSdata
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.DataRecall.UPSdata;

                    /**
                     * Verifies a UPSdata message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a UPSdata message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns UPSdata
                     */
                    public static fromObject(object: { [k: string]: any }): s5g.game.proto.DataRecall.UPSdata;

                    /**
                     * Creates a plain object from a UPSdata message. Also converts values to other types if specified.
                     * @param message UPSdata
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: s5g.game.proto.DataRecall.UPSdata, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this UPSdata to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }
            }

            /** ECENTINTYPE enum. */
            enum ECENTINTYPE {
                eGeneral = 0,
                eJackpot = 1,
                eLuckyDraw = 2,
                eRedPacket = 3
            }

            /** Properties of a CentInAsk. */
            interface ICentInAsk {

                /** CentInAsk msgid */
                msgid: s5g.game.proto.EMSGID;

                /** CentInAsk type */
                type: s5g.game.proto.ECENTINTYPE;

                /** CentInAsk tid */
                tid: (number|Long);

                /** CentInAsk cent */
                cent: (number|Long);

                /** CentInAsk pool_id */
                pool_id?: (number|null);

                /** CentInAsk ticket */
                ticket?: (number|null);
            }

            /** Represents a CentInAsk. */
            class CentInAsk implements ICentInAsk {

                /**
                 * Constructs a new CentInAsk.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: s5g.game.proto.ICentInAsk);

                /** CentInAsk msgid. */
                public msgid: s5g.game.proto.EMSGID;

                /** CentInAsk type. */
                public type: s5g.game.proto.ECENTINTYPE;

                /** CentInAsk tid. */
                public tid: (number|Long);

                /** CentInAsk cent. */
                public cent: (number|Long);

                /** CentInAsk pool_id. */
                public pool_id: number;

                /** CentInAsk ticket. */
                public ticket: number;

                /**
                 * Creates a new CentInAsk instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns CentInAsk instance
                 */
                public static create(properties?: s5g.game.proto.ICentInAsk): s5g.game.proto.CentInAsk;

                /**
                 * Encodes the specified CentInAsk message. Does not implicitly {@link s5g.game.proto.CentInAsk.verify|verify} messages.
                 * @param message CentInAsk message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: s5g.game.proto.ICentInAsk, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified CentInAsk message, length delimited. Does not implicitly {@link s5g.game.proto.CentInAsk.verify|verify} messages.
                 * @param message CentInAsk message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: s5g.game.proto.ICentInAsk, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a CentInAsk message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns CentInAsk
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.CentInAsk;

                /**
                 * Decodes a CentInAsk message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns CentInAsk
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.CentInAsk;

                /**
                 * Verifies a CentInAsk message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a CentInAsk message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns CentInAsk
                 */
                public static fromObject(object: { [k: string]: any }): s5g.game.proto.CentInAsk;

                /**
                 * Creates a plain object from a CentInAsk message. Also converts values to other types if specified.
                 * @param message CentInAsk
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: s5g.game.proto.CentInAsk, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this CentInAsk to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a CentInReask. */
            interface ICentInReask {

                /** CentInReask msgid */
                msgid: s5g.game.proto.EMSGID;

                /** CentInReask type */
                type: s5g.game.proto.ECENTINTYPE;

                /** CentInReask tid */
                tid: (number|Long);
            }

            /** Represents a CentInReask. */
            class CentInReask implements ICentInReask {

                /**
                 * Constructs a new CentInReask.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: s5g.game.proto.ICentInReask);

                /** CentInReask msgid. */
                public msgid: s5g.game.proto.EMSGID;

                /** CentInReask type. */
                public type: s5g.game.proto.ECENTINTYPE;

                /** CentInReask tid. */
                public tid: (number|Long);

                /**
                 * Creates a new CentInReask instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns CentInReask instance
                 */
                public static create(properties?: s5g.game.proto.ICentInReask): s5g.game.proto.CentInReask;

                /**
                 * Encodes the specified CentInReask message. Does not implicitly {@link s5g.game.proto.CentInReask.verify|verify} messages.
                 * @param message CentInReask message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: s5g.game.proto.ICentInReask, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified CentInReask message, length delimited. Does not implicitly {@link s5g.game.proto.CentInReask.verify|verify} messages.
                 * @param message CentInReask message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: s5g.game.proto.ICentInReask, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a CentInReask message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns CentInReask
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.CentInReask;

                /**
                 * Decodes a CentInReask message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns CentInReask
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.CentInReask;

                /**
                 * Verifies a CentInReask message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a CentInReask message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns CentInReask
                 */
                public static fromObject(object: { [k: string]: any }): s5g.game.proto.CentInReask;

                /**
                 * Creates a plain object from a CentInReask message. Also converts values to other types if specified.
                 * @param message CentInReask
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: s5g.game.proto.CentInReask, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this CentInReask to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a Pool. */
            interface IPool {

                /** Pool id */
                id: number;

                /** Pool name */
                name: string;

                /** Pool current_cent */
                current_cent: (number|Long);

                /** Pool enable */
                enable: boolean;

                /** Pool max_cent */
                max_cent?: (number|Long|null);
            }

            /** Represents a Pool. */
            class Pool implements IPool {

                /**
                 * Constructs a new Pool.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: s5g.game.proto.IPool);

                /** Pool id. */
                public id: number;

                /** Pool name. */
                public name: string;

                /** Pool current_cent. */
                public current_cent: (number|Long);

                /** Pool enable. */
                public enable: boolean;

                /** Pool max_cent. */
                public max_cent: (number|Long);

                /**
                 * Creates a new Pool instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Pool instance
                 */
                public static create(properties?: s5g.game.proto.IPool): s5g.game.proto.Pool;

                /**
                 * Encodes the specified Pool message. Does not implicitly {@link s5g.game.proto.Pool.verify|verify} messages.
                 * @param message Pool message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: s5g.game.proto.IPool, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Pool message, length delimited. Does not implicitly {@link s5g.game.proto.Pool.verify|verify} messages.
                 * @param message Pool message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: s5g.game.proto.IPool, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Pool message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Pool
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.Pool;

                /**
                 * Decodes a Pool message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Pool
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.Pool;

                /**
                 * Verifies a Pool message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a Pool message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Pool
                 */
                public static fromObject(object: { [k: string]: any }): s5g.game.proto.Pool;

                /**
                 * Creates a plain object from a Pool message. Also converts values to other types if specified.
                 * @param message Pool
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: s5g.game.proto.Pool, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Pool to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a LuckyDrawConfig. */
            interface ILuckyDrawConfig {

                /** LuckyDrawConfig enable */
                enable: boolean;

                /** LuckyDrawConfig begin_time */
                begin_time?: (number|Long|null);

                /** LuckyDrawConfig end_time */
                end_time?: (number|Long|null);

                /** LuckyDrawConfig server_time */
                server_time?: (number|Long|null);

                /** LuckyDrawConfig max_round */
                max_round?: (number|null);

                /** LuckyDrawConfig cur_round */
                cur_round?: (number|null);
            }

            /** Represents a LuckyDrawConfig. */
            class LuckyDrawConfig implements ILuckyDrawConfig {

                /**
                 * Constructs a new LuckyDrawConfig.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: s5g.game.proto.ILuckyDrawConfig);

                /** LuckyDrawConfig enable. */
                public enable: boolean;

                /** LuckyDrawConfig begin_time. */
                public begin_time: (number|Long);

                /** LuckyDrawConfig end_time. */
                public end_time: (number|Long);

                /** LuckyDrawConfig server_time. */
                public server_time: (number|Long);

                /** LuckyDrawConfig max_round. */
                public max_round: number;

                /** LuckyDrawConfig cur_round. */
                public cur_round: number;

                /**
                 * Creates a new LuckyDrawConfig instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns LuckyDrawConfig instance
                 */
                public static create(properties?: s5g.game.proto.ILuckyDrawConfig): s5g.game.proto.LuckyDrawConfig;

                /**
                 * Encodes the specified LuckyDrawConfig message. Does not implicitly {@link s5g.game.proto.LuckyDrawConfig.verify|verify} messages.
                 * @param message LuckyDrawConfig message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: s5g.game.proto.ILuckyDrawConfig, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified LuckyDrawConfig message, length delimited. Does not implicitly {@link s5g.game.proto.LuckyDrawConfig.verify|verify} messages.
                 * @param message LuckyDrawConfig message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: s5g.game.proto.ILuckyDrawConfig, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a LuckyDrawConfig message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns LuckyDrawConfig
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.LuckyDrawConfig;

                /**
                 * Decodes a LuckyDrawConfig message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns LuckyDrawConfig
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.LuckyDrawConfig;

                /**
                 * Verifies a LuckyDrawConfig message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a LuckyDrawConfig message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns LuckyDrawConfig
                 */
                public static fromObject(object: { [k: string]: any }): s5g.game.proto.LuckyDrawConfig;

                /**
                 * Creates a plain object from a LuckyDrawConfig message. Also converts values to other types if specified.
                 * @param message LuckyDrawConfig
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: s5g.game.proto.LuckyDrawConfig, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this LuckyDrawConfig to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a JackpotInfo. */
            interface IJackpotInfo {

                /** JackpotInfo msgid */
                msgid: s5g.game.proto.EMSGID;

                /** JackpotInfo pool_list */
                pool_list?: (s5g.game.proto.IPool[]|null);

                /** JackpotInfo status_code */
                status_code: s5g.game.proto.Status.Code;

                /** JackpotInfo type */
                type?: (s5g.game.proto.ECENTINTYPE|null);

                /** JackpotInfo lucky_draw_config */
                lucky_draw_config?: (s5g.game.proto.ILuckyDrawConfig|null);
            }

            /** Represents a JackpotInfo. */
            class JackpotInfo implements IJackpotInfo {

                /**
                 * Constructs a new JackpotInfo.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: s5g.game.proto.IJackpotInfo);

                /** JackpotInfo msgid. */
                public msgid: s5g.game.proto.EMSGID;

                /** JackpotInfo pool_list. */
                public pool_list: s5g.game.proto.IPool[];

                /** JackpotInfo status_code. */
                public status_code: s5g.game.proto.Status.Code;

                /** JackpotInfo type. */
                public type: s5g.game.proto.ECENTINTYPE;

                /** JackpotInfo lucky_draw_config. */
                public lucky_draw_config?: (s5g.game.proto.ILuckyDrawConfig|null);

                /**
                 * Creates a new JackpotInfo instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns JackpotInfo instance
                 */
                public static create(properties?: s5g.game.proto.IJackpotInfo): s5g.game.proto.JackpotInfo;

                /**
                 * Encodes the specified JackpotInfo message. Does not implicitly {@link s5g.game.proto.JackpotInfo.verify|verify} messages.
                 * @param message JackpotInfo message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: s5g.game.proto.IJackpotInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified JackpotInfo message, length delimited. Does not implicitly {@link s5g.game.proto.JackpotInfo.verify|verify} messages.
                 * @param message JackpotInfo message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: s5g.game.proto.IJackpotInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a JackpotInfo message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns JackpotInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.JackpotInfo;

                /**
                 * Decodes a JackpotInfo message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns JackpotInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.JackpotInfo;

                /**
                 * Verifies a JackpotInfo message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a JackpotInfo message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns JackpotInfo
                 */
                public static fromObject(object: { [k: string]: any }): s5g.game.proto.JackpotInfo;

                /**
                 * Creates a plain object from a JackpotInfo message. Also converts values to other types if specified.
                 * @param message JackpotInfo
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: s5g.game.proto.JackpotInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this JackpotInfo to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a JackpotNotify. */
            interface IJackpotNotify {

                /** JackpotNotify msgid */
                msgid: s5g.game.proto.EMSGID;

                /** JackpotNotify type */
                type: number;

                /** JackpotNotify pool_id */
                pool_id?: (number|null);
            }

            /** Represents a JackpotNotify. */
            class JackpotNotify implements IJackpotNotify {

                /**
                 * Constructs a new JackpotNotify.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: s5g.game.proto.IJackpotNotify);

                /** JackpotNotify msgid. */
                public msgid: s5g.game.proto.EMSGID;

                /** JackpotNotify type. */
                public type: number;

                /** JackpotNotify pool_id. */
                public pool_id: number;

                /**
                 * Creates a new JackpotNotify instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns JackpotNotify instance
                 */
                public static create(properties?: s5g.game.proto.IJackpotNotify): s5g.game.proto.JackpotNotify;

                /**
                 * Encodes the specified JackpotNotify message. Does not implicitly {@link s5g.game.proto.JackpotNotify.verify|verify} messages.
                 * @param message JackpotNotify message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: s5g.game.proto.IJackpotNotify, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified JackpotNotify message, length delimited. Does not implicitly {@link s5g.game.proto.JackpotNotify.verify|verify} messages.
                 * @param message JackpotNotify message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: s5g.game.proto.IJackpotNotify, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a JackpotNotify message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns JackpotNotify
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.JackpotNotify;

                /**
                 * Decodes a JackpotNotify message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns JackpotNotify
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.JackpotNotify;

                /**
                 * Verifies a JackpotNotify message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a JackpotNotify message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns JackpotNotify
                 */
                public static fromObject(object: { [k: string]: any }): s5g.game.proto.JackpotNotify;

                /**
                 * Creates a plain object from a JackpotNotify message. Also converts values to other types if specified.
                 * @param message JackpotNotify
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: s5g.game.proto.JackpotNotify, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this JackpotNotify to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            namespace JackpotNotify {

                /** Type enum. */
                enum Type {
                    kNearlyReached = 0
                }
            }

            /** Properties of a MemberInfo. */
            interface IMemberInfo {

                /** MemberInfo type */
                type: s5g.game.proto.MemberInfo.Type;

                /** MemberInfo level */
                level?: (number|null);

                /** MemberInfo total */
                total?: (s5g.game.proto.MemberInfo.IMedal[]|null);

                /** MemberInfo cur_wins */
                cur_wins?: (s5g.game.proto.MemberInfo.IMedal[]|null);

                /** MemberInfo ps_coin */
                ps_coin?: (number|null);

                /** MemberInfo expire_time */
                expire_time?: (number|Long|null);

                /** MemberInfo server_time */
                server_time?: (number|Long|null);

                /** MemberInfo ps_coin_sum */
                ps_coin_sum?: (number|null);

                /** MemberInfo is_reached_cap */
                is_reached_cap?: (boolean|null);
            }

            /** Represents a MemberInfo. */
            class MemberInfo implements IMemberInfo {

                /**
                 * Constructs a new MemberInfo.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: s5g.game.proto.IMemberInfo);

                /** MemberInfo type. */
                public type: s5g.game.proto.MemberInfo.Type;

                /** MemberInfo level. */
                public level: number;

                /** MemberInfo total. */
                public total: s5g.game.proto.MemberInfo.IMedal[];

                /** MemberInfo cur_wins. */
                public cur_wins: s5g.game.proto.MemberInfo.IMedal[];

                /** MemberInfo ps_coin. */
                public ps_coin: number;

                /** MemberInfo expire_time. */
                public expire_time: (number|Long);

                /** MemberInfo server_time. */
                public server_time: (number|Long);

                /** MemberInfo ps_coin_sum. */
                public ps_coin_sum: number;

                /** MemberInfo is_reached_cap. */
                public is_reached_cap: boolean;

                /**
                 * Creates a new MemberInfo instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns MemberInfo instance
                 */
                public static create(properties?: s5g.game.proto.IMemberInfo): s5g.game.proto.MemberInfo;

                /**
                 * Encodes the specified MemberInfo message. Does not implicitly {@link s5g.game.proto.MemberInfo.verify|verify} messages.
                 * @param message MemberInfo message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: s5g.game.proto.IMemberInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified MemberInfo message, length delimited. Does not implicitly {@link s5g.game.proto.MemberInfo.verify|verify} messages.
                 * @param message MemberInfo message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: s5g.game.proto.IMemberInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a MemberInfo message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns MemberInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.MemberInfo;

                /**
                 * Decodes a MemberInfo message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns MemberInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.MemberInfo;

                /**
                 * Verifies a MemberInfo message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a MemberInfo message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns MemberInfo
                 */
                public static fromObject(object: { [k: string]: any }): s5g.game.proto.MemberInfo;

                /**
                 * Creates a plain object from a MemberInfo message. Also converts values to other types if specified.
                 * @param message MemberInfo
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: s5g.game.proto.MemberInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this MemberInfo to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            namespace MemberInfo {

                /** Properties of a Medal. */
                interface IMedal {

                    /** Medal code */
                    code: s5g.game.proto.MemberInfo.Medal.Code;

                    /** Medal count */
                    count: number;
                }

                /** Represents a Medal. */
                class Medal implements IMedal {

                    /**
                     * Constructs a new Medal.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: s5g.game.proto.MemberInfo.IMedal);

                    /** Medal code. */
                    public code: s5g.game.proto.MemberInfo.Medal.Code;

                    /** Medal count. */
                    public count: number;

                    /**
                     * Creates a new Medal instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns Medal instance
                     */
                    public static create(properties?: s5g.game.proto.MemberInfo.IMedal): s5g.game.proto.MemberInfo.Medal;

                    /**
                     * Encodes the specified Medal message. Does not implicitly {@link s5g.game.proto.MemberInfo.Medal.verify|verify} messages.
                     * @param message Medal message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: s5g.game.proto.MemberInfo.IMedal, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified Medal message, length delimited. Does not implicitly {@link s5g.game.proto.MemberInfo.Medal.verify|verify} messages.
                     * @param message Medal message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: s5g.game.proto.MemberInfo.IMedal, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a Medal message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns Medal
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.MemberInfo.Medal;

                    /**
                     * Decodes a Medal message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns Medal
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.MemberInfo.Medal;

                    /**
                     * Verifies a Medal message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a Medal message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns Medal
                     */
                    public static fromObject(object: { [k: string]: any }): s5g.game.proto.MemberInfo.Medal;

                    /**
                     * Creates a plain object from a Medal message. Also converts values to other types if specified.
                     * @param message Medal
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: s5g.game.proto.MemberInfo.Medal, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this Medal to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                namespace Medal {

                    /** Code enum. */
                    enum Code {
                        kBrown = 0,
                        kSilver = 1,
                        kGold = 2
                    }
                }

                /** Level enum. */
                enum Level {
                    kSilver = 0,
                    kGold = 1,
                    kRuby = 2,
                    kDiamond = 3
                }

                /** Type enum. */
                enum Type {
                    kGameEnd = 0,
                    kTimeout = 1,
                    kConfig = 2,
                    kUpdate = 3
                }
            }

            /** Properties of a MemberInfoAsk. */
            interface IMemberInfoAsk {

                /** MemberInfoAsk msgid */
                msgid: s5g.game.proto.EMSGID;

                /** MemberInfoAsk info */
                info: s5g.game.proto.IMemberInfo;
            }

            /** Represents a MemberInfoAsk. */
            class MemberInfoAsk implements IMemberInfoAsk {

                /**
                 * Constructs a new MemberInfoAsk.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: s5g.game.proto.IMemberInfoAsk);

                /** MemberInfoAsk msgid. */
                public msgid: s5g.game.proto.EMSGID;

                /** MemberInfoAsk info. */
                public info: s5g.game.proto.IMemberInfo;

                /**
                 * Creates a new MemberInfoAsk instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns MemberInfoAsk instance
                 */
                public static create(properties?: s5g.game.proto.IMemberInfoAsk): s5g.game.proto.MemberInfoAsk;

                /**
                 * Encodes the specified MemberInfoAsk message. Does not implicitly {@link s5g.game.proto.MemberInfoAsk.verify|verify} messages.
                 * @param message MemberInfoAsk message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: s5g.game.proto.IMemberInfoAsk, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified MemberInfoAsk message, length delimited. Does not implicitly {@link s5g.game.proto.MemberInfoAsk.verify|verify} messages.
                 * @param message MemberInfoAsk message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: s5g.game.proto.IMemberInfoAsk, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a MemberInfoAsk message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns MemberInfoAsk
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.MemberInfoAsk;

                /**
                 * Decodes a MemberInfoAsk message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns MemberInfoAsk
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.MemberInfoAsk;

                /**
                 * Verifies a MemberInfoAsk message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a MemberInfoAsk message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns MemberInfoAsk
                 */
                public static fromObject(object: { [k: string]: any }): s5g.game.proto.MemberInfoAsk;

                /**
                 * Creates a plain object from a MemberInfoAsk message. Also converts values to other types if specified.
                 * @param message MemberInfoAsk
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: s5g.game.proto.MemberInfoAsk, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this MemberInfoAsk to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a CoinTrio. */
            interface ICoinTrio {

                /** CoinTrio scatter_multiplier */
                scatter_multiplier?: (string[]|null);

                /** CoinTrio pre_scatter_multiplier */
                pre_scatter_multiplier?: (string[]|null);

                /** CoinTrio pre_pay_of_scatter */
                pre_pay_of_scatter?: (number[]|null);
            }

            /** Represents a CoinTrio. */
            class CoinTrio implements ICoinTrio {

                /**
                 * Constructs a new CoinTrio.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: s5g.game.proto.ICoinTrio);

                /** CoinTrio scatter_multiplier. */
                public scatter_multiplier: string[];

                /** CoinTrio pre_scatter_multiplier. */
                public pre_scatter_multiplier: string[];

                /** CoinTrio pre_pay_of_scatter. */
                public pre_pay_of_scatter: number[];

                /**
                 * Creates a new CoinTrio instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns CoinTrio instance
                 */
                public static create(properties?: s5g.game.proto.ICoinTrio): s5g.game.proto.CoinTrio;

                /**
                 * Encodes the specified CoinTrio message. Does not implicitly {@link s5g.game.proto.CoinTrio.verify|verify} messages.
                 * @param message CoinTrio message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: s5g.game.proto.ICoinTrio, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified CoinTrio message, length delimited. Does not implicitly {@link s5g.game.proto.CoinTrio.verify|verify} messages.
                 * @param message CoinTrio message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: s5g.game.proto.ICoinTrio, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a CoinTrio message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns CoinTrio
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.CoinTrio;

                /**
                 * Decodes a CoinTrio message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns CoinTrio
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.CoinTrio;

                /**
                 * Verifies a CoinTrio message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a CoinTrio message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns CoinTrio
                 */
                public static fromObject(object: { [k: string]: any }): s5g.game.proto.CoinTrio;

                /**
                 * Creates a plain object from a CoinTrio message. Also converts values to other types if specified.
                 * @param message CoinTrio
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: s5g.game.proto.CoinTrio, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this CoinTrio to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a Labuby. */
            interface ILabuby {

                /** Labuby pattern_size */
                pattern_size: number;

                /** Labuby is_more_spins */
                is_more_spins: boolean;

                /** Labuby is_more_rows */
                is_more_rows: boolean;

                /** Labuby is_more_symbols */
                is_more_symbols: boolean;

                /** Labuby init_lollipop_count */
                init_lollipop_count: number;

                /** Labuby init_lollipop_pay */
                init_lollipop_pay: number;

                /** Labuby lollipop_count */
                lollipop_count: number;

                /** Labuby coin_count */
                coin_count: number;

                /** Labuby labuby_stage */
                labuby_stage: number;

                /** Labuby labuby_size */
                labuby_size: number;

                /** Labuby labuby_pattern */
                labuby_pattern?: (s5g.game.proto.Labuby.ILabubyPattern[]|null);

                /** Labuby is_super */
                is_super: boolean;
            }

            /** Represents a Labuby. */
            class Labuby implements ILabuby {

                /**
                 * Constructs a new Labuby.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: s5g.game.proto.ILabuby);

                /** Labuby pattern_size. */
                public pattern_size: number;

                /** Labuby is_more_spins. */
                public is_more_spins: boolean;

                /** Labuby is_more_rows. */
                public is_more_rows: boolean;

                /** Labuby is_more_symbols. */
                public is_more_symbols: boolean;

                /** Labuby init_lollipop_count. */
                public init_lollipop_count: number;

                /** Labuby init_lollipop_pay. */
                public init_lollipop_pay: number;

                /** Labuby lollipop_count. */
                public lollipop_count: number;

                /** Labuby coin_count. */
                public coin_count: number;

                /** Labuby labuby_stage. */
                public labuby_stage: number;

                /** Labuby labuby_size. */
                public labuby_size: number;

                /** Labuby labuby_pattern. */
                public labuby_pattern: s5g.game.proto.Labuby.ILabubyPattern[];

                /** Labuby is_super. */
                public is_super: boolean;

                /**
                 * Creates a new Labuby instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Labuby instance
                 */
                public static create(properties?: s5g.game.proto.ILabuby): s5g.game.proto.Labuby;

                /**
                 * Encodes the specified Labuby message. Does not implicitly {@link s5g.game.proto.Labuby.verify|verify} messages.
                 * @param message Labuby message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: s5g.game.proto.ILabuby, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Labuby message, length delimited. Does not implicitly {@link s5g.game.proto.Labuby.verify|verify} messages.
                 * @param message Labuby message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: s5g.game.proto.ILabuby, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Labuby message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Labuby
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.Labuby;

                /**
                 * Decodes a Labuby message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Labuby
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.Labuby;

                /**
                 * Verifies a Labuby message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a Labuby message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Labuby
                 */
                public static fromObject(object: { [k: string]: any }): s5g.game.proto.Labuby;

                /**
                 * Creates a plain object from a Labuby message. Also converts values to other types if specified.
                 * @param message Labuby
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: s5g.game.proto.Labuby, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Labuby to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            namespace Labuby {

                /** Properties of a LabubyPattern. */
                interface ILabubyPattern {

                    /** LabubyPattern seq */
                    seq: number;

                    /** LabubyPattern pattern */
                    pattern?: (number[]|null);

                    /** LabubyPattern pre_pattern */
                    pre_pattern?: (number[]|null);
                }

                /** Represents a LabubyPattern. */
                class LabubyPattern implements ILabubyPattern {

                    /**
                     * Constructs a new LabubyPattern.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: s5g.game.proto.Labuby.ILabubyPattern);

                    /** LabubyPattern seq. */
                    public seq: number;

                    /** LabubyPattern pattern. */
                    public pattern: number[];

                    /** LabubyPattern pre_pattern. */
                    public pre_pattern: number[];

                    /**
                     * Creates a new LabubyPattern instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns LabubyPattern instance
                     */
                    public static create(properties?: s5g.game.proto.Labuby.ILabubyPattern): s5g.game.proto.Labuby.LabubyPattern;

                    /**
                     * Encodes the specified LabubyPattern message. Does not implicitly {@link s5g.game.proto.Labuby.LabubyPattern.verify|verify} messages.
                     * @param message LabubyPattern message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: s5g.game.proto.Labuby.ILabubyPattern, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified LabubyPattern message, length delimited. Does not implicitly {@link s5g.game.proto.Labuby.LabubyPattern.verify|verify} messages.
                     * @param message LabubyPattern message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: s5g.game.proto.Labuby.ILabubyPattern, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a LabubyPattern message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns LabubyPattern
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.Labuby.LabubyPattern;

                    /**
                     * Decodes a LabubyPattern message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns LabubyPattern
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.Labuby.LabubyPattern;

                    /**
                     * Verifies a LabubyPattern message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a LabubyPattern message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns LabubyPattern
                     */
                    public static fromObject(object: { [k: string]: any }): s5g.game.proto.Labuby.LabubyPattern;

                    /**
                     * Creates a plain object from a LabubyPattern message. Also converts values to other types if specified.
                     * @param message LabubyPattern
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: s5g.game.proto.Labuby.LabubyPattern, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this LabubyPattern to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }
            }

            /** Properties of a CampaignCall. */
            interface ICampaignCall {

                /** CampaignCall msgid */
                msgid: s5g.game.proto.EMSGID;

                /** CampaignCall campaign_id */
                campaign_id: string;
            }

            /** Represents a CampaignCall. */
            class CampaignCall implements ICampaignCall {

                /**
                 * Constructs a new CampaignCall.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: s5g.game.proto.ICampaignCall);

                /** CampaignCall msgid. */
                public msgid: s5g.game.proto.EMSGID;

                /** CampaignCall campaign_id. */
                public campaign_id: string;

                /**
                 * Creates a new CampaignCall instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns CampaignCall instance
                 */
                public static create(properties?: s5g.game.proto.ICampaignCall): s5g.game.proto.CampaignCall;

                /**
                 * Encodes the specified CampaignCall message. Does not implicitly {@link s5g.game.proto.CampaignCall.verify|verify} messages.
                 * @param message CampaignCall message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: s5g.game.proto.ICampaignCall, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified CampaignCall message, length delimited. Does not implicitly {@link s5g.game.proto.CampaignCall.verify|verify} messages.
                 * @param message CampaignCall message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: s5g.game.proto.ICampaignCall, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a CampaignCall message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns CampaignCall
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.CampaignCall;

                /**
                 * Decodes a CampaignCall message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns CampaignCall
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.CampaignCall;

                /**
                 * Verifies a CampaignCall message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a CampaignCall message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns CampaignCall
                 */
                public static fromObject(object: { [k: string]: any }): s5g.game.proto.CampaignCall;

                /**
                 * Creates a plain object from a CampaignCall message. Also converts values to other types if specified.
                 * @param message CampaignCall
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: s5g.game.proto.CampaignCall, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this CampaignCall to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a CampaignRecall. */
            interface ICampaignRecall {

                /** CampaignRecall msgid */
                msgid: s5g.game.proto.EMSGID;

                /** CampaignRecall status_code */
                status_code: s5g.game.proto.Status.Code;

                /** CampaignRecall campaign_id */
                campaign_id: string;

                /** CampaignRecall campaign_type */
                campaign_type: number;

                /** CampaignRecall campaign_status */
                campaign_status: number;

                /** CampaignRecall remaining_count */
                remaining_count?: (number|null);

                /** CampaignRecall bet_rate */
                bet_rate?: (number|null);

                /** CampaignRecall bet_level */
                bet_level?: (number|null);
            }

            /** Represents a CampaignRecall. */
            class CampaignRecall implements ICampaignRecall {

                /**
                 * Constructs a new CampaignRecall.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: s5g.game.proto.ICampaignRecall);

                /** CampaignRecall msgid. */
                public msgid: s5g.game.proto.EMSGID;

                /** CampaignRecall status_code. */
                public status_code: s5g.game.proto.Status.Code;

                /** CampaignRecall campaign_id. */
                public campaign_id: string;

                /** CampaignRecall campaign_type. */
                public campaign_type: number;

                /** CampaignRecall campaign_status. */
                public campaign_status: number;

                /** CampaignRecall remaining_count. */
                public remaining_count: number;

                /** CampaignRecall bet_rate. */
                public bet_rate: number;

                /** CampaignRecall bet_level. */
                public bet_level: number;

                /**
                 * Creates a new CampaignRecall instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns CampaignRecall instance
                 */
                public static create(properties?: s5g.game.proto.ICampaignRecall): s5g.game.proto.CampaignRecall;

                /**
                 * Encodes the specified CampaignRecall message. Does not implicitly {@link s5g.game.proto.CampaignRecall.verify|verify} messages.
                 * @param message CampaignRecall message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: s5g.game.proto.ICampaignRecall, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified CampaignRecall message, length delimited. Does not implicitly {@link s5g.game.proto.CampaignRecall.verify|verify} messages.
                 * @param message CampaignRecall message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: s5g.game.proto.ICampaignRecall, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a CampaignRecall message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns CampaignRecall
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.CampaignRecall;

                /**
                 * Decodes a CampaignRecall message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns CampaignRecall
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.CampaignRecall;

                /**
                 * Verifies a CampaignRecall message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a CampaignRecall message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns CampaignRecall
                 */
                public static fromObject(object: { [k: string]: any }): s5g.game.proto.CampaignRecall;

                /**
                 * Creates a plain object from a CampaignRecall message. Also converts values to other types if specified.
                 * @param message CampaignRecall
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: s5g.game.proto.CampaignRecall, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this CampaignRecall to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a CampaignEventRecall. */
            interface ICampaignEventRecall {

                /** CampaignEventRecall msgid */
                msgid: s5g.game.proto.EMSGID;

                /** CampaignEventRecall campaign_id */
                campaign_id: string;

                /** CampaignEventRecall campaign_type */
                campaign_type: number;

                /** CampaignEventRecall campaign_status */
                campaign_status: number;

                /** CampaignEventRecall redirect_game_id */
                redirect_game_id?: (string|null);

                /** CampaignEventRecall event_type */
                event_type: number;
            }

            /** Represents a CampaignEventRecall. */
            class CampaignEventRecall implements ICampaignEventRecall {

                /**
                 * Constructs a new CampaignEventRecall.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: s5g.game.proto.ICampaignEventRecall);

                /** CampaignEventRecall msgid. */
                public msgid: s5g.game.proto.EMSGID;

                /** CampaignEventRecall campaign_id. */
                public campaign_id: string;

                /** CampaignEventRecall campaign_type. */
                public campaign_type: number;

                /** CampaignEventRecall campaign_status. */
                public campaign_status: number;

                /** CampaignEventRecall redirect_game_id. */
                public redirect_game_id: string;

                /** CampaignEventRecall event_type. */
                public event_type: number;

                /**
                 * Creates a new CampaignEventRecall instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns CampaignEventRecall instance
                 */
                public static create(properties?: s5g.game.proto.ICampaignEventRecall): s5g.game.proto.CampaignEventRecall;

                /**
                 * Encodes the specified CampaignEventRecall message. Does not implicitly {@link s5g.game.proto.CampaignEventRecall.verify|verify} messages.
                 * @param message CampaignEventRecall message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: s5g.game.proto.ICampaignEventRecall, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified CampaignEventRecall message, length delimited. Does not implicitly {@link s5g.game.proto.CampaignEventRecall.verify|verify} messages.
                 * @param message CampaignEventRecall message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: s5g.game.proto.ICampaignEventRecall, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a CampaignEventRecall message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns CampaignEventRecall
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.CampaignEventRecall;

                /**
                 * Decodes a CampaignEventRecall message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns CampaignEventRecall
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.CampaignEventRecall;

                /**
                 * Verifies a CampaignEventRecall message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a CampaignEventRecall message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns CampaignEventRecall
                 */
                public static fromObject(object: { [k: string]: any }): s5g.game.proto.CampaignEventRecall;

                /**
                 * Creates a plain object from a CampaignEventRecall message. Also converts values to other types if specified.
                 * @param message CampaignEventRecall
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: s5g.game.proto.CampaignEventRecall, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this CampaignEventRecall to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a NotifiableCampaignInfo. */
            interface INotifiableCampaignInfo {

                /** NotifiableCampaignInfo campaign_id */
                campaign_id: string;

                /** NotifiableCampaignInfo redirect_game_id */
                redirect_game_id?: (string|null);
            }

            /** Represents a NotifiableCampaignInfo. */
            class NotifiableCampaignInfo implements INotifiableCampaignInfo {

                /**
                 * Constructs a new NotifiableCampaignInfo.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: s5g.game.proto.INotifiableCampaignInfo);

                /** NotifiableCampaignInfo campaign_id. */
                public campaign_id: string;

                /** NotifiableCampaignInfo redirect_game_id. */
                public redirect_game_id: string;

                /**
                 * Creates a new NotifiableCampaignInfo instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns NotifiableCampaignInfo instance
                 */
                public static create(properties?: s5g.game.proto.INotifiableCampaignInfo): s5g.game.proto.NotifiableCampaignInfo;

                /**
                 * Encodes the specified NotifiableCampaignInfo message. Does not implicitly {@link s5g.game.proto.NotifiableCampaignInfo.verify|verify} messages.
                 * @param message NotifiableCampaignInfo message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: s5g.game.proto.INotifiableCampaignInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified NotifiableCampaignInfo message, length delimited. Does not implicitly {@link s5g.game.proto.NotifiableCampaignInfo.verify|verify} messages.
                 * @param message NotifiableCampaignInfo message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: s5g.game.proto.INotifiableCampaignInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a NotifiableCampaignInfo message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns NotifiableCampaignInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.NotifiableCampaignInfo;

                /**
                 * Decodes a NotifiableCampaignInfo message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns NotifiableCampaignInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.NotifiableCampaignInfo;

                /**
                 * Verifies a NotifiableCampaignInfo message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a NotifiableCampaignInfo message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns NotifiableCampaignInfo
                 */
                public static fromObject(object: { [k: string]: any }): s5g.game.proto.NotifiableCampaignInfo;

                /**
                 * Creates a plain object from a NotifiableCampaignInfo message. Also converts values to other types if specified.
                 * @param message NotifiableCampaignInfo
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: s5g.game.proto.NotifiableCampaignInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this NotifiableCampaignInfo to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a CampaignInfoNotify. */
            interface ICampaignInfoNotify {

                /** CampaignInfoNotify msgid */
                msgid: s5g.game.proto.EMSGID;

                /** CampaignInfoNotify campaign_list */
                campaign_list?: (string[]|null);

                /** CampaignInfoNotify notifiable_campaign_list */
                notifiable_campaign_list?: (s5g.game.proto.INotifiableCampaignInfo[]|null);
            }

            /** Represents a CampaignInfoNotify. */
            class CampaignInfoNotify implements ICampaignInfoNotify {

                /**
                 * Constructs a new CampaignInfoNotify.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: s5g.game.proto.ICampaignInfoNotify);

                /** CampaignInfoNotify msgid. */
                public msgid: s5g.game.proto.EMSGID;

                /** CampaignInfoNotify campaign_list. */
                public campaign_list: string[];

                /** CampaignInfoNotify notifiable_campaign_list. */
                public notifiable_campaign_list: s5g.game.proto.INotifiableCampaignInfo[];

                /**
                 * Creates a new CampaignInfoNotify instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns CampaignInfoNotify instance
                 */
                public static create(properties?: s5g.game.proto.ICampaignInfoNotify): s5g.game.proto.CampaignInfoNotify;

                /**
                 * Encodes the specified CampaignInfoNotify message. Does not implicitly {@link s5g.game.proto.CampaignInfoNotify.verify|verify} messages.
                 * @param message CampaignInfoNotify message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: s5g.game.proto.ICampaignInfoNotify, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified CampaignInfoNotify message, length delimited. Does not implicitly {@link s5g.game.proto.CampaignInfoNotify.verify|verify} messages.
                 * @param message CampaignInfoNotify message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: s5g.game.proto.ICampaignInfoNotify, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a CampaignInfoNotify message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns CampaignInfoNotify
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.CampaignInfoNotify;

                /**
                 * Decodes a CampaignInfoNotify message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns CampaignInfoNotify
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.CampaignInfoNotify;

                /**
                 * Verifies a CampaignInfoNotify message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a CampaignInfoNotify message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns CampaignInfoNotify
                 */
                public static fromObject(object: { [k: string]: any }): s5g.game.proto.CampaignInfoNotify;

                /**
                 * Creates a plain object from a CampaignInfoNotify message. Also converts values to other types if specified.
                 * @param message CampaignInfoNotify
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: s5g.game.proto.CampaignInfoNotify, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this CampaignInfoNotify to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a CampaignWinRecall. */
            interface ICampaignWinRecall {

                /** CampaignWinRecall msgid */
                msgid: s5g.game.proto.EMSGID;

                /** CampaignWinRecall campaign_id */
                campaign_id: string;

                /** CampaignWinRecall campaign_type */
                campaign_type: number;

                /** CampaignWinRecall total_win */
                total_win?: (number|null);
            }

            /** Represents a CampaignWinRecall. */
            class CampaignWinRecall implements ICampaignWinRecall {

                /**
                 * Constructs a new CampaignWinRecall.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: s5g.game.proto.ICampaignWinRecall);

                /** CampaignWinRecall msgid. */
                public msgid: s5g.game.proto.EMSGID;

                /** CampaignWinRecall campaign_id. */
                public campaign_id: string;

                /** CampaignWinRecall campaign_type. */
                public campaign_type: number;

                /** CampaignWinRecall total_win. */
                public total_win: number;

                /**
                 * Creates a new CampaignWinRecall instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns CampaignWinRecall instance
                 */
                public static create(properties?: s5g.game.proto.ICampaignWinRecall): s5g.game.proto.CampaignWinRecall;

                /**
                 * Encodes the specified CampaignWinRecall message. Does not implicitly {@link s5g.game.proto.CampaignWinRecall.verify|verify} messages.
                 * @param message CampaignWinRecall message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: s5g.game.proto.ICampaignWinRecall, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified CampaignWinRecall message, length delimited. Does not implicitly {@link s5g.game.proto.CampaignWinRecall.verify|verify} messages.
                 * @param message CampaignWinRecall message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: s5g.game.proto.ICampaignWinRecall, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a CampaignWinRecall message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns CampaignWinRecall
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): s5g.game.proto.CampaignWinRecall;

                /**
                 * Decodes a CampaignWinRecall message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns CampaignWinRecall
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): s5g.game.proto.CampaignWinRecall;

                /**
                 * Verifies a CampaignWinRecall message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a CampaignWinRecall message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns CampaignWinRecall
                 */
                public static fromObject(object: { [k: string]: any }): s5g.game.proto.CampaignWinRecall;

                /**
                 * Creates a plain object from a CampaignWinRecall message. Also converts values to other types if specified.
                 * @param message CampaignWinRecall
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: s5g.game.proto.CampaignWinRecall, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this CampaignWinRecall to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }
        }
    }
}
 
} 
 export {}