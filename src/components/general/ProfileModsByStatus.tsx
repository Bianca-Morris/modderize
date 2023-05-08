import React, { useCallback } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { limit, orderBy, query, where } from "firebase/firestore";

import { auth } from "../../firebase/clientApp";
import { modRequestConverter } from "../../firebase/converters";
import Link from "next/link";
import ModRequestList from "./ModRequestList";
import { modRequestsCol } from "../../firebase/collections";
import A from "../basic/A";

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
	const coll = modRequestsCol.withConverter(modRequestConverter);

	const modRequestQuery = query(
		coll,
		where("modderID", "==", modderID),
		where("modderStatus", "==", "accepted"),
		where("completionStatus", "==", status),
		orderBy("creationDate", "desc"),
		limit(5)
	);

	const noResultsRenderFx = useCallback(
		() => (
			<div>
				{statusToNoneAvailableString[status]}{" "}
				{user && user.uid === modderID && (
					<>
						<A href="/requests?modderStatus=open" variant="violet">
							Click here
						</A>{" "}
						to browse open requests.
					</>
				)}
			</div>
		),
		[]
	);

	return (
		<div>
			<ModRequestList
				query={modRequestQuery}
				noResultsRenderFx={noResultsRenderFx}
			/>
		</div>
	);
};
export default ProfileModsByStatus;
