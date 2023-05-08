import { doc, DocumentReference } from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import Image from "next/image";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { useRecoilValue } from "recoil";
import { gameAtom } from "../../../atoms/gamesAtom";
import H1 from "../../../components/basic/typography/H1";
import H3 from "../../../components/basic/typography/H3";
import SimpleHeader from "../../../components/general/SimpleHeader";
import ContentBody from "../../../components/layout/ContentBody";
import ModEditPageLayout from "../../../components/layout/ModEditPageLayout";
import { auth } from "../../../firebase/clientApp";
import { modRequestsCol } from "../../../firebase/collections";
import { Game, ModRequest } from "../../../types/docTypes";
import CompleteModRequestForm from "../../../components/forms/CompleteModRequestForm";
import { modRequestConverter } from "../../../firebase/converters";
import ErrorPage from "../../../errors/ErrorPage";

type EditAsRequesteeProps = {
	requestID: string;
};

const EditAsRequestee: React.FC<EditAsRequesteeProps> = ({ requestID }) => {
	const [user] = useAuthState(auth);

	const requestDocRef = doc(modRequestsCol, requestID).withConverter(
		modRequestConverter
	) as DocumentReference<ModRequest>;
	const [data, loading, error, snapshot] = useDocumentDataOnce(requestDocRef);
	const { gameID, gameDisplayName } = data || {};

	const gameState = useRecoilValue(gameAtom);
	const { allGames = [] } = gameState;

	if (!user) {
		return (
			<ErrorPage
				header1="Error: Not Authenticated"
				header2="Sorry!"
				header3="You cannot edit mod requests if you are not logged in."
			/>
		);
	} else if (!loading && user.uid !== data?.modderID) {
		return (
			<ErrorPage
				header1="Error: Not Authorized"
				header2={"Sorry!"}
				header3="You do not have permission to use this interface."
			/>
		);
	} else if (error) {
		return (
			<ErrorPage
				header1="Error: Something went wrong!"
				header2="Sorry!"
				header3="We're not sure what happened."
				paragraph={"Admin code: " + error.message}
			/>
		);
	}

	let currGame: Game | undefined;
	for (let i = 0; i < allGames.length; i++) {
		if (gameID === allGames[i].id) {
			currGame = allGames[i];
			break;
		}
	}

	const currUserIsModder = user.uid === data?.modderID;

	return (
		<ContentBody>
			<>
				<SimpleHeader>
					<div className="flex justify-center">
						<div className="flex flex-col text-3xl">
							<H1>Complete Mod Request</H1>
						</div>
					</div>
				</SimpleHeader>
			</>

			<ModEditPageLayout>
				<>
					{currGame?.imageURL && (
						<Image
							width={208}
							height={208}
							className="rounded-md m-auto mb-5"
							src={currGame.imageURL}
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
					{loading && "Loading..."}
					{!loading && data && currUserIsModder && (
						<CompleteModRequestForm request={data} />
					)}
				</>
			</ModEditPageLayout>
		</ContentBody>
	);
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const { query: { requestID = "" } = {} } = context || {};

	return {
		props: {
			requestID
		}
	};
}

export default EditAsRequestee;
