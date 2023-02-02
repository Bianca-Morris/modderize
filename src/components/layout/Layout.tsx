import React from "react";

interface Props {
	children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
	return (
		<>
			{/* <Navbar /> */}
			<main>{children}</main>
			{/* <Footer /> */}
		</>
	);
};
export default Layout;
