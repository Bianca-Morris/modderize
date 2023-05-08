import React, { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";

import { auth } from "../../../firebase/clientApp";
import { FIREBASE_ERRORS } from "../../../firebase/errors";
import A from "../../basic/A";
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
	const { email, password } = loginForm;

	const [signInWithEmailAndPassword, user, loading, firebaseError] =
		useSignInWithEmailAndPassword(auth);

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			signInWithEmailAndPassword(email, password);
		} catch (e) {
			console.error("error", e);
		}
	};

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
				<A
					cls="text-sm text-center"
					variant="gray"
					tagType="a"
					href={undefined}
					onClick={(e: React.MouseEvent<Element, MouseEvent>) =>
						handleSwitch(e, "signup")
					}
				>
					Don&apos;t have an account? Register
				</A>
			</div>
			<div className="mt-8 mx-8 flex flex-col">
				<label htmlFor="email" className="text-left">
					Email
				</label>
				<Input
					required
					type="email"
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
			{firebaseError && (
				<div className="text-sm text-center text-red-600 mt-2">
					{(FIREBASE_ERRORS[
						firebaseError?.message
					] as keyof typeof FIREBASE_ERRORS) ||
						"Something went wrong"}
				</div>
			)}
			<div className="my-2 mx-8 flex flex-col text-center">
				<Button type="submit" variant="blue" {...{ loading }}>
					Login
				</Button>
				<span className="my-2 text-sm">OR</span>
				<OAuthGoogleButton />
			</div>
			<div className="flex flex-col justify-center align-center">
				<A
					cls="text-sm text-center"
					variant="gray"
					tagType="a"
					href={undefined}
					onClick={(e: React.MouseEvent<Element, MouseEvent>) =>
						handleSwitch(e, "resetPassword")
					}
				>
					Forgot Password?
				</A>
			</div>
		</form>
	);
};
export default AuthPanelLogin;
