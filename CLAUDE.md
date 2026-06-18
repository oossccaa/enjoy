# CLAUDE.md

本檔提供給 Claude Code 與未來接手的開發者,說明「癮酒 enjoy」專案的背景、結構與常見開發任務。

## 專案概述

**癮酒(enjoy / NIGHTCAP)** 是一套放在酒吧裡的「選酒測驗」體驗。客人掃桌上的 QR code,玩約一分鐘的情境心理測驗(四個帶故事的選擇),就會得到「最適合他的那一杯」——而且那杯酒**就在該店的菜單上**。

核心商業邏輯:測驗推薦的每一杯都是店家的酒,等於用一個好玩、想分享的測驗替整份酒單做推銷。產品定位為**月訂閱制 SaaS**(Basic / Plus / Signature 三檔),賣點包括:加快點單、讓招牌酒被看見、提升客單價、自帶社群分享行銷、後台客群數據。

> 商業背景整理自內部企劃書 `癮酒-合作企劃書.docx`(刻意未納入 git,見下方「注意事項」)。

**目前狀態:** 本 repo 是**前端 demo**,用於展示給潛在客戶看。整份體驗是單一靜態 `index.html`,內容硬編碼為一間示範酒吧的酒單(五款經典調酒)。後台數據、每店客製、QR 產生等 SaaS 功能尚未實作。

- Demo 網址:https://oossccaa.github.io/enjoy/
- Repo:https://github.com/oossccaa/enjoy(public,GitHub Pages 由 `main` 分支根目錄部署)

## 技術架構

- **單一檔案 `index.html`** — HTML + 內嵌 `<style>` + 內嵌 `<script>`,**無 build step、無套件管理、無框架**。
- 純前端、純靜態,直接用瀏覽器開啟即可運作。
- 外部相依(皆走 HTTPS CDN):
  - **Google Fonts** — Cormorant Garamond(英文襯線)、Noto Serif TC、Noto Sans TC。
  - **GSAP 3.12.5**(`cdnjs`)— 所有進場與轉場動畫。
- **行動優先設計**:`#app` 寬度上限 440px、高度上限 920px;桌機上會置中顯示成一支手機大小的畫面。
- 尊重 `prefers-reduced-motion`:偵測到時(變數 `reduce`)跳過所有 GSAP 動畫,直接顯示最終狀態,功能不受影響。

## 程式結構導覽(皆在 `index.html`)

### 三個畫面(以 `.hidden` class 切換)
- `#intro` — 品牌啟動畫面(NIGHTCAP / 癮酒 / 開始按鈕),進場動畫在 `playIntro()`。
- `#quiz` — 四題測驗,頂部有進度點 `#dots` 與題序 eyebrow;由 `showStep()` 渲染、`choose()` 處理選擇。
- `#result` — 結果頁:主推酒注入酒杯 SVG、契合度 %、第 2/3 名可展開光譜條;由 `showResult()` 渲染。

### 資料模型(改內容主要動這兩個常數)
- **`STEPS`**(約 226 行起)— 題目陣列。每題有 `eyebrow`(題序)、`motif`(對應 `MOTIF` 的圖示 key)、`q`(題目文字)、`choices`。每個選項是 `{ t: 選項文字, w: { 酒key: 權重, ... } }`。**一個選項可同時為多杯酒加分**,這是讓「每杯獨立 %」成立的關鍵。
- **`DRINKS`**(約 257 行起)— 酒款資料庫(目前 5 杯,key:`pinot` / `spritz` / `old` / `marg` / `neg`)。每杯有 `name`、`en`、`tag`、`color`(酒液與光暈顏色)、`desc`(主推描述)、`note`(光譜條展開的簡介)。
- **`MOTIF`**(約 216 行起)— 四個 inline SVG 線稿圖示(`door` / `meet` / `spark` / `path`),供題目情境使用。

### 計分邏輯
- `scores`:每杯酒的累積得分;`choose()` 把選項的 `w` 加進去。
- `MAXPOSS`:每杯酒的「理論最高分」(每題挑對它最有利的選項),啟動時自動計算。
- 契合度 % = `48 + (scores[k]/MAXPOSS[k]) * 50`,壓進 **48–98%** 區間(MBTI 風格,避免生硬的 0% / 100%)。`showResult()` 取前三名:第一名注入酒杯,第二、三名做成光譜條。
- 環境光暈 `#glow` 會即時染成目前領先酒款的顏色(`hexA()` 把酒色提亮成光暈色)。

### 其他
- 進度點、酒杯液面、波浪等動畫皆為 GSAP timeline。
- 分享:`shareBtn` 用 Web Share API,不支援時 fallback 改顯示「已複製連結」。
- 店家名稱顯示於 `#venueFoot`(目前為 `◯◯ BAR · 選酒測驗`)。

## 常見開發任務

- **改題目 / 選項** → 編輯 `STEPS`。新增選項時記得在 `w` 裡分配權重給對應的酒 key。
- **新增 / 調整酒款** → 編輯 `DRINKS`(新增 key),並到 `STEPS` 各選項的 `w` 加上該 key 的權重,否則它永遠拿不到分。`scores` / `MAXPOSS` 會自動涵蓋新 key,無需另外改。
- **客製成某間店** → 改 `DRINKS`(換成該店酒單)、`STEPS` 的 `w` 對應、以及 `#venueFoot` 店名;品牌字樣在 `#intro` 的 `.brand-mark` / `.brand-title`。
- **調整配色** → 改 `:root` 的 CSS 變數(`--amber`、`--cream`、`--night` 等);各酒的酒液顏色在 `DRINKS[*].color`。
- **改文案語氣** → 主推描述 `desc`、光譜簡介 `note`、結果頁 eyebrow `你的夜,屬於——` 等。

## 部署

GitHub Pages 已啟用,從 `main` 分支根目錄部署。**改完 `index.html` 後:**

```bash
git add index.html
git commit -m "..."
git push
```

push 後 GitHub Pages 會自動重新建置(約 1–2 分鐘),demo 網址 https://oossccaa.github.io/enjoy/ 隨之更新。

## 注意事項

- **企劃書不入庫**:`癮酒-合作企劃書.docx` 為內部商業文件,已由 `.gitignore`(`*.docx`)排除,請勿 commit 進公開 repo。
- **行動優先**:任何 UI 調整請以 ≤440px 寬度為基準測試。
- **外部 CDN 相依**:離線或 CDN 失效時字體與動畫會失效(測驗邏輯本身仍可運作)。若未來需離線可用,需把 GSAP 與字體在地化。
- **未來方向**(來自企劃,尚未實作):每店客製測驗與酒單對應、QR 桌卡產生、後台客群數據與分析、訂閱方案管理。若要往 SaaS 演進,目前的單檔前端會需要拆分成可配置的資料層(每店一份 `DRINKS`/`STEPS` 設定)。
