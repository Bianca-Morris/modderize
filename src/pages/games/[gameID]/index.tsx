import React, { useEffect, useState } from "react";
import { doc } from "@firebase/firestore";
import { GetServerSidePropsContext } from "next";
import { auth, db } from "../../../firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { collection, orderBy, query, where } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { HeartIcon, PlusIcon, WrenchIcon } from "@heroicons/react/20/solid";

import { Game } from "../../../types/docTypes";
import Button from "../../../components/basic/Button";
import SimpleHeader from "../../../components/general/SimpleHeader";
import useGameData from "../../../hooks/useGameData";

import ContentBody from "../../../components/layout/ContentBody";
import GameNotFoundPage from "../../../components/pages/GameNotFound";
import {
	gameConverter,
	modRequestConverter
} from "../../../firebase/converters";
import ModRequestList from "../../../components/general/ModRequestList";
import useFavoriteGames from "../../../hooks/useFavoriteGames";

type GamePageProps = {
	gameID: string;
};

/**
 * Page for viewing all of the mod requests for a particular game
 */
const GamePage: React.FC<GamePageProps> = ({ gameID }) => {
	const router = useRouter();
	const [modRequestCount, setModRequestCount] = useState(0);
	const { onToggleGameFavoriteStatus, loading, getModRequestsForGameCount } =
		useGameData();

	const collectionRef = collection(db, "games").withConverter(gameConverter);
	const gameDocRef = doc(collectionRef, gameID);

	const [gameData, gameLoading, gameError] = useDocumentData(gameDocRef);
	const { favoriteGames = [] } = useFavoriteGames();

	// On page load
	useEffect(() => {
		// Grab the count of game mods available for this game and store in state
		getModRequestsForGameCount(gameID)
			.then((count) => {
				setModRequestCount(count);
			})
			.catch((err) => {
				console.error(
					`Error getting count of mods for ${displayName}: `,
					err
				);
			});
	}, [gameID]);

	if (!gameID) {
		return <GameNotFoundPage />;
	}

	const [user] = useAuthState(auth);

	const { displayName, numberOfPlayers, imageURL } = gameData || {};

	const isGameFavorited = !!favoriteGames.find(
		(item) => item.gameID === gameID
	);

	const onClickCreateNewModRequest = () => {
		const { gameID } = router.query;
		router.push(`/games/${gameID}/requestMod`);
	};

	return (
		<ContentBody innerCls="flex-col-reverse lg:flex-row px-10">
			<>
				<SimpleHeader>
					<div className="flex flex-col md:flex-row justify-between gap-3 md:gap-0">
						<div className="flex flex-col text-3xl">
							<h1>{gameLoading ? "" : displayName}</h1>
							{user && !isGameFavorited && (
								<Button
									type="button"
									variant="gray"
									cls="mt-3"
									onClick={() =>
										onToggleGameFavoriteStatus(
											gameData as Game,
											isGameFavorited
										)
									}
									loading={loading}
								>
									<HeartIcon className="w-5 h-5 mr-3" />
									Favorite This Game
								</Button>
							)}
							{user && isGameFavorited && (
								<Button
									type="button"
									variant="grayOutline2"
									cls="mt-3"
									onClick={() =>
										onToggleGameFavoriteStatus(
											gameData as Game,
											isGameFavorited
										)
									}
									loading={loading}
								>
									<HeartIcon className="w-5 h-5 mr-3" />
									Un-Favorite This Game
								</Button>
							)}
						</div>
						<div className="flex items-center">
							{user && (
								<Button
									type="button"
									variant="violet"
									cls="max-h-10 w-100 "
									onClick={onClickCreateNewModRequest}
								>
									<PlusIcon className="w-5 h-5 mr-3" />
									Open New Mod Request
								</Button>
							)}
						</div>
					</div>
				</SimpleHeader>
			</>
			<>
				<div className="flex flex-col flex-auto mt-10">
					<h2 className="text-2xl font-bold mb-4">
						Newest Mod Requests
					</h2>
					{!gameLoading && (
						<ModRequestList
							query={query(
								collection(db, "modRequests").withConverter(
									modRequestConverter
								),
								where("gameID", "==", gameID),
								orderBy("creationDate", "desc")
							)}
						/>
					)}
				</div>

				<div className="flex flex-1 flex-col mt-10 gap-2">
					<div className="flex flex-col gap-0">
						{imageURL && (
							<div className="flex justify-center mb-3">
								<img
									src={imageURL}
									alt={displayName + " Cover Image"}
									className="w-52 h-52 rounded"
								/>
							</div>
						)}
						<h3 className="text-xl font-bold bg-gray-200 p-4">
							Game Info
						</h3>
						<div className="border border-gray-200 p-4">
							<div className="flex w-full items-center justify-center">
								<HeartIcon className="w-4 h-4 mr-2" />
								<strong className="inline-block">
									Favorites:
								</strong>
								<span className="ml-2">{numberOfPlayers}</span>
							</div>
							<div className="flex w-full items-center justify-center">
								<WrenchIcon className="w-4 h-4 mr-2" />
								<strong className="inline-block">
									Total Mod Count:
								</strong>
								<span className="ml-2">{modRequestCount}</span>
							</div>
						</div>
					</div>

					{/* {currModRequests.length > 0 && (
						<Button
							type="button"
							variant="violet"
							cls="mt-4"
							onClick={() =>
								router.push(
									`/search?type=modRequests&gameID=${gameID}`
								)
							}
						>
							View All Mods for {displayName}
						</Button>
					)} */}
				</div>
			</>
		</ContentBody>
	);
};

export function getServerSideProps(context: GetServerSidePropsContext) {
	const { query: { gameID = "" } = {} } = context || {};
	return { props: { gameID } };
}

export default GamePage;
