import {
  PossibleVector2,
  Vector2,
  Vector2Key,
  accessorFor,
  createAccessorField,
  createVectorFieldAccessors,
} from '../util';

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
