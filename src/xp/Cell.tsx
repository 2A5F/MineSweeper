import './Cell.scss'
import { GameCell } from '../Gamex';
import { clazs } from '../utils';

export default function Cell({ cell, onOpen, onFlag }: {
    cell: GameCell
    onOpen: React.MouseEventHandler<HTMLDivElement>
    onFlag: React.MouseEventHandler<HTMLDivElement>
}) {
    return <div className={`cell${clazs({ open: cell.open, bomb: cell.open && cell.hasBomb, flag: cell.hasFlag }, cell.open && !cell.hasBomb && cell.num ? `n-${cell.num}` : null)}`} {...{ pos: cell.pos.str } as any}
        onClick={onOpen}
        onContextMenu={onFlag}
    ></div>
}
