export function clamp<T extends number>(value: T, min: T, max: T) {
  return Math.min(Math.max(value, min), max);
}

export function map(from: number, to: number, value: number) {
  return from + (to - from) * value;
}
