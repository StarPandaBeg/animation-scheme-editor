import {
  Accessor,
  AccessorPropertyGetter,
  AccessorPropertySetter,
} from './accessor.type';

export function privateKeyFor(key: string) {
  return `_${key}`;
}

export function accessor<T>(initialValue?: T) {
  return (target: any, key: string) => {
    createAccessorField(target, key, initialValue);
    target[key] = accessorFor<T>(target, key);
  };
}

export function createAccessorField<TValue>(
  target: any,
  key: string,
  initialValue?: TValue,
) {
  const privateKey = privateKeyFor(key);
  target[privateKey] = initialValue;
}

export function accessorFor<TGetter, TSetter = TGetter>(
  target: any,
  key: string,
  getter: AccessorPropertyGetter<typeof target, TGetter> | null = null,
  setter: AccessorPropertySetter<typeof target, TSetter> | null = null,
): Accessor<TGetter, TSetter> {
  const privateKey = privateKeyFor(key);

  const accessor = function (this: typeof target, value?: TSetter) {
    const getterFunc = getter ?? accessorGetter;
    const setterFunc = setter ?? accessorSetter;

    if (value === undefined) return getterFunc(this, privateKey);
    setterFunc(this, privateKey, value);
  };

  // @ts-ignore
  return accessor.bind(target);
}

function accessorGetter<T>(target: any, key: string): T {
  return target[key];
}

function accessorSetter(target: any, key: string, value: any) {
  target[key] = value;
}
