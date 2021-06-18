
/** 
based on framer-motion@4.1.17,
Copyright (c) 2018 Framer B.V.
*/
import { VariantLabels } from "../motion/types";
import { Writable } from 'svelte/store'
/**
 * @public
 */
export interface PresenceContextProps {
    id: number;
    isPresent: boolean;
    register: (id: number) => () => void;
    onExitComplete?: (id: number) => void;
    initial?: false | VariantLabels;
    custom?: any;
}
/**
 * @public
 */
export declare const PresenceContext: () => Writable<PresenceContextProps | null>
