/** 
based on framer-motion@4.0.3,
Copyright (c) 2018 Framer B.V.
*/
import Motion from '../../motion/Motion.svelte';
import { loadFeatures } from "../../motion/features/definitions"


export const createMotionClass = (features)=>{
    features && loadFeatures(features)
    return Motion;           
}
