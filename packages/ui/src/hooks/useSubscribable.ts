import {EventHandler, Subscribable} from '@animation-scheme-editor/core';
import {Inputs, useEffect} from 'preact/hooks';

export function useSubscribable<TValue, THandler extends EventHandler<TValue>>(
  event: Subscribable<TValue, THandler>,
  handler: THandler,
  inputs: Inputs,
) {
  useEffect(() => {
    event.subscribe(handler);
    return () => event.unsubscribe(handler);
  }, [event, ...inputs]);
}
