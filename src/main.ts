import { createApp } from 'vue'
import { inject } from '@vercel/analytics'
import App from './App.vue'
import './styles/main.css'

// Vercel Web Analytics:只在主站注入(本機與 GitHub Pages 鏡像沒有 /_vercel 端點)
const host = location.hostname
if (host !== 'localhost' && !host.endsWith('.github.io')) inject()

createApp(App).mount('#app')
