import type { Step } from '../types'

/* ---------- 心理測驗(夜路情境)----------
   每個選項用 w 餵分給多杯酒(這是讓「每杯獨立 %」成立的關鍵:
   一個選擇會同時提高好幾杯的契合度,而不是只對應一杯)。 */
export const PSYCH_STEPS: Step[] = [
  {
    eyebrow: 'i. 出發',
    motif: 'door',
    q: '推開那扇門,夜在外面等你。你的腳步先走向——',
    choices: [
      { t: '走進森林,讓綠意把聲音都吸走', w: { pinot: 3, neg: 1, old: 1, mojito: 1 } },
      { t: '奔向海邊,迎著風與浪聲', w: { spritz: 3, marg: 1, mule: 1 } },
      { t: '往山上去,想把世界看得更遠', w: { old: 3, pinot: 1, neg: 1, martini: 1 } },
      { t: '鑽進城市,霓虹與人潮裡', w: { marg: 3, spritz: 1, neg: 1, espresso: 1 } },
    ],
  },
  {
    eyebrow: 'ii. 相遇',
    motif: 'meet',
    q: '走著走著,你遇見一個人。你希望對方是——',
    choices: [
      { t: '一位老朋友,什麼都不必說也自在', w: { pinot: 3, old: 1, sour: 1 } },
      { t: '一個陌生人,眼神裡藏著故事', w: { neg: 3, old: 1, pinot: 1, martini: 1 } },
      { t: '一群旅人,笑著招手要你同行', w: { marg: 3, spritz: 2, mojito: 2, mule: 1 } },
    ],
  },
  {
    eyebrow: 'iii. 心動',
    motif: 'spark',
    q: '這一刻,你心裡最想做的事是——',
    choices: [
      { t: '坐下來,把這片風景慢慢看完', w: { pinot: 3, old: 1, neg: 1, sour: 1 } },
      { t: '拍一張照,把當下收進口袋', w: { spritz: 3, marg: 1, mule: 1, mojito: 1 } },
      { t: '往更深處走,看看還藏著什麼', w: { old: 3, neg: 2, espresso: 2, martini: 1 } },
    ],
  },
  {
    eyebrow: 'iv. 試煉',
    motif: 'path',
    q: '前方有一道關卡。對你而言,最難跨過的是——',
    choices: [
      { t: '天色暗下來,前路看不分明', w: { neg: 3, old: 1, espresso: 1 } },
      { t: '岔路太多,不知該選哪一條', w: { old: 3, neg: 1, pinot: 1, martini: 1 } },
      { t: '走到最後,只剩自己一個人', w: { pinot: 3, neg: 1, espresso: 1, sour: 1 } },
    ],
  },
]
