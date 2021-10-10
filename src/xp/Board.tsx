import './Board.scss'
import { BoardProps } from '../common/Board'
import Bar from './Bar'
import Cell from './Cell'
import { rangeTo, rangeToEq, seq } from 'libsugar'
import { useState } from 'react'
import { useEventListener, useMount } from 'ahooks'
import { GameCell } from '../Game'

export default function Board({ size, grid, onRestart, onMsg }: BoardProps) {
    const [first, setFirst] = useState(true)
    useMount(() => setFirst(false))

    const [data] = useState(() => ({
        buttons: 0,
        cell: null as GameCell | null,
        cell2dom: new Map<GameCell, HTMLDivElement>(),
        dom2cell: new WeakMap<HTMLDivElement, GameCell>(),
    }))

    useEventListener('mouseup', e => {
        console.log('up', e, e.buttons, data.buttons)
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
    })

    return <div className={`board flex flex-col xp`}>
        {first ? <div className='preload'>
            {seq(rangeTo(8)).map(i => <div className={`c${i + 1}`} key={i}></div>)}
            {seq(rangeToEq(9)).map(i => <div className={`n${i}`} key={i}></div>)}
        </div> : null}

        <Bar onRestart={onRestart} />
        <div className="grid" style={{ gridTemplateColumns: `repeat(${size.width}, 1fr)`, gridTemplateRows: `repeat(${size.height}, 1fr)` }}
            onMouseDown={e => {
                data.buttons = e.buttons
                data.cell = data.dom2cell.get(e.target as HTMLDivElement) ?? null
                console.log('down', e, data.cell)
            }}
        >
            {grid.map(i => <Cell ref={dom => {
                if (dom == null) return
                data.cell2dom.set(i, dom)
                data.dom2cell.set(dom, i)
            }} key={i.pos.str} cell={i} />)}
        </div>
    </div>
}
