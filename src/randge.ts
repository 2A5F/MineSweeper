import { range, seq } from "libsugar";

export class Randge implements Iterable<number> {
    private bucket: number[]
    constructor(range: Iterable<number>) {
        this.bucket = [...range]
    }
    *[Symbol.iterator](): Iterator<number, any, undefined> {
        for (const i of range(this.bucket.length - 1, 0)) {
            const rand = (Math.random() * i) | 0;
            yield ([this.bucket[rand], this.bucket[i]] = [this.bucket[i], this.bucket[rand]])[1]
        }
    }

}
