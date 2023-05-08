import React from "react";
import { ModderStatus } from "../../types/docTypes";
import CollapsibleFilter from "./CollapsibleFilter";

type ModderStatusFilterProps = {
	selectedModderStatus?: ModderStatus;
	setSelectedModderStatus: (e) => void;
};

const ModderStatusFilter: React.FC<ModderStatusFilterProps> = ({
	selectedModderStatus,
	setSelectedModderStatus
}) => {
	const onChange = (e) => {
		setSelectedModderStatus(e.target.value);
	};
	return (
		<CollapsibleFilter
			section={{
				id: "modderStatus",
				options: [
					{
						value: "accepted",
						label: "Accepted",
						checked: selectedModderStatus === "accepted"
					},
					{
						value: "open",
						label: "Open",
						checked: selectedModderStatus === "open"
					},
					{
						value: "requested",
						label: "Requested",
						checked: selectedModderStatus === "requested"
					}
				],
				name: "Modder Status"
			}}
			{...{ onChange }}
			value={selectedModderStatus || ""}
		/>
	);
};
export default ModderStatusFilter;
