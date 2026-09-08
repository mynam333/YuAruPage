import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight, GearSix } from '@phosphor-icons/react/dist/ssr'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = { title: '페이지를 찾을 수 없어요' }

export default function NotFound() {
  return (
    <div className="not-found page-shell">
      <GearSix weight="thin" aria-hidden="true" />
      <span>404</span>
      <h1>페이지를 찾을 수 없습니다.</h1>
      <p>주소를 확인하거나 홈으로 이동해 주세요.</p>
      <Button asChild>
        <Link href="/">
          홈으로 돌아가기 <ArrowUpRight />
        </Link>
      </Button>
    </div>
  )
}
