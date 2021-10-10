import { GameCell, GameMsg } from "../Game";
import { Size } from "../size";

export interface BoardProps {
    size: Size
    grid: GameCell[]
    onRestart: () => void
    onMsg: (msg: GameMsg) => void
}