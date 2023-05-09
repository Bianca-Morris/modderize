import React from "react";

type GameLoaderProps = {
	num?: number;
};
const GameLoader: React.FC<GameLoaderProps> = ({ num = 5 }) => {
	const nLengthArr = Array(num).fill(undefined);
	return (
		<>
			{nLengthArr.map((item, i) => {
				return (
					<div
						key={i}
						className="flex flex-1 flex-col text-center justify-center items-center"
					>
						<div className="animate-pulse flex items-center align-center justify-center text-gray-100 text-small w-52 h-52 bg-gray-100 rounded"></div>
						<div className="font-bold mt-3 h-10 w-52"></div>
					</div>
				);
			})}
		</>
	);
};

export default GameLoader;
