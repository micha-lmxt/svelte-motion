import Motion from '../../motion/Motion.svelte';



export const createMotionClass = (features)=>{

    return class MotionComponent extends Motion {
        constructor(options){
            options.props.features = features;
            super(options);
        }
    }                
}