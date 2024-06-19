import {Node} from '../../2d';

export class Scene {
  private nodes: Array<Node>;

  constructor() {
    this.nodes = [];
  }

  addNode(node: Node) {
    this.nodes.push(node);
  }

  async render(context: CanvasRenderingContext2D) {
    for (const node of this.nodes) {
      context.save();
      node.render(context);
      context.restore();
    }
  }
}
