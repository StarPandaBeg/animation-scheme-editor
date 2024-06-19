import {accessor, vector2Accessor} from '../decorators';
import {Accessor, Vector2, Vector2Accessor, initialize} from '../util';
import {NodeChildren} from './types';

export class Node {
  @accessor([])
  public declare readonly children: Accessor<NodeChildren>;

  /** Represents the position of this node in local space of its parent. */
  @vector2Accessor()
  public declare readonly position: Vector2Accessor;

  /** Represents the scale of this node. */
  @vector2Accessor(Vector2.one)
  public declare readonly scale: Vector2Accessor;

  public get x() {
    return this.position.x;
  }

  public get y() {
    return this.position.y;
  }

  public constructor() {
    initialize(this);
  }

  render(context: CanvasRenderingContext2D) {
    this.draw(context);
  }

  protected draw(context: CanvasRenderingContext2D) {
    this.drawChildren(context);
  }

  protected drawChildren(context: CanvasRenderingContext2D) {
    for (const child of this.childrenArray) {
      child?.render(context);
    }
  }

  protected get childrenArray() {
    const children = this.children();
    if (Array.isArray(children)) return children;
    return [children];
  }
}
