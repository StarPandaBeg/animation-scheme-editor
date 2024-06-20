import {addInitializer, registerAccessor} from '../util';

export function propertyAccessor() {
  return (target: any, key: string) => {
    addInitializer(target, (instance: any) => {
      registerAccessor(instance, key);
    });
  };
}
