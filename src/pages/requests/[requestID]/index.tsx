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
	HandThumbDownIcon,
	HandThumbUpIcon,
	HeartIcon,
	PlusIcon,
	WrenchIcon
} from "@heroicons/react/20/solid";
import CardsSearchResult_Modder from "https://framer.com/m/Cards-SearchResult-Modder-Ziap.js@EuFW80XbgjhlwQZxAi0n";
import ModRequest from "../../../components/general/ModRequest";
import Link from "next/link";

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

	return (
		<div className="flex min-h-screen flex-col items-center justify-start pb-2">
			<SimpleHeader>
				<div className="flex text-center flex-col text-2xl">
					<h1>Mod Request</h1>
				</div>
			</SimpleHeader>
			<div className="w-full flex-col mt-10 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 gap-16">
				<div className="flex w-full justify-between py-4">
					<div>
						<h2 className="text-3xl font-bold mb-4">{title}</h2>
						<div>
							<strong>Requested By:</strong>
							<span className="ml-1">
								<Link href={`/users/${requesterID}`}>
									{requesterDisplayName}
								</Link>
							</span>
						</div>
						<div>
							<strong>Requested for:</strong>
							<span className="ml-1">
								<Link href={`/games/${gameID}`}>
									{gameDisplayName}
								</Link>
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
				<div className="flex flex-auto mt-10">
					<div className="flex flex-col gap-3">
						<div>
							<strong>Status:</strong>
							<span className="ml-1 capitalize">
								{completionStatus}
							</span>
						</div>
						<div>
							<strong>Date Requested:</strong>
							<span className="ml-1"></span>
						</div>
						<div>
							<strong>Last Modified:</strong>
							<span className="ml-1"></span>
						</div>
						<div>
							<strong>Mod Description:</strong>
							<div></div>
						</div>
						<p className="whitespace-pre-wrap">{description}</p>
					</div>
					<div>
						<CardsSearchResult_Modder />
					</div>
				</div>

				{/* <div className="flex flex-col flex-auto my-5">
					<h3 className="text-xl font-bold p-4">
						Most Recent Mod Requests for "{`{gameDisplayTitle}`}"
					</h3>
					<div className="flex">
						<div className="flex flex-col w-full">
							{/* <ModRequest
								numUpvotes={1}
								numDownvotes={0}
								title="A Very Hardcore Difficulty Mod"
								subTitle={
									<div>
										<span className="font-medium mr-1">
											Requested By:
										</span>
										CoolGirl54
									</div>
								}
							/>
							<ModRequest
								numUpvotes={0}
								numDownvotes={0}
								title="Another Exciting Mod"
								subTitle={
									<div>
										<span className="font-medium mr-1">
											Requested By:
										</span>
										SomeoneOnTheInterwebz
									</div>
								}
							/>
							<ModRequest
								numUpvotes={4}
								numDownvotes={1}
								title="Something To Make My Game More Fun"
								subTitle={
									<div>
										<span className="font-medium mr-1">
											Requested By:
										</span>
										FancyBoi222
									</div>
								}
							/>
						</div>
						<div className="flex flex-col w-full">
							<ModRequest
								numUpvotes={12}
								numDownvotes={1}
								title="Mo Vampires, Mo Problems"
								subTitle={
									<div>
										<span className="font-medium mr-1">
											Requested By:
										</span>
										VaMpIreL@d
									</div>
								}
							/>
							<ModRequest
								numUpvotes={0}
								numDownvotes={0}
								title="Another Exciting Mod"
								subTitle={
									<div>
										<span className="font-medium mr-1">
											Requested By:
										</span>
										SomeoneOnTheInterwebz
									</div>
								}
							/>
							<ModRequest
								numUpvotes={4}
								numDownvotes={1}
								title="Something To Make My Game More Fun"
								subTitle={
									<div>
										<span className="font-medium mr-1">
											Requested By:
										</span>
										FancyBoi222
									</div>
								}
							/>
						</div>
					</div>
				</div> */}
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
