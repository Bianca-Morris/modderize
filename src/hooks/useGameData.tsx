import {
	collection,
	doc,
	getCountFromServer,
	getDocs,
	increment,
	query,
	where,
	writeBatch
} from "firebase/firestore";
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
		setError("");
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

			console.log("snippets", snippets);
		} catch (error: any) {
			console.log("useGameData error getting snippets", error);
			setError(error.message);
		}

		setLoading(false);
	};

	const getModRequestsForGameCount = async (gameID: string) => {
		const coll = collection(firestore, "modRequests");
		const q = query(coll, where("gameID", "==", gameID));
		const snapshot = await getCountFromServer(q);
		return snapshot.data().count;
	};

	const favoriteGame = async (gameData: Game) => {
		const { id, displayName } = gameData;

		try {
			const batch = writeBatch(firestore);

			// create a new game snippet for the user
			const newSnippet: GameSnippet = {
				gameID: id,
				gameName: displayName
			};

			batch.set(
				doc(firestore, `users/${user?.uid}/gameSnippets`, id),
				newSnippet
			);

			// update the number of players in the database
			batch.update(doc(firestore, "games", id), {
				numberOfPlayers: increment(1)
			});

			// execute the batch writes and wait until complete
			await batch.commit();

			// update the recoil state with the new snippet
			setGameStateValue((prev) => ({
				...prev,
				mySnippets: [...prev.mySnippets, newSnippet]
			}));
		} catch (error: any) {
			console.log("favoriteGame Error", error);
			setError(error.message);
		}

		setLoading(false);
	};

	const unfavoriteGame = async (gameID: string) => {
		try {
			const batch = writeBatch(firestore);

			// delete the game snippet from the user
			batch.delete(
				doc(firestore, `users/${user?.uid}/gameSnippets`, gameID)
			);

			// decrement the number of players in the database
			batch.update(doc(firestore, "games", gameID), {
				numberOfPlayers: increment(-1)
			});

			// execute the batch writes and wait until complete
			await batch.commit();

			// update the recoil state to remove the snippet for this game
			setGameStateValue((prev) => ({
				...prev,
				mySnippets: prev.mySnippets.filter(
					(item) => item.gameID !== gameID
				)
			}));
		} catch (error: any) {
			console.log("unfavoriteGame Error", error);
			setError(error.message);
		}

		setLoading(false);
	};

	// When user is loaded, grab their favorite games and add to state
	useEffect(() => {
		if (!user) return;
		getMySnippets();
	}, [user]);

	return {
		gameStateValue,
		onToggleGameFavoriteStatus,
		getModRequestsForGameCount,
		loading
	};
};

export default useGameData;
