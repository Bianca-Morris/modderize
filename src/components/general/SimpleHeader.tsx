import React, { PropsWithChildren } from "react";

const SimpleHeader: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className="w-full text-white p-10 bg-[#483D8B]">
			<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
				{children}
			</div>
		</div>
	);
};
export default SimpleHeader;
