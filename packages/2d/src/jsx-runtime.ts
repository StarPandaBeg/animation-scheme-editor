import {Node, NodeChildren} from '@animation-scheme-editor/core';

interface NodeConstructor<TProps = any, TNode = Node> {
  new (props: TProps): TNode;
}

interface JSXProps {
  children?: NodeChildren;
}

export namespace JSX {
  export type Element = Node;
  export type ElementClass = Node;
  export interface ElementChildrenAttribute {
    children: any;
  }
}

export const Fragment = Symbol.for('@animation-scheme-editor/2d/fragment');

export function jsx(
  type: NodeConstructor | typeof Fragment,
  props: JSXProps,
  key?: any,
) {
  const {children, ...rest} = props;
  const flatChildren = Array.isArray(children) ? children.flat() : children;

  if (type === Fragment) {
    return flatChildren;
  }

  const node = new type({...rest, children: flatChildren, key});
  return node;
}
export {jsx as jsxs};
