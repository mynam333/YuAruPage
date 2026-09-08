'use client'

import { Check, Copy } from '@phosphor-icons/react'
import Reveal from '@/components/Reveal'
import { tags } from '@/lib/content'
import { useClipboard } from '@/hooks/use-clipboard'

export default function AboutTags() {
  const { copy, copiedText, feedback } = useClipboard()

  return (
    <div className="about-tags">
      {tags.map(({ label, tag }) => (
        <Reveal className="about-tag-row" key={tag}>
          <div>
            <span>{label}</span>
            <p>{tag}</p>
          </div>
          <button
            type="button"
            onClick={() =>
              copy(tag, {
                success: `${tag} 태그를 복사했습니다.`,
                error: '복사하지 못했습니다. 태그를 선택해서 복사해 주세요.',
              })
            }
            aria-label={`${tag} 태그 복사`}
            className={copiedText === tag ? 'is-copied' : ''}
          >
            {copiedText === tag ? (
              <Check size="1.3125rem" aria-hidden="true" />
            ) : (
              <Copy size="1.3125rem" aria-hidden="true" />
            )}
            <span>{copiedText === tag ? '복사 완료' : '복사'}</span>
          </button>
        </Reveal>
      ))}
      <p className="secondary-feedback" role="status" aria-live="polite">
        {feedback}
      </p>
    </div>
  )
}
