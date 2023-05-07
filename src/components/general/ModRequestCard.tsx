import Link from "next/link";
import React, { ReactElement, useState } from "react";
import Image from "next/image";
import { ModRequest } from "../../types/docTypes";
import LikeButton from "./LikeButton";
import { PhotoIcon } from "@heroicons/react/24/outline";
import Badge from "../basic/Badge";
import ModRequestStatusBadge from "./ModRequestStatusBadge";

type ModRequestCardProps = {
	subTitle: string | ReactElement;
	modRequest: ModRequest;
	showImage?: boolean;
	cls?: string;
};

const ModRequestCard: React.FC<ModRequestCardProps> = ({
	subTitle,
	modRequest,
	showImage = false,
	cls = ""
}) => {
	const [loadingImage, setLoadingImage] = useState(true);

	const {
		imageURL,
		id: requestID,
		title,
		modderStatus,
		completionStatus
	} = modRequest;

	return (
		<div
			className={
				"flex max-w-full flex-col sm:flex-row rounded border-gray-200 border align-center min-h-[66px]" +
				cls
			}
		>
			<div className="flex flex-col justify-center p-3 w-20">
				<div className="flex justify-start align-center">
					<LikeButton {...{ modRequest }} />
				</div>
			</div>
			{showImage && (
				<div className="flex flex-col justify-center">
					{loadingImage && imageURL && (
						<div className="bg-gray-200 w-16 h-16 animate-pulse"></div>
					)}
					{!loadingImage && imageURL && (
						<Image
							width={208}
							height={208}
							className="bg-gray-300 w-16 h-16"
							src={imageURL}
							alt="Mod Request Thumbnail"
							onLoad={() => setLoadingImage(false)}
						></Image>
					)}
					{!imageURL && (
						<div className="bg-gray-300 w-16 h-16 flex justify-center items-center">
							<PhotoIcon className="w-6 h-6 text-gray-400" />
						</div>
					)}
				</div>
			)}
			<div className="w-full flex flex-col sm:flex-row sm:justify-between">
				<div className="flex flex-col justify-center pl-3 max-w-[100%] sm:max-w-[250px]">
					<span className="font-bold text-gray-800 leading-5 truncate">
						<Link href={`/requests/${requestID}`}>{title}</Link>
					</span>
					<span className="text-sm text-gray-700 mw-full">
						{subTitle}
					</span>
				</div>
				<div className="flex items-center sm:justify-end justify-center p-5 sm:p-0">
					<ModRequestStatusBadge
						{...{ modderStatus, completionStatus }}
					/>
				</div>
			</div>
		</div>
	);
};
export default ModRequestCard;
