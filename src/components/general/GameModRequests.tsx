import { collection, orderBy, where, query, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase/clientApp";
import useModRequests from "../../hooks/useModRequests";
import { Game, ModRequest as ModRequestType } from "../../types/docTypes";
import Button from "../basic/Button";
import ModRequest from "./ModRequest";
import ModRequestLoader from "./ModRequestLoader";

type GameModRequestsProps = {
	gameData: Game;
	userID?: string;
};

const GameModRequests: React.FC<GameModRequestsProps> = ({
	gameData,
	userID
}) => {
	const [loading, setLoading] = useState(false);
	const {
		modRequestStateValue,
		setModRequestStateValue,
		onVote,
		onDeleteModRequest,
		onSelectModRequest
	} = useModRequests();

	const { modRequests: currModRequests = [] } = modRequestStateValue;
	const { id: gameID } = gameData;

	const getModRequests = async () => {
		try {
			setLoading(true);

			// Get a list of most recently created mod requests
			const modRequestQuery = query(
				collection(db, "modRequests"),
				where("gameID", "==", gameID),
				orderBy("creationDate", "desc")
			);

			const modRequestDocs = await getDocs(modRequestQuery);

			// Store this in the post state
			const modRequests = modRequestDocs.docs.map((doc) => ({
				id: doc.id,
				...doc.data()
			}));

			setModRequestStateValue((prev) => ({
				...prev,
				modRequests: modRequests as ModRequestType[]
			}));

			console.log("modRequests", modRequests);
		} catch (error: any) {
			console.log("getModReqeusts error", error.message);
		}

		setLoading(false);
	};

	// On initial mount, grab the newest mod requests form the db
	useEffect(() => {
		getModRequests();
	}, []);

	return (
		<div className="flex flex-col gap-3">
			{loading && <ModRequestLoader />}
			{!loading && currModRequests.length === 0 && (
				<div>No Mod Requests available</div>
			)}
			{currModRequests.map((mr) => {
				const { id, title, requesterDisplayName, requesterID } = mr;
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
									Requested By:
								</span>
								{requesterDisplayName}
							</div>
						}
						userIsCreator={requesterID === userID}
						userVoteValue={undefined}
					/>
				);
			})}
		</div>
	);
};
export default GameModRequests;
