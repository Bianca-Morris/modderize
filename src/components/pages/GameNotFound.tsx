import React from "react";
import Button from "../basic/Button";
import SimpleHeader from "../general/SimpleHeader";
import ContentBody from "../layout/ContentBody";

const GameNotFoundPage: React.FC = () => {
	return (
		<ContentBody>
			<SimpleHeader>
				<div className="flex text-center text-3xl">
					<h1>Error: Game Not Found</h1>
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
						<a className="underline text-gray-500" href="/browse">
							Browse by Game
						</a>
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
