import React, { PropsWithChildren } from "react";

interface H1Props extends PropsWithChildren {
	cls?: string;
}

const H1: React.FC<H1Props> = ({ cls = "", children }) => {
	let h1Class = `${cls} text-3xl font-bold`;
	return <h1 className={h1Class}>{children}</h1>;
};
export default H1;
