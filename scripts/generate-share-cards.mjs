/* 預先渲染 16 張分享圖卡 + 圖庫縮圖:
   用 puppeteer 驅動真瀏覽器走完測驗(每型一次),進分享頁後
   對 .sh-card 圖卡以 3x 截圖,輸出 src/images/cards/<調酒slug>.jpg,
   並用 sips 產 400px 寬縮圖到 cards/thumbs/(圖庫格子用,省流量)。
   圖卡文案 / 樣式 / QR 改動後重跑一次即可:

     npm run build && node scripts/generate-share-cards.mjs

   需要本機 Chrome(可用 PUPPETEER_EXECUTABLE_PATH 覆蓋路徑)。 */
import puppeteer from 'puppeteer-core'
import { spawn, execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const OUT_DIR = path.join(ROOT, 'src/images/cards')
const PORT = 4189
const CHROME =
  process.env.PUPPETEER_EXECUTABLE_PATH ||
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

// 型號 → 調酒 slug(僅此對應檔名,圖卡本身不含型號)
const SLUGS = {
  INFP: 'clover-club',
  ENFP: 'mai-tai',
  INFJ: 'penicillin',
  ENFJ: 'french-75',
  INTJ: 'martini',
  INTP: 'negroni',
  ENTP: 'long-island-iced-tea',
  ENTJ: 'manhattan',
  ISFJ: 'whiskey-sour',
  ESFJ: 'margarita',
  ISFP: 'bees-knees',
  ESFP: 'mojito',
  ISTJ: 'old-fashioned',
  ESTJ: 'godfather',
  ISTP: 'whiskey-highball',
  ESTP: 'paloma',
}

// 從題庫原始碼依序取出每題 a/b 的加分字母(避免重複維護對應表)
function readQuestionLetters() {
  const src = fs.readFileSync(path.join(ROOT, 'src/data/mbtiQuestions.ts'), 'utf8')
  const letters = [...src.matchAll(/letter:\s*'([EISNTFJP])'/g)].map((m) => m[1])
  if (letters.length !== 24) throw new Error(`預期 24 個 letter,實得 ${letters.length}`)
  return Array.from({ length: 12 }, (_, i) => ({ a: letters[i * 2], b: letters[i * 2 + 1] }))
}

const questions = readQuestionLetters()
const THUMB_DIR = path.join(OUT_DIR, 'thumbs')
fs.mkdirSync(THUMB_DIR, { recursive: true })

// 起一個 vite preview 伺服器(服務 dist/)
const server = spawn('npx', ['vite', 'preview', '--port', String(PORT)], {
  cwd: ROOT,
  stdio: 'ignore',
})
await new Promise((r) => setTimeout(r, 1500))

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new' })
try {
  const page = await browser.newPage()
  await page.setViewport({ width: 440, height: 920, deviceScaleFactor: 3 })

  for (const [code, slug] of Object.entries(SLUGS)) {
    await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle0' })
    // 開始測驗
    await page.evaluate(() => {
      const btn = [...document.querySelectorAll('button')].find((b) =>
        b.textContent.includes('開'),
      )
      btn?.click()
    })
    // 依目標型號作答
    for (let i = 0; i < 12; i++) {
      await page.waitForSelector('.choice', { visible: true, timeout: 5000 })
      const pick = code.includes(questions[i].a) ? 0 : 1
      const choices = await page.$$('.choice')
      await choices[pick].click()
      await new Promise((r) => setTimeout(r, 700))
    }
    // 結果頁 → 按「分享結果」進分享頁
    await page.waitForSelector('.res-img.loaded', { timeout: 8000 })
    await page.evaluate(() => {
      const btn = [...document.querySelectorAll('button')].find((b) =>
        b.textContent.includes('分享結果'),
      )
      btn?.click()
    })
    await page.waitForSelector('.sh-card img', { visible: true, timeout: 8000 })
    await page.evaluate(async () => {
      await document.fonts.ready
      await Promise.all(
        [...document.querySelectorAll('.sh-card img')].map((i) => i.decode().catch(() => {})),
      )
    })
    await new Promise((r) => setTimeout(r, 900)) // 等卡片進場動畫結束
    const el = await page.$('.sh-card')
    const cardPath = path.join(OUT_DIR, `${slug}.jpg`)
    await el.screenshot({ path: cardPath, type: 'jpeg', quality: 88 })
    // 圖庫縮圖:400px 寬(格子顯示約 180px,留 2x retina)
    execFileSync('sips', [
      '-s', 'format', 'jpeg', '-s', 'formatOptions', '75',
      '--resampleWidth', '400',
      cardPath, '--out', path.join(THUMB_DIR, `${slug}.jpg`),
    ], { stdio: 'ignore' })
    console.log(`✓ ${slug}.jpg (+thumb)`)
  }
} finally {
  await browser.close()
  server.kill()
}
console.log(`完成:${OUT_DIR}`)
