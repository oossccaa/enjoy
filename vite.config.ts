import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// GitHub Pages 部署在 /enjoy/ 子路徑下,base 必須設定才能正確載入資源
export default defineConfig({
  base: '/enjoy/',
  plugins: [vue()],
})
