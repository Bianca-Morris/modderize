import React from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import UserMenuItem from "./UserMenuItem";

const navigation = [
	{ title: "My Profile", href: "#" },
	{ title: "Settings", href: "#" },
	{ title: "Sign Out", href: "#" }
];

interface UserMenuButtonProps {
	// open: boolean;
	classNames;
}

const UserMenuButton: React.FC<UserMenuButtonProps> = (props) => {
	const { classNames } = props;
	return (
		<Menu as="div" className="relative ml-3">
			<div>
				<Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
					<span className="sr-only">Open user menu</span>
					<img
						className="h-8 w-8 rounded-full"
						src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
						alt="User Profile Picture"
					/>
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
					{navigation.map((item) => (
						<UserMenuItem
							key={item?.title}
							{...item}
							{...{ classNames }}
						/>
					))}
				</Menu.Items>
			</Transition>
		</Menu>
	);
};

export default UserMenuButton;
