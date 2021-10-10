import './Cell.scss'
import { GameCell } from '../Game';
import { clazs } from '../utils';
import { ForwardedRef, forwardRef } from 'react';

export default forwardRef(function Cell({ cell }: {
    cell: GameCell
}, ref: ForwardedRef<HTMLDivElement>) {
    return <div
        ref={ref}
        className={`cell${clazs({
            open: cell.open || cell.preview,
            bomb: cell.open && cell.hasBomb,
            flag: cell.hasFlag,
        }, cell.open && !cell.hasBomb && cell.num ? `n-${cell.num}` : null)}`}
        {...{ pos: cell.pos.str } as any}
    ></div>
})
