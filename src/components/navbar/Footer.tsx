import React, { PropsWithChildren } from "react";
import { HeartIcon } from "@heroicons/react/24/outline";
import A from "../basic/A";
import ContactForm from "../forms/ContactForm";

const navigation = [
	{ name: "Github Repo", href: "https://github.com/Bianca-Morris/modderize" },
	{ name: "Privacy Policy", href: "/privacy" },
	{ name: "Terms of Use", href: "/termsOfUse" }
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
				<div className="flex flex-col lg:flex-row">
					<FooterSection title="Links">
						<ul>
							{navigation.map((navItem) => {
								const { name, href } = navItem;
								return (
									<li key={name}>
										<a href={href}>{name}</a>
									</li>
								);
							})}
						</ul>
					</FooterSection>
					<FooterSection title="Contact">
						<ContactForm />
					</FooterSection>
					<FooterSection title="About">
						<p>
							Modderize is a web application for video game
							modders to track and fulfill feature requests from
							their communities.
						</p>
						<p className="mt-5">
							This application was built to fulfill the Capstone
							requirement of the Digital Media Design ALM Degree
							at Harvard Extension School.
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
				<A
					variant="lightViolet"
					tagType="a"
					cls="ml-1"
					href="https://www.biancamorris.com"
				>
					Bianca Morris
				</A>
			</div>
		</div>
	);
};
export default Footer;
