import Image from "next/image";
import React from "react";
import { useRecoilValue } from "recoil";
import { gameAtom } from "../../atoms/gamesAtom";
import A from "../basic/A";
import H3 from "../basic/typography/H3";

type GameInfoPanelProps = {
	gameID: string;
	gameDisplayName: string;
};

const GameInfoPanel: React.FC<GameInfoPanelProps> = React.memo(
	({ gameID, gameDisplayName }) => {
		const gameState = useRecoilValue(gameAtom);
		const { allGames = [] } = gameState;

		return (
			<div className="flex flex-col gap-0">
				<H3 cls="bg-gray-200 p-4">Game Info</H3>
				<div className="border border-gray-200 p-4">
					<div className="flex flex-col w-full items-center justify-center gap-5">
						{gameID && allGames.length > 0 && (
							<Image
								width={196}
								height={196}
								src={
									allGames.filter(
										(game) => gameID === game.id
									)[0]?.imageURL || ""
								}
								alt="Selected game poster"
								className="shadow-xl rounded-lg align-middle border-none h-12 w-12"
							></Image>
						)}
						<div>
							{gameID && gameDisplayName && (
								<div>
									<strong>Request for:</strong>
									<span className="ml-1">
										<A
											href={`/games/${gameID}`}
											variant="indigo"
										>
											{gameDisplayName}
										</A>
									</span>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		);
	}
);
export default GameInfoPanel;
