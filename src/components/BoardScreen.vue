<script setup lang="ts">
/* 16 杯靈魂調酒 · 設計圖板(/enjoy/board.html,內部用)
   每格預設顯示 DRINK_IMAGES 的酒照;拖入或點選可換成自己的圖
   (縮圖後存 localStorage 覆蓋),之後可接進結果頁與分享卡。
   兩者皆無時以 GlassSvg 線稿示意。型號僅作儲存 key,不渲染到畫面。 */
import { computed, reactive, ref } from 'vue'
import type { SoulType, TypeCode } from '../types'
import { SOUL_TYPES } from '../data/soulTypes'
import { DRINK_IMAGES } from '../data/drinkImages'
import { hexA } from '../util'
import GlassSvg from './GlassSvg.vue'

const GLASS_ZH: Record<SoulType['glass'], string> = {
  rocks: '威士忌杯',
  highball: '高球杯',
  coupe: '淺碟杯',
  martini: '馬丁尼杯',
  flute: '笛型杯',
  margarita: '瑪格麗特杯',
}
const GARNISH_ZH: Record<SoulType['garnish'], string> = {
  cherry: '櫻桃',
  olive: '橄欖',
  citrus: '柑橘',
  mint: '薄荷',
  twist: '檸檬皮捲',
  none: '無裝飾',
}

const drinks = computed(() =>
  Object.values(SOUL_TYPES).map((s) => ({
    ...s,
    glow: hexA(s.color, 0.32),
    spec: `${GLASS_ZH[s.glass]} · ${GARNISH_ZH[s.garnish]}`,
    rarity: s.ratio ? `全臺 ${s.ratio}` : '',
  })),
)

/* ---------- 圖片槽:預設酒照,可拖放 / 點選覆蓋(縮圖 → localStorage)---------- */
const KEY = 'nightcap-board:'
const MAX_EDGE = 900

// 使用者自行拖入的覆蓋圖;顯示時 custom 優先於 DRINK_IMAGES
const custom = reactive<Partial<Record<TypeCode, string>>>({})
try {
  for (const code of Object.keys(SOUL_TYPES) as TypeCode[]) {
    const saved = localStorage.getItem(KEY + code)
    if (saved) custom[code] = saved
  }
} catch {
  /* localStorage 不可用時僅存於記憶體 */
}

function imageOf(code: TypeCode): string | undefined {
  return custom[code] ?? DRINK_IMAGES[code]
}

const dragOver = ref<TypeCode | null>(null)
const saveNote = ref('')
const fileInput = ref<HTMLInputElement | null>(null)
const pendingCode = ref<TypeCode | null>(null)

async function shrinkToDataUrl(file: File): Promise<string> {
  const bmp = await createImageBitmap(file)
  const scale = Math.min(1, MAX_EDGE / Math.max(bmp.width, bmp.height))
  const canvas = document.createElement('canvas')
  canvas.width = Math.round(bmp.width * scale)
  canvas.height = Math.round(bmp.height * scale)
  canvas.getContext('2d')!.drawImage(bmp, 0, 0, canvas.width, canvas.height)
  return canvas.toDataURL('image/jpeg', 0.85)
}

async function setImage(code: TypeCode, file: File | null | undefined) {
  if (!file || !file.type.startsWith('image/')) return
  const url = await shrinkToDataUrl(file)
  custom[code] = url
  try {
    localStorage.setItem(KEY + code, url)
    saveNote.value = ''
  } catch {
    saveNote.value = '⚠️ 瀏覽器儲存空間不足,這張圖僅暫存於本頁'
  }
}

// 移除覆蓋圖,回到預設酒照
function clearImage(code: TypeCode) {
  delete custom[code]
  try {
    localStorage.removeItem(KEY + code)
  } catch {
    /* noop */
  }
}

function onDrop(code: TypeCode, e: DragEvent) {
  dragOver.value = null
  setImage(code, e.dataTransfer?.files[0])
}

function pick(code: TypeCode) {
  pendingCode.value = code
  fileInput.value?.click()
}

function onPicked(e: Event) {
  const input = e.target as HTMLInputElement
  if (pendingCode.value) setImage(pendingCode.value, input.files?.[0])
  input.value = ''
}
</script>

<template>
  <div class="board">
    <header class="board-head">
      <div>
        <div class="board-brand">NIGHTCAP</div>
        <h1 class="board-title">16 杯靈魂調酒 · 設計圖板</h1>
      </div>
      <div class="board-note">
        <template v-if="saveNote">{{ saveNote }}</template>
        <template v-else>
          把每杯的酒照或 AI 生成圖,直接拖進(或點選)對應的格子<br />
          圖片會自動保存,之後可以接進結果頁與分享卡
        </template>
      </div>
    </header>

    <div class="board-grid">
      <article v-for="(d, i) in drinks" :key="d.cocktailEn" class="card">
        <div
          class="card-figure"
          :class="{ over: dragOver === d.code }"
          :style="{ background: `radial-gradient(120% 90% at 50% 0%, ${d.glow} 0%, #0c1017 62%)` }"
          :title="`拖入或點選「${d.cocktailZh}」的設計圖`"
          @click="pick(d.code)"
          @dragover.prevent="dragOver = d.code"
          @dragleave="dragOver = null"
          @drop.prevent="onDrop(d.code, $event)"
        >
          <img v-if="imageOf(d.code)" class="card-img" :src="imageOf(d.code)" :alt="d.cocktailZh" />
          <template v-else>
            <GlassSvg :glass="d.glass" :color="d.color" :garnish="d.garnish" poured instant :w="120" :h="195" :uid="'b' + i" />
            <div class="card-hint">拖入「{{ d.cocktailZh }}」的設計圖</div>
          </template>
          <button
            v-if="custom[d.code]"
            class="card-clear"
            type="button"
            aria-label="移除覆蓋圖,回到預設酒照"
            @click.stop="clearImage(d.code)"
          >
            ✕
          </button>
        </div>

        <div class="card-body">
          <div class="card-names">
            <div class="card-zh">{{ d.cocktailZh }}</div>
            <div class="card-en">{{ d.cocktailEn }}</div>
          </div>
          <div class="card-chip">{{ d.title }}</div>
          <div class="card-meta">
            <div class="card-spec">
              <span class="card-dot" :style="{ background: d.color, boxShadow: `0 0 8px ${d.glow}` }" />
              <span>{{ d.spec }}</span>
            </div>
            <span class="card-rarity">{{ d.rarity }}</span>
          </div>
        </div>
      </article>
    </div>

    <input ref="fileInput" type="file" accept="image/*" hidden @change="onPicked" />
  </div>
</template>

<style scoped>
.board {
  max-width: 1560px;
  margin: 0 auto;
  padding: 56px 60px 72px;
}
.board-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  border-bottom: 1px solid rgba(231, 166, 76, 0.22);
  padding-bottom: 22px;
  margin-bottom: 36px;
}
.board-brand {
  font-family: var(--serif-disp);
  font-size: 16px;
  letter-spacing: 0.34em;
  color: var(--amber);
}
.board-title {
  font-family: var(--serif-tc);
  font-weight: 600;
  font-size: 34px;
  color: var(--cream);
  letter-spacing: 0.04em;
  margin-top: 10px;
}
.board-note {
  font-size: 13px;
  color: var(--muted);
  line-height: 1.9;
  text-align: right;
  letter-spacing: 0.04em;
}

.board-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 26px;
}

.card {
  background: #10151d;
  border: 1px solid rgba(231, 166, 76, 0.18);
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.card-figure {
  position: relative;
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 18px;
  cursor: pointer;
}
.card-figure.over {
  outline: 2px dashed var(--amber);
  outline-offset: -8px;
}
.card-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.card-hint {
  font-size: 12px;
  color: var(--muted);
  letter-spacing: 0.08em;
}
.card-clear {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 28px;
  height: 28px;
  border: 1px solid rgba(241, 235, 222, 0.4);
  border-radius: 50%;
  background: rgba(7, 9, 13, 0.6);
  color: var(--cream);
  font-size: 12px;
  cursor: pointer;
}
.card-clear:hover {
  border-color: var(--amber);
  color: var(--amber);
}

.card-body {
  padding: 18px 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.card-names {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 10px;
}
.card-zh {
  font-family: var(--serif-tc);
  font-weight: 600;
  font-size: 23px;
  color: var(--cream);
  letter-spacing: 0.02em;
}
.card-en {
  font-family: var(--serif-disp);
  font-style: italic;
  font-size: 15px;
  color: var(--amber);
  opacity: 0.92;
  white-space: nowrap;
}
.card-chip {
  display: inline-flex;
  align-self: flex-start;
  font-size: 11px;
  letter-spacing: 0.22em;
  color: var(--amber);
  border: 1px solid rgba(231, 166, 76, 0.28);
  border-radius: 2px;
  padding: 5px 10px 5px 12px;
}
.card-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid rgba(241, 235, 222, 0.08);
  padding-top: 10px;
  margin-top: 2px;
}
.card-spec {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: var(--muted);
  letter-spacing: 0.06em;
}
.card-dot {
  display: block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.card-rarity {
  font-family: var(--serif-disp);
  font-style: italic;
  font-size: 12px;
  color: rgba(231, 166, 76, 0.8);
}

@media (max-width: 1280px) {
  .board-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (max-width: 960px) {
  .board-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .board {
    padding: 40px 28px 56px;
  }
  .board-head {
    flex-direction: column;
    align-items: flex-start;
  }
  .board-note {
    text-align: left;
  }
}
@media (max-width: 600px) {
  .board-grid {
    grid-template-columns: 1fr;
  }
  .board {
    padding: 32px 18px 48px;
  }
  .board-title {
    font-size: 26px;
  }
}
</style>
