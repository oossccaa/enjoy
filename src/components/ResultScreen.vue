<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { SoulType } from '../types'
import GlassSvg from './GlassSvg.vue'
import { reduceMotion } from '../util'

const props = defineProps<{ type: SoulType }>()
const emit = defineEmits<{ (e: 'again'): void }>()

const shareLabel = ref('分享結果')
// 進場先空杯,掛載後觸發注液(減少動態時直接滿杯)
const poured = ref(reduceMotion)

onMounted(() => {
  if (reduceMotion) return
  setTimeout(() => {
    poured.value = true
  }, 110)
})

function share() {
  const t = props.type
  const text = `我的靈魂調酒是「${t.cocktailZh}」——${t.caption}`
  const nav = navigator as Navigator & { share?: (d: unknown) => Promise<void> }
  if (nav.share) {
    nav.share({ title: '你的靈魂調酒是哪一杯?', text }).catch(() => {})
  } else {
    try {
      navigator.clipboard?.writeText(text)
    } catch {
      /* 忽略 */
    }
    shareLabel.value = '已複製'
  }
}
</script>

<template>
  <section class="screen result">
    <div class="res-eyebrow">你的靈魂,屬於——</div>
    <div class="res-glass">
      <GlassSvg
        :glass="type.glass"
        :color="type.color"
        :garnish="type.garnish"
        :poured="poured"
        :instant="reduceMotion"
        uid="res"
      />
    </div>
    <div class="res-title">{{ type.title }}</div>
    <h2 class="res-name">{{ type.cocktailZh }}</h2>
    <div class="res-en">{{ type.cocktailEn }}</div>
    <p class="res-caption">「{{ type.caption }}」</p>
    <p class="res-desc">{{ type.desc }}</p>

    <div class="res-actions">
      <button class="btn btn-ghost" @click="share">{{ shareLabel }}</button>
      <button class="btn btn-ghost" @click="emit('again')">再測一次</button>
    </div>

    <div class="footer-note">
      <a href="https://tris.workshop" target="_blank" rel="noopener" class="footer-link">
        <span class="footer-rule" />
        Tris Workshop
        <span class="footer-rule" />
      </a>
    </div>
  </section>
</template>
