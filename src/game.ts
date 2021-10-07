import { range, rangeEq, rangeTo, rangeToEq, seq, used } from 'libsugar'
import { createContext, useContext } from 'react'
import { Pos, posOf } from './pos'
import { Randge } from './randge'
import { Size, sizeOf } from './size'
import { inRange } from './utils'

export class GameState {
    private randge: Randge = null!
    private _playing = false
    public get playing() {
        return this._playing
    }
    private _size: Size = sizeOf(9, 9)
    public get size(): Size {
        return this._size
    }
    private _bombs = 9
    public get bombs() {
        return this._bombs
    }
    private _grid: GameCell[] = []
    public get grid(): GameCell[] {
        return this._grid
    }
    private _firstSafe = 1
    public get firstSafe() {
        return this._firstSafe
    }

    constructor(public update: () => void) {
        this.init()
    }

    private init() {
        this._grid = seq(rangeTo(this.size.height)).flatMap(y => seq(rangeTo(this.size.width)).map(x => new GameCell(posOf(x, y)))).collect()
        this.randge = new Randge(rangeTo(this.size.size))
    }

    restart(size: Size = this.size, bombs = this.bombs, firstSafe = this.firstSafe) {
        this._size = size
        this._bombs = bombs
        this._firstSafe = firstSafe
        this._playing = false
        this.init()
        this.update()
    }

    send(msg: GameMsg) {
        if (msg.type === 'open') {
            if (this.playing) { }
            else {
                this.start(msg.pos, msg.cell)
            }
        }
    }

    private start(pos: Pos, root: GameCell) {
        this._playing = true
        this.genBombs(pos)
        this.update()
    }

    private genBombs(pos: Pos) {
        const safeSpces = [
            used(pos.index(this.size), i => range(i - this.firstSafe, i + this.firstSafe)),
            ...seq(rangeEq(1, this.firstSafe)).flatMap(o => [
                used(pos.mapY(y => y - o).index(this.size), i => range(i - this.firstSafe, i + this.firstSafe)),
                used(pos.mapY(y => y + o).index(this.size), i => range(i - this.firstSafe, i + this.firstSafe))
            ])
        ]
        console.log('start')
        for (const cell of seq(this.randge).filter(i => !seq(safeSpces).any(r => inRange(r, i))).take(this.bombs).map(i => this.grid[i])) {
            cell.hasBomb = true
        }
        for (const [cell, i] of seq(this.grid).enumerate()) {
            Pos.byIndex(i, this.size).forRound(this.size, p => {
                if (this.grid[p.index(this.size)].hasBomb) cell.num++
            })
        }
    }

    private openSpace(pos: Pos) {

    }
}

export const GameStateContext = createContext<GameState>(null!)
export function useGame() {
    return useContext(GameStateContext)
}

export class GameCell {
    constructor(public pos: Pos) { }
    hasBomb = false
    open = true
    num = 0
}

export type GameMsg =
    | { type: 'open', pos: Pos, cell: GameCell }
