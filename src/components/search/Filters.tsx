import { cp } from "fs";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { CompletionStatus, ModderStatus } from "../../types/docTypes";
import Button from "../basic/Button";
import CompletionStatusFilter from "./CompletionStatusFilter";
import GameFilter from "./GameFilter";
import ModderStatusFilter from "./ModderStatusFilter";

type FiltersProps = {
	gameID?: string;
	modderStatus?: ModderStatus;
	completionStatus?: CompletionStatus;
	id?: string;
	modderID?: string;
	requesterID?: string;
};

const Filters: React.FC<FiltersProps> = ({
	gameID,
	completionStatus,
	modderStatus,
	id,
	modderID,
	requesterID
}) => {
	const router = useRouter();
	const [selectedGameID, setSelectedGameID] = useState(gameID);
	const [selectedCompletionStatus, setSelectedCompletionStatus] =
		useState(completionStatus);
	const [selectedModderStatus, setSelectedModderStatus] =
		useState(modderStatus);

	const onSubmit = (e: React.FormEvent) => {
		// Prevent form from restarting the whole thingy
		e.preventDefault();

		// Construct new query for search
		let baseURL = "/requests?";
		if (id) {
			baseURL += `id=${id}&`;
		}
		if (modderID) {
			baseURL += `modderID=${modderID}&`;
		}
		if (requesterID) {
			baseURL += `requesterID=${requesterID}&`;
		}
		if (selectedGameID) {
			baseURL += `gameID=${selectedGameID}&`;
		}
		if (selectedCompletionStatus) {
			baseURL += `completionStatus=${selectedCompletionStatus}&`;
		}
		if (selectedModderStatus) {
			baseURL += `modderStatus=${selectedModderStatus}`;
		}

		// Refresh the page with new query
		router.push(baseURL);
	};

	return (
		<form onSubmit={onSubmit}>
			<GameFilter {...{ selectedGameID, setSelectedGameID }} />
			<ModderStatusFilter
				{...{
					selectedModderStatus,
					setSelectedModderStatus
				}}
			/>
			<CompletionStatusFilter
				{...{
					selectedCompletionStatus,
					setSelectedCompletionStatus
				}}
			/>
			<Button type="submit" variant="blue" cls="w-full">
				Search
			</Button>
		</form>
	);
};
export default Filters;
