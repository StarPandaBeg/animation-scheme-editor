import type {
  InferCustomEventPayload,
  WebSocketClient,
  WebSocketServer,
} from 'vite';
import {EventAckName, EventName, WSSocket} from '.';

export class WSServerSocket implements WSSocket {
  private server: WebSocketServer;
  private client: WebSocketClient;

  constructor(server: WebSocketServer, client: WebSocketClient) {
    this.server = server;
    this.client = client;
  }

  on<T extends string>(
    cb: InferCustomEventPayload<T>,
    event: T = EventName as T,
  ): void {
    this.server.on(event, cb);
  }

  off<T extends string>(
    cb: InferCustomEventPayload<T>,
    event: T = EventName as T,
  ): void {
    this.server.off(event, cb);
  }

  send<T extends string>(
    data: InferCustomEventPayload<T> = null,
    event: T = EventAckName as T,
  ): void {
    this.client.send(event, data);
  }

  broadcast<T extends string>(
    data: InferCustomEventPayload<T> = null,
    event: T = EventAckName as T,
  ): void {
    this.server.send(event, data);
  }
}
