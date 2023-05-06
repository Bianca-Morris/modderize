import React, { PropsWithChildren } from "react";
import { FunctionOutput, Nullable } from "../../types/misc";

interface ModEditPageLayoutProps extends PropsWithChildren {}

const ModEditPageLayout: React.FC<ModEditPageLayoutProps> = ({ children }) => {
	let left: Nullable<FunctionOutput> = null;
	let right: Nullable<FunctionOutput> = null;

	const childElements = React.Children.toArray(children);

	if (childElements.length > 1) {
		left = childElements[0];
		right = childElements[1];
	} else {
		right = childElements[0];
	}

	return (
		<div className="mt-10">
			<div className="md:grid md:grid-cols-3 md:gap-6">
				<div className="md:col-span-1">
					<div className="px-4 sm:px-0">{left}</div>
				</div>
				<div className="mt-5 md:col-span-2 md:mt-0">{right}</div>
			</div>
		</div>
	);
};
export default ModEditPageLayout;
