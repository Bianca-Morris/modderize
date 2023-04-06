import React, {
	JSXElementConstructor,
	PropsWithChildren,
	ReactElement,
	ReactFragment,
	ReactPortal
} from "react";

type functionOutput =
	| string
	| number
	| ReactElement<any, string | JSXElementConstructor<any>>
	| ReactFragment
	| ReactPortal;
type Nullable<T> = T | null;

interface ContentBodyProps extends PropsWithChildren {
	innerCls?: string;
	outerCls?: string;
}

const ContentBody: React.FC<ContentBodyProps> = ({
	children,
	outerCls,
	innerCls
}) => {
	let header: Nullable<functionOutput> = null;
	let body: Nullable<functionOutput> = null;

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
