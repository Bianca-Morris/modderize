import Image from "next/image";
import React from "react";
import A from "../basic/A";
import H3 from "../basic/typography/H3";

type ModderInfoPanelProps = {
	modderID?: string;
	modderDisplayName?: string;
	modderProfileImageURL?: string;
	isModComplete: boolean;
	modderAssignedButNotConfirmed: boolean;
	modderAssigned: boolean;
};

const ModderInfoPanel: React.FC<ModderInfoPanelProps> = ({
	modderID,
	modderDisplayName,
	modderProfileImageURL,
	isModComplete,
	modderAssigned,
	modderAssignedButNotConfirmed
}) => {
	return (
		<div className="flex flex-col gap-0">
			<H3 cls="bg-gray-200 p-4">Modder Info</H3>
			<div className="border border-gray-200 p-4">
				<div className="flex w-full items-center justify-center gap-5">
					{!modderID && (
						<>No modder currently assigned to this project.</>
					)}
					{modderProfileImageURL && (
						<Image
							width={128}
							height={128}
							alt="Modder profile"
							src={modderProfileImageURL}
							className="shadow-xl rounded-full align-middle border-none h-12 w-12"
						></Image>
					)}
					<div>
						{modderID && modderDisplayName && !isModComplete && (
							<div>
								<strong>Assigned to:</strong>
								<span className="ml-1">
									<A
										href={`/users/${modderID}`}
										variant="indigo"
									>
										{modderDisplayName}
									</A>
								</span>
							</div>
						)}
						{modderID && modderDisplayName && isModComplete && (
							<div>
								<strong>Completed by:</strong>
								<span className="ml-1">
									<A
										href={`/users/${modderID}`}
										variant="indigo"
									>
										{modderDisplayName}
									</A>
								</span>
							</div>
						)}
						{modderAssignedButNotConfirmed && (
							<div>
								<strong>Status:</strong>
								<span className="ml-1">Requested</span>
							</div>
						)}
						{modderAssigned && !isModComplete && (
							<div>
								<strong>Status:</strong>
								<span className="ml-1">Accepted</span>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
export default ModderInfoPanel;
