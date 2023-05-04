import { atom } from "recoil";
import { Game } from "../types/docTypes";

interface GameState {
    allGames?: Game[];
}

const defaultGameState: GameState = {}

export const gameAtom = atom<GameState>({
    key: 'gameAtom',
    default: defaultGameState
})