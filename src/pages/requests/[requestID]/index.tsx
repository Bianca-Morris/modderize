/**
 * Page for viewing all of the mod requests for a particular game
 */
import { doc, getDoc } from "@firebase/firestore";
import { GetServerSidePropsContext } from "next";
import { Head } from "next/document";
import React from "react";
import { firestore } from "../../../firebase/clientApp";
import safeJsonStringify from "safe-json-stringify";

import { ModRequest as ModRequestType } from "../../../types/docTypes";
import Button from "../../../components/basic/Button";
import SimpleHeader from "../../../components/general/SimpleHeader";
import {
	HandThumbDownIcon,
	HandThumbUpIcon,
	HeartIcon,
	PlusIcon,
	WrenchIcon
} from "@heroicons/react/20/solid";
import CardsSearchResult_Modder from "https://framer.com/m/Cards-SearchResult-Modder-Ziap.js@EuFW80XbgjhlwQZxAi0n";
import ModRequest from "../../../components/general/ModRequest";

type ModRequestPageProps = {
	modRequestData?: ModRequestType;
};

const ModRequestPage: React.FC<ModRequestPageProps> = ({ modRequestData }) => {
	console.log("modRequestData", modRequestData);
	// if (!modRequestData) {
	// 	return (
	// 		<div className="flex min-h-screen flex-col item-center justify-center py-2">
	// 			<SimpleHeader>
	// 				<div className="flex text-center text-3xl">
	// 					<h1>Error: Game Not Found</h1>
	// 				</div>
	// 			</SimpleHeader>
	// 			<div>
	// 				<h1>Sorry!</h1>
	// 				<h2>This mod request doesn't seem to exist.</h2>
	// 				<p>
	// 					Browse Mod Requests
	// 					<a href="/browse">Browse by Game</a>.
	// 				</p>
	// 				<Button type="button" variant="gray">
	// 					Request a Game
	// 				</Button>
	// 			</div>
	// 		</div>
	// 	);
	// }

	const { id: gameID } = modRequestData || {};

	return (
		<div className="flex min-h-screen flex-col items-center justify-start pb-2">
			<SimpleHeader>
				<div className="flex text-center flex-col text-2xl">
					<h1>Mod Request</h1>
				</div>
			</SimpleHeader>
			<div className="w-full flex-col mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 gap-16">
				<div className="flex w-full justify-between py-4">
					<div>
						<h2 className="text-3xl font-bold mb-4">
							Newest Mod Requests
						</h2>
						<div>
							<strong>Requested By:</strong>
							<span className="ml-1">{`{username}`}</span>
						</div>
						<div>
							<strong>Game:</strong>
							<span className="ml-1">{`{gameDisplayTitle}`}</span>
						</div>
					</div>
					<div className="flex align-center">
						<div className="flex flex-col justify-center p-3 w-20">
							<div className="flex justify-start align-center text-green-600">
								<HandThumbUpIcon className="w-4 h-4 ml-1 mt-1 mr-2" />
								3
							</div>
							<div className="flex justify-start align-center text-red-600">
								<HandThumbDownIcon className="w-4 h-4 mt-1 ml-1 mr-2" />
								0
							</div>
						</div>
					</div>
				</div>
				<hr />
				<div className="flex flex-auto mt-10">
					<div className="flex flex-col gap-3">
						<div>
							<strong>Status:</strong>
							<span className="ml-1">{`{PENDING}`}</span>
						</div>
						<div>
							<strong>Date Requested:</strong>
							<span className="ml-1">{`{January 3rd, 2022}`}</span>
						</div>
						<div>
							<strong>Mod Descrtiption:</strong>
							<div></div>
						</div>
						<p>
							Ea quis exercitationem id nobis veniam ex aspernatur
							optio sit quis exercitationem eum incidunt aliquid.
							Sed ipsam quia ex aliquid saepe non corporis
							internos et rerum recusandae qui cupiditate natus
							aut itaque ipsum sed inventore ratione. Ut ipsa
							nulla aut voluptate reprehenderit qui explicabo
							consequatur ut placeat voluptas et fugiat aperiam ex
							odit magni eos odit fugit! Sed sapiente nisi et
							reiciendis itaque vel provident neque.
						</p>
						<p>
							Eum sunt nesciunt est fugit necessitatibus eum animi
							similique. Et doloremque corrupti est quia
							recusandae eos voluptatem perferendis et
							voluptatibus delectus vel internos repudiandae aut
							veritatis obcaecati ad iste suscipit. Eos doloribus
							provident rem omnis consequatur rem soluta pariatur
							aut placeat doloremque. Et consectetur maxime ab
							Quis neque et vero galisum et vitae molestiae.
						</p>
					</div>
					<div>
						<CardsSearchResult_Modder />
					</div>
				</div>

				<div className="flex flex-col flex-auto my-5">
					<h3 className="text-xl font-bold p-4">
						Most Recent Mod Requests for "{`{gameDisplayTitle}`}"
					</h3>
					<div className="flex">
						<div className="flex flex-col w-full">
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
						</div>
						<div className="flex flex-col w-full">
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
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const { query: { gameID = "" } = {} } = context || {};

	// try {
	// 	// Grab document for this game
	// 	const gameDocRef = doc(firestore, "games", gameID as string);
	// 	const gameDoc = await getDoc(gameDocRef);

	// 	return {
	// 		props: {
	// 			modRequestData: gameDoc.exists()
	// 				? JSON.parse(
	// 						safeJsonStringify({
	// 							id: gameDoc.id,
	// 							...gameDoc.data()
	// 						})
	// 				  )
	// 				: null
	// 		}
	// 	};
	// } catch (error) {
	// 	// TODO: Create error page
	// 	console.error("/games/<id> getServerSideProps error", error);
	// 	return null;
	// }

	return { props: {} };
}

export default ModRequestPage;
