import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import compression from 'vite-plugin-compression2';

export default defineConfig(({ command, mode, ssrBuild }) => {
  if (command === 'dev') {
    return {
        plugins: [
          react(),
          compression({
            algorithm: 'gzip', exclude: [/\.(br)$ /, /\.(gz)$/]
          }),
          compression({
            algorithm: 'brotliCompress', exclude: [/\.(br)$ /, /\.(gz)$/],
           }),
        ],
        base: '/portfolio'
    }
  } else {
    // command === 'build'
    return {
      plugins: [
        react(),
        // compression({
        //   algorithm: 'gzip', exclude: [/\.(br)$ /, /\.(gz)$/]
        // }),
        // compression({
        //   algorithm: 'brotliCompress', exclude: [/\.(br)$ /, /\.(gz)$/],
        //  }),
      ],
      base: '/'
    }
  }
})
