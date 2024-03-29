import React, { Fragment, PropsWithChildren, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { usePopper } from "react-popper";

interface DropdownProps extends PropsWithChildren {
	title: string;
	btnCls?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
	title,
	btnCls = "inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100",
	children
}) => {
	let [referenceElement, setReferenceElement] = useState<any>(null);
	let [popperElement, setPopperElement] = useState<any>(null);
	let { styles, attributes } = usePopper(referenceElement, popperElement);

	return (
		<Menu as="div" className="relative text-left">
			<div>
				<Menu.Button ref={setReferenceElement} className={btnCls}>
					{title}
					<ChevronDownIcon
						className="-mr-1 ml-2 h-5 w-5"
						aria-hidden="true"
					/>
				</Menu.Button>
			</div>

			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<Menu.Items
					ref={setPopperElement}
					{...attributes.popper}
					className={`${styles.popper} absolute z-10 mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
				>
					<div className="py-1">{children}</div>
				</Menu.Items>
			</Transition>
		</Menu>
	);
};

export default Dropdown;
