import {vector2Accessor} from '../decorators';
import {Vector2Accessor} from '../util';
import {Node} from './node';

export class Layout extends Node {
  @vector2Accessor()
  public declare readonly size: Vector2Accessor;
}
