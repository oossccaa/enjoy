# CLAUDE.md

本檔提供給 Claude Code 與未來接手的開發者,說明「癮酒 enjoy」專案的背景、結構與常見開發任務。

## 專案概述

**癮酒(enjoy / NIGHTCAP)** 是一套放在酒吧裡的「選酒測驗」體驗。客人掃桌上的 QR code,玩約一分鐘的測驗,就會得到「最適合他的那一杯」——而且那杯酒**就在該店的菜單上**。

核心商業邏輯:測驗推薦的每一杯都是店家的酒,等於用一個好玩、想分享的測驗替整份酒單做推銷。產品定位為**月訂閱制 SaaS**(Basic / Plus / Signature 三檔),賣點包括:加快點單、讓招牌酒被看見、提升客單價、自帶社群分享行銷、後台客群數據。

> 商業背景整理自內部企劃書 `癮酒-合作企劃書.docx`(刻意未納入 git,見下方「注意事項」)。

**雙入口:** 首頁讓客人選擇要玩哪一種測驗,兩者最後都從同一份店家酒單推薦出最適合的那一杯:
- **① 心理測驗(A Walk Through the Night)** — 夜路情境、四題帶故事的選擇,讀出貼近心境的酒。
- **② 味覺測試(Ask the Bartender)** — 酒保風格四題:口感 / 酒體 / 風味 / 酒精強度,直接調出合味蕾的酒。

**目前狀態:** 本 repo 是**前端 demo**,展示給潛在客戶看。酒單硬編碼為一間示範酒吧的 **10 款經典調酒**。後台數據、每店客製、QR 產生等 SaaS 功能尚未實作。

- Demo 網址:https://oossccaa.github.io/enjoy/
- Repo:https://github.com/oossccaa/enjoy(public,GitHub Pages 由 GitHub Actions 部署)

## 技術架構

- **Vue 3 + TypeScript + Vite**(`<script setup>` SFC)。
- 動畫:**GSAP 3**(npm 依賴,非 CDN)。
- 字體:**Google Fonts**(Cormorant Garamond / Noto Serif TC / Noto Sans TC),走 CDN,在 `index.html` head 載入。
- **行動優先設計**:`.stage` 寬度上限 440px、高度上限 920px;桌機上置中成一支手機大小的畫面。
- 尊重 `prefers-reduced-motion`:偵測到時(`reduceMotion`,見 `src/util.ts`)略過所有 GSAP 動畫,直接顯示最終狀態。
- **單頁狀態切換**,無 vue-router:`App.vue` 用 `mode` ref 在 `home / psych / taste / result` 之間切換,避免 GitHub Pages 深連結 404。

### 開發指令

```bash
npm install      # 安裝相依
npm run dev      # 本地開發伺服器(Vite)
npm run build    # vue-tsc 型別檢查 + vite 打包到 dist/
npm run preview  # 預覽 dist(會在 /enjoy/ 子路徑下,模擬正式環境)
```

## 程式結構導覽

```
src/
├── main.ts                 # 掛載 App
├── App.vue                 # 狀態機(home/psych/taste/result)+ #glow 環境光 + 畫面淡入淡出
├── types.ts                # DrinkKey / Drink / Step / Choice / Ranked 型別
├── util.ts                 # hexA()(酒色→光暈)、reduceMotion
├── styles/main.css         # 全站樣式(:root 變數 + 各畫面)
├── data/
│   ├── drinks.ts           # DRINKS — 10 款酒資料庫(改酒單動這裡)
│   ├── motifs.ts           # MOTIF — 情境 inline SVG 圖示
│   ├── psychSteps.ts       # PSYCH_STEPS — 心理測驗 4 題
│   └── tasteSteps.ts       # TASTE_STEPS — 味覺測試 4 題
├── composables/
│   └── useQuiz.ts          # 計分引擎(兩套測驗共用)
└── components/
    ├── HomeScreen.vue      # 雙入口首頁
    ├── QuizScreen.vue      # 通用題目畫面,吃任一 Step[] 陣列
    ├── ResultScreen.vue    # 結果頁(主推注杯 + 第2/3名光譜條 + 分享)
    └── GlassSvg.vue        # 酒杯 + 液面 SVG
```

### 資料模型(改內容主要動這幾個檔)
- **`DRINKS`**(`src/data/drinks.ts`)— 酒款資料庫,key 型別為 `DrinkKey`(`src/types.ts`)。每杯有 `name`、`en`、`tag`、`color`(酒液與光暈色)、`desc`(主推描述)、`note`(光譜條展開簡介)。目前 10 款:`pinot`(黑皮諾)/ `spritz`(亞普羅氣泡)/ `old`(古典)/ `marg`(瑪格麗特)/ `neg`(尼格羅尼)/ `mojito`(莫希托)/ `martini`(馬丁尼)/ `mule`(莫斯科騾子)/ `espresso`(濃縮咖啡馬丁尼)/ `sour`(威士忌沙瓦)。
- **`PSYCH_STEPS` / `TASTE_STEPS`**(`src/data/*Steps.ts`)— 題目陣列。每題有 `eyebrow`、`motif`、`q`、`choices`。每個選項是 `{ t: 文字, w: { 酒key: 權重 } }`。**一個選項可同時為多杯酒加分**,這是讓「每杯獨立 %」成立的關鍵。
- **`MOTIF`**(`src/data/motifs.ts`)— 情境 inline SVG(`door` / `meet` / `spark` / `path` / `taste` / `glass`)。

### 計分邏輯(`src/composables/useQuiz.ts`)
- `useQuiz(steps)` 吃任一題庫,回傳響應式狀態與方法,**心理 / 味覺兩套共用**。
- `apply(choice)` 把選項權重加進 `scores`;`next()` 前進一題(刻意分開,讓畫面能先淡出舊內容再換題)。
- `MAXPOSS`:每杯酒「理論最高分」(每題挑對它最有利的選項),由傳入的 steps 自動算。
- 契合度 % = `Math.round(48 + (scores[k]/MAXPOSS[k]) * 50)`,壓進 **48–98%** 區間(MBTI 風格)。
- `ranked`:排序取名次;第一名注入酒杯,第二、三名做成光譜條。`leader`:目前領先酒款,`App.vue` 用它即時染環境光暈 `#glow`。

## 常見開發任務

- **改題目 / 選項** → 編輯 `src/data/psychSteps.ts` 或 `tasteSteps.ts`。新增選項時在 `w` 分配權重給對應的酒 key。
- **新增 / 調整酒款** → 先在 `src/types.ts` 的 `DrinkKey` 加 key(TS 會檢查打錯字),再到 `src/data/drinks.ts` 補資料,並到兩份 `*Steps.ts` 的選項 `w` 加上該 key 權重,否則它永遠拿不到分、無法被推薦。`scores` / `MAXPOSS` 會自動涵蓋新 key。
- **客製成某間店** → 改 `DRINKS`(換成該店酒單)、兩份 `*Steps.ts` 的 `w` 對應、`ResultScreen.vue` 的 `◯◯ BAR` 店名;品牌字樣在 `HomeScreen.vue`。
- **調整配色** → 改 `src/styles/main.css` 的 `:root` 變數(`--amber`、`--cream`、`--night` 等);各酒酒液顏色在 `DRINKS[*].color`。
- **改動畫** → 各元件 `onMounted` / `playStep` 裡的 GSAP timeline(`HomeScreen` 進場、`QuizScreen` 題目轉場、`ResultScreen` 注杯+光譜條)。

## 部署

GitHub Pages 由 **GitHub Actions** 部署(`.github/workflows/deploy.yml`):push 到 `main` → `npm ci && npm run build` → 把 `dist/` 部署到 Pages。

```bash
git add -A
git commit -m "..."
git push
```

push 後到 GitHub Actions 看 deploy workflow,綠燈後(約 1–2 分鐘)demo 網址 https://oossccaa.github.io/enjoy/ 隨之更新。

> **重要:** Vite 的 `base` 設為 `/enjoy/`(見 `vite.config.ts`),對應 repo 名稱。若改 repo 名,這裡要一起改,否則資源路徑會 404。

## 注意事項

- **企劃書不入庫**:`癮酒-合作企劃書.docx` 為內部商業文件,已由 `.gitignore`(`*.docx`)排除,請勿 commit 進公開 repo。`indexbackup.html`(舊單檔版備份)與 `node_modules`、`dist` 同樣已排除。
- **行動優先**:任何 UI 調整請以 ≤440px 寬度為基準測試。
- **外部相依**:Google Fonts 走 CDN,離線時字體會 fallback(功能不受影響)。GSAP 已打包進 bundle,不依賴 CDN。
- **未來方向**(來自企劃,尚未實作):每店客製測驗與酒單對應、QR 桌卡產生、後台客群數據與分析、訂閱方案管理。往 SaaS 演進時,目前 `src/data/` 的 `DRINKS`/`*Steps` 已是可抽換的資料層,可往「每店一份設定」延伸。
