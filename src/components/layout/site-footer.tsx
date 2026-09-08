import { Broadcast, XLogo, YoutubeLogo } from '@phosphor-icons/react/dist/ssr'
import { CHANNEL_URL, X_URL, YOUTUBE_URL } from '@/lib/content'
import { FooterControls } from './footer-controls'
import { SiteLogo } from './site-logo'

export function SiteFooter() {
  return (
    <footer className="site-footer page-shell">
      <div className="footer-top">
        <SiteLogo footer />
        <p>
          치지직 버츄얼 스트리머 유아루
          <br />
          <span>Steampunk mechanical engineer</span>
        </p>
        <div className="footer-socials">
          <a
            href={CHANNEL_URL}
            aria-label="유아루 치지직 채널"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Broadcast />
          </a>
          <a href={X_URL} aria-label="유아루 X" target="_blank" rel="noopener noreferrer">
            <XLogo />
          </a>
          <a
            href={YOUTUBE_URL}
            aria-label="유아루 유튜브"
            target="_blank"
            rel="noopener noreferrer"
          >
            <YoutubeLogo />
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} YuAru. All artwork belongs to its respective owners.
        </span>
        <FooterControls />
      </div>
    </footer>
  )
}
