/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	swcMinify: true,
	experimental: {
		serverActions: true
	},
	images: {
		domains: ["avatars.githubusercontent.com"]
	}
}
