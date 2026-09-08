'use client'

import { useEffect, useRef, useState, type PointerEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useMotionValue, useSpring, useScroll, useTransform } from 'motion/react'
import {
  ArrowDown,
  ArrowUpRight,
  ArrowsClockwise,
  Broadcast,
  GearSix,
  Sparkle,
} from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { useMotionPreference } from '@/hooks/use-motion-preference'
import { cn } from '@/lib/utils'
import { imageSizes } from '@/lib/image-sizes'
import Clockwork from './Clockwork'
import LiveStatus from './LiveStatus'

const MotionImage = motion.create(Image)
const RECONNECT_DURATION_MS = 1_300

export default function CinematicHero() {
  const reduce = useMotionPreference()
  const sceneRef = useRef<HTMLElement>(null)
  const [connection, setConnection] = useState(0)
  const [isReconnecting, setIsReconnecting] = useState(false)
  const reconnectTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const connecting = isReconnecting && !reduce
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 55, damping: 22 })
  const y = useSpring(my, { stiffness: 55, damping: 22 })
  const { scrollYProgress } = useScroll({ target: sceneRef, offset: ['start start', 'end start'] })
  // Relative travel keeps the same depth when the receiver grows on large screens.
  const screenY = useTransform(scrollYProgress, [0, 1], ['0%', '10%'])
  const letteringY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%'])
  useEffect(
    () => () => {
      if (reconnectTimeout.current !== null) clearTimeout(reconnectTimeout.current)
    },
    [],
  )

  function move(event: PointerEvent<HTMLDivElement>) {
    if (reduce || event.pointerType !== 'mouse') return
    const bounds = event.currentTarget.getBoundingClientRect()
    mx.set((event.clientX - bounds.left - bounds.width / 2) * 0.022)
    my.set((event.clientY - bounds.top - bounds.height / 2) * 0.014)
  }

  function resetPointer() {
    mx.set(0)
    my.set(0)
  }

  function reconnect() {
    setConnection((value) => value + 1)
    setIsReconnecting(!reduce)
    if (reconnectTimeout.current !== null) clearTimeout(reconnectTimeout.current)
    if (!reduce) {
      // Also finish if the user disables CSS animation during the connection.
      reconnectTimeout.current = setTimeout(() => setIsReconnecting(false), RECONNECT_DURATION_MS)
    }
  }
  return (
    <section className="cinema-hero" ref={sceneRef} aria-labelledby="hero-title">
      <div className="cinema-atmosphere" aria-hidden="true">
        <div />
      </div>
      <div className="cinema-stage page-shell">
        <div className="receiver" onPointerMove={move} onPointerLeave={resetPointer}>
          <div className="receiver-top">
            <span className="receiver-brand">
              <GearSix weight="thin" /> YUARU
            </span>
            <span>STEAMPUNK · VIRTUAL STREAMER</span>
            <Sparkle weight="thin" />
          </div>
          <div className="receiver-body">
            <div className="receiver-speaker speaker-left" aria-hidden="true">
              <span />
              <i />
            </div>
            <div className={cn('receiver-glass', connecting && 'is-connecting')}>
              <div className="receiver-scene" key={connection}>
                <motion.span
                  className="receiver-wordmark"
                  style={reduce ? { y: 0 } : { y: letteringY }}
                  aria-hidden="true"
                >
                  YUARU
                </motion.span>
                <div className="receiver-clock">
                  <Clockwork />
                </div>
                <motion.div
                  className="receiver-portrait-parallax"
                  style={reduce ? { y: 0 } : { y: screenY }}
                >
                  <MotionImage
                    className="receiver-portrait"
                    style={reduce ? { x: 0, y: 0 } : { x, y }}
                    src="/images/character.webp"
                    sizes={imageSizes.hero}
                    alt="빈티지 수신기 화면 속, 황동 고글을 쓴 은발의 기계공학자 유아루"
                    width={1024}
                    height={1536}
                    preload
                  />
                </motion.div>
                <div className="receiver-subtitles">
                  <span>치직... 치지직...</span>
                  <span>잘 들리시나요?</span>
                </div>
                <span className="receiver-autograph" aria-hidden="true">
                  <i>YuAru</i>
                </span>
                <span className="receiver-corner corner-tl" aria-hidden="true" />
                <span className="receiver-corner corner-tr" aria-hidden="true" />
                <span className="receiver-corner corner-bl" aria-hidden="true" />
                <span className="receiver-corner corner-br" aria-hidden="true" />
                <span className="receiver-intro-label">유아루 소개 화면</span>
                <div className="receiver-scanlines" aria-hidden="true" />
                <div className="receiver-reflection" aria-hidden="true" />
                <div
                  className="receiver-tuning"
                  aria-hidden="true"
                  onAnimationEnd={() => setIsReconnecting(false)}
                />
              </div>
            </div>
            <div className="receiver-speaker speaker-right" aria-hidden="true">
              <span />
              <i />
            </div>
          </div>
          <div className="receiver-controls">
            <div className="receiver-frequency" aria-hidden="true">
              <div />
              <span>PAST</span>
              <i />
              <span>PRESENT</span>
            </div>
            <button
              className="receiver-tune-button"
              onClick={reconnect}
              disabled={connecting}
              aria-label="소개 화면 다시 연결"
            >
              <span className={cn('receiver-dial', connecting && 'dial-turning')}>
                <ArrowsClockwise weight="thin" />
              </span>
              <span>{connecting ? '신호 연결 중' : '다이얼 돌리기'}</span>
            </button>
            <span className="receiver-power">
              <i />
              {connecting ? 'CONNECTING' : 'CONNECTED'}
            </span>
          </div>
        </div>
        <div className="cinema-introduction">
          <h1 id="hero-title">
            어? 여기가 <span>대한민국?!</span>
          </h1>
          <p>
            치지직 버츄얼 스트리머 <strong>『유아루』</strong>입니다!
            <br className="cinema-mobile-break" /> 어쩌다보니 스팀펑크에서 현대로 조난당했다?!
          </p>
          <div className="hero-actions">
            <Button asChild size="lg">
              <Link href="/about">
                유아루 소개 <ArrowUpRight data-icon="inline-end" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/live">
                <Broadcast data-icon="inline-start" /> 방송국
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="hero-foot page-shell">
        <Link href="/live" className="hero-live">
          <LiveStatus />
          <span>
            방송 상태 <ArrowUpRight />
          </span>
        </Link>
        <a href="#discover" className="scroll-cue">
          SCROLL <ArrowDown />
        </a>
        <span className="hero-foot-note">유아루 ⚙️✨</span>
      </div>
    </section>
  )
}
