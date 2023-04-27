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
import { GameSnippet } from "../atoms/gamesAtom";
import { searchState } from "../atoms/searchAtom";
import { auth, db } from "../firebase/clientApp";
import { Game } from "../types/docTypes";

const useSearchData = () => {
	const [user] = useAuthState(auth);
	const [searchStateValue, setSearchStateValue] = useRecoilState(searchState);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const getAllGames = async () => {
		setLoading(true);

		const querySnapshot = await getDocs(collection(db, "games"));
		const gamesArr = [] as Game[];

		querySnapshot.forEach((doc) => {
			// doc.data() is never undefined for query doc snapshots
			const thisGame = {
				id: doc.id,
				...doc.data()
			} as Game;
			gamesArr.push(thisGame);
		});

		setSearchStateValue((prev) => ({
			...prev,
			games: gamesArr
		}));

		setLoading(false);

		console.log("getAllGames result", gamesArr);
	};

	return {
		getAllGames,
		loading
	};
};

export default useSearchData;
