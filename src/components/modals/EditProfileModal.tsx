import React, { useEffect, PropsWithChildren } from "react";
import { useRecoilState } from "recoil";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/clientApp";
import { modalControllerAtom } from "../../atoms/modalControllerAtom";
import Modal from "../basic/Modal";
import { Dialog } from "@headlessui/react";

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
		<Modal {...{ handleClose, open }}>
			<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
				<div className="flex items-center justify-center">
					<div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
						<Dialog.Title
							as="h1"
							className="text-xl text-center font-bold font-medium text-gray-900"
						>
							Edit Profile
						</Dialog.Title>
						{children}
					</div>
				</div>
			</div>
		</Modal>
	);
};
export default EditProfileModal;
