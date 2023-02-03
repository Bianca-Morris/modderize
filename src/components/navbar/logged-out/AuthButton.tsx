import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../../atoms/authModalAtom";
import Button from "../../basic/Button";
import AuthModal from "./AuthModal";

type AuthButtonProps = {
	// onClick: function;
};

const AuthButton: React.FC<AuthButtonProps> = () => {
	const setAuthModalState = useSetRecoilState(authModalState);

	return (
		<>
			<Button
				onClick={() => setAuthModalState({ open: true, view: "login" })}
				cls="ml-4"
				variant="violet"
			>
				Login / Register
			</Button>
			{/* <AuthModal open={isOpen} setOpen={setIsOpen} /> */}
		</>
	);
};
export default AuthButton;
