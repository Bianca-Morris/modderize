import React from "react";
import { Disclosure } from "@headlessui/react";
import SearchBar from "./SearchBar";

interface MenuDropdownMobileProps {
	navigation;
	classNames;
}

const MenuDropdownMobile: React.FC<MenuDropdownMobileProps> = (props) => {
	const { navigation = [], classNames } = props;
	return (
		<div className="space-y-1 px-2 pt-2 pb-3">
			{navigation.map((item) => (
				<Disclosure.Button
					key={item.name}
					as="a"
					href={item.href}
					className={classNames(
						item.current
							? "bg-gray-900 text-white"
							: "text-gray-300 hover:bg-gray-700 hover:text-white",
						"block px-3 py-2 rounded-md text-base font-medium"
					)}
					aria-current={item.current ? "page" : undefined}
				>
					{item.name}
				</Disclosure.Button>
			))}
			<SearchBar visibleOnDesktop={false} />
		</div>
	);
};

export default MenuDropdownMobile;
