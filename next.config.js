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
	// Warning: This allows production builds to successfully complete even if
	// your project has ESLint errors.
	ignoreDuringBuilds: true
};
