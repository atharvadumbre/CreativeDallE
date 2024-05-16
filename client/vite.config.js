import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    assetsDir: './src/assets',
    rollupOptions: {
      input: {
        main: './src/main.jss',
      },
    },
  },
})
