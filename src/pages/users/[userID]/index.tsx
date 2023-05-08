import React from "react";
import { GetServerSidePropsContext } from "next";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase/clientApp";
import safeJsonStringify from "safe-json-stringify";
import { User } from "@firebase/auth";
import SimpleHeader from "../../../components/general/SimpleHeader";
import { useAuthState } from "react-firebase-hooks/auth";
import MyProfile from "../../../components/users/MyProfile";
import UserProfile from "../../../components/users/UserProfile";
import H1 from "../../../components/basic/typography/H1";
import H2 from "../../../components/basic/typography/H2";
import H3 from "../../../components/basic/typography/H3";

type UserPageProps = {
	userData: User;
};

const UserPage: React.FC<UserPageProps> = ({ userData }) => {
	// 404 Error message
	if (!userData) {
		return (
			<div className="flex min-h-screen flex-col item-center justify-start pb-2">
				<SimpleHeader>
					<div className="flex text-center">
						<H1>Error: User Not Found</H1>
					</div>
				</SimpleHeader>
				<div className="w-full flex mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 gap-16">
					<div className="py-6">
						<H2 cls="text-gray-900 mb-3">Sorry!</H2>
						<H3>This user doesn't seem to be on Modderize.</H3>
						<p>The account may have been deleted or banned.</p>
					</div>
				</div>
			</div>
		);
	}

	// Check if the current user's profile
	const [user] = useAuthState(auth);
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
		// TODO: Create error page
		console.error("/users/<id> getServerSideProps error", error);
		return null;
	}
}

export default UserPage;
