import { Query, QuerySnapshot } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { gameAtom } from "../../atoms/gamesAtom";
import H1 from "../../components/basic/typography/H1";
import GameCard from "../../components/general/GameCard";
import SimpleHeader from "../../components/general/SimpleHeader";
import ContentBody from "../../components/layout/ContentBody";
import useGameData from "../../hooks/useGameData";
import { Game } from "../../types/docTypes";

const GamesPage: React.FC = () => {
	// Grab any keywords and initialize
	const { query: queryParams = null } = useRouter();
	const { keyword = "" } = queryParams || {};

	const [gameStateValue, setGameStateValue] = useRecoilState(gameAtom);
	const { allGames = [] } = gameStateValue || {};
	const { getAllGames } = useGameData();

	useEffect(() => {
		// Assuming games will always be available
		if (allGames.length === 0) {
			(async () => {
				const gameDocs = await getAllGames();
				setGameStateValue((prev) => {
					return { ...prev, allGames: gameDocs as Game[] };
				});
			})();
		}
	}, []);

	// Filter results
	let filteredGames: Game[];
	if (keyword) {
		filteredGames = allGames.filter((game) => {
			const lowercaseDisplayName = game.displayName.toLowerCase();
			const lowercaseKeyword =
				typeof keyword === "string"
					? keyword.toLowerCase()
					: keyword.join(" ").toLowerCase();

			if (lowercaseDisplayName.includes(lowercaseKeyword)) {
				return true;
			}
			return false;
		});
	} else {
		filteredGames = allGames;
	}

	return (
		<div>
			<SimpleHeader>
				<div className="flex w-100 justify-between items-center">
					<div className="flex flex-col text-3xl">
						<H1>Games</H1>

						{keyword && (
							<span className="capitalize text-sm">
								Selected Keyword: {keyword}
							</span>
						)}
					</div>
					<div>
						<span>{filteredGames.length}&nbsp;</span>
						<span className="capitalize">Games found</span>
					</div>
				</div>
			</SimpleHeader>
			<ContentBody>
				<div className="flex w-full flex-row py-10">
					<div className="w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
						{filteredGames.map((game) => (
							<GameCard
								key={game.id}
								{...game}
								cls="flex flex-1 flex-col text-center justify-center items-center"
							/>
						))}
					</div>
				</div>
			</ContentBody>
		</div>
	);
};

export default GamesPage;
