import { orderBy, where, query } from "firebase/firestore";
import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { modRequestsCol } from "../../firebase/collections";
import { modRequestConverter } from "../../firebase/converters";
import { Game, ModRequest } from "../../types/docTypes";
import ModRequestCard from "./ModRequestCard";
import ModRequestLoader from "./ModRequestLoader";

type GameModRequestsProps = {
	gameData: Game;
};

const GameModRequests: React.FC<GameModRequestsProps> = ({ gameData }) => {
	const { id: gameID = "" } = gameData;
	const modRequestQuery = query(
		modRequestsCol.withConverter(modRequestConverter),
		where("gameID", "==", gameID),
		orderBy("creationDate", "desc")
	);
	const [currModRequests = [], loading, error] =
		useCollectionData(modRequestQuery);

	return (
		<div className="flex flex-col gap-3">
			{loading && <ModRequestLoader />}
			{!loading && currModRequests.length === 0 && (
				<div>No Mod Requests available</div>
			)}
			{currModRequests.map((mr) => {
				const { id, title, requesterDisplayName } = mr;
				return (
					<ModRequestCard
						key={id}
						{...{
							title
						}}
						modRequest={mr as ModRequest}
						subTitle={
							<div>
								<span className="font-medium mr-1">
									Requested By:
								</span>
								{requesterDisplayName}
							</div>
						}
					/>
				);
			})}
		</div>
	);
};
export default GameModRequests;
