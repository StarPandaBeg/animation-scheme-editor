import {BBox, drawRect} from '../util';
import {Shape, ShapeProps} from './shape';

export interface RectProps extends ShapeProps {}

export class Rect extends Shape {
  public constructor(props: RectProps = {}) {
    super(props);
  }

  protected override getPath() {
    const path = new Path2D();
    const bbox = BBox.fromSizeCentered(this.size());

    drawRect(path, bbox);
    return path;
  }
}
