import {Scene} from '../scene';

export class Stage {
  public readonly buffer: HTMLCanvasElement;

  private context: CanvasRenderingContext2D;

  constructor() {
    this.buffer = document.createElement('canvas');
    this.context = this.buffer.getContext('2d')!;
  }

  async render(scene: Scene) {
    await scene.render(this.context);
  }
}
