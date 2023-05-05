import React, { PropsWithChildren } from "react";

interface H3Props extends PropsWithChildren {
	cls?: string;
}

const H3: React.FC<H3Props> = ({ cls = "", children }) => {
	let h3Class = `${cls} text-xl font-medium`;
	return <h3 className={h3Class}>{children}</h3>;
};
export default H3;
