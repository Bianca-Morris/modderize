import React from "react";
import ErrorPage from "./ErrorPage";

const NotAuthenticated: React.FC = () => {
	return (
		<ErrorPage
			header1="Error: Not Authenticated"
			header2="Sorry!"
			header3="You cannot edit mod requests if you are not logged in."
		/>
	);
};
export default NotAuthenticated;
