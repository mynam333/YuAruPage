'use client'

import { useState } from 'react'
import { copyText } from '@/lib/clipboard'

type CopyMessages = {
  success: string
  error: string
}

export function useClipboard() {
  const [copiedText, setCopiedText] = useState<string | null>(null)
  const [feedback, setFeedback] = useState('')

  async function copy(text: string, messages: CopyMessages) {
    try {
      await copyText(text)
      setCopiedText(text)
      setFeedback(messages.success)
    } catch {
      setCopiedText(null)
      setFeedback(messages.error)
    }
  }

  return { copy, copiedText, feedback }
}
