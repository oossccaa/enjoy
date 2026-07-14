import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// GitHub Pages 部署在 /enjoy/ 子路徑下,base 必須設定才能正確載入資源
export default defineConfig({
  base: '/enjoy/',
  plugins: [vue()],
  build: {
    rollupOptions: {
      input: {
        // 雙進入點:index = 測驗本體;board = 16 杯設計圖板(/enjoy/board.html)
        main: './index.html',
        board: './board.html',
      },
    },
  },
})
