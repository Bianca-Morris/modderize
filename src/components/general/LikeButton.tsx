import React, { useCallback } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import { HandThumbUpIcon as ThumbUpIconSolid } from "@heroicons/react/20/solid";
import { HandThumbUpIcon as ThumbUpIconOutline } from "@heroicons/react/24/outline";

import { userDocAtom } from "../../atoms/userDocAtom";
import { auth } from "../../firebase/clientApp";
import useModRequests from "../../hooks/useModRequests";
import { ModRequest, UserDoc } from "../../types/docTypes";
import useUserDoc from "../../hooks/useUserDoc";

type LikeButtonProps = {
	modRequest: ModRequest;
};

const LikeButton: React.FC<LikeButtonProps> = ({ modRequest }) => {
	const [user] = useAuthState(auth);

	// const [userDocState, setUserDocState] = useRecoilState(userDocAtom);
	// const { currentUserDoc: userDoc } = userDocState;
	const { userDoc } = useUserDoc();

	const { onVote, hasUserLikedRequest } = useModRequests();

	const { id: requestID, requesterID } = modRequest;

	const userIsCreator = user?.uid === requesterID;
	const userLikedRequest = hasUserLikedRequest(user, userDoc, requestID);
	console.log("like button user, userDoc", user, userDoc);

	const onHandleVote = async (e: React.MouseEvent) => {
		console.log("onHandleVote user, userDoc", user, userDoc);
		await onVote(modRequest, user, userDoc as UserDoc);

		// // Do some temporary state updates
		// setCount(liked ? voteStatus - 1 : voteStatus + 1);
		// setLiked(!liked);
	};

	// Can't vote on own post, or if not logged in.
	if (!user || userIsCreator) {
		return <ThumbUpIconOutline className={`w-4 h-4 ml-1 mt-1 mr-2`} />;
	}

	return !userLikedRequest ? (
		<ThumbUpIconOutline
			className="w-4 h-4 ml-1 mt-1 mr-2 cursor-pointer"
			onClick={onHandleVote}
		/>
	) : (
		<ThumbUpIconSolid
			className="w-4 h-4 ml-1 mt-1 mr-2 cursor-pointer"
			onClick={onHandleVote}
		/>
	);
};
export default LikeButton;
