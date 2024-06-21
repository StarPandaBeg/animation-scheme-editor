import {EventDispatcher} from '@animation-scheme-editor/core';

export class Registry<T> {
  protected items: T[];

  protected itemRegisteredDispatcher: EventDispatcher<T>;
  protected itemUnregisteredDispatcher: EventDispatcher<T>;

  public constructor() {
    this.items = [];
    this.itemRegisteredDispatcher = new EventDispatcher();
    this.itemUnregisteredDispatcher = new EventDispatcher();
  }

  public get onItemRegistered() {
    return this.itemRegisteredDispatcher.subscribable;
  }

  public get onItemUnregistered() {
    return this.itemUnregisteredDispatcher.subscribable;
  }

  public register(item: T) {
    if (this.items.includes(item)) return;
    this.items.push(item);
    this.itemRegisteredDispatcher.dispatch(item);
  }

  public unregister(item: T) {
    const index = this.items.indexOf(item);
    if (index === -1) return false;
    this.items.splice(index, 1);
    this.itemUnregisteredDispatcher.dispatch(item);
    return true;
  }

  public *[Symbol.iterator]() {
    for (const item of this.items) {
      yield item;
    }
  }
}
