import { Query, QuerySnapshot } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import safeJsonStringify from "safe-json-stringify";
import Button from "../../components/basic/Button";
import SimpleHeader from "../../components/general/SimpleHeader";
import ContentBody from "../../components/layout/ContentBody";
import GameResults from "../../components/search/GameResults";
import { constructGameQuery } from "../../helpers";
import { usePrevious } from "../../hooks/usePrevious";

const GamesPage: React.FC = () => {
	// Grab any keywords and initialize
	const { query: queryParams = null } = useRouter();
	const { keyword = "" } = queryParams || {};

	// Initialize to empty array
	const [query, setQuery] = useState<Query>();
	const [docSnapshot, setDocSnapshot] = useState<QuerySnapshot>();
	const [items, setItems] = useState<any[]>([]);
	const [hasMore, setHasMore] = useState(true);

	const [docs, loading, error, snapshot] = useCollectionData(query);
	const previousSnap: any = usePrevious(docSnapshot);

	// On load, set the initial query based on keyword param (can't do this on first render, since it may not be present yet)
	useEffect(() => {
		const initialQuery = constructGameQuery(keyword, undefined);
		setQuery(initialQuery);
	}, [keyword]);

	// Update snapshot when snapshot is loaded
	useEffect(() => {
		console.log("snapshot updated");
		if (snapshot) {
			setDocSnapshot(snapshot);
		}
	}, [snapshot]);

	// When new snapshot state is loaded, check to see if it's the last set of results?
	useEffect(() => {
		const emptyDocSnap = !docSnapshot || (docSnapshot && docSnapshot.empty);
		const prevDocSnapNotEmpty = previousSnap && !previousSnap.empty;
		if (emptyDocSnap && prevDocSnapNotEmpty) {
			setHasMore(false);
		}
	}, [docSnapshot]);

	// Update items state when docs are loaded
	useEffect(() => {
		console.log("z docs updated");
		if (docs && docs.length) {
			setItems([...items, ...docs]);
		}
	}, [docs]);

	const generateMore = () => {
		// Create a new query using document snapshot
		if (snapshot) {
			const newQuery = constructGameQuery(keyword, docSnapshot);
			setQuery(newQuery);
		}
	};

	return (
		<div>
			<SimpleHeader>
				<div className="flex w-100 justify-between items-center">
					<div className="flex flex-col text-3xl">
						<h1>Games</h1>

						{/* {textQuery && (
							<span className="capitalize text-sm">
								Selected Keyword: {type}
							</span>
						)} */}
					</div>
					<div>
						{/* {docType === "games" && <span>{games.length}</span>}
						{docType !== "games" && <span>{results.length}</span>}
						&nbsp;
						<span className="capitalize">{docType} found</span> */}
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
						<GameResults
							results={items}
							isInfiniteLoading={loading}
							onInfiniteLoadCallback={generateMore}
							{...{ hasMore }}
						/>
					</div>
					<Button
						variant="violet"
						type="button"
						onClick={(e) => generateMore()}
						disabled={!hasMore}
					>
						Show More
					</Button>
				</div>
			</ContentBody>
		</div>
	);
};

export default GamesPage;
