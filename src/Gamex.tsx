import { range, rangeEq, rangeTo, seq, used } from 'libsugar';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Direction } from './direction';
import { posOf, Pos } from './pos';
import { Randge } from './randge';
import { Size, sizeOf } from './size';
import { inRange } from './utils';
import { Board as XpBoard } from './xp'

export default function Game({ theme }: { theme: 'xp' }) {
    const game = useGame()

    const ThemeBoard = useMemo(() => {
        switch (theme) {
            case 'xp':
            default: return XpBoard
        }
    }, [theme])

    return <div className={`game grid place-self-center`}>
        <ThemeBoard size={game.size} grid={game.grid}
            onRestart={() => game.restart()}
            onOpen={msg => game.send(msg)}
            onFlag={msg => game.send(msg)}
        />
    </div>
}


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
            if (this.playing) {
                this.openCell(msg.pos, msg.cell)
            }
            else {
                this.start(msg.pos, msg.cell)
            }
        } else if (msg.type === 'flag') {
            this.setFlag(msg.cell)
        }
    }

    private start(pos: Pos, root: GameCell) {
        this._playing = true
        this.genBombs(pos)
        this.openSpace(pos, root)
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

    private async openSpace(pos: Pos, root: GameCell) {
        if (root.hasFlag) return
        if (root.hasBomb) return //todo
        root.open = true
        let cells = new Map<Pos, Direction | null>([[pos, null]])
        let next = new Map<Pos, Direction | null>()
        do {
            for (const [p, dire] of cells) {
                p.forRoundWithDire(this.size, d => !Direction.same(d, dire), (p, dir) => {
                    const cell = this.grid[p.index(this.size)]
                    if (cell.open || cell.hasFlag) return
                    cell.open = true
                    if (cell.num == 0 && !cell.hasBomb) {
                        next.set(p, Direction.rev(dir))
                    }
                })
            }
            cells.clear();
            [cells, next] = [next, cells]
            // this.update()
            // await delay(16)
        } while (cells.size)
    }

    private async openCell(pos: Pos, root: GameCell) {
        if (root.open) return
        if (root.hasFlag) return
        if (root.hasBomb) return //todo
        if (root.num == 0) return this.openSpace(pos, root)
        root.open = true
        this.update()
    }

    private setFlag(root: GameCell) {
        if (root.open) return
        root.hasFlag = !root.hasFlag
        this.update()
    }
}

export const GameStateContext = createContext<GameState>(null!)
export function useGame() {
    return useContext(GameStateContext)
}

export class GameCell {
    constructor(public pos: Pos) { }
    hasBomb = false
    hasFlag = false
    open = false
    num = 0
}

export type GameMsg =
    | { type: 'open', pos: Pos, cell: GameCell }
    | { type: 'flag', cell: GameCell }

export type GameMsgOf<M extends GameMsg['type']> = Extract<GameMsg, { type: M }>
