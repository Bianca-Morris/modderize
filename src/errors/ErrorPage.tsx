import Image from "next/image";
import React, { ReactElement } from "react";
import A from "../components/basic/A";
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
				<div className="flex justify-center">
					<H1>{header1}</H1>
				</div>
			</SimpleHeader>
			<div className="w-full justify-center flex mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 gap-16">
				<div className="py-6 text-center">
					<H2 cls="text-gray-900 mb-3">{header2}</H2>
					<H3>{header3}</H3>
					<p>{paragraph}</p>
					<div className="my-10 w-full flex flex-col justify-center items-center align-center">
						<figure className="mb-10">
							<Image
								width="640"
								height="427"
								className="min-w-full rounded-lg"
								src="/images/pexels-amir-ghoorchiani-1183434.webp"
								alt="Sad kitty apologizes for error"
							></Image>
							<figcaption className="text-xs pl-2 pt-1">
								Photo by{" "}
								<A
									variant="gray"
									href="https://www.pexels.com/photo/close-up-photo-of-cat-with-its-eyes-closed-1183434/"
									target="_blank"
									tagType="a"
									rel="noreferrer noopener"
								>
									Amir Ghoorchiani
								</A>
							</figcaption>
						</figure>
						<p className="text-2xl font-bold">
							Mistakes were made!
						</p>
						<A variant="violet" href="/">
							Back to the Home Page?
						</A>
					</div>
				</div>
			</div>
		</div>
	);
};
export default ErrorPage;
