import React from "react";
import { useRecoilState } from "recoil";
import { modRequestState } from "../atoms/modRequestAtom";

const useModRequests = () => {
	const [modRequestStateValue, setModRequestStateValue] =
		useRecoilState(modRequestState);

	const onVote = async () => {};

	const onSelectModRequest = async () => {};

	const onDeletePost = async () => {};

	return {
		modRequestStateValue,
		setModRequestStateValue,
		onVote,
		onSelectModRequest,
		onDeletePost
	};
};

export default useModRequests;
