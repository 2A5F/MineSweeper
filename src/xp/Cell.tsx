import './Cell.scss'
import { GameCell } from '../Game';
import { clazs } from '../utils';
import { ForwardedRef, forwardRef } from 'react';

export default forwardRef(function Cell({ cell, won, dead }: {
    cell: GameCell
    won: boolean
    dead: boolean
}, ref: ForwardedRef<HTMLDivElement>) {
    return <div
        ref={ref}
        className={`cell${clazs({
            open: cell.open || cell.preview || cell.boom || (dead && ((!cell.hasBomb && cell.hasFlag) || (cell.hasBomb && !cell.hasFlag))),
            bomb: (cell.open || won || dead) && cell.hasBomb,
            flag: cell.hasFlag || (won && cell.hasBomb),
            boom: cell.boom,
        }, cell.open && !cell.hasBomb && cell.num ? `n-${cell.num}` : null)}`}
        {...{ pos: cell.pos.str } as any}
    ></div>
})
