import React from "react";
import ErrorPage from "./ErrorPage";

const NotAuthorized: React.FC = () => {
	return (
		<ErrorPage
			header1="Error: Not Authorized"
			header2={"Sorry!"}
			header3="You do not have permission to use this interface."
		/>
	);
};
export default NotAuthorized;
