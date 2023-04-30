import { DocumentData, DocumentReference, Timestamp } from "@firebase/firestore";
import { User } from "firebase/auth";

export interface UserDoc extends User {
    isAdmin: boolean;
    isActiveModder: boolean;
    about: string;
    donationLink: string;
}

export interface Game extends DocumentData {
    id: string;
    creatorId: string;
    displayName: string;
    numberOfPlayers: number;
    createdAt?: Timestamp;
    imageURL?: string;
    docRef?: DocumentReference;
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
    docRef?: DocumentReference;
}