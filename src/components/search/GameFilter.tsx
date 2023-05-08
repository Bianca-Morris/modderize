import React, { SetStateAction } from "react";
import { useRecoilValue } from "recoil";
import { gameAtom } from "../../atoms/gamesAtom";
import CollapsibleFilter from "./CollapsibleFilter";

type GameFilterProps = {
	setSelectedGameID: (e) => void;
	selectedGameID?: string;
};

const GameFilter: React.FC<GameFilterProps> = ({
	selectedGameID,
	setSelectedGameID
}) => {
	const { allGames = [] } = useRecoilValue(gameAtom);

	const gameOptions = allGames.map((game) => ({
		value: game.id,
		label: game.displayName,
		checked: selectedGameID === game.id
	}));

	const onChange = (e) => {
		setSelectedGameID(e.target.value);
	};

	return (
		<CollapsibleFilter
			section={{
				id: "gameID",
				options: gameOptions,
				name: "Game"
			}}
			value={selectedGameID || ""}
			{...{ onChange }}
		/>
	);
};
export default GameFilter;
