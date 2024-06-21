import {EffectCallback, Inputs, useEffect, useRef} from 'preact/hooks';

export function useUpdateEffect(effect: EffectCallback, inputs?: Inputs) {
  const firstCall = useRef(true);
  useEffect(() => {
    if (firstCall.current) {
      firstCall.current = false;
      return;
    }
    return effect();
  }, inputs);
}
