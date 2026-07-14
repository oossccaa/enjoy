# CLAUDE.md

本檔提供給 Claude Code 與未來接手的開發者,說明「癮酒 enjoy」專案的背景、結構與常見開發任務。

## 專案概述

**癮酒(enjoy / NIGHTCAP)** 是一套放在酒吧裡的「選酒測驗」體驗。客人掃桌上的 QR code,玩約一分鐘的測驗,就會得到「最適合他的那一杯靈魂調酒」——而且那杯酒**就在該店的菜單上**。

核心商業邏輯:測驗推薦的每一杯都是店家的酒,等於用一個好玩、想分享的測驗替整份酒單做推銷。產品定位為**月訂閱制 SaaS**(Basic / Plus / Signature 三檔)。

> 商業背景整理自內部企劃書 `癮酒-合作企劃書.docx`(刻意未納入 git,見「注意事項」)。

### 測驗形式:12 題,推出一杯靈魂調酒

- **題庫**:12 題情境二選一(A / B),內部對應 MBTI 四軸(E/I、S/N、T/F、J/P),每軸 3 題。
- **計分**:每軸 3 題多數決得一個字母(奇數題、永不平手),四字母組成 16 型代碼 → 對到一杯靈魂調酒與一段性格文案。
- **⚠️ 保持神秘感(重要產品要求)**:對使用者**完全不透露這是 MBTI / 性格分類測驗,不顯示 MBTI 暱稱(如「調停者」)**。
  - 型號 `code`、字母 `letter`、暱稱 `nickname` 僅供內部計分與資料對應,原則上不渲染到畫面。
  - **唯一例外(2026-07 產品方決定)**:分享圖卡右上的稀有度膠囊 — 該型有 `ratio` 顯示「全臺僅 X%」,沒有的顯示型號(如 ENTP)。除此之外任何畫面仍不得露出型號。
  - 介面 / 文案 / 題目不得出現「MBTI / 16 型人格 / 性格類型 / E·I·S·N」等字眼。
  - 整體包裝成「酒吧讀出你的靈魂,為你斟上專屬的那一杯」。
- **結果頁顯示**:氛圍小標 → 靈魂調酒真實酒照(拱門相框,載入後顯影)→ 性格頭銜 `title` → 調酒中/英文名 → 金句 `caption` → 結果文案 `desc`。不顯示型號、不顯示契合度。

**目前狀態:** 本 repo 是**前端 demo**。16 杯靈魂調酒硬編碼為示範內容。後台數據、每店客製、QR 產生等 SaaS 功能尚未實作。

- Demo 網址:https://oossccaa.github.io/enjoy/
- Repo:https://github.com/oossccaa/enjoy(public,GitHub Pages 由 GitHub Actions 部署)
- 原始內容來源:`files/` 下四份 CSV(題目、計分邏輯、16 型對照、結果文案)。`files/` 已由 `.gitignore` 排除,不入庫。

## 技術架構

- **Vue 3 + TypeScript + Vite**(`<script setup>` SFC)。
- 動畫:**純 CSS**(`main.css` 的 `@keyframes` fadeUp / fadeIn / floatY / glowPulse;結果頁酒照是 `.res-img` 載入後的 opacity/scale 顯影 transition)。`GlassSvg` 的注杯機制保留,但目前僅首頁示意杯與圖板缺圖時使用。GSAP 已不再使用(仍列在 `package.json` 但無 import,可日後移除)。
- 字體:**Google Fonts**(Cormorant Garamond / Noto Serif TC / Noto Sans TC),走 CDN,在 `index.html` head 載入。
- **行動優先設計**:`.stage` 寬度上限 440px、高度上限 920px;桌機上置中成一支手機大小的畫面。`.stage` 的 `color` 設為琥珀色,故情境線稿 / 進度條 / 標籤等 `currentColor` 皆走琥珀。
- 尊重 `prefers-reduced-motion`:偵測到時(`reduceMotion`,見 `src/util.ts`)示意杯直接滿杯;`main.css` 的 media query 亦停用所有進場 / 漂浮 / 脈動動畫與結果頁酒照顯影,直接顯示最終狀態。
- **單頁狀態切換**,無 vue-router:`App.vue` 用 `mode` ref 在 `home / quiz / result / share / gallery` 之間切換,避免 GitHub Pages 深連結 404。
- **雙進入點**(`vite.config.ts` 的 `rollupOptions.input`):`index.html` 是測驗本體;`board.html` 是「16 杯設計圖板」(`/enjoy/board.html`,內部用、`noindex`),掛載 `src/board.ts` → `BoardScreen.vue`,基底樣式走 `styles/board.css`(可捲動,不吃 main.css 的置中鎖定)。共用的 `:root` 變數抽在 `styles/tokens.css`,由 main.css / board.css `@import`。

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
├── main.ts                 # 掛載 App(index.html 進入點)
├── board.ts                # 掛載 BoardScreen(board.html 進入點)
├── App.vue                 # 狀態機(home/quiz/result)+ #glow 環境光 + 畫面淡入淡出
├── types.ts                # Axis / Letter / TypeCode / MbtiQuestion / SoulType 型別
├── util.ts                 # hexA()(酒色→光暈)、reduceMotion
├── styles/
│   ├── tokens.css          # :root 設計變數(兩個進入點共用)
│   ├── main.css            # 測驗本體樣式(@import tokens + 各畫面)
│   └── board.css           # 設計圖板基底樣式(@import tokens,可捲動)
├── images/                 # 16 杯酒照原圖(<型號>.png,已 gitignore 不入庫)
│   ├── opt/                # sips 壓縮後 JPEG(檔名用調酒 slug,避免打包網址露型號)— 入庫
│   └── cards/              # 預渲染的 16 張分享圖卡 1080×1620(npm run cards 產生)— 入庫
├── data/
│   ├── mbtiQuestions.ts    # MBTI_QUESTIONS — 12 題(改題目動這裡)
│   ├── soulTypes.ts        # SOUL_TYPES — 16 型靈魂調酒 + 文案 + 杯型/裝飾(改結果動這裡)
│   ├── drinkImages.ts      # DRINK_IMAGES — 型號 → 酒照(import opt/*.jpg,對應僅存內部)
│   ├── shareCards.ts       # SHARE_CARDS — 型號 → 分享圖卡(import cards/*.jpg)
│   ├── scenes.ts           # SCENES — 12 題各自的情境線稿(依題序,QuizScreen 用 SCENES[idx])
│   └── glasses.ts          # GLASS — 六種酒杯幾何規格(clip / outline / 液面 / 杯緣)
├── composables/
│   └── useMbti.ts          # 計分引擎(多數決 → 型號 → 靈魂調酒)
└── components/
    ├── HomeScreen.vue      # 單一進場(Soul Cocktail 小標 + coupe 示意杯 + 開始測驗 + 查看所有圖卡)
    ├── QuizScreen.vue      # 12 題二選一 + 頂部進度條 + 返回箭頭 + 每題情境線稿
    ├── ResultScreen.vue    # 結果頁(拱門酒照 + 頭銜 + 調酒名 + 金句 + 文案,「分享結果」進分享頁)
    ├── ShareScreen.vue     # 分享頁(可截圖的 .sh-card 圖卡 + 系統分享 / 下載;也是預渲染圖卡的版型)
    ├── GalleryScreen.vue   # 圖庫頁(首頁「查看所有圖卡」進入;16 張圖卡縮圖,點開大圖 + 結果文案)
    ├── BoardScreen.vue     # 16 杯設計圖板(預設酒照;可拖圖覆蓋 → localStorage;杯型/裝飾中文標)
    └── GlassSvg.vue        # 依 glass 造型描邊 + 注液(poured 觸發)+ garnish 裝飾
```

### 資料模型(改內容主要動這兩個檔)
- **`SOUL_TYPES`**(`src/data/soulTypes.ts`)— `Record<TypeCode, SoulType>`,16 型。每型有 `code`(內部 key,**不顯示**)、`nickname`(MBTI 暱稱,**不顯示**)、`cocktailZh`、`cocktailEn`、`title`(性格頭銜)、`caption`(金句)、`desc`(結果文案)、`color`(酒液/光暈色)、`glass`(杯型:rocks/highball/coupe/martini/flute/margarita)、`garnish`(裝飾:cherry/olive/citrus/mint/twist/none)、`ratio?`(台灣比例,部分型才有)。
- **`MBTI_QUESTIONS`**(`src/data/mbtiQuestions.ts`)— `MbtiQuestion[]`,12 題。每題有 `axis`(內部用,EI/SN/TF/JP)、`eyebrow`(氛圍小標)、`q`、`a`、`b`。`a`/`b` 各是 `{ t: 選項文字, letter: 加分字母 }`。情境插畫改由 `SCENES[idx]`(`src/data/scenes.ts`)依題序對應。
  - **每軸務必維持 3 題(奇數,才不會平手)**;`a.letter` / `b.letter` 必須是該軸的兩個字母。改題數時 `scenes.ts` 也要同步增減。

### 計分邏輯(`src/composables/useMbti.ts`)
- `apply(choice)` 記錄該題選到的字母;`next()` 前進一題(刻意分開,讓畫面先淡出舊內容再換題)。
- `result()`:四軸各數字母多數決 → 依序 E/I,S/N,T/F,J/P 組成 `TypeCode` → 回傳 `SOUL_TYPES[code]`。
- 測驗中環境光暈維持預設琥珀色,結果頁才把 `#glow` 染成該杯酒的 `color`。

## 常見開發任務

- **改題目 / 選項** → 編輯 `src/data/mbtiQuestions.ts`。維持每軸 3 題、`letter` 對到正確軸向。
- **改結果文案 / 調酒 / 顏色 / 杯型 / 裝飾** → 編輯 `src/data/soulTypes.ts`(`glass` / `garnish` 決定結果頁畫的杯子)。新增杯型要在 `src/data/glasses.ts` 補幾何。
- **改題目情境插畫** → 編輯 `src/data/scenes.ts`(inline SVG 路徑,置於 viewBox `0 0 120 120`)。
- **客製成某間店** → 16 型對到的 16 杯換成該店酒單(改 `SOUL_TYPES` 的調酒名 / 文案 / 杯型);頁尾字樣在 `ResultScreen.vue` 與 `ShareScreen.vue`(目前為 Tris Studio),品牌字樣在 `HomeScreen.vue`。
- **調整配色** → 改 `src/styles/tokens.css` 的 `:root` 變數(兩個進入點共用);各杯酒顏色在 `SOUL_TYPES[*].color`。
- **換某杯的酒照** → 原圖放 `src/images/<型號>.png`,用 `sips -s format jpeg -s formatOptions 80 --resampleHeightWidthMax 1000` 壓成 `src/images/opt/<調酒slug>.jpg`,對應寫在 `src/data/drinkImages.ts`。**opt/ 檔名務必用調酒 slug、不可用型號**(打包後的資源網址看得到檔名)。換照後記得重跑 `npm run cards`。
- **改分享圖卡** → 版型是 `ShareScreen.vue` 的 `.sh-card`(樣式在 `main.css` 的 `.sh-*`,規格出自 Claude Design 專案「分享畫面美化建議」的 SHARE 畫面)。改完版型、酒照或 `SOUL_TYPES` 文案後,跑 `npm run build && npm run cards` 重新產出 `src/images/cards/`(用本機 Chrome 走完測驗、進分享頁對 `.sh-card` 3x 截圖,真排版引擎渲染,不會有 canvas / html-to-image 的字型失真問題)。分享流程:結果頁「分享結果」→ 分享頁,優先 `navigator.share` 傳圖檔(手機),不支援就下載 JPEG;「儲存圖卡」直接下載。
- **改動畫** → 進場 / 漂浮 / 脈動都在 `main.css` 的 `@keyframes` 與各 class;結果頁酒照顯影在 `main.css` 的 `.res-photo` / `.res-img`;示意杯注杯在 `GlassSvg.vue`(`poured` 觸發 `translateY` transition)。
- **⚠️ 切記**:任何顯示到畫面的改動都不要把型號 / 字母 / MBTI 暱稱 / 「人格測驗」字樣露出來。

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

- **企劃書與原始 CSV 不入庫**:`癮酒-合作企劃書.docx` 為內部商業文件,`files/`(含四份 CSV)為內容原稿,皆由 `.gitignore` 排除,請勿 commit 進公開 repo。`indexbackup.html`(舊單檔版備份)與 `node_modules`、`dist` 同樣已排除。
- **行動優先**:任何 UI 調整請以 ≤440px 寬度為基準測試;結果頁長文案可捲動。
- **外部相依**:Google Fonts 走 CDN,離線時字體會 fallback(功能不受影響)。GSAP 已打包進 bundle。
- **未來方向**(來自企劃,尚未實作):每店客製測驗與酒單對應、QR 桌卡產生、後台客群數據與分析、訂閱方案管理。`src/data/` 已是可抽換的資料層,可往「每店一份設定」延伸。
