/** 
based on framer-motion@4.1.17,
Copyright (c) 2018 Framer B.V.
*/
declare type Job = () => void;
declare type JobSetter = (job: Job) => void;
declare type ReadWrites = (read: JobSetter, write: JobSetter) => void;
export declare function batchLayout(callback: ReadWrites): () => boolean;
export declare function flushLayout(): void;
export {};
