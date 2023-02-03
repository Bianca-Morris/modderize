import { Dialog } from "@headlessui/react";
import React from "react";
import Button from "../../basic/Button";
import Input from "../../basic/Input";

type AuthPanelRegisterProps = {
	handleSwitch: Function;
};

const AuthPanelRegister: React.FC<AuthPanelRegisterProps> = ({
	handleSwitch
}) => {
	return (
		<div>
			<div className="flex flex-col justify-center align-center">
				<a
					className="text-sm text-center text-gray-500 underline"
					href={undefined}
					onClick={(e: React.MouseEvent<Element, MouseEvent>) =>
						handleSwitch(e, "login")
					}
				>
					Already have an account? Log in
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
			<div className="mt-2 mx-8 flex flex-col">
				<label htmlFor="password" className="text-left">
					Password
				</label>
				<Input
					type="password"
					name="password"
					id="password"
					placeholder=""
					onChange={() => null}
					value=""
				/>
			</div>
			<div className="mt-2 mx-8 flex flex-col">
				<label htmlFor="password2" className="text-left">
					Repeat Password
				</label>
				<Input
					type="password"
					name="password2"
					id="password2"
					placeholder=""
					onChange={() => null}
					value=""
				/>
			</div>
			<div className="my-2 mx-8 flex flex-col text-center">
				<Button variant="blue" onClick={() => null}>
					Register
				</Button>
				<span>OR</span>
				<Button variant="gray" onClick={() => null}>
					Continue with Google
				</Button>
			</div>
		</div>
	);
};
export default AuthPanelRegister;
