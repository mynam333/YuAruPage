'use client'

import Image, { type ImageProps } from 'next/image'
import { useMotionPreference } from '@/hooks/use-motion-preference'
import type { Artwork } from '@/lib/content'
import { imageSizes } from '@/lib/image-sizes'

type Props = Omit<ImageProps, 'src' | 'alt' | 'width' | 'height'> & {
  artwork: Artwork
}

export default function ArtworkImage({ artwork, sizes = imageSizes.gallery, ...props }: Props) {
  const reduce = useMotionPreference()
  const source = reduce && artwork.stillSrc ? artwork.stillSrc : artwork.src
  // Already prepared animated WebP must bypass Next's still-image optimization.
  return (
    <Image
      {...props}
      src={source}
      alt={artwork.alt}
      width={artwork.width}
      height={artwork.height}
      sizes={sizes}
      unoptimized={Boolean(artwork.stillSrc)}
    />
  )
}
