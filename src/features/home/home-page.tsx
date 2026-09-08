import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, GearSix, Sparkle } from '@phosphor-icons/react/dist/ssr'
import CinematicHero from '@/components/CinematicHero'
import Reveal from '@/components/Reveal'
import LiveScreen from '@/components/LiveScreen'
import { CHANNEL_URL } from '@/lib/content'
import { imageSizes } from '@/lib/image-sizes'

export default function HomePage() {
  return (
    <>
      <CinematicHero />
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {Array.from({ length: 4 }, (_, index) => (
            <span key={index}>
              STEAMPUNK <Sparkle weight="fill" /> VIRTUAL STREAMER
              <GearSix weight="thin" /> YUARU <Sparkle weight="fill" />
              MECHANICAL ENGINEER <GearSix weight="thin" />
            </span>
          ))}
        </div>
      </div>

      <section className="home-broadcast page-shell" id="discover">
        <Reveal className="broadcast-copy">
          <h2 className="section-heading">같이 놀 사람!</h2>
          <p>
            치지직에서 방송중이에요!
            <br />
            처음 왔어도 편하게 말 걸어줘요!
          </p>
          <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="text-link">
            치지직 채널 <ArrowUpRight />
          </a>
        </Reveal>
        <Reveal className="broadcast-screen" delay={0.1}>
          <LiveScreen compact />
        </Reveal>
      </section>

      <section className="home-story">
        <div className="page-shell story-inner">
          <Reveal>
            <h2 className="section-heading">이 유물이 문제였어요!</h2>
            <p className="story-description">
              유적에서 찾은 유물 때문에 대한민국까지 와 버렸어요.
              <br />
              돌아가려면 관심 에너지가 필요하다길래, 방송을 시작했죠!
            </p>
            <Link href="/about#story" className="text-link">
              세계관 보기 <ArrowRight />
            </Link>
          </Reveal>
          <div className="story-decoration" aria-hidden="true">
            <GearSix weight="thin" />
            <div className="story-center">
              <Sparkle weight="fill" />
            </div>
          </div>
        </div>
      </section>

      <section className="home-gallery page-shell">
        <Reveal>
          <div className="gallery-section-heading">
            <h2 className="section-heading">아카이브</h2>
            <Link href="/gallery" className="text-link">
              전체 보기 <ArrowUpRight />
            </Link>
          </div>
        </Reveal>
        <div className="gallery-preview">
          <Reveal className="gallery-preview-main">
            <Link
              href="/gallery"
              className="preview-image preview-paper"
              aria-label="앵님 일러스트, 아카이브 보기"
            >
              <Image
                src="/images/art-aeng.webp"
                alt="하트 옆에서 눈을 감고 웃는 유아루"
                width={857}
                height={615}
                sizes={imageSizes.previewMain}
              />
              <span className="preview-open" aria-hidden="true">
                <ArrowUpRight />
              </span>
            </Link>
          </Reveal>
          <Reveal className="gallery-preview-side" delay={0.12}>
            <Link
              href="/gallery"
              className="preview-image preview-paper preview-sketch"
              aria-label="쿠요미님 일러스트, 아카이브 보기"
            >
              <Image
                src="/images/art-kuyomi.webp"
                alt="고글을 쓴 유아루의 전신 그림"
                width={340}
                height={471}
                sizes={imageSizes.previewSide}
              />
              <span className="preview-open" aria-hidden="true">
                <ArrowUpRight />
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="home-connect page-shell">
        <Link href="/links" className="connect-link">
          <span>모든 링크</span>
          <ArrowUpRight weight="thin" />
        </Link>
        <div className="connect-bottom">
          <span>치지직 · 유튜브 · X · 아트머그 · 치카포 · 아루봇</span>
          <span className="connect-signature" aria-hidden="true">
            YuAru
          </span>
        </div>
      </section>
    </>
  )
}
