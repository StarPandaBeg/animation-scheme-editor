import {
  accessorFor,
  addInitializer,
  createAccessorField,
  registerAccessor,
} from '../util';

export function accessor<T>(initialValue?: T) {
  return (target: any, key: string) => {
    addInitializer(target, (instance: any) => {
      registerAccessor(instance, key);

      createAccessorField(instance, key, initialValue);
      instance[key] = accessorFor<T>(instance, key);
    });
  };
}
