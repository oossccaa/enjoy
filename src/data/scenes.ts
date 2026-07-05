/* 12 題情境線稿(內部路徑,置於 viewBox 0 0 120 120、stroke=currentColor 的 <svg> 中)。
   陣列順序對應 MBTI_QUESTIONS,QuizScreen 以 SCENES[idx] 取用。 */
export const SCENES: string[] = [
  // i. 夜的邀約 — 有人推門進場
  '<circle cx="30" cy="30" r="8.5"/><path d="M46 98 V50 Q66 37 86 50 V98"/><path d="M38 98 H94"/><path d="M86 50 V98"/><path d="M66 66 l10 5 M66 78 l12 3"/>',
  // ii. 回血 — 一杯熱飲窩著
  '<path d="M40 62 H78 V80 Q78 92 66 92 H52 Q40 92 40 80 Z"/><path d="M78 66 H86 Q93 66 93 73 T85 80 H80"/><path d="M50 44 q-4 6 0 12 M60 42 q-4 6 0 12 M70 44 q-4 6 0 12"/><path d="M42 100 H80"/>',
  // iii. 推門以後 — 吧台與吊瓶
  '<path d="M26 40 H94 M26 74 H94"/><path d="M40 40 V30 Q40 26 44 26 Q48 26 48 30 V40"/><path d="M59 40 V28 Q59 24 63 24 Q67 24 67 28 V40"/><path d="M76 40 V33 Q76 29 80 29 Q84 29 84 33 V40"/><path d="M52 74 L58 98 H70 L76 74"/><path d="M46 82 H92"/>',
  // iv. 一個夢想 — 星與虛線
  '<path d="M64 28 l4.4 10.5 11.4 1 -8.6 7.5 2.7 11.2 -9.9-6.1 -9.9 6.1 2.7-11.2 -8.6-7.5 11.4-1z"/><path d="M32 96 q10-16 20-26" stroke-dasharray="2 5"/><path d="M30 92 q4-4 8-2 M27 84 q4-2 8 0"/>',
  // v. 欣賞一個人 — 眼與星火
  '<path d="M30 60 Q60 38 90 60 Q60 82 30 60 Z"/><circle cx="60" cy="60" r="9.5"/><circle cx="60" cy="60" r="3" fill="currentColor" stroke="none"/><path d="M86 38 l2 5.5 5.5 2 -5.5 2 -2 5.5 -2-5.5 -5.5-2 5.5-2z"/>',
  // vi. 一杯特別的酒 — 調酒杯與靈感
  '<path d="M42 44 H78 L70 62 Q70 66 66 66 H54 Q50 66 50 62 Z"/><path d="M60 66 V88"/><path d="M48 90 H72"/><path d="M56 34 q4-6 8 0 M60 30 v6"/><path d="M82 42 l2 5.5 5.5 2 -5.5 2 -2 5.5 -2-5.5 -5.5-2 5.5-2z"/>',
  // vii. 難下的決定 — 天秤
  '<path d="M60 28 V86"/><path d="M40 40 H80"/><path d="M40 40 L31 60 A11 6 0 0 0 49 60 Z"/><path d="M80 40 L71 60 A11 6 0 0 0 89 60 Z"/><path d="M46 90 H74"/><circle cx="60" cy="28" r="3" fill="currentColor" stroke="none"/>',
  // viii. 朋友的難過 — 對話與心
  '<path d="M40 52 a13 12 0 0 1 27-4 10 10 0 0 1 5 19 H44 a12 10 0 0 1-4-15z"/><path d="M46 76 v8 M58 78 v8 M70 76 v8"/><path d="M60 94 q-6-9-13-4 -4 4 0 8.5 l13 10.5 13-10.5 q4-4.5 0-8.5 -7-5-13 4z"/>',
  // ix. 心動的人 — 心與火花
  '<path d="M60 42 q-9-11-19-4 -8.5 6-2 17 l21 22.5 21-22.5 q6.5-11-2-17 -10-7-19 4z"/><path d="M30 62 H46 l4.5-9 6.5 17 4.5-8 H90"/>',
  // x. 一趟旅行 — 山與路線
  '<path d="M26 92 L48 58 L60 73 L80 38 L98 92 Z"/><path d="M60 92 q-6-13 4-21 t2-19" stroke-dasharray="2.5 5.5"/><path d="M67 34 a7 7 0 1 0-14 0 q0 9 7 13 7-4 7-13z"/><circle cx="60" cy="34" r="2.6" fill="currentColor" stroke="none"/>',
  // xi. 還沒決定的事 — 沙漏
  '<path d="M40 28 H80 M40 92 H80"/><path d="M45 28 Q45 56 60 60 Q75 56 75 28"/><path d="M45 92 Q45 64 60 60 Q75 64 75 92"/><path d="M52 84 q8-6 16 0"/><circle cx="60" cy="46" r="2.4" fill="currentColor" stroke="none"/>',
  // xii. 你的房間 — 書桌與檯燈
  '<path d="M40 32 H80 V88 H40 Z"/><path d="M60 32 V88 M40 60 H80"/><circle cx="70" cy="47" r="6.5"/><path d="M50 88 q0-11 5-15 M50 88 q0-9-5-13"/><path d="M43 88 H57"/>',
]
