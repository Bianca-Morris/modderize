import React from "react";
import { GetServerSidePropsContext } from "next";
import { auth } from "../../../firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import MyProfile from "../../../components/users/MyProfile";
import UserProfile from "../../../components/users/UserProfile";
import ErrorPage from "../../../errors/ErrorPage";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { doc, DocumentReference } from "firebase/firestore";
import { usersCol } from "../../../firebase/collections";
import { UserDoc } from "../../../types/docTypes";

type UserPageProps = {
	userID: string;
};

const UserPage: React.FC<UserPageProps> = ({ userID }) => {
	// Check the current user's profile
	const [user] = useAuthState(auth);

	const [userDoc, loading, error, snapshot] = useDocumentData(
		doc(
			usersCol,
			`${userID || "placeholder"}`
		) as DocumentReference<UserDoc>
	);

	// 404 Error message
	if (!userID) {
		return (
			<ErrorPage
				header1="Error: User Not Found"
				header2="Sorry!"
				header3="This user doesn't seem to be on Modderize."
				paragraph="The account may have been deleted, suspended, or banned."
			/>
		);
	} else if (!userDoc && !loading) {
		return (
			<ErrorPage
				header1="Error: User Not Found"
				header2="Sorry!"
				header3="This user doesn't seem to be on Modderize."
				paragraph="The account may have been deleted, suspended, or banned."
			/>
		);
	} else if (error) {
		return (
			<ErrorPage
				header1="Error: Something went wrong..."
				header2="Sorry!"
				header3={error.message}
			/>
		);
	}

	if (user?.uid === userID) {
		return <MyProfile {...{ userDoc }} loadingUserDoc={loading} />;
	} else {
		// If not, render public view user page
		return <UserProfile {...{ userID, userDoc }} />;
	}
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const { query: { userID = "" } = {} } = context || {};

	return {
		props: {
			userID
		}
	};
}

export default UserPage;
