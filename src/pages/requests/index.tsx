import { FunnelIcon } from "@heroicons/react/20/solid";
import { query, QueryConstraint, where } from "firebase/firestore";

import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Button from "../../components/basic/Button";
import H1 from "../../components/basic/typography/H1";
import H3 from "../../components/basic/typography/H3";
import ModRequestCard from "../../components/general/ModRequestCard";
import SimpleHeader from "../../components/general/SimpleHeader";
import ContentBody from "../../components/layout/ContentBody";
import Filters from "../../components/search/Filters";
import { modRequestsCol } from "../../firebase/collections";
import { modRequestConverter } from "../../firebase/converters";
import { useCollectionDataStatic } from "../../hooks/useCollectionDataStatic";
import useFirebaseAPI from "../../hooks/useFirebaseAPI";
import {
	CompletionStatus,
	ModderStatus,
	ModRequest
} from "../../types/docTypes";

type ModRequestPageProps = {
	id: string;
	gameID: string;
	modderID: string;
	requesterID: string;
	modderStatus: ModderStatus;
	completionStatus: CompletionStatus;
	hideFilters: string;
};

const ModRequestsPage: React.FC<ModRequestPageProps> = ({
	id,
	gameID,
	modderID,
	requesterID,
	completionStatus,
	modderStatus,
	hideFilters
}) => {
	let constraints: QueryConstraint[] = [];

	// Populate list of constraints for query
	if (id) {
		constraints.push(where("id", "==", id));
	}
	if (gameID) {
		constraints.push(where("gameID", "==", gameID));
	}
	if (modderID) {
		constraints.push(where("modderID", "==", modderID));
	}
	if (requesterID) {
		constraints.push(where("requesterID", "==", requesterID));
	}
	if (modderStatus) {
		constraints.push(where("modderStatus", "==", modderStatus));
	}
	if (completionStatus) {
		constraints.push(where("completionStatus", "==", completionStatus));
	}

	// Create query, and convert to version of mod request with ID
	const q = query(modRequestsCol, ...constraints).withConverter(
		modRequestConverter
	);

	// Keep track of the total count
	const [totalCount, setTotalCount] = useState<number>();
	const { getCountForQuery } = useFirebaseAPI();

	const {
		data = [],
		dataVals = [] as ModRequest[],
		loadMore,
		fetching: loading,
		hasMore
	} = useCollectionDataStatic(q, 10);

	// On mount, grab the count of the unpaginated Query to display in header
	useEffect(() => {
		// Grab the count of completed and pending documents for this user
		try {
			(async () => {
				const count = await getCountForQuery(q);
				setTotalCount(count);
			})();
		} catch (err: any) {
			console.log("error in ModderCard useEffect", err);
		}
	}, []);

	const noFilters = hideFilters === "true";

	return (
		<div>
			<SimpleHeader>
				<div className="flex w-100 justify-between items-center">
					<div className="flex flex-col text-3xl">
						<H1>Mod Requests</H1>
					</div>
					<div>
						<span>{totalCount}</span>
						&nbsp;
						<span className="capitalize">Mod Requests found</span>
					</div>
				</div>
			</SimpleHeader>
			<ContentBody>
				<div className="grid grid-cols-3 w-full py-10 gap-5">
					{!noFilters && (
						<div className="col-span-3 lg:col-span-1">
							<H3 cls="mb-3 flex flex-row gap-1 items-center text-gray-900">
								<FunnelIcon className="w-5 h-5 fill-gray-800" />{" "}
								Filters:
							</H3>
							{
								<Filters
									{...{
										gameID,
										modderStatus,
										completionStatus,
										id,
										requesterID,
										modderID
									}}
								/>
							}
						</div>
					)}
					<div
						className={`col-span-3 ${
							noFilters ? "" : "lg:col-span-2"
						} flex flex-col gap-3 pt-10`}
					>
						{dataVals.map((modRequest) => {
							// console.log("modRequest", modRequest);
							const { requesterDisplayName } = modRequest;
							return (
								<ModRequestCard
									key={modRequest.id}
									modRequest={modRequest as ModRequest}
									subTitle={
										<div>
											<strong>Requested By:</strong>&nbsp;
											{requesterDisplayName}
										</div>
									}
								/>
							);
						})}
						{!loading && dataVals.length === 0 && (
							<div className="w-full text-center">
								No Mod Requests found! Try&nbsp;
								<Link
									href="/requests"
									className="text-violet-800 underline"
								>
									Browsing All Mods
								</Link>
								.
							</div>
						)}
						{hasMore && (
							<Button
								type="button"
								variant="blue"
								cls="mx-auto"
								onClick={loadMore}
								disabled={!hasMore}
								{...{ loading }}
							>
								Load More
							</Button>
						)}
						{!hasMore && (
							<span className="text-gray-400 mx-auto text-center my-10">
								- End of Results -
							</span>
						)}
					</div>
				</div>
			</ContentBody>
		</div>
	);
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const {
		query: {
			id = "",
			gameID = "",
			modderID = "",
			requesterID = "",
			completionStatus = "",
			modderStatus = "",
			hideFilters = ""
		} = {}
	} = context || {};

	return {
		props: {
			id,
			gameID,
			modderID,
			requesterID,
			completionStatus,
			modderStatus,
			hideFilters
		}
	};
}

export default ModRequestsPage;
