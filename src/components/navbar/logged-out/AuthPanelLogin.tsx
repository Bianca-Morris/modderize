import { Dialog } from "@headlessui/react";
import React, { useState } from "react";
import Button from "../../basic/Button";
import Input from "../../basic/Input";
import OAuthGoogleButton from "./OAuthGoogleButton";

type AuthPanelLoginProps = {
	handleSwitch: Function;
};

const AuthPanelLogin: React.FC<AuthPanelLoginProps> = ({ handleSwitch }) => {
	const [loginForm, setLoginForm] = useState({
		email: "",
		password: ""
	});

	const onSubmit = () => {};
	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { target: { name = "", value = "" } = {} } = event;
		// update form state
		setLoginForm((prev) => ({
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
			<div className="my-2 mx-8 flex flex-col text-center">
				<Button type="submit" variant="blue" onClick={onSubmit}>
					Login
				</Button>
				<span>OR</span>
				<OAuthGoogleButton />
			</div>
			<div className="flex flex-col justify-center align-center">
				<a
					className="text-sm text-center text-gray-500 underline"
					href={undefined}
					onClick={(e: React.MouseEvent<Element, MouseEvent>) =>
						handleSwitch(e, "resetPassword")
					}
				>
					Forgot Password?
				</a>
			</div>
		</form>
	);
};
export default AuthPanelLogin;