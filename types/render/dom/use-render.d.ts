/** 
based on framer-motion@4.1.17,
Copyright (c) 2018 Framer B.V.
*/
import { RenderComponent } from "../../motion/features/types";
import { HTMLRenderState } from "../html/types";
import { SVGRenderState } from "../svg/types";
export declare function createUseRender(forwardMotionProps?: boolean): RenderComponent<SVGElement | HTMLElement, HTMLRenderState | SVGRenderState>;
