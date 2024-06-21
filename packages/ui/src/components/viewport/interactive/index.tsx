import {useApplicationContext} from '@/contexts/app';
import {useDrag} from '@/hooks/useDrag';
import {useUpdateEffect} from '@/hooks/useUpdateEffect';
import {useViewportMatrix} from '@/hooks/useViewportMatrix';
import {useViewportPosition} from '@/hooks/useViewportPosition';
import {Node, Vector2} from '@animation-scheme-editor/core';
import {useCallback, useState} from 'preact/hooks';
import './style.scss';

export function Interactive() {
  const {registry} = useApplicationContext();
  const [clickPosition, setClickPosition] = useViewportPosition(false, 0);

  const [selected, setSelected] = useState<Node>(null);
  const matrix = useViewportMatrix();
  useUpdateEffect(() => {
    for (const node of registry) {
      const bbox = node.getBBox();
      if (bbox.includes(clickPosition)) {
        if (node === selected) return;
        setSelected(node);
        console.log('selected', node);
        return;
      }
    }
    if (selected === null) return;
    setSelected(null);
    console.log('clear selection');
  }, [clickPosition]);

  const [handleDrag, isDragging] = useDrag(
    useCallback(
      (dx, dy, x, y) => {
        if (selected === null) return;
        const pos = new Vector2(x, y).transformAsPoint(matrix.inverse());
        selected.position(pos);
      },
      [selected],
    ),
  );

  return (
    <div
      class="viewport-interactive"
      onMouseDown={e => {
        setClickPosition(e);
        handleDrag(e);
      }}
    ></div>
  );
}
