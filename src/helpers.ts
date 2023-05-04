import {
	limit,
	orderBy,
	Query,
	query,
	QueryDocumentSnapshot,
	QuerySnapshot,
	startAfter,
	where
} from "firebase/firestore";
import { db } from "./firebase/clientApp";
import { gamesCol, modRequestsCol } from "./firebase/collections";
import { gameConverter, modRequestConverter } from "./firebase/converters";

export function validateEmail(email) {
	// Regex from https://www.tutorialspoint.com/How-to-validate-email-address-in-JavaScript
	const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if (email.match(mailformat)) {
		return true;
	} else {
		return false;
	}
}

// Takes in a bunch of class names as strings and creates a single string for tailwind
export function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

/**
 * Search Utilities
 */

// export const acceptableSortFields = {
// 	modRequests: ["title", "creationDate", "lastModified", "voteStatus"],
// 	games: ["displayName", "numberOfPlayers"],
// 	users: ["displayName"]
// };

// export const acceptableSortValues = ["asc", "desc"];

// export function isValidQuery(queryFromContext) {
// 	const {
// 		type = defaultSearchState.docType,
// 		q = "",
// 		sortField = null,
// 		sortValue = null,
// 		p = 1
// 	} = queryFromContext || {};

// 	const invalidQueryType =
// 		type !== "modRequests" && type !== "games" && type !== "users";
// 	if (
// 		// If type is invalid
// 		invalidQueryType ||
// 		// If sort fields are incompatible with type
// 		(sortField && !acceptableSortFields[type].includes(sortField)) ||
// 		// If sort value is incompatible with type
// 		(sortValue && !acceptableSortValues.includes(sortValue))
// 		// TODO: Validate filter fields
// 	) {
// 		return false;
// 	}
// 	// Query should be valid
// 	return true;
// }

const DOCUMENTS_PER_PAGE = 15;


export function constructModRequestQuery(prevDocSnaps?: QuerySnapshot) {
	// Query the games collection
	const coll = modRequestsCol.withConverter(modRequestConverter);

	// Some basic values for all sort (TODO: Maybe make these dynamic?)
	const sortField = "title";
	const sortValue = "asc";

	// Construct a new query
	let returnQuery: Query = query(
		coll,
		orderBy(sortField, sortValue),
		limit(DOCUMENTS_PER_PAGE)
	);

	// If there is a previous query, update the current one to start after that cursor
	if (prevDocSnaps) {
		const lastVisible = getLastVisibleDocument(prevDocSnaps);
		returnQuery = query(returnQuery, startAfter(lastVisible));
	}

	return returnQuery;
}

export function constructGameQuery(
	keyword?: string | string[],
	prevDocSnaps?: QuerySnapshot
) {
	// Query the games collection
	const coll = gamesCol.withConverter(gameConverter);

	// Some basic values for all sort (TODO: Maybe make these dynamic?)
	const sortField = "displayName";
	const sortValue = "asc";
	
	// Construct a new query
	let returnQuery: Query;

	// Take into account any keywords
	if (keyword && typeof keyword === "string") {
		returnQuery = query(
			coll,
			where("displayName", "in", [keyword]),
			orderBy(sortField, sortValue),
			limit(DOCUMENTS_PER_PAGE)
		);
	} else {
		console.error("found no keyword:", keyword);
		returnQuery = query(
			coll,
			orderBy(sortField, sortValue),
			limit(DOCUMENTS_PER_PAGE)
		);
	}

	// If there is a previous query, update the current one to start after that cursor
	if (prevDocSnaps) {
		const lastVisible = getLastVisibleDocument(prevDocSnaps);
		returnQuery = query(returnQuery, startAfter(lastVisible));
	}

	return returnQuery;
}


export function getLastVisibleDocument(documentSnapshots: QuerySnapshot): QueryDocumentSnapshot {
	const lastIndex = documentSnapshots.docs.length-1;
	return documentSnapshots.docs[lastIndex];
}

export function extractMetadataFromFile(file: File) {
	return {
		contentType: file.type,
		name: file.name,
		size: file.size
	};
}