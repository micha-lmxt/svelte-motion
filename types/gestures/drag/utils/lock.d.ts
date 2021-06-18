/** 
based on framer-motion@4.1.17,
Copyright (c) 2018 Framer B.V.
*/
export declare type Lock = (() => void) | false;
export declare function createLock(name: string): () => Lock;
export declare function getGlobalLock(drag: boolean | "x" | "y" | "lockDirection"): Lock;
export declare function isDragActive(): boolean;
