import React, { useState } from "react";
import { useRouter } from "next/router";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

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
	hideFilters?: string;
};

const Filters: React.FC<FiltersProps> = ({
	gameID,
	completionStatus,
	modderStatus,
	id,
	modderID,
	requesterID,
	hideFilters
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
			baseURL += `modderStatus=${selectedModderStatus}&`;
		}
		if (hideFilters === "true") {
			baseURL += `hideFilters=true`;
		}

		// Refresh the page with new query
		router.push(baseURL);
	};

	const onClearFilters = () => {
		setSelectedGameID(undefined);
		setSelectedCompletionStatus(undefined);
		setSelectedModderStatus(undefined);
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
			<div className="flex lg:flex-col flex-row w-full gap-3">
				<Button type="submit" variant="violet" cls="lg:w-full flex-1">
					<MagnifyingGlassIcon className="w-4 h-4 mr-1" />
					Search
				</Button>
				<Button
					type="button"
					variant="red"
					cls="lg:w-full flex-1"
					onClick={onClearFilters}
					disabled={
						!selectedCompletionStatus &&
						!selectedGameID &&
						!selectedModderStatus
					}
				>
					<XMarkIcon className="w-4 h-4 mr-1" /> Clear Filters
				</Button>
			</div>
		</form>
	);
};
export default Filters;
