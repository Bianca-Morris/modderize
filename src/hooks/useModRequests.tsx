import React from "react";
import { useRecoilState } from "recoil";
import { modRequestState } from "../atoms/modRequestAtom";

const useModRequests = () => {
	const [modRequestStateValue, setModRequestStateValue] =
		useRecoilState(modRequestState);

	const onVote = async () => {
		// TODO
	};

	const onSelectModRequest = () => {
		// TODO
	};

	const onDeleteModRequest = async () => {
		// TODO
	};

	return {
		modRequestStateValue,
		setModRequestStateValue,
		onVote,
		onSelectModRequest,
		onDeleteModRequest
	};
};

export default useModRequests;
