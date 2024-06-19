import {ClassKeys} from '../../types/class-helper.type';
import {PossibleVector2, Vector2} from '../math';
import {accessorFor, createAccessorField} from './accessor';
import {Accessor} from './accessor.type';

type Vector2Key = ClassKeys<Vector2>;

export function vector2Accessor(
  initialValue: PossibleVector2 = Vector2.zero,
  fields: Vector2Key[] = ['x', 'y'],
) {
  return (target: any, key: string) => {
    const vector = new Vector2(initialValue);
    const vectorSetter = (t: any, k: string, v: PossibleVector2) =>
      (t[k] = new Vector2(v));

    createAccessorField<Vector2>(target, key, vector);
    const vectorAccessor = accessorFor<Vector2, PossibleVector2>(
      target,
      key,
      null,
      vectorSetter,
    );

    target[key] = vectorAccessor;
    createVectorFieldAccessors(target, key, vectorAccessor, fields);
  };
}

function createVectorFieldAccessors(
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
