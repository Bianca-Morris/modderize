/**
 * Page for viewing all of the mod requests for a particular game
 */
import { doc, getDoc } from "@firebase/firestore";
import { GetServerSidePropsContext } from "next";
import { Head } from "next/document";
import React from "react";
import { firestore } from "../../../firebase/clientApp";
import safeJsonStringify from "safe-json-stringify";

import { Game } from "../../../types/docTypes";
import Button from "../../../components/basic/Button";
import SimpleHeader from "../../../components/general/SimpleHeader";
import { HeartIcon, PlusIcon, WrenchIcon } from "@heroicons/react/20/solid";
import ModRequest from "../../../components/general/ModRequest";

type GamePageProps = {
	gameData: Game;
};

const GamePage: React.FC<GamePageProps> = ({ gameData }) => {
	console.log("gameData", gameData);
	if (!gameData) {
		return (
			<div className="flex min-h-screen flex-col item-center justify-center py-2">
				<SimpleHeader>
					<div className="flex text-center text-3xl">
						<h1>Error: Game Not Found</h1>
					</div>
				</SimpleHeader>
				<div>
					<h1>Sorry!</h1>
					<h2>This game doesn't seem to be on Modderize.</h2>
					<p>
						Check the spelling of the ID or{" "}
						<a href="/browse">Browse by Game</a>.
					</p>
					<Button type="button" variant="gray">
						Request a Game
					</Button>
				</div>
			</div>
		);
	}

	const { id: gameID, displayName, numberOfPlayers } = gameData;

	return (
		<div className="flex min-h-screen flex-col items-center justify-start pb-2">
			<SimpleHeader>
				<div className="flex justify-between">
					<div className="flex text-center flex-col text-3xl">
						<h1>{displayName}</h1>
						<Button type="button" variant="gray" cls="mt-3">
							<HeartIcon className="w-5 h-5 mr-3" />
							Favorite This Game
						</Button>
					</div>
					<div className="flex items-center">
						<Button type="button" variant="violet" cls="max-h-10">
							<PlusIcon className="w-5 h-5 mr-3" />
							Open New Mod Request
						</Button>
					</div>
				</div>
			</SimpleHeader>
			<div className="w-full flex mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 gap-16">
				<div className="flex flex-col flex-auto mt-10">
					<h2 className="text-2xl font-bold mb-4">
						Newest Mod Requests
					</h2>
					<div className="flex flex-col gap-3">
						<ModRequest
							numUpvotes={1}
							numDownvotes={0}
							title="A Very Hardcore Difficulty Mod"
							subTitle={
								<div>
									<span className="font-medium mr-1">
										Requested By:
									</span>
									CoolGirl54
								</div>
							}
						/>
						<ModRequest
							numUpvotes={0}
							numDownvotes={0}
							title="Another Exciting Mod"
							subTitle={
								<div>
									<span className="font-medium mr-1">
										Requested By:
									</span>
									SomeoneOnTheInterwebz
								</div>
							}
						/>
						<ModRequest
							numUpvotes={4}
							numDownvotes={1}
							title="Something To Make My Game More Fun"
							subTitle={
								<div>
									<span className="font-medium mr-1">
										Requested By:
									</span>
									FancyBoi222
								</div>
							}
						/>
						<ModRequest
							numUpvotes={12}
							numDownvotes={1}
							title="Mo Vampires, Mo Problems"
							subTitle={
								<div>
									<span className="font-medium mr-1">
										Requested By:
									</span>
									VaMpIreL@d
								</div>
							}
						/>
						<Button type="button" variant="violet" cls="mt-4">
							View All Mods for {displayName}
						</Button>
					</div>
				</div>

				<div className="flex flex-1 flex-col mt-10 gap-3">
					<div className="flex flex-1 flex-col gap-0">
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
								<span className="ml-2">4</span>
							</div>
						</div>
					</div>

					<div>
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
					</div>
				</div>
			</div>
		</div>
	);
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const { query: { gameID = "" } = {} } = context || {};

	try {
		// Grab document for this game
		const gameDocRef = doc(firestore, "games", gameID as string);
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
