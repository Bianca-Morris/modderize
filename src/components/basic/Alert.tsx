import {
	ExclamationTriangleIcon,
	InformationCircleIcon
} from "@heroicons/react/20/solid";
import React from "react";

const COLOR_VARIANTS = {
	info: "text-blue-800 bg-blue-50 dark:bg-gray-800 dark:text-blue-400",
	danger: "text-red-800 bg-red-50 dark:bg-gray-800 dark:text-red-400",
	success: "text-green-800 bg-green-50 dark:bg-gray-800 dark:text-green-400",
	warning:
		"text-yellow-800 bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300",
	dark: "text-gray-800 bg-gray-50 dark:bg-gray-800 dark:text-gray-300"
};

const ICON_TYPE = {
	info: (
		<InformationCircleIcon
			className="mr-1 ml-2 h-5 w-5"
			aria-hidden="true"
		/>
	),
	warning: (
		<ExclamationTriangleIcon
			className="mr-1 ml-2 h-5 w-5"
			aria-hidden="true"
		/>
	)
};

type AlertProps = {
	title: string;
	subtitle?: string;
	showIcon?: boolean;
	iconType?: "info" | "warning";
	variant: "info" | "danger" | "success" | "warning" | "dark";
	cls?: string;
};

const Alert: React.FC<AlertProps> = ({
	variant,
	title,
	subtitle,
	showIcon,
	iconType,
	cls
}) => {
	if (showIcon && iconType) {
		return (
			<div
				className={`flex p-4 mb-4 text-sm rounded-lg ${COLOR_VARIANTS[variant]} ${cls}`}
				role="alert"
			>
				{ICON_TYPE[iconType]}
				<span className="sr-only">Info</span>
				<div>
					<span className="font-medium">{title}</span>&nbsp;{subtitle}
				</div>
			</div>
		);
	}

	return (
		<div
			className={`p-4 mb-4 text-sm rounded-lg ${COLOR_VARIANTS[variant]} ${cls}`}
			role="alert"
		>
			<span className="font-medium">{title}</span>&nbsp;
			{subtitle}
		</div>
	);
};

export default Alert;
