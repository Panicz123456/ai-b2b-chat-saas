import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "ik.imagekit.io",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "avatars.githubusercontent.com",
				pathname: "/**",
			},
			{ 
				protocol: "https",
				hostname: "*.googleusercontent.com"
			},
			{
				protocol: "https",
				hostname: "avatar.vercel.sh"
			}
		],
	},
};

export default nextConfig;
