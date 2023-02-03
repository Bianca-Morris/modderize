import React from "react";
import { Menu } from "@headlessui/react";

interface UserMenuItemProps {
	classNames;
	active?: boolean;
	title: string;
	href: string;
}

const UserMenuItem: React.FC<UserMenuItemProps> = (props) => {
	const { classNames, active, title, href = "#" } = props;
	return (
		<Menu.Item>
			<a
				href={href}
				className={classNames(
					active ? "bg-gray-100" : "",
					"block px-4 py-2 text-sm text-gray-700"
				)}
			>
				{title}
			</a>
		</Menu.Item>
	);
};

export default UserMenuItem;