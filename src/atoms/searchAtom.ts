import { atom } from "recoil";
import { Game } from "../types/docTypes";

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

interface SearchState {
    docType: "game" | "modRequest" | "user";
    games: Game[];  // Store a list of games in state, so don't have to re-query
    sort: SortDataGame | SortDataModRequest;

}

const defaultSearchState: SearchState = {
    docType: "game",
    games: [],
    sort: {
        sortField: "displayName",
        sortValue: "desc"
    },
}

export const searchState = atom<SearchState>({
    key: 'searchState',
    default: defaultSearchState
})