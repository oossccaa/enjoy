<script setup lang="ts">
import { ref, computed, nextTick, onMounted } from 'vue'
import gsap from 'gsap'
import type { MbtiChoice, SoulType } from '../types'
import { MOTIF } from '../data/motifs'
import { useMbti } from '../composables/useMbti'
import { reduceMotion } from '../util'

const emit = defineEmits<{
  (e: 'finish', type: SoulType): void
  (e: 'home'): void
}>()

const { total, idx, current, isLast, apply, next, result } = useMbti()
const animating = ref(false)
const progress = computed(() => Math.round(((idx.value + 1) / total) * 100))

function onPick(choice: MbtiChoice) {
  if (animating.value) return
  apply(choice)
  const finishing = isLast.value

  if (reduceMotion) {
    if (finishing) emit('finish', result())
    else {
      next()
      nextTick(playStep)
    }
    return
  }

  animating.value = true
  const tl = gsap.timeline()
  tl.to('.scene-motif, .q-text', { opacity: 0, y: -14, duration: 0.35, ease: 'power1.in' })
    .to('.choice', { opacity: 0, y: -10, duration: 0.3, stagger: 0.05, ease: 'power1.in' }, '-=0.3')
    .add(() => {
      if (finishing) {
        emit('finish', result())
        return
      }
      next()
      nextTick(() => {
        playStep()
        animating.value = false
      })
    })
}

function playStep() {
  if (reduceMotion) {
    gsap.set('.scene-motif, .q-text, .choice', { opacity: 1, y: 0 })
    return
  }
  const tl = gsap.timeline()
  tl.fromTo('.scene-motif', { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.7, ease: 'power2.out' })
    .fromTo('.q-text', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4')
    .fromTo('.choice', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }, '-=0.3')
  gsap.fromTo(
    '.scene-motif path, .scene-motif circle, .scene-motif ellipse, .scene-motif rect',
    { opacity: 0 },
    { opacity: 1, duration: 0.6, stagger: 0.05, delay: 0.15 },
  )
}

onMounted(playStep)
</script>

<template>
  <section class="screen quiz">
    <div class="q-top">
      <button class="q-back" aria-label="回首頁" @click="emit('home')">←</button>
      <div class="q-progress">
        <div class="q-progress-fill" :style="{ width: progress + '%' }" />
      </div>
      <div class="q-count">{{ idx + 1 }} / {{ total }}</div>
    </div>

    <div class="q-mid">
      <div class="scene-motif" v-html="MOTIF[current.motif]" />
      <h2 class="q-text">{{ current.q }}</h2>
    </div>

    <div class="q-choices">
      <button class="choice" :key="idx + '-a'" @click="onPick(current.a)">{{ current.a.t }}</button>
      <button class="choice" :key="idx + '-b'" @click="onPick(current.b)">{{ current.b.t }}</button>
    </div>
  </section>
</template>
