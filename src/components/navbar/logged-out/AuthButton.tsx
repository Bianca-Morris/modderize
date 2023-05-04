import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { modalControllerState } from "../../../atoms/modalControllerAtom";
import Button from "../../basic/Button";
import AuthModal from "./AuthModal";

type AuthButtonProps = {
	// onClick: function;
};

const AuthButton: React.FC<AuthButtonProps> = () => {
	const setAuthModalState = useSetRecoilState(modalControllerState);

	return (
		<>
			<Button
				onClick={() =>
					setAuthModalState((prev) => ({
						...prev,
						authModalOpen: true,
						authModalView: "login"
					}))
				}
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
