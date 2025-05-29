import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, "./src"),
      '@components': path.resolve(__dirname, "./src/components"),
      '@auth': path.resolve(__dirname, "./src/components/auth"),
      '@features': path.resolve(__dirname, "./src/features"),
      '@hooks': path.resolve(__dirname, "./src/hooks"),
      '@pages': path.resolve(__dirname, "./src/pages"),
      '@redux': path.resolve(__dirname, "./src/redux"),
      '@services': path.resolve(__dirname, "./src/services"),
      '@assets': path.resolve(__dirname, "./src/assets"),
      '@axio': path.resolve(__dirname, "./src/axio"),
    }
  }
})
