'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowUpRight, List, Moon, Sun } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { usePreferences } from '@/hooks/use-preferences'
import { CHANNEL_URL } from '@/lib/content'
import { navigation } from '@/lib/navigation'
import { SiteLogo } from './site-logo'
import { MotionToggle } from './motion-toggle'

export function SiteHeader() {
  const pathname = usePathname()
  const { theme, toggleTheme } = usePreferences()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="header-inner page-shell">
        <SiteLogo />
        <nav className="desktop-nav" aria-label="주요 메뉴">
          {navigation.map(({ href, label }) => (
            <Link key={href} href={href} aria-current={pathname === href ? 'page' : undefined}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <MotionToggle compact />
          <Button
            variant="ghost"
            size="icon"
            aria-label={theme === 'dark' ? '라이트 모드로 변경' : '다크 모드로 변경'}
            onClick={toggleTheme}
          >
            {theme === 'dark' ? <Sun weight="thin" /> : <Moon weight="thin" />}
          </Button>
          <Button asChild variant="outline" className="header-channel">
            <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer">
              치지직 채널 <ArrowUpRight data-icon="inline-end" />
            </a>
          </Button>
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="menu-trigger" aria-label="메뉴 열기">
                <List />
              </Button>
            </SheetTrigger>
            <SheetContent className="mobile-sheet">
              <SheetHeader>
                <SheetTitle>메뉴</SheetTitle>
                <SheetDescription className="sr-only">유아루 사이트 메뉴</SheetDescription>
              </SheetHeader>
              <nav aria-label="모바일 메뉴">
                {navigation.map(({ href, label, english }) => (
                  <SheetClose asChild key={href}>
                    <Link href={href} aria-current={pathname === href ? 'page' : undefined}>
                      <span>{label}</span>
                      <i>{english}</i>
                      <ArrowUpRight />
                    </Link>
                  </SheetClose>
                ))}
              </nav>
              <span className="mobile-menu-signature">YuAru</span>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
