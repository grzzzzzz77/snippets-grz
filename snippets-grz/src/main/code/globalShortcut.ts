import { app, BrowserWindow, dialog, globalShortcut, ipcMain, IpcMainEvent } from 'electron'
const config = {
  // 快捷键
  shortCut: ''
}
export const registerGlobalShortcut = (win: BrowserWindow) => {
  ipcMain.on('shortCut', (_event: IpcMainEvent, type: 'search', shortCut: string) => {
    if (config.shortCut) globalShortcut.unregister(config.shortCut)
    config.shortCut = shortCut

    switch (type) {
      case 'search':
        registerSearch(win, shortCut)
        break
      default:
        break
    }
  })
}

function registerSearch(win: BrowserWindow, shortCut: string) {
  const ret = globalShortcut.register(shortCut, () => {
    win.isVisible() ? win.hide() : win.show()
  })

  if (!ret) {
    dialog.showErrorBox('Error', '快捷键注册失败')
  }
}

app.on('will-quit', () => {
  // 注销快捷键

  // 注销所有快捷键
  globalShortcut.unregisterAll()
})
