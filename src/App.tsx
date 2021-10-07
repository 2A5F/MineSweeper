import { useUpdate } from 'ahooks'
import { useState } from 'react'
import './App.scss'
import Board from './Board'
import { GameState, GameStateContext } from './game'

export default function App() {
  const update = useUpdate()
  const game = useState(() => new GameState(update))[0]

  return <GameStateContext.Provider value={game}>
    <Board theme='xp' />
  </GameStateContext.Provider>
}
