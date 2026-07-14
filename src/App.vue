<script setup lang="ts">
import { ref } from 'vue'
import type { SoulType } from './types'
import { hexA } from './util'
import HomeScreen from './components/HomeScreen.vue'
import QuizScreen from './components/QuizScreen.vue'
import ResultScreen from './components/ResultScreen.vue'
import ShareScreen from './components/ShareScreen.vue'
import GalleryScreen from './components/GalleryScreen.vue'

type Mode = 'home' | 'quiz' | 'result' | 'share' | 'gallery'

const mode = ref<Mode>('home')
const result = ref<SoulType | null>(null)
const runId = ref(0) // 每次開始/重測都換 key,讓 QuizScreen 重新掛載
const glowEl = ref<HTMLElement | null>(null)

const DEFAULT_GLOW =
  'radial-gradient(circle, rgba(231,166,76,0.28) 0%, rgba(231,166,76,0.06) 45%, transparent 70%)'

function start() {
  runId.value++
  mode.value = 'quiz'
}

function finish(type: SoulType) {
  result.value = type
  if (glowEl.value) {
    glowEl.value.style.background = `radial-gradient(circle, ${hexA(type.color, 0.42)} 0%, ${hexA(type.color, 0.1)} 45%, transparent 72%)`
  }
  mode.value = 'result'
}

function again() {
  result.value = null
  runId.value++
  mode.value = 'quiz'
  if (glowEl.value) glowEl.value.style.background = DEFAULT_GLOW
}

function goHome() {
  result.value = null
  mode.value = 'home'
  if (glowEl.value) glowEl.value.style.background = DEFAULT_GLOW
}

// 結果 ⇄ 分享頁(光暈維持該杯酒色)
function openShare() {
  mode.value = 'share'
}
function backToResult() {
  mode.value = 'result'
}

// 首頁 ⇄ 圖庫
function openGallery() {
  mode.value = 'gallery'
}
</script>

<template>
  <div class="stage">
    <div ref="glowEl" class="glow" />
    <Transition name="fade" mode="out-in">
      <HomeScreen v-if="mode === 'home'" key="home" @start="start" @gallery="openGallery" />
      <GalleryScreen v-else-if="mode === 'gallery'" key="gallery" @back="goHome" />
      <QuizScreen v-else-if="mode === 'quiz'" :key="'quiz-' + runId" @finish="finish" @home="goHome" />
      <ResultScreen
        v-else-if="mode === 'result' && result"
        key="result"
        :type="result"
        @again="again"
        @share="openShare"
      />
      <ShareScreen
        v-else-if="mode === 'share' && result"
        key="share"
        :type="result"
        @back="backToResult"
        @again="again"
      />
    </Transition>
  </div>
</template>
