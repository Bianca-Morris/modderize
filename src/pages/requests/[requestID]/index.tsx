/**
 * Page for viewing all of the mod requests for a particular game
 */
import React from "react";
import { doc, DocumentReference } from "@firebase/firestore";
import { GetServerSidePropsContext } from "next";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
	ArchiveBoxIcon,
	PencilIcon,
	ShareIcon,
	TrashIcon,
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
import SharePopover from "../../../components/general/SharePopover";
import { useRecoilValue } from "recoil";
import { gameAtom } from "../../../atoms/gamesAtom";
import { useRouter } from "next/router";
import GameInfoPanel from "../../../components/general/GameInfoPanel";
import ModderInfoPanel from "../../../components/general/ModderInfoPanel";
import ModInfoPanel from "../../../components/general/ModInfoPanel";
import Alert from "../../../components/basic/Alert";
import ErrorPage from "../../../errors/ErrorPage";

dayjs.extend(relativeTime);

type ModRequestPageProps = {
	requestID: string;
};

const ModRequestPage: React.FC<ModRequestPageProps> = ({ requestID }) => {
	const [user] = useAuthState(auth);
	const router = useRouter();

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
		deleteOwnModRequest,
		assignModRequestToSelf,
		withdrawFromModRequest,
		loading: requestLoading
	} = useModRequests();

	if (!loading && !modRequestData) {
		return (
			<ErrorPage
				header1="Error: Mod Request Not Found"
				header2="Sorry!"
				header3="This mod request doesn't seem to exist."
				paragraph="It may have been archived or deleted."
			/>
		);
	} else if (error) {
		return (
			<ErrorPage
				header1="Error: Something went wrong!"
				header2="Sorry!"
				header3="We're not sure what happened."
				paragraph={"Admin code: " + error.message}
			/>
		);
	}

	const {
		title,
		description,
		imageURL = "",
		requesterDisplayName,
		requesterID,
		gameID,
		gameDisplayName,
		modderID = "",
		modderStatus,
		modderDisplayName,
		modderProfileImageURL,
		voteStatus,
		completionStatus,
		lastModified,
		creationDate,
		modURL = "",
		modderNotes = ""
	} = modRequestData || {};

	const hasBeenModified = lastModified?.seconds !== creationDate?.seconds;

	const isRequester = requesterID === user?.uid;
	const isModder = modderID === user?.uid;
	const noModderAssigned = !modderID && modderStatus === "open";
	const modderAssignedButNotConfirmed =
		!!modderID && !!(modderStatus === "requested");
	const modderAssigned = !!modderID && !!(modderStatus === "accepted");

	const isModComplete = completionStatus === "complete";

	const onDeleteModRequest = async () => {
		if (!requesterID) {
			return;
		}
		await deleteOwnModRequest(requestID, requesterID);
		router.back();
	};

	return (
		<div className="flex min-h-screen flex-col items-center justify-start pb-2">
			<SimpleHeader>
				<div className="flex text-center flex-col">
					{/* <H1>Mod Request</H1> */}
				</div>
			</SimpleHeader>
			<div className="w-full flex-col mt-10 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 gap-16">
				<div className="flex px-5 lg:px-0 w-full gap-5 flex-col sm:flex-row justify-between items-center py-4">
					<div>
						<A variant="indigo" href={`/games/${gameID}`}>
							{gameDisplayName}
						</A>
						&nbsp;&gt;&nbsp;
						<span className="font-semibold">Mod Request</span>
					</div>
					<div className="flex align-center justify-center items-center">
						<div className="flex justify-center mb-2 pr-3 w-20 text-green-600">
							{modRequestData && (
								<LikeButton
									modRequest={modRequestData}
									size="large"
								/>
							)}
						</div>

						<div className="flex justify-center">
							<SharePopover
								url={`www.modderize.me/requests/${requestID}`}
							>
								<ShareIcon className="h-8 w-8 cursor-pointer hover:fill-indigo-300" />
							</SharePopover>
						</div>
					</div>
				</div>
				<hr />
				<div className="grid grid-cols-3 gap-5 mt-8">
					<div className="flex flex-col col-span-3 lg:col-span-2">
						<div className="">
							{modderNotes && (
								<Alert
									showIcon
									iconType="info"
									variant="info"
									title="Notes from Modder: "
									subtitle={modderNotes}
								/>
							)}
							<H2 cls="text-3xl font-bold mb-4">{title}</H2>

							<p className="whitespace-pre-wrap">{description}</p>

							<hr className="my-10" />

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
											new Date(
												creationDate?.seconds * 1000
											)
										).fromNow()}
									</span>
								)}
							</div>
							{lastModified && hasBeenModified && (
								<div>
									<strong>Last Modified:</strong>
									<span className="ml-1">
										{dayjs(
											new Date(
												lastModified?.seconds * 1000
											)
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
					</div>
					<div className="flex flex-1 flex-col gap-2 col-span-3 lg:col-span-1">
						{isModComplete && (
							<ModInfoPanel {...{ imageURL, modURL, modderID }} />
						)}
						<ModderInfoPanel
							{...{
								isModComplete,
								modderAssigned,
								modderAssignedButNotConfirmed,
								modderDisplayName,
								modderID,
								modderProfileImageURL
							}}
						/>
						{gameDisplayName && gameID && (
							<GameInfoPanel {...{ gameDisplayName, gameID }} />
						)}

						<div className="flex flex-col justify-center md:flex-row gap-0 md:gap-1 lg:gap-3">
							{user && isRequester && (
								<Button
									type="button"
									variant="red"
									cls="flex-1 mt-4 bold"
									onClick={onDeleteModRequest}
								>
									<TrashIcon className="w-4 h-4 mr-3" />
									Delete Request
								</Button>
							)}
							{user && isRequester && !isModComplete && (
								<Button
									type="button"
									variant="indigo"
									cls="flex-1 mt-4 bold"
									onClick={() =>
										router.push(
											`/requests/${requestID}/editAsRequester`
										)
									}
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
							{isModder && modderAssigned && !isModComplete && (
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
							{isModder && modderAssigned && !isModComplete && (
								<Button
									type="button"
									variant="indigo"
									cls="flex-1 mt-4 bold"
									onClick={() =>
										router.push(
											`/requests/${requestID}/editAsRequestee`
										)
									}
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
