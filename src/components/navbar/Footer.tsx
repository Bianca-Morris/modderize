import React, { PropsWithChildren } from "react";
import { HeartIcon } from "@heroicons/react/24/outline";

const navigation = [
	{ name: "Privacy Policy", href: "#" },
	{ name: "Legal", href: "#" }
];

interface FooterSectionProps extends PropsWithChildren {
	title: string;
}

const FooterSection: React.FC<FooterSectionProps> = ({ children, title }) => {
	return (
		<div className="flex-1 p-3 flex justify-content-center">
			<div className="p-4 w-full">
				<h5 className="font-bold text-xl mb-4 text-gray-100">
					{title}
				</h5>
				<hr className="mb-3" />
				{children}
			</div>
		</div>
	);
};

const Footer: React.FC = () => {
	return (
		<div className="bg-gray-900 text-gray-300">
			<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
				<div className="flex">
					<FooterSection title="Links">
						<ul>
							{navigation.map((navItem) => {
								const { name, href } = navItem;
								return (
									<li>
										<a href={href}>{name}</a>
									</li>
								);
							})}
						</ul>
					</FooterSection>
					<FooterSection title="Contact">
						<div>TBD</div>
					</FooterSection>
					<FooterSection title="About">
						<p>
							Lorem ipsum dolor sit amet. Sit excepturi internos
							At rerum deserunt non ipsum repellendus tempore non
							eligendi. Sed numquam adipisci qui voluptatem
							quibusdam ut enim maxime.
						</p>
					</FooterSection>
				</div>
			</div>
			<div className="w-full flex items-center justify-center bg-gray-800 text-gray-200 text-sm">
				Made with
				<div className="mx-2">
					<HeartIcon className="h-4 w-4 my-4" />
				</div>
				by
				<a
					className="ml-1 underline text-violet-300"
					href="https://www.biancamorris.com"
				>
					Bianca Morris
				</a>
			</div>
		</div>
	);
};
export default Footer;
