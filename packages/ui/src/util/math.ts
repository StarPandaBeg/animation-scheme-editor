export function constrain<T extends number>(value: T, min: T, max: T) {
  return Math.min(Math.max(value, min), max);
}
