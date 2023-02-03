import React from "react";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { PropsWithChildren } from "../../types/interfaces";
import MenuButtonMobile from "./MenuButtonMobile";
import MenuDropdownMobile from "./MenuDropdownMobile";
import NotificationButton from "./logged-in/NotificationButton";
import UserMenuButton from "./logged-in/UserMenuButton";
import SearchBar from "./SearchBar";
import AuthButton from "./logged-out/AuthButton";
import AuthModal from "./logged-out/AuthModal";

const navigation = [
	{ name: "About", href: "#", current: false },
	{ name: "Browse", href: "#", current: false }
];

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

const Navbar: React.FC = () => {
	return (
		<Disclosure as="nav" className="bg-gray-800">
			{({ open }) => (
				<>
					<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
						<div className="relative flex h-16 items-center justify-between">
							<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
								<MenuButtonMobile {...{ open }} />
							</div>
							<div className="flex flex-1 items-center justify-center sm:justify-start text-white uppercase font-bold">
								Modderize
								{/* <div className="flex flex-shrink-0 items-center">
									<img
										className="block h-8 w-auto lg:hidden"
										src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
										alt="Your Company"
									/>
									<img
										className="hidden h-8 w-auto lg:block"
										src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
										alt="Your Company"
									/>
								</div> */}
								<div className="hidden sm:ml-6 sm:block">
									<div className="flex space-x-4">
										{navigation.map((item) => (
											<a
												key={item.name}
												href={item.href}
												className={classNames(
													item.current
														? "bg-gray-900 text-white"
														: "text-gray-300 hover:bg-gray-700 hover:text-white",
													"px-3 py-2 rounded-md text-sm font-medium"
												)}
												aria-current={
													item.current
														? "page"
														: undefined
												}
											>
												{item.name}
											</a>
										))}
									</div>
								</div>
							</div>
							<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
								<SearchBar />
								<NotificationButton />
								<UserMenuButton {...{ classNames }} />
								<AuthButton />
								<AuthModal />
							</div>
						</div>
					</div>

					<Disclosure.Panel className="sm:hidden">
						<MenuDropdownMobile {...{ navigation, classNames }} />
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
};
export default Navbar;
