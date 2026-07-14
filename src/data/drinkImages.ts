import type { TypeCode } from '../types'
/* 16 杯的酒照(src/images/ 原圖經 sips 壓成 opt/ 下的 JPEG,檔名用調酒 slug,
   避免打包後的資源網址露出型號)。型號 → 圖片的對應僅存在於這份內部模組。 */
import cloverClub from '../images/opt/clover-club.jpg'
import maiTai from '../images/opt/mai-tai.jpg'
import penicillin from '../images/opt/penicillin.jpg'
import french75 from '../images/opt/french-75.jpg'
import martini from '../images/opt/martini.jpg'
import negroni from '../images/opt/negroni.jpg'
import longIslandIcedTea from '../images/opt/long-island-iced-tea.jpg'
import manhattan from '../images/opt/manhattan.jpg'
import whiskeySour from '../images/opt/whiskey-sour.jpg'
import margarita from '../images/opt/margarita.jpg'
import beesKnees from '../images/opt/bees-knees.jpg'
import mojito from '../images/opt/mojito.jpg'
import oldFashioned from '../images/opt/old-fashioned.jpg'
import godfather from '../images/opt/godfather.jpg'
import whiskeyHighball from '../images/opt/whiskey-highball.jpg'
import paloma from '../images/opt/paloma.jpg'

export const DRINK_IMAGES: Record<TypeCode, string> = {
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
