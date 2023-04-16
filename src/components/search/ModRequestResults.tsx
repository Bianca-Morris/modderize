import React from "react";
import { useRecoilState } from "recoil";
import { searchState } from "../../atoms/searchAtom";
import { ModRequest as ModRequestType } from "../../types/docTypes";
import ModRequestShort from "../general/ModRequest";

const ModRequestResults: React.FC = () => {
	const [searchStateValue, setSearchStateValue] = useRecoilState(searchState);
	const { docType, results } = searchStateValue || {};

	if (docType !== "modRequests") return null;
	return (
		<div>
			{results.map((modRequest) => {
				const { title } = modRequest;
				return (
					<ModRequestShort
						{...{ title, modRequest }}
						subTitle="This is a subtitle"
						onVote={async () => console.log("vote")}
						userIsCreator={false}
						onDeleteModRequest={async () => console.log("delete")}
						onSelectModRequest={() => null}
					/>
				);
			})}
			{results.length === 0 && (
				<div className="w-full pl-10">No Mod Requests found!</div>
			)}
		</div>
	);
};
export default ModRequestResults;
