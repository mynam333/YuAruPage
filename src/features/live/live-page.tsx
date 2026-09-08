import { ArrowUpRight, Broadcast, YoutubeLogo } from '@phosphor-icons/react/dist/ssr'
import LiveScreen from '@/components/LiveScreen'
import Reveal from '@/components/Reveal'
import { CHANNEL_URL, YOUTUBE_URL } from '@/lib/content'
import LiveCheckTime from './live-check-time'

export default function LivePage() {
  return (
    <div className="page-shell live-page">
      <Reveal>
        <div className="page-title-row">
          <h1>방송</h1>
        </div>
      </Reveal>
      <Reveal className="live-page-screen">
        <LiveScreen />
      </Reveal>
      <div className="live-information">
        <p>
          <span className="status-dot" /> 방송 상태는 30초마다 갱신됩니다.
        </p>
        <LiveCheckTime />
      </div>
      <div className="live-destinations">
        <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer">
          <Broadcast weight="duotone" />
          <div>
            <h2>치지직 채널</h2>
          </div>
          <ArrowUpRight />
        </a>
        <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer">
          <YoutubeLogo weight="duotone" />
          <div>
            <h2>유아루 유튜브</h2>
          </div>
          <ArrowUpRight />
        </a>
      </div>
    </div>
  )
}
