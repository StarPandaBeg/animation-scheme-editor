import type {InferCustomEventPayload} from 'vite';
import type {ViteHotContext} from 'vite/types/hot.js';
import {EventName, WSSocket} from '.';

export class WSClientSocket implements WSSocket {
  private ctx: ViteHotContext;

  constructor() {
    // @ts-ignore
    this.ctx = import.meta.hot;
  }

  on<T extends string>(
    cb: InferCustomEventPayload<T>,
    event: T = EventName as T,
  ): void {
    this.ctx.on(event, cb);
  }

  off<T extends string>(
    cb: InferCustomEventPayload<T>,
    event: T = EventName as T,
  ): void {
    this.ctx.off(event, cb);
  }

  send<T extends string>(
    data: InferCustomEventPayload<T> = null,
    event: T = EventName as T,
  ): void {
    this.ctx.send(event, data);
  }
}

export const wsClientSocket = new WSClientSocket();
