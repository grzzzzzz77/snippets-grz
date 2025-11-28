import { app } from 'electron'
import { createWindow } from './window'
import { registerIpc } from './ipc'
import { registerGlobalShortcut } from './globalShortcut'
import { ignoreMouseEvents } from './ignoreMouseEvents'

app.whenReady().then(() => {
  const win = createWindow()
  registerIpc(win)
  registerGlobalShortcut(win)
  ignoreMouseEvents(win)
  win.setIgnoreMouseEvents(true, { forward: true })
})
