import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import { GameSnippet, gameState } from "../atoms/gamesAtom";
import { auth, firestore } from "../firebase/clientApp";
import { Game } from "../types/docTypes";

const useGameData = () => {
	const [user] = useAuthState(auth);
	const [gameStateValue, setGameStateValue] = useRecoilState(gameState);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const onToggleGameFavoriteStatus = (
		gameData: Game,
		isFavorited: boolean
	) => {
		// is the user signed in?

		// if not => open auth modal, prompt them to sign in

		if (isFavorited) {
			unfavoriteGame(gameData.id);
			return;
		}
		favoriteGame(gameData);
	};

	const getMySnippets = async () => {
		setLoading(true);
		try {
			// get snippets for currently logged in user.
			const snippetDocs = await getDocs(
				collection(firestore, `users/${user?.uid}/gameSnippets`)
			);

			// loop through firebase docs and convert to JS objects w/data
			const snippets = snippetDocs.docs.map((doc) => ({ ...doc.data() }));

			// add this data to global app state
			setGameStateValue((prev) => ({
				...prev,
				mySnippets: snippets as GameSnippet[]
			}));

			setLoading(false);
			console.log("snippets", snippets);
		} catch (error) {
			console.log("useGameData error getting snippets", error);
			setLoading(false);
		}
	};

	const favoriteGame = (gameData: Game) => {};
	const unfavoriteGame = (gameID: string) => {};

	// When user is loaded, grab their favorite games and add to state
	useEffect(() => {
		if (!user) return;
		getMySnippets();
	}, [user]);

	return {
		gameStateValue,
		onToggleGameFavoriteStatus,
		loading
	};
};

export default useGameData;
