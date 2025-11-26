import { ipcMain, BrowserWindow } from 'electron'

export function registerIpc(win: BrowserWindow) {
  ipcMain.on('hideWindow', () => {
    win.hide()
  })
}
