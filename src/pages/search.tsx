import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { searchState } from "../atoms/searchAtom";
import SimpleHeader from "../components/general/SimpleHeader";
import ContentBody from "../components/layout/ContentBody";
import Filters from "../components/search/Filters";
import GameResults from "../components/search/GameResults";
import useSearchData from "../hooks/useSearchData";

type SearchPageProps = {};

const SearchPage: React.FC<SearchPageProps> = () => {
	const router = useRouter();

	const { getAllGames, loading: searchLoading } = useSearchData();

	const [searchStateValue, setSearchStateValue] = useRecoilState(searchState);
	const { docType, games } = searchStateValue || {};

	// Get query parameters from query
	const { type } = router.query;

	// On page load, if a list of games isn't loaded and this is a game search, load them
	useEffect(() => {
		// Assuming there will always be games in DB, and if not, then they aren't loaded yet
		if (type === "game" && !searchLoading && !games.length) {
			getAllGames();
		}
	}, [searchLoading, games, type]);

	return (
		<div>
			<SimpleHeader>
				<div className="flex w-100 justify-between items-center">
					<div className="flex flex-col text-3xl">
						<h1>Search Results</h1>

						{type && (
							<span className="capitalize text-sm">
								Search &gt; {type}
							</span>
						)}
					</div>
					<div>
						{docType === "game" && <span>{games.length}</span>}
						&nbsp;
						<span className="capitalize">{docType}s found</span>
					</div>
				</div>
			</SimpleHeader>
			<ContentBody>
				<div className="flex w-full py-10">
					{/* <div className="flex-1">
						// TODO: Search Filters
						{<Filters />}
					</div> */}
					<div className="flex-1">
						{type === "games" && <GameResults {...{ games }} />}
					</div>
				</div>
			</ContentBody>
		</div>
	);
};
export default SearchPage;
