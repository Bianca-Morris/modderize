import React from "react";
import A from "../basic/A";
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

{
	/* <div className="flex min-h-screen flex-col item-center justify-start pb-2">
<SimpleHeader>
	<div className="flex text-center text-3xl">
		<h1>Error: Game Not Found</h1>
	</div>
</SimpleHeader>
<div className="w-full flex mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 gap-16">
	<div className="py-6">
		<h1 className="text-xl font-bold font-medium text-gray-900 mb-3">
			Sorry!
		</h1>
		<h2>This game doesn't seem to be on Modderize.</h2>
		<p>
			Check the spelling of the ID or&nbsp;
			<a
				className="underline text-gray-500"
				href="/games"
			>
				Browse by Game
			</a>
			.
		</p>
		<Button type="button" variant="gray" cls="mt-3">
			Request a Game
		</Button>
	</div>
</div>
</div> */
}
