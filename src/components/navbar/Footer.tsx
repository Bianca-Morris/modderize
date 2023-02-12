import React, { Fragment } from "react";
import { HeartIcon } from "@heroicons/react/24/outline";
import { PropsWithChildren } from "../../types/interfaces";

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
				<h5 className="font-bold text-xl mb-4">{title}</h5>
				<hr className="mb-3" />
				{children}
			</div>
		</div>
	);
};

const Footer: React.FC = () => {
	return (
		<React.Fragment>
			<div className="bg-gray-900">
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
							Next.js, created by Vercel, is an open-source
							JavaScript framework designed to let developers
							create dynamic and static web applications and
							websites that are fast and user-friendly.
						</p>
					</FooterSection>
				</div>
			</div>
			<div className="w-full flex items-center justify-center">
				Made with
				<div className="mx-2">
					<HeartIcon className="h-4 w-4 my-4" />
				</div>
				by Bianca Morris
			</div>
		</React.Fragment>
	);
};
export default Footer;
