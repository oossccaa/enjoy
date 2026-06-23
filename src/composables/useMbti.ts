import { ref, computed } from 'vue'
import type { Letter, MbtiChoice, SoulType, TypeCode } from '../types'
import { MBTI_QUESTIONS } from '../data/mbtiQuestions'
import { SOUL_TYPES } from '../data/soulTypes'

/* MBTI 計分引擎:每軸 3 題、二選一,多數決得字母(奇數題、永不平手),
   四字母依序 E/I,S/N,T/F,J/P 組成型號 → 對到一杯靈魂調酒。 */
export function useMbti() {
  const questions = MBTI_QUESTIONS
  const total = questions.length // 12
  const idx = ref(0)
  const answers = ref<Letter[]>([])

  const current = computed(() => questions[idx.value])
  const isLast = computed(() => idx.value >= total - 1)

  // 累加答案(分開 apply / next,讓畫面能先淡出舊內容再換題)
  function apply(choice: MbtiChoice) {
    answers.value[idx.value] = choice.letter
  }

  function next() {
    idx.value++
  }

  function reset() {
    idx.value = 0
    answers.value = []
  }

  // 多數決:兩個字母誰被選得多就得誰
  function pick(a: Letter, b: Letter): Letter {
    let ca = 0
    let cb = 0
    answers.value.forEach((l) => {
      if (l === a) ca++
      else if (l === b) cb++
    })
    return ca >= cb ? a : b
  }

  function result(): SoulType {
    const code = (pick('E', 'I') + pick('S', 'N') + pick('T', 'F') + pick('J', 'P')) as TypeCode
    return SOUL_TYPES[code]
  }

  return { questions, total, idx, current, isLast, apply, next, reset, result }
}
