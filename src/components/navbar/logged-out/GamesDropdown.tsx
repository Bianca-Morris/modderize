import React from "react";
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
import { useRouter } from "next/router";
import useUserDoc from "../../../hooks/useUserDoc";

type GamesDropdownProps = {};

const GamesDropdown: React.FC<GamesDropdownProps> = () => {
	const router = useRouter();
	const slashGamesActive = router.asPath === "/games";
	const gamePageActive = router.asPath.startsWith("/games");

	const [user] = useAuthState(auth);
	const { userDoc } = useUserDoc();

	const gameStateValue = useRecoilValue(gameState);
	const { favoriteGames = [], allGames = [] } = gameStateValue;

	const anyFavoriteGames = favoriteGames.length > 0;

	return (
		<Dropdown
			btnCls={classNames(
				gamePageActive
					? "bg-gray-900 text-white"
					: "text-gray-300 hover:bg-gray-700 hover:text-white",
				"uppercase inline-flex px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
			)}
			title="Games"
		>
			{user &&
				userDoc &&
				userDoc.isAdmin && ( // Show only when logged in as admin user
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

			{!!user &&
				favoriteGames.map((snippet) => {
					const { gameID, gameName } = snippet;
					const thisGameActive = router.asPath === `/games/${gameID}`;
					return (
						<Menu.Item key={gameID}>
							<Link
								className={classNames(
									thisGameActive
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

			{!user && (
				<>
					{allGames.slice(0, 6).map((game) => {
						const { id: gameID, displayName: gameName } = game;

						const thisGameActive =
							router.asPath === `/games/${gameID}`;
						return (
							<Menu.Item key={gameID}>
								<Link
									className={classNames(
										thisGameActive
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
					<div className="text-gray-400 text-xs font-normal px-4 py-2">
						(+ {allGames.length - 5} more)
					</div>
				</>
			)}

			{user && !anyFavoriteGames && (
				<div className="text-gray-400 px-4 py-4 font-normal capitalize text-xs">
					No favorite games yet!
				</div>
			)}
			<hr />

			<Menu.Item>
				<Link
					className={classNames(
						slashGamesActive
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
