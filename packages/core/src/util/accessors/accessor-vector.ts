import {ClassKeys, Fields} from '../../types/class-helper.type';
import {PossibleVector2, Vector2} from '../math';
import {
  Accessor,
  AccessorGetter,
  AccessorSetter,
  accessorFor,
} from './accessor';

export interface Vector2AccessorGetter extends AccessorGetter<Vector2> {}

export interface Vector2AccessorSetter
  extends AccessorSetter<PossibleVector2> {}

export type Vector2Accessor<TFields extends string[] = ['x', 'y']> =
  Vector2AccessorGetter &
    Vector2AccessorSetter &
    Fields<TFields, Accessor<number>>;

export type Vector2Key = ClassKeys<Vector2>;

export function createVectorFieldAccessors(
  target: any,
  key: string,
  accessor: Accessor<Vector2, PossibleVector2>,
  fields: Vector2Key[],
) {
  for (const field of fields) {
    const fieldGetter = (t: any, k: string) => vectorFieldGetter(t, k, field);
    const fieldSetter = (t: any, k: string, v: number) =>
      vectorFieldSetter(t, k, field, v);

    const fieldAccessor = accessorFor(target, key, fieldGetter, fieldSetter);
    // @ts-ignore
    accessor[field] = fieldAccessor;
  }
}

function vectorFieldGetter(target: any, key: string, field: Vector2Key) {
  return target[key][field];
}

function vectorFieldSetter(
  target: any,
  key: string,
  field: Vector2Key,
  value: number,
) {
  target[key][field] = value;
}
