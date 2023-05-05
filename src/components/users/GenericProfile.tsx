import {
	InboxArrowDownIcon,
	ShareIcon,
	UserIcon
} from "@heroicons/react/20/solid";
import { PencilIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import React, { PropsWithChildren } from "react";
import Image from "next/image";

import A from "../basic/A";
import Button from "../basic/Button";
import H2 from "../basic/typography/H2";
import SharePopover from "../general/SharePopover";
import SimpleHeader from "../general/SimpleHeader";
import ContentBody from "../layout/ContentBody";

interface GenericProfileProps extends PropsWithChildren {
	displayName: string;
	email?: string;
	description?: string;
	profileURL?: string;
	donationLink?: string;
	showEdit: boolean;
	showTopDonationLink?: boolean;
	onEditProfile?: () => void;
	showRequestMod: boolean;
	onRequestMod?: () => void;
}

const GenericProfile: React.FC<GenericProfileProps> = ({
	displayName,
	email,
	description,
	profileURL,
	showEdit,
	showTopDonationLink,
	donationLink,
	onEditProfile,
	showRequestMod,
	onRequestMod,
	children
}) => {
	const router = useRouter();

	return (
		<ContentBody innerCls="flex-col lg:flex-row px-10">
			<>
				<SimpleHeader />
			</>
			<>
				<div className="flex flex-1 flex-col mt-10 items-center">
					{profileURL ? (
						<Image
							alt={displayName}
							width={128}
							height={128}
							src={profileURL}
							className="shadow-xl rounded-full align-middle border-none h-52 w-52"
						/>
					) : (
						<div className="shadow-xl bg-gray-300 h-52 w-52 rounded-full align-middle border-none flex items-center justify-center">
							<UserIcon className="h-32 w-32 fill-gray-400" />
						</div>
					)}

					<H2 cls="mt-10">{displayName}</H2>
					{email && <div className="text-gray-700">{email}</div>}
					{donationLink && showTopDonationLink && (
						<div className="flex text-xs mt-1">
							(
							<A
								tagType="a"
								href={donationLink}
								target="_blank"
								rel="noreferrer"
								variant="violet"
							>
								{donationLink}
							</A>
							)
						</div>
					)}
					<div className="mt-4 bg-gray-100 p-5 w-full shadow-sm">
						<strong>About Me:</strong>
						<br />
						{description ? (
							<div className="whitespace-pre-wrap max-h-60 overflow-scroll">
								{description}
							</div>
						) : (
							<i className="italic">No description available</i>
						)}
					</div>

					<div className="mt-5">
						{showRequestMod && (
							<Button
								type="button"
								variant="indigo"
								onClick={onRequestMod}
							>
								<InboxArrowDownIcon className="w-4 h-4 mr-2" />{" "}
								Request Mod
							</Button>
						)}
						<div className="flex mt-5 w-full justify-center gap-3">
							{showEdit && (
								<PencilIcon
									onClick={onEditProfile}
									className="h-8 w-8 cursor-pointer hover:stroke-indigo-300"
								/>
							)}
							{/** TODO: Update once deployed and project has URL */}
							<SharePopover url="https://www.lol.com">
								<ShareIcon className="h-8 w-8 cursor-pointer hover:fill-indigo-300" />
							</SharePopover>
						</div>
					</div>
				</div>

				<div className="flex flex-auto flex-col mt-10 gap-2">
					<div className="flex flex-col gap-0">{children}</div>
				</div>
			</>
		</ContentBody>
	);
};
export default GenericProfile;
