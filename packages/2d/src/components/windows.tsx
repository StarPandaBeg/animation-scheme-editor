import {Layout, LayoutProps, Rect} from '@animation-scheme-editor/core';

export function WindowsLogo(props: LayoutProps = {}) {
  return (
    <Layout {...props}>
      <Rect size={64} fill="red" x={-34} y={-34} />
      <Rect size={64} fill="green" x={34} y={-34} />
      <Rect size={64} fill="blue" x={-34} y={34} />
      <Rect size={64} fill="yellow" x={34} y={34} />
    </Layout>
  );
}
