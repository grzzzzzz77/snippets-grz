import { app } from 'electron'
import { createWindow } from './window'
import { registerIpc } from './ipc'
import { registerGlobalShortcut } from './globalShortcut'

app.whenReady().then(() => {
  const win = createWindow()
  registerIpc(win)
  registerGlobalShortcut(win)
})
