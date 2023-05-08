import React from "react";
import { GetServerSidePropsContext } from "next";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase/clientApp";
import safeJsonStringify from "safe-json-stringify";
import { User } from "@firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import MyProfile from "../../../components/users/MyProfile";
import UserProfile from "../../../components/users/UserProfile";
import ErrorPage from "../../../errors/ErrorPage";

type UserPageProps = {
	userData: User;
};

const UserPage: React.FC<UserPageProps> = ({ userData }) => {
	// Check if the current user's profile
	const [user] = useAuthState(auth);

	// 404 Error message
	if (!userData) {
		return (
			<ErrorPage
				header1="Error: User Not Found"
				header2="Sorry!"
				header3="This user doesn't seem to be on Modderize."
				paragraph="The account may have been deleted, suspended, or banned."
			/>
		);
	}

	if (user?.uid === userData.uid) {
		return <MyProfile {...{ userData }} />;
	} else {
		// If not, render public view user page
		return <UserProfile {...{ userData }} />;
	}
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const { query: { userID = "" } = {} } = context || {};

	try {
		// Grab document for this game
		const userDocRef = doc(db, "users", userID as string);
		const userDoc = await getDoc(userDocRef);

		return {
			props: {
				userData: userDoc.exists()
					? JSON.parse(
							safeJsonStringify({
								id: userDoc.id,
								...userDoc.data()
							})
					  )
					: null
			}
		};
	} catch (error) {
		console.error("/users/<id> getServerSideProps error", error);
		return null;
	}
}

export default UserPage;
