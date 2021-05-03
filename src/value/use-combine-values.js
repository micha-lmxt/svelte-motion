/** 
based on framer-motion@4.0.3,
Copyright (c) 2018 Framer B.V.
*/
import sync from 'framesync';
import { onDestroy } from 'svelte';
import { motionValue } from '.';

export const useCombineMotionValues = (values, combineValues) => {


  const value = motionValue(combineValues());

  const updateValue = () => {
    value.set(combineValues());
  }


  const handler = () => {
    
    sync.update(updateValue, false, true);
  }
  
  const subscriptions = values.map((val) => val.onChange(handler))
  

  onDestroy(() =>{

    subscriptions.forEach((unsubscribe) => unsubscribe())
  }
  )

  value.update = (values,combineValues)=>{
    value.set(combineValues());
  }
  return value;
}
export { default as UseCombineMotionValues } from "./UseCombineValues.svelte";
