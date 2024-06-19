import {accessorFor, addInitializer, createAccessorField} from '../util';

export function accessor<T>(initialValue?: T) {
  return (target: any, key: string) => {
    addInitializer(target, (instance: any) => {
      createAccessorField(instance, key, initialValue);
      instance[key] = accessorFor<T>(instance, key);
    });
  };
}
