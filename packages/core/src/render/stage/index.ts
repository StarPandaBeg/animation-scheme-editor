import type {Color} from 'chroma-js';
import {Vector2} from '../../util/math';
import {Scene} from '../scene';

export interface StageSettings {
  size: Vector2;
  background: Color | string | null;
}

export class Stage {
  public readonly buffer: HTMLCanvasElement;

  private context: CanvasRenderingContext2D;
  private background: string | null = null;
  private size: Vector2 = Vector2.zero;

  constructor() {
    this.buffer = document.createElement('canvas');
    this.context = this.buffer.getContext('2d')!;
  }

  configure({
    background = this.background,
    size = this.size,
  }: Partial<StageSettings>) {
    if (!size.exactlyEquals(this.size)) {
      this.resizeCanvas(size);
    }
    this.background =
      typeof background === 'string' ? background : background?.css() ?? null;
  }

  async render(scene: Scene) {
    const canvas = this.context.canvas;
    this.context.clearRect(0, 0, canvas.width, canvas.height);

    if (this.background) {
      this.context.save();

      this.context.fillStyle = this.background;
      this.context.rect(0, 0, canvas.width, canvas.height);
      this.context.fill();

      this.context.restore();
    }

    this.context.save();
    await scene.render(this.context);
    this.context.restore();
  }

  private resizeCanvas(size: Vector2) {
    this.size = size;
    this.buffer.width = size.x;
    this.buffer.height = size.y;
  }
}
