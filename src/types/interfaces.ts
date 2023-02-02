// See: https://stackoverflow.com/questions/59106742/typescript-error-property-children-does-not-exist-on-type-reactnode
export interface PropsWithChildren {
	children: React.ReactNode;
};