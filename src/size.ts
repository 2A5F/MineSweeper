export class Size {
    constructor(public width: number, public height: number) { }

    get size() {
        return this.width * this.height
    }
}

export function sizeOf(width: number, height: number): Size {
    return new Size(width, height)
}
