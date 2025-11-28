import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      hideWindow: () => void
      shortCut: (type: string, shortCut: string) => void
      setIgnoreMouseEvents: (isIgnore: boolean, options?: { forward: boolean }) => void
      openConfigWindow: () => void
    }
  }
}
