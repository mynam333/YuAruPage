import Link from 'next/link'
import { GearSix } from '@phosphor-icons/react/dist/ssr'
import { cn } from '@/lib/utils'

export function SiteLogo({ footer = false }: { footer?: boolean }) {
  return (
    <Link href="/" className={cn('brand', footer && 'brand-footer')} aria-label="유아루 홈">
      <span className="brand-symbol" aria-hidden="true">
        <GearSix weight="thin" />
        <span>Y</span>
      </span>
      <span className="brand-text">
        YuAru<span>유아루</span>
      </span>
    </Link>
  )
}
