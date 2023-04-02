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
    mySnippets: GameSnippet[];
    currentGame?: Game;
    // viewedGames
}

const defaultGameState: GameState = {
    mySnippets: []
}

export const gameState = atom<GameState>({
    key: 'gameState',
    default: defaultGameState
})