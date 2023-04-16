import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Button from "../basic/Button";
import { useRouter } from "next/router";

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

	const router = useRouter();
	const [textQuery, setTextQuery] = useState("");

	const onStartSearch = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(textQuery);

		const query = encodeURIComponent(textQuery);
		router.push(`/search/?type=modRequests&q=${query}`);
	};

	return (
		<div className={visibilityString}>
			<div className="relative rounded-md shadow-sm">
				<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
					<span className="text-gray-500" style={{ width: "15px" }}>
						<MagnifyingGlassIcon />
					</span>
				</div>
				<form onSubmit={(e) => onStartSearch(e)}>
					<input
						type="text"
						name="search"
						id="search"
						className="block w-full rounded-md border-gray-300 pl-7 pr-32 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						placeholder="Search Mod Requests..."
						value={textQuery}
						onChange={(e) => setTextQuery(e.target.value)}
						required
					/>
					<div className="absolute inset-y-0 right-0 flex items-center">
						<Button type="submit" variant="noOutline">
							Search
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};
export default SearchBar;
