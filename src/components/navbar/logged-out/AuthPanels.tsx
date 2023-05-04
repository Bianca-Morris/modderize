import React from "react";
import { useRecoilValue } from "recoil";
import { modalControllerState } from "../../../atoms/modalControllerAtom";
import AuthPanelLogin from "./AuthPanelLogin";
import AuthPanelRegister from "./AuthPanelRegister";
import AuthPanelResetPassword from "./AuthPanelResetPassword";

type AuthPanelsProps = {
	handleSwitch: Function;
};

const AuthPanels: React.FC<AuthPanelsProps> = ({ handleSwitch }) => {
	const modalState = useRecoilValue(modalControllerState);
	const { authModalView: view } = modalState;
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
