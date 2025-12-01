import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { ipcRenderer } from 'electron'

// Custom APIs for renderer
const api = {
  hideWindow: () => {
    ipcRenderer.send('hideWindow')
  },
  shortCut: (type: string, shortCut: string) => {
    ipcRenderer.send('shortCut', type, shortCut)
  },
  setIgnoreMouseEvents: (isIgnore: boolean, options?: { forward: boolean }) => {
    ipcRenderer.send('setIgnoreMouseEvents', isIgnore, options)
  },
  openConfigWindow: () => {
    ipcRenderer.send('openConfigWindow')
  },
  sql: (
    sql: string,
    type: 'findAll' | 'findOne' | 'insert' | 'update' | 'del' | 'config',
    params?: any
  ) => {
    return ipcRenderer.invoke('sql', sql, type, params)
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
