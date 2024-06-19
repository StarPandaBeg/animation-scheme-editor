export interface AccessorGetter<TValue> {
  (): TValue;
}

export interface AccessorSetter<TValue> {
  (value: TValue): void;
}

export interface Accessor<TGetter, TSetter = TGetter>
  extends AccessorGetter<TGetter>,
    AccessorSetter<TSetter> {}

export type AccessorPropertyGetter<TTarget, TGetter> = (
  target: TTarget,
  key: string,
) => TGetter;

export type AccessorPropertySetter<TTarget, TValue> = (
  target: TTarget,
  key: string,
  value: TValue,
) => void;
