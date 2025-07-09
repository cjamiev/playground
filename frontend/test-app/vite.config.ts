import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/library': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      }
    }
  }
})
