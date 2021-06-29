/** 
based on framer-motion@4.0.3,
Copyright (c) 2018 Framer B.V.
*/
import sync from 'framesync';
import { motionValue } from '.';

export const useCombineMotionValues = (values, combineValues) => {

  let subscriptions = [];
  let vals = values;

  
  const unsubscribe = ()=>{
    subscriptions.forEach((unsubscribe) => unsubscribe())
  }
  const subscribe = () => {
    subscriptions = vals.map((val) => val.onChange(handler))
    updateValue();
  }
  const value = motionValue(combineValues(), () => {
    unsubscribe()
    subscribe()
    return unsubscribe;
  });

  let updateValue = () => {
    value.set(combineValues());
  }

  const handler = () => {
    sync.update(updateValue, false, true);
  }

  value.reset = (_values, _combineValues) => {
    vals=_values;
    //cleanup and reset
    unsubscribe()
    updateValue = () => {
      value.set(_combineValues())
    }
    subscribe()
  }

  return value;
}
//export { default as UseCombineMotionValues } from "./UseCombineValues.svelte";
