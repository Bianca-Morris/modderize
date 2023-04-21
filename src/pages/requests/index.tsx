import { Query, QuerySnapshot } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import safeJsonStringify from "safe-json-stringify";
import Button from "../../components/basic/Button";
import SimpleHeader from "../../components/general/SimpleHeader";
import ContentBody from "../../components/layout/ContentBody";
import ModRequestResults from "../../components/search/ModRequestResults";
import { constructModRequestQuery } from "../../helpers";
import { usePrevious } from "../../hooks/usePrevious";

const ModRequestsPage: React.FC = () => {
	const [query, setQuery] = useState<Query>();
	const [docSnapshot, setDocSnapshot] = useState<QuerySnapshot>();
	const [items, setItems] = useState<any[]>([]);
	const [hasMore, setHasMore] = useState(true);

	const [docs, loading, error, snapshot] = useCollectionData(query);
	const previousSnap: any = usePrevious(docSnapshot);

	// On load, set the initial query
	useEffect(() => {
		const initialQuery = constructModRequestQuery();
		setQuery(initialQuery);
	}, []);

	// Update snapshot when snapshot is loaded
	useEffect(() => {
		if (snapshot) {
			console.log("snapshot", snapshot);
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
		if (docs && docs.length) {
			console.log("docs", docs);
			setItems([...items, ...docs]);
		}
	}, [docs]);

	const generateMore = () => {
		// Create a new query using document snapshot
		if (snapshot) {
			const newQuery = constructModRequestQuery(docSnapshot);
			setQuery(newQuery);
		}
	};

	return (
		<div>
			<SimpleHeader>
				<div className="flex w-100 justify-between items-center">
					<div className="flex flex-col text-3xl">
						<h1>ModRequests</h1>

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
				<div className="flex w-full flex-col py-10">
					{/* <div className="flex-1">
						// TODO: Search Filters
						{<Filters />}
					</div> */}
					<div className="flex-1">
						<ModRequestResults
							results={items}
							isInfiniteLoading={loading}
							onInfiniteLoadCallback={generateMore}
							{...{ hasMore }}
						/>
					</div>
					{hasMore && (
						<Button
							variant="violet"
							type="button"
							onClick={(e) => generateMore()}
							disabled={!hasMore}
						>
							Show More
						</Button>
					)}
				</div>
			</ContentBody>
		</div>
	);
};

export default ModRequestsPage;
