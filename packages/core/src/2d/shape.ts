import {accessor} from '../decorators';
import {Accessor, PossibleColor, resolveColor} from '../util';
import {Layout, LayoutProps} from './layout';

export interface ShapeProps extends LayoutProps {
  fill: PossibleColor;
  stroke: PossibleColor;
  lineWidth: number;
}

export class Shape extends Layout {
  @accessor()
  public declare readonly fill: Accessor<PossibleColor>;

  @accessor()
  public declare readonly stroke: Accessor<PossibleColor>;

  @accessor(0)
  public declare readonly lineWidth: Accessor<number>;

  public constructor(props: Partial<LayoutProps>) {
    super(props);
  }

  protected override draw(context: CanvasRenderingContext2D) {
    this.drawShape(context);
    this.drawChildren(context);
  }

  protected drawShape(context: CanvasRenderingContext2D) {
    const path = this.getPath();
    const hasFill = this.fill() !== null;
    const hasStroke = this.lineWidth() > 0 && this.stroke() !== null;

    context.save();
    this.applyStyle(context);
    hasFill && context.fill(path);
    hasStroke && context.stroke(path);
    context.restore();
  }

  protected getPath() {
    return new Path2D();
  }

  protected applyStyle(context: CanvasRenderingContext2D) {
    context.fillStyle = resolveColor(this.fill());
    context.strokeStyle = resolveColor(this.stroke());
    context.lineWidth = this.lineWidth();
  }
}
