import { getCountFromServer, Query } from "firebase/firestore";
import React from "react";

/**
 * Some assorted functions that can be used across item types
 */
const useFirebaseAPI = () => {
	const getCountForQuery = async (thisQuery: Query) => {
		try {
			const snapshot = await getCountFromServer(thisQuery);
			return snapshot.data().count;
		} catch (err: any) {
			console.log("err in getCountForQuery", err);
		}
	};
	return {
		getCountForQuery
	};
};
export default useFirebaseAPI;
