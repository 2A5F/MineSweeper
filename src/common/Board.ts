import { GameCell, GameMsgOf } from "../Gamex";
import { Size } from "../size";

export interface BoardProps {
    size: Size
    grid: GameCell[]
    onRestart: () => void
    onOpen: (msg: GameMsgOf<'open'>) => void
    onFlag: (msg: GameMsgOf<'flag'>) => void
}