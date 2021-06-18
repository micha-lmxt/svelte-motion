/** 
based on framer-motion@4.1.17,
Copyright (c) 2018 Framer B.V.
*/
/**
 * Tests a value against the list of ValueTypes
 */
export declare const findValueType: (v: any) => import("style-value-types").ValueType | {
    test: (v: any) => boolean;
    parse: (v: string) => (number | import("style-value-types").RGBA | import("style-value-types").HSLA)[];
    createTransformer: (v: string) => (v: (string | number | import("style-value-types").Color)[]) => string;
    getAnimatableNone: (v: string) => string;
} | undefined;
