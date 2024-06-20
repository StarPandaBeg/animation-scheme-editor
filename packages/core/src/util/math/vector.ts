import {EPSILON, RAD2DEG} from '.';
import {Matrix2D, PossibleMatrix2D} from './matrix';

export type SerializedVector2<T = number> = {
  x: T;
  y: T;
};

export type PossibleVector2<T = number> =
  | SerializedVector2<T>
  | {width: T; height: T}
  | T
  | [T, T]
  | undefined;

/**
 * Represents a two-dimensional vector.
 */
export class Vector2 {
  public static readonly zero = new Vector2();
  public static readonly one = new Vector2(1, 1);
  public static readonly right = new Vector2(1, 0);
  public static readonly left = new Vector2(-1, 0);
  public static readonly up = new Vector2(0, 1);
  public static readonly down = new Vector2(0, -1);

  /**
   * A constant equal to `Vector2(0, -1)`
   */
  public static readonly top = new Vector2(0, -1);
  /**
   * A constant equal to `Vector2(0, 1)`
   */
  public static readonly bottom = new Vector2(0, 1);
  /**
   * A constant equal to `Vector2(-1, -1)`
   */
  public static readonly topLeft = new Vector2(-1, -1);
  /**
   * A constant equal to `Vector2(1, -1)`
   */
  public static readonly topRight = new Vector2(1, -1);
  /**
   * A constant equal to `Vector2(-1, 1)`
   */
  public static readonly bottomLeft = new Vector2(-1, 1);
  /**
   * A constant equal to `Vector2(1, 1)`
   */
  public static readonly bottomRight = new Vector2(1, 1);

  public x = 0;
  public y = 0;

  public static fromScalar(value: number): Vector2 {
    return new Vector2(value, value);
  }

  public static magnitude(x: number, y: number) {
    return Math.sqrt(x * x + y * y);
  }

  public static squaredMagnitude(x: number, y: number) {
    return x * x + y * y;
  }

  public get width(): number {
    return this.x;
  }

  public set width(value: number) {
    this.x = value;
  }

  public get height(): number {
    return this.y;
  }

  public set height(value: number) {
    this.y = value;
  }

  public get magnitude(): number {
    return Vector2.magnitude(this.x, this.y);
  }

  public get squaredMagnitude(): number {
    return Vector2.squaredMagnitude(this.x, this.y);
  }

  public get normalized(): Vector2 {
    return this.scale(1 / Vector2.magnitude(this.x, this.y));
  }

  public get safe(): Vector2 {
    return new Vector2(isNaN(this.x) ? 0 : this.x, isNaN(this.y) ? 0 : this.y);
  }

  public get flipped(): Vector2 {
    return new Vector2(-this.x, -this.y);
  }

  public get floored(): Vector2 {
    return new Vector2(Math.floor(this.x), Math.floor(this.y));
  }

  public get rounded(): Vector2 {
    return new Vector2(Math.round(this.x), Math.round(this.y));
  }

  public get ceiled(): Vector2 {
    return new Vector2(Math.ceil(this.x), Math.ceil(this.y));
  }

  public get perpendicular(): Vector2 {
    return new Vector2(this.y, -this.x);
  }

  public constructor();
  public constructor(from: PossibleVector2);
  public constructor(x: number, y: number);

  public constructor(one?: PossibleVector2 | number, two?: number) {
    if (one === undefined || one === null) {
      return;
    }

    if (typeof one !== 'object') {
      this.x = one;
      this.y = two ?? one;
      return;
    }

    if (Array.isArray(one)) {
      this.x = one[0];
      this.y = one[1];
      return;
    }

    if ('width' in one) {
      this.x = one.width;
      this.y = one.height;
      return;
    }

    this.x = one.x;
    this.y = one.y;
  }

  public scale(value: number) {
    return new Vector2(this.x * value, this.y * value);
  }

  public mul(possibleVector: PossibleVector2) {
    const vector = new Vector2(possibleVector);
    return new Vector2(this.x * vector.x, this.y * vector.y);
  }

  public div(possibleVector: PossibleVector2) {
    const vector = new Vector2(possibleVector);
    return new Vector2(this.x / vector.x, this.y / vector.y);
  }

  public add(possibleVector: PossibleVector2) {
    const vector = new Vector2(possibleVector);
    return new Vector2(this.x + vector.x, this.y + vector.y);
  }

  public sub(possibleVector: PossibleVector2) {
    const vector = new Vector2(possibleVector);
    return new Vector2(this.x - vector.x, this.y - vector.y);
  }

  public dot(possibleVector: PossibleVector2): number {
    const vector = new Vector2(possibleVector);
    return this.x * vector.x + this.y * vector.y;
  }

  public cross(possibleVector: PossibleVector2): number {
    const vector = new Vector2(possibleVector);
    return this.x * vector.y - this.y * vector.x;
  }

  public mod(possibleVector: PossibleVector2): Vector2 {
    const vector = new Vector2(possibleVector);
    return new Vector2(this.x % vector.x, this.y % vector.y);
  }

  public addX(value: number) {
    return new Vector2(this.x + value, this.y);
  }

  public addY(value: number) {
    return new Vector2(this.x, this.y + value);
  }

  /**
   * Transform the components of the vector.
   *
   * @example
   * Raise the components to the power of 2.
   * ```ts
   * const vector = new Vector2(2, 3);
   * const result = vector.transform(value => value ** 2);
   * ```
   *
   * @param callback - A callback to apply to each component.
   */
  public map(callback: (value: number, index: number) => number) {
    return new Vector2(callback(this.x, 0), callback(this.y, 1));
  }

  public toString() {
    return `Vector2(${this.x}, ${this.y})`;
  }

  public toStringPoint() {
    return `(${this.x}, ${this.y})`;
  }

  public toArray() {
    return [this.x, this.y];
  }

  public serialize(): SerializedVector2 {
    return {x: this.x, y: this.y};
  }

  /**
   * Check if two vectors are exactly equal to each other.
   *
   * @remarks
   * If you need to compensate for floating point inaccuracies, use the
   * {@link equals} method, instead.
   *
   * @param other - The vector to compare.
   */
  public exactlyEquals(other: Vector2): boolean {
    return this.x === other.x && this.y === other.y;
  }

  /**
   * Check if two vectors are equal to each other.
   *
   * @remarks
   * This method allows passing an allowed error margin when comparing vectors
   * to compensate for floating point inaccuracies. To check if two vectors are
   * exactly equal, use the {@link exactlyEquals} method, instead.
   *
   * @param other - The vector to compare.
   * @param threshold - The allowed error threshold when comparing the vectors.
   */
  public equals(other: Vector2, threshold = EPSILON): boolean {
    return (
      Math.abs(this.x - other.x) <= threshold + Number.EPSILON &&
      Math.abs(this.y - other.y) <= threshold + Number.EPSILON
    );
  }

  public transformAsPoint(matrix: PossibleMatrix2D) {
    const m = new Matrix2D(matrix);

    return new Vector2(
      this.x * m.scaleX + this.y * m.skewY + m.translateX,
      this.x * m.skewX + this.y * m.scaleY + m.translateY,
    );
  }

  public static radians(x: number, y: number) {
    return Math.atan2(y, x);
  }

  public static degrees(x: number, y: number) {
    return Vector2.radians(x, y) * RAD2DEG;
  }

  public *[Symbol.iterator]() {
    yield this.x;
    yield this.y;
  }
}
