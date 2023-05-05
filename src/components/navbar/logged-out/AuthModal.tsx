import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { useAuthState } from "react-firebase-hooks/auth";

import AuthPanels from "./AuthPanels";
import { auth } from "../../../firebase/clientApp";
import { modalControllerAtom } from "../../../atoms/modalControllerAtom";
import { ModalViews } from "../../../types/misc";
import Modal from "../../basic/Modal";
import { calculateAuthModalTitle } from "../../../helpers";

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
		<Modal title={calculateAuthModalTitle(view)} {...{ open, handleClose }}>
			<AuthPanels {...{ handleSwitch }} />
		</Modal>
	);
};
export default AuthModal;
