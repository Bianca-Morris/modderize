import {
	collection,
	doc,
	getCountFromServer,
	getDocs,
	increment,
	limit,
	query,
	where,
	writeBatch
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import { gameAtom } from "../atoms/gamesAtom";
import { auth, db } from "../firebase/clientApp";
import { Game, GameSnippet } from "../types/docTypes";

const useGameData = () => {
	const [user] = useAuthState(auth);
	const [gameStateValue, setGameStateValue] = useRecoilState(gameAtom);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const onToggleGameFavoriteStatus = (
		gameData: Game,
		isFavorited: boolean
	) => {
		if (isFavorited) {
			unfavoriteGame(gameData.id);
			return;
		}
		favoriteGame(gameData);
	};

	const getAllGames = async () => {
		setError("");
		setLoading(true);

		try {
			const querySnapshot = await getDocs(collection(db, "games"));
			setLoading(false);

			const gamesArr = [] as Game[];
			querySnapshot.forEach((doc) => {
				// doc.data() is never undefined for query doc snapshots
				const thisGame = {
					id: doc.id,
					...doc.data()
				} as Game;
				gamesArr.push(thisGame);
			});

			return gamesArr;
		} catch (error: any) {
			console.error("getAllGames error", error);
			setError(error.message);
			return [];
		}
	};

	const getModRequestsForGameCount = async (gameID: string) => {
		const coll = collection(db, "modRequests");
		const q = query(coll, where("gameID", "==", gameID));
		const snapshot = await getCountFromServer(q);
		return snapshot.data().count;
	};

	const favoriteGame = async (gameData: Game) => {
		const { id, displayName } = gameData;

		try {
			const batch = writeBatch(db);

			// create a new game snippet for the user
			const newSnippet: GameSnippet = {
				gameID: id,
				gameName: displayName
			};

			batch.set(
				doc(db, `users/${user?.uid}/gameSnippets`, id),
				newSnippet
			);

			// update the number of players in the database
			batch.update(doc(db, "games", id), {
				numberOfPlayers: increment(1)
			});

			// execute the batch writes and wait until complete
			await batch.commit();
		} catch (error: any) {
			console.error("favoriteGame Error", error);
			setError(error.message);
		}

		setLoading(false);
	};

	const unfavoriteGame = async (gameID: string) => {
		try {
			const batch = writeBatch(db);

			// delete the game snippet from the user
			batch.delete(doc(db, `users/${user?.uid}/gameSnippets`, gameID));

			// decrement the number of players in the database
			batch.update(doc(db, "games", gameID), {
				numberOfPlayers: increment(-1)
			});

			// execute the batch writes and wait until complete
			await batch.commit();
		} catch (error: any) {
			console.error("unfavoriteGame Error", error);
			setError(error.message);
		}

		setLoading(false);
	};

	// On first load, grab all of the games
	useEffect(() => {
		(async () => {
			const allGamesFirstLoad = await getAllGames();
			// add this data to global app state
			setGameStateValue((prev) => ({
				...prev,
				allGames: allGamesFirstLoad as Game[]
			}));
		})();
	}, []);

	return {
		getAllGames,
		onToggleGameFavoriteStatus,
		getModRequestsForGameCount,
		loading
	};
};

export default useGameData;
