import {
  MOTION_STORAGE_KEY,
  REDUCED_MOTION_QUERY,
  THEME_COLORS,
  THEME_STORAGE_KEY,
  isMotionReduced,
  parseMotionSetting,
  type MotionSetting,
  type Theme,
} from '@/lib/appearance'

interface Preferences {
  theme: Theme
  motionSetting: MotionSetting
  systemReduced: boolean
  ready: boolean
}

const serverSnapshot: Preferences = {
  theme: 'dark',
  motionSetting: 'system',
  systemReduced: false,
  ready: false,
}

let snapshot = serverSnapshot
const listeners = new Set<() => void>()
let mediaQuery: MediaQueryList | undefined

function readStoredPreferences() {
  let theme = snapshot.theme
  let motionSetting = snapshot.motionSetting
  try {
    theme = localStorage.getItem(THEME_STORAGE_KEY) === 'light' ? 'light' : 'dark'
    motionSetting = parseMotionSetting(localStorage.getItem(MOTION_STORAGE_KEY))
  } catch {
    // Keep session preferences when storage is unavailable.
  }
  return { theme, motionSetting }
}

function applyAppearance() {
  const root = document.documentElement
  root.dataset.theme = snapshot.theme
  root.classList.toggle('dark', snapshot.theme === 'dark')
  root.dataset.motion = isMotionReduced(snapshot.motionSetting, snapshot.systemReduced)
    ? 'reduced'
    : 'full'
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', THEME_COLORS[snapshot.theme])
}

function publish(next: Preferences) {
  if (
    snapshot.theme === next.theme &&
    snapshot.motionSetting === next.motionSetting &&
    snapshot.systemReduced === next.systemReduced &&
    snapshot.ready === next.ready
  )
    return

  snapshot = next
  applyAppearance()
  listeners.forEach((listener) => listener())
}

function synchronize() {
  publish({
    ...readStoredPreferences(),
    systemReduced: mediaQuery?.matches ?? window.matchMedia(REDUCED_MOTION_QUERY).matches,
    ready: true,
  })
}

function onStorage(event: StorageEvent) {
  if (event.key === null || event.key === THEME_STORAGE_KEY || event.key === MOTION_STORAGE_KEY) {
    synchronize()
  }
}

function onSystemMotionChange() {
  publish({ ...snapshot, systemReduced: mediaQuery?.matches ?? false })
}

export function subscribePreferences(listener: () => void) {
  listeners.add(listener)
  if (listeners.size === 1) {
    mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY)
    mediaQuery.addEventListener('change', onSystemMotionChange)
    window.addEventListener('storage', onStorage)
    synchronize()
  }
  return () => {
    listeners.delete(listener)
    if (listeners.size === 0) {
      mediaQuery?.removeEventListener('change', onSystemMotionChange)
      window.removeEventListener('storage', onStorage)
      mediaQuery = undefined
    }
  }
}

export const getPreferences = () => snapshot
export const getServerPreferences = () => serverSnapshot

function persist(key: string, value: string) {
  try {
    localStorage.setItem(key, value)
  } catch {
    /* Session preferences still apply. */
  }
}

export function toggleTheme() {
  const theme = snapshot.theme === 'dark' ? 'light' : 'dark'
  persist(THEME_STORAGE_KEY, theme)
  publish({ ...snapshot, theme })
}

export function toggleMotion() {
  const motionSetting = isMotionReduced(snapshot.motionSetting, snapshot.systemReduced)
    ? 'full'
    : 'reduced'
  persist(MOTION_STORAGE_KEY, motionSetting)
  publish({ ...snapshot, motionSetting })
}
