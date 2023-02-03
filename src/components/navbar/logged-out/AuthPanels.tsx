import React from "react";
import { useRecoilValue } from "recoil";
import { authModalState } from "../../../atoms/authModalAtom";
import AuthPanelLogin from "./AuthPanelLogin";
import AuthPanelRegister from "./AuthPanelRegister";
import AuthPanelResetPassword from "./AuthPanelResetPassword";

type AuthPanelsProps = {
	handleSwitch: Function;
};

const AuthPanels: React.FC<AuthPanelsProps> = ({ handleSwitch }) => {
	const modalState = useRecoilValue(authModalState);
	const { view } = modalState;
	return (
		<>
			{view == "login" && <AuthPanelLogin {...{ handleSwitch }} />}
			{view == "signup" && <AuthPanelRegister {...{ handleSwitch }} />}
			{view == "resetPassword" && (
				<AuthPanelResetPassword {...{ handleSwitch }} />
			)}
		</>
	);
};
export default AuthPanels;
