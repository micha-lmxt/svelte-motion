/** 
based on framer-motion@4.1.17,
Copyright (c) 2018 Framer B.V.
*/
import { WithDepth } from "./compare-by-depth";
export declare class FlatTree {
    private children;
    private isDirty;
    add(child: WithDepth): void;
    remove(child: WithDepth): void;
    forEach(callback: (child: WithDepth) => void): void;
}
