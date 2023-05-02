import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { ReallySimpleInfiniteScroll } from "react-really-simple-infinite-scroll";
import { ModRequest as ModRequestType } from "../../types/docTypes";
import ModRequestShort from "../general/ModRequest";

type ModRequestResultsProps = {
	hasMore: boolean;
	results: ModRequestType[];
	isInfiniteLoading: boolean;
	onInfiniteLoadCallback: () => void;
};

const ModRequestResults: React.FC<ModRequestResultsProps> = ({
	hasMore,
	results = [],
	isInfiniteLoading,
	onInfiniteLoadCallback
}) => {
	return (
		<div>
			<ReallySimpleInfiniteScroll
				className={`infinite-scroll`}
				hasMore={hasMore}
				length={results.length}
				loadingComponent={
					<div className="loading-component">
						<span className="loading-label">Loading...</span>
					</div>
				}
				isInfiniteLoading={isInfiniteLoading}
				onInfiniteLoad={onInfiniteLoadCallback}
			>
				{results.map((modRequest) => {
					const { title, id } = modRequest;
					return (
						<ModRequestShort
							key={id}
							{...{ title, modRequest }}
							subTitle="This is a subtitle"
						/>
					);
				})}
			</ReallySimpleInfiniteScroll>

			{results.length === 0 && (
				<div className="w-full pl-10">No Mod Requests found!</div>
			)}
		</div>
	);
};
export default ModRequestResults;
