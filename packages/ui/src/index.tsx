import {render} from 'preact';

import {Player, Scene} from '@animation-scheme-editor/core';
import './assets/sass/style.scss';
import AppLayout from './components/app/layout';
import AppFooter from './components/app/layout/footer';
import AppNavigationBar from './components/app/navigation';
import Viewport from './components/viewport';
import {ApplicationProvider} from './contexts/app';

export function App() {
  const scene = new Scene();
  const player = new Player(scene);

  return (
    <ApplicationProvider
      value={{
        scene,
        player,
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
