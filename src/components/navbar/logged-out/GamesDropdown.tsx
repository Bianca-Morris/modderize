import React from "react";
import { Menu } from "@headlessui/react";
import Dropdown from "../../basic/Dropdown";
import { classNames } from "../../../helpers";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useRecoilState, useRecoilValue } from "recoil";

import { gameModalState as globalGameModalState } from "../../../atoms/gameModalAtom";
import Link from "next/link";
import { gameState } from "../../../atoms/gamesAtom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";
import { HeartIcon } from "@heroicons/react/20/solid";

type GamesDropdownProps = {};

const GamesDropdown: React.FC<GamesDropdownProps> = () => {
	const active = null;

	const [user] = useAuthState(auth);

	const [gameModalState, setGameModalState] =
		useRecoilState(globalGameModalState);

	const mySnippets = useRecoilValue(gameState).mySnippets;

	const anyFavoriteGames = mySnippets.length > 0;

	return (
		<Dropdown
			btnCls="uppercase inline-flex text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
			title="Games"
		>
			{user && (
				<>
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
							Create New Game
						</a>
					</Menu.Item>

					<hr />
				</>
			)}
			<div className="text-gray-700 px-4 pt-4 pb-2 text-sm">
				{user ? (
					<span className="flex items-center">
						<HeartIcon className="w-3 h-3 mr-3" />
						My Favorite Games
					</span>
				) : (
					"Games"
				)}
			</div>

			{mySnippets.map((snippet) => {
				const { gameID, gameName } = snippet;
				return (
					<Menu.Item>
						<Link
							className={classNames(
								active
									? "bg-gray-200 text-gray-900"
									: "text-gray-700 hover:bg-gray-100",
								"block px-4 py-2 text-sm cursor-pointer font-normal capitalize"
							)}
							href={`/games/${gameID}`}
						>
							{gameName}
						</Link>
					</Menu.Item>
				);
			})}

			{user && !anyFavoriteGames && (
				<div className="text-gray-400 px-4 py-4 font-normal capitalize text-xs">
					No favorite games yet!
				</div>
			)}
			<hr />

			<Menu.Item>
				<Link
					className={classNames(
						active
							? "bg-gray-200 text-gray-900"
							: "text-gray-700 hover:bg-gray-100",
						"block px-4 py-2 text-sm cursor-pointer font-normal capitalize"
					)}
					href={`/search?type=games`}
				>
					View All Games
				</Link>
			</Menu.Item>
		</Dropdown>
	);
};
export default GamesDropdown;
