/**
 * Page for viewing all of the mod requests for a particular game
 */
import React from "react";
import { doc, DocumentReference } from "@firebase/firestore";
import { GetServerSidePropsContext } from "next";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
	ArchiveBoxIcon,
	PencilIcon,
	WrenchScrewdriverIcon
} from "@heroicons/react/20/solid";

import { auth, db } from "../../../firebase/clientApp";
import { ModRequest as ModRequestType } from "../../../types/docTypes";
import Button from "../../../components/basic/Button";
import SimpleHeader from "../../../components/general/SimpleHeader";
import useModRequests from "../../../hooks/useModRequests";
import LikeButton from "../../../components/general/LikeButton";
import { modRequestConverter } from "../../../firebase/converters";
import A from "../../../components/basic/A";
import H1 from "../../../components/basic/typography/H1";
import H2 from "../../../components/basic/typography/H2";
import H3 from "../../../components/basic/typography/H3";

dayjs.extend(relativeTime);

type ModRequestPageProps = {
	requestID: string;
};

const ModRequestPage: React.FC<ModRequestPageProps> = ({ requestID }) => {
	const [user] = useAuthState(auth);

	// Grab document for this mod request
	const modRequestRef = doc(
		db,
		"modRequests",
		requestID || "placeholder"
	).withConverter(modRequestConverter);
	const [modRequestData, loading, error, snapshot] = useDocumentData(
		modRequestRef as DocumentReference<ModRequestType>
	);

	const {
		assignModRequestToSelf,
		withdrawFromModRequest,
		loading: requestLoading
	} = useModRequests();

	if (!loading && !modRequestData) {
		return (
			<div className="flex min-h-screen flex-col item-center justify-start pb-2">
				<SimpleHeader>
					<div className="flex text-center">
						<H1>Error: Mod Request Not Found</H1>
					</div>
				</SimpleHeader>
				<div className="w-full flex mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 gap-16">
					<div className="py-6">
						<H1 cls="text-xl font-bold font-medium text-gray-900 mb-3">
							Sorry!
						</H1>
						<H2>This mod request doesn't seem to exist.</H2>
						<p>It may have been archived or deleted.</p>
					</div>
				</div>
			</div>
		);
	}

	const {
		id,
		title,
		description,
		imageURL,
		requesterDisplayName,
		requesterID,
		gameID,
		gameDisplayName,
		modderID,
		modderStatus,
		modderDisplayName,
		modderProfileImageURL,
		voteStatus,
		completionStatus,
		lastModified,
		creationDate
	} = modRequestData || {};

	const hasBeenModified = lastModified?.seconds !== creationDate?.seconds;

	const isRequester = requesterID === user?.uid;
	const isModder = modderID === user?.uid;
	const noModderAssigned = !modderID && modderStatus === "open";
	const modderAssignedButNotConfirmed =
		modderID && modderStatus === "requested";
	const modderAssigned = modderID && modderStatus === "accepted";

	return (
		<div className="flex min-h-screen flex-col items-center justify-start pb-2">
			<SimpleHeader>
				<div className="flex text-center flex-col">
					<H1>{title}</H1>
				</div>
			</SimpleHeader>
			<div className="w-full flex-col mt-10 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 gap-16">
				<div className="flex px-5 lg:px-0 w-full flex-col md:flex-row md:justify-between py-4">
					<div>
						<div>
							<A variant="indigo" href={`/games/${gameID}`}>
								{gameDisplayName}
							</A>
							&nbsp;&gt;&nbsp;
							<span className="font-bold">Mod Request</span>
						</div>
						<H2 cls="text-3xl font-bold mb-4"></H2>
						<div>
							<strong>Requested By:</strong>
							<span className="ml-1">
								<A
									href={`/users/${requesterID}`}
									variant="indigo"
								>
									{requesterDisplayName}
								</A>
							</span>
							{creationDate && (
								<span className="text-sm text-gray-400 pl-1">
									{dayjs(
										new Date(creationDate?.seconds * 1000)
									).fromNow()}
								</span>
							)}
						</div>
						{lastModified && hasBeenModified && (
							<div>
								<strong>Last Modified:</strong>
								<span className="ml-1">
									{dayjs(
										new Date(lastModified?.seconds * 1000)
									).fromNow()}
								</span>
							</div>
						)}
						<div>
							<strong>Status:</strong>
							<span className="ml-1 capitalize">
								{completionStatus}
							</span>
						</div>
					</div>
					<div className="flex align-center">
						<div className="flex justify-center p-3 w-20 text-green-600">
							{modRequestData && (
								<LikeButton modRequest={modRequestData} />
							)}
							{voteStatus}
						</div>
					</div>
				</div>
				<hr />
				<div className="flex flex-col lg:flex-row px-5 lg:px-0 mt-10 justify-between gap-10">
					<div className="flex flex-col">
						<div className="max-w-2xl">
							<H2 cls="mb-5">Mod Description:</H2>

							<p className="whitespace-pre-wrap">{description}</p>
						</div>
					</div>
					<div className="flex flex-1 flex-col gap-2">
						<div className="flex flex-col gap-0">
							<H3 cls="bg-gray-200 p-4">Modder Info</H3>
							<div className="border border-gray-200 p-4">
								<div className="flex w-full items-center justify-center gap-5">
									{!modderID && (
										<>
											No modder currently assigned to this
											project.
										</>
									)}
									{modderProfileImageURL && (
										<img
											src={modderProfileImageURL}
											className="shadow-xl rounded-full align-middle border-none h-12 w-12"
										></img>
									)}
									<div>
										{modderID && modderDisplayName && (
											<div>
												<strong>Assigned to:</strong>
												<span className="ml-1">
													<A
														href={`/users/${modderID}`}
														variant="indigo"
													>
														{modderDisplayName}
													</A>
												</span>
											</div>
										)}
										{modderAssignedButNotConfirmed && (
											<div>
												<strong>Status:</strong>
												<span className="ml-1">
													Requested
												</span>
											</div>
										)}
										{modderAssigned && (
											<div>
												<strong>Status:</strong>
												<span className="ml-1">
													Accepted
												</span>
											</div>
										)}
									</div>
								</div>
							</div>
						</div>

						<div className="flex flex-col justify-center md:flex-row gap-0 md:gap-1 lg:gap-3">
							{isRequester && (
								<Button
									type="button"
									variant="red"
									cls="flex-1 mt-4 bold"
								>
									<ArchiveBoxIcon className="w-4 h-4 mr-3" />
									Archive Request
								</Button>
							)}
							{isRequester && (
								<Button
									type="button"
									variant="indigo"
									cls="flex-1 mt-4 bold"
								>
									<PencilIcon className="w-4 h-4 mr-3" />
									Edit Request
								</Button>
							)}
							{!!user &&
								!isRequester &&
								(noModderAssigned ||
									modderAssignedButNotConfirmed) && (
									<Button
										type="button"
										variant="blue"
										cls="flex-1 mt-4 bold"
										onClick={
											!modRequestData
												? undefined
												: () =>
														assignModRequestToSelf(
															modRequestData
														)
										}
									>
										<WrenchScrewdriverIcon className="w-4 h-4 mr-3" />
										Work on This Request
									</Button>
								)}
							{isModder && modderAssigned && (
								<Button
									type="button"
									variant="red"
									cls="flex-1 mt-4 bold"
									onClick={() =>
										withdrawFromModRequest(requestID)
									}
								>
									<ArchiveBoxIcon className="w-4 h-4 mr-3" />
									Withdraw
								</Button>
							)}
							{isModder && modderAssignedButNotConfirmed && (
								<Button
									type="button"
									variant="red"
									cls="flex-1 mt-4 bold"
									onClick={() =>
										withdrawFromModRequest(requestID)
									}
								>
									<ArchiveBoxIcon className="w-4 h-4 mr-3" />
									Refuse Request
								</Button>
							)}
							{isModder && modderAssigned && (
								<Button
									type="button"
									variant="indigo"
									cls="flex-1 mt-4 bold"
								>
									<PencilIcon className="w-4 h-4 mr-3" />
									Complete Request
								</Button>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const { query: { requestID = "" } = {} } = context || {};

	return {
		props: {
			requestID
		}
	};
}

export default ModRequestPage;
