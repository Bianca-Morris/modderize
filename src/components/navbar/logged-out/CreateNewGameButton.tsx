import React from "react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { classNames } from "../../../helpers";
import { useSetRecoilState } from "recoil";

import { modalControllerState } from "../../../atoms/modalControllerAtom";

const CreateNewGameButton: React.FC = () => {
	// This button should not appear for non-admin users
	const setGameModalState = useSetRecoilState(modalControllerState);

	return (
		<a
			className={classNames(
				"text-gray-700 hover:bg-gray-100",
				"inline-flex items-center w-full px-4 py-2 text-sm cursor-pointer"
			)}
			onClick={() =>
				setGameModalState((prev) => ({
					...prev,
					gameCreationModalOpen: true
				}))
			}
		>
			<PlusCircleIcon className="h-5 w-5 mr-2" aria-hidden="true" />
			Create New Game
		</a>
	);
};
export default CreateNewGameButton;
