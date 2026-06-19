// 酒款 key — 新增酒款時在這裡加一個字面量,TS 會自動檢查 STEPS 權重是否打錯 key
export type DrinkKey =
  | 'pinot'
  | 'spritz'
  | 'old'
  | 'marg'
  | 'neg'
  | 'mojito'
  | 'martini'
  | 'mule'
  | 'espresso'
  | 'sour'

export interface Drink {
  name: string // 中文名
  en: string // 英文名
  tag: string // 性格標籤(結果頁徽章)
  color: string // 酒液與光暈顏色
  desc: string // 主推描述(第一名)
  note: string // 光譜條展開的簡介(第二、三名)
}

// 一個選項可同時為多杯酒加分 → 讓「每杯獨立 %」成立
export type Weights = Partial<Record<DrinkKey, number>>

export interface Choice {
  t: string // 選項文字
  w: Weights // 各酒加權
}

export interface Step {
  eyebrow: string // 題序
  motif: MotifKey // 情境圖示
  q: string // 題目文字
  choices: Choice[]
}

export type MotifKey = 'door' | 'meet' | 'spark' | 'path' | 'taste' | 'glass'

// 結果頁排名項目
export interface Ranked {
  k: DrinkKey
  pct: number
  d: Drink
}
