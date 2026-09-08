// Keep these source-selection hints aligned with the responsive CSS containers.
const largeDisplay = '(min-width: 1920px) and (min-height: 900px)'
const pagePadding = 'clamp(1.5rem, 5vw, 5rem)'
const pageWidth = 'min(100vw, 90rem)'
const sceneUnit = 'clamp(1rem, min(0.833333333vw, 1.481481481svh), 2rem)'
const largePageWidth = `min(100vw, calc(90 * ${sceneUnit}))`
const largeStageWidth = `min(100vw, calc(95.625 * ${sceneUnit}))`
const pageContent = (width: string) => `calc(${width} - ${pagePadding} * 2)`
const gridColumn = (width: string, fraction: number, gap: string) =>
  `calc((${width} - ${pagePadding} * 2 - ${gap}) * ${fraction})`
const heroPortrait = (width: string) =>
  `calc((${width} - clamp(1.5625rem, 6vw, 5.375rem) * 2 - 8.875rem) * 0.58)`

function responsiveSizes(sources: string[]) {
  // In HTML sizes, rem uses the browser's initial font size, not the styled root.
  // Expand each layout rem with the same fluid font-size formula as layout.css.
  // This keeps source selection accurate before CSS or client JavaScript loads.
  return sources.join(', ').replace(/(\d+(?:\.\d+)?)rem/g, (_, value: string) => {
    const amount = Number(value)
    const viewportWidth = Number((amount * 0.416666667).toFixed(8))
    const viewportHeight = Number((amount * 0.740740741).toFixed(8))
    return `clamp(${amount}rem, calc(${amount / 2}rem + min(${viewportWidth}vw, ${viewportHeight}svh)), ${amount * 2}rem)`
  })
}

export const imageSizes = {
  hero: responsiveSizes([
    '(max-width: 767px) calc((100vw - 3.25rem) * 1.3)',
    '(max-width: 1100px) calc((100vw - 10.875rem) * 0.7)',
    `${largeDisplay} ${heroPortrait(largeStageWidth)}`,
    `(min-width: 1600px) ${heroPortrait('min(100vw, 95.625rem)')}`,
    heroPortrait('min(100vw, 85.625rem)'),
  ]),
  gallery: responsiveSizes([
    `(max-width: 767px) ${pageContent('100vw')}`,
    `${largeDisplay} ${gridColumn(largePageWidth, 0.5, '2.5rem')}`,
    gridColumn(pageWidth, 0.5, '2.5rem'),
  ]),
  galleryDialog: responsiveSizes([
    `${largeDisplay} min(94vw, calc(56.25 * ${sceneUnit}))`,
    'min(94vw, 56.25rem)',
  ]),
  previewMain: responsiveSizes([
    `(max-width: 767px) ${pageContent('100vw')}`,
    `${largeDisplay} ${gridColumn(largePageWidth, 0.6, '3.125rem')}`,
    gridColumn(pageWidth, 0.6, '3.125rem'),
  ]),
  previewSide: responsiveSizes([
    `(max-width: 767px) min(18.75rem, ${pageContent('100vw')})`,
    `${largeDisplay} min(22.5rem, ${gridColumn(largePageWidth, 0.4, '3.125rem')})`,
    `min(22.5rem, ${gridColumn(pageWidth, 0.4, '3.125rem')})`,
  ]),
  aboutPortrait: responsiveSizes([
    `${largeDisplay} calc(42.8125 * ${sceneUnit} * 2 / 3)`,
    '(min-width: 1441px) 28.541667rem',
    `(max-width: 420px) min(20rem, ${pageContent('100vw')})`,
    `(max-width: 760px) min(24.166667rem, ${pageContent('100vw')})`,
    '(max-width: 1100px) 23.541667rem',
    '26.666667rem',
  ]),
  bioAvatar: responsiveSizes([`${largeDisplay} calc(9.375 * ${sceneUnit} * 1.1)`, '10.3125rem']),
} as const
