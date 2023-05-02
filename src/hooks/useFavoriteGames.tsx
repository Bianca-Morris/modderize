import React from "react";
import { collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { auth, db } from "../firebase/clientApp";
import { GameSnippet } from "../types/docTypes";

const useFavoriteGames = () => {
	const [user] = useAuthState(auth);

	// get snippets for currently logged in user.
	const docCollection = collection(
		db,
		`users/${user?.uid || "placeholder"}/gameSnippets`
	);
	const [favoriteGames = [] as GameSnippet[], loading, error, snapshot] =
		useCollectionData(docCollection);

	return {
		favoriteGames,
		loading,
		error
	};
};

export default useFavoriteGames;
