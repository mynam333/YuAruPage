import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import '@fontsource-variable/noto-sans-kr'
import '@/styles/globals.css'
import '@/styles/site.css'
import '@/styles/cinema.css'
import '@/styles/secondary.css'
import '@/styles/artwork.css'
import '@/styles/layout.css'
import { SiteProviders } from '@/components/layout/site-providers'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { appearanceScript, THEME_COLORS } from '@/lib/appearance'
import { displayFont } from '@/lib/fonts'

export const metadata: Metadata = {
  title: { default: '홈 | 유아루 YuAru', template: '%s | 유아루 YuAru' },
  description:
    '치지직 버츄얼 스트리머 『유아루』입니다! 어쩌다보니 스팀펑크에서 현대로 조난당했다?!',
  openGraph: {
    title: '유아루 YuAru',
    description: '치지직 버츄얼 스트리머 유아루의 소개, 방송, 일러스트와 활동 링크를 만나보세요.',
    locale: 'ko_KR',
    type: 'website',
  },
  icons: { icon: '/favicon.svg' },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: THEME_COLORS.dark,
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="ko"
      data-theme="dark"
      data-scroll-behavior="smooth"
      className={`${displayFont.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        <script id="appearance-init" dangerouslySetInnerHTML={{ __html: appearanceScript }} />
      </head>
      <body>
        <SiteProviders>
          <a href="#main-content" className="skip-link">
            본문으로 건너뛰기
          </a>
          <SiteHeader />
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
          <SiteFooter />
        </SiteProviders>
      </body>
    </html>
  )
}
