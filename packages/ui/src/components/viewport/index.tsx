import {ViewportProvider, ViewportState} from '@/contexts/viewport';
import {useDrag} from '@/hooks/useDrag';
import {useSize} from '@/hooks/useSize';
import {constrain} from '@/util/math';
import {JSX} from 'preact';
import {useCallback, useMemo, useRef, useState} from 'preact/hooks';
import ViewportCanvas from './canvas';
import {Indicators} from './interactive/indicators';
import './viewport.scss';

const ZOOM_MIN = 0.1;
const ZOOM_MAX = 600;

export default function Viewport() {
  const container = useRef<HTMLDivElement>();
  const size = useSize(container);

  const [position, setPosition] = useState({x: 0, y: 0});
  const [zoom, setZoom] = useState(0.5);
  const [hovered, setHovered] = useState(false);

  const state = useMemo<ViewportState>(() => {
    return {
      zoom,
      ...position,
      rect: size,
      viewportHovered: hovered,
    };
  }, [position, zoom, size, hovered]);

  const [handleDrag, isDragging] = useDrag(
    useCallback(
      (x, y) => {
        setZoom(state.zoom);
        setPosition({
          x: state.x + x,
          y: state.y + y,
        });
      },
      [state],
    ),
    undefined,
    null,
  );

  const onWheel = (event: JSX.TargetedWheelEvent<HTMLDivElement>) => {
    if (isDragging) return;
    const rect = container.current.getBoundingClientRect();
    const pointer = {
      x: event.x - rect.x - rect.width / 2,
      y: event.y - rect.y - rect.height / 2,
    };

    const ratio = 1 - Math.sign(event.deltaY) * 0.1;
    const targetZoom = constrain(ratio * zoom, ZOOM_MIN, ZOOM_MAX);
    const shouldMove = targetZoom > ZOOM_MIN && targetZoom < ZOOM_MAX;

    if (shouldMove) {
      setPosition({
        x: pointer.x + (state.x - pointer.x) * ratio,
        y: pointer.y + (state.y - pointer.y) * ratio,
      });
    }
    setZoom(targetZoom);
  };

  return (
    <ViewportProvider value={state}>
      <div
        ref={container}
        class="viewport"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <ViewportCanvas
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
          }}
        />
        <div
          className="viewport__overlay"
          onMouseDown={event => {
            if (event.button === 1 || (event.button === 0 && event.shiftKey)) {
              handleDrag(event);
            }
          }}
          onWheel={onWheel}
        >
          <Indicators />
        </div>
      </div>
    </ViewportProvider>
  );
}
