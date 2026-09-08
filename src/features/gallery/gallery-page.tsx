import Reveal from '@/components/Reveal'
import { artworks } from '@/lib/content'
import GalleryCollection from './gallery-collection'

export default function GalleryPage() {
  return (
    <div className="page-shell gallery-page">
      <Reveal>
        <div className="page-title-row">
          <h1>아카이브</h1>
          <span className="page-title-english" aria-hidden="true">
            <i>Archive</i>
          </span>
        </div>
      </Reveal>
      <div className="gallery-controls">
        <span>{artworks.length}장</span>
        <span>이미지를 누르면 크게 볼 수 있습니다.</span>
      </div>
      <GalleryCollection />
      <p className="gallery-note">각 작품의 권리는 해당 권리자에게 있습니다.</p>
    </div>
  )
}
