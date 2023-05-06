import React from "react";
import { useRecoilState } from "recoil";

import { modalControllerAtom } from "../../../atoms/modalControllerAtom";
import Modal from "../../basic/Modal";
import AddGameForm from "../../forms/AddGameForm";

const AddGameModal: React.FC = () => {
	const [modalState, setModalState] = useRecoilState(modalControllerAtom);

	const { gameCreationModalOpen: open } = modalState;

	const handleClose = () => {
		setModalState((prev) => ({
			...prev,
			gameCreationModalOpen: false
		}));
	};

	return (
		<Modal {...{ open, handleClose }}>
			<AddGameForm {...{ handleClose }} />
		</Modal>
	);
};
export default AddGameModal;
