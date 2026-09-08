'use client'

import { Check, LinkSimple, ShareNetwork } from '@phosphor-icons/react'
import { useClipboard } from '@/hooks/use-clipboard'

export default function BioShare() {
  const { copy, copiedText, feedback } = useClipboard()

  function sharePage() {
    const url = new URL('/links', window.location.origin).href
    void copy(url, {
      success: '바이오 페이지 주소를 복사했습니다.',
      error: `주소를 복사하지 못했습니다. 직접 복사해 주세요: ${url}`,
    })
  }

  return (
    <div className="bio-share">
      <button type="button" onClick={sharePage}>
        {copiedText ? (
          <Check size="1.25rem" aria-hidden="true" />
        ) : (
          <ShareNetwork size="1.25rem" aria-hidden="true" />
        )}
        {copiedText ? '복사 완료' : '바이오 링크 복사'}
        <LinkSimple size="1.0625rem" aria-hidden="true" />
      </button>
      <p className="secondary-feedback" role="status" aria-live="polite">
        {feedback}
      </p>
    </div>
  )
}
