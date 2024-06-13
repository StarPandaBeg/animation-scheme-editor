import { render } from "preact";

import "./assets/sass/style.scss";
import AppLayout from "./components/app/layout";
import AppNavigationBar from "./components/app/navigation";
import AppFooter from "./components/app/layout/footer";

export function App() {
  return (
    <AppLayout>
      <AppNavigationBar></AppNavigationBar>
      <div></div>
      <AppFooter />
    </AppLayout>
  );
}

render(<App />, document.getElementById("app"));
