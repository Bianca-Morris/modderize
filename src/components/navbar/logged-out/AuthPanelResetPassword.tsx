import { Dialog } from "@headlessui/react";
import React from "react";
import Button from "../../basic/Button";
import Input from "../../basic/Input";

type AuthPanelResetPasswordProps = {
	handleSwitch: Function;
};

const AuthPanelResetPassword: React.FC<AuthPanelResetPasswordProps> = ({
	handleSwitch
}) => {
	return (
		<div>
			<div className="flex flex-col justify-center align-center">
				<a
					className="text-sm text-center text-gray-500 underline"
					href={undefined}
					onClick={(e: React.MouseEvent<Element, MouseEvent>) =>
						handleSwitch(e, "signup")
					}
				>
					Don't have an account? Register
				</a>
			</div>
			<div className="mt-8 mx-8 flex flex-col">
				<label htmlFor="email" className="text-left">
					Email
				</label>
				<Input
					type="text"
					name="email"
					id="email"
					placeholder=""
					onChange={() => null}
					value=""
				/>
			</div>
			<div className="my-2 mx-8 flex flex-col text-center">
				<Button variant="blue" onClick={() => null}>
					Reset
				</Button>
			</div>
			<div className="flex flex-col justify-center align-center">
				<a
					className="text-sm text-center text-gray-500 underline"
					href={undefined}
					onClick={(e: React.MouseEvent<Element, MouseEvent>) =>
						handleSwitch(e, "login")
					}
				>
					Back to Login
				</a>
			</div>
		</div>
	);
};
export default AuthPanelResetPassword;
