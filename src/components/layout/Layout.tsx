import React from "react";
import { PropsWithChildren } from "../../types/interfaces";
import Navbar from "../navbar/Navbar";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			<Navbar />
			<main>{children}</main>
			{/* <Footer /> */}
		</>
	);
};
export default Layout;
