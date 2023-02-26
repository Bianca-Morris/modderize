import { Timestamp } from "@firebase/firestore";

export interface Game {
    id: string;
    creatorId: string;
    displayName: string;
    numberOfPlayers: number;
    createdAt?: Timestamp;
    imageURL?: string;
}

export interface ModRequest {
    id: string;
    title: string;
    description: string;
    likes: Number;
    dislikes: Number;
    requesterId: string;
    modderId?: string;
    gameId: string;
    completionStatus: "pending modder" | "accepted" | "in progress" | "complete" | "archived";
    createdAt?: Timestamp;
    lastModified?: Timestamp;
    imageURL?: string;
}