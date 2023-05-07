import React from "react";
import Badge from "../basic/Badge";

type ModRequestStatusBadgeProps = {
	modderStatus: "accepted" | "open" | "requested";
	completionStatus:
		| "in progress"
		| "complete"
		| "pending modder"
		| "archived";
};

const ModRequestStatusBadge: React.FC<ModRequestStatusBadgeProps> = ({
	modderStatus,
	completionStatus
}) => {
	return (
		<div className="mx-2">
			{modderStatus === "accepted" &&
				completionStatus === "in progress" && (
					<Badge variant="purple">In Progress</Badge>
				)}
			{modderStatus === "open" &&
				completionStatus === "pending modder" && (
					<Badge variant="yellow">Needs Modder</Badge>
				)}
			{modderStatus === "requested" &&
				completionStatus === "pending modder" && (
					<Badge variant="red">Pending Modder</Badge>
				)}
			{modderStatus === "accepted" && completionStatus === "complete" && (
				<Badge variant="green">Complete</Badge>
			)}
			{completionStatus === "archived" && (
				<Badge variant="blue">Archived</Badge>
			)}
		</div>
	);
};
export default ModRequestStatusBadge;
