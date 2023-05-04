import React, { useCallback } from "react";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import type { GetServerSidePropsContext } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import safeJsonStringify from "safe-json-stringify";

import { auth, db } from "../firebase/clientApp";

import SimpleHeader from "../components/general/SimpleHeader";
import { Game, ModRequest as ModRequestType } from "../types/docTypes";
import GameCard from "../components/general/GameCard";
import Button from "../components/basic/Button";
import ModRequest from "../components/general/ModRequest";
import Jumbotron from "../components/basic/Jumbotron";
import { modRequestConverter } from "../helpers/converters";
import ModRequestList from "../components/general/ModRequestList";

type HomePageProps = {
	topGames: Game[];
};

const Home: React.FC<HomePageProps> = ({ topGames = [] }) => {
	const [user] = useAuthState(auth);

	const router = useRouter();

	const requestsColl = collection(db, "modRequests").withConverter(
		modRequestConverter
	);

	// Grab top 5 mod requests
	const top5Q = query(requestsColl, orderBy("voteStatus", "desc"), limit(5));

	// Grab newest 5 mod requests
	const new5Q = query(
		requestsColl,
		orderBy("creationDate", "desc"),
		limit(5)
	);

	const subtitleRenderFx = useCallback(
		(mr: ModRequestType) => mr.gameDisplayName || "",
		[]
	);

	return (
		<div className="flex min-h-screen flex-col item-center justify-start pb-2">
			{user && (
				<SimpleHeader>
					<div className="flex w-100 xjustify-between">
						<div className="flex flex-col text-3xl">
							<h1>Welcome, {user.displayName}!</h1>
						</div>
					</div>
				</SimpleHeader>
			)}
			<Jumbotron title="Your Wildest Dreams Come True">
				<div className="flex-1 flex flex-col bg-white rounded p-5 gap-5">
					<div>
						Modderize is making it easier than ever to create,
						share, and consume the mod content your gaming community
						wants to see. Request from your favorite creators or
						build the feature a fellow gamer has been dreaming of.
					</div>
					<div className="flex flex-col md:flex-row gap-5">
						<Button
							variant="blue"
							cls="flex-1"
							onClick={() => router.push(`/games`)}
						>
							Request a Mod
						</Button>
						<Button
							variant="indigo"
							cls="flex-1"
							onClick={() => router.push(`/requests`)}
						>
							Fulfill a Request
						</Button>
					</div>
				</div>
			</Jumbotron>
			<div className="w-full flex mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 gap-16">
				<div className="py-16 w-full">
					<div className="flex justify-between">
						<h2 className="text-2xl font-bold font-medium text-gray-900 mb-3 ml-4">
							Top Games
						</h2>
						<Link
							href="/games"
							className="text-md text-violet-800 underline mr-4"
						>
							View All
						</Link>
					</div>

					<div className="lg:w-full flex flex-wrap gap-5 my-5 items-center align-center justify-center">
						{topGames.map((game) => (
							<GameCard
								{...game}
								key={game.id}
								cls="flex flex-1 flex-col text-center justify-center items-center"
							/>
						))}
					</div>
				</div>
			</div>
			<hr />
			<div className="w-full flex flex-col lg:flex-row mx-auto py-16 max-w-7xl px-2 sm:px-6 lg:px-8 gap-16">
				<div className="flex-1">
					<h2 className="text-2xl font-bold font-medium text-gray-900 mb-3 ml-4">
						New Mod Requests
					</h2>
					<div className="w-full flex flex-col gap-5 my-5 items-center align-center justify-center">
						<ModRequestList
							query={new5Q}
							{...{ subtitleRenderFx }}
						/>
					</div>
				</div>
				<div className="flex-1">
					<h2 className="text-2xl font-bold font-medium text-gray-900 mb-3 ml-4">
						Popular Mod Requests
					</h2>
					<div className="w-full flex flex-col gap-5 my-5 items-center align-center justify-center">
						<ModRequestList
							query={top5Q}
							{...{ subtitleRenderFx }}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
	try {
		// Grab top five games for the home page (sorted by number of players)
		const gameColl = collection(db, "games");
		const gameQ = query(
			gameColl,
			orderBy("numberOfPlayers", "desc"),
			limit(5)
		);
		const gameDocs = await getDocs(gameQ);

		// Parse for props obj
		const top5Games = gameDocs.docs.map((doc) =>
			JSON.parse(
				safeJsonStringify({
					id: doc.id,
					...doc.data()
				})
			)
		);

		return {
			props: {
				topGames: !gameDocs.empty ? top5Games : []
			}
		};
	} catch (error) {
		// TODO: Create error page
		console.error("/index getServerSideProps error", error);
		return null;
	}
}

export default Home;
