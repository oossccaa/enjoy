<script setup lang="ts">
import { computed } from 'vue'
import type { MbtiChoice, SoulType } from '../types'
import { useMbti } from '../composables/useMbti'

const emit = defineEmits<{
  (e: 'finish', type: SoulType): void
  (e: 'home'): void
}>()

const { idx, current, isLast, progress, apply, next, extend, result } = useMbti()

// 序號依實際進行順序標(加問題接續編號);不顯示總題數,降低作答壓力
const ROMAN = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix', 'x', 'xi', 'xii']
const eyebrow = computed(() => `${ROMAN[idx.value]}. ${current.value.eyebrow}`)

// 把該題情境路徑包成完整 <svg>(stroke=currentColor 走琥珀色)
const scene = computed(
  () =>
    `<svg viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="1.5" ` +
    `stroke-linecap="round" stroke-linejoin="round" width="100%" height="100%">${current.value.scene}</svg>`,
)

function onPick(choice: MbtiChoice) {
  apply(choice)
  if (!isLast.value) return next()
  if (extend()) return next() // 有軸平手 → 加問,繼續作答
  emit('finish', result())
}
</script>

<template>
  <section class="screen quiz">
    <div class="q-top">
      <!-- home icon:「←」會被誤解成回上一題,實際是回首頁 -->
      <button class="q-back" aria-label="回首頁" @click="emit('home')">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M3 11.5 12 4l9 7.5" />
          <path d="M5.5 10V20h13V10" />
        </svg>
      </button>
      <div class="q-progress">
        <div class="q-progress-fill" :style="{ width: progress + '%' }" />
      </div>
    </div>

    <!-- key 隨題序變動 → 重新掛載,重播 fadeUp 進場 -->
    <div class="q-mid" :key="idx">
      <div class="q-eyebrow">{{ eyebrow }}</div>
      <div class="scene" v-html="scene" />
      <h2 class="q-text">{{ current.q }}</h2>
    </div>

    <!-- :key 讓每題的選項按鈕重新掛載,清掉觸控殘留的 hover / focus 狀態 -->
    <div class="q-choices" :key="'c' + idx">
      <button class="choice" @click="onPick(current.a)">{{ current.a.t }}</button>
      <button class="choice" @click="onPick(current.b)">{{ current.b.t }}</button>
    </div>
  </section>
</template>
