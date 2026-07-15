<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import type { SoulType } from '../types'
import { DRINK_IMAGES } from '../data/drinkImages'

defineProps<{ type: SoulType }>()
const emit = defineEmits<{ (e: 'again'): void; (e: 'share'): void }>()

/* 酒照載入完成後才顯影(loaded 觸發 CSS transition)。
   不能只靠 @load:Safari 對快取圖偶發不觸發 load 事件,漏接就永遠隱形。
   三層保險:掛載時檢查 complete / error 重試一次 / 看門狗超時強制顯影
  (顯影後圖片資料到了瀏覽器自然會畫出來)。 */
const loaded = ref(false)
const imgEl = ref<HTMLImageElement | null>(null)
let retried = false
let watchdog = 0

function reveal() {
  loaded.value = true
}

function onImgError() {
  const img = imgEl.value
  if (img && !retried) {
    retried = true
    const src = img.src
    img.src = ''
    setTimeout(() => (img.src = src), 300)
  } else {
    reveal()
  }
}

onMounted(() => {
  const img = imgEl.value
  if (img?.complete && img.naturalWidth > 0) reveal()
  watchdog = window.setTimeout(reveal, 2500)
})
onUnmounted(() => clearTimeout(watchdog))
</script>

<template>
  <section class="screen result">
    <div class="res-eyebrow">你的靈魂,屬於——</div>
    <div class="res-photo">
      <img
        ref="imgEl"
        class="res-img"
        :class="{ loaded }"
        :src="DRINK_IMAGES[type.code]"
        :alt="type.cocktailZh"
        @load="reveal"
        @error="onImgError"
      />
    </div>
    <div class="res-title">{{ type.title }}</div>
    <h2 class="res-name">{{ type.cocktailZh }}</h2>
    <div class="res-en">{{ type.cocktailEn }}</div>
    <p class="res-caption">「{{ type.caption }}」</p>
    <p class="res-desc">{{ type.desc }}</p>

    <div class="res-actions">
      <button class="btn btn-solid" @click="emit('share')">分享結果</button>
      <button class="btn btn-ghost" @click="emit('again')">再測一次</button>
    </div>

    <p class="disclaimer">本測驗僅供娛樂與自我探索參考，不具專業心理評估或診斷效力。</p>

    <div class="footer-note">
      <a href="https://tris-studio.vercel.app/" target="_blank" rel="noopener" class="footer-link">
        <span class="footer-rule" />
        Tris Studio
        <span class="footer-rule" />
      </a>
    </div>
  </section>
</template>
