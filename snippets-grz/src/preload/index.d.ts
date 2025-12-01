import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      hideWindow: () => void
      shortCut: (type: string, shortCut: string) => void
      setIgnoreMouseEvents: (isIgnore: boolean, options?: { forward: boolean }) => void
      openConfigWindow: () => void
      sql: <T>(
        sql: string,
        type: 'findAll' | 'findOne' | 'insert' | 'update' | 'del' | 'config',
        params?: any
      ) => Promise<T>
    }
  }
}
