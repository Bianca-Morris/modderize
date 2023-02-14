/** @type {import('next').NextConfig} */
module.exports = {
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
