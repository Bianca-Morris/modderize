import React, { useEffect } from "react";
import { ReallySimpleInfiniteScroll } from "react-really-simple-infinite-scroll";
import { Game as GameType } from "../../types/docTypes";
import GameCard from "../general/GameCard";

type GameResultsProps = {
	hasMore: boolean;
	results: GameType[];
	isInfiniteLoading: boolean;
	onInfiniteLoadCallback: () => void;
};

const GameResults: React.FC<GameResultsProps> = ({
	hasMore,
	results = [],
	isInfiniteLoading,
	onInfiniteLoadCallback
}) => {
	return (
		<>
			<ReallySimpleInfiniteScroll
				className={`infinite-scroll`}
				hasMore={hasMore}
				length={results.length}
				loadingComponent={
					<div className="loading-component">
						<span className="loading-label">Loading...</span>
					</div>
				}
				isInfiniteLoading={isInfiniteLoading}
				onInfiniteLoad={onInfiniteLoadCallback}
			>
				<div className="w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
					{results.map((game) => (
						<GameCard
							{...game}
							cls="flex flex-1 flex-col text-center justify-center items-center"
						/>
					))}
				</div>
			</ReallySimpleInfiniteScroll>

			{/* Should never happen */}
			{results.length === 0 && (
				<div className="w-full pl-10">No Games found!</div>
			)}
		</>
	);
};
export default GameResults;
