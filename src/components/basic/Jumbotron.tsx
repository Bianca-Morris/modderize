import React, { PropsWithChildren } from "react";

interface JumbotronProps extends PropsWithChildren {
	title: string;
	subtitle?: string;
}

const Jumbotron: React.FC<JumbotronProps> = ({ children, title, subtitle }) => {
	let body;

	if (subtitle) {
		body = (
			<div className="px-10 lg:p-0 w-full flex flex-col lg:flex-row mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 gap-5 lg:gap-16 my-10">
				<div className="flex-1">
					<div className="lg:text-6xl text-4xl font-bold text-white mb-5">
						{title}
					</div>
					<div className="flex-1 text-3xl text-white">{subtitle}</div>
				</div>
				{children}
			</div>
		);
	} else {
		body = (
			<div className="px-10 lg:p-0 w-full flex flex-col lg:flex-row mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 gap-5 lg:gap-16 my-10">
				<div className="flex-1 lg:text-6xl text-4xl font-bold text-white">
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
