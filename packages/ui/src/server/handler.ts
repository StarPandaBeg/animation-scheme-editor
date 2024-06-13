import {WSSocket} from '../util/ws';

export class ServerHandler {
  constructor() {}

  handle<T extends string>(event: T, payload: any, socket: WSSocket) {
    console.log('received event:', event);
  }
}
