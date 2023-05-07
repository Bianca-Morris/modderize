import { Dialog } from "@headlessui/react";
import {
	ArrowDownTrayIcon,
	ArrowTopRightOnSquareIcon,
	UserIcon
} from "@heroicons/react/20/solid";
import { GiftIcon } from "@heroicons/react/24/outline";
import { doc } from "firebase/firestore";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { usersCol } from "../../firebase/collections";
import { useInterval } from "../../hooks/useInterval";
import A from "../basic/A";
import Modal from "../basic/Modal";
import H2 from "../basic/typography/H2";

type DownloadModModalProps = {
	open: boolean;
	handleClose: () => void;
	modderID: string;
	modURL: string;
};

const DownloadModModal: React.FC<DownloadModModalProps> = ({
	open,
	handleClose,
	modderID,
	modURL
}) => {
	const [showDownload, setShowDownload] = useState(false);

	const domain = new URL(modURL).hostname;

	// Grab modder user item on load
	const [data, loading, error, snapshot] = useDocumentDataOnce(
		doc(usersCol, modderID)
	);
	const { displayName, photoURL, donationLink } = data || {};

	let [count, setCount] = useState(10);
	let [delay, setDelay] = useState<number | null>(donationLink ? 1000 : null);

	useInterval(() => {
		// On each tick, bump the count
		setCount(count - 1);

		// Stop ticking and show download
		if (count === 1) {
			setDelay(null);
			setShowDownload(true);
		}
	}, delay);

	// When donation link loads in,
	useEffect(() => {
		if (!loading && donationLink) {
			// If donationLink present, do countdown/donation prompt
			setDelay(1000);
		} else if (!loading && !donationLink) {
			// If donationLink not present, don't do countdown/donation prompt
			setDelay(null);
			setCount(0);
			setShowDownload(true);
		}
	}, [donationLink, loading]);

	return (
		<Modal {...{ open, handleClose }}>
			<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
				<div className="flex items-center justify-center">
					<div className="mt-3 text-center sm:mx-2">
						<Dialog.Title
							as="h1"
							className="text-2xl text-center font-bold font-medium text-gray-900"
						>
							Thanks for Using Modderize
						</Dialog.Title>

						{!donationLink && !loading && (
							<H2 cls="text-sm text-center font-normal">
								Enjoy this download, courtesy of&nbsp;
								<strong className="font-bold">
									{displayName}
								</strong>
								!
							</H2>
						)}

						{donationLink && (
							<>
								<H2 cls="text-sm text-center font-normal">
									While you wait, please consider donating to{" "}
									<strong className="font-bold">
										{displayName}
									</strong>{" "}
									for all of their hard work on this mod!
								</H2>
								{count !== 0 && (
									<div className="text-4xl text-center font-bolder py-3">
										{count}
									</div>
								)}

								{photoURL ? (
									<Image
										width={128}
										height={128}
										alt={displayName}
										src={photoURL}
										className="shadow-xl rounded-full align-middle border-none h-32 w-32 mx-auto my-5"
									/>
								) : (
									<div className="shadow-xl bg-gray-300 rounded-full h-52 w-52 align-middle border-none flex items-center justify-center">
										<UserIcon className="h-32 w-32 fill-gray-400" />
									</div>
								)}

								<A
									cls="mx-auto block"
									variant="blue"
									linkType="button"
									tagType="a"
									href={donationLink}
									rel="noreferrer noopener"
									target="_blank"
								>
									<GiftIcon className="w-4 h-4 mr-1" />
									Donate to {displayName}
								</A>
							</>
						)}
					</div>
				</div>
			</div>
			{showDownload && (
				<div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row justify-center sm:px-6">
					<div className="text-center my-2">
						<div className="flex justify-center w-100">
							<ArrowTopRightOnSquareIcon className="w-5 h-5 mr-1" />
							<A
								variant="indigo"
								rel="noreferrer noopener"
								target="_blank"
								tagType="a"
								href={modURL}
							>
								Go to Download
							</A>
						</div>
						<span className="text-gray-600 text-sm">
							({domain})
						</span>
					</div>
				</div>
			)}
		</Modal>
	);
};
export default DownloadModModal;
