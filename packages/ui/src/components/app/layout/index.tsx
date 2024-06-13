import { ComponentChildren } from "preact";

import "./layout.scss";

type AppLayoutProps = {
  children: ComponentChildren;
};

export default function AppLayout({ children }: AppLayoutProps) {
  return <section class="app-root">{children}</section>;
}
