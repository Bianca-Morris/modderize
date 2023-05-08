import React from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { signOut } from "@firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Image from "next/image";

import { auth } from "../../../firebase/clientApp";
import UserMenuItem from "./UserMenuItem";
interface UserMenuButtonProps {}

const UserMenuButton: React.FC<UserMenuButtonProps> = () => {
	const [user] = useAuthState(auth);

	const { photoURL, displayName, email } = user || {};

	const logout = async () => {
		await signOut(auth);
	};

	const navigation = [
		{ title: "My Profile", href: `/users/${user?.uid}` },
		{
			title: "Current Projects",
			href: `/requests?modderID=${user?.uid}&modderStatus=accepted&completionStatus=in%20progress&hideFilters=true&title=My%20Current%20Projects`
		},
		{
			title: "Project Queue",
			href: `/requests?modderID=${user?.uid}&modderStatus=requested&hideFilters=true&title=My%20Project%20Queue`
		}
		// Sign Out link is defined outside of map because it has a method that needs recoil state from UserMenuButton
	];

	return (
		<Menu as="div" className="relative ml-3">
			<div>
				<Menu.Button className="flex rounded-full text-gray-400 bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
					<span className="sr-only">Open user menu</span>
					{photoURL && (
						<Image
							width={128}
							height={128}
							className="h-8 w-8 rounded-full"
							src={photoURL}
							alt="User Profile Picture"
						/>
					)}

					{!photoURL && (
						<UserCircleIcon
							className="h-8 w-8"
							aria-hidden="true"
						/>
					)}
				</Menu.Button>
			</div>
			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
					<div className="block px-4 py-2 text-sm text-gray-700">
						<span className="font-bold">Hi, {displayName}!</span>
						<br />
						<div className="text-xs text-gray-400 underline">
							({email})
						</div>
					</div>
					<hr />
					{navigation.map((item) => (
						<UserMenuItem key={item?.title} {...item} />
					))}
					<UserMenuItem
						{...{
							title: "Sign Out",
							href: undefined,
							onClick: logout
						}}
					/>
				</Menu.Items>
			</Transition>
		</Menu>
	);
};

export default UserMenuButton;
