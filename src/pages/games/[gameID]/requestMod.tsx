import { doc, getDoc } from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import safeJsonStringify from "safe-json-stringify";
import Button from "../../../components/basic/Button";
import Input from "../../../components/basic/Input";
import Textarea from "../../../components/basic/Textarea";
import NewGameModRequestForm from "../../../components/forms/NewGameModRequestForm";
import SimpleHeader from "../../../components/general/SimpleHeader";
import ContentBody from "../../../components/layout/ContentBody";
import GameNotFoundPage from "../../../components/pages/GameNotFound";
import { auth, firestore } from "../../../firebase/clientApp";
import { Game, ModRequest } from "../../../types/docTypes";

/**
 * Will be page for creating a mod request
 */
type RequestModPageProps = { gameData: Game };

const RequestModPage: React.FC<RequestModPageProps> = ({ gameData }) => {
	console.log("requestmodpage gameData", gameData);
	if (!gameData) {
		return <GameNotFoundPage />;
	}

	const { id: gameID, displayName: gameDisplayName } = gameData;

	const [user] = useAuthState(auth);

	return (
		<ContentBody>
			<>
				<SimpleHeader>
					<div className="flex justify-center">
						<div className="flex flex-col text-3xl">
							<h1>Create New Mod Request</h1>
						</div>
					</div>
				</SimpleHeader>
			</>
			<>
				<div className="mt-10">
					<div className="md:grid md:grid-cols-3 md:gap-6">
						<div className="md:col-span-1">
							<div className="px-4 sm:px-0">
								<h3 className="text-base font-semibold leading-6 text-gray-900">
									{gameDisplayName}
								</h3>
								<p className="mt-1 text-sm text-gray-600">
									This mod request will be open to the
									entire&nbsp;
									{gameDisplayName} community. To request a
									mod from a specific creator, go to their
									profile and click "Request Mod".
								</p>
							</div>
						</div>
						<div className="mt-5 md:col-span-2 md:mt-0">
							{user && (
								<NewGameModRequestForm
									{...{ user, gameID, gameDisplayName }}
								/>
							)}
						</div>
					</div>
				</div>
			</>
		</ContentBody>
	);
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const { query: { gameID = "" } = {} } = context || {};

	try {
		// Grab document for this game
		const gameDocRef = doc(firestore, "games", gameID as string);
		const gameDoc = await getDoc(gameDocRef);

		console.log("requestMod gameDoc", gameDoc);

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
		console.error("/games/<id>/requestMod getServerSideProps error", error);
		return null;
	}
}

export default RequestModPage;
