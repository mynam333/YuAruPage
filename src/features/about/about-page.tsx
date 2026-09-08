import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  Broadcast,
  Compass,
  GearSix,
  Heart,
  Lightning,
  Sparkle,
} from '@phosphor-icons/react/dist/ssr'
import ArtworkImage from '@/components/ArtworkImage'
import Reveal from '@/components/Reveal'
import { cheeseArtwork, profile, stories } from '@/lib/content'
import { imageSizes } from '@/lib/image-sizes'
import AboutTags from './about-tags'

const storyIcons = { discovery: Compass, arrival: Lightning, broadcast: Broadcast }

export default function AboutPage() {
  return (
    <div className="about-page">
      <section className="about-introduction page-shell" aria-labelledby="about-title">
        <Reveal className="about-opening">
          <h1 id="about-title">
            유아루
            <br />
            <span>프로필</span>
          </h1>
          <p className="about-opening-copy">
            치지직 버츄얼 스트리머 『유아루』입니다!
            <br />
            어쩌다보니 스팀펑크에서 현대로 조난당했다?!
          </p>
          <div className="about-occupation">
            <GearSix size="1.375rem" aria-hidden="true" /> 스팀펑크 기계공학자 <span>⚙️✨</span>
          </div>
          <a className="about-story-anchor" href="#story">
            세계관 보기 <ArrowRight size="1.1875rem" aria-hidden="true" />
          </a>
        </Reveal>
        <Reveal className="about-portrait">
          <span className="about-portrait-word" aria-hidden="true">
            YUARU
          </span>
          <div className="about-orbit about-orbit-outer" aria-hidden="true">
            <span />
          </div>
          <div className="about-orbit about-orbit-inner" aria-hidden="true" />
          <Image
            src="/images/character.webp"
            sizes={imageSizes.aboutPortrait}
            alt="은발과 붉은 눈, 황동 고글과 갈색 공학자 의상을 입은 유아루"
            width={1024}
            height={1536}
            preload
          />
          <div className="about-portrait-signature" aria-hidden="true">
            <span>Yuaru</span>
            <Sparkle size="1.875rem" weight="light" />
          </div>
        </Reveal>
      </section>

      <Reveal as="section" className="about-dossier page-shell" aria-label="유아루 프로필">
        <dl className="about-facts">
          {profile.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <section className="about-story page-shell" id="story" aria-labelledby="story-title">
        <Reveal className="about-story-heading">
          <h2 id="story-title">세계관</h2>
          <div className="about-story-emblem" aria-hidden="true">
            <GearSix weight="thin" />
            <Sparkle weight="thin" />
          </div>
        </Reveal>
        <ol className="about-timeline">
          {stories.map(({ id, title, text, marker }, index) => {
            const Icon = storyIcons[id]
            return (
              <Reveal as="li" key={id} delay={index * 0.08}>
                <div className="about-timeline-marker">
                  <Icon size="1.625rem" weight="light" aria-hidden="true" />
                  <span>{marker}</span>
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
              </Reveal>
            )
          })}
        </ol>
      </section>

      <section className="about-tastes" aria-labelledby="tastes-title">
        <div className="page-shell about-tastes-layout">
          <Reveal className="about-tastes-intro">
            <h2 id="tastes-title">취향</h2>
            <ArtworkImage
              artwork={cheeseArtwork}
              sizes="(max-width: 767px) 7.8125rem, 10.9375rem"
            />
          </Reveal>
          <div className="about-preferences">
            <Reveal className="about-preference">
              <h3>
                <Heart size="1.5rem" weight="light" aria-hidden="true" /> 좋아하는 것
              </h3>
              <ul>
                <li>날것</li>
                <li>독서</li>
                <li>간식</li>
                <li className="about-favourite-fans">
                  팬들 <Sparkle size="1.4375rem" aria-hidden="true" />
                </li>
              </ul>
            </Reveal>
            <Reveal className="about-preference">
              <h3>
                <Lightning size="1.5rem" weight="light" aria-hidden="true" /> 싫어하는 것
              </h3>
              <ul>
                <li>커피</li>
                <li>더위</li>
                <li>운동</li>
                <li>벌레</li>
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="about-correspondence page-shell" aria-labelledby="tags-title">
        <Reveal className="about-correspondence-heading">
          <h2 id="tags-title">해시태그</h2>
        </Reveal>
        <AboutTags />
      </section>

      <section className="about-credits page-shell" aria-labelledby="credits-title">
        <div className="about-credits-title">
          <Sparkle size="1.625rem" weight="light" aria-hidden="true" />
          <h2 id="credits-title">제작</h2>
        </div>
        <dl>
          <div>
            <dt>마마</dt>
            <dd>유유아님</dd>
          </div>
          <div>
            <dt>파파</dt>
            <dd>파차님</dd>
          </div>
        </dl>
      </section>

      <Reveal className="about-ending page-shell">
        <Link href="/live">
          방송 보기 <ArrowRight weight="light" aria-hidden="true" />
        </Link>
      </Reveal>
    </div>
  )
}
