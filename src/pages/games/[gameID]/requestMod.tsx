import { doc, getDoc } from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import React from "react";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import safeJsonStringify from "safe-json-stringify";
import H1 from "../../../components/basic/typography/H1";
import H3 from "../../../components/basic/typography/H3";
import NewGameModRequestForm from "../../../components/forms/NewGameModRequestForm";
import SimpleHeader from "../../../components/general/SimpleHeader";
import ContentBody from "../../../components/layout/ContentBody";
import GameNotFoundPage from "../../../components/pages/GameNotFound";
import { auth, db } from "../../../firebase/clientApp";
import { Game } from "../../../types/docTypes";
import ModEditPageLayout from "../../../components/layout/ModEditPageLayout";
import NotAuthenticated from "../../../errors/NotAuthenticated";

/**
 * Will be page for creating a mod request
 */
type RequestModPageProps = { gameData: Game };

const RequestModPage: React.FC<RequestModPageProps> = ({ gameData }) => {
	const { id: gameID, displayName: gameDisplayName, imageURL } = gameData;

	const [user] = useAuthState(auth);

	if (!gameData) {
		return <GameNotFoundPage />;
	} else if (!user) {
		return <NotAuthenticated />;
	}

	return (
		<ContentBody>
			<>
				<SimpleHeader>
					<div className="flex justify-center">
						<div className="flex flex-col text-3xl">
							<H1>Create New Mod Request</H1>
						</div>
					</div>
				</SimpleHeader>
			</>

			<ModEditPageLayout>
				<>
					{imageURL && (
						<Image
							width={208}
							height={208}
							className="rounded-md m-auto mb-5"
							src={imageURL}
							alt={gameDisplayName + " Poster"}
						></Image>
					)}
					<H3 cls="leading-6 text-gray-900 text-center">
						{gameDisplayName}
					</H3>
					<p className="mt-1 text-sm text-gray-600">
						This mod request will be open to the entire&nbsp;
						{gameDisplayName} community. To request a mod from a
						specific creator, go to their profile and click "Request
						Mod".
					</p>
				</>
				<>
					{user && (
						<NewGameModRequestForm
							{...{
								user,
								gameID,
								gameDisplayName
							}}
						/>
					)}
				</>
			</ModEditPageLayout>
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
		console.error("/games/<id>/requestMod getServerSideProps error", error);
		return null;
	}
}

export default RequestModPage;
