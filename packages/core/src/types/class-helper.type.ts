export type ClassKeys<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? never : K;
}[keyof T];

export type Fields<TFields extends string[], TValue = any> = {
  [K in TFields[number]]: TValue;
};

export type PrefixedFields<
  TFields extends string[],
  TValue = any,
  TPrefix extends string = '',
> = {
  [K in TFields[number] as `${TPrefix}${Capitalize<K>}`]: TValue;
};
