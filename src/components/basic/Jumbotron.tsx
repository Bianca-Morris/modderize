import React, { PropsWithChildren } from "react";
import Button from "./Button";

interface JumbotronProps extends PropsWithChildren {
	title: string;
	subtitle?: string;
}

const Jumbotron: React.FC<JumbotronProps> = ({ children, title, subtitle }) => {
	let body;

	if (subtitle) {
		body = (
			<div className="w-full flex mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 gap-16 my-10">
				<div className="flex-1">
					<div className="text-6xl font-bold text-white  mb-5">
						{title}
					</div>
					<div className="flex-1 text-3xl text-white">{subtitle}</div>
				</div>
				{children}
			</div>
		);
	} else {
		body = (
			<div className="w-full flex mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 gap-16 my-10">
				<div className="flex-1 text-6xl font-bold text-white">
					{title}
				</div>
				{children}
			</div>
		);
	}

	return (
		<div className="w-full bg-gradient-to-b from-purple-900 to-blue-900 flex px-2 sm:px-6 lg:px-8 gap-16 justify-center align-center items-center">
			{body}
		</div>
	);
};
export default Jumbotron;
