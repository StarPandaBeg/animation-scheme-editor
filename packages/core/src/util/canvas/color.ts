import {Color} from 'chroma-js';

export type PossibleColor = Color | string | null;

export function resolveColor(color: PossibleColor): string {
  if (color === null || color === undefined) return '';
  if (typeof color === 'string') return color;
  return color.css();
}
