import {propertyAccessor, vector2Accessor} from '../decorators';
import {BBox, PossibleVector2, Vector2Accessor} from '../util';
import {Node, NodeProps} from './node';

export interface LayoutProps extends NodeProps {
  size?: PossibleVector2;

  width?: number;
  height?: number;
}

export class Layout extends Node {
  @vector2Accessor()
  public declare readonly size: Vector2Accessor;

  @propertyAccessor()
  public get width() {
    return this.size.x;
  }

  @propertyAccessor()
  public get height() {
    return this.size.y;
  }

  public get leftTop() {
    const offset = this.size().div(2);
    return this.position().sub(offset);
  }

  public get rightTop() {
    return this.leftTop.addX(this.size().x);
  }

  public get leftBottom() {
    return this.rightBottom.addX(-this.size().x);
  }

  public get rightBottom() {
    const offset = this.size().div(2);
    return this.position().add(offset);
  }

  constructor(props: LayoutProps = {}) {
    super(props);
  }

  public getBBox(): BBox {
    const childrenBBox = this.getChildrenBBox();
    const thisBBox = BBox.fromSizeCentered(this.size());

    const bbox = BBox.fromBBoxes(thisBBox, childrenBBox);
    bbox.position = bbox.position.add(this.position());
    return bbox;
  }

  protected getChildrenBBox(): BBox {
    const childrenBoxes = this.children().map(child => {
      if (child instanceof Layout) return child.getBBox();
      return new BBox();
    });
    return BBox.fromBBoxes(...childrenBoxes);
  }
}
