import {EventDispatcher} from '@animation-scheme-editor/core';
import {EventBase} from '../types/event.type';
import {EventAckName, WSClientSocket, WSSocket} from '../util/ws';

export abstract class RepositoryModule<T extends EventBase> {
  protected $socket: WSSocket;
  protected $dispatcher: EventDispatcher<T>;

  constructor(protected $event: string) {
    this.$socket = new WSClientSocket();
    this.$dispatcher = new EventDispatcher<T>();
    this.$socket.on(this.$on.bind(this), EventAckName);
  }

  get onMessage() {
    return this.$dispatcher.subscribable;
  }

  protected $send(event: EventBase) {
    this.$socket.send(event);
  }

  protected $on(data) {
    this.$dispatcher.dispatch(data);
  }
}
