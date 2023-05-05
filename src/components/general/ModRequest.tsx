import Link from "next/link";
import React, { ReactElement, useState } from "react";
import Image from "next/image";
import { ModRequest } from "../../types/docTypes";
import LikeButton from "./LikeButton";

type ModRequestShortProps = {
	subTitle: string | ReactElement;
	modRequest: ModRequest;
	cls?: string;
};

const ModRequestShort: React.FC<ModRequestShortProps> = ({
	subTitle,
	modRequest,
	cls = ""
}) => {
	const [loadingImage, setLoadingImage] = useState(true);

	const {
		imageURL,
		id: requestID,
		title,
		voteStatus,
		requesterID
	} = modRequest;

	return (
		<div
			className={
				"flex max-w-full rounded border-gray-200 border align-center " +
				cls
			}
		>
			<div className="flex flex-col justify-center p-3 w-20">
				<div className="flex justify-start align-center text-green-600">
					<LikeButton {...{ modRequest }} />
					{voteStatus}
				</div>
			</div>
			<div className="flex flex-col justify-center">
				{loadingImage && imageURL && (
					<div className="bg-gray-200 w-16 h-16 rounded animate-pulse"></div>
				)}
				{!loadingImage && imageURL && (
					<Image
						width={208}
						height={208}
						className="bg-gray-300 w-16 h-16 rounded"
						src={imageURL}
						alt="Mod Request Thumbnail"
						onLoad={() => setLoadingImage(false)}
					></Image>
				)}
				{!imageURL && (
					<div className="bg-gray-300 w-16 h-16 rounded"></div>
				)}
			</div>
			<div className="flex flex-col justify-center pl-3 max-w-xs">
				<span className="font-bold text-gray-800 leading-5 truncate">
					<Link href={`/requests/${requestID}`}>{title}</Link>
				</span>
				<span className="text-sm text-gray-700 mw-full">
					{subTitle}
				</span>
			</div>
		</div>
	);
};
export default ModRequestShort;
