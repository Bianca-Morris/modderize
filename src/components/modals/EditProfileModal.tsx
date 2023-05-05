import React, { useEffect, PropsWithChildren } from "react";
import { useRecoilState } from "recoil";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/clientApp";
import { modalControllerAtom } from "../../atoms/modalControllerAtom";
import Modal from "../basic/Modal";

const EditProfileModal: React.FC<PropsWithChildren> = ({ children }) => {
	const [modalState, setModalState] = useRecoilState(modalControllerAtom);
	const [user, loading] = useAuthState(auth);

	const { profileEditModalOpen: open } = modalState;

	const handleClose = () => {
		setModalState((prev) => ({
			...prev,
			profileEditModalOpen: false
		}));
	};

	// When user is not loaded, close the modal
	useEffect(() => {
		if (!user) handleClose();
	}, [user]);

	// Don't display if user isn't ready
	if (!user || loading) {
		return null;
	}

	return (
		<Modal title="Edit Profile" {...{ handleClose, open }}>
			{children}
		</Modal>
	);
};
export default EditProfileModal;
