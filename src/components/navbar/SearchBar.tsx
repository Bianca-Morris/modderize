import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

type SearchBarProps = {
	visibleOnMobile?: boolean;
	visibleOnDesktop?: boolean;
};

const SearchBar: React.FC<SearchBarProps> = ({
	visibleOnMobile = true,
	visibleOnDesktop = true
}) => {
	let visibilityString = "";

	if (!visibleOnMobile) {
		visibilityString += "hidden md:block";
	} else if (!visibleOnDesktop) {
		visibilityString += "block md:hidden";
	}

	return (
		<div className={visibilityString}>
			<div className="relative rounded-md shadow-sm">
				<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
					<span className="text-gray-500" style={{ width: "15px" }}>
						<MagnifyingGlassIcon />
					</span>
				</div>
				<input
					type="text"
					name="search"
					id="search"
					className="block w-full rounded-md border-gray-300 pl-7 pr-32 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
					placeholder="Search..."
				/>
				<div className="absolute inset-y-0 right-0 flex items-center">
					<label htmlFor="searchType" className="sr-only">
						Search Type
					</label>
					<select
						id="searchType"
						name="searchType"
						className="h-full rounded-md border-transparent bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm cursor-pointer"
					>
						<option>By Keyword</option>
						<option>By Modder</option>
						<option>By Game</option>
					</select>
				</div>
			</div>
		</div>
	);
};
export default SearchBar;
