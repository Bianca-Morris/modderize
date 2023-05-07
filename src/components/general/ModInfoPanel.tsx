import React, { useState } from "react";
import { ArrowDownTrayIcon, PaperClipIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Button from "../basic/Button";
import H3 from "../basic/typography/H3";
import DownloadModModal from "../modals/DownloadModModal";

type ModInfoPanelProps = {
	imageURL?: string;
	modURL: string;
	modderID: string;
};

const ModInfoPanel: React.FC<ModInfoPanelProps> = ({
	imageURL,
	modURL,
	modderID
}) => {
	const [open, setOpenModal] = useState(false);

	const onClickDownload = () => {
		setOpenModal(true);
	};

	return (
		<div className="flex flex-col gap-0">
			{open && (
				<DownloadModModal
					{...{ modderID, open, modURL }}
					handleClose={() => setOpenModal(false)}
				/>
			)}
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
							className="shadow-xl rounded-lg align-middle border-none h-52 w-52"
						></Image>
					)}
					<div>
						<Button
							variant="indigo"
							type="button"
							cls="flex"
							onClick={onClickDownload}
						>
							<ArrowDownTrayIcon className="w-5 h-5 mr-1" />
							Download Available
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};
export default ModInfoPanel;
