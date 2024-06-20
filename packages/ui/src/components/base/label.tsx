import {ComponentChildren, JSX} from 'preact';
import './style.scss';

export interface LabelProps extends JSX.HTMLAttributes<HTMLDivElement> {
  children: ComponentChildren;
}

export function Label({children, ...props}: LabelProps) {
  return (
    <div class="label" {...props}>
      {children}
    </div>
  );
}
