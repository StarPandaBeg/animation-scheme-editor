import {BBox} from '../math';

export function drawRect(path: Path2D, bbox: BBox) {
  path.rect(bbox.x, bbox.y, bbox.width, bbox.height);
}
