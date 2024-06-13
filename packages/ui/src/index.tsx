import {render} from 'preact';

import './assets/sass/style.scss';
import AppLayout from './components/app/layout';
import AppFooter from './components/app/layout/footer';
import AppNavigationBar from './components/app/navigation';
import Viewport from './components/viewport';

export function App() {
  return (
    <AppLayout>
      <AppNavigationBar></AppNavigationBar>
      <Viewport />
      <AppFooter />
    </AppLayout>
  );
}

render(<App />, document.getElementById('app'));
