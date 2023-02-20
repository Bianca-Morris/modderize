import { atom } from "recoil";

export interface GameModalState {
    open: boolean;
}

const defaultModalState: GameModalState = {
    open: false,
}

export const gameModalState = atom<GameModalState>({
    key: "gameModalState",
    default: defaultModalState
})