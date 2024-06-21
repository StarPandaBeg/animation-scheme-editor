import {render} from 'preact';

import {WindowsLogo} from '@animation-scheme-editor/2d';
import {Layout, Player, Scene, Vector2} from '@animation-scheme-editor/core';
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

  const testNode1 = WindowsLogo({position: [(1920 / 3) * 1, 1080 / 2]});
  const testNode2 = WindowsLogo({position: [(1920 / 3) * 2, 1080 / 2]});

  registry.register(testNode1 as Layout);
  registry.register(testNode2 as Layout);

  scene.addNode(testNode1);
  scene.addNode(testNode2);

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
