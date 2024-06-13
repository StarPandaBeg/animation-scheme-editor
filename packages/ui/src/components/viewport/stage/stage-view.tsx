import {JSX} from 'preact';
import {useLayoutEffect, useRef} from 'preact/hooks';
import type {Stage} from './stage';

interface StageViewProps extends JSX.HTMLAttributes<HTMLDivElement> {
  stage: Stage;
}

export default function StageView({stage, ...props}: StageViewProps) {
  const ref = useRef<HTMLDivElement>();

  useLayoutEffect(() => {
    ref.current.append(stage.buffer);
    return () => stage.buffer.remove();
  }, [stage, ref]);

  return <div ref={ref} {...props}></div>;
}
