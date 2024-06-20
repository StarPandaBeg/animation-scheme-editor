export function getAllPropertyDescriptors(obj: any): Record<string, any> {
  if (!obj) {
    return Object.create(null);
  } else {
    const proto = Object.getPrototypeOf(obj);
    return {
      ...getAllPropertyDescriptors(proto),
      ...Object.getOwnPropertyDescriptors(obj),
    };
  }
}
