import type { TypeCode } from '../types'
/* 16 張預先渲染好的分享圖卡(1080×1620 JPEG)。
   由 scripts/generate-share-cards.mjs 對結果頁隱藏的 .share-card 節點
   以真瀏覽器 3x 截圖產生 —— 圖卡文案 / 樣式改動後要重跑該腳本。
   檔名用調酒 slug,型號對應僅存在於這份內部模組。 */
import cloverClub from '../images/cards/clover-club.jpg'
import maiTai from '../images/cards/mai-tai.jpg'
import penicillin from '../images/cards/penicillin.jpg'
import french75 from '../images/cards/french-75.jpg'
import martini from '../images/cards/martini.jpg'
import negroni from '../images/cards/negroni.jpg'
import longIslandIcedTea from '../images/cards/long-island-iced-tea.jpg'
import manhattan from '../images/cards/manhattan.jpg'
import whiskeySour from '../images/cards/whiskey-sour.jpg'
import margarita from '../images/cards/margarita.jpg'
import beesKnees from '../images/cards/bees-knees.jpg'
import mojito from '../images/cards/mojito.jpg'
import oldFashioned from '../images/cards/old-fashioned.jpg'
import godfather from '../images/cards/godfather.jpg'
import whiskeyHighball from '../images/cards/whiskey-highball.jpg'
import paloma from '../images/cards/paloma.jpg'

export const SHARE_CARDS: Record<TypeCode, string> = {
  INFP: cloverClub,
  ENFP: maiTai,
  INFJ: penicillin,
  ENFJ: french75,
  INTJ: martini,
  INTP: negroni,
  ENTP: longIslandIcedTea,
  ENTJ: manhattan,
  ISFJ: whiskeySour,
  ESFJ: margarita,
  ISFP: beesKnees,
  ESFP: mojito,
  ISTJ: oldFashioned,
  ESTJ: godfather,
  ISTP: whiskeyHighball,
  ESTP: paloma,
}
