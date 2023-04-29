import { atom } from "recoil";

export interface ProfileEditModalState {
    open: boolean;
}

const defaultModalState: ProfileEditModalState = {
    open: false,
}

export const profileEditModalState = atom<ProfileEditModalState>({
    key: "profileEditModalState",
    default: defaultModalState
})