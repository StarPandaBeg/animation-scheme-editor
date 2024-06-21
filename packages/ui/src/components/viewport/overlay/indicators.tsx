import {Vector2} from '@animation-scheme-editor/core';
import {JSX} from 'preact/jsx-runtime';
import {CoordinatesIndicator} from './indicators/coordinates';
import {ZoomIndicator} from './indicators/zoom';

import {useViewportContext} from '@/contexts/viewport';
import './style.scss';

export interface ViewportIndicatorsProps
  extends JSX.HTMLAttributes<HTMLDivElement> {
  cursorPosition: Vector2;
  zoom: number;
}

export function ViewportIndicators({
  cursorPosition,
  zoom,
  ...props
}: ViewportIndicatorsProps) {
  const {viewportHovered} = useViewportContext();
  return (
    <div class="viewport-overlay__indicators" {...props}>
      <ZoomIndicator zoom={zoom} />
      {viewportHovered && <CoordinatesIndicator position={cursorPosition} />}
    </div>
  );
}
