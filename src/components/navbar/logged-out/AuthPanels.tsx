import React from "react";
import { useRecoilValue } from "recoil";
import { modalControllerAtom } from "../../../atoms/modalControllerAtom";
import AuthPanelLogin from "./AuthPanelLogin";
import AuthPanelRegister from "./AuthPanelRegister";
import AuthPanelResetPassword from "./AuthPanelResetPassword";

type AuthPanelsProps = {
	handleSwitch: Function;
};

const AuthPanels: React.FC<AuthPanelsProps> = ({ handleSwitch }) => {
	const modalState = useRecoilValue(modalControllerAtom);
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
