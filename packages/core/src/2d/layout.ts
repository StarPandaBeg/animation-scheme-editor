import {vector2Accessor} from '../decorators';
import {PossibleVector2, Vector2Accessor} from '../util';
import {Node, NodeProps} from './node';

export interface LayoutProps extends NodeProps {
  size?: PossibleVector2;
}

export class Layout extends Node {
  @vector2Accessor()
  public declare readonly size: Vector2Accessor;

  constructor(props: LayoutProps = {}) {
    super(props);
  }
}
