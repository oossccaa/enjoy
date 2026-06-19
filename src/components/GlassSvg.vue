<script setup lang="ts">
// 酒杯 + 液面 SVG。液面高度由父層用 GSAP 控制 #resLiquid 的 y 屬性。
defineProps<{ color: string }>()
</script>

<template>
  <svg width="150" height="186" viewBox="0 0 150 186" class="glass-svg" aria-hidden="true">
    <defs>
      <clipPath id="resClip">
        <path d="M40 50 L110 50 L102 150 Q102 158 94 158 L56 158 Q48 158 48 150 Z" />
      </clipPath>
    </defs>
    <g clip-path="url(#resClip)">
      <rect id="resLiquid" x="34" y="158" width="82" height="120" :fill="color" />
      <path
        id="resWave"
        d="M30 0 Q50 -7 75 0 T150 0 L150 30 L30 30 Z"
        fill="rgba(255,255,255,0.12)"
      />
    </g>
    <path
      d="M40 50 L110 50 L102 150 Q102 158 94 158 L56 158 Q48 158 48 150 Z"
      fill="none"
      stroke="rgba(241,235,222,0.6)"
      stroke-width="1.5"
    />
    <ellipse cx="75" cy="50" rx="35" ry="6" fill="none" stroke="rgba(241,235,222,0.6)" stroke-width="1.5" />
    <rect
      x="62"
      y="74"
      width="26"
      height="26"
      rx="4"
      fill="none"
      stroke="rgba(255,255,255,0.30)"
      stroke-width="1.2"
      transform="rotate(-8 75 87)"
    />
  </svg>
</template>
