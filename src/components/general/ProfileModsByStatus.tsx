import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection, limit, orderBy, query, where } from "firebase/firestore";

import { auth, db } from "../../firebase/clientApp";
import { modRequestConverter } from "../../helpers/converters";
import ModRequestShort from "./ModRequest";
import ModRequestLoader from "./ModRequestLoader";
import Link from "next/link";
import useModRequests from "../../hooks/useModRequests";

type ProfileModsByStatusProps = {
	status: "in progress" | "complete" | "archived";
	modderID: string;
};

const statusToNoneAvailableString = {
	"in progress": "No mods currently in progress.",
	complete: "No mods completed."
};

const ProfileModsByStatus: React.FC<ProfileModsByStatusProps> = ({
	status,
	modderID
}) => {
	const [user] = useAuthState(auth);
	const coll = collection(db, "modRequests").withConverter(
		modRequestConverter
	);

	const modRequestQuery = query(
		coll,
		where("modderID", "==", modderID),
		where("modderStatus", "==", "accepted"),
		where("completionStatus", "==", status),
		orderBy("creationDate", "desc"),
		limit(5)
	);

	const [docs = [], loading, error, snapshot] = useCollectionData(
		modRequestQuery,
		{}
	);

	return (
		<div>
			{loading && <ModRequestLoader />}
			{!loading && docs.length === 0 && (
				<div>
					{statusToNoneAvailableString[status]}{" "}
					{user && user.uid === modderID && (
						<>
							<Link
								href="/requests" // @TODO write out complete URL
								className="text-violet-700 underline"
							>
								Click here
							</Link>{" "}
							to browse open requests.
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
export default ProfileModsByStatus;
