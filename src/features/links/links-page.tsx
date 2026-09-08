import {
  ArrowUpRight,
  Broadcast,
  Coffee,
  GearSix,
  PaintBrush,
  Robot,
  Sparkle,
  XLogo,
  YoutubeLogo,
} from '@phosphor-icons/react/dist/ssr'
import Reveal from '@/components/Reveal'
import ArtworkImage from '@/components/ArtworkImage'
import { bounceArtwork, connections } from '@/lib/content'
import { imageSizes } from '@/lib/image-sizes'
import { BioLiveLink, BioLiveStatus } from './bio-live'
import BioShare from './bio-share'

const connectionIcons = {
  chzzk: Broadcast,
  youtube: YoutubeLogo,
  x: XLogo,
  artmug: PaintBrush,
  chikapo: Coffee,
  arubot: Robot,
}

export default function LinksPage() {
  return (
    <section className="bio-page" aria-labelledby="bio-title">
      <div className="bio-world" aria-hidden="true">
        <span>YUARU</span>
        <div className="bio-orbit bio-orbit-one" />
        <div className="bio-orbit bio-orbit-two" />
        <div className="bio-orbit bio-orbit-three" />
        <Sparkle className="bio-world-star" weight="thin" />
      </div>
      <div className="bio-shell">
        <Reveal as="header" className="bio-profile">
          <div className="bio-avatar-wrap">
            <div className="bio-avatar">
              <ArtworkImage
                className="bio-avatar-art"
                artwork={bounceArtwork}
                sizes={imageSizes.bioAvatar}
                preload
              />
            </div>
            <span className="bio-avatar-seal" aria-hidden="true">
              <GearSix size="1.4375rem" weight="light" />
            </span>
          </div>
          <h1 id="bio-title">
            유아루 <span>⚙️✨</span>
          </h1>
          <p className="bio-english-name">Yuaru</p>
          <p className="bio-introduction">
            치지직 버츄얼 스트리머 『유아루』입니다!
            <br />
            어쩌다보니 스팀펑크에서 현대로 조난당했다?!
          </p>
          <BioLiveStatus />
        </Reveal>

        <div className="bio-connections" aria-label="유아루 활동 링크">
          <BioLiveLink />
          {connections.map(({ title, subtitle, href, id }, index) => {
            const Icon = connectionIcons[id]
            return (
              <Reveal
                as="a"
                className={`bio-link bio-link-${id}`}
                key={id}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                delay={0.16 + index * 0.055}
              >
                <span className="bio-link-icon">
                  <Icon size="1.625rem" weight="light" aria-hidden="true" />
                </span>
                <span className="bio-link-copy">
                  <strong>{title}</strong>
                  <span>{subtitle}</span>
                </span>
                <ArrowUpRight
                  className="bio-link-arrow"
                  size="1.5rem"
                  weight="light"
                  aria-hidden="true"
                />
              </Reveal>
            )
          })}
        </div>

        <BioShare />
      </div>
    </section>
  )
}
