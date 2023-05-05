import A from "../components/basic/A";
import SimpleHeader from "../components/general/SimpleHeader";
import ContentBody from "../components/layout/ContentBody";

/**
 * Distract people with an adorable cat if/when the app breaks
 */
function Error({ statusCode }) {
	return (
		<ContentBody>
			<>
				<SimpleHeader>
					<div className="flex justify-center">
						<div className="flex flex-col text-center">
							<h1 className="text-3xl font-bold uppercase">
								Error
							</h1>
							<h2 className="text-lg">
								{statusCode
									? `A ${statusCode} error occurred on the server`
									: "An error occurred on the client"}
							</h2>
						</div>
					</div>
				</SimpleHeader>
			</>
			<>
				<div className="mt-10 w-full flex flex-col justify-center items-center align-center">
					<figure className="mb-10 max-w-full">
						<img
							className="w-full rounded-lg"
							src="images/pexels-amir-ghoorchiani-1183434.jpeg"
							alt="Sad kitty apologizes for error"
						></img>
						<figcaption className="text-xs pl-2 pt-1">
							Photo by{" "}
							<A
								variant="gray"
								href="https://www.pexels.com/photo/close-up-photo-of-cat-with-its-eyes-closed-1183434/"
								target="_blank"
								rel="noreferrer"
							>
								Amir Ghoorchiani
							</A>
						</figcaption>
					</figure>
					<p className="text-2xl font-bold">Mistakes were made!</p>
					<A variant="violet" href="/">
						Back to the Home Page?
					</A>
				</div>
			</>
		</ContentBody>
	);
}

Error.getInitialProps = ({ res, err }) => {
	const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
	return { statusCode };
};

export default Error;
