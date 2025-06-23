/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    reactStrictMode: true,
    images: {
     unoptimized: true
    },
    // Enable SWC minification for faster builds
    swcMinify: true,
    // Optimize fonts
    optimizeFonts: true,
    // Compress images on-the-fly
    compress: true,
    // Enable experimental features
    experimental: {
      // Optimize CSS
      optimizeCss: true,
      // Modern JS features
      esmExternals: true,
    },
    basePath: '',
    assetPrefix: process.env.NODE_ENV === 'production' ? '' : undefined,
}
  
  module.exports = nextConfig