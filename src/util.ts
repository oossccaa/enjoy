// 把深色酒色提亮成環境光暈用的 rgba(往琥珀色偏)
export function hexA(hex: string, a: number): string {
  const h = hex.replace('#', '')
  const r = parseInt(h.substr(0, 2), 16)
  const g = parseInt(h.substr(2, 2), 16)
  const b = parseInt(h.substr(4, 2), 16)
  return `rgba(${Math.min(r + 90, 255)},${Math.min(g + 60, 255)},${Math.min(b + 30, 255)},${a})`
}
