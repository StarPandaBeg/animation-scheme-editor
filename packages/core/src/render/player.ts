import {AsyncEventDispatcher} from '../util/event/async-dispatcher';
import {Scene} from './scene';

export class Player {
  public get onRender() {
    return this.render.subscribable;
  }
  private readonly render: AsyncEventDispatcher<void>;

  private active: boolean = false;
  private requestId: number | null = null;
  private renderTime: number = 0;

  constructor(private scene: Scene) {
    this.render = new AsyncEventDispatcher();
    this.setActive(true);
  }

  get isActive() {
    return this.active;
  }

  get currentScene() {
    return this.scene;
  }

  setActive(state: boolean) {
    if (state === this.active) return;
    this.active = state;
    if (state) {
      this.request();
    }
  }

  private async doRender() {
    await this.render.dispatch();
  }

  private request() {
    if (!this.active) return;

    const fps = 60;

    this.requestId ??= requestAnimationFrame(async time => {
      this.requestId = null;

      if (time - this.renderTime >= 1000 / (fps + 5)) {
        this.renderTime = time;
        try {
          await this.doRender();
          this.request();
        } catch (e: any) {
          console.error(e);
        }
      } else {
        this.request();
      }
    });
  }
}
