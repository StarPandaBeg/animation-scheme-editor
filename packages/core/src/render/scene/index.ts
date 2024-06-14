export class Scene {
  async render(context: CanvasRenderingContext2D) {
    // TODO: Render pipeline
    context.fillStyle = 'red';
    context.fillRect(0, 0, 50, 50);
  }
}
