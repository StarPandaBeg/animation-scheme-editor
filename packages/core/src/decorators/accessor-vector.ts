import {
  PossibleVector2,
  Vector2,
  Vector2Key,
  accessorFor,
  addInitializer,
  createAccessorField,
  createVectorFieldAccessors,
  registerAccessor,
} from '../util';

export function vector2Accessor(
  initialValue: PossibleVector2 = Vector2.zero,
  fields: Vector2Key[] = ['x', 'y'],
) {
  return (target: any, key: string) => {
    addInitializer(target, (instance: any) => {
      registerAccessor(instance, key);

      const vector = new Vector2(initialValue);
      const vectorSetter = (t: any, k: string, v: PossibleVector2) =>
        (t[k] = new Vector2(v));

      createAccessorField<Vector2>(instance, key, vector);
      const vectorAccessor = accessorFor<Vector2, PossibleVector2>(
        instance,
        key,
        null,
        vectorSetter,
      );

      instance[key] = vectorAccessor;
      createVectorFieldAccessors(instance, key, vectorAccessor, fields);
    });
  };
}
