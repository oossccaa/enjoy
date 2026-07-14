<script setup lang="ts">
/* 圖庫頁:首頁「查看所有圖卡」進來,瀏覽 16 張分享圖卡。
   點一張看大圖 + 結果文案(讓人知道每杯酒代表什麼樣的人)。
   ⚠️ 文案不得出現「人格 / MBTI」字眼(神秘感)。 */
import { ref } from 'vue'
import type { SoulType } from '../types'
import { SOUL_TYPES } from '../data/soulTypes'
import { SHARE_CARDS, SHARE_CARD_THUMBS } from '../data/shareCards'

const emit = defineEmits<{ (e: 'back'): void }>()

const drinks = Object.values(SOUL_TYPES)
const active = ref<SoulType | null>(null)
</script>

<template>
  <section class="screen gallery" :class="{ locked: active }">
    <div class="sh-top">
      <button class="q-back" aria-label="返回" @click="emit('back')">←</button>
      <div class="sh-eyebrow">查看所有經典調酒</div>
    </div>
    <p class="gal-intro">每一杯,都是一種靈魂的樣子。<br />點開看看,哪一杯最像你——或你身邊的誰。</p>

    <div class="gal-grid">
      <button v-for="d in drinks" :key="d.cocktailEn" class="gal-item" @click="active = d">
        <img
          class="gal-thumb"
          :src="SHARE_CARD_THUMBS[d.code]"
          :alt="d.cocktailZh"
          loading="lazy"
          decoding="async"
        />
      </button>
    </div>

    <!-- 大圖 + 說明 -->
    <Transition name="fade">
      <div v-if="active" class="gal-detail" @click.self="active = null">
        <!-- inner 撐滿浮層,空白處點擊也要能關 -->
        <div class="gal-detail-inner" @click.self="active = null">
          <img class="gal-detail-card" :src="SHARE_CARDS[active.code]" :alt="active.cocktailZh" />
          <p class="gal-desc">{{ active.desc }}</p>
          <button class="btn btn-ghost gal-close" @click="active = null">關 閉</button>
        </div>
      </div>
    </Transition>
  </section>
</template>
