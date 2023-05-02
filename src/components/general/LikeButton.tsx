import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { HandThumbUpIcon as ThumbUpIconSolid } from "@heroicons/react/20/solid";
import { HandThumbUpIcon as ThumbUpIconOutline } from "@heroicons/react/24/outline";

import { auth } from "../../firebase/clientApp";
import useModRequests from "../../hooks/useModRequests";
import { ModRequest, UserDoc } from "../../types/docTypes";
import useUserDoc from "../../hooks/useUserDoc";

type LikeButtonProps = {
	modRequest: ModRequest;
};

const LikeButton: React.FC<LikeButtonProps> = ({ modRequest }) => {
	const [user] = useAuthState(auth);

	const { userDoc } = useUserDoc();

	const { onVote, hasUserLikedRequest } = useModRequests();

	const { id: requestID, requesterID } = modRequest;

	const userIsCreator = user?.uid === requesterID;
	const userLikedRequest = hasUserLikedRequest(user, userDoc, requestID);

	const onHandleVote = async (e: React.MouseEvent) => {
		await onVote(modRequest, user, userDoc as UserDoc);
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
