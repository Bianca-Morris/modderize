import { User } from "firebase/auth";
import { doc } from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import React from "react";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";
import H1 from "../../../components/basic/typography/H1";
import H3 from "../../../components/basic/typography/H3";
import NewUserModRequestForm from "../../../components/forms/NewUserModRequestForm";
import SimpleHeader from "../../../components/general/SimpleHeader";
import ContentBody from "../../../components/layout/ContentBody";
import { auth, db } from "../../../firebase/clientApp";
import ModEditPageLayout from "../../../components/layout/ModEditPageLayout";

type UserModRequestPageProps = {
	requesteeID: string;
};

const UserModRequestPage: React.FC<UserModRequestPageProps> = ({
	requesteeID
}) => {
	const [currentUser] = useAuthState(auth);
	const { uid: requesterID } = currentUser || {};

	const requesteeUserRef = doc(db, `users/${requesteeID || "placeholder"}`);
	const [requesteeDoc, loading, error, snapshot] =
		useDocumentData(requesteeUserRef);

	if (!currentUser) {
		// Must be logged in to make a mod request
		return <div>Must be logged in to make a mod request</div>;
	} else if (requesterID === requesteeID) {
		// Cannot request mod from self
		return <div>Cannot request mod from self</div>;
	} else if (!requesteeID) {
		return <div>Invalid requestee ID.</div>;
	}

	const { photoURL = "", displayName } = requesteeDoc || {};
	return (
		<div>
			<ContentBody>
				<>
					<SimpleHeader>
						<div className="flex justify-center">
							<div className="flex flex-col">
								<H1>Request Mod From User</H1>
							</div>
						</div>
					</SimpleHeader>
				</>
				<ModEditPageLayout>
					<>
						{photoURL && (
							<Image
								height={128}
								width={128}
								src={photoURL}
								alt={`${displayName}'s profile pic`}
								className="rounded-full m-auto mb-5"
							/>
						)}
						<H3 cls="leading-6 text-gray-900 text-center">
							{requesteeDoc?.displayName}
						</H3>
						<p className="mt-1 text-sm text-gray-600">
							This mod request will be sent specifically to{" "}
							{requesteeDoc?.displayName}, and will appear on
							their user dashboard the next time they log in. If
							they refuse the request, it will become open for
							other creators in the game community to take on.
						</p>
					</>
					<>
						{currentUser && requesteeDoc && (
							<NewUserModRequestForm
								requestee={requesteeDoc as User}
							/>
						)}
					</>
				</ModEditPageLayout>
			</ContentBody>
		</div>
	);
};

export function getServerSideProps(context: GetServerSidePropsContext) {
	const { query: { userID = "" } = {} } = context || {};
	return { props: { requesteeID: userID } };
}

export default UserModRequestPage;
