import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command, mode, ssrBuild }) => {
  if (command === 'dev') {
    return {
        plugins: [react()],
        base: '/portfolio'
    }
  } else {
    // command === 'build'
    return {
      plugins: [react()],
      base: '/'
    }
  }
})
