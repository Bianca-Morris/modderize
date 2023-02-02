import React from "react";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

interface MenuButtonMobileProps {
	open: boolean;
}

const MenuButtonMobile: React.FC<MenuButtonMobileProps> = (props) => {
	const { open = false } = props;
	return (
		<Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
			<span className="sr-only">Open main menu</span>
			{open ? (
				<XMarkIcon className="block h-6 w-6" aria-hidden="true" />
			) : (
				<Bars3Icon className="block h-6 w-6" aria-hidden="true" />
			)}
		</Disclosure.Button>
	);
};

export default MenuButtonMobile;
