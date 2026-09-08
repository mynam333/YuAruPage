export async function copyText(text: string): Promise<void> {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text)
    return
  }

  const previousFocus = document.activeElement
  const input = document.createElement('textarea')
  input.value = text
  input.setAttribute('readonly', '')
  input.style.cssText = 'position:fixed;left:-9999px;top:0;opacity:0;'
  document.body.appendChild(input)

  try {
    input.select()
    if (!document.execCommand('copy')) {
      throw new Error('Clipboard unavailable')
    }
  } finally {
    input.remove()
    if (previousFocus instanceof HTMLElement) previousFocus.focus()
  }
}
