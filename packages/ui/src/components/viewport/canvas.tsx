import {JSX} from 'preact';
import {useLayoutEffect, useState} from 'preact/hooks';
import {Stage} from './stage/stage';
import StageView from './stage/stage-view';

interface ViewportCanvasProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export default function ViewportCanvas(props: ViewportCanvasProps) {
  const [stage] = useState(() => new Stage());

  useLayoutEffect(() => {
    const ctx = stage.buffer.getContext('2d');
    const canvas = ctx.canvas;

    // TODO
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'red';
    ctx.rect(0, 0, 100, 100);
    ctx.fill();
  }, []);

  return <StageView stage={stage} {...props} />;
}
