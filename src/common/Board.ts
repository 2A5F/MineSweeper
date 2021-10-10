import { GameCell, GameMsg } from "../Game";
import { Size } from "../size";

export interface BoardProps {
    size: Size
    grid: GameCell[]
    onRestart: () => void
    onMsg: (msg: GameMsg) => void
    won: boolean
    dead: boolean
    last: number
    startTime: Date | null
    endTime: Date | null
}
