import './Board.scss'
import { BoardProps } from '../common/Board'
import Bar from './Bar'
import Cell from './Cell'

export default function Board({ size, grid, onRestart, onOpen, onFlag }: BoardProps) {
    return <div className={`board flex flex-col xp`}>
        <Bar onRestart={onRestart} />
        <div className="grid" style={{ gridTemplateColumns: `repeat(${size.width}, 1fr)`, gridTemplateRows: `repeat(${size.height}, 1fr)` }}>
            {grid.map(i => <Cell key={i.pos.str} cell={i}
                onOpen={() => onOpen({ type: 'open', pos: i.pos, cell: i })}
                onFlag={() => onFlag({ type: 'flag', cell: i })}
            />)}
        </div>
    </div>
}
