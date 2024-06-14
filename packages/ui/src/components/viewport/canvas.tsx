import {useApplicationContext} from '@/contexts/app';
import {useSubscribable} from '@/hooks/useSubscribable';
import {Stage} from '@animation-scheme-editor/core';
import {JSX} from 'preact';
import {useState} from 'preact/hooks';
import StageView from './stage/stage-view';

interface ViewportCanvasProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export default function ViewportCanvas(props: ViewportCanvasProps) {
  const {player, settings} = useApplicationContext();
  const [stage] = useState(() => new Stage());
  stage.configure(settings);

  useSubscribable(
    player.onRender,
    async () => {
      await stage.render(player.currentScene);
    },
    [],
  );

  return <StageView stage={stage} {...props} />;
}
