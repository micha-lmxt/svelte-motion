/** 
based on framer-motion@4.0.3,
Copyright (c) 2018 Framer B.V.
*/
import sync from 'framesync';
import { onDestroy } from 'svelte';
import { motionValue } from '.';

export const useCombineMotionValues = (values, combineValues) => {

  const value = motionValue(combineValues());

  let updateValue = () => {
    value.set(combineValues());
  }


  const handler = () => {

    sync.update(updateValue, false, true);
  }

  let subscriptions = values.map((val) => val.onChange(handler))


  onDestroy(() => {

    subscriptions.forEach((unsubscribe) => unsubscribe())
  })

  value.reset = (_values, _combineValues) => {
    //cleanup and reset
    subscriptions.forEach((unsubscribe) => unsubscribe())
    updateValue = ()=>{
      value.set(_combineValues())
    }
    subscriptions = _values.map((val) => val.onChange(handler));
    updateValue();
  }

  return value;
}
//export { default as UseCombineMotionValues } from "./UseCombineValues.svelte";
