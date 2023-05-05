import React, { PropsWithChildren } from "react";

interface H2Props extends PropsWithChildren {
	cls?: string;
}

const H2: React.FC<H2Props> = ({ cls = "", children }) => {
	let h2Class = `${cls} text-2xl font-bold`;
	return <h2 className={h2Class}>{children}</h2>;
};
export default H2;
