export class Grid<T> {
    width: number;
    height: number;
    array: (T | undefined)[];

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.array = new Array(this.length);
    }

    get length(): number {
        return this.width * this.height;
    }

    outOfBounds(x: number, y: number): boolean {
        return x > this.width || x < 0 || y > this.height || y < 0;
    }

    // coordinate to index
    i(x: number, y: number): number {
        return (y * this.height) + x;
    }

    set(x: number, y: number, val: (T | undefined)): void {
        if (this.outOfBounds(x, y)) {
            throw new Error(`Out of bounds: size is ${this.width}x${this.height} tried to set to ${x}x${y}`);
        }
        this.array[this.i(x, y)] = val;
    }

    get(x: number, y: number): (T | undefined) {
        if (this.outOfBounds(x, y)) {
            throw new Error(`Out of bounds: size is ${this.width}x${this.height} tried to get from ${x}x${y}`);
        }
        return this.array[this.i(x, y)];
    }
}
