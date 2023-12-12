/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, {isServer}) => {
        if (!isServer) {
            config.resolve.fallback = {
                bcrypt: false,
                prisma: false
            }
        }
        return config
    }
}

module.exports = nextConfig
