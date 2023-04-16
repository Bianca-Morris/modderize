import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { SearchableDocTypes, searchState } from "../atoms/searchAtom";
import SimpleHeader from "../components/general/SimpleHeader";
import ContentBody from "../components/layout/ContentBody";
import Filters from "../components/search/Filters";
import GameResults from "../components/search/GameResults";
import ModRequestResults from "../components/search/ModRequestResults";
import useSearchData from "../hooks/useSearchData";

type SearchPageProps = {};

const SearchPage: React.FC<SearchPageProps> = () => {
	const router = useRouter();

	// Get query parameters from query
	const { type = "games" } = router.query;

	// Check if invalid docType
	const invalidQueryType =
		type !== "modRequests" && type !== "games" && type !== "users";
	if (invalidQueryType) {
		// Show an error page
		return (
			<div>
				<SimpleHeader>
					<div className="flex w-100 justify-between items-center">
						<div className="flex flex-col text-3xl">
							<h1>Error!</h1>
						</div>
					</div>
				</SimpleHeader>
				<ContentBody>
					<div className="flex w-full p-10">Invalid Doctype</div>
				</ContentBody>
			</div>
		);
	}

	const { getAllGames, loading: searchLoading } = useSearchData();

	const [searchStateValue, setSearchStateValue] = useRecoilState(searchState);
	const { docType, games, results } = searchStateValue || {};

	// On page load, if a list of games isn't loaded and this is a game search, load them
	useEffect(() => {
		// Assuming there will always be games in DB, and if not, then they aren't loaded yet
		if (!searchLoading && !games.length) {
			getAllGames();
		}

		// If doctype in state is different from query; this may be a sign page was reloaded
		if (docType !== type) {
			setSearchStateValue((prev) => ({
				...prev,
				docType: type
			}));
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
						{docType === "games" && <span>{games.length}</span>}
						{docType !== "games" && <span>{results.length}</span>}
						&nbsp;
						<span className="capitalize">{docType} found</span>
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
						{type === "games" && <GameResults />}
						{type === "modRequests" && <ModRequestResults />}
					</div>
				</div>
			</ContentBody>
		</div>
	);
};
export default SearchPage;
