import type { Step } from '../types'

/* ---------- 味覺測試(酒保風格)----------
   像調酒師面對面問你:口感、酒體、風味、強度,直接推出最合你味蕾的那杯。
   與心理測驗共用同一套計分引擎與酒款,差別只在題目。 */
export const TASTE_STEPS: Step[] = [
  {
    eyebrow: 'i. 口感',
    motif: 'taste',
    q: '先說說,你今晚想要的口感是——',
    choices: [
      { t: '清爽好入口,像汽水一樣帶氣泡', w: { spritz: 3, mule: 2, mojito: 1 } },
      { t: '酸甜活潑,一口就生津開胃', w: { marg: 3, sour: 2, mojito: 1 } },
      { t: '圓潤柔順,在嘴裡慢慢回甘', w: { pinot: 3, old: 1 } },
      { t: '濃烈厚實,喝得到重量感', w: { old: 3, neg: 2, espresso: 1 } },
      { t: '苦甜交織,層次愈品愈深', w: { neg: 3, espresso: 2, old: 1 } },
      { t: '清冽俐落,乾爽而不甜膩', w: { martini: 3, sour: 1 } },
    ],
  },
  {
    eyebrow: 'ii. 酒體',
    motif: 'glass',
    q: '喜歡哪一種酒體輕重?',
    choices: [
      { t: '輕盈如水,負擔愈小愈好', w: { spritz: 3, mojito: 2, mule: 1 } },
      { t: '中等均衡,不輕不重剛剛好', w: { pinot: 2, marg: 2, sour: 2, martini: 1 } },
      { t: '厚重飽滿,要有存在感', w: { old: 3, neg: 2, espresso: 2 } },
    ],
  },
  {
    eyebrow: 'iii. 風味',
    motif: 'spark',
    q: '最讓你心動的風味調性是——',
    choices: [
      { t: '莓果、葡萄等水果香', w: { pinot: 3, marg: 1 } },
      { t: '柑橘、氣泡的清新', w: { spritz: 3, mule: 1 } },
      { t: '薄荷、草本的沁涼', w: { mojito: 3, neg: 1 } },
      { t: '木質、香草、煙燻', w: { old: 3 } },
      { t: '咖啡、可可的醇厚', w: { espresso: 3 } },
      { t: '薑味、辛香的衝勁', w: { mule: 3, sour: 1 } },
      { t: '草藥、苦韻的個性', w: { neg: 3, martini: 1 } },
    ],
  },
  {
    eyebrow: 'iv. 強度',
    motif: 'path',
    q: '最後,酒精強度你想要——',
    choices: [
      { t: '微醺輕鬆就好,不想上頭', w: { spritz: 3, mojito: 2, pinot: 1 } },
      { t: '適中有感,但還能再喝幾杯', w: { marg: 2, sour: 2, mule: 2, pinot: 1 } },
      { t: '越烈越過癮,要的就是這口勁', w: { old: 3, neg: 2, martini: 2, espresso: 1 } },
    ],
  },
]
