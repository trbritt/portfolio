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
    }
  }
  
  module.exports = nextConfig