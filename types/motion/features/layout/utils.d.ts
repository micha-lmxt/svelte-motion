/** 
based on framer-motion@4.1.17,
Copyright (c) 2018 Framer B.V.
*/
import { Axis, AxisBox2D } from "../../../types/geometry";
export declare function tweenAxis(target: Axis, prev: Axis, next: Axis, p: number): void;
export declare function calcRelativeOffsetAxis(parent: Axis, child: Axis): {
    min: number;
    max: number;
};
export declare function calcRelativeOffset(parent: AxisBox2D, child: AxisBox2D): AxisBox2D;
interface WithLayoutId {
    getLayoutId: () => undefined | string;
}
export declare function checkIfParentHasChanged(prev: WithLayoutId, next: WithLayoutId): boolean;
export {};
