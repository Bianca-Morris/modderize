import React from "react";

type UserLoaderProps = {
	num?: number;
};

const UserLoader: React.FC<UserLoaderProps> = ({ num = 4 }) => {
	const nLengthArr = Array(num).fill(undefined);
	return (
		<>
			{nLengthArr.map((item, i) => (
				<div
					key={i}
					className="flex flex-col justify-center items-center align-center p-5 gap-3"
				>
					<div>
						<div className="animate-pulse bg-gray-300 shadow-xl rounded-full h-52 w-52 align-middle border-none flex items-center justify-center"></div>
					</div>
					<div className="w-full p-3 m-2">
						<div className="text-2xl font-bold text-center mb-2 truncate hover:underline h-8"></div>
						<div className="text-green-800">
							<strong className="font-bold text-gray-200 pr-2">
								Completed:
							</strong>
						</div>
						<div className="text-blue-800 mb-3">
							<strong className="font-bold text-gray-200 pr-2">
								Pending:
							</strong>
						</div>
						<div className="bg-gray-100 animate-pulse rounded-lg w-100 h-10"></div>
					</div>
				</div>
			))}
		</>
	);
};
export default UserLoader;
