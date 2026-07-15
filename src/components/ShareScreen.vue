<script setup lang="ts">
/* 分享頁(規格出自 Claude Design「靈魂調酒 enjoy.dc.html」的 SHARE 畫面):
   可截圖的圖卡 + 系統分享 / 下載。卡片中央以真實酒照取代設計稿的線稿杯。
   .sh-card 同時是 scripts/generate-share-cards.mjs 預渲染 16 張靜態圖卡的版型。 */
import { onMounted, ref } from 'vue'
import type { SoulType } from '../types'
import { DRINK_IMAGES } from '../data/drinkImages'
import { SHARE_CARDS } from '../data/shareCards'
import { hexA } from '../util'
// 指向 https://soul-cocktail.vercel.app/ 的 QR(產生方式見 CLAUDE.md)
import qrEnjoy from '../images/qr-enjoy.svg'

const props = defineProps<{ type: SoulType }>()
const emit = defineEmits<{ (e: 'again'): void }>()

const shareLabel = ref('分享我的靈魂調酒')
const saveLabel = ref('儲存圖卡')
const busy = ref(false)

// 系統分享用的 blob:進頁先預熱,按下按鈕時幾乎同步返回,
// 避免 Safari 因 async 間隔判定「失去使用者手勢」而擋掉分享
let cardBlob: Blob | null = null
async function card(): Promise<Blob> {
  if (!cardBlob) cardBlob = await (await fetch(SHARE_CARDS[props.type.code])).blob()
  return cardBlob
}
onMounted(() => {
  card().catch(() => {})
})

/* 下載走同步直連:圖卡是同源靜態檔,<a download> 直接指資產網址。
   不經 fetch/blob → 點擊全程同步,Safari 不會因手勢過期或
   blob URL 提早 revoke 而下載失敗 */
function downloadDirect() {
  const a = document.createElement('a')
  a.href = SHARE_CARDS[props.type.code]
  a.download = `靈魂調酒-${props.type.cocktailZh}.jpg`
  document.body.appendChild(a)
  a.click()
  a.remove()
}

// 優先走系統分享(手機可直接傳圖給朋友);不支援分享圖檔時退回下載
async function share() {
  if (busy.value) return
  busy.value = true
  try {
    const t = props.type
    const nav = navigator as Navigator & { canShare?: (d: { files: File[] }) => boolean }
    if (typeof nav.canShare === 'function') {
      const blob = await card() // 已預熱,通常立即返回
      const file = new File([blob], `靈魂調酒-${t.cocktailZh}.jpg`, { type: 'image/jpeg' })
      if (nav.canShare({ files: [file] })) {
        await navigator
          .share({
            files: [file],
            title: '你的靈魂調酒是哪一杯?',
            text: `我的靈魂調酒是「${t.cocktailZh}」——${t.caption}`,
          })
          .catch(() => {}) // 使用者取消分享不算錯
        return
      }
    }
    downloadDirect()
    shareLabel.value = '已存圖,快分享吧 ✓'
    setTimeout(() => (shareLabel.value = '分享我的靈魂調酒'), 2000)
  } catch {
    shareLabel.value = '分享失敗'
  } finally {
    busy.value = false
  }
}

// 儲存圖卡:全同步,Safari 也穩
function save() {
  downloadDirect()
  saveLabel.value = '已儲存 ✓'
  setTimeout(() => (saveLabel.value = '儲存圖卡'), 2000)
}
</script>

<template>
  <section class="screen share-screen">
    <!-- 可截圖的圖卡(也是預渲染圖卡的版型) -->
    <div
      class="sh-card"
      :style="{
        background: `radial-gradient(135% 78% at 50% -6%, ${hexA(type.color, 0.3)} 0%, #141a24 46%, #0b0e14 100%)`,
      }"
    >
      <div class="sh-card-glow" :style="{ background: hexA(type.color, 0.3) }" />
      <span class="sh-tick tl" /><span class="sh-tick tr" />
      <span class="sh-tick bl" /><span class="sh-tick br" />

      <div class="sh-head">
        <div>
          <div class="sh-brand">NIGHTCAP</div>
          <div class="sh-sub">Soul Cocktail</div>
        </div>
        <!-- 型號膠囊:一律顯示 MBTI(產品方決定僅圖卡此處露出) -->
        <div class="sh-rarity">{{ type.code }}</div>
      </div>

      <div class="sh-photo">
        <img :src="DRINK_IMAGES[type.code]" :alt="type.cocktailZh" />
      </div>

      <div class="sh-body">
        <div class="sh-label">你的靈魂調酒</div>
        <h2 class="sh-zh">{{ type.cocktailZh }}</h2>
        <div class="sh-en">{{ type.cocktailEn }}</div>
        <div class="sh-chip">{{ type.title }}</div>
        <div class="sh-divider">
          <span class="sh-div-l" /><span class="sh-div-d" /><span class="sh-div-r" />
        </div>
        <p class="sh-caption">「{{ type.caption }}」</p>
      </div>

      <div class="sh-foot">
        <div class="sh-qr-wrap">
          <img class="sh-qr" :src="qrEnjoy" alt="測驗網站 QR code" />
          <div class="sh-qr-note">找出你的靈魂調酒<br />屬於你的那一杯</div>
        </div>
        <div class="sh-site">tris studio</div>
      </div>
    </div>

    <div class="sh-hint">截圖這張卡片,分享到限時動態 ✦</div>

    <div class="sh-actions">
      <button class="btn btn-solid" :disabled="busy" @click="share">{{ shareLabel }}</button>
      <div class="sh-actions-row">
        <button class="btn btn-ghost" :disabled="busy" @click="save">{{ saveLabel }}</button>
        <button class="btn btn-ghost" @click="emit('again')">再測一次</button>
      </div>
    </div>
  </section>
</template>
