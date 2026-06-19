<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import gsap from 'gsap'
import type { Ranked } from '../types'
import GlassSvg from './GlassSvg.vue'
import { reduceMotion } from '../util'

const props = defineProps<{ ranked: Ranked[] }>()
const emit = defineEmits<{ (e: 'again'): void; (e: 'home'): void }>()

const top = computed(() => props.ranked[0])
const rest = computed(() => props.ranked.slice(1, 3))
const openRows = ref<Set<number>>(new Set())
const shareLabel = ref('分享結果')

function toggle(i: number) {
  const s = new Set(openRows.value)
  s.has(i) ? s.delete(i) : s.add(i)
  openRows.value = s
}

function share() {
  const n = top.value.d.name
  const nav = navigator as Navigator & { share?: (d: unknown) => Promise<void> }
  if (nav.share) {
    nav.share({ title: '癮酒', text: `我的酒是「${n}」,今天想喝什麼?` }).catch(() => {})
  } else {
    shareLabel.value = '已複製連結'
  }
}

function fillBars() {
  document.querySelectorAll<HTMLElement>('.spec-fill').forEach((f) => {
    const pct = f.getAttribute('data-pct') || '0'
    if (reduceMotion) {
      f.style.width = pct + '%'
      return
    }
    gsap.to(f, { width: pct + '%', duration: 1, ease: 'power2.out', delay: 0.1 })
  })
}

onMounted(() => {
  if (reduceMotion) {
    gsap.set('.res-eyebrow, .res-glass, .res-tag, .res-name, .res-en, .res-match, .res-desc, .spectrum-block, .res-actions, .res-home', { opacity: 1, y: 0 })
    gsap.set('#resLiquid', { attr: { y: 60 } })
    fillBars()
    return
  }
  gsap.set('#resLiquid', { attr: { y: 158 } })
  gsap.set('#resWave', { x: 0 })
  const tl = gsap.timeline()
  tl.to('.res-eyebrow', { opacity: 1, duration: 0.8, ease: 'power1.out' }, 0)
    .to('.res-glass', { opacity: 1, duration: 0.8 }, 0.2)
    // 招牌時刻:酒液注入酒杯
    .to('#resLiquid', { attr: { y: 60 }, duration: 1.6, ease: 'power2.inOut' }, 0.4)
    .to('.res-tag', { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.7')
    .from('.res-tag', { y: 10, duration: 0.7 }, '<')
    .to('.res-name', { opacity: 1, duration: 0.8, ease: 'power2.out' }, '-=0.4')
    .from('.res-name', { y: 14, duration: 0.8 }, '<')
    .to('.res-en', { opacity: 1, duration: 0.7 }, '-=0.5')
    .to('.res-match', { opacity: 1, duration: 0.7 }, '-=0.4')
    .to('.res-desc', { opacity: 1, y: 0, duration: 0.8 }, '-=0.4')
    .from('.res-desc', { y: 12, duration: 0.8 }, '<')
    .to('.spectrum-block', { opacity: 1, y: 0, duration: 0.8 }, '-=0.3')
    .from('.spectrum-block', { y: 16, duration: 0.8 }, '<')
    .add(fillBars, '-=0.5')
    .to('.res-actions', { opacity: 1, duration: 0.7 }, '-=0.3')
    .to('.res-home', { opacity: 1, duration: 0.6 }, '-=0.4')
  gsap.to('#resWave', { x: -40, duration: 3.2, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1.6 })
})
</script>

<template>
  <section class="screen result">
    <div class="res-eyebrow">你的夜,屬於——</div>
    <div class="res-glass">
      <GlassSvg :color="top.d.color" />
    </div>
    <div class="res-tag">{{ top.d.tag }}</div>
    <h2 class="res-name">{{ top.d.name }}</h2>
    <div class="res-en">{{ top.d.en }}</div>
    <div class="res-match">與你 <b>{{ top.pct }}%</b> 契合</div>
    <p class="res-desc">{{ top.d.desc }}</p>

    <div class="spectrum-block">
      <div class="bars-head"><span>你也很適合這幾杯</span></div>
      <div>
        <div
          v-for="(item, i) in rest"
          :key="item.k"
          class="spec-row"
          :class="{ open: openRows.has(i) }"
          @click="toggle(i)"
        >
          <div class="spec-head">
            <span class="spec-name">{{ item.d.name }}</span>
            <span class="spec-en">{{ item.d.en }}</span>
            <span class="spec-pct">{{ item.pct }}%</span>
            <span class="spec-chevron">▸</span>
          </div>
          <div class="spec-track">
            <div class="spec-fill" :data-pct="item.pct" :style="{ background: item.d.color }" />
          </div>
          <div class="spec-note">{{ item.d.note }}</div>
        </div>
      </div>
    </div>

    <div class="res-actions">
      <button class="btn btn-ghost" @click="share">{{ shareLabel }}</button>
      <button class="btn btn-ghost" @click="emit('again')">再走一次</button>
    </div>
    <button class="res-home" @click="emit('home')">換一種測驗</button>
    <div class="footer-note">◯◯ BAR · 選酒測驗</div>
  </section>
</template>
