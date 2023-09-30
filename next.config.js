/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: { serverComponentsExternalPackages: ['@prisma/client', 'bcrypt']},
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
      },
}

module.exports = nextConfig
