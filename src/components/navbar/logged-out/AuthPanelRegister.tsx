import { Dialog } from "@headlessui/react";
import React, { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";

import { validateEmail } from "../../../helpers";
import { auth } from "../../../firebase/clientApp";
import Button from "../../basic/Button";
import Input from "../../basic/Input";
import OAuthGoogleButton from "./OAuthGoogleButton";
import { FIREBASE_ERRORS } from "../../../firebase/errors";

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
	const { email, password, password2 } = registerForm;
	const [error, setError] = useState("");

	const [createUserWithEmailAndPassword, user, loading, firebaseError] =
		useCreateUserWithEmailAndPassword(auth);

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (error) setError("");

		if (password !== password2) {
			setError("Passwords do not match");
			return;
		} else if (!validateEmail(email)) {
			setError("Email address is not valid");
			return;
		} else if (firebaseError) {
			console.error("firebaseError", firebaseError);
			setError(
				(FIREBASE_ERRORS[
					firebaseError.message
				] as keyof typeof FIREBASE_ERRORS) || "Something went wrong"
			);
			return;
		}

		// TODO: Do some salt/hashing of passwords before sending

		createUserWithEmailAndPassword(email, password);
		console.log("user", user);

		// TODO: Set short timeout & then trigger navigation to Login section
	};

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { target: { name = "", value = "" } = {} } = e;

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
					className="text-sm text-center text-gray-500 underline cursor-pointer"
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
					placeholder="Ex: jane.doe@mail.com"
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
					{...{ onChange }}
				/>
			</div>
			<div className="mt-2 mx-8 flex flex-col">
				<label htmlFor="password2" className="text-left">
					Confirm Password
				</label>
				<Input
					required
					type="password"
					name="password2"
					id="password2"
					placeholder=""
					{...{ onChange }}
				/>
			</div>
			{error && (
				<div className="text-sm text-center text-red-600 mt-2">
					{error}
				</div>
			)}
			<div className="my-2 mx-8 flex flex-col text-center">
				<Button
					type="submit"
					variant="blue"
					// onClick={onSubmit}
					{...{ loading }}
				>
					Register
				</Button>
				<span>OR</span>
				<OAuthGoogleButton />
			</div>
		</form>
	);
};
export default AuthPanelRegister;
