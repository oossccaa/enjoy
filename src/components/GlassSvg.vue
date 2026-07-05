<script setup lang="ts">
import { computed } from 'vue'
import type { GarnishType, GlassType } from '../types'
import { GLASS } from '../data/glasses'

/* 依 glass 造型描邊 + 注液 + 裝飾。
   注液動畫:liquid 群組以 translateY 從杯底升到滿杯,由 poured 觸發 CSS transition。
   instant=true(首頁示意杯 / 減少動態)時直接呈現滿杯、無過場。 */
const props = withDefaults(
  defineProps<{
    glass: GlassType
    color: string
    garnish?: GarnishType
    poured?: boolean
    instant?: boolean
    w?: number
    h?: number
    uid?: string
  }>(),
  { garnish: 'none', poured: false, instant: false, w: 148, h: 240, uid: 'r' },
)

const CREAM = 'rgba(241,235,222,0.72)'

const spec = computed(() => GLASS[props.glass])
const clipId = computed(() => `clip_${props.glass}_${props.uid}`)
const rx = computed(() => spec.value.rim[0])
const ry = computed(() => spec.value.rim[1])

// 液面矩形高度(多畫 50 讓下方不留縫);poured 前整組往下推到杯底之外
const liqH = computed(() => spec.value.liq.by - spec.value.liq.ty + 50)
const liquidStyle = computed(() => {
  const off = props.poured ? 0 : spec.value.liq.by - spec.value.liq.ty + 8
  return {
    transform: `translateY(${off}px)`,
    transition: props.instant ? 'none' : 'transform 1.7s cubic-bezier(.4,0,.2,1)',
  }
})

// garnish 幾何(依杯緣 rim 定位)
const cherryStem = computed(() => `M${rx.value - 2} ${ry.value} q7 -15 13 -19`)
const citrusArc = computed(() => `M${rx.value - 4} ${ry.value - 3} a12 12 0 0 1 8 22 z`)
const citrusVein = computed(() => `M${rx.value - 4} ${ry.value - 3} L${rx.value + 4} ${ry.value + 19}`)
const twistPath = computed(() => `M${rx.value - 4} ${ry.value - 4} q13 -3 9 -17 q-2 -8 -11 -5`)
const mintTransform = computed(() => `translate(${rx.value - 14} ${ry.value - 18})`)
</script>

<template>
  <svg
    class="glass-svg"
    :width="w"
    :height="h"
    viewBox="0 0 160 260"
    style="overflow: visible"
    aria-hidden="true"
  >
    <defs>
      <clipPath :id="clipId"><path :d="spec.clip" /></clipPath>
    </defs>

    <!-- 酒液(裁切在杯內,poured 觸發上升) -->
    <g :clip-path="`url(#${clipId})`">
      <g class="glass-liquid" :style="liquidStyle">
        <rect :x="spec.liq.x" :y="spec.liq.ty" :width="spec.liq.w" :height="liqH" :fill="color" />
        <rect :x="spec.liq.x" :y="spec.liq.ty" :width="spec.liq.w" height="8" fill="rgba(255,255,255,0.13)" />
        <ellipse :cx="spec.liq.cx" :cy="spec.liq.ty" :rx="spec.liq.rx" ry="4" fill="rgba(255,255,255,0.18)" />
      </g>
    </g>

    <!-- 杯身描邊 -->
    <template v-for="(o, i) in spec.outline" :key="'o' + i">
      <path
        v-if="o.t === 'path'"
        :d="o.a.d as string"
        fill="none"
        :stroke="CREAM"
        stroke-width="1.6"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <ellipse
        v-else
        :cx="o.a.cx"
        :cy="o.a.cy"
        :rx="o.a.rx"
        :ry="o.a.ry"
        fill="none"
        :stroke="CREAM"
        stroke-width="1.6"
      />
    </template>

    <!-- 裝飾 garnish -->
    <g v-if="garnish === 'cherry'">
      <path :d="cherryStem" :stroke="CREAM" stroke-width="1.3" fill="none" stroke-linecap="round" />
      <circle :cx="rx + 10" :cy="ry - 20" r="5.5" fill="#8E2B33" :stroke="CREAM" stroke-width="1.1" />
    </g>
    <g v-else-if="garnish === 'olive'">
      <line :x1="rx - 22" :y1="ry - 26" :x2="rx - 2" :y2="ry + 4" :stroke="CREAM" stroke-width="1.2" />
      <ellipse :cx="rx - 18" :cy="ry - 22" rx="5" ry="6.5" fill="#6f7d3a" :stroke="CREAM" stroke-width="1" />
    </g>
    <g v-else-if="garnish === 'citrus'">
      <path :d="citrusArc" :fill="color" opacity="0.55" :stroke="CREAM" stroke-width="1.2" />
      <path :d="citrusVein" :stroke="CREAM" stroke-width="1" />
    </g>
    <g v-else-if="garnish === 'mint'" :transform="mintTransform">
      <path d="M2 14 Q-6 2 6 -4 Q10 8 2 14 Z" fill="#5f8a3e" :stroke="CREAM" stroke-width="1" />
      <path d="M8 12 Q4 -2 16 -2 Q16 10 8 12 Z" fill="#6f9a48" :stroke="CREAM" stroke-width="1" />
    </g>
    <path
      v-else-if="garnish === 'twist'"
      :d="twistPath"
      stroke="#E0B24C"
      stroke-width="2.4"
      fill="none"
      stroke-linecap="round"
    />
  </svg>
</template>
