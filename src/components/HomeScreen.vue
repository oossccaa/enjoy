<script setup lang="ts">
import GlassSvg from './GlassSvg.vue'

const emit = defineEmits<{ (e: 'start'): void; (e: 'gallery'): void }>()

// 首頁示意杯:琥珀色 coupe + 檸檬皮捲,直接滿杯漂浮
const ACCENT = '#e7a64c'
</script>

<template>
  <section class="screen home">
    <div class="hero-eyebrow">Soul&nbsp;&nbsp;Cocktail</div>
    <div class="hero-glass">
      <GlassSvg glass="coupe" :color="ACCENT" garnish="twist" :poured="true" :instant="true" :w="104" :h="168" uid="hero" />
    </div>
    <h1 class="hero-title">你的靈魂調酒<br />是哪一杯?</h1>
    <div class="hero-sub">Which one is yours tonight?</div>
    <p class="hero-line">回答十二個問題,走一段短短的夜路。<br />路的盡頭,有一杯只屬於你的酒。</p>
    <button class="btn hero-start" @click="emit('start')">開 始 測 驗</button>
    <button class="btn btn-ghost hero-gallery" @click="emit('gallery')">查看所有圖卡</button>
    <p class="disclaimer">本測驗僅供娛樂與自我探索參考，不具專業心理評估或診斷效力。</p>
  </section>
</template>
