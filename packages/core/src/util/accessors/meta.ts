const META = Symbol.for('@animation-scheme-editor/core/util/accessors/meta');

export function registerAccessor(instance: any, key: string) {
  let lookup: string[];
  if (!instance[META]) {
    instance[META] = lookup = [];
  } else {
    lookup = instance[META];
  }
  lookup.push(key);
}

export function getAccessors(instance: any) {
  const lookup = instance[META] as string[];
  if (!lookup) return {};

  return lookup.reduce((acc: Record<string, any>, key) => {
    if (Object.prototype.hasOwnProperty.call(instance, key)) {
      acc[key] = instance[key];
    }
    return acc;
  }, {});
}

export function setupAccessors(instance: any, props: Record<string, any> = {}) {
  const meta = getAccessors(instance);
  const metaKeys = Object.keys(meta);

  for (const [key, value] of Object.entries(props)) {
    if (!metaKeys.includes(key)) continue;
    meta[key](value);
  }
}
