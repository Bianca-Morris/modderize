import React from "react";
import A from "../basic/A";
import Button from "../basic/Button";
import H1 from "../basic/typography/H1";
import SimpleHeader from "../general/SimpleHeader";
import ContentBody from "../layout/ContentBody";

const GameNotFoundPage: React.FC = () => {
	return (
		<ContentBody>
			<SimpleHeader>
				<div className="flex text-center">
					<H1>Error: Game Not Found</H1>
				</div>
			</SimpleHeader>
			<>
				<div className="py-6">
					<h1 className="text-xl font-bold font-medium text-gray-900 mb-3">
						Sorry!
					</h1>
					<h2>This game doesn't seem to be on Modderize.</h2>
					<p>
						Check the spelling of the ID or&nbsp;
						<A variant="gray" href="/games">
							Browse by Game
						</A>
						.
					</p>
					<Button type="button" variant="gray" cls="mt-3">
						Request a Game
					</Button>
				</div>
			</>
		</ContentBody>
	);
};

export default GameNotFoundPage;
