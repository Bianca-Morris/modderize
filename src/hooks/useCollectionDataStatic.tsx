import {
	DocumentData,
	getDocs,
	limit,
	query,
	Query,
	QueryDocumentSnapshot,
	startAfter
} from "firebase/firestore";
import { useCallback, useEffect, useMemo, useState } from "react";

/**
 * A hook for paginating queries against Firebase document collections
 * @param propQuery A Firebase Query (should NOT include limit method)
 * @param pageLength How many items to return on each "page" (passed into limit())
 * @returns Object containing info about the paginated query's results
 * Reworked from code by achuinard here: https://github.com/CSFrequency/react-firebase-hooks/issues/13
 */
export const useCollectionDataStatic = (propQuery: Query, pageLength = 10) => {
	const [data, setData] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);
	const [fetching, setFetching] = useState(true);
	const [hasMore, setHasMore] = useState(true);

	// Get data values for each doc from snapshot array
	const dataVals = useMemo(() => {
		return data.map((doc) => doc.data());
	}, [data]);

	// Does the actual requesting of data
	const loadMore = useCallback(async () => {
		if (data.length === 0) {
			// First request
			propQuery = query(propQuery, limit(pageLength));

			// Grab directly from original query (w/modification to include result limit)
			try {
				const result = await getDocs(propQuery);
				setData([...result.docs]);
				if (result.docs.length === 0) {
					setHasMore(false);
				}
			} catch (err: any) {
				console.error("err", err);
			} finally {
				setFetching(false);
			}
		} else {
			// Subsequent requests; don't trigger unless not currently loading results
			if (fetching) {
				return;
			}

			setFetching(true);

			// Update query to show the next set of results
			propQuery = query(
				propQuery,
				startAfter(data[data.length - 1]),
				limit(pageLength)
			);

			// Try to get the results
			try {
				const result = await getDocs(propQuery);
				setData([...data, ...result.docs]);
				if (result.docs.length === 0) {
					setHasMore(false);
				}
			} catch (err: any) {
				console.error("err", err);
			} finally {
				setFetching(false);
			}
		}
	}, [data, dataVals, fetching]);

	// Trigger first load
	useEffect(() => {
		loadMore();
	}, []);

	return { data, dataVals, loadMore, fetching, hasMore };
};
