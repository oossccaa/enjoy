import type { TypeCode } from '../types'
/* 16 張預先渲染好的分享圖卡(約 1188×1866 JPEG)+ 圖庫用 400px 縮圖。
   由 scripts/generate-share-cards.mjs(npm run cards)產生 ——
   圖卡文案 / 樣式 / QR 改動後要重跑。
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

import cloverClubT from '../images/cards/thumbs/clover-club.jpg'
import maiTaiT from '../images/cards/thumbs/mai-tai.jpg'
import penicillinT from '../images/cards/thumbs/penicillin.jpg'
import french75T from '../images/cards/thumbs/french-75.jpg'
import martiniT from '../images/cards/thumbs/martini.jpg'
import negroniT from '../images/cards/thumbs/negroni.jpg'
import longIslandIcedTeaT from '../images/cards/thumbs/long-island-iced-tea.jpg'
import manhattanT from '../images/cards/thumbs/manhattan.jpg'
import whiskeySourT from '../images/cards/thumbs/whiskey-sour.jpg'
import margaritaT from '../images/cards/thumbs/margarita.jpg'
import beesKneesT from '../images/cards/thumbs/bees-knees.jpg'
import mojitoT from '../images/cards/thumbs/mojito.jpg'
import oldFashionedT from '../images/cards/thumbs/old-fashioned.jpg'
import godfatherT from '../images/cards/thumbs/godfather.jpg'
import whiskeyHighballT from '../images/cards/thumbs/whiskey-highball.jpg'
import palomaT from '../images/cards/thumbs/paloma.jpg'

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

// 圖庫格子用的 400px 縮圖(點開 modal 才載上面的完整圖卡)
export const SHARE_CARD_THUMBS: Record<TypeCode, string> = {
  INFP: cloverClubT,
  ENFP: maiTaiT,
  INFJ: penicillinT,
  ENFJ: french75T,
  INTJ: martiniT,
  INTP: negroniT,
  ENTP: longIslandIcedTeaT,
  ENTJ: manhattanT,
  ISFJ: whiskeySourT,
  ESFJ: margaritaT,
  ISFP: beesKneesT,
  ESFP: mojitoT,
  ISTJ: oldFashionedT,
  ESTJ: godfatherT,
  ISTP: whiskeyHighballT,
  ESTP: palomaT,
}
