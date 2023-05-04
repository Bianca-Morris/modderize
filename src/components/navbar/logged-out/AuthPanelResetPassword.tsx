import LockClosedIcon from "@heroicons/react/24/outline/LockClosedIcon";
import React, { useState } from "react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";
import { FIREBASE_ERRORS } from "../../../firebase/errors";
import { validateEmail } from "../../../helpers";
import A from "../../basic/A";
import Button from "../../basic/Button";
import Input from "../../basic/Input";

type AuthPanelResetPasswordProps = {
	handleSwitch: Function;
};

const AuthPanelResetPassword: React.FC<AuthPanelResetPasswordProps> = ({
	handleSwitch
}) => {
	const [email, setEmail] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState(false);
	const [sendPasswordResetEmail, sending, firebaseError] =
		useSendPasswordResetEmail(auth);

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setError("");

		if (!validateEmail(email)) {
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

		await sendPasswordResetEmail(email);
		setSuccess(true);
	};

	return (
		<div>
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
					Don't have an account? Register
				</A>
			</div>
			<div className="flex items-center justify-center my-4">
				<div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
					<LockClosedIcon
						className="h-6 w-6 text-red-600"
						aria-hidden="true"
					/>
				</div>
			</div>
			{success ? (
				<p className="text-sm max-w-xs mb-4 text-center ">
					Email sent.
					<br />
					It should arrive in your inbox soon.
				</p>
			) : (
				<>
					<p className="text-sm max-w-xs">
						Enter the email associated with your account, and we'll
						send a password reset link shortly.
					</p>
					<form onSubmit={onSubmit}>
						<div className="mt-8 mx-8 flex flex-col">
							<label htmlFor="email" className="text-left">
								Email
							</label>
							<Input
								type="text"
								name="email"
								id="email"
								placeholder="Ex: jane.doe@mail.com"
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="my-2 mx-8 flex flex-col text-center">
							<Button
								type="submit"
								variant="blue"
								loading={sending}
							>
								Reset Password
							</Button>
						</div>
					</form>
					{error && (
						<div className="text-sm text-center text-red-600 mt-2">
							{error}
						</div>
					)}
				</>
			)}
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
					Back to Login
				</A>
			</div>
		</div>
	);
};
export default AuthPanelResetPassword;
