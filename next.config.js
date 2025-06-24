/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    reactStrictMode: true,
    images: {
     unoptimized: true
    },
    // Set the correct base path to work with GitHub Pages
    basePath: '',
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
    // Webpack config for handling any special loaders
    webpack: (config) => {
        config.module.rules.push({
            test: /\.(pdf|ico|svg)$/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        publicPath: '/_next/static/files/',
                        outputPath: 'static/files/',
                        name: '[name].[hash].[ext]',
                    },
                },
            ],
        });
        return config;
    },
}
  
  module.exports = nextConfig