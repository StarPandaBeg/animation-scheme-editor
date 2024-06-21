/*
This code is taken from
Motion Canvas (https://github.com/motion-canvas/motion-canvas) by motion-canvas, included under the MIT license (https://opensource.org/license/mit/)
*/

import {useApplicationContext} from '@/contexts/app';
import {useViewportContext} from '@/contexts/viewport';
import {useMemo} from 'preact/hooks';

export function useViewportMatrix() {
  const {settings} = useApplicationContext();
  const viewport = useViewportContext();

  const size = settings.size;

  return useMemo(() => {
    const matrix = new DOMMatrix();
    if (!size) {
      return matrix;
    }

    const offset = size.scale(1 / -2);
    const scale = viewport.zoom;

    matrix.translateSelf(
      viewport.x + viewport.rect.width / 2,
      viewport.y + viewport.rect.height / 2,
    );
    matrix.scaleSelf(scale, scale);
    matrix.translateSelf(offset.width, offset.height);

    return matrix;
  }, [settings.size, viewport]);
}
