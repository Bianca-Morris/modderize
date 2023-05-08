import React, { useEffect, useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { updateProfile } from "firebase/auth";
import { useRouter } from "next/router";

import { validateEmail } from "../../../helpers";
import { auth } from "../../../firebase/clientApp";
import Button from "../../basic/Button";
import Input from "../../basic/Input";
import OAuthGoogleButton from "./OAuthGoogleButton";
import { FIREBASE_ERRORS } from "../../../firebase/errors";
import useUserDocs from "../../../hooks/useUserDocs";
import A from "../../basic/A";

type AuthPanelRegisterProps = {
	handleSwitch: Function;
};

const AuthPanelRegister: React.FC<AuthPanelRegisterProps> = ({
	handleSwitch
}) => {
	const router = useRouter();
	const { isUsernameTaken, createUserDocument } = useUserDocs();
	const [registerForm, setRegisterForm] = useState({
		email: "",
		username: "",
		password: "",
		password2: ""
	});
	const { email, username, password, password2 } = registerForm;
	const [error, setError] = useState("");

	const [createUserWithEmailAndPassword, userCred, loading, firebaseError] =
		useCreateUserWithEmailAndPassword(auth);

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (error) setError("");

		if (password !== password2) {
			setError("Passwords do not match");
			return;
		} else if (!validateEmail(email)) {
			setError("Email address is not valid");
			return;
		}

		// Validate username (checks if already taken, if appropriate length, etc)
		const validUsername = await isValidUsername();
		if (!validUsername) return;

		// NOTE: Salting/hashing of passwords is done by Firebase before sending
		try {
			createUserWithEmailAndPassword(email, password);
			// Firebase errors, will be captured by useEffect below
		} catch (error) {
			console.error(
				"Error while creating user with email and password..."
			);
		}
	};

	const isValidUsername = async () => {
		// Check the length
		if (username.length < 3) {
			setError("Username must be at least 3 characters!");
			return false;
		}

		// Check if username is already taken or not
		const usernameTaken = await isUsernameTaken(username);

		if (usernameTaken) {
			setError("Username is already taken!");
			return false;
		}
		return true;
	};

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { target: { name = "", value = "" } = {} } = e;

		// update form state
		setRegisterForm((prev) => ({
			...prev,
			[name]: value
		}));
	};

	useEffect(() => {
		if (userCred) {
			const { user } = userCred;

			// Add the selected username as a displayName in auth
			updateProfile(user, {
				displayName: username
			})
				.then(() => {
					// Save the user data
					return createUserDocument(user);
				})
				.then(() => {
					// Redirect user to their profile page, so they can add images/make any edits
					router.push(`/users/${user.uid}`);
				})
				.catch((error) => {
					// An error occurred
					// ...
					setError(error.message);
					console.error(
						"Error while updating new user displayName",
						error
					);
				});
		}
	}, [userCred]);

	useEffect(() => {
		if (firebaseError) {
			console.error("firebaseError", firebaseError);
			setError(
				(FIREBASE_ERRORS[
					firebaseError.message
				] as keyof typeof FIREBASE_ERRORS) || "Something went wrong"
			);
			return;
		}
	}, [firebaseError]);

	return (
		<form onSubmit={onSubmit}>
			<div className="flex flex-col justify-center align-center">
				<A
					cls="text-sm text-center"
					variant="gray"
					tagType="a"
					href={undefined}
					onClick={(e: React.MouseEvent<Element, MouseEvent>) =>
						handleSwitch(e, "login")
					}
				>
					Already have an account? Log in
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
				<label htmlFor="username" className="text-left">
					Username
				</label>
				<Input
					required
					type="text"
					name="username"
					id="username"
					maxLength={15}
					placeholder="Ex: janeDoe"
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
					maxLength={20}
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
					maxLength={20}
					{...{ onChange }}
				/>
			</div>
			{error && (
				<div className="text-sm text-center text-red-600 mt-2">
					{error}
				</div>
			)}
			<div className="my-2 mx-8 flex flex-col text-center">
				<Button type="submit" variant="blue" {...{ loading }}>
					Register
				</Button>
				<span>OR</span>
				<OAuthGoogleButton />
			</div>
		</form>
	);
};
export default AuthPanelRegister;
