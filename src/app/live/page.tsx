import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '방송국',
  description: '유아루의 치지직 방송 상태를 확인하고, 라이브 방송에 참여해 보세요.',
}

export { default } from '@/features/live/live-page'
