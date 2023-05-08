import React, { ReactElement } from "react";
import H1 from "../components/basic/typography/H1";
import H2 from "../components/basic/typography/H2";
import H3 from "../components/basic/typography/H3";
import SimpleHeader from "../components/general/SimpleHeader";

type ErrorPageProps = {
	header1: string | ReactElement;
	header2?: string | ReactElement;
	header3?: string | ReactElement;
	paragraph?: string | ReactElement;
};

const ErrorPage: React.FC<ErrorPageProps> = ({
	header1,
	header2,
	header3,
	paragraph
}) => {
	return (
		<div className="flex min-h-screen flex-col item-center justify-start pb-2">
			<SimpleHeader>
				<div className="flex text-center">
					<H1>{header1}</H1>
				</div>
			</SimpleHeader>
			<div className="w-full flex mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 gap-16">
				<div className="py-6">
					<H2 cls="text-gray-900 mb-3">{header2}</H2>
					<H3>{header3}</H3>
					<p>{paragraph}</p>
				</div>
			</div>
		</div>
	);
};
export default ErrorPage;
