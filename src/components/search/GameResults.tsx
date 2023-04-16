import React from "react";
import { useRecoilState } from "recoil";
import { searchState } from "../../atoms/searchAtom";
import GameCard from "../general/GameCard";

const GameResults: React.FC = () => {
	const [searchStateValue] = useRecoilState(searchState);
	const { docType, games } = searchStateValue || {};

	if (docType !== "games") return null;
	return (
		<div className="w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
			{games.map((game) => (
				<GameCard
					{...game}
					cls="flex flex-1 flex-col text-center justify-center items-center"
				/>
			))}
		</div>
	);
};
export default GameResults;
