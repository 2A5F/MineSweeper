import { None, NRange, seq } from "libsugar";

export type Clazz = None | string | Clazz[] | Record<string | number, boolean | None>

/** Build class */
export function clazz(...args: Clazz[]): string {
    return seq(args).filter(i => i).map(i => typeof i === 'string' ? i : i instanceof Array ? clazz(...i) : seq(Object.entries(i!)).filter(([, v]) => v).map(([k]) => k).filter(i => i).join(' ')).filter(i => i).join(' ')
}
/** Build class */
export function clazs(...args: Clazz[]): string {
    const r = clazz(...args)
    return r ? ` ${r}` : ''
}

export function inRange(range: NRange, v: number) {
    const [from, to] = range.from > range.to ? [range.to, range.from] : [range.from, range.to]
    return v >= from && v <= to
}
