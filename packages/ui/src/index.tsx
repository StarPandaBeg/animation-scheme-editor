import {render} from 'preact';

import {Player, Scene, Vector2} from '@animation-scheme-editor/core';
import './assets/sass/style.scss';
import AppLayout from './components/app/layout';
import AppFooter from './components/app/layout/footer';
import AppNavigationBar from './components/app/navigation';
import Viewport from './components/viewport';
import {ApplicationProvider, Settings} from './contexts/app';
import {Registry} from './registry';

export function App() {
  const settings: Settings = {
    background: 'white',
    size: new Vector2(1920, 1080),
  };
  const scene = new Scene();
  const player = new Player(scene);
  const registry = new Registry<Layout>();

  return (
    <ApplicationProvider
      value={{
        scene,
        player,
        settings,
        registry,
      }}
    >
      <AppLayout>
        <AppNavigationBar></AppNavigationBar>
        <Viewport />
        <AppFooter />
      </AppLayout>
    </ApplicationProvider>
  );
}

render(<App />, document.getElementById('app'));
