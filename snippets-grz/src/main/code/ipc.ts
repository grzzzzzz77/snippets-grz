import { ipcMain, BrowserWindow } from 'electron'
import { openConfigWindow } from '../config'

export function registerIpc(win: BrowserWindow) {
  ipcMain.on('hideWindow', () => {
    win.hide()
  })
  ipcMain.on('openConfigWindow', () => {
    openConfigWindow()
  })
}
