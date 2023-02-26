import { HandThumbDownIcon, HandThumbUpIcon } from "@heroicons/react/20/solid";
import React, { ReactElement } from "react";

type ModRequestShortProps = {
	numUpvotes?: number;
	numDownvotes?: number;
	imageURL?: string;
	title: string | ReactElement;
	subTitle: string | ReactElement;
};

const ModRequestShort: React.FC<ModRequestShortProps> = ({
	numDownvotes = 0,
	numUpvotes = 0,
	imageURL = null,
	title,
	subTitle
}) => {
	return (
		<div className="flex max-w-full rounded border-gray-200 border align-center">
			<div className="flex flex-col justify-center p-3 w-20">
				<div className="flex justify-start align-center text-green-600">
					<HandThumbUpIcon className="w-4 h-4 ml-1 mt-1 mr-2" />
					{numUpvotes}
				</div>
				<div className="flex justify-start align-center text-red-600">
					<HandThumbDownIcon className="w-4 h-4 mt-1 ml-1 mr-2" />
					{numDownvotes}
				</div>
			</div>
			<div className="flex flex-col justify-center">
				<div className="bg-gray-300 w-16 h-16 rounded"></div>
			</div>
			<div className="flex flex-col justify-center pl-3">
				<span className="font-bold text-gray-800 leading-5 overflow-clip">
					{title}
				</span>
				<span className="text-sm text-gray-700 mw-full">
					{subTitle}
				</span>
			</div>
		</div>
	);
};
export default ModRequestShort;
