import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout/Layout";
import { RecoilRoot } from "recoil";
import Head from "next/head";
import { useRouter } from "next/router";

function App({ Component, pageProps }: AppProps) {
	const router = useRouter();

	return (
		<RecoilRoot>
			<Head>
				<title>Modderize</title>
				<link rel="icon" href="/favicon.ico" />
				<link
					rel="stylesheet"
					href="https://rsms.me/inter/inter.css"
				></link>
			</Head>
			<Layout>
				<Component {...pageProps} key={router.asPath} />
			</Layout>
		</RecoilRoot>
	);
}

export default App;
