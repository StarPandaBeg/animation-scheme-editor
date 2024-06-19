const INITIALIZERS = Symbol.for(
  '@animation-scheme-editor/core/2d/util/accessors/initializers',
);

export type Initializer<T> = (instance: T, context?: any) => void;

export function addInitializer<T>(target: any, initializer: Initializer<T>) {
  if (!target[INITIALIZERS]) {
    target[INITIALIZERS] = [];
  } else if (
    // if one of the prototypes has initializers
    target[INITIALIZERS] &&
    // and it's not the target object itself
    !Object.prototype.hasOwnProperty.call(target, INITIALIZERS)
  ) {
    const base = Object.getPrototypeOf(target);
    target[INITIALIZERS] = [...base[INITIALIZERS]];
  }

  target[INITIALIZERS].push(initializer);
}

export function initialize(target: any, context?: any) {
  if (target[INITIALIZERS]) {
    try {
      target[INITIALIZERS].forEach((initializer: Initializer<any>) =>
        initializer(target, context),
      );
    } catch (e: any) {
      e.inspect ??= target.key;
      throw e;
    }
  }
}
