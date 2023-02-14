import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout/Layout";
import { RecoilRoot } from "recoil";
import CardsSearchResult_Modder from "https://framer.com/m/Cards-SearchResult-Modder-Ziap.js@EuFW80XbgjhlwQZxAi0n";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<RecoilRoot>
			<Layout>
				<Component {...pageProps} />
				<CardsSearchResult_Modder />
			</Layout>
		</RecoilRoot>
	);
}

export default MyApp;
