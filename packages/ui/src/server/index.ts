import type {Plugin} from 'vite';
import {EventBase} from '../types/event.type';
import {WSServerSocket} from '../util/ws';
import {ServerHandler} from './handler';

export default (): Plugin => {
  return {
    name: 'animation-scheme-editor',
    configureServer: server => {
      const handler = new ServerHandler();

      server.ws.on(
        'scheme-editor:event',
        async (data: EventBase | undefined, client) => {
          if (!data || !data.event) return;
          const socket = new WSServerSocket(server.ws, client);
          handler.handle(data.event, data, socket);
        },
      );
    },
  };
};
