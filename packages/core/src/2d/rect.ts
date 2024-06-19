import {BBox, drawRect} from '../util';
import {Shape} from './shape';

export class Rect extends Shape {
  protected override getPath() {
    const path = new Path2D();
    const bbox = BBox.fromSizeCentered(this.size());

    drawRect(path, bbox);
    return path;
  }
}
