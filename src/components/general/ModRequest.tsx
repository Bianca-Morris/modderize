import {
	HandThumbDownIcon as ThumbDownIconSolid,
	HandThumbUpIcon as ThumbUpIconSolid
} from "@heroicons/react/20/solid";
import {
	HandThumbDownIcon as ThumbDownIconOutline,
	HandThumbUpIcon as ThumbUpIconOutline
} from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { ReactElement, useState } from "react";
import { ModRequest } from "../../types/docTypes";

type ModRequestShortProps = {
	numUpvotes?: number;
	numDownvotes?: number;
	title: string | ReactElement;
	subTitle: string | ReactElement;
	userVoteValue?: number;
	modRequest: ModRequest;
	userIsCreator: boolean;
	onVote: () => {};
	onDeleteModRequest: () => {};
	onSelectModRequest: () => void;
	cls: string;
};

const ModRequestShort: React.FC<ModRequestShortProps> = ({
	numDownvotes = 0,
	numUpvotes = 0,
	title,
	subTitle,
	userVoteValue,
	modRequest,
	userIsCreator,
	onVote,
	onDeleteModRequest,
	onSelectModRequest,
	cls
}) => {
	const [loadingImage, setLoadingImage] = useState(true);

	const { imageURL, completionStatus, id } = modRequest;

	return (
		<div
			className={
				"flex max-w-full rounded border-gray-200 border align-center " +
				cls
			}
		>
			<div className="flex flex-col justify-center p-3 w-20">
				<div className="flex justify-start align-center text-green-600">
					{userVoteValue === 1 ? (
						<ThumbUpIconSolid
							className="w-4 h-4 ml-1 mt-1 mr-2 cursor-pointer"
							onClick={onVote}
						/>
					) : (
						<ThumbUpIconOutline
							className="w-4 h-4 ml-1 mt-1 mr-2 cursor-pointer"
							onClick={onVote}
						/>
					)}
					{numUpvotes}
				</div>
				<div className="flex justify-start align-center text-red-600">
					{userVoteValue === -1 ? (
						<ThumbDownIconSolid
							className="w-4 h-4 mt-1 ml-1 mr-2 cursor-pointer"
							onClick={onVote}
						/>
					) : (
						<ThumbDownIconOutline
							className="w-4 h-4 mt-1 ml-1 mr-2 cursor-pointer"
							onClick={onVote}
						/>
					)}
					{numDownvotes}
				</div>
			</div>
			<div className="flex flex-col justify-center">
				{loadingImage && imageURL && (
					<div className="bg-gray-200 w-16 h-16 rounded animate-pulse"></div>
				)}
				{!loadingImage && imageURL && (
					<img
						className="bg-gray-300 w-16 h-16 rounded"
						src={imageURL}
						alt="Mod Request Thumbnail"
						onLoad={() => setLoadingImage(false)}
					></img>
				)}
				{!imageURL && (
					<div className="bg-gray-300 w-16 h-16 rounded"></div>
				)}
			</div>
			<div className="flex flex-col justify-center pl-3">
				<span className="font-bold text-gray-800 leading-5 overflow-clip">
					<Link href={`/requests/${id}`}>{title}</Link>
				</span>
				<span className="text-sm text-gray-700 mw-full">
					{subTitle}
				</span>
			</div>
		</div>
	);
};
export default ModRequestShort;
