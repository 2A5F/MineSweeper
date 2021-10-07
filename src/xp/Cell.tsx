import './Cell.scss'
import { GameCell } from '../game';
import { clazs } from '../utils';

export default function Cell({ cell, onClick }: { cell: GameCell, onClick: React.MouseEventHandler<HTMLDivElement> }) {
    return <div className={`cell${clazs({ open: cell.open, bomb: cell.hasBomb && cell.open }, cell.open && !cell.hasBomb && cell.num ? `n-${cell.num}` : null)}`} {...{ pos: cell.pos.str } as any}
        onClick={onClick}
    ></div>
}
