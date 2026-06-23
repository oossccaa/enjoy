<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import type { SoulType } from '../types'
import GlassSvg from './GlassSvg.vue'
import { reduceMotion } from '../util'

const props = defineProps<{ type: SoulType }>()
const emit = defineEmits<{ (e: 'again'): void }>()

const shareLabel = ref('分享結果')

function share() {
  const t = props.type
  const text = `我的靈魂調酒是「${t.cocktailZh}」——${t.caption}`
  const nav = navigator as Navigator & { share?: (d: unknown) => Promise<void> }
  if (nav.share) {
    nav.share({ title: '癮酒', text }).catch(() => {})
  } else {
    shareLabel.value = '已複製連結'
  }
}

onMounted(() => {
  if (reduceMotion) {
    gsap.set('.res-eyebrow, .res-glass, .res-title, .res-name, .res-en, .res-caption, .res-desc, .res-actions', {
      opacity: 1,
      y: 0,
    })
    gsap.set('#resLiquid', { attr: { y: 60 } })
    return
  }
  gsap.set('#resLiquid', { attr: { y: 158 } })
  gsap.set('#resWave', { x: 0 })
  const tl = gsap.timeline()
  tl.to('.res-eyebrow', { opacity: 1, duration: 0.8, ease: 'power1.out' }, 0)
    .to('.res-glass', { opacity: 1, duration: 0.8 }, 0.2)
    // 招牌時刻:酒液注入酒杯
    .to('#resLiquid', { attr: { y: 60 }, duration: 1.6, ease: 'power2.inOut' }, 0.4)
    .to('.res-title', { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.7')
    .from('.res-title', { y: 10, duration: 0.7 }, '<')
    .to('.res-name', { opacity: 1, duration: 0.8, ease: 'power2.out' }, '-=0.4')
    .from('.res-name', { y: 14, duration: 0.8 }, '<')
    .to('.res-en', { opacity: 1, duration: 0.7 }, '-=0.5')
    .to('.res-caption', { opacity: 1, duration: 0.8 }, '-=0.3')
    .to('.res-desc', { opacity: 1, y: 0, duration: 0.8 }, '-=0.4')
    .from('.res-desc', { y: 12, duration: 0.8 }, '<')
    .to('.res-actions', { opacity: 1, duration: 0.7 }, '-=0.3')
  gsap.to('#resWave', { x: -40, duration: 3.2, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1.6 })
})
</script>

<template>
  <section class="screen result">
    <div class="res-eyebrow">你的靈魂,屬於——</div>
    <div class="res-glass">
      <GlassSvg :color="type.color" />
    </div>
    <div class="res-title">{{ type.title }}</div>
    <h2 class="res-name">{{ type.cocktailZh }}</h2>
    <div class="res-en">{{ type.cocktailEn }}</div>
    <p class="res-caption">「{{ type.caption }}」</p>
    <p class="res-desc">{{ type.desc }}</p>

    <div class="res-actions">
      <button class="btn btn-ghost" @click="share">{{ shareLabel }}</button>
      <button class="btn btn-ghost" @click="emit('again')">再測一次</button>
    </div>
    <div class="footer-note">◯◯ BAR · 選酒測驗</div>
  </section>
</template>
