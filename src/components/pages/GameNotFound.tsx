import React from "react";
import ErrorPage from "../../errors/ErrorPage";
import A from "../basic/A";

const GameNotFoundPage: React.FC = () => {
	return (
		<ErrorPage
			header1="Error: Game Not Found"
			header2="Sorry!"
			header3="This game doesn't seem to be on Modderize."
			paragraph={
				<>
					Check the spelling of the ID or&nbsp;
					<A variant="gray" href="/games">
						Browse by Game
					</A>
					.
				</>
			}
		/>
	);
};

export default GameNotFoundPage;
