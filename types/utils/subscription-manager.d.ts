/** 
based on framer-motion@4.1.17,
Copyright (c) 2018 Framer B.V.
*/
declare type GenericHandler = (...args: any) => void;
export declare class SubscriptionManager<Handler extends GenericHandler> {
    private subscriptions;
    add(handler: Handler): () => void;
    notify(a?: Parameters<Handler>[0], b?: Parameters<Handler>[1], c?: Parameters<Handler>[2]): void;
    getSize(): number;
    clear(): void;
}
export {};
