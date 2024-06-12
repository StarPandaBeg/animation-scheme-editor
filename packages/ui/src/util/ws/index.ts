import type { InferCustomEventPayload } from "vite";

export const EventName = "scheme-editor:event";
export const EventAckName = "scheme-editor:event-ack";

export interface WSSocket {
  on<T extends string>(cb: InferCustomEventPayload<T>, event?: T): void;
  off<T extends string>(cb: InferCustomEventPayload<T>, event?: T): void;

  send<T extends string>(data: InferCustomEventPayload<T>, event?: T): void;
}

export * from "./server";
export * from "./client";
