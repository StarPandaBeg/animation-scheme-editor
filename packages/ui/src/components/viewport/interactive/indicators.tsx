import {Label} from '@/components/base/label';
import {useViewportContext} from '@/contexts/viewport';
import {useViewportPosition} from '@/hooks/useViewportPosition';
import {useMemo} from 'preact/hooks';
import './style.scss';

export function Indicators() {
  const viewport = useViewportContext();

  const [cursorPosition, setCursorPosition] = useViewportPosition(true);
  const zoomValue = useMemo(() => {
    return Math.round(viewport.zoom * 100);
  }, [viewport.zoom]);

  return (
    <div class="viewport-indicators" onMouseMove={setCursorPosition}>
      <Label title="Масштаб">{zoomValue}%</Label>
      {viewport.viewportHovered && (
        <Label title="Координаты">{cursorPosition.toStringPoint()}</Label>
      )}
    </div>
  );
}
