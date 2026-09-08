import sharp from 'sharp'
import { mkdir, unlink, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { GearSix } from '@phosphor-icons/react'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

const root = resolve(import.meta.dirname, '..')
const imageDirectory = resolve(root, 'public/images')
await mkdir(imageDirectory, { recursive: true })
const sources = [
  ['character_transparent.png', 'character.webp', 1024],
  ['character_transparent.png', 'character-640.webp', 640],
  ['커미션/톱니니.png', 'mascot.webp', 2000],
  ['쇼그리님251201.jpg', 'art-shogri.webp', 1000],
  ['스노이님 260107.jpg', 'art-snoi.webp', 569],
  ['앵님 260109.png', 'art-aeng.webp', 857],
  ['쿠요미님 260813.png', 'art-kuyomi.webp', 340],
]
for (const [input, output, width] of sources) {
  await sharp(resolve(root, '유아루님 정보', input))
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 87, alphaQuality: 95 })
    .toFile(resolve(root, 'public/images', output))
  console.log(output)
}

// Preserve the original timing and loop count in animated WebP.
// A separate still is used when the visitor turns animation off.
const animations = [
  ['1.gif', 'emote-bounce', 0],
  ['머니건2.gif', 'emote-money', 0],
  ['치즈.gif', 'emote-cheese', 2],
]
for (const [input, output, stillPage] of animations) {
  const source = resolve(root, '유아루님 정보', input)
  const metadata = await sharp(source, { animated: true }).metadata()
  if (metadata.format !== 'gif' || (metadata.pages ?? 1) < 2) {
    throw new Error(`Expected an animated GIF: ${input}`)
  }
  await sharp(source, { animated: true })
    .resize({ width: 640, withoutEnlargement: true })
    .webp({
      quality: 85,
      alphaQuality: 95,
      effort: 5,
      loop: metadata.loop ?? 0,
      delay: metadata.delay,
    })
    .toFile(resolve(imageDirectory, `${output}.webp`))
  await sharp(source, { page: stillPage, pages: 1 })
    .resize({ width: 640, withoutEnlargement: true })
    .webp({ quality: 87, alphaQuality: 95 })
    .toFile(resolve(imageDirectory, `${output}-still.webp`))
  console.log(`${output}.webp / ${output}-still.webp`)
}

// Only these explicitly named generated files are obsolete. Originals are untouched.
for (const output of [
  'mascot-sticker.webp',
  'mascot-line.webp',
  'mascot-shadow.webp',
  'emote-bounce.gif',
  'emote-money.gif',
  'emote-cheese.gif',
]) {
  const obsoleteFile = resolve(imageDirectory, output)
  if (dirname(obsoleteFile) !== imageDirectory) {
    throw new Error(`Generated file must remain inside public/images: ${output}`)
  }
  await unlink(obsoleteFile).catch((error) => {
    if (error.code !== 'ENOENT') throw error
  })
}
await writeFile(
  resolve(root, 'public/favicon.svg'),
  renderToStaticMarkup(createElement(GearSix, { color: '#ba9356', weight: 'fill', size: 64 })),
)
