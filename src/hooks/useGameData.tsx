import {
	doc,
	getCountFromServer,
	getDocs,
	increment,
	query,
	runTransaction,
	serverTimestamp,
	where,
	writeBatch
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";
import { gameAtom } from "../atoms/gamesAtom";
import { modalControllerAtom } from "../atoms/modalControllerAtom";
import { auth, db } from "../firebase/clientApp";
import { gamesCol, modRequestsCol } from "../firebase/collections";
import { extractMetadataFromFile } from "../helpers";
import { Game, GameSnippet } from "../types/docTypes";
import { GameFormData } from "../types/misc";
import useStorageAPI from "./useStorageAPI";

const useGameData = () => {
	const [user] = useAuthState(auth);
	const setModalState = useSetRecoilState(modalControllerAtom);
	const setGameStateValue = useSetRecoilState(gameAtom);
	const { uploadFile } = useStorageAPI();
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
			const querySnapshot = await getDocs(gamesCol);
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
		const coll = modRequestsCol;
		const q = query(coll, where("gameID", "==", gameID));
		const snapshot = await getCountFromServer(q);
		return snapshot.data().count;
	};

	const createGame = async (gameData: GameFormData) => {
		if (error) {
			setError("");
		}

		const { gameID, image, gameDisplayName } = gameData;

		setLoading(true);

		try {
			// If valid ID, create the game community
			const gameDocRef = doc(gamesCol, gameID);

			let imageURL: string | null;

			if (image) {
				const metadata = extractMetadataFromFile(image);
				imageURL = await uploadFile(
					`/images/games/${gameID}.jpeg`,
					image,
					metadata
				);
			} else {
				throw new Error("Game image upload required...");
			}

			// Batching a few operations so if one fails, they fail together.
			await runTransaction(db, async (transaction) => {
				// Check if the game's ID is already in the db
				const gameDoc = await transaction.get(gameDocRef);

				if (gameDoc.exists()) {
					// Has already been created
					throw new Error(
						"This game ID already exists; check for duplicates and/or try again."
					);
				}

				// Create a new game doc in firestore with this ID
				transaction.set(gameDocRef, {
					creatorID: user?.uid,
					createdAt: serverTimestamp(),
					displayName: gameDisplayName,
					numberOfPlayers: 1,
					imageURL
				});

				// Then, create a snippet with some info about the games a user is following
				transaction.set(
					doc(db, `users/${user?.uid}/gameSnippets`, gameID),
					{
						gameID,
						gameName: gameDisplayName
					}
				);
			});

			console.log("Game created! Closing modal");
			setModalState((prev) => ({
				...prev,
				gameCreationModalOpen: false
			}));
		} catch (error: any) {
			console.log("handleCreateGame", error);
			setError(error.message);
		} finally {
			setLoading(false);
		}
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
		createGame,
		getAllGames,
		onToggleGameFavoriteStatus,
		getModRequestsForGameCount
	};
};

export default useGameData;
