'use client'

import { useRef, useState } from 'react'
import { ArrowUpRight, ArrowLeft, ArrowRight, X } from '@phosphor-icons/react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { artworks } from '@/lib/content'
import { cn } from '@/lib/utils'
import { imageSizes } from '@/lib/image-sizes'
import ArtworkImage from '@/components/ArtworkImage'
import Reveal from '@/components/Reveal'

export default function GalleryCollection() {
  const [selected, setSelected] = useState<number | null>(null)
  const opener = useRef<HTMLButtonElement | null>(null)
  const artwork = selected === null ? null : artworks[selected]

  function changeArtwork(direction: -1 | 1) {
    setSelected((index) =>
      index === null ? null : (index + direction + artworks.length) % artworks.length,
    )
  }

  return (
    <>
      <div className="artwork-grid">
        {artworks.map((art, index) => (
          <Reveal key={art.id} delay={(index % 2) * 0.08}>
            <button
              type="button"
              className={cn('artwork-item', art.className)}
              onClick={(event) => {
                opener.current = event.currentTarget
                setSelected(index)
              }}
              aria-label={`${art.title} 크게 보기`}
              aria-describedby={`artwork-credit-${art.id}`}
            >
              <div className="artwork-image">
                <ArtworkImage artwork={art} loading={index < 2 ? 'eager' : 'lazy'} />
              </div>
              <div className="artwork-actions">
                <span className="artwork-number" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="artwork-credit" id={`artwork-credit-${art.id}`}>
                  그림: {art.credit}
                </span>
                <span className="artwork-open" aria-hidden="true">
                  <ArrowUpRight />
                </span>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      <Dialog
        open={artwork !== null}
        onOpenChange={(open) => {
          if (!open) setSelected(null)
        }}
      >
        <DialogContent
          className="artwork-dialog"
          showCloseButton={false}
          onCloseAutoFocus={(event) => {
            event.preventDefault()
            opener.current?.focus()
          }}
        >
          {artwork && (
            <>
              <div className="artwork-dialog-header">
                <DialogTitle>{artwork.title}</DialogTitle>
                <DialogClose asChild>
                  <Button variant="ghost" size="icon" aria-label="닫기">
                    <X />
                  </Button>
                </DialogClose>
              </div>
              <DialogDescription className="sr-only">
                {artwork.alt}. 그림: {artwork.credit}.
              </DialogDescription>
              <div className={cn('dialog-image', artwork.className)}>
                <ArtworkImage artwork={artwork} sizes={imageSizes.galleryDialog} />
              </div>
              <div className="dialog-caption">
                <span className="dialog-credit">그림: {artwork.credit}</span>
                <div className="dialog-pagination">
                  <Button
                    variant="outline"
                    size="icon"
                    aria-label="이전 작품"
                    onClick={() => changeArtwork(-1)}
                  >
                    <ArrowLeft />
                  </Button>
                  <span>
                    {(selected ?? 0) + 1} / {artworks.length}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    aria-label="다음 작품"
                    onClick={() => changeArtwork(1)}
                  >
                    <ArrowRight />
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
