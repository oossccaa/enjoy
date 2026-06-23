<script setup lang="ts">
import { onMounted } from 'vue'
import gsap from 'gsap'
import { reduceMotion } from '../util'

const emit = defineEmits<{ (e: 'start'): void }>()

onMounted(() => {
  if (reduceMotion) {
    gsap.set('.home .reveal', { opacity: 1, y: 0 })
    return
  }
  gsap.set('.brand-mark, .brand-title, .brand-sub, .intro-glass, .intro-line, #startBtn', { opacity: 0 })
  const tl = gsap.timeline()
  tl.from('#introLiquid', { attr: { y: 128 }, duration: 1.4, ease: 'power2.out' }, 0.1)
    .to('.brand-mark', { opacity: 1, duration: 1, ease: 'power1.out' }, 0.2)
    .to('.brand-title', { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out' }, '-=0.6')
    .from('.brand-title', { y: 18, duration: 1.1, ease: 'power3.out' }, '<')
    .to('.brand-sub', { opacity: 1, duration: 0.9 }, '-=0.5')
    .to('.intro-glass', { opacity: 1, duration: 0.9 }, '-=0.6')
    .to('.intro-line', { opacity: 1, duration: 0.9 }, '-=0.5')
    .fromTo('#startBtn', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.4')
  gsap.set('#introLiquid', { attr: { y: 84 } })
})
</script>

<template>
  <section class="screen home">
    <div class="brand-mark reveal">N I G H T C A P</div>
    <h1 class="brand-title reveal">癮酒</h1>
    <div class="brand-sub reveal">今天想喝什麼?</div>
    <div class="intro-glass reveal">
      <svg width="120" height="150" viewBox="0 0 120 150" class="glass-svg" aria-hidden="true">
        <defs>
          <clipPath id="introClip">
            <path d="M34 44 L86 44 L80 122 Q80 128 74 128 L46 128 Q40 128 40 122 Z" />
          </clipPath>
        </defs>
        <g clip-path="url(#introClip)">
          <rect id="introLiquid" x="30" y="128" width="60" height="90" fill="#C8821E" opacity="0.9" />
        </g>
        <path
          d="M34 44 L86 44 L80 122 Q80 128 74 128 L46 128 Q40 128 40 122 Z"
          fill="none"
          stroke="rgba(241,235,222,0.55)"
          stroke-width="1.4"
        />
        <ellipse cx="60" cy="44" rx="26" ry="4.5" fill="none" stroke="rgba(241,235,222,0.55)" stroke-width="1.4" />
        <rect
          x="52"
          y="62"
          width="20"
          height="20"
          rx="3"
          fill="none"
          stroke="rgba(241,235,222,0.28)"
          stroke-width="1.1"
          transform="rotate(-8 62 72)"
        />
      </svg>
    </div>
    <p class="intro-line reveal">回答幾個問題,走一段短短的夜路。<br />路的盡頭,有一杯只屬於你的酒。</p>
    <button class="btn reveal" id="startBtn" @click="emit('start')">開 始</button>
  </section>
</template>
