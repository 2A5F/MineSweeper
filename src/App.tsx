import { useUpdate } from 'ahooks'
import { useState } from 'react'
import './App.scss'
import Game, { GameState, GameStateContext } from './Gamex'

export default function App() {
  const update = useUpdate()
  const game = useState(() => new GameState(update))[0]

  return <GameStateContext.Provider value={game}>
    <Game theme='xp' />
  </GameStateContext.Provider>
}
