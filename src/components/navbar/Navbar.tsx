import React from "react";
import { Disclosure } from "@headlessui/react";
import MenuButtonMobile from "./MenuButtonMobile";
import MenuDropdownMobile from "./MenuDropdownMobile";
import NotificationButton from "./logged-in/NotificationButton";
import UserMenuButton from "./logged-in/UserMenuButton";
import SearchBar from "./SearchBar";
import AuthButton from "./logged-out/AuthButton";
import AuthModal from "./logged-out/AuthModal";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/clientApp";

const navigation = [
	{ name: "About", href: "#", current: false },
	{ name: "Browse", href: "#", current: false }
];

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

const Navbar: React.FC = () => {
	const [user, loading, error] = useAuthState(auth);

	return (
		<Disclosure as="nav" className="bg-gray-800">
			{({ open }) => (
				<>
					<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
						<div className="flex h-16 items-center justify-between">
							<div className="flex items-center sm:hidden">
								<MenuButtonMobile {...{ open }} />
							</div>
							<div className="flex flex-1 items-center justify-start text-white uppercase font-bold">
								<a href="/">Modderize</a>
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
													"px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
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
							<div className="flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
								<SearchBar visibleOnMobile={false} />
								{user ? (
									<>
										<NotificationButton />
										<UserMenuButton {...{ classNames }} />
									</>
								) : (
									<AuthButton />
								)}
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
