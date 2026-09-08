export type Theme = 'dark' | 'light'
export type MotionSetting = 'system' | 'full' | 'reduced'

export function parseMotionSetting(value: string | null): MotionSetting {
  return value === 'full' || value === 'reduced' ? value : 'system'
}

export function isMotionReduced(setting: MotionSetting, systemReduced: boolean): boolean {
  return setting === 'reduced' || (setting === 'system' && systemReduced)
}

export const THEME_STORAGE_KEY = 'yuaru-theme'
export const MOTION_STORAGE_KEY = 'yuaru-motion'
export const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'
export const THEME_COLORS: Record<Theme, string> = {
  dark: '#171510',
  light: '#f4eee2',
}

// Apply the saved appearance before the first paint. Only the document's
// appearance attributes change; React hydrates the same content on both sides.
export const appearanceScript = `(()=>{
  const root=document.documentElement;
  let theme='dark',motion='system';
  try{
    theme=localStorage.getItem('${THEME_STORAGE_KEY}')==='light'?'light':'dark';
    const savedMotion=localStorage.getItem('${MOTION_STORAGE_KEY}');
    if(savedMotion==='full'||savedMotion==='reduced')motion=savedMotion;
  }catch{}
  root.dataset.theme=theme;
  root.classList.toggle('dark',theme==='dark');
  root.dataset.motion=motion==='reduced'||(motion==='system'&&matchMedia('${REDUCED_MOTION_QUERY}').matches)?'reduced':'full';
})()`
