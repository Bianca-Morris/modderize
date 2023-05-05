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
import { classNames } from "../../helpers";
import GamesDropdown from "./logged-out/GamesDropdown";
import AddGameModal from "./logged-out/AddGameModal";
import Link from "next/link";
import useGameData from "../../hooks/useGameData";
import { useRouter } from "next/router";
import Image from "next/image";

const Navbar: React.FC = () => {
	const router = useRouter();
	const aboutActive = router.pathname === "/about";

	const navigation = [
		{ name: "About", href: "/about", current: aboutActive }
	];

	const [user, loading, error] = useAuthState(auth);

	// Make sure this is loaded, so that favorite links for current user are triggered, if haven't been already
	useGameData();

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
								<Link
									href="/"
									className="flex flex-row gap-2 justify-center items-center"
								>
									<Image
										src="modderize_logo.svg"
										width="50"
										height="50"
										alt="Modderize Logo"
									></Image>
									Modderize
								</Link>
								<div className="hidden sm:ml-6 sm:block">
									<div className="flex space-x-4">
										{navigation.map((item) => (
											<Link
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
											</Link>
										))}
										<GamesDropdown />
									</div>
								</div>
							</div>
							<div className="flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
								<SearchBar visibleOnMobile={false} />
								{user ? (
									<>
										{/* <NotificationButton /> */}
										<UserMenuButton />
									</>
								) : (
									<AuthButton />
								)}
								<AuthModal />
								<AddGameModal />
							</div>
						</div>
					</div>

					<Disclosure.Panel className="sm:hidden">
						<MenuDropdownMobile {...{ navigation }} />
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
};
export default Navbar;
