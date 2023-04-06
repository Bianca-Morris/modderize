import type { GetServerSidePropsContext, NextPage } from "next";
import Head from "next/head";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/clientApp";

import CardsSearchResult_Modder from "https://framer.com/m/Cards-SearchResult-Modder-Ziap.js@EuFW80XbgjhlwQZxAi0n";
import FeaturesJumbotronWithButtons from "https://framer.com/m/Features-JumbotronWithButtons-U3un.js@Nt1jyKYpPeYLViU5bfrE";
import ContentBody from "../components/layout/ContentBody";
import SimpleHeader from "../components/general/SimpleHeader";
import {
	collection,
	doc,
	getDoc,
	getDocs,
	limit,
	orderBy,
	query
} from "firebase/firestore";
import safeJsonStringify from "safe-json-stringify";
import { Game, ModRequest as ModRequestType } from "../types/docTypes";
import GameCard from "../components/general/GameCard";
import Button from "../components/basic/Button";
import ModRequestShort from "../components/general/ModRequest";
import useModRequests from "../hooks/useModRequests";
import ModRequest from "../components/general/ModRequest";
import Link from "next/link";
import Jumbotron from "../components/basic/Jumbotron";
import { useRouter } from "next/router";

type HomePageProps = {
	topGames: Game[];
	topMods: ModRequestType[];
	newestMods: ModRequestType[];
};

const Home: React.FC<HomePageProps> = ({ topGames, topMods, newestMods }) => {
	const [user, loadingUser] = useAuthState(auth);
	const { uid: userID } = user || {};

	const router = useRouter();

	const { onVote, onDeleteModRequest, onSelectModRequest } = useModRequests();

	console.log("topGames", topGames);
	console.log("topMods", topMods);
	console.log("newestMods", newestMods);

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
					<div className="flex gap-5">
						<Button variant="blue" cls="flex-1">
							Request a Mod
						</Button>
						<Button
							variant="indigo"
							cls="flex-1"
							onClick={() =>
								router.push(
									`/search?type=modRequests&completionStatus=pending%20modder`
								)
							}
						>
							Fulfill a Request
						</Button>
					</div>
				</div>
			</Jumbotron>
			<div className="w-full flex mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 gap-16">
				<div className="py-16 w-full">
					<h2 className="text-2xl font-bold font-medium text-gray-900 mb-3 ml-4">
						Top Games
					</h2>
					<div className="w-full flex gap-5 my-5 items-center align-center justify-center">
						{topGames.map((game) => (
							<GameCard
								{...game}
								cls="flex flex-1 flex-col text-center justify-center items-center"
							/>
						))}
					</div>
				</div>
			</div>
			<hr />
			<div className="w-full flex mx-auto py-16 max-w-7xl px-2 sm:px-6 lg:px-8 gap-16">
				<div className="flex-1">
					<h2 className="text-2xl font-bold font-medium text-gray-900 mb-3 ml-4">
						Most Recent Mods
					</h2>
					<div className="w-full flex flex-col gap-5 my-5 items-center align-center justify-center">
						{newestMods.map((mr) => {
							const {
								id,
								title,
								requesterID,
								gameID,
								gameDisplayName
							} = mr;
							return (
								<ModRequest
									key={id}
									{...{
										title,
										onVote,
										onDeleteModRequest,
										onSelectModRequest
									}}
									modRequest={mr}
									subTitle={
										<div>
											<span className="font-medium mr-1">
												<Link href={`/games/${gameID}`}>
													{gameDisplayName}
												</Link>
											</span>
										</div>
									}
									userIsCreator={requesterID === userID}
									userVoteValue={undefined}
									cls="w-full"
								/>
							);
						})}
					</div>
				</div>
				<div className="flex-1">
					<h2 className="text-2xl font-bold font-medium text-gray-900 mb-3 ml-4">
						Most Popular Mods
					</h2>
					<div className="w-full flex flex-col gap-5 my-5 items-center align-center justify-center">
						{topMods.map((mr) => {
							const {
								id,
								title,
								requesterID,
								gameID,
								gameDisplayName
							} = mr;
							return (
								<ModRequest
									key={id}
									{...{
										title,
										onVote,
										onDeleteModRequest,
										onSelectModRequest
									}}
									modRequest={mr}
									subTitle={
										<div>
											<span className="font-medium mr-1">
												<Link href={`/games/${gameID}`}>
													{gameDisplayName}
												</Link>
											</span>
										</div>
									}
									userIsCreator={requesterID === userID}
									userVoteValue={undefined}
									cls="w-full"
								/>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
	try {
		// Grab top five games for the home page (sorted by number of players)
		const gameColl = collection(firestore, "games");
		const gameQ = query(
			gameColl,
			orderBy("numberOfPlayers", "desc"),
			limit(5)
		);
		const gameDocs = await getDocs(gameQ);

		// Parse for props obj
		const top4Games = gameDocs.docs.map((doc) =>
			JSON.parse(
				safeJsonStringify({
					id: doc.id,
					...doc.data()
				})
			)
		);

		const requestsColl = collection(firestore, "modRequests");

		// Grab top 5 mod requests
		const top5Q = query(
			requestsColl,
			orderBy("voteStatus", "desc"),
			limit(5)
		);
		const top5ModDocs = await getDocs(top5Q);

		// Parse for props obj
		const top5Mods = top5ModDocs.docs.map((doc) =>
			JSON.parse(
				safeJsonStringify({
					id: doc.id,
					...doc.data()
				})
			)
		);

		// Grab newest 5 mod requests
		const new5Q = query(
			requestsColl,
			orderBy("creationDate", "desc"),
			limit(5)
		);
		const new5ModDocs = await getDocs(new5Q);

		// Parse for props obj
		const new5Mods = new5ModDocs.docs.map((doc) =>
			JSON.parse(
				safeJsonStringify({
					id: doc.id,
					...doc.data()
				})
			)
		);

		return {
			props: {
				topGames: !gameDocs.empty ? top4Games : null,
				topMods: !top5ModDocs.empty ? top5Mods : null,
				newestMods: !new5ModDocs.empty ? new5Mods : null
			}
		};
	} catch (error) {
		// TODO: Create error page
		console.error("/index getServerSideProps error", error);
		return null;
	}
}

export default Home;
