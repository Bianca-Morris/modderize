import React, { PropsWithChildren } from "react";
import { FunctionOutput, Nullable } from "../../types/misc";

interface ContentBodyProps extends PropsWithChildren {
	innerCls?: string;
	outerCls?: string;
}

const ContentBody: React.FC<ContentBodyProps> = ({
	children,
	outerCls,
	innerCls
}) => {
	let header: Nullable<FunctionOutput> = null;
	let body: Nullable<FunctionOutput> = null;

	const childElements = React.Children.toArray(children);

	if (childElements.length > 1) {
		header = childElements[0];
		body = childElements[1];
	} else {
		body = childElements[0];
	}

	return (
		<div
			className={
				"flex min-h-screen flex-col item-center justify-start pb-2 " +
				outerCls
			}
		>
			{header}
			<div
				className={
					"w-full flex mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 gap-16 " +
					innerCls
				}
			>
				{body}
			</div>
		</div>
	);
};

export default ContentBody;
