/** @type {import('next').NextConfig} */
module.exports = {
	images: {
		remotePatterns: [
			{
				hostname: "firebasestorage.googleapis.com",
				protocol: "https",
				port: "",
				pathname: "/v0/b/modderize.appspot.com/o/*"
			},
			{
				hostname: "lh3.googleusercontent.com",
				protocol: "https",
				port: "",
				pathname: "/a/*"
			}
		]
	},
	reactStrictMode: true,
	experimental: {
		urlImports: [
			"https://framer.com/m/",
			"https://framerusercontent.com/",
			"https://fonts.gstatic.com/",
			"https://ga.jspm.io/",
			"https://jspm.dev/"
		]
	}
};
