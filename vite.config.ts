import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 主站部署在 Vercel(網域根目錄),base 用 '/'。
// GitHub Pages 鏡像在 /enjoy/ 子路徑,由 workflow 以 `--base=/enjoy/` 覆蓋。
export default defineConfig({
  base: '/',
  plugins: [vue()],
})
