import React, { useCallback } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, limit, orderBy, query, where } from "firebase/firestore";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { auth, db } from "../../firebase/clientApp";
import { modRequestConverter } from "../../helpers/converters";
import ModRequestList from "./ModRequestList";
import { ModRequest } from "../../types/docTypes";

dayjs.extend(relativeTime);

type ProfileOpenModsByRequesterIDProps = {
	requesterID: string;
};

const ProfileOpenModsByRequesterID: React.FC<
	ProfileOpenModsByRequesterIDProps
> = ({ requesterID }) => {
	const [user] = useAuthState(auth);

	const coll = collection(db, "modRequests").withConverter(
		modRequestConverter
	);

	const userIsRequester = user && user.uid === requesterID;
	const modRequestQuery = query(
		coll,
		where("requesterID", "==", requesterID),
		orderBy("creationDate", "asc"),
		limit(5)
	);

	const noResultsRenderFx = useCallback(
		() => (
			<div>
				No open mod requests.{" "}
				{userIsRequester && (
					<>
						<Link
							href="/games"
							className="text-violet-700 underline"
						>
							Click here
						</Link>{" "}
						to get started.
					</>
				)}
			</div>
		),
		[userIsRequester]
	);

	const subtitleRenderFx = useCallback((mr: ModRequest) => {
		const { lastModified, creationDate } = mr;

		if (!lastModified.isEqual(creationDate)) {
			return (
				<>
					<span className="font-medium mr-1">Updated:</span>{" "}
					{dayjs(new Date(lastModified?.seconds * 1000)).fromNow()}
				</>
			);
		}

		return (
			<>
				<span className="font-medium mr-1">Created:</span>{" "}
				{dayjs(new Date(creationDate?.seconds * 1000)).fromNow()}
			</>
		);
	}, []);

	return (
		<div>
			<ModRequestList
				query={modRequestQuery}
				{...{ noResultsRenderFx, subtitleRenderFx }}
			/>
		</div>
	);
};
export default ProfileOpenModsByRequesterID;
