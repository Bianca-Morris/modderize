import Link from "next/link";
import React from "react";

type GameCardProps = {
	displayName: string;
	id: string;
	imageURL?: string;
	cls?: string;
};

const GameCard: React.FC<GameCardProps> = ({
	imageURL,
	displayName,
	id,
	cls
}) => {
	return (
		<Link href={`/games/${id}`} className={cls}>
			{!imageURL && (
				<div className="flex items-center align-center justify-center text-gray-100 text-small w-52 h-52 bg-gray-300 rounded">
					Placeholder
				</div>
			)}
			{imageURL && (
				<img
					src={imageURL}
					alt={"Image of " + displayName}
					className="flex items-center align-center justify-center w-52 h-52 rounded"
				/>
			)}
			<div className="font-bold mt-3 h-10 w-52">{displayName}</div>
		</Link>
	);
};
export default GameCard;
