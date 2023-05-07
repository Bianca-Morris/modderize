import { Query } from "firebase/firestore";
import React, { ReactElement } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { ModRequest as ModRequestType } from "../../types/docTypes";
import ModRequestCard from "./ModRequestCard";
import ModRequestLoader from "./ModRequestLoader";

type ModRequestListProps = {
	query: Query<ModRequestType>;
	subtitleRenderFx?: (mr: ModRequestType) => string | ReactElement;
	noResultsRenderFx?: () => string | ReactElement;
};

/**
 * Simple mod request list; takes a firebase Query for a modRequest and outputs a set of ModRequests
 * @param param0
 * @returns
 */
const ModRequestList: React.FC<ModRequestListProps> = ({
	query,
	subtitleRenderFx = (mr: ModRequestType) => (
		<div>
			<span className="font-medium mr-1">Requested By:</span>
			{mr.requesterDisplayName}
		</div>
	),
	noResultsRenderFx = () => <div>No Mod Requests available</div>
}) => {
	const [currModRequests = [], loading, error] = useCollectionData(query);

	return (
		<div className="flex flex-col gap-3 w-full">
			{loading && <ModRequestLoader />}
			{!loading && currModRequests.length === 0 && noResultsRenderFx()}
			{currModRequests.map((mr) => {
				const { id, title, requesterDisplayName } = mr;
				const subTitle = subtitleRenderFx(mr);
				return (
					<ModRequestCard
						key={id}
						{...{
							title,
							subTitle
						}}
						modRequest={mr as ModRequestType}
					/>
				);
			})}
		</div>
	);
};

export default ModRequestList;
