import { UserIcon } from "@heroicons/react/20/solid";
import { collection, query, where, writeBatch } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { db } from "../../firebase/clientApp";
import useFirebaseAPI from "../../hooks/useFirebaseAPI";
import Button from "../basic/Button";

type ModderCardProps = {
	displayName: string;
	uid: string;
	photoURL?: string;
	isActiveModder: boolean;
};

const ModderCard: React.FC<ModderCardProps> = ({
	displayName,
	uid,
	photoURL,
	isActiveModder
}) => {
	const router = useRouter();

	const onRequestMod = useCallback(() => {
		router.push(`/users/${uid}/userModRequest`);
	}, [uid]);

	const { getCountForQuery } = useFirebaseAPI();

	const [completed, setCompleted] = useState<number>();
	const [pending, setPending] = useState<number>();

	useEffect(() => {
		// Grab the count of completed and pending documents for this user
		// Maybe would be better to do in a batch?
		try {
			const modCollection = collection(db, "modRequests");
			const completedModCountQ = query(
				modCollection,
				where("modderID", "==", uid),
				where("completionStatus", "==", "complete")
			);
			const pendingModCountQ = query(
				modCollection,
				where("modderID", "==", uid),
				where("completionStatus", "==", "in progress")
			);
			(async () => {
				const completedCount = await getCountForQuery(
					completedModCountQ
				);
				const pendingCount = await getCountForQuery(pendingModCountQ);
				setCompleted(completedCount);
				setPending(pendingCount);
			})();
		} catch (err: any) {
			console.log("error in ModderCard useEffect", err);
		}
	}, []);

	return (
		<div className="flex flex-col justify-center items-center align-center p-5 gap-3">
			<div>
				{photoURL ? (
					<img
						src={photoURL}
						className="shadow-xl rounded-full align-middle border-none h-52 w-52"
					/>
				) : (
					<div className="shadow-xl bg-gray-300 rounded-full h-52 w-52 align-middle border-none flex items-center justify-center">
						<UserIcon className="h-32 w-32 fill-gray-400" />
					</div>
				)}
			</div>
			<div className="w-full p-3 m-2">
				<h2 className=" text-2xl font-bold text-center mb-2 truncate">
					{displayName}
				</h2>
				<div className="text-green-800">
					<strong className="font-bold pr-2">Completed:</strong>
					{completed}
				</div>
				<div className="text-blue-800 mb-3">
					<strong className="font-bold pr-2">Pending:</strong>
					{pending}
				</div>
				<Button
					type="button"
					variant="violet"
					cls="w-full"
					disabled={!isActiveModder}
					onClick={onRequestMod}
				>
					{isActiveModder ? "Request Mod" : "Not Taking Requests"}
				</Button>
			</div>
		</div>
	);
};
export default ModderCard;
