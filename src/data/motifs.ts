import type { MotifKey } from '../types'

/* 場景圖示(優雅的琥珀色線稿),供題目情境使用 */
export const MOTIF: Record<MotifKey, string> = {
  door: `<svg viewBox="0 0 84 84" fill="none" stroke="#E7A64C" stroke-width="1.4" stroke-linecap="round"><path d="M26 72 V20 Q42 8 58 20 V72"/><path d="M26 72 H58"/><circle cx="51" cy="46" r="1.6" fill="#E7A64C" stroke="none"/><path d="M18 72 H66" stroke-width="1"/></svg>`,
  meet: `<svg viewBox="0 0 84 84" fill="none" stroke="#E7A64C" stroke-width="1.4" stroke-linecap="round"><circle cx="32" cy="32" r="8"/><path d="M20 64 q0-16 12-16 t12 16"/><circle cx="56" cy="36" r="7" opacity="0.55"/><path d="M46 64 q0-14 10-14 t10 14" opacity="0.55"/></svg>`,
  spark: `<svg viewBox="0 0 84 84" fill="none" stroke="#E7A64C" stroke-width="1.4" stroke-linecap="round"><path d="M42 22 C30 30 30 46 42 58 C54 46 54 30 42 22 Z"/><path d="M42 58 v8"/><path d="M28 40 l-7 2 M56 40 l7 2" opacity="0.6"/></svg>`,
  path: `<svg viewBox="0 0 84 84" fill="none" stroke="#E7A64C" stroke-width="1.4" stroke-linecap="round"><path d="M42 70 C42 56 28 52 28 38 C28 26 36 22 42 22"/><path d="M42 50 C42 42 54 40 58 30" opacity="0.6"/><circle cx="42" cy="22" r="2.4" fill="#E7A64C" stroke="none"/></svg>`,
  // 味覺測試用:舌尖 / 味蕾
  taste: `<svg viewBox="0 0 84 84" fill="none" stroke="#E7A64C" stroke-width="1.4" stroke-linecap="round"><path d="M30 30 q12-12 24 0"/><path d="M26 42 C26 58 58 58 58 42 C58 36 50 34 42 38 C34 34 26 36 26 42 Z"/><path d="M42 44 v9" opacity="0.6"/><path d="M34 46 q8 6 16 0" opacity="0.5"/></svg>`,
  // 味覺測試用:酒杯側影
  glass: `<svg viewBox="0 0 84 84" fill="none" stroke="#E7A64C" stroke-width="1.4" stroke-linecap="round"><path d="M28 22 H56 L48 44 Q48 48 44 48 H40 Q36 48 36 44 Z"/><path d="M42 48 V66"/><path d="M30 66 H54"/><path d="M33 30 H51" opacity="0.5"/></svg>`,
}
