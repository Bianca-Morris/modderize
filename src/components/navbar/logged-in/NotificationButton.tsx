import React from "react";
import { Disclosure } from "@headlessui/react";
import { BellIcon } from "@heroicons/react/24/outline";

// interface NotificationButtonProps {
// 	open: boolean;
//  onClick: function;
// }

const NotificationButton: React.FC = () => {
	return (
		<button
			type="button"
			className="ml-4 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
		>
			<span className="sr-only">View notifications</span>
			<BellIcon className="h-6 w-6" aria-hidden="true" />
		</button>
	);
};

export default NotificationButton;
