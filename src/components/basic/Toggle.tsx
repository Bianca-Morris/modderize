import React, { useState } from "react";
import { Switch } from "@headlessui/react";

type ToggleProps = {
	value?: boolean;
	label?: string;
	onToggle: (newState: boolean) => void;
	loading?: boolean;
};

const Toggle: React.FC<ToggleProps> = ({
	onToggle,
	value = false,
	label,
	loading = false
}) => {
	return (
		<Switch.Group>
			<div className="flex items-center">
				{label && <Switch.Label className="mr-4">{label}</Switch.Label>}
				<Switch
					disabled={loading}
					checked={value}
					onChange={onToggle}
					className={`${
						value ? "bg-blue-600" : "bg-gray-200"
					} relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
				>
					<span
						className={`${
							value ? "translate-x-6" : "translate-x-1"
						} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
					/>
				</Switch>
			</div>
		</Switch.Group>
	);
};
export default Toggle;
