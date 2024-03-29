import { Disclosure } from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import React, { useState } from "react";
import H3 from "../basic/typography/H3";

type SectionType = {
	id: string;
	options: { value; checked; label }[];
	name: string;
};

type CollapsibleFilterProps = {
	section: SectionType;
	onChange: (e) => void;
	value: string;
};

const CollapsibleFilter: React.FC<CollapsibleFilterProps> = ({
	section,
	onChange,
	value
}) => {
	const [open, setOpen] = useState(false);
	return (
		<Disclosure
			as="div"
			key={section.id}
			className="border-t border-gray-200 px-4 py-6"
		>
			<H3 cls="-mx-2 -my-3 flow-root">
				<Disclosure.Button
					onClick={() => setOpen(!open)}
					className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500"
				>
					<span className="font-medium text-gray-900">
						{section.name}
					</span>
					<span className="ml-6 flex items-center">
						{open ? (
							<MinusIcon className="h-5 w-5" aria-hidden="true" />
						) : (
							<PlusIcon className="h-5 w-5" aria-hidden="true" />
						)}
					</span>
				</Disclosure.Button>
			</H3>
			<Disclosure.Panel className="pt-6">
				<div className="space-y-2">
					{section.options.map((option) => (
						<div key={option.value} className="flex items-center">
							<input
								id={`filter-${section.id}-${option.value}`}
								name={section.id}
								type="radio"
								value={option.value}
								checked={option.checked}
								onChange={onChange}
								className="h-4 w-4 rounded-full border-gray-300 text-indigo-600 focus:ring-indigo-500"
							/>
							<label
								htmlFor={`filter-${section.id}-${option.value}`}
								className="ml-3 min-w-0 flex-1 text-gray-500"
							>
								{option.label}
							</label>
						</div>
					))}
				</div>
			</Disclosure.Panel>
		</Disclosure>
	);
};
export default CollapsibleFilter;
