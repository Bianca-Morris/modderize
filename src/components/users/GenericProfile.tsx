import { ShareIcon, UserIcon } from "@heroicons/react/20/solid";
import { PencilIcon } from "@heroicons/react/24/outline";
import React, { PropsWithChildren } from "react";
import Button from "../basic/Button";
import SimpleHeader from "../general/SimpleHeader";
import ContentBody from "../layout/ContentBody";

interface GenericProfileProps extends PropsWithChildren {
	displayName: string;
	email?: string;
	description?: string;
	profileURL?: string;
	showEdit: boolean;
	onEditDescription?: () => {};
	showRequestMod: boolean;
	onRequestMod?: () => {};
}

const GenericProfile: React.FC<GenericProfileProps> = ({
	displayName,
	email,
	description,
	profileURL,
	showEdit,
	onEditDescription,
	showRequestMod,
	onRequestMod,
	children
}) => {
	return (
		<ContentBody innerCls="flex-col lg:flex-row px-10">
			<>
				<SimpleHeader />
			</>
			<>
				<div className="flex flex-1 flex-col mt-10 items-center">
					{profileURL ? (
						<img
							src={profileURL}
							// src="https://assets2.gyazo.com/assets/images/top/surf-9251859ffc.svg"
							// src="https://github.com/creativetimofficial/soft-ui-dashboard-tailwind/blob/main/build/assets/img/team-2.jpg?raw=true"
							className="shadow-xl rounded-full align-middle border-none h-32 w-32"
						/>
					) : (
						<div className="shadow-xl bg-gray-300 h-52 w-52 rounded-full align-middle border-none flex items-center justify-center">
							<UserIcon className="h-32 w-32 fill-gray-400" />
						</div>
					)}

					<h2 className="mt-10 text-2xl font-bold">{displayName}</h2>
					{email && <div className="text-gray-700">{email}</div>}
					<div className="mt-4 bg-gray-100 p-5 w-full shadow-sm">
						<strong>About Me:</strong>
						<br />
						{description || (
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
								Request Mod
							</Button>
						)}
						<div className="flex mt-5 w-full justify-center gap-3">
							{showEdit && (
								<PencilIcon
									onClick={onEditDescription}
									className="h-8 w-8 cursor-pointer hover:stroke-indigo-300"
								/>
							)}
							<ShareIcon className="h-8 w-8 cursor-pointer hover:fill-indigo-300" />
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
