import Motion from '../../motion/Motion.svelte';
import { loadFeatures } from "../../motion/features/definitions"


export const createMotionClass = (features)=>{
    features && loadFeatures(features)
    return class MotionComponent extends Motion {
        constructor(options){
            super(options);
        }
    }                
}