import React, { MouseEventHandler } from "react";
import { Menu } from "@headlessui/react";
import { classNames } from "../../../helpers";
import Link from "next/link";

interface UserMenuItemProps {
	active?: boolean;
	title: string;
	href?: string;
	onClick?: MouseEventHandler;
}

const UserMenuItem: React.FC<UserMenuItemProps> = (props) => {
	const { active, title, href, onClick } = props;
	return (
		<Menu.Item>
			{href ? (
				<Link
					href={href}
					className={classNames(
						active ? "bg-gray-100" : "",
						"block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-200"
					)}
					{...{ onClick }}
				>
					{title}
				</Link>
			) : (
				<a
					href={href}
					className={classNames(
						active ? "bg-gray-100" : "",
						"block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-200"
					)}
					{...{ onClick }}
				>
					{title}
				</a>
			)}
		</Menu.Item>
	);
};

export default UserMenuItem;
