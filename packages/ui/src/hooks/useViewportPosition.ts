import {useViewportContext} from '@/contexts/viewport';
import {Vector2} from '@animation-scheme-editor/core';
import {useCallback, useState} from 'preact/hooks';
import {useViewportMatrix} from './useViewportMatrix';

export function useViewportPosition(
  rounded: boolean = false,
): [Vector2, (event: MouseEvent) => void] {
  const viewport = useViewportContext();
  const matrix = useViewportMatrix();

  const [position, setPosition] = useState<Vector2>(Vector2.zero);

  const setPositionByEvent = useCallback(
    (event: MouseEvent) => {
      const position = new Vector2(
        event.x - viewport.rect.x,
        event.y - viewport.rect.y,
      );
      const transformedPosition = position.transformAsPoint(matrix.inverse());
      setPosition(rounded ? transformedPosition.rounded : transformedPosition);
    },
    [viewport.rect, matrix],
  );

  return [position, setPositionByEvent];
}
