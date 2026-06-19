import { ref, computed } from 'vue'
import type { Choice, DrinkKey, Ranked, Step } from '../types'
import { DRINKS } from '../data/drinks'

const DRINK_KEYS = Object.keys(DRINKS) as DrinkKey[]

/* 計分引擎 — 心理測驗與味覺測試共用。
   只依賴傳入的 steps 與 DRINKS,所以兩套題目套同一引擎即可。 */
export function useQuiz(steps: Step[]) {
  const idx = ref(0)
  const scores = ref<Record<DrinkKey, number>>(blankScores())

  function blankScores(): Record<DrinkKey, number> {
    return Object.fromEntries(DRINK_KEYS.map((k) => [k, 0])) as Record<DrinkKey, number>
  }

  // MBTI 式獨立百分比:每杯酒「理論最高分」= 每題挑對它最有利的選項
  const MAXPOSS = computed<Record<DrinkKey, number>>(() => {
    const m = {} as Record<DrinkKey, number>
    for (const k of DRINK_KEYS) {
      let total = 0
      steps.forEach((s) => {
        let best = 0
        s.choices.forEach((c) => {
          const w = c.w[k] ?? 0
          if (w > best) best = w
        })
        total += best
      })
      m[k] = total || 1
    }
    return m
  })

  const current = computed(() => steps[idx.value])
  const total = steps.length
  const isLast = computed(() => idx.value >= total - 1)

  // 目前領先的酒款 key(用來即時染環境光)
  const leader = computed<DrinkKey>(() => {
    let lead: DrinkKey = DRINK_KEYS[0]
    let best = -1
    for (const k of DRINK_KEYS) {
      const pct = scores.value[k] / MAXPOSS.value[k]
      if (pct > best) {
        best = pct
        lead = k
      }
    }
    return lead
  })

  // 契合度 % 壓進 48–98 區間,排序取名次
  const ranked = computed<Ranked[]>(() =>
    DRINK_KEYS.map((k) => ({
      k,
      pct: Math.round(48 + (scores.value[k] / MAXPOSS.value[k]) * 50),
      d: DRINKS[k],
    })).sort((a, b) => b.pct - a.pct),
  )

  // 累加選項權重(分開 apply / next,讓畫面能先淡出舊內容再換題)
  function apply(choice: Choice) {
    for (const k in choice.w) {
      const key = k as DrinkKey
      scores.value[key] += choice.w[key] ?? 0
    }
  }

  // 前進一題
  function next() {
    idx.value++
  }

  function reset() {
    idx.value = 0
    scores.value = blankScores()
  }

  return { idx, scores, MAXPOSS, current, total, isLast, leader, ranked, apply, next, reset }
}
