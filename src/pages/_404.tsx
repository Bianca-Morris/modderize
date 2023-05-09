import React from "react";
import ErrorPage from "../errors/ErrorPage";

const _404: React.FC = () => {
	return (
		<ErrorPage
			header1={"Error: Page Not Found"}
			header2="Check the URL and try again."
		/>
	);
};
export default _404;
