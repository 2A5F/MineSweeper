import { Maybe } from "libsugar"
import { Size } from "./size"

export class Pos {
    constructor(public x: number, public y: number) { }

    static byIndex(index: number, size: Size) {
        return new Pos(index % size.width, index / size.width | 0)
    }

    get str() {
        return `${this.x},${this.y}`
    }

    index(size: Size) {
        return this.y * size.width + this.x
    }

    mapX(f: (x: number) => number) {
        return new Pos(f(this.x), this.y)
    }
    mapY(f: (y: number) => number) {
        return new Pos(this.x, f(this.y))
    }

    left(size: Size) {
        return this.x > 0 ? this.mapX(x => x - 1) : null
    }

    right(size: Size) {
        return this.x < size.width - 1 ? this.mapX(x => x + 1) : null
    }

    up(size: Size) {
        return this.y > 0 ? this.mapY(y => y - 1) : null
    }

    down(size: Size) {
        return this.y < size.height - 1 ? this.mapY(y => y + 1) : null
    }

    upLeft(size: Size) {
        return this.up(size)?.left(size)
    }

    upRight(size: Size) {
        return this.up(size)?.right(size)
    }

    downLeft(size: Size) {
        return this.down(size)?.left(size)
    }

    downRight(size: Size) {
        return this.down(size)?.right(size)
    }

    forRound(size: Size, f: (p: Pos) => void) {
        Maybe.then(this.up(size), f)
        Maybe.then(this.down(size), f)
        Maybe.then(this.left(size), f)
        Maybe.then(this.right(size), f)
        Maybe.then(this.upLeft(size), f)
        Maybe.then(this.upRight(size), f)
        Maybe.then(this.downLeft(size), f)
        Maybe.then(this.downRight(size), f)
    }
}

export function posOf(x: number, y: number) {
    return new Pos(x, y)
}
