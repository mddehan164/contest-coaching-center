import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@shared': path.resolve(__dirname, 'src/shared'),
      '@custom': path.resolve(__dirname, 'src/custom'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
    },

  },
})
