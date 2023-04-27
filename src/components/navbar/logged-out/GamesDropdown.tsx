import React, { useEffect, useState } from "react";
import { Menu } from "@headlessui/react";
import { HeartIcon } from "@heroicons/react/20/solid";
import { useRecoilValue } from "recoil";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";

import { gameState } from "../../../atoms/gamesAtom";
import { auth } from "../../../firebase/clientApp";
import Dropdown from "../../basic/Dropdown";
import { classNames } from "../../../helpers";
import CreateNewGameButton from "./CreateNewGameButton";
import useGameData from "../../../hooks/useGameData";
import { Game } from "../../../types/docTypes";

type GamesDropdownProps = {};

const GamesDropdown: React.FC<GamesDropdownProps> = () => {
	const [games, setGames] = useState<Game[]>([]);
	const active = null;
	const { loading, getDropdownGames } = useGameData();

	const [user] = useAuthState(auth);

	const { favoriteGames = [] } = useRecoilValue(gameState);
	const anyFavoriteGames = favoriteGames.length > 0;

	// On load, fetch a bunch of the games, if they aren't already present
	useEffect(() => {
		if (!user && !loading && games.length === 0) {
			// Grab a list of all of the games
			getDropdownGames().then((arr: Game[]) => setGames(arr));
		}
	}, [user, loading]);

	return (
		<Dropdown
			btnCls="uppercase inline-flex text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
			title="Games"
		>
			{user && (
				<>
					<Menu.Item>
						<div>
							{/** Div only exists to avoid forwardRef warning */}
							<CreateNewGameButton />
						</div>
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

			{favoriteGames.map((snippet) => {
				const { gameID, gameName } = snippet;
				return (
					<Menu.Item key={gameID}>
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

			{!user &&
				games.map((game) => {
					const { id: gameID, displayName: gameName } = game;
					return (
						<Menu.Item key={gameID}>
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
					href={`/games`}
				>
					View All Games
				</Link>
			</Menu.Item>
		</Dropdown>
	);
};
export default GamesDropdown;
