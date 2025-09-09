declare global {
 // DO NOT EDIT! This is a generated file. Edit the JSDoc in src/*.js instead and run 'npm run types'.

/** Namespace math. */
export namespace math {

    /** Namespace proto. */
    namespace proto {

        /** ModuleCommandID enum. */
        enum ModuleCommandID {
            kSelectSubGame = 1,
            kSelectVolatile = 2,
            kSpinIndex = 3,
            kSetCollectCnt = 4,
            kSetMultiBet = 5,
            kExtraData = 6,
            kCheatCode = 7
        }

        /** Properties of a ModuleCommandHeader. */
        interface IModuleCommandHeader {

            /** ModuleCommandHeader id */
            id: math.proto.ModuleCommandID;
        }

        /** Represents a ModuleCommandHeader. */
        class ModuleCommandHeader implements IModuleCommandHeader {

            /**
             * Constructs a new ModuleCommandHeader.
             * @param [properties] Properties to set
             */
            constructor(properties?: math.proto.IModuleCommandHeader);

            /** ModuleCommandHeader id. */
            public id: math.proto.ModuleCommandID;

            /**
             * Creates a new ModuleCommandHeader instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ModuleCommandHeader instance
             */
            public static create(properties?: math.proto.IModuleCommandHeader): math.proto.ModuleCommandHeader;

            /**
             * Encodes the specified ModuleCommandHeader message. Does not implicitly {@link math.proto.ModuleCommandHeader.verify|verify} messages.
             * @param message ModuleCommandHeader message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: math.proto.IModuleCommandHeader, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ModuleCommandHeader message, length delimited. Does not implicitly {@link math.proto.ModuleCommandHeader.verify|verify} messages.
             * @param message ModuleCommandHeader message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: math.proto.IModuleCommandHeader, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ModuleCommandHeader message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ModuleCommandHeader
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): math.proto.ModuleCommandHeader;

            /**
             * Decodes a ModuleCommandHeader message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ModuleCommandHeader
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): math.proto.ModuleCommandHeader;

            /**
             * Verifies a ModuleCommandHeader message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ModuleCommandHeader message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ModuleCommandHeader
             */
            public static fromObject(object: { [k: string]: any }): math.proto.ModuleCommandHeader;

            /**
             * Creates a plain object from a ModuleCommandHeader message. Also converts values to other types if specified.
             * @param message ModuleCommandHeader
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: math.proto.ModuleCommandHeader, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ModuleCommandHeader to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a SelectSubGameCommand. */
        interface ISelectSubGameCommand {

            /** SelectSubGameCommand id */
            id: math.proto.ModuleCommandID;

            /** SelectSubGameCommand sub_game_id */
            sub_game_id?: (number[]|null);
        }

        /** Represents a SelectSubGameCommand. */
        class SelectSubGameCommand implements ISelectSubGameCommand {

            /**
             * Constructs a new SelectSubGameCommand.
             * @param [properties] Properties to set
             */
            constructor(properties?: math.proto.ISelectSubGameCommand);

            /** SelectSubGameCommand id. */
            public id: math.proto.ModuleCommandID;

            /** SelectSubGameCommand sub_game_id. */
            public sub_game_id: number[];

            /**
             * Creates a new SelectSubGameCommand instance using the specified properties.
             * @param [properties] Properties to set
             * @returns SelectSubGameCommand instance
             */
            public static create(properties?: math.proto.ISelectSubGameCommand): math.proto.SelectSubGameCommand;

            /**
             * Encodes the specified SelectSubGameCommand message. Does not implicitly {@link math.proto.SelectSubGameCommand.verify|verify} messages.
             * @param message SelectSubGameCommand message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: math.proto.ISelectSubGameCommand, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified SelectSubGameCommand message, length delimited. Does not implicitly {@link math.proto.SelectSubGameCommand.verify|verify} messages.
             * @param message SelectSubGameCommand message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: math.proto.ISelectSubGameCommand, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a SelectSubGameCommand message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns SelectSubGameCommand
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): math.proto.SelectSubGameCommand;

            /**
             * Decodes a SelectSubGameCommand message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns SelectSubGameCommand
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): math.proto.SelectSubGameCommand;

            /**
             * Verifies a SelectSubGameCommand message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a SelectSubGameCommand message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns SelectSubGameCommand
             */
            public static fromObject(object: { [k: string]: any }): math.proto.SelectSubGameCommand;

            /**
             * Creates a plain object from a SelectSubGameCommand message. Also converts values to other types if specified.
             * @param message SelectSubGameCommand
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: math.proto.SelectSubGameCommand, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this SelectSubGameCommand to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a SelectVolatileCommand. */
        interface ISelectVolatileCommand {

            /** SelectVolatileCommand id */
            id: math.proto.ModuleCommandID;

            /** SelectVolatileCommand volatile_id */
            volatile_id: number;
        }

        /** Represents a SelectVolatileCommand. */
        class SelectVolatileCommand implements ISelectVolatileCommand {

            /**
             * Constructs a new SelectVolatileCommand.
             * @param [properties] Properties to set
             */
            constructor(properties?: math.proto.ISelectVolatileCommand);

            /** SelectVolatileCommand id. */
            public id: math.proto.ModuleCommandID;

            /** SelectVolatileCommand volatile_id. */
            public volatile_id: number;

            /**
             * Creates a new SelectVolatileCommand instance using the specified properties.
             * @param [properties] Properties to set
             * @returns SelectVolatileCommand instance
             */
            public static create(properties?: math.proto.ISelectVolatileCommand): math.proto.SelectVolatileCommand;

            /**
             * Encodes the specified SelectVolatileCommand message. Does not implicitly {@link math.proto.SelectVolatileCommand.verify|verify} messages.
             * @param message SelectVolatileCommand message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: math.proto.ISelectVolatileCommand, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified SelectVolatileCommand message, length delimited. Does not implicitly {@link math.proto.SelectVolatileCommand.verify|verify} messages.
             * @param message SelectVolatileCommand message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: math.proto.ISelectVolatileCommand, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a SelectVolatileCommand message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns SelectVolatileCommand
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): math.proto.SelectVolatileCommand;

            /**
             * Decodes a SelectVolatileCommand message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns SelectVolatileCommand
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): math.proto.SelectVolatileCommand;

            /**
             * Verifies a SelectVolatileCommand message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a SelectVolatileCommand message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns SelectVolatileCommand
             */
            public static fromObject(object: { [k: string]: any }): math.proto.SelectVolatileCommand;

            /**
             * Creates a plain object from a SelectVolatileCommand message. Also converts values to other types if specified.
             * @param message SelectVolatileCommand
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: math.proto.SelectVolatileCommand, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this SelectVolatileCommand to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a SpinIndexCommand. */
        interface ISpinIndexCommand {

            /** SpinIndexCommand id */
            id: math.proto.ModuleCommandID;

            /** SpinIndexCommand spin_idx */
            spin_idx: number;
        }

        /** Represents a SpinIndexCommand. */
        class SpinIndexCommand implements ISpinIndexCommand {

            /**
             * Constructs a new SpinIndexCommand.
             * @param [properties] Properties to set
             */
            constructor(properties?: math.proto.ISpinIndexCommand);

            /** SpinIndexCommand id. */
            public id: math.proto.ModuleCommandID;

            /** SpinIndexCommand spin_idx. */
            public spin_idx: number;

            /**
             * Creates a new SpinIndexCommand instance using the specified properties.
             * @param [properties] Properties to set
             * @returns SpinIndexCommand instance
             */
            public static create(properties?: math.proto.ISpinIndexCommand): math.proto.SpinIndexCommand;

            /**
             * Encodes the specified SpinIndexCommand message. Does not implicitly {@link math.proto.SpinIndexCommand.verify|verify} messages.
             * @param message SpinIndexCommand message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: math.proto.ISpinIndexCommand, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified SpinIndexCommand message, length delimited. Does not implicitly {@link math.proto.SpinIndexCommand.verify|verify} messages.
             * @param message SpinIndexCommand message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: math.proto.ISpinIndexCommand, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a SpinIndexCommand message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns SpinIndexCommand
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): math.proto.SpinIndexCommand;

            /**
             * Decodes a SpinIndexCommand message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns SpinIndexCommand
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): math.proto.SpinIndexCommand;

            /**
             * Verifies a SpinIndexCommand message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a SpinIndexCommand message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns SpinIndexCommand
             */
            public static fromObject(object: { [k: string]: any }): math.proto.SpinIndexCommand;

            /**
             * Creates a plain object from a SpinIndexCommand message. Also converts values to other types if specified.
             * @param message SpinIndexCommand
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: math.proto.SpinIndexCommand, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this SpinIndexCommand to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a SetCollectCntCommand. */
        interface ISetCollectCntCommand {

            /** SetCollectCntCommand id */
            id: math.proto.ModuleCommandID;

            /** SetCollectCntCommand CollectCnt */
            CollectCnt: number;

            /** SetCollectCntCommand CurrentTotalBet */
            CurrentTotalBet: number;
        }

        /** Represents a SetCollectCntCommand. */
        class SetCollectCntCommand implements ISetCollectCntCommand {

            /**
             * Constructs a new SetCollectCntCommand.
             * @param [properties] Properties to set
             */
            constructor(properties?: math.proto.ISetCollectCntCommand);

            /** SetCollectCntCommand id. */
            public id: math.proto.ModuleCommandID;

            /** SetCollectCntCommand CollectCnt. */
            public CollectCnt: number;

            /** SetCollectCntCommand CurrentTotalBet. */
            public CurrentTotalBet: number;

            /**
             * Creates a new SetCollectCntCommand instance using the specified properties.
             * @param [properties] Properties to set
             * @returns SetCollectCntCommand instance
             */
            public static create(properties?: math.proto.ISetCollectCntCommand): math.proto.SetCollectCntCommand;

            /**
             * Encodes the specified SetCollectCntCommand message. Does not implicitly {@link math.proto.SetCollectCntCommand.verify|verify} messages.
             * @param message SetCollectCntCommand message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: math.proto.ISetCollectCntCommand, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified SetCollectCntCommand message, length delimited. Does not implicitly {@link math.proto.SetCollectCntCommand.verify|verify} messages.
             * @param message SetCollectCntCommand message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: math.proto.ISetCollectCntCommand, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a SetCollectCntCommand message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns SetCollectCntCommand
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): math.proto.SetCollectCntCommand;

            /**
             * Decodes a SetCollectCntCommand message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns SetCollectCntCommand
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): math.proto.SetCollectCntCommand;

            /**
             * Verifies a SetCollectCntCommand message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a SetCollectCntCommand message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns SetCollectCntCommand
             */
            public static fromObject(object: { [k: string]: any }): math.proto.SetCollectCntCommand;

            /**
             * Creates a plain object from a SetCollectCntCommand message. Also converts values to other types if specified.
             * @param message SetCollectCntCommand
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: math.proto.SetCollectCntCommand, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this SetCollectCntCommand to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a SetMultiBetCommand. */
        interface ISetMultiBetCommand {

            /** SetMultiBetCommand id */
            id: math.proto.ModuleCommandID;

            /** SetMultiBetCommand MultiBetList */
            MultiBetList?: (number[]|null);
        }

        /** Represents a SetMultiBetCommand. */
        class SetMultiBetCommand implements ISetMultiBetCommand {

            /**
             * Constructs a new SetMultiBetCommand.
             * @param [properties] Properties to set
             */
            constructor(properties?: math.proto.ISetMultiBetCommand);

            /** SetMultiBetCommand id. */
            public id: math.proto.ModuleCommandID;

            /** SetMultiBetCommand MultiBetList. */
            public MultiBetList: number[];

            /**
             * Creates a new SetMultiBetCommand instance using the specified properties.
             * @param [properties] Properties to set
             * @returns SetMultiBetCommand instance
             */
            public static create(properties?: math.proto.ISetMultiBetCommand): math.proto.SetMultiBetCommand;

            /**
             * Encodes the specified SetMultiBetCommand message. Does not implicitly {@link math.proto.SetMultiBetCommand.verify|verify} messages.
             * @param message SetMultiBetCommand message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: math.proto.ISetMultiBetCommand, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified SetMultiBetCommand message, length delimited. Does not implicitly {@link math.proto.SetMultiBetCommand.verify|verify} messages.
             * @param message SetMultiBetCommand message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: math.proto.ISetMultiBetCommand, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a SetMultiBetCommand message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns SetMultiBetCommand
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): math.proto.SetMultiBetCommand;

            /**
             * Decodes a SetMultiBetCommand message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns SetMultiBetCommand
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): math.proto.SetMultiBetCommand;

            /**
             * Verifies a SetMultiBetCommand message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a SetMultiBetCommand message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns SetMultiBetCommand
             */
            public static fromObject(object: { [k: string]: any }): math.proto.SetMultiBetCommand;

            /**
             * Creates a plain object from a SetMultiBetCommand message. Also converts values to other types if specified.
             * @param message SetMultiBetCommand
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: math.proto.SetMultiBetCommand, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this SetMultiBetCommand to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an ExtraDataCommand. */
        interface IExtraDataCommand {

            /** ExtraDataCommand id */
            id: math.proto.ModuleCommandID;

            /** ExtraDataCommand index */
            index: number;

            /** ExtraDataCommand data */
            data?: (number[]|null);
        }

        /** Represents an ExtraDataCommand. */
        class ExtraDataCommand implements IExtraDataCommand {

            /**
             * Constructs a new ExtraDataCommand.
             * @param [properties] Properties to set
             */
            constructor(properties?: math.proto.IExtraDataCommand);

            /** ExtraDataCommand id. */
            public id: math.proto.ModuleCommandID;

            /** ExtraDataCommand index. */
            public index: number;

            /** ExtraDataCommand data. */
            public data: number[];

            /**
             * Creates a new ExtraDataCommand instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ExtraDataCommand instance
             */
            public static create(properties?: math.proto.IExtraDataCommand): math.proto.ExtraDataCommand;

            /**
             * Encodes the specified ExtraDataCommand message. Does not implicitly {@link math.proto.ExtraDataCommand.verify|verify} messages.
             * @param message ExtraDataCommand message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: math.proto.IExtraDataCommand, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ExtraDataCommand message, length delimited. Does not implicitly {@link math.proto.ExtraDataCommand.verify|verify} messages.
             * @param message ExtraDataCommand message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: math.proto.IExtraDataCommand, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an ExtraDataCommand message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ExtraDataCommand
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): math.proto.ExtraDataCommand;

            /**
             * Decodes an ExtraDataCommand message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ExtraDataCommand
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): math.proto.ExtraDataCommand;

            /**
             * Verifies an ExtraDataCommand message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an ExtraDataCommand message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ExtraDataCommand
             */
            public static fromObject(object: { [k: string]: any }): math.proto.ExtraDataCommand;

            /**
             * Creates a plain object from an ExtraDataCommand message. Also converts values to other types if specified.
             * @param message ExtraDataCommand
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: math.proto.ExtraDataCommand, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ExtraDataCommand to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a CheatCodeCommand. */
        interface ICheatCodeCommand {

            /** CheatCodeCommand id */
            id: math.proto.ModuleCommandID;

            /** CheatCodeCommand rng */
            rng?: (number[]|null);
        }

        /** Represents a CheatCodeCommand. */
        class CheatCodeCommand implements ICheatCodeCommand {

            /**
             * Constructs a new CheatCodeCommand.
             * @param [properties] Properties to set
             */
            constructor(properties?: math.proto.ICheatCodeCommand);

            /** CheatCodeCommand id. */
            public id: math.proto.ModuleCommandID;

            /** CheatCodeCommand rng. */
            public rng: number[];

            /**
             * Creates a new CheatCodeCommand instance using the specified properties.
             * @param [properties] Properties to set
             * @returns CheatCodeCommand instance
             */
            public static create(properties?: math.proto.ICheatCodeCommand): math.proto.CheatCodeCommand;

            /**
             * Encodes the specified CheatCodeCommand message. Does not implicitly {@link math.proto.CheatCodeCommand.verify|verify} messages.
             * @param message CheatCodeCommand message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: math.proto.ICheatCodeCommand, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified CheatCodeCommand message, length delimited. Does not implicitly {@link math.proto.CheatCodeCommand.verify|verify} messages.
             * @param message CheatCodeCommand message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: math.proto.ICheatCodeCommand, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a CheatCodeCommand message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns CheatCodeCommand
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): math.proto.CheatCodeCommand;

            /**
             * Decodes a CheatCodeCommand message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns CheatCodeCommand
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): math.proto.CheatCodeCommand;

            /**
             * Verifies a CheatCodeCommand message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a CheatCodeCommand message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns CheatCodeCommand
             */
            public static fromObject(object: { [k: string]: any }): math.proto.CheatCodeCommand;

            /**
             * Creates a plain object from a CheatCodeCommand message. Also converts values to other types if specified.
             * @param message CheatCodeCommand
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: math.proto.CheatCodeCommand, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this CheatCodeCommand to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }
}
 
} 
 export {}