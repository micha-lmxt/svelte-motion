import sync from 'framesync';
import { tick } from 'svelte';
import { get } from 'svelte/store';
import { motionValue } from '.';

export const useCombineMotionValues = (values, combineValues ) => {
  
    let updateValue = () => {};
  
    const handler = () => sync.update(updateValue,false,true);
  
    const value = readable(motionValue(combineValues()), ()=>{
      
      let subscriptions = [];
      
      tick().then(() => subscriptions = values.map((val) => val.onChange(handler)));
      
      return () => subscriptions.forEach((unsubscribe) => unsubscribe());
    });
  
    updateValue = (combineValues) => get(value).set(combineValues());
  
    value.update = updateValue;
  
    return value;
}
export { default as UseCombineMotionValues } from "./UseCombineValues.svelte";
