const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "standalone",
	// output: "export",
	// distDir: "dist",
	// async rewrites() {
	// 	return [
	// 		{
	// 			source: "/api/:path*",
	// 			destination: "http://127.0.0.1:3001/api/:path*",
	// 		},
	// 	];
	// },
	images: {
		domains: ["i.pravatar.cc"],
	},
	experimental: {
		appDir: true,
	},
};

module.exports = nextConfig;
