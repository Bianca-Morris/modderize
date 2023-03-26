import { atom } from "recoil";
import { Timestamp } from "@firebase/firestore";
import { ModRequest } from "../types/docTypes";

interface ModRequestState {
    selectedModRequest: ModRequest | null;
    modRequests: ModRequest[];
    // votes
}

const defaultModRequestState = {
    selectedModRequest: null,
    modRequests: []
}

export const modRequestState = atom<ModRequestState>({
    key: "modRequestState",
    default: defaultModRequestState
});