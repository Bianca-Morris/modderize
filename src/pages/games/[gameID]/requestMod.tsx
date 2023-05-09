import React from "react";

import { doc } from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";

import H1 from "../../../components/basic/typography/H1";
import H3 from "../../../components/basic/typography/H3";
import NewGameModRequestForm from "../../../components/forms/NewGameModRequestForm";
import SimpleHeader from "../../../components/general/SimpleHeader";
import ContentBody from "../../../components/layout/ContentBody";
import GameNotFoundPage from "../../../errors/GameNotFound";
import { auth, db } from "../../../firebase/clientApp";
import ModEditPageLayout from "../../../components/layout/ModEditPageLayout";
import NotAuthenticated from "../../../errors/NotAuthenticated";
import { gameConverter } from "../../../firebase/converters";
import ErrorPage from "../../../errors/ErrorPage";

/**
 * Will be page for creating a mod request
 */
type RequestModPageProps = { gameID: string };

const RequestModPage: React.FC<RequestModPageProps> = ({ gameID }) => {
	const [user] = useAuthState(auth);

	const gameDocRef = doc(db, "games", gameID || "placeholder").withConverter(
		gameConverter
	);

	const [gameData, loading, error, snapshot] = useDocumentData(gameDocRef);
	const { displayName: gameDisplayName = "", imageURL = "" } = gameData || {};

	if (!loading && !gameData) {
		return <GameNotFoundPage />;
	} else if (!loading && !user) {
		return <NotAuthenticated />;
	} else if (error) {
		return (
			<ErrorPage
				header1="Error: Something went wrong!"
				header2="Sorry!"
				header3={error.message}
			/>
		);
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
						specific creator, go to their profile and click
						&quot;Request Mod&quot;.
					</p>
				</>
				<>
					{user && gameDisplayName && (
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

	return {
		props: {
			gameID
		}
	};
}

export default RequestModPage;
