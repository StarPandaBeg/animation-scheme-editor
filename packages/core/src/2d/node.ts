import {accessor, vector2Accessor} from '../decorators';
import {
  Accessor,
  PossibleVector2,
  Vector2,
  Vector2Accessor,
  initialize,
  setupAccessors,
} from '../util';
import {NodeChildren} from './types';

export interface NodeProps {
  children: NodeChildren;

  position: PossibleVector2;
  scale: PossibleVector2;
}

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

  public constructor(props: Partial<NodeProps> = {}) {
    initialize(this);
    setupAccessors(this, props);
  }

  public localToParent(): DOMMatrix {
    const matrix = new DOMMatrix();
    matrix.translateSelf(this.x(), this.y());
    matrix.scaleSelf(this.scale.x(), this.scale.y());

    return matrix;
  }

  render(context: CanvasRenderingContext2D) {
    context.save();

    this.transformContext(context);
    this.draw(context);

    context.restore();
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

  protected transformContext(context: CanvasRenderingContext2D) {
    const matrix = this.localToParent();
    context.transform(
      matrix.a,
      matrix.b,
      matrix.c,
      matrix.d,
      matrix.e,
      matrix.f,
    );
  }
}
