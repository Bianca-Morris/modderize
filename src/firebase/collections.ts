import { collection } from "firebase/firestore";
import { db } from "./clientApp";

export const modRequestsCol = collection(db, "modRequests");
export const usersCol = collection(db, "users");
export const gamesCol = collection(db, "games");
