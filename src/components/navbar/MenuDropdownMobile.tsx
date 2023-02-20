import React from "react";
import { Disclosure } from "@headlessui/react";
import SearchBar from "./SearchBar";
import { classNames } from "../../helpers";
import GamesDropdown from "./logged-out/GamesDropdown";

interface MenuDropdownMobileProps {
	navigation;
}

const MenuDropdownMobile: React.FC<MenuDropdownMobileProps> = (props) => {
	const { navigation = [] } = props;
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
			<GamesDropdown />
			<SearchBar visibleOnDesktop={false} />
		</div>
	);
};

export default MenuDropdownMobile;
