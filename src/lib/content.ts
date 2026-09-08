import { CHZZK_CHANNEL_ID, CHZZK_CHANNEL_URL, CHZZK_LIVE_URL } from './live-status'

export const CHANNEL_ID = CHZZK_CHANNEL_ID
export const CHANNEL_URL = CHZZK_CHANNEL_URL
export const LIVE_URL = CHZZK_LIVE_URL
export const YOUTUBE_URL = 'https://www.youtube.com/@%EC%9C%A0%EC%95%84%EB%A3%A8'
export const X_URL = 'https://x.com/Chzzk_YuAru'

export const connections = [
  { title: '치지직', subtitle: '유아루의 방송 채널', href: CHANNEL_URL, id: 'chzzk' },
  { title: 'YouTube', subtitle: '유아루 유튜브 채널', href: YOUTUBE_URL, id: 'youtube' },
  { title: 'X (Twitter)', subtitle: '@Chzzk_YuAru', href: X_URL, id: 'x' },
  {
    title: '아트머그',
    subtitle: '아트머그 페이지',
    href: 'https://artmug.kr/index.php?channel=view&uid=60953',
    id: 'artmug',
  },
  {
    title: '치카포',
    subtitle: '치카포 서비스 바로가기',
    href: 'https://chikapo.yuaru.com/',
    id: 'chikapo',
  },
  {
    title: '아루봇',
    subtitle: '아루봇 서비스 바로가기',
    href: 'http://arubot.yuaru.com/',
    id: 'arubot',
  },
] as const

export const profile = [
  ['직업', '스팀펑크 기계공학자'],
  ['성별', '남성'],
  ['생년', '황동력 199년생'],
  ['생일', '6월 14일'],
  ['키 / MBTI', '170cm / INFP'],
  ['오시마크', '⚙️✨'],
] as const

export const stories = [
  {
    id: 'discovery',
    title: '유적에서 유물을 발견했어요!',
    text: '저는 스팀펑크 세계의 기계공학자예요. 유적을 탐사하다가 유물 하나를 찾았는데, 이게 저를 여기까지 데려올 줄은 몰랐죠.',
    marker: '01',
  },
  {
    id: 'arrival',
    title: '어? 여기가 대한민국?!',
    text: '유물의 힘에 휘말려 현대 대한민국까지 와 버렸어요. 그런데 유물이 작동을 멈춘 거예요. 으악, 이러면 원래 세계로 못 돌아가잖아요!',
    marker: '02',
  },
  {
    id: 'broadcast',
    title: '그래서 방송을 시작했죠!',
    text: '돌아가려면 유물에 사람들의 관심 에너지를 채워야 한대요. 그래서 버츄얼 스트리머가 됐어요. 여러분, 저랑 같이 놀아요!',
    marker: '03',
  },
] as const

export const tags = [
  { label: '유아루에게 하고 싶은 말', tag: '#아루야_이거봐봐' },
  { label: '팬아트', tag: '#아루야_그려봤어' },
  { label: '방송 후기', tag: '#아루야_즐거웠어' },
] as const

export type Artwork = {
  id: string
  src: string
  stillSrc?: string
  title: string
  credit: string
  alt: string
  width: number
  height: number
  className: string
}

export const cheeseArtwork: Artwork = {
  id: 'cheese',
  src: '/images/emote-cheese.webp',
  stillSrc: '/images/emote-cheese-still.webp',
  title: '치즈',
  credit: '라떼님',
  alt: '유아루의 머리 위로 치즈가 떨어지는 그림',
  width: 640,
  height: 640,
  className: 'art-emote',
}

export const bounceArtwork: Artwork = {
  id: 'bounce',
  src: '/images/emote-bounce.webp',
  stillSrc: '/images/emote-bounce-still.webp',
  title: '유아루 GIF',
  credit: '에칼님',
  alt: '고글을 쓴 유아루의 반신 그림',
  width: 640,
  height: 640,
  className: 'art-emote',
}

// Names and dates below come from the supplied filenames.
export const artworks: readonly Artwork[] = [
  {
    id: 'aeng',
    src: '/images/art-aeng.webp',
    title: '앵님 · 2026.01.09',
    credit: '앵님',
    alt: '하트 옆에서 눈을 감고 웃는 유아루',
    width: 857,
    height: 615,
    className: 'art-paper art-wide',
  },
  {
    id: 'kuyomi',
    src: '/images/art-kuyomi.webp',
    title: '쿠요미님 · 2026.08.13',
    credit: '쿠요미님',
    alt: '고글을 쓴 유아루의 전신 그림',
    width: 340,
    height: 471,
    className: 'art-paper art-sketch',
  },
  {
    id: 'shogri',
    src: '/images/art-shogri.webp',
    title: '쇼그리님 · 2025.12.01',
    credit: '쇼그리님',
    alt: '고글과 긴 머리를 그린 유아루의 흑백 일러스트',
    width: 1000,
    height: 1600,
    className: 'art-paper art-portrait',
  },
  cheeseArtwork,
  {
    id: 'money',
    src: '/images/emote-money.webp',
    stillSrc: '/images/emote-money-still.webp',
    title: '머니건',
    credit: '라떼님',
    alt: '선글라스를 쓴 유아루가 머니건을 쏘는 그림',
    width: 640,
    height: 640,
    className: 'art-emote',
  },
  {
    id: 'snoi',
    src: '/images/art-snoi.webp',
    title: '스노이님 · 2026.01.07',
    credit: '스노이님',
    alt: '고글을 쓴 유아루의 작은 색연필풍 그림',
    width: 569,
    height: 569,
    className: 'art-paper art-square',
  },
  {
    id: 'mascot',
    src: '/images/mascot.webp',
    title: '톱니니',
    credit: '수찬님',
    alt: '고글에 손을 얹은 톱니니',
    width: 2000,
    height: 1917,
    className: 'art-mascot',
  },
  bounceArtwork,
]
