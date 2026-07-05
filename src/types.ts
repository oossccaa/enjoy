// ⚠️ 神秘感:型號 / 字母 / 暱稱僅供內部計分與對應,絕不渲染到畫面。

export type Axis = 'EI' | 'SN' | 'TF' | 'JP'
export type Letter = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P'

// 16 型代碼(內部 key)
export type TypeCode =
  | 'INFP' | 'ENFP' | 'INFJ' | 'ENFJ'
  | 'INTJ' | 'INTP' | 'ENTP' | 'ENTJ'
  | 'ISFJ' | 'ESFJ' | 'ISFP' | 'ESFP'
  | 'ISTJ' | 'ESTJ' | 'ISTP' | 'ESTP'

// 酒杯造型與裝飾(結果頁注杯用)
export type GlassType = 'rocks' | 'highball' | 'coupe' | 'martini' | 'flute' | 'margarita'
export type GarnishType = 'cherry' | 'olive' | 'citrus' | 'mint' | 'twist' | 'none'

// 單一選項:顯示文字 + 內部加分字母
export interface MbtiChoice {
  t: string
  letter: Letter
}

export interface MbtiQuestion {
  axis: Axis // 內部用,不顯示
  eyebrow: string // 氛圍小標
  q: string
  a: MbtiChoice
  b: MbtiChoice
}

// 一型 = 一杯靈魂調酒 + 文案
export interface SoulType {
  code: TypeCode // 內部 key,不顯示
  nickname: string // MBTI 暱稱(內部保留,不顯示)
  cocktailZh: string
  cocktailEn: string
  title: string // 性格頭銜(可顯示)
  caption: string // 金句
  desc: string // 結果文案
  color: string // 酒液 / 光暈色
  glass: GlassType // 酒杯造型
  garnish: GarnishType // 裝飾
  ratio?: string // 台灣比例(部分型才有)
}
