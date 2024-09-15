/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
		config.externals.push("@node-rs/argon2", "@node-rs/bcrypt");
		return config;
	},
	images: {
		domains: ['unsplash.com'], // Add other domains as needed
	  },
	
};

export default nextConfig;
