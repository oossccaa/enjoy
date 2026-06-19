<script setup lang="ts">
import { ref, computed } from 'vue'
import type { DrinkKey, Ranked, Step } from './types'
import { DRINKS } from './data/drinks'
import { PSYCH_STEPS } from './data/psychSteps'
import { TASTE_STEPS } from './data/tasteSteps'
import { hexA } from './util'
import HomeScreen from './components/HomeScreen.vue'
import QuizScreen from './components/QuizScreen.vue'
import ResultScreen from './components/ResultScreen.vue'

type Mode = 'home' | 'psych' | 'taste' | 'result'

const mode = ref<Mode>('home')
const quizMode = ref<'psych' | 'taste'>('psych') // 目前/上一次玩的測驗,供「再走一次」
const result = ref<Ranked[]>([])
const glowEl = ref<HTMLElement | null>(null)

const DEFAULT_GLOW =
  'radial-gradient(circle, rgba(231,166,76,0.30) 0%, rgba(231,166,76,0.06) 45%, transparent 70%)'

const steps = computed<Step[]>(() => (quizMode.value === 'taste' ? TASTE_STEPS : PSYCH_STEPS))
// QuizScreen 用 key 強制在切換測驗 / 再走一次時重新掛載
const quizKey = computed(() => `${quizMode.value}-${result.value.length}-${mode.value}`)

function start(m: 'psych' | 'taste') {
  quizMode.value = m
  mode.value = m
}

function setGlow(key: DrinkKey) {
  if (!glowEl.value) return
  const c = DRINKS[key].color
  glowEl.value.style.background = `radial-gradient(circle, ${hexA(c, 0.4)} 0%, ${hexA(c, 0.08)} 45%, transparent 70%)`
}

function finish(ranked: Ranked[]) {
  result.value = ranked
  if (glowEl.value) {
    const c = ranked[0].d.color
    glowEl.value.style.background = `radial-gradient(circle, ${hexA(c, 0.42)} 0%, ${hexA(c, 0.1)} 45%, transparent 72%)`
  }
  mode.value = 'result'
}

function again() {
  result.value = []
  mode.value = quizMode.value
}

function goHome() {
  result.value = []
  mode.value = 'home'
  if (glowEl.value) glowEl.value.style.background = DEFAULT_GLOW
}
</script>

<template>
  <div class="stage">
    <div ref="glowEl" class="glow" />
    <Transition name="fade" mode="out-in">
      <HomeScreen v-if="mode === 'home'" key="home" @start="start" />
      <QuizScreen
        v-else-if="mode === 'psych' || mode === 'taste'"
        :key="quizKey"
        :steps="steps"
        @leader="setGlow"
        @finish="finish"
        @home="goHome"
      />
      <ResultScreen v-else key="result" :ranked="result" @again="again" @home="goHome" />
    </Transition>
  </div>
</template>
