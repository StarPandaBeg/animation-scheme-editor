import type { Plugin } from "vite";
import { ServerHandler } from "./handler";
import { WSServerSocket } from "../util/ws";
import { EventBase } from "../types/event.type";

export default (): Plugin => {
  return {
    name: "animation-scheme-editor",
    configureServer: (server) => {
      const handler = new ServerHandler();

      server.ws.on(
        "scheme-editor:event",
        async (data: EventBase | undefined, client) => {
          if (!data || !data.event) return;
          const socket = new WSServerSocket(server.ws, client);
          handler.handle(data.event, data, socket);
        }
      );
    },
  };
};
