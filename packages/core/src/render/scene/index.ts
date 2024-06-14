export class Scene {
  async render(context: CanvasRenderingContext2D) {
    const canvas = context.canvas;

    // TODO: Render pipeline
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = 'red';
    context.rect(0, 0, 100, 100);
    context.fill();
  }
}
