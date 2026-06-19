<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue'
import gsap from 'gsap'
import type { Choice, DrinkKey, Ranked, Step } from '../types'
import { MOTIF } from '../data/motifs'
import { useQuiz } from '../composables/useQuiz'
import { reduceMotion } from '../util'

const props = defineProps<{ steps: Step[] }>()
const emit = defineEmits<{
  (e: 'leader', key: DrinkKey): void
  (e: 'finish', ranked: Ranked[]): void
  (e: 'home'): void
}>()

const { idx, current, total, isLast, leader, ranked, apply, next } = useQuiz(props.steps)
const animating = ref(false)

function onPick(choice: Choice) {
  if (animating.value) return
  apply(choice)
  emit('leader', leader.value) // 即時染環境光
  const finishing = isLast.value

  if (reduceMotion) {
    if (finishing) emit('finish', ranked.value)
    else {
      next()
      nextTick(playStep)
    }
    return
  }

  animating.value = true
  const tl = gsap.timeline()
  tl.to('.scene-motif, .q-text', { opacity: 0, y: -14, duration: 0.35, ease: 'power1.in' })
    .to('.choice', { opacity: 0, y: -10, duration: 0.3, stagger: 0.04, ease: 'power1.in' }, '-=0.3')
    .add(() => {
      if (finishing) {
        emit('finish', ranked.value)
        return
      }
      next() // 換題(此時舊內容已淡出)
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
    .fromTo('.choice', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out' }, '-=0.3')
  gsap.fromTo(
    '.scene-motif path, .scene-motif circle, .scene-motif ellipse, .scene-motif rect',
    { opacity: 0 },
    { opacity: 1, duration: 0.6, stagger: 0.05, delay: 0.15 },
  )
}

onMounted(() => {
  emit('leader', leader.value)
  playStep()
})
</script>

<template>
  <section class="screen quiz">
    <div class="q-top">
      <div class="q-top-left">
        <button class="q-back" aria-label="回首頁" @click="emit('home')">←</button>
        <div class="step-dots">
          <div v-for="(_, i) in total" :key="i" class="dot" :class="{ on: i === idx }" />
        </div>
      </div>
      <div class="step-eyebrow">{{ current?.eyebrow }}</div>
    </div>

    <div class="q-mid">
      <div class="scene-motif" v-html="MOTIF[current!.motif]" />
      <h2 class="q-text">{{ current?.q }}</h2>
    </div>

    <div class="q-choices">
      <button v-for="(c, i) in current?.choices" :key="idx + '-' + i" class="choice" @click="onPick(c)">
        {{ c.t }}
      </button>
    </div>
  </section>
</template>
