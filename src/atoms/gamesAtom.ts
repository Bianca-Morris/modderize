import { atom } from "recoil";
import { Game } from "../types/docTypes";

/**
 * Make accessible snippet data about the user's followed games
 */

export interface GameSnippet {
    gameID: string;
	gameName: string;
}

interface GameState {
    favoriteGames: GameSnippet[];
    currentGame?: Game;
    allGames?: Game[];
}

const defaultGameState: GameState = {
    favoriteGames: []
}

export const gameState = atom<GameState>({
    key: 'gameState',
    default: defaultGameState
})