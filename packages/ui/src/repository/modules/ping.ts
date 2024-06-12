import { EventBase } from "../../types/event.type";
import { RepositoryModule } from "../module.base";

export class PingModule extends RepositoryModule<EventBase> {
  ping() {
    this.$send({ event: "ping" });
  }
}
