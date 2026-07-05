import type { GlassType } from '../types'

/* 六種酒杯的幾何規格(座標系 viewBox 0 0 160 260,GlassSvg 據此描邊 + 注液)。
   - clip:液面裁切路徑(讓酒液只填滿杯內)
   - outline:杯身描邊(path / ellipse 依序疊上)
   - liq:液面矩形範圍(x 左緣、ty 滿杯頂、by 杯底、w 寬、cx 中心 x、rx 液面橢圓半徑)
   - rim:杯緣參考點 [x, y],裝飾(garnish)以此定位 */
export interface GlassOutline {
  t: 'path' | 'ellipse'
  a: Record<string, number | string>
}
export interface GlassSpec {
  clip: string
  outline: GlassOutline[]
  liq: { x: number; ty: number; by: number; w: number; cx: number; rx: number }
  rim: [number, number]
}

export const GLASS: Record<GlassType, GlassSpec> = {
  rocks: {
    clip: 'M50 114 L110 114 L106 196 Q106 202 100 202 L60 202 Q54 202 54 196 Z',
    outline: [
      { t: 'path', a: { d: 'M46 110 L114 110 L110 198 Q110 206 102 206 L58 206 Q50 206 50 198 Z' } },
      { t: 'ellipse', a: { cx: 80, cy: 110, rx: 34, ry: 6.5 } },
    ],
    liq: { x: 50, ty: 148, by: 200, w: 60, cx: 80, rx: 30 },
    rim: [104, 111],
  },
  highball: {
    clip: 'M60 78 L100 78 L97 198 Q97 202 93 202 L67 202 Q63 202 63 198 Z',
    outline: [
      { t: 'path', a: { d: 'M56 74 L104 74 L101 200 Q101 206 95 206 L65 206 Q59 206 59 200 Z' } },
      { t: 'ellipse', a: { cx: 80, cy: 74, rx: 24, ry: 5 } },
    ],
    liq: { x: 60, ty: 106, by: 200, w: 40, cx: 80, rx: 19 },
    rim: [96, 75],
  },
  coupe: {
    clip: 'M36 108 Q80 166 124 108 Z',
    outline: [
      { t: 'ellipse', a: { cx: 80, cy: 108, rx: 46, ry: 9 } },
      { t: 'path', a: { d: 'M34 108 Q80 172 126 108' } },
      { t: 'path', a: { d: 'M80 140 L80 210' } },
      { t: 'ellipse', a: { cx: 80, cy: 212, rx: 26, ry: 5 } },
    ],
    liq: { x: 36, ty: 114, by: 140, w: 88, cx: 80, rx: 43 },
    rim: [116, 109],
  },
  martini: {
    clip: 'M37 106 L123 106 L80 156 Z',
    outline: [
      { t: 'ellipse', a: { cx: 80, cy: 106, rx: 46, ry: 8 } },
      { t: 'path', a: { d: 'M34 106 L80 160 L126 106' } },
      { t: 'path', a: { d: 'M80 160 L80 210' } },
      { t: 'ellipse', a: { cx: 80, cy: 212, rx: 26, ry: 5 } },
    ],
    liq: { x: 37, ty: 118, by: 156, w: 86, cx: 80, rx: 37 },
    rim: [116, 107],
  },
  flute: {
    clip: 'M66 78 Q66 150 80 164 Q94 150 94 78 Z',
    outline: [
      { t: 'ellipse', a: { cx: 80, cy: 78, rx: 16, ry: 4 } },
      { t: 'path', a: { d: 'M64 78 Q64 152 80 168 Q96 152 96 78' } },
      { t: 'path', a: { d: 'M80 168 L80 210' } },
      { t: 'ellipse', a: { cx: 80, cy: 212, rx: 22, ry: 4.5 } },
    ],
    liq: { x: 66, ty: 96, by: 162, w: 28, cx: 80, rx: 13 },
    rim: [93, 79],
  },
  margarita: {
    clip: 'M40 104 L58 128 Q58 146 80 146 Q102 146 102 128 L120 104 Z',
    outline: [
      { t: 'ellipse', a: { cx: 80, cy: 104, rx: 48, ry: 8 } },
      { t: 'path', a: { d: 'M32 104 L54 130 Q54 150 80 150 Q106 150 106 130 L128 104' } },
      { t: 'path', a: { d: 'M80 150 L80 210' } },
      { t: 'ellipse', a: { cx: 80, cy: 212, rx: 26, ry: 5 } },
    ],
    liq: { x: 40, ty: 114, by: 147, w: 80, cx: 80, rx: 40 },
    rim: [118, 105],
  },
}
