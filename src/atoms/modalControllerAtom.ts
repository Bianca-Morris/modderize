import { atom } from "recoil";
import { ModalViews } from "../types/misc";

export interface ModalControllerState {
	profileEditModalOpen: boolean;
	gameCreationModalOpen: boolean;
	authModalOpen: boolean;
	authModalView: ModalViews;
}

const defaultModalState: ModalControllerState = {
	profileEditModalOpen: false,
	gameCreationModalOpen: false,
	authModalOpen: false,
	authModalView: "login"
};

export const modalControllerAtom = atom<ModalControllerState>({
	key: "modalControllerAtom",
	default: defaultModalState
});
