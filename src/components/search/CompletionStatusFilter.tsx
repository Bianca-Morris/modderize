import React from "react";
import { CompletionStatus } from "../../types/docTypes";
import CollapsibleFilter from "./CollapsibleFilter";

type CompletionStatusFilterProps = {
	selectedCompletionStatus?: CompletionStatus;
	setSelectedCompletionStatus: (e) => void;
};

const CompletionStatusFilter: React.FC<CompletionStatusFilterProps> = ({
	setSelectedCompletionStatus,
	selectedCompletionStatus
}) => {
	const onChange = (e) => {
		setSelectedCompletionStatus(e.target.value);
	};

	return (
		<CollapsibleFilter
			section={{
				id: "selectedCompletionStatus",
				options: [
					{
						value: "pending modder",
						label: "Pending Modder",
						checked: selectedCompletionStatus === "pending modder"
					},
					{
						value: "in progress",
						label: "In Progress",
						checked: selectedCompletionStatus === "in progress"
					},
					{
						value: "complete",
						label: "Complete",
						checked: selectedCompletionStatus === "complete"
					},
					{
						value: "archived",
						label: "Archived",
						checked: selectedCompletionStatus === "archived"
					}
				],
				name: "Completion Status"
			}}
			{...{ onChange }}
			value={selectedCompletionStatus || ""}
		/>
	);
};
export default CompletionStatusFilter;
