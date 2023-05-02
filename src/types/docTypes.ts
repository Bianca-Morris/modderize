import { DocumentData, DocumentReference, Timestamp } from "@firebase/firestore";
import { User } from "firebase/auth";

export interface UserDoc extends User {
    isAdmin: boolean;
    isActiveModder: boolean;
    about: string;
    donationLink: string;
    likedPostIDs: string[];
}

export interface Game extends DocumentData {
    id: string;
    creatorId: string;
    displayName: string;
    numberOfPlayers: number; // Number of users that "favorite" the game
    createdAt?: Timestamp;
    imageURL?: string;
    docRef?: DocumentReference;
}

export interface ModRequestSansID extends DocumentData {    
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

export interface ModRequest extends ModRequestSansID {
    id: string;  // ID gets populated by firebase
}

export interface GameSnippet {
    gameID: string;
	gameName: string;
}