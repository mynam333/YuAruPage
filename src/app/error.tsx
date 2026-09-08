'use client'

import Link from 'next/link'
import { ArrowClockwise, GearSix } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="not-found page-shell">
      <GearSix weight="thin" aria-hidden="true" />
      <h1>페이지를 불러오지 못했어요.</h1>
      <p>잠시 후 다시 시도해 주세요.</p>
      <Button onClick={reset}>
        다시 시도 <ArrowClockwise />
      </Button>
      <Button asChild variant="link">
        <Link href="/">홈으로 돌아가기</Link>
      </Button>
    </div>
  )
}
