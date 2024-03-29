import React, { useEffect, useState } from "react";
import { doc, limit } from "@firebase/firestore";
import { GetServerSidePropsContext } from "next";
import { auth } from "../../../firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import Image from "next/image";
import { orderBy, query, where } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import {
	HeartIcon,
	PlusIcon,
	ShareIcon,
	WrenchIcon
} from "@heroicons/react/20/solid";

import { Game } from "../../../types/docTypes";
import Button from "../../../components/basic/Button";
import SimpleHeader from "../../../components/general/SimpleHeader";
import useGameData from "../../../hooks/useGameData";

import ContentBody from "../../../components/layout/ContentBody";
import GameNotFoundPage from "../../../errors/GameNotFound";
import {
	gameConverter,
	modRequestConverter
} from "../../../firebase/converters";
import ModRequestList from "../../../components/general/ModRequestList";
import useFavoriteGames from "../../../hooks/useFavoriteGames";
import { gamesCol, modRequestsCol } from "../../../firebase/collections";
import H1 from "../../../components/basic/typography/H1";
import H2 from "../../../components/basic/typography/H2";
import H3 from "../../../components/basic/typography/H3";
import SharePopover from "../../../components/general/SharePopover";
import A from "../../../components/basic/A";
import ModRequestLoader from "../../../components/general/ModRequestLoader";

type GamePageProps = {
	gameID: string;
};

/**
 * Page for viewing all of the mod requests for a particular game
 */
const GamePage: React.FC<GamePageProps> = ({ gameID }) => {
	const [user] = useAuthState(auth);

	const router = useRouter();
	const [modRequestCount, setModRequestCount] = useState(0);
	const { onToggleGameFavoriteStatus, loading, getModRequestsForGameCount } =
		useGameData();

	const collectionRef = gamesCol.withConverter(gameConverter);
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

	if (!gameData && !gameLoading) {
		return <GameNotFoundPage />;
	}

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
							<H1>{gameLoading ? "Loading..." : displayName}</H1>
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
									Open Mod Request
								</Button>
							)}
						</div>
					</div>
				</SimpleHeader>
			</>
			<>
				<div className="flex flex-col flex-auto mt-10">
					<H2 cls="mb-4">Newest Mod Requests</H2>
					{!gameLoading && (
						<ModRequestList
							query={query(
								modRequestsCol.withConverter(
									modRequestConverter
								),
								where("gameID", "==", gameID),
								orderBy("creationDate", "desc"),
								limit(10)
							)}
						/>
					)}
					{gameLoading && (
						<div className="flex flex-col gap-3 w-full">
							<ModRequestLoader />
						</div>
					)}
					<A
						variant="violet"
						cls="mt-5"
						href={`/requests?gameID=${gameID}`}
					>
						View All Mod Requests for {displayName}
					</A>
				</div>

				<div className="flex flex-1 flex-col mt-10 gap-2">
					<div className="flex flex-col gap-0">
						{!imageURL && gameLoading && (
							<div className="flex justify-center mb-3">
								<div className="w-52 h-52 rounded animate-pulse bg-gray-100" />
							</div>
						)}
						{imageURL && (
							<div className="flex justify-center mb-3">
								<Image
									width={208}
									height={208}
									src={imageURL}
									alt={displayName + " Cover Image"}
									className="w-52 h-52 rounded"
								/>
							</div>
						)}
						<H3 cls="bg-gray-200 p-4">Game Info</H3>
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
						<div className="flex justify-center mt-5">
							<SharePopover
								url={`www.modderize.me/games/${gameID}`}
							>
								<ShareIcon className="h-8 w-8 cursor-pointer hover:fill-indigo-300" />
							</SharePopover>
						</div>
					</div>
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
