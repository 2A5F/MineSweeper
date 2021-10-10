import './Board.scss'
import { BoardProps } from '../common/Board'
import Bar, { Face } from './Bar'
import Cell from './Cell'
import { rangeTo, rangeToEq, seq } from 'libsugar'
import { useState } from 'react'
import { useEventListener, useMount, useUpdate } from 'ahooks'
import { GameCell } from '../Game'
import { clazs } from '../utils'

export default function Board({ size, grid, onRestart, onMsg, won, dead, last, startTime, endTime }: BoardProps) {
    const [first, setFirst] = useState(true)
    useMount(() => setFirst(false))

    const update = useUpdate()

    const [data] = useState(() => ({
        buttons: 0,
        cell: null as GameCell | null,
        cell2dom: new Map<GameCell, HTMLElement>(),
        dom2cell: new WeakMap<HTMLElement, GameCell>(),
    }))

    useEventListener('mousedown', e => {
        data.buttons = e.buttons
        update()
        switch (data.buttons) {
            case 3:
            case 4:
                const cell = data.dom2cell.get(e.target as HTMLElement) ?? null
                if (cell != null) {
                    data.cell = cell
                    onMsg({ type: 'preview', pos: cell.pos, cell })
                }
                break;
        }
    })
    useEventListener('mouseup', () => {
        const cell = data.cell
        if (cell != null) {
            switch (data.buttons) {
                case 1:
                    onMsg({ type: 'open', pos: cell.pos, cell })
                    break
                case 2:
                    onMsg({ type: 'flag', cell })
                    break
                case 3:
                case 4:
                    onMsg({ type: 'round', pos: cell.pos, cell })
                    break;
            }
        }
        data.buttons = 0
        update()
    })
    useEventListener('mousemove', e => {
        switch (data.buttons) {
            case 3:
            case 4:
                const cell = data.dom2cell.get(e.target as HTMLElement) ?? null
                if (cell != null) {
                    data.cell = cell
                    onMsg({ type: 'preview', pos: cell.pos, cell })
                }
                break;
        }
    })

    const face: Face = won ? 'won' : dead ? 'dead' : data.buttons != 0 ? 'click' : 'normal'

    return <div className={`board flex flex-col xp${clazs({ won, dead })}`}>
        {first ? <div className='preload'>
            {seq(rangeTo(3)).map(i => <div className={`b${i + 1}`} key={`b${i + 1}`}></div>)}
            {seq(rangeTo(4)).map(i => <div className={`f${i + 1}`} key={`f${i + 1}`}></div>)}
            {seq(rangeTo(8)).map(i => <div className={`c${i + 1}`} key={`c${i + 1}`}></div>)}
            {seq(rangeToEq(9)).map(i => <div className={`n${i}`} key={`n${i}`}></div>)}
        </div> : null}

        <Bar onRestart={onRestart} face={face} last={last} startTime={startTime} endTime={endTime} />
        <div className="grid" style={{ gridTemplateColumns: `repeat(${size.width}, 1fr)`, gridTemplateRows: `repeat(${size.height}, 1fr)` }}
            onMouseDown={e => {
                data.cell = data.dom2cell.get(e.target as HTMLElement) ?? null
            }}
        >
            {grid.map(i => <Cell ref={dom => {
                if (dom == null) return
                data.cell2dom.set(i, dom)
                data.dom2cell.set(dom, i)
            }} key={i.pos.str} cell={i} won={won} dead={dead} />)}
        </div>
    </div>
}
