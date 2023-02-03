import { Dialog } from "@headlessui/react";
import React, { useState } from "react";
import Button from "../../basic/Button";
import Input from "../../basic/Input";
import OAuthGoogleButton from "./OAuthGoogleButton";

type AuthPanelRegisterProps = {
	handleSwitch: Function;
};

const AuthPanelRegister: React.FC<AuthPanelRegisterProps> = ({
	handleSwitch
}) => {
	const [registerForm, setRegisterForm] = useState({
		email: "",
		password: "",
		password2: ""
	});

	const onSubmit = () => {};
	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { target: { name = "", value = "" } = {} } = event;
		// update form state
		setRegisterForm((prev) => ({
			...prev,
			[name]: value
		}));
	};

	return (
		<form onSubmit={onSubmit}>
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
					required
					type="text"
					name="email"
					id="email"
					placeholder=""
					value=""
					{...{ onChange }}
				/>
			</div>
			<div className="mt-2 mx-8 flex flex-col">
				<label htmlFor="password" className="text-left">
					Password
				</label>
				<Input
					required
					type="password"
					name="password"
					id="password"
					placeholder=""
					value=""
					{...{ onChange }}
				/>
			</div>
			<div className="mt-2 mx-8 flex flex-col">
				<label htmlFor="password2" className="text-left">
					Password
				</label>
				<Input
					required
					type="password"
					name="password2"
					id="password2"
					placeholder=""
					value=""
					{...{ onChange }}
				/>
			</div>
			<div className="my-2 mx-8 flex flex-col text-center">
				<Button type="submit" variant="blue" onClick={onSubmit}>
					Register
				</Button>
				<span>OR</span>
				<OAuthGoogleButton />
			</div>
		</form>
	);
};
export default AuthPanelRegister;
