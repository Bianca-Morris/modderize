/**
 * Page for viewing all of the mod requests for a particular game
 */
import { doc, getDoc } from "@firebase/firestore";
import { GetServerSidePropsContext } from "next";
import { Head } from "next/document";
import React from "react";
import { firestore } from "../../../firebase/clientApp";
import safeJsonStringify from "safe-json-stringify";

import { ModRequest as ModRequestType } from "../../../types/docTypes";
import Button from "../../../components/basic/Button";
import SimpleHeader from "../../../components/general/SimpleHeader";
import {
	ArchiveBoxIcon,
	HandThumbDownIcon,
	HandThumbUpIcon,
	HeartIcon,
	PencilIcon,
	PlusIcon,
	WrenchIcon
} from "@heroicons/react/20/solid";
import CardsSearchResult_Modder from "https://framer.com/m/Cards-SearchResult-Modder-Ziap.js@EuFW80XbgjhlwQZxAi0n";
import ModRequest from "../../../components/general/ModRequest";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

type ModRequestPageProps = {
	modRequestData?: ModRequestType;
};

const ModRequestPage: React.FC<ModRequestPageProps> = ({ modRequestData }) => {
	console.log("modRequestData", modRequestData);
	if (!modRequestData) {
		return (
			<div className="flex min-h-screen flex-col item-center justify-start pb-2">
				<SimpleHeader>
					<div className="flex text-center text-3xl">
						<h1>Error: Mod Request Not Found</h1>
					</div>
				</SimpleHeader>
				<div className="w-full flex mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 gap-16">
					<div className="py-6">
						<h1 className="text-xl font-bold font-medium text-gray-900 mb-3">
							Sorry!
						</h1>
						<h2>This mod request doesn't seem to exist.</h2>
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
		modderStatus,
		completionStatus,
		lastModified,
		creationDate
	} = modRequestData || {};

	const hasBeenModified = lastModified?.seconds !== creationDate?.seconds;

	return (
		<div className="flex min-h-screen flex-col items-center justify-start pb-2">
			<SimpleHeader>
				<div className="flex text-center flex-col text-2xl">
					<h1>{title}</h1>
				</div>
			</SimpleHeader>
			<div className="w-full flex-col mt-10 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 gap-16">
				<div className="flex px-5 lg:px-0 w-full flex-col md:flex-row md:justify-between py-4">
					<div>
						<div>
							<Link
								className="underline text-indigo-800 hover:text-indigo-600"
								href={`/games/${gameID}`}
							>
								{gameDisplayName}
							</Link>
							&nbsp;&gt;&nbsp;
							<span className="font-bold">Mod Request</span>
						</div>
						<h2 className="text-3xl font-bold mb-4"></h2>
						<div>
							<strong>Requested By:</strong>
							<span className="ml-1">
								<Link
									href={`/users/${requesterID}`}
									className="underline text-indigo-800 hover:text-indigo-600"
								>
									{requesterDisplayName}
								</Link>
							</span>
							<span className="text-sm text-gray-400 pl-1">
								(
								{dayjs(
									new Date(creationDate?.seconds * 1000)
								).fromNow()}
								)
							</span>
						</div>
						{hasBeenModified && (
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
						<div className="flex flex-col justify-center p-3 w-20">
							<div className="flex justify-start align-center text-green-600">
								<HandThumbUpIcon className="w-4 h-4 ml-1 mt-1 mr-2" />
								3
							</div>
							<div className="flex justify-start align-center text-red-600">
								<HandThumbDownIcon className="w-4 h-4 mt-1 ml-1 mr-2" />
								0
							</div>
						</div>
					</div>
				</div>
				<hr />
				<div className="flex flex-col lg:flex-row px-5 lg:px-0 mt-10 justify-between gap-10">
					<div className="flex flex-auto flex-col">
						<div className="max-w-3xl">
							<h2 className="text-xl font-bold mb-5 font-bold">
								Mod Description:
							</h2>

							<p className="whitespace-pre-wrap">{description}</p>
						</div>
					</div>
					<div className="flex flex-1 flex-col gap-2">
						<div className="flex flex-col gap-0">
							<h3 className="text-xl font-bold bg-gray-200 p-4">
								Modder Info
							</h3>
							<div className="border border-gray-200 p-4">
								<div className="flex w-full items-center justify-center">
									No modder currently assigned to this
									project.
								</div>
							</div>
						</div>

						<div className="flex flex-col md:flex-row gap-0 md:gap-1 lg:gap-3">
							<Button
								type="button"
								variant="red"
								cls="flex-1 mt-4 bold"
							>
								<ArchiveBoxIcon className="w-4 h-4 mr-3" />
								Archive Request
							</Button>
							<Button
								type="button"
								variant="indigo"
								cls="flex-1 mt-4 bold"
							>
								<PencilIcon className="w-4 h-4 mr-3" />
								Edit Request
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const { query: { requestID = "" } = {} } = context || {};

	try {
		// Grab document for this mod request
		const modRequestRef = doc(
			firestore,
			"modRequests",
			requestID as string
		);
		const modRequestDoc = await getDoc(modRequestRef);

		return {
			props: {
				modRequestData: modRequestDoc.exists()
					? JSON.parse(
							safeJsonStringify({
								id: modRequestDoc.id,
								...modRequestDoc.data()
							})
					  )
					: null
			}
		};
	} catch (error) {
		// TODO: Create error page
		console.error("/requests/<id> getServerSideProps error", error);
		return null;
	}
}

export default ModRequestPage;
