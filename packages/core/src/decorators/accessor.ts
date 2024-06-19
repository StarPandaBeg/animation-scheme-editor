import {accessorFor, createAccessorField} from '../util';

export function accessor<T>(initialValue?: T) {
  return (target: any, key: string) => {
    createAccessorField(target, key, initialValue);
    target[key] = accessorFor<T>(target, key);
  };
}
