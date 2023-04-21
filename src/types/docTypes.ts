import { DocumentData, Timestamp } from "@firebase/firestore";

export interface Game extends DocumentData {
    id: string;
    creatorId: string;
    displayName: string;
    numberOfPlayers: number;
    createdAt?: Timestamp;
    imageURL?: string;
}

export type ModRequest = {
    id?: string;    // ID gets populated by firebase
    
    gameID: string;
    gameDisplayName?: string;

    title: string;
    description: string;
    creationDate: Timestamp;

    requesterID: string;
    requesterDisplayName: string;

    lastModified: Timestamp;
    completionStatus: "pending modder" | "in progress" | "complete" | "archived";

    modderStatus: "requested" | "accepted" | "open";
    modderID?: string;

    voteStatus: number;

    imageURL?: string;
}