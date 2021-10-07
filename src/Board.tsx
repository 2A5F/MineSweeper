import { useUpdate } from 'ahooks';
import { seq } from 'libsugar';
import { useEffect, useMemo, useState } from 'react';
import './Board.scss'
import { GameCell, GameState, GameStateContext, useGame } from './game';
import { Cell as XpCell, Bar as XpBar } from './xp'

export default function Board({ theme }: { theme: 'xp' }) {
    const game = useGame()

    const Cell = useMemo(() => {
        switch (theme) {
            case 'xp':
            default: return XpCell
        }
    }, [theme])
    const Bar = useMemo(() => {
        switch (theme) {
            case 'xp':
            default: return XpBar
        }
    }, [theme])

    return <div className={`board flex place-self-center flex-col ${theme}`} >
        <Bar onRestart={() => {
            game.restart()
        }} />
        <div className="grid" style={{ gridTemplateColumns: `repeat(${game.size.width}, 1fr)`, gridTemplateRows: `repeat(${game.size.height}, 1fr)` }}>
            {game.grid.map(i => <Cell key={i.pos.str} cell={i} onClick={e => {
                if (e.button == 0) game.send({ type: 'open', pos: i.pos, cell: i })
            }} />)}
        </div>
    </div>
}
