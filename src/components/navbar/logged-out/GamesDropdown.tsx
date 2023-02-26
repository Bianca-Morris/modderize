import React from "react";
import { Menu } from "@headlessui/react";
import Dropdown from "../../basic/Dropdown";
import { classNames } from "../../../helpers";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useRecoilState } from "recoil";

import { gameModalState as globalGameModalState } from "../../../atoms/gameModalAtom";

type GamesDropdownProps = {};

const GamesDropdown: React.FC<GamesDropdownProps> = () => {
	const active = null;

	const [gameModalState, setGameModalState] =
		useRecoilState(globalGameModalState);

	return (
		<Dropdown
			btnCls="uppercase inline-flex text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
			title="Games"
		>
			<Menu.Item>
				{/** TODO: Restrict this button to only appear when logged in as admin */}
				<a
					className={classNames(
						active
							? "bg-gray-200 text-gray-900"
							: "text-gray-700 hover:bg-gray-100",
						"inline-flex items-center w-full px-4 py-2 text-sm cursor-pointer"
					)}
					onClick={() => setGameModalState({ open: true })}
				>
					<PlusCircleIcon
						className="h-5 w-5 mr-2"
						aria-hidden="true"
					/>
					Add New Game
				</a>
			</Menu.Item>
			<hr />
			<Menu.Item>
				<a
					className={classNames(
						active
							? "bg-gray-200 text-gray-900"
							: "text-gray-700 hover:bg-gray-100",
						"block px-4 py-2 text-sm cursor-pointer"
					)}
					href="/games/TheSims4"
				>
					The Sims 4
				</a>
			</Menu.Item>
		</Dropdown>
	);
};
export default GamesDropdown;
