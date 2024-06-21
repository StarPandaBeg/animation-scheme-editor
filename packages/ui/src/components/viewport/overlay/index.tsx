import {JSX} from 'preact/jsx-runtime';

import {useViewportContext} from '@/contexts/viewport';
import {useViewportPosition} from '@/hooks/useViewportPosition';
import {ViewportIndicators} from './indicators';
import './style.scss';

export interface ViewportOverlayProps
  extends JSX.HTMLAttributes<HTMLDivElement> {}

export function ViewportOverlay(props: ViewportOverlayProps) {
  const {zoom} = useViewportContext();
  const [cursorPosition, setCursorPosition] = useViewportPosition(true);

  return (
    <>
      <div {...props} class="viewport-overlay" onMouseMove={setCursorPosition}>
        <ViewportIndicators cursorPosition={cursorPosition} zoom={zoom} />
      </div>
    </>
  );
}
