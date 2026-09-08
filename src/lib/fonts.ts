import localFont from 'next/font/local'

export const displayFont = localFont({
  src: [
    {
      path: '../../node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-400-normal.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-600-normal.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-500-italic.woff2',
      weight: '500',
      style: 'italic',
    },
  ],
  variable: '--font-yuaru-display',
  display: 'swap',
  fallback: ['Georgia', 'serif'],
})
