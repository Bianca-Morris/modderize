import type { NextPage } from "next";
import Head from "next/head";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/clientApp";

import CardsSearchResult_Modder from "https://framer.com/m/Cards-SearchResult-Modder-Ziap.js@EuFW80XbgjhlwQZxAi0n";
import FeaturesJumbotronWithButtons from "https://framer.com/m/Features-JumbotronWithButtons-U3un.js@Nt1jyKYpPeYLViU5bfrE";

const Home: NextPage = () => {
	const [user, loadingUser] = useAuthState(auth);

	return (
		<div className="flex min-h-screen flex-col items-center justify-center py-2">
			<Head>
				<title>Modderize</title>
				<link rel="icon" href="/favicon.ico" />
				<link
					rel="stylesheet"
					href="https://rsms.me/inter/inter.css"
				></link>
			</Head>
			{/* <FeaturesJumbotronWithButtons
				// Using default values:
				jumbotronText="Lorem ipsum dolor sit amet. Ex maiores magnam in quis dignissimos quo quisquam accusamus. Ut fuga fugit qui provident velit et eaque deleniti in asperiores quibusdam. Et expedita debitis sed sint nobis sed dolores illo vel nemo deserunt."
				jumbotronTitle="Your Wildest Dreams Come True"
				onTapFulfillRequest={undefined}
				onTapModRequest={undefined}
			/> */}

			{user && (
				<h1 className="mb-8 text-xl">{"Hello, " + user.displayName}</h1>
			)}
			<CardsSearchResult_Modder />
		</div>
	);
};

export default Home;
