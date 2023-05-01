/**
 * Page for viewing all of the mod requests for a particular game
 */
import { doc, getDoc } from "@firebase/firestore";
import { GetServerSidePropsContext } from "next";
import { Head } from "next/document";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../../firebase/clientApp";
import safeJsonStringify from "safe-json-stringify";
import { useAuthState } from "react-firebase-hooks/auth";

import { Game } from "../../../types/docTypes";
import Button from "../../../components/basic/Button";
import SimpleHeader from "../../../components/general/SimpleHeader";
import { HeartIcon, PlusIcon, WrenchIcon } from "@heroicons/react/20/solid";
import ModRequest from "../../../components/general/ModRequest";
import useGameData from "../../../hooks/useGameData";
import { useRouter } from "next/router";
import ContentBody from "../../../components/layout/ContentBody";
import GameModRequests from "../../../components/general/GameModRequests";
import { useSetRecoilState } from "recoil";
import { gameState } from "../../../atoms/gamesAtom";
import useModRequests from "../../../hooks/useModRequests";

type GamePageProps = {
	gameData: Game;
};

const GamePage: React.FC<GamePageProps> = ({ gameData }) => {
	console.log("gameData", gameData);
	if (!gameData) {
		return (
			<div className="flex min-h-screen flex-col item-center justify-start pb-2">
				<SimpleHeader>
					<div className="flex text-center text-3xl">
						<h1>Error: Game Not Found</h1>
					</div>
				</SimpleHeader>
				<div className="w-full flex mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 gap-16">
					<div className="py-6">
						<h1 className="text-xl font-bold font-medium text-gray-900 mb-3">
							Sorry!
						</h1>
						<h2>This game doesn't seem to be on Modderize.</h2>
						<p>
							Check the spelling of the ID or&nbsp;
							<a
								className="underline text-gray-500"
								href="/browse"
							>
								Browse by Game
							</a>
							.
						</p>
						<Button type="button" variant="gray" cls="mt-3">
							Request a Game
						</Button>
					</div>
				</div>
			</div>
		);
	}

	const [modRequestCount, setModRequestCount] = useState(0);
	const [user] = useAuthState(auth);
	const setGameStateValue = useSetRecoilState(gameState);

	const { modRequestStateValue } = useModRequests();
	const { modRequests: currModRequests = [] } = modRequestStateValue;

	const router = useRouter();
	const { id: gameID, displayName, numberOfPlayers, imageURL } = gameData;
	const {
		gameStateValue,
		onToggleGameFavoriteStatus,
		loading,
		getModRequestsForGameCount
	} = useGameData();

	const isGameFavorited = !!gameStateValue.favoriteGames.find(
		(item) => item.gameID === gameID
	);

	const onClickCreateNewModRequest = () => {
		const { gameID } = router.query;
		router.push(`/games/${gameID}/requestMod`);
	};

	// On page load
	useEffect(() => {
		// Set the current game to this one in recoil state
		setGameStateValue((prev) => ({
			...prev,
			currentGame: gameData
		}));

		// Grab the count of game mods available for this game and store in state
		getModRequestsForGameCount(gameID)
			.then((count) => {
				setModRequestCount(count);
			})
			.catch((err) => {
				console.log(
					`Error getting count of mods for ${displayName}: `,
					err
				);
			});
	}, []);

	return (
		<ContentBody innerCls="flex-col-reverse lg:flex-row px-10">
			<>
				<SimpleHeader>
					<div className="flex flex-col md:flex-row justify-between gap-3 md:gap-0">
						<div className="flex flex-col text-3xl">
							<h1>{displayName}</h1>
							{user && !isGameFavorited && (
								<Button
									type="button"
									variant="gray"
									cls="mt-3"
									onClick={() =>
										onToggleGameFavoriteStatus(
											gameData,
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
											gameData,
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
					<GameModRequests {...{ gameData }} userID={user?.uid} />
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

					{currModRequests.length > 0 && (
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
					)}

					{/* <div>
						<h3 className="text-xl font-bold bg-gray-200 p-4">
							Most Active Modders
						</h3>
						<div className="border border-gray-200 p-4">
							<ol
								type="1"
								className="flex flex-col gap-2 list-decimal ml-4 text-medium"
							>
								<li>
									<a href="">User #1</a>
								</li>
								<li>
									<a href="">User #2</a>
								</li>
								<li>
									<a href="">User #3</a>
								</li>
								<li>
									<a href="">User #4</a>
								</li>
								<li>
									<a href="">User #5</a>
								</li>
							</ol>
						</div>
					</div> */}
				</div>
			</>
		</ContentBody>
	);
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const { query: { gameID = "" } = {} } = context || {};

	try {
		// Grab document for this game
		const gameDocRef = doc(db, "games", gameID as string);
		const gameDoc = await getDoc(gameDocRef);

		return {
			props: {
				gameData: gameDoc.exists()
					? JSON.parse(
							safeJsonStringify({
								id: gameDoc.id,
								...gameDoc.data()
							})
					  )
					: null
			}
		};
	} catch (error) {
		// TODO: Create error page
		console.error("/games/<id> getServerSideProps error", error);
		return null;
	}
}

export default GamePage;
