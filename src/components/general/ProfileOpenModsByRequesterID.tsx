import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection, limit, orderBy, query, where } from "firebase/firestore";
import Link from "next/link";

import { auth, db } from "../../firebase/clientApp";
import { modRequestConverter } from "../../helpers/converters";
import ModRequestShort from "./ModRequest";
import ModRequestLoader from "./ModRequestLoader";

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

	const modRequestQuery = query(
		coll,
		where("requesterID", "==", requesterID),
		orderBy("creationDate", "asc"),
		limit(5)
	);

	const [docs = [], loading, error, snapshot] = useCollectionData(
		modRequestQuery,
		{}
	);

	if (!user) {
		return null;
	}

	return (
		<div>
			{loading && <ModRequestLoader />}
			{!loading && docs.length === 0 && (
				<div>
					No open mod requests.{" "}
					{user && user.uid === requesterID && (
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
			)}
			{docs.map((doc) => (
				<ModRequestShort
					key={doc.id}
					subTitle={"submittedBy"}
					modRequest={doc}
					userIsCreator
				/>
			))}
		</div>
	);
};
export default ProfileOpenModsByRequesterID;
