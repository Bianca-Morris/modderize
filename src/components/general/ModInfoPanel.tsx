import { PaperClipIcon } from "@heroicons/react/20/solid";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React from "react";
import A from "../basic/A";
import H3 from "../basic/typography/H3";

type ModInfoPanelProps = {
	imageURL: string;
	modURL: string;
};

const ModInfoPanel: React.FC<ModInfoPanelProps> = ({ imageURL, modURL }) => {
	const domain = new URL(modURL).hostname;
	return (
		<div className="flex flex-col gap-0">
			<H3 cls="flex items-center bg-gray-200 p-4">
				<PaperClipIcon className="h-6 w-8" />
				Mod Info
			</H3>
			<div className="border border-gray-200 p-4">
				<div className="flex flex-col w-full items-center justify-center gap-2">
					{imageURL && (
						<Image
							width={196}
							height={196}
							src={imageURL}
							alt="Mod screenshot"
							className="shadow-xl rounded-lg align-middle border-none h-12 w-12"
						></Image>
					)}
					<div>
						<div className="flex">
							<ArrowTopRightOnSquareIcon className="w-5 h-5 mr-1" />
							<A variant="indigo" href={modURL}>
								Go to Download
							</A>
						</div>
						<span className="text-gray-600 text-sm">
							({domain})
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};
export default ModInfoPanel;
