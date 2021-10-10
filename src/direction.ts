import { Maybe } from "libsugar"

export type Direction = 'up' | 'down' | 'left' | 'right' | 'upLeft' | 'upRight' | 'downLeft' | 'downRight'

export namespace Direction {
    export function rev(dir: Direction): Direction {
        switch (dir) {
            case 'up': return 'down'
            case 'down': return 'up'
            case 'left': return 'right'
            case 'right': return 'left'
            case 'upLeft': return 'downRight'
            case 'upRight': return 'downLeft'
            case 'downLeft': return 'upRight'
            case 'downRight': return 'upLeft'
        }
    }

    export function same(a?: Maybe<Direction>, b?: Maybe<Direction>) {
        switch (a) {
            case null: case void 0: return b == null
            case 'up': return b === 'up' || b === 'upLeft' || b === 'upRight'
            case 'down': return b === 'down' || b === 'downLeft' || b === 'downRight'
            case 'left': return b === 'left' || b === 'upLeft' || b === 'downLeft'
            case 'right': return b === 'right' || b === 'upRight' || b === 'downRight'
            case 'upLeft': return b === 'upLeft' || b === 'up' || b === 'left'
            case 'upRight': return b === 'upRight' || b === 'up' || b === 'right'
            case 'downLeft': return b === 'downLeft' || b === 'down' || b === 'left'
            case 'downRight': return b === 'downRight' || b === 'down' || b === 'right'
        }
    }
}
