import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5000,
    proxy: {
      '/file': 'http://localhost:2100',
    }
  }
})
