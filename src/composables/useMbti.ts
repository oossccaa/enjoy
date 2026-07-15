import { ref, computed } from 'vue'
import type { Axis, Letter, MbtiChoice, MbtiQuestion, SoulType, TypeCode } from '../types'
import { BASE_QUESTIONS, TIEBREAKER_QUESTIONS } from '../data/mbtiQuestions'
import { SOUL_TYPES } from '../data/soulTypes'

/* MBTI 計分引擎:8 題基本(每軸 2 題)+ 平手軸各加問 1 題(最多 12 題)。
   基本題答完後,哪個軸 1:1 就把該軸的加問題排進題列(extend);
   加問後該軸必為 2:1,不會再平手。
   四字母依序 E/I,S/N,T/F,J/P 組成型號 → 對到一杯靈魂調酒。 */

const AXES: Array<[Axis, Letter, Letter]> = [
  ['EI', 'E', 'I'],
  ['SN', 'S', 'N'],
  ['TF', 'T', 'F'],
  ['JP', 'J', 'P'],
]

export function useMbti() {
  const queue = ref<MbtiQuestion[]>([...BASE_QUESTIONS])
  const idx = ref(0)
  const answers = ref<Letter[]>([])

  const current = computed(() => queue.value[idx.value])
  const isLast = computed(() => idx.value >= queue.value.length - 1)
  // 進度以目前題列長度計(不顯示總題數;加問使題列變長時允許小幅回退)
  const progress = computed(() => Math.round(((idx.value + 1) / queue.value.length) * 100))

  // 累加答案(分開 apply / next,讓畫面能先淡出舊內容再換題)
  function apply(choice: MbtiChoice) {
    answers.value[idx.value] = choice.letter
  }

  function next() {
    idx.value++
  }

  function count(l: Letter): number {
    return answers.value.filter((x) => x === l).length
  }

  // 站在最後一題且已作答時呼叫:平手軸的加問題排入題列,回傳是否有新增
  function extend(): boolean {
    const tied = AXES.filter(([, a, b]) => count(a) === count(b))
    if (!tied.length) return false
    queue.value = [...queue.value, ...tied.map(([axis]) => TIEBREAKER_QUESTIONS[axis])]
    return true
  }

  // 多數決:兩個字母誰被選得多就得誰(經 extend 保證不平手)
  function pick(a: Letter, b: Letter): Letter {
    return count(a) >= count(b) ? a : b
  }

  function result(): SoulType {
    const code = (pick('E', 'I') + pick('S', 'N') + pick('T', 'F') + pick('J', 'P')) as TypeCode
    return SOUL_TYPES[code]
  }

  return { queue, idx, current, isLast, progress, apply, next, extend, result }
}
