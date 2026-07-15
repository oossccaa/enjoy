<script setup lang="ts">
import { ref } from 'vue'
import type { SoulType } from '../types'
import { DRINK_IMAGES } from '../data/drinkImages'

defineProps<{ type: SoulType }>()
const emit = defineEmits<{ (e: 'again'): void; (e: 'share'): void }>()

// 酒照載入完成後才顯影(loaded 觸發 CSS transition;減少動態時 media query 直接顯示)
const loaded = ref(false)
</script>

<template>
  <section class="screen result">
    <div class="res-eyebrow">你的靈魂,屬於——</div>
    <div class="res-photo">
      <img
        class="res-img"
        :class="{ loaded }"
        :src="DRINK_IMAGES[type.code]"
        :alt="type.cocktailZh"
        @load="loaded = true"
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
