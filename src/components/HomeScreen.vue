<script setup lang="ts">
import { onMounted } from 'vue'
import gsap from 'gsap'
import { MOTIF } from '../data/motifs'
import { reduceMotion } from '../util'

const emit = defineEmits<{ (e: 'start', mode: 'psych' | 'taste'): void }>()

onMounted(() => {
  if (reduceMotion) {
    gsap.set('.home .reveal', { opacity: 1, y: 0 })
    return
  }
  gsap.set('.home .reveal', { opacity: 0, y: 16 })
  gsap.to('.home .reveal', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: 0.12,
    ease: 'power2.out',
  })
})
</script>

<template>
  <section class="screen home">
    <div class="brand-mark reveal">N I G H T C A P</div>
    <h1 class="brand-title reveal">癮酒</h1>
    <div class="brand-sub reveal">今天想喝什麼?</div>
    <div class="home-hint reveal">選一種方式,讓我們為你找到那一杯</div>

    <div class="mode-cards">
      <button class="mode-card reveal" @click="emit('start', 'psych')">
        <span class="mode-icon" v-html="MOTIF.spark" />
        <span class="mode-text">
          <span class="mode-name">心理測驗</span>
          <span class="mode-en">A Walk Through the Night</span>
          <span class="mode-desc">走一段夜路,用四個情境選擇,讀出最貼近你心境的那杯酒。</span>
        </span>
        <span class="mode-arrow">→</span>
      </button>

      <button class="mode-card reveal" @click="emit('start', 'taste')">
        <span class="mode-icon" v-html="MOTIF.taste" />
        <span class="mode-text">
          <span class="mode-name">味覺測試</span>
          <span class="mode-en">Ask the Bartender</span>
          <span class="mode-desc">像調酒師問你口感、酒體、風味與強度,直接調出最合你味蕾的那杯。</span>
        </span>
        <span class="mode-arrow">→</span>
      </button>
    </div>
  </section>
</template>
