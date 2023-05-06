import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { useAuthState } from "react-firebase-hooks/auth";

import AuthPanels from "./AuthPanels";
import { auth } from "../../../firebase/clientApp";
import { modalControllerAtom } from "../../../atoms/modalControllerAtom";
import { ModalViews } from "../../../types/misc";
import Modal from "../../basic/Modal";
import { calculateAuthModalTitle } from "../../../helpers";
import { Dialog } from "@headlessui/react";

const AuthModal: React.FC = () => {
	const [modalState, setModalState] = useRecoilState(modalControllerAtom);
	const [user, loading, error] = useAuthState(auth);

	const { authModalOpen: open, authModalView: view } = modalState;

	const handleClose = () => {
		setModalState((prev) => ({
			...prev,
			authModalOpen: false
		}));
	};

	const handleSwitch = (
		e: React.MouseEvent<Element, MouseEvent>,
		newView: ModalViews
	) => {
		setModalState((prev) => ({
			...prev,
			authModalOpen: true,
			authModalView: newView
		}));
	};

	// When user is loaded, close the modal
	useEffect(() => {
		if (user) handleClose();
	}, [user]);

	return (
		<Modal {...{ open, handleClose }}>
			<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
				<div className="flex items-center justify-center">
					<div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
						<Dialog.Title
							as="h1"
							className="text-xl text-center font-bold font-medium text-gray-900"
						>
							{calculateAuthModalTitle(view)}
						</Dialog.Title>
						<AuthPanels {...{ handleSwitch }} />
					</div>
				</div>
			</div>
		</Modal>
	);
};
export default AuthModal;
