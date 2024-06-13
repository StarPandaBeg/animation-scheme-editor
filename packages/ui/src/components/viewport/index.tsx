import {ViewportProvider, ViewportState} from '@/contexts/viewport';
import {constrain} from '@/util/math';
import {JSX} from 'preact';
import {useMemo, useRef, useState} from 'preact/hooks';
import ViewportCanvas from './canvas';

import './viewport.scss';

export default function Viewport() {
  const container = useRef<HTMLDivElement>();
  const [position, setPosition] = useState({x: 0, y: 0});
  const [zoom, setZoom] = useState(1);

  const state = useMemo<ViewportState>(() => {
    return {
      zoom,
      ...position,
    };
  }, [position, zoom]);

  const onWheel = (event: JSX.TargetedWheelEvent<HTMLDivElement>) => {
    const rect = container.current.getBoundingClientRect();
    const pointer = {
      x: event.x - rect.x - rect.width / 2,
      y: event.y - rect.y - rect.height / 2,
    };

    const ratio = 1 - Math.sign(event.deltaY) * 0.1;
    const targetZoom = constrain(ratio * zoom, 0.1, 8);

    setPosition({
      x: pointer.x + (state.x - pointer.x) * ratio,
      y: pointer.y + (state.y - pointer.y) * ratio,
    });
    setZoom(targetZoom);
  };

  return (
    <ViewportProvider value={state}>
      <div ref={container} class="viewport">
        <ViewportCanvas
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
          }}
        />
        <div className="viewport__overlay" onWheel={onWheel}></div>
      </div>
    </ViewportProvider>
  );
}
