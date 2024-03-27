import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    // proxy: {
    //   // Cấu hình proxy cho các yêu cầu bắt đầu với '/api'
    //   '/api': {
    //     target: 'http://api.training.div3.pgtest.co', // Địa chỉ của backend server
    //     changeOrigin: true,
    //     secure: false, // Đặt là false nếu backend server không có SSL
    //     rewrite: (path) => path.replace(/^\/api/, '')
    //   }
    // }
  },
})
