import { User } from "firebase/auth";
import { atom } from "recoil";
import { Game, ModRequest } from "../types/docTypes";

export interface SearchableDocTypes {
    docType: "games" | "modRequests" | "users";
}

interface SortDataGame {
    sortField: "displayName" | "numberOfPlayers",
    sortValue: "asc" | "desc";
}

interface SortDataModRequest {
    sortField: "title" | "creationDate" | "lastModified" | "voteStatus";
    sortValue: "asc" | "desc";
}

// interface SortDataUser {
//     sortField: "",
//     sortValue: "asc" | "desc";
// }

interface SearchState extends SearchableDocTypes {
    games: Game[];  // Store a list of games in state, so don't have to re-query for dropdown filter
    sort: SortDataGame | SortDataModRequest;
    results: Game[] | ModRequest[] | User[];
}

const defaultSearchState: SearchState = {
    docType: "games",
    games: [],
    sort: {
        sortField: "displayName",
        sortValue: "desc"
    },
    results: []
}

export const searchState = atom<SearchState>({
    key: 'searchState',
    default: defaultSearchState
})