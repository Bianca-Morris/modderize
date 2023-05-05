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
					title="Connecting Modders and Gamers, Globally"
					subtitle="Modderize Is Building Community"
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
								src="/images/axville-XaTRLucavKQ-unsplash-compressed.jpeg"
								alt="Young man plays computer games with friends"
							/>
							<figcaption className="mt-5 text-xs text-left text-gray-400 w-full min-w-full">
								(Photo by&nbsp;
								<A
									variant="gray"
									href="https://unsplash.com/photos/XaTRLucavKQ"
									target="_blank"
									rel="noreferrer"
								>
									Axville
								</A>
								&nbsp;on Unsplash) Cupiditate id consequatur
								dolores vel exercitationem provident est
								possimus consequatur eum debitis dignissimos.
							</figcaption>
						</figure>
					</div>
					<div className="flex-1 flex flex-col gap-5">
						<p>
							Lorem ipsum dolor sit amet. Et quia tempora sit
							culpa obcaecati et dignissimos tempora. Vel
							molestiae blanditiis et necessitatibus blanditiis
							qui nisi eligendi. Sit totam nihil non mollitia
							repellat et asperiores dolores est ipsum molestias.
							Hic quidem praesentium aut dolor commodi in quasi
							saepe eos quis modi et eveniet facilis id asperiores
							architecto!
						</p>
						<p>
							Id earum consequatur quo sapiente reprehenderit id
							natus esse. Qui maxime asperiores eum aperiam minus
							et internos voluptatem eum eveniet laudantium et
							aspernatur voluptatibus ea ducimus praesentium? Ut
							perferendis dolores nam laudantium fugiat quo
							similique ipsam eos fugit molestias et eligendi
							consequatur ea doloremque quae sit dolorum sunt!
						</p>
						<p>
							Et consectetur iusto ad odit nostrum est placeat
							excepturi eum alias perspiciatis! Sit voluptates
							autem et impedit illo ut dolores quia.
						</p>
						<p>
							Ut nihil velit eos nostrum repudiandae qui rerum
							blanditiis et voluptatem dolores At soluta sint? In
							distinctio dolorem aut debitis autem qui quaerat
							eius eum Quis eveniet quo veritatis saepe quo
							consequatur sequi aut inventore laboriosam. Est quae
							dolores eos excepturi dolores nam magnam obcaecati
							cum facilis culpa qui dolorum facilis. Et veritatis
							omnis non iusto magni sit quae alias rem fugiat
							laudantium ut repudiandae quaerat ea magni corporis
							ut voluptas consequatur.
						</p>
					</div>
				</div>
			</ContentBody>
		</>
	);
};

export default AboutPage;
