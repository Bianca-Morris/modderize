import { atom } from "recoil";
import { UserDoc } from "../types/docTypes";

/**
 * Make globally accessible data about the current user
 */

interface UserDocState {
    currentUserDoc?: UserDoc;
}

const defaultUserDocState: UserDocState = {
    currentUserDoc: undefined
}

export const userDocAtom = atom<UserDocState>({
    key: 'userDocState',
    default: defaultUserDocState
})