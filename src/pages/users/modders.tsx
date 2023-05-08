import React, { useEffect, useState } from "react";
import { GetServerSidePropsContext } from "next";

import { useCollectionDataStatic } from "../../hooks/useCollectionDataStatic";
import { query, where } from "firebase/firestore";
import Button from "../../components/basic/Button";
import SimpleHeader from "../../components/general/SimpleHeader";
import ContentBody from "../../components/layout/ContentBody";
import ModderCard from "../../components/general/ModderCard";
import { UserDoc } from "../../types/docTypes";
import useFirebaseAPI from "../../hooks/useFirebaseAPI";
import Link from "next/link";
import { usersCol } from "../../firebase/collections";
import H1 from "../../components/basic/typography/H1";

type ModdersPageProps = {
	username?: string;
};

const ModdersPage: React.FC<ModdersPageProps> = ({ username }) => {
	const usersRef = usersCol;

	let modderQuery = query(usersRef, where("isActiveModder", "==", true));
	if (username) {
		modderQuery = query(modderQuery, where("displayName", "==", username));
	}

	const [totalCount, setTotalCount] = useState<number>();
	const { getCountForQuery } = useFirebaseAPI();

	const {
		data = [],
		dataVals = [] as UserDoc[],
		loadMore,
		fetching: loading,
		hasMore
	} = useCollectionDataStatic(modderQuery, 8);

	// On mount, grab the count of the unpaginated Query to display in header
	useEffect(() => {
		// Grab the count of completed and pending documents for this user
		try {
			(async () => {
				const count = await getCountForQuery(modderQuery);
				setTotalCount(count);
			})();
		} catch (err: any) {
			console.log("error in ModderCard useEffect", err);
		}
	}, []);

	return (
		<div>
			<SimpleHeader>
				<div className="flex w-100 justify-between items-center">
					<div className="flex flex-col text-3xl">
						<H1>Modders</H1>
						{username && (
							<span className="capitalize text-sm">
								Searching for User: {username}
							</span>
						)}
					</div>
					<div>
						{totalCount && <span>{totalCount}</span>}
						&nbsp;
						<span className="capitalize">Modders found</span>
					</div>
				</div>
			</SimpleHeader>
			<ContentBody>
				<div className="flex w-full flex-col py-10">
					<div className="flex-1">
						<div className="w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
							{dataVals.map((datum) => {
								const {
									uid,
									isActiveModder,
									displayName,
									photoURL
								} = datum;
								return (
									<ModderCard
										key={uid}
										{...{
											uid,
											isActiveModder,
											displayName,
											photoURL
										}}
									/>
								);
							})}
						</div>
						{!loading && dataVals.length === 0 && (
							<div className="w-full text-center">
								No Modders found! Try&nbsp;
								<Link
									href="/users/modders"
									className="text-violet-800 underline"
								>
									Browsing All Modders
								</Link>
								.
							</div>
						)}
						<div className="flex align-center justify-center mt-5">
							{hasMore && (
								<Button
									type="button"
									variant="blue"
									onClick={loadMore}
									disabled={!hasMore}
									{...{ loading }}
								>
									Load More
								</Button>
							)}
							{!hasMore && (
								<span className="text-gray-400">
									- End of Results -
								</span>
							)}
						</div>
					</div>
				</div>
			</ContentBody>
		</div>
	);
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const { query: { username = "" } = {} } = context || {};

	return {
		props: {
			username
		}
	};
}

export default ModdersPage;
