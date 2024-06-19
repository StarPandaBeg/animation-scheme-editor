import {Fields} from '../../types/class-helper.type';
import {PossibleVector2, Vector2} from '../math';
import {Accessor, AccessorGetter, AccessorSetter} from './accessor.type';

export interface Vector2AccessorGetter extends AccessorGetter<Vector2> {}

export interface Vector2AccessorSetter
  extends AccessorSetter<PossibleVector2> {}

export type Vector2Accessor<TFields extends string[] = ['x', 'y']> =
  Vector2AccessorGetter &
    Vector2AccessorSetter &
    Fields<TFields, Accessor<number>>;
