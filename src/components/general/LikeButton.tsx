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
	size?: "small" | "large";
};

const sizeToClass = {
	small: "w-4 h-4",
	large: "w-8 h-8"
};

const LikeButton: React.FC<LikeButtonProps> = ({
	modRequest,
	size = "small"
}) => {
	const [user] = useAuthState(auth);

	const { userDoc } = useUserDoc();

	const { onVote, hasUserLikedRequest } = useModRequests();

	const { id: requestID, requesterID } = modRequest;

	const userIsCreator = user?.uid === requesterID;

	// Can't vote on own post, or if not logged in.
	if (!user || userIsCreator || !userDoc) {
		return (
			<ThumbUpIconOutline
				className={`${sizeToClass[size]} ml-1 mt-1 mr-2 text-grey-600`}
			/>
		);
	}

	const userLikedRequest = hasUserLikedRequest(user, userDoc, requestID);

	const onHandleVote = async (e: React.MouseEvent) => {
		await onVote(modRequest, user, userDoc as UserDoc);
	};

	return !userLikedRequest ? (
		<ThumbUpIconOutline
			className={`${sizeToClass[size]} ml-1 mt-1 mr-2 cursor-pointer text-green-600 hover:text-green-500`}
			onClick={onHandleVote}
		/>
	) : (
		<ThumbUpIconSolid
			className={`${sizeToClass[size]} ml-1 mt-1 mr-2 cursor-pointer text-green-600 hover:text-green-500`}
			onClick={onHandleVote}
		/>
	);
};
export default LikeButton;
