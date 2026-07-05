<script setup lang="ts">
import { computed } from 'vue'
import type { MbtiChoice, SoulType } from '../types'
import { SCENES } from '../data/scenes'
import { useMbti } from '../composables/useMbti'

const emit = defineEmits<{
  (e: 'finish', type: SoulType): void
  (e: 'home'): void
}>()

const { total, idx, current, isLast, apply, next, result } = useMbti()

const progress = computed(() => Math.round(((idx.value + 1) / total) * 100))
const countLabel = computed(() => String(idx.value + 1).padStart(2, '0') + ' / ' + total)
// 把該題情境路徑包成完整 <svg>(stroke=currentColor 走琥珀色)
const scene = computed(
  () =>
    `<svg viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="1.5" ` +
    `stroke-linecap="round" stroke-linejoin="round" width="100%" height="100%">${SCENES[idx.value] || ''}</svg>`,
)

function onPick(choice: MbtiChoice) {
  apply(choice)
  if (isLast.value) emit('finish', result())
  else next()
}
</script>

<template>
  <section class="screen quiz">
    <div class="q-top">
      <button class="q-back" aria-label="返回" @click="emit('home')">←</button>
      <div class="q-progress">
        <div class="q-progress-fill" :style="{ width: progress + '%' }" />
      </div>
      <div class="q-count">{{ countLabel }}</div>
    </div>

    <!-- key 隨題序變動 → 重新掛載,重播 fadeUp 進場 -->
    <div class="q-mid" :key="idx">
      <div class="q-eyebrow">{{ current.eyebrow }}</div>
      <div class="scene" v-html="scene" />
      <h2 class="q-text">{{ current.q }}</h2>
    </div>

    <div class="q-choices">
      <button class="choice" @click="onPick(current.a)">{{ current.a.t }}</button>
      <button class="choice" @click="onPick(current.b)">{{ current.b.t }}</button>
    </div>
  </section>
</template>
