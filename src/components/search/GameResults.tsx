import React from "react";
import { Game } from "../../types/docTypes";
import GameCard from "../general/GameCard";

type GameResultsProps = {
	games: Game[];
};

const GameResults: React.FC<GameResultsProps> = ({ games }) => {
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
