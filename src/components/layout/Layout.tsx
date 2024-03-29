import React, { PropsWithChildren } from "react";
import Footer from "../navbar/Footer";
import Navbar from "../navbar/Navbar";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			<Navbar />
			<main>{children}</main>
			<Footer />
		</>
	);
};
export default Layout;
