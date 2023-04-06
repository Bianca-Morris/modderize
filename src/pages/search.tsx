import { useRouter } from "next/router";
import React from "react";
import SimpleHeader from "../components/general/SimpleHeader";
import ContentBody from "../components/layout/ContentBody";
import Filters from "../components/search/Filters";

type SearchPageProps = {};

const SearchPage: React.FC<SearchPageProps> = () => {
	const router = useRouter();

	// Get query parameters from query
	const { type } = router.query;
	return (
		<div>
			<SimpleHeader>
				<div className="flex w-100 justify-between items-center">
					<div className="flex flex-col text-3xl">
						<h1>Search Results</h1>

						{type && (
							<span className="capitalize text-sm">
								Search &gt; {type}
							</span>
						)}
					</div>
					# items found
				</div>
			</SimpleHeader>
			<ContentBody>
				<div className="flex w-full py-10">
					<div className="flex-1">
						// TODO: Search Filters
						{<Filters />}
					</div>
					<div className="flex-1">// TODO: Search Results</div>
				</div>
			</ContentBody>
		</div>
	);
};
export default SearchPage;
