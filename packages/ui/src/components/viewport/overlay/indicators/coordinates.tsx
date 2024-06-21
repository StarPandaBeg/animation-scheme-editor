import {Label} from '@/components/base/label';
import {Vector2} from '@animation-scheme-editor/core';

export function CoordinatesIndicator({position}: {position: Vector2}) {
  return <Label title="Координаты">{position.toStringPoint()}</Label>;
}
