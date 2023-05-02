import { atom } from "recoil";
import { Game } from "../types/docTypes";

interface GameState {
    allGames?: Game[];
}

const defaultGameState: GameState = {}

export const gameState = atom<GameState>({
    key: 'gameState',
    default: defaultGameState
})