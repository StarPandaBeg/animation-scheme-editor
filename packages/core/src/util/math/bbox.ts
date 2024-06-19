import {Vector2} from './vector';

export type SerializedBBox = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type PossibleBBox =
  | SerializedBBox
  | [number, number, number, number]
  | Vector2
  | undefined;

export class BBox {
  public x = 0;
  public y = 0;
  public width = 0;
  public height = 0;

  public static fromSizeCentered(size: Vector2): BBox {
    return new BBox(-size.width / 2, -size.height / 2, size.width, size.height);
  }

  public static fromPoints(...points: Vector2[]): BBox {
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    for (const point of points) {
      if (point.x > maxX) {
        maxX = point.x;
      }
      if (point.x < minX) {
        minX = point.x;
      }
      if (point.y > maxY) {
        maxY = point.y;
      }
      if (point.y < minY) {
        minY = point.y;
      }
    }

    return new BBox(minX, minY, maxX - minX, maxY - minY);
  }

  public static fromBBoxes(...boxes: BBox[]): BBox {
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    for (const box of boxes) {
      const right = box.x + box.width;
      if (right > maxX) {
        maxX = right;
      }
      if (box.x < minX) {
        minX = box.x;
      }
      const bottom = box.y + box.height;
      if (bottom > maxY) {
        maxY = bottom;
      }
      if (box.y < minY) {
        minY = box.y;
      }
    }

    return new BBox(minX, minY, maxX - minX, maxY - minY);
  }

  public get position() {
    return new Vector2(this.x, this.y);
  }

  public set position(value: Vector2) {
    this.x = value.x;
    this.y = value.y;
  }

  public get size() {
    return new Vector2(this.width, this.height);
  }

  public get center() {
    return new Vector2(this.x + this.width / 2, this.y + this.height / 2);
  }

  public get left() {
    return this.x;
  }

  public set left(value: number) {
    this.width += this.x - value;
    this.x = value;
  }

  public get right() {
    return this.x + this.width;
  }

  public set right(value: number) {
    this.width = value - this.x;
  }

  public get top() {
    return this.y;
  }

  public set top(value: number) {
    this.height += this.y - value;
    this.y = value;
  }

  public get bottom() {
    return this.y + this.height;
  }

  public set bottom(value: number) {
    this.height = value - this.y;
  }

  public get topLeft(): Vector2 {
    return this.position;
  }

  public get topRight(): Vector2 {
    return new Vector2(this.x + this.width, this.y);
  }

  public get bottomLeft(): Vector2 {
    return new Vector2(this.x, this.y + this.height);
  }

  public get bottomRight(): Vector2 {
    return new Vector2(this.x + this.width, this.y + this.height);
  }

  public get corners(): [Vector2, Vector2, Vector2, Vector2] {
    return [this.topLeft, this.topRight, this.bottomRight, this.bottomLeft];
  }

  public get pixelPerfect() {
    return new BBox(
      Math.floor(this.x),
      Math.floor(this.y),
      Math.ceil(this.width + 1),
      Math.ceil(this.height + 1),
    );
  }

  public constructor();
  public constructor(from: PossibleBBox);
  public constructor(position: Vector2, size: Vector2);
  public constructor(x: number, y?: number, width?: number, height?: number);
  public constructor(
    one?: PossibleBBox | number,
    two: Vector2 | number = 0,
    three = 0,
    four = 0,
  ) {
    if (one === undefined || one === null) {
      return;
    }

    if (typeof one === 'number') {
      this.x = one;
      this.y = <number>two;
      this.width = three;
      this.height = four;
      return;
    }

    if (one instanceof Vector2) {
      this.x = one.x;
      this.y = one.y;

      if (two instanceof Vector2) {
        this.width = two.x;
        this.height = two.y;
      }

      return;
    }

    if (Array.isArray(one)) {
      this.x = one[0];
      this.y = one[1];
      this.width = one[2];
      this.height = one[3];
      return;
    }

    this.x = one.x;
    this.y = one.y;
    this.width = one.width;
    this.height = one.height;
  }

  public includes(point: Vector2): boolean {
    return (
      point.x >= this.x &&
      point.x <= this.x + this.width &&
      point.y >= this.y &&
      point.y <= this.y + this.height
    );
  }

  public intersects(other: BBox): boolean {
    return (
      this.left < other.right &&
      this.right > other.left &&
      this.top < other.bottom &&
      this.bottom > other.top
    );
  }

  public intersection(other: BBox): BBox {
    const bbox = new BBox();

    if (this.intersects(other)) {
      bbox.left = Math.max(this.left, other.left);
      bbox.top = Math.max(this.top, other.top);
      bbox.right = Math.min(this.right, other.right);
      bbox.bottom = Math.min(this.bottom, other.bottom);
    }

    return bbox;
  }

  public union(other: BBox): BBox {
    const bbox = new BBox();

    bbox.left = Math.min(this.left, other.left);
    bbox.top = Math.min(this.top, other.top);
    bbox.right = Math.max(this.right, other.right);
    bbox.bottom = Math.max(this.bottom, other.bottom);

    return bbox;
  }

  public toString(): string {
    return `BBox(${this.x}, ${this.y}, ${this.width}, ${this.height})`;
  }

  public serialize(): SerializedBBox {
    return {x: this.x, y: this.y, width: this.width, height: this.height};
  }
}
