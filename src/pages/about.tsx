import React from "react";
import Image from "next/image";

import A from "../components/basic/A";
import Jumbotron from "../components/basic/Jumbotron";
import H1 from "../components/basic/typography/H1";
import SimpleHeader from "../components/general/SimpleHeader";
import ContentBody from "../components/layout/ContentBody";

type AboutPageProps = {};

const AboutPage: React.FC<AboutPageProps> = () => {
	return (
		<>
			<div className="flex flex-col w-100">
				<SimpleHeader>
					<div className="flex w-100 justify-between">
						<div className="flex flex-col text-3xl">
							<H1>About Modderize</H1>
						</div>
					</div>
				</SimpleHeader>

				<Jumbotron
					title="Connecting Modders with Gamers"
					subtitle="Modderize Is Modernizing The World of Modding"
				>
					{<div className="flex-1 flex flex-col p-5 gap-5"></div>}
				</Jumbotron>
			</div>
			<ContentBody>
				<div className="flex flex-col lg:flex-row px-10 lg:px-0 gap-10 my-10">
					<div className="flex-1">
						<figure className="flex flex-col center">
							<Image
								width={208}
								height={208}
								className="rounded-3xl w-full"
								src="/images/axville-XaTRLucavKQ-unsplash.webp"
								alt="Young man plays computer games with friends"
							/>
							<figcaption className="mt-5 text-xs text-left text-gray-400 w-full min-w-full">
								(Photo by&nbsp;
								<A
									variant="gray"
									href="https://unsplash.com/photos/XaTRLucavKQ"
									target="_blank"
									rel="noreferrer noopener"
									tagType="a"
								>
									Axville
								</A>
								&nbsp;on Unsplash)
							</figcaption>
						</figure>
					</div>
					<div className="flex-1 flex flex-col gap-5">
						<p>
							Created by a modder and gamer for modders and
							gamers, Modderize is the result of my own
							frustration with the state of mod-sharing websites.
							There are some great tools out there for sharing
							mods and growing an audience, but most of them don't
							have dedicated tools for requesting mods. The
							consensus seems to be that mod requests are simply
							an unnecessary distraction. And it is true that,
							when unsolicited, they can be. However, there are a
							plethora of real, enriching use-cases where this
							particular kind of content can be really useful.
						</p>
						<p>
							There was a time when the sole motivation for
							modding was personal fulfillment; and that is still
							a huge part of why most of us do it. But now that
							the world of PC game modding is becoming more
							monetizeable, with many modders collecting
							subscriptions and donations via services like
							Patreon and BuyMeACoffee, many modders (like
							myself), are trying to figure out what kind of
							content will make our followers happiest. This can
							be difficult to do, especially for large creators,
							as comments sections get larger and harder to skim.
							And even if you create a poll, the only options your
							users can choose between are the things you have
							already thought of.
						</p>
						<p>
							Enter Modderize, which gives gamers and modders an
							additional means of communicating with each other.
							You can make a mod request that is open to the
							entire community, and someone with the talent and
							the time to create it will do so. Or if you happen
							to know of a particular creator that makes the
							specific sort of mod you're asking for, you can
							request directly from them. The goal being to give
							modders a way of figuring out what to make, and
							gamers a place to voice the kind of content they
							want to see.
						</p>
						<p>
							I believe that there is limitless potential in the
							creativity of our gaming communities. Let's make
							something awesome together.
						</p>
						<p>- Bianca</p>
					</div>
				</div>
			</ContentBody>
		</>
	);
};

export default AboutPage;
